#!/usr/bin/env node
/**
 * Link check for the built site.
 *
 * Two passes over dist/:
 *   1. every internal href/src must resolve to a file that exists
 *   2. every <img> must have non-empty alt text unless it is decorative
 *
 * Run after `npm run build`. Non-zero exit means the build produced broken links,
 * which is the failure mode most likely to survive review.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { KNOWN_BROKEN } from './known-broken.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith('.html')) yield p;
  }
}

const ENTITIES = { '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' };

/** Does a path inside the site resolve to something on disk? */
function resolves(urlPath) {
  // entities must be decoded before the fragment is stripped: `?a&#38;b#frag` would
  // otherwise be cut at the &#38;
  let clean = urlPath;
  for (const [k, v] of Object.entries(ENTITIES)) clean = clean.split(k).join(v);
  // numeric entities, e.g. &#38; for '&' in the Q&A slug
  clean = clean.replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));
  clean = clean.split('#')[0].split('?')[0];
  if (!clean || clean === '/') return true;
  try {
    clean = decodeURIComponent(clean);
  } catch {
    /* leave percent-encoding alone if it is malformed */
  }
  const rel = clean.replace(/^\/+/, '');
  if (rel === '') return statSync(DIST).isDirectory();
  const abs = join(DIST, rel);
  try {
    if (statSync(abs).isFile()) return true;
  } catch {
    /* fall through to the trailing-slash form */
  }
  // trailingSlash: 'always' means /a/b/ maps to /a/b/index.html
  try {
    return statSync(join(abs, 'index.html')).isFile();
  } catch {
    return false;
  }
}

const ATTR = /(?:href|src)="([^"]+)"/g;
const IMG_ALT = /<img\b[^>]*>/gi;

const stats = { pages: 0, links: 0, broken: 0, missingAlt: 0 };
const broken = [];
const noAlt = [];

for (const file of htmlFiles(DIST)) {
  stats.pages += 1;
  const html = readFileSync(file, 'utf8');
  const rel = file.slice(DIST.length);

  for (const m of html.matchAll(ATTR)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(url)) continue;
    stats.links += 1;
    if (!resolves(url)) {
      // a link that was already dead in the CMS archive is a content bug, not a
      // regression from the rebuild; it is tracked in scripts/known-broken.mjs
      if (KNOWN_BROKEN.has(url) || KNOWN_BROKEN.has(decodeURIComponent(url))) continue;
      stats.broken += 1;
      if (broken.length < 200) broken.push(`${rel} -> ${url}`);
    }
  }

  for (const m of html.matchAll(IMG_ALT)) {
    const tag = m[0];
    /*
     * `alt=""` marks a decorative image and is correct; a missing alt is not.
     *
     * A bare `alt` with no value also means the empty string in HTML, and Astro emits it
     * that way for an attribute bound to an empty string — so accept both spellings.
     */
    if (!/\balt\s*=/.test(tag) && !/\balt(?=[\s/>])/.test(tag)) {
      stats.missingAlt += 1;
      if (noAlt.length < 40) noAlt.push(`${rel} -> ${tag.slice(0, 90)}`);
    }
  }
}

console.log('link check');
console.log(`  pages scanned      ${stats.pages}`);
console.log(`  internal links     ${stats.links}`);
console.log(`  broken (new)       ${stats.broken}`);
console.log(`  broken (pre-existing, see scripts/known-broken.mjs) ${KNOWN_BROKEN.size}`);
console.log(`  images missing alt ${stats.missingAlt}`);

if (broken.length) {
  console.log('\nBROKEN:');
  for (const b of broken) console.log('  ' + b);
  if (stats.broken > broken.length) console.log(`  ... and ${stats.broken - broken.length} more`);
}
if (noAlt.length) {
  console.log('\nMISSING ALT:');
  for (const a of noAlt) console.log('  ' + a);
}

process.exit(stats.broken > 0 ? 1 : 0);
