#!/usr/bin/env node
/**
 * Sweep every built page for the failures that are cheap to miss by eye: a page that
 * errors, an untranslated key leaking into the body, an empty <title>, a missing h1.
 *
 *   node scripts/check-pages.mjs            # every route
 *   node scripts/check-pages.mjs /en/ ...   # a subset
 *
 * Loads each page in a real browser rather than parsing the HTML, because the things this
 * looks for — a component that throws, a script that fails, a heading that a conditional
 * dropped — only show up when the page runs.
 *
 * The locale sweep is sampled rather than exhaustive by default: 1946 pages at roughly
 * 200ms each is about seven minutes, which is fine for CI but not for every edit. Pass
 * --all to sweep everything.
 */
import { chromium } from 'playwright-core';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const LOCAL = 'http://127.0.0.1:4400';

const argv = process.argv.slice(2);
const exhaustive = argv.includes('--all');
const routes = argv.filter((a) => !a.startsWith('--'));

/** every built index.html, as a route */
function allRoutes() {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (entry === '_astro' || entry === 'uploads' || entry === 'illustrations') continue;
        walk(full);
      } else if (entry === 'index.html') {
        out.push('/' + relative(DIST, full).replace(/index\.html$/, ''));
      }
    }
  };
  walk(DIST);
  return out;
}

/**
 * One page per locale per top-level route, plus the sitemap index. Enough to catch a
 * template that breaks in one language — a missing message, a bad date format — without
 * walking 1946 pages.
 */
function sample() {
  /*
   * The locale list comes from the routing config, not from the built paths: dist/ also
   * holds the locale-less redirect shells (/discover/, /blog/, ...), and reading the
   * locales off those yields "discover" and "community" as if they were languages.
   */
  const config = readFileSync('src/i18n/config.ts', 'utf8');
  const block = config.match(/export const LOCALES = \[([\s\S]*?)\]/);
  const locales = (block?.[1] ?? '')
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter((s) => s && !s.startsWith('//'));

  /*
   * A sample post, chosen per locale from the built paths: a fixed slug would 404 on the
   * ten locales that have no translation of it, which reads as a failure when it is not.
   */
  const samplePost = (loc) => {
    const dir = join(DIST, loc, 'blog');
    if (!existsSync(dir)) return null;
    const slug = readdirSync(dir).find((e) => e.endsWith('.html') && e !== 'index.html');
    return slug ? `blog/${slug.replace(/\.html$/, '')}/` : null;
  };

  const sections = [
    '',
    'blog/',
    'category/Ecosystem/',
    'community/',
    'discover/',
    'ecosystem/',
    'ergo-wallet-app/',
    'get-erg/',
    'legal/',
    'manifesto/',
    'privacy-policy/',
  ];
  const out = [];
  for (const loc of locales) {
    for (const s of sections) out.push(`/${loc}/${s}`);
    const post = samplePost(loc);
    if (post) out.push(`/${loc}/${post}`);
  }
  return [...new Set(out)];
}

const targets = routes.length ? routes : exhaustive ? allRoutes() : sample();

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();

const problems = [];
let checked = 0;

for (const route of targets) {
  const errors = [];
  const onError = (e) => errors.push(`pageerror: ${e.message.split('\n')[0]}`);
  const onConsole = (m) => {
    if (m.type() === 'error') errors.push(`console: ${m.text().slice(0, 110)}`);
  };
  page.on('pageerror', onError);
  page.on('console', onConsole);

  let response;
  try {
    response = await page.goto(LOCAL + route, { waitUntil: 'load', timeout: 30000 });
  } catch (err) {
    problems.push({ route, why: `did not load: ${err.message.split('\n')[0]}` });
    page.off('pageerror', onError);
    page.off('console', onConsole);
    continue;
  }

  /*
   * A route can navigate again after load — a locale-less shell redirecting to /ru/, say —
   * which tears down the execution context mid-evaluate. Wait for the page to settle, and
   * treat a destroyed context as "it navigated", not as a failure.
   */
  await page.waitForLoadState('load').catch(() => {});

  let audit;
  try {
    audit = await page.evaluate(() => {
      const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

      /*
       * An i18n key leaking into the page: `t()` returns the key itself when nothing
       * matches, so a dotted, camelCase token standing alone in the body is a miss.
       *
       * textContent rather than innerHTML, so hrefs are excluded — a link to
       * docs.ergoplatform.com is not a leaked key. The last segment must also start
       * lowercase, which every key in the catalogue does and no hostname or filename does.
       */
      /*
       * The body is read through a tree walk rather than textContent, so a URL that only
       * appears as an href is never mistaken for copy. A markdown link in a FAQ answer
       * surfaces its target as its own text node, and that is not a leaked key either.
       */
      const text = (node) => {
        if (node.nodeType === 3) return node.nodeValue;
        // Scripts and styles live inside <main> but their identifiers are not page copy.
        if (
          node.nodeType === 1 &&
          ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(node.tagName)
        )
          return '';
        return [...node.childNodes].map(text).join(' ');
      };
      const body = clean([...document.querySelectorAll('main *')].map(text).join(' '));
      const leakedKeys = [
        ...new Set(
          (body.match(/\b[a-z][a-zA-Z]*(?:\.[a-z][a-zA-Z]*){2,}\b/g) ?? []).filter(
            // a hostname has a dot-segment that starts lowercase too; require the whole
            // token to look like a key and not like a domain
            (t) => t.length > 12 && !/\.(com|org|net|io|org|space|xyz)\b/.test(t),
          ),
        ),
      ];

      const main = document.querySelector('main');
      return {
        title: document.title.trim(),
        h1s: document.querySelectorAll('main h1').length,
        textLength: body.length,
        images: document.images.length,
        brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
        emptyMain: !!main && body.length < 80,
        leakedKeys,
        lang: document.documentElement.lang,
      };
    });
  } catch (err) {
    problems.push({ route, why: `evaluate failed: ${err.message.split('\n')[0]}` });
    page.off('pageerror', onError);
    page.off('console', onConsole);
    continue;
  }

  checked += 1;
  const why = [];
  if (!response || response.status() !== 200) why.push(`status ${response?.status()}`);
  if (!audit.title) why.push('empty <title>');
  if (audit.h1s === 0) why.push('no <h1>');
  if (audit.brokenImages > 0) why.push(`${audit.brokenImages} image(s) failed to load`);
  if (audit.emptyMain) why.push(`main is nearly empty (${audit.textLength} chars)`);
  if (audit.leakedKeys.length) why.push(`untranslated key(s): ${audit.leakedKeys.slice(0, 3).join(', ')}`);
  if (errors.length) why.push(...errors.slice(0, 3));

  if (why.length) problems.push({ route, why: why.join('; ') });

  page.off('pageerror', onError);
  page.off('console', onConsole);
}

await browser.close();

console.log(`page sweep: ${checked} route(s)`);
if (problems.length === 0) {
  console.log('  no problems');
} else {
  console.log(`  ${problems.length} with problems:`);
  for (const p of problems.slice(0, 60)) console.log(`  ${p.route.padEnd(42)} ${p.why}`);
  if (problems.length > 60) console.log(`  ... and ${problems.length - 60} more`);
  process.exitCode = 1;
}