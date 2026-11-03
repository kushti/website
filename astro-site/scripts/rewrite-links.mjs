#!/usr/bin/env node
/**
 * Rewrite links inside exported markdown so they resolve against the static build.
 *
 * Order matters. Absolute internal URLs are reduced to site-relative paths first, so
 * later passes see `/docs/...` rather than `https://ergoplatform.org/docs/...`, and
 * locale-less paths pick up the locale of the document they appear in.
 *
 *   1. `https://ergoplatform.org/<locale>/x` -> `/x`
 *      660 posts contain absolute internal links; dropping the locale keeps a reader
 *      on their own language when they follow one.
 *
 *   2. `/img/...` and `/docs/...` -> `/uploads/<file>`, else the docs host
 *      These predate the CMS. The live site 308-redirects them to GCS, where they now
 *      403. Where the archive holds the file it is served locally; the rest belong on
 *      docs.ergoplatform.com, which does serve them.
 *
 *   3. locale-less internal paths -> `/<locale>/...`
 *      Posts link to siblings as `/blog/<slug>` with no locale prefix, which resolves
 *      to nothing once every route sits under a locale.
 *
 *   4. link repair, for both `](/...)` and `href="/..."`
 *      a. the old `/news/<slug>` section maps onto `/blog/<slug>`
 *      b. slug casing that drifted from the canonical permalink is corrected
 *      c. a slug that exists only in another locale links to that locale
 *      d. anything left is recorded as a dead link rather than silently shipped
 *
 *   5. `/cn/...` -> `/zh/...`, matching the redirect the live site serves.
 *
 *   6. filesystem paths leaked out of the CMS, e.g.
 *      `../../../static/img/uploads/x.jpg`, repointed at /uploads/ where possible.
 *
 *   7. bare domains with no scheme (`www.example.org`) get `https://`.
 *
 * Run after export-from-db.mjs and export-media.mjs.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content');
const MANIFEST = join(ROOT, 'data', 'media-manifest.json');
const SLUG_INDEX = join(ROOT, 'data', 'post-index.json');

if (!existsSync(MANIFEST)) {
  console.error('data/media-manifest.json missing — run export-media.mjs first');
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const CDN = process.env.MEDIA_CDN ?? 'https://storage.googleapis.com/ergo-cms-media';
const DOCS_HOST = process.env.DOCS_BASE ?? 'https://docs.ergoplatform.com';

const LOCALES = ['en', 'ru', 'de', 'es', 'pt', 'zh', 'id', 'it', 'pl', 'hu', 'tr', 'sk'];
const LEGACY_LOCALES = [...LOCALES, 'cn'];

/** paths the site serves under a locale prefix; anything else stays as-is */
const LOCALISED = [
  'blog',
  'discover',
  'ecosystem',
  'community',
  'get-erg',
  'manifesto',
  'legal',
  'privacy-policy',
  'ergo-wallet-app',
  'category',
];

// `news` is deliberately absent: it is aliased onto /blog in the repair pass, which
// needs to see the bare `/news/<slug>` form in order to rewrite it.

/** the archive links to posts under both sections; the live site served both */
const SECTION_ALIAS = { news: 'blog' };

const slugIndex = existsSync(SLUG_INDEX)
  ? JSON.parse(readFileSync(SLUG_INDEX, 'utf8'))
  : {};

/** lowercase slug -> canonical slug, per locale */
const canonicalByLocale = Object.fromEntries(
  Object.entries(slugIndex).map(([loc, slugs]) => [
    loc,
    new Map(slugs.map((sl) => [sl.toLowerCase(), sl])),
  ]),
);

/** lowercase slug -> a locale where the post exists */
const slugLocale = (() => {
  const map = new Map();
  for (const [loc, slugs] of Object.entries(slugIndex)) {
    for (const sl of slugs) {
      const key = decodeURIComponent(sl).toLowerCase();
      if (!map.has(key)) map.set(key, loc);
    }
  }
  return map;
})();

/** files this build serves, for resolving odd CMS paths */
const served = new Set([
  ...(manifest.presentList ?? []),
  ...Object.values(manifest.legacyResolvable ?? {}),
]);

const stats = {
  filesScanned: 0,
  absoluteInternal: 0,
  legacyRewritten: 0,
  legacyToDocs: 0,
  localePrefixed: 0,
  cnRewritten: 0,
  leakedFixed: 0,
  schemeAdded: 0,
  sectionAliased: 0,
  casingRepaired: 0,
  crossLocale: 0,
  unresolvedImages: new Set(),
  deadLinks: new Set(),
};

/**
 * Repair one internal path.
 *
 * Returns the replacement path, or null to leave the link alone. Handles, in order:
 * an existing locale prefix, the `/news` alias, casing drift, and a slug that only
 * exists in another locale.
 */
function repairPath(rawPath, locale) {
  const segments = rawPath.split('/').filter(Boolean);

  // a link may already carry a locale, either from pass 3 or written by hand
  let explicitLocale = null;
  if (LEGACY_LOCALES.includes(segments[0])) {
    explicitLocale = segments[0];
    segments.shift();
  }
  // a link into a different language on purpose is left as the author wrote it
  if (explicitLocale && explicitLocale !== locale) return null;

  const section = segments[0];
  const tail = segments.slice(1).join('/');
  const trailing = tail.endsWith('/') ? '/' : '';
  const slug = decodeURIComponent(tail).replace(/\/+$/, '');
  if (!slug) return null;

  const index = canonicalByLocale[locale] ?? new Map();
  const known = index.get(slug.toLowerCase());
  const prefix = `/${locale}`;

  if (known) {
    const target = SECTION_ALIAS[section] ?? section;
    if (target !== section) {
      stats.sectionAliased += 1;
      return `${prefix}/blog/${known}${trailing}`;
    }
    if (known !== slug) {
      stats.casingRepaired += 1;
      return `${prefix}/${section}/${known}${trailing}`;
    }
    return null;
  }

  // not in this locale — try the rest of the archive before giving up
  const elsewhere = slugLocale.get(slug.toLowerCase());
  if (elsewhere && elsewhere !== locale) {
    stats.crossLocale += 1;
    return `/${elsewhere}/${SECTION_ALIAS[section] ?? section}/${slug}${trailing}`;
  }

  if (section === 'blog' || section === 'news') {
    stats.deadLinks.add(`/${rawPath}`);
  }
  return null;
}

