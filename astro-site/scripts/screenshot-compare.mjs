#!/usr/bin/env node
/**
 * Screenshot both sites and report what a reader would notice.
 *
 * The text diffs say the content matches; this says whether the pages *look* alike.
 * For each route it captures a screenshot of both, then reports:
 *
 *   - layout blocks, by section, in document order
 *   - headings, in order
 *   - the type scale actually applied (font sizes, weights, colours)
 *   - the page background and the horizontal rhythm (container width, gutters)
 *
 * Differences in the first two are content. The last two are design.
 */
import { launch } from './chromium.mjs';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const LOCAL = 'http://127.0.0.1:4400';
const LIVE = 'https://ergoplatform.org';
const OUT = '/tmp/opencode/shots';
mkdirSync(OUT, { recursive: true });

const ROUTES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/en/', '/en/blog/', '/en/discover/', '/en/ecosystem/', '/en/community/', '/en/get-erg/'];

const VIEWPORT = { width: 1440, height: 1100 };

/** Read the facts that describe a page's appearance. */
const PROBE = () => {
  const cs = (el, prop) => getComputedStyle(el).getPropertyValue(prop);

  const headings = [...document.querySelectorAll('h1,h2,h3,h4')]
    .filter((h) => h.offsetParent !== null || cs(h, 'display') !== 'none')
    .slice(0, 40)
    .map((h) => {
      const s = getComputedStyle(h);
      return {
        tag: h.tagName,
        text: (h.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60),
        size: s.fontSize,
        weight: s.fontWeight,
        lh: s.lineHeight,
        tracking: s.letterSpacing,
        color: s.color,
      };
    });

  const body = getComputedStyle(document.body);
  const container = (() => {
    // the widest repeated content wrapper
    let best = null;
    for (const el of document.querySelectorAll('main > *, main div')) {
      if (!el.offsetWidth) continue;
      const s = getComputedStyle(el);
      const w = el.getBoundingClientRect().width;
      if (!best || w > best.w) {
        best = { w: Math.round(w), maxWidth: s.maxWidth, padding: s.paddingLeft + '/' + s.paddingRight, display: s.display };
      }
    }
    return best;
  })();

  const px = (el, prop) => parseFloat(getComputedStyle(el)[prop]) || 0;

  // spacing rhythm of the top-level sections
  const sections = [...document.querySelectorAll('main > section, main > div, main > article')]
    .filter((el) => el.getBoundingClientRect().height > 40)
    .slice(0, 14)
    .map((el) => ({
      name: el.tagName.toLowerCase() + (el.id ? '#' + el.id : ''),
      height: Math.round(el.getBoundingClientRect().height),
      paddingY: px(el, 'paddingTop') + '/' + px(el, 'paddingBottom'),
      bg: getComputedStyle(el).backgroundColor,
      borderTop: getComputedStyle(el).borderTopWidth,
    }));

  const links = document.querySelectorAll('a').length;
  const buttons = document.querySelectorAll('button').length;
  const images = [...document.querySelectorAll('img')]
    .filter((i) => i.offsetParent !== null)
    .map((i) => ({ w: Math.round(i.getBoundingClientRect().width), h: Math.round(i.getBoundingClientRect().height) }));

  return {
    title: document.title,
    lang: document.documentElement.lang,
    headings,
    body: {
      font: body.fontFamily,
      size: body.fontSize,
      color: body.color,
      bg: body.backgroundColor,
    },
    darkClass: document.documentElement.className,
    container,
    sections,
    counts: { links, buttons, images: images.length },
    imageSizes: images.slice(0, 12),
    docHeight: document.documentElement.scrollHeight,
    docWidth: document.documentElement.scrollWidth,
  };
};

function summarise(p) {
  if (!p) return null;
  const sizes = {};
  for (const h of p.headings) sizes[`${h.tag} ${h.size}/${h.weight}`] = (sizes[`${h.tag} ${h.size}/${h.weight}`] || 0) + 1;
  return {
    title: p.title,
    docHeight: p.docHeight,
    headings: p.headings.length,
    typeScale: sizes,
    body: p.body,
    container: p.container,
    counts: p.counts,
  };
}

const browser = await launch();

async function capture(url, tag) {
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  } catch {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }
  await page.waitForTimeout(1500);
  // settle theme-dependent rendering
  await page.evaluate(() => localStorage.setItem('theme', 'light'));
  await page.reload({ waitUntil: 'domcontentloaded' }).catch(() => {});
  await page.waitForTimeout(1200);
  const data = await page.evaluate(PROBE);
  const name = tag + (url.replace(LOCAL, '').replace(LIVE, '').replace(/[/?=&]/g, '_').replace(/\/$/, '') || 'home');
  /*
   * The live page is server-rendered but its below-the-fold sections appear as the client
   * bundle hydrates, so the capture has to wait for the layout to stop growing. Three
   * samples a second apart is enough, and the bound keeps a throttled response from
   * hanging the run.
   */
  await page.waitForFunction(
    () => {
      const h = document.documentElement.scrollHeight;
      if (window.__lastHeight === h) return true;
      window.__lastHeight = h;
      return false;
    },
    { timeout: 15000, polling: 1000 },
  ).catch(() => {});
  await page.screenshot({ path: join(OUT, `${name}.png`), fullPage: false });
  await ctx.close();
  return data;
}

const report = {};
for (const route of ROUTES) {
  console.log(`\n=== ${route}`);
  const ours = await capture(LOCAL + route, 'ours');
  const theirs = await capture(LIVE + route, 'live');
  report[route] = { ours, live: theirs };

  const a = summarise(ours);
  const b = summarise(theirs);
  console.log(`  ours: ${a.docHeight}px tall, ${a.headings} headings, ${JSON.stringify(a.counts)}`);
  console.log(`  live: ${b.docHeight}px tall, ${b.headings} headings, ${JSON.stringify(b.counts)}`);

  console.log('  type scale:');
  const keys = new Set([...Object.keys(a.typeScale), ...Object.keys(b.typeScale)]);
  for (const k of keys) {
    const o = a.typeScale[k] ?? 0;
    const l = b.typeScale[k] ?? 0;
    const mark = o === l ? '   ' : ' ->';
    console.log(`   ${mark} ours ${String(o).padStart(2)}x ${k.padEnd(18)} live ${l}x`);
  }
  console.log(`  body font ours: ${a.body.size} ${a.body.font.split(',')[0]}  |  live: ${b.body.size} ${b.body.font.split(',')[0]}`);
  console.log(`  body bg    ours: ${a.body.bg}  |  live: ${b.body.bg}`);
  console.log(`  container  ours: ${JSON.stringify(a.container)}  |  live: ${JSON.stringify(b.container)}`);
}

await browser.close();
console.log(`\nscreenshots in ${OUT}`);
console.log(JSON.stringify(Object.fromEntries(
  Object.entries(report).map(([k, v]) => [k, { ours: v.ours ? 'ok' : null, live: v.live ? 'ok' : null }])
), null, 1));