function rewrite(body, locale) {
  // 1. absolute internal links -> site-relative.
  //    The locale alternation must be explicit: a loose `/[a-z]{2}` eats the first two
  //    letters of `/docs/...` and yields `/cs/ErgoScript.pdf`.
  body = body.replace(
    new RegExp(
      `https?:\\/\\/ergoplatform\\.org(?:\\/(?:${LEGACY_LOCALES.join('|')}))?(\\/[^)\\s"'<>]*)?`,
      'gi',
    ),
    (_m, rest) => {
      stats.absoluteInternal += 1;
      const clean = (rest ?? '').replace(/^\/+/, '');
      return clean ? `/${clean}` : '/';
    },
  );

  // 2. legacy /img and /docs, with an optional markdown title
  body = body.replace(
    /\]\((\/)(img|docs)\/([^)\s"']+)(\s+"[^"]*")?\)/g,
    (_m, _s, kind, rest, title) => {
      const path = `/${kind}/${rest}`;
      const local = manifest.legacyResolvable?.[path];
      if (local) {
        stats.legacyRewritten += 1;
        return `](${local}${title ?? ''})`;
      }
      stats.legacyToDocs += 1;
      return `](${DOCS_HOST}${path}${title ?? ''})`;
    },
  );

  // 3. locale-less internal paths get the document's own locale
  body = body.replace(
    new RegExp(
      `(\\]\\()/(?!/?(?:${LEGACY_LOCALES.join('|')})/)((?:${LOCALISED.join('|')})/[^)\\s"']*)`,
      'g',
    ),
    (_m, open, path) => {
      stats.localePrefixed += 1;
      return `${open}/${locale}/${path}`;
    },
  );

  // 4. link repair, for markdown links and for raw HTML anchors
  const repair = (rePrefix, litPrefix, reSuffix, litSuffix) => {
    body = body.replace(new RegExp(`${rePrefix}\\/([^\\s"'>]+?)${reSuffix}`, 'g'), (m, rawPath) => {
      if (/^(?:[a-z]+:)?\/\//i.test(rawPath)) return m;
      const fixed = repairPath(rawPath, locale);
      return fixed === null ? m : `${litPrefix}${fixed}${litSuffix}`;
    });
  };
  repair('\\]\\(', '](', '\\)', ')');
  repair('href="', 'href="', '"', '"');
  repair("href='", "href='", "'", "'");

  // 5. legacy Chinese prefix
  body = body.replace(/\]\((\/cn)(\/[^)\s"']*)?\)/g, (_m, _c, rest) => {
    stats.cnRewritten += 1;
    return `](/zh${rest ?? ''})`;
  });

  // 6. filesystem paths that leaked out of the CMS
  body = body.replace(
    /(!\[[^\]]*\]\()((?!https?:|\/|#|mailto:)[^)\s]+)(\s+"[^"]*")?\)/g,
    (m, open, src, title) => {
      const base = decodeURIComponent(src.split('/').pop());
      if (served.has(base)) {
        stats.leakedFixed += 1;
        return `${open}/uploads/${base}${title ?? ''})`;
      }
      stats.unresolvedImages.add(src);
      return m;
    },
  );

  // 7. bare domains with no scheme
  body = body.replace(
    /(\]\()((?:www\.)?[a-z0-9][a-z0-9-]*\.[a-z]{2,8}(?:\/[^)\s"']*)?)(\))/gi,
    (_m, open, url, close) => {
      stats.schemeAdded += 1;
      return `${open}https://${url}${close}`;
    },
  );

  return body;
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
      continue;
    }
    if (!entry.name.endsWith('.md')) continue;

    // the locale directory is the parent, when the file is under src/content/posts
    const rel = relative(CONTENT, p).split(/[\\/]/);
    const locale = rel[0] === 'posts' && LOCALES.includes(rel[1]) ? rel[1] : 'en';

    stats.filesScanned += 1;
    const text = readFileSync(p, 'utf8');
    // never touch the frontmatter: `slug` there is the URL of record
    const parts = text.split(/^---$/m);
    if (parts.length < 3) continue;

    const body = parts.slice(2).join('---');
    const next = rewrite(body, locale);
    if (next !== body) {
      writeFileSync(p, `${parts[0]}---${parts[1]}---${next}`, 'utf8');
    }
  }
}

walk(CONTENT);

console.log('links rewritten');
console.log(`  files scanned          ${stats.filesScanned}`);
console.log(`  absolute internal      ${stats.absoluteInternal}`);
console.log(`  /img,/docs -> local    ${stats.legacyRewritten}`);
console.log(`  /img,/docs -> docs     ${stats.legacyToDocs}`);
console.log(`  locale prefixed        ${stats.localePrefixed}`);
console.log(`  /news -> /blog         ${stats.sectionAliased}`);
console.log(`  slug casing repaired   ${stats.casingRepaired}`);
console.log(`  cross-locale links     ${stats.crossLocale}`);
console.log(`  /cn -> /zh             ${stats.cnRewritten}`);
console.log(`  leaked fs paths fixed  ${stats.leakedFixed}`);
console.log(`  scheme added           ${stats.schemeAdded}`);

if (stats.deadLinks.size) {
  console.log(`\n  ${stats.deadLinks.size} internal link(s) point at a post this build does not emit.`);
  console.log('  They are dead in the source archive too; fix by hand or add a redirect:');
  for (const u of [...stats.deadLinks].slice(0, 30)) console.log(`    ${u}`);
}
if (stats.unresolvedImages.size) {
  console.log(`\n  ${stats.unresolvedImages.size} image reference(s) resolve to nothing:`);
  for (const u of [...stats.unresolvedImages].slice(0, 20)) console.log(`    ${u}`);
}
