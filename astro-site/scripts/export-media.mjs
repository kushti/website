#!/usr/bin/env node
/**
 * Copy the media that published content actually references into public/uploads/.
 *
 * Two facts drive this script:
 *
 *  1. The archive holds 2546 files / 636 MB, but only ~1563 of them (473 MB) are
 *     reachable from published posts and collections. The remaining 983 (163 MB) are
 *     orphans left behind by the CMS and are dropped.
 *  2. Filenames are preserved byte-for-byte. Every `url` in the database and every
 *     `![alt](name.png)` inside 118 post bodies depends on them, so rewriting them
 *     would break images across the whole archive for no benefit.
 *
 * Usage:
 *   node scripts/export-media.mjs --from /path/to/uploads      # copy reachable files
 *   node scripts/export-media.mjs --from ... --report-only     # audit without copying
 */

import {
  copyFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content');
const OUT = join(ROOT, 'public', 'uploads');

const args = process.argv.slice(2);
const fromIdx = args.indexOf('--from');
const SOURCE = fromIdx !== -1 ? args[fromIdx + 1] : null;
const REPORT_ONLY = args.includes('--report-only');

if (!SOURCE || !existsSync(SOURCE)) {
  console.error('usage: node scripts/export-media.mjs --from <uploads dir> [--report-only]');
  process.exit(1);
}

const onDisk = new Set(readdirSync(SOURCE));

/** every file path mentioned anywhere in the exported content */
const needed = new Set();

// 1. media objects attached in frontmatter (image / imageDark / file / ...)
function walkFrontmatter(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFrontmatter(p);
    } else if (entry.name.endsWith('.md')) {
      const text = readFileSync(p, 'utf8');
      const fm = text.split('---')[1] ?? '';
      // any /uploads/... string anywhere in frontmatter
      for (const m of fm.matchAll(/"\/uploads\/([^"]+)"/g)) needed.add(m[1]);
    }
  }
}
walkFrontmatter(CONTENT);

// 2. images referenced inside markdown bodies
function walkBodies(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkBodies(p);
    } else if (entry.name.endsWith('.md')) {
      const text = readFileSync(p, 'utf8');
      const body = text.split('---').slice(2).join('---');
      for (const m of body.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?/g)) {
        const src = m[1];
        if (src.startsWith('http') || src.startsWith('/uploads/')) continue;
        needed.add(src.split('/').pop());
      }
    }
  }
}
walkBodies(CONTENT);

// 2b. images whose src is a filesystem path that leaked out of the CMS, e.g.
//     `../../../static/img/uploads/x.jpg`. The basename is usually still in uploads.
const leaked = new Set();
function walkLeaked(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkLeaked(p);
    } else if (entry.name.endsWith('.md')) {
      const body = readFileSync(p, 'utf8').split('---').slice(2).join('---');
      for (const m of body.matchAll(/!\[[^\]]*\]\(\s*<?((?!https?:|\/|#)[^)>\s]+)/g)) {
        leaked.add(m[1].split('/').pop());
      }
    }
  }
}
walkLeaked(CONTENT);

// 3. legacy /img/ and /docs/ paths. These predate the CMS: the old server kept them
//    in separate directories, and the live site 308-redirects them to GCS today.
//    Where the file exists in the archive we serve it locally under /uploads/ so the
//    build has no external dependency; the rest fall back to the CDN.
const legacy = new Set();
function walkLegacy(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkLegacy(p);
    } else if (entry.name.endsWith('.md')) {
      const body = readFileSync(p, 'utf8').split('---').slice(2).join('---');
      // also match the absolute form: export-media runs before rewrite-links, so at
      // this point legacy paths are still `https://ergoplatform.org/docs/...`
      // both `](/docs/x.pdf)` and `https://ergoplatform.org/docs/x.pdf`; the character
      // between the host and the path is absent, so the separator class is optional
      for (const m of body.matchAll(
        /(?:https?:\/\/ergoplatform\.org)?[\s("']?(\/(?:img|docs)\/[^)"'<>\s]+)/g,
      )) legacy.add(m[1]);
    }
  }
}
walkLegacy(CONTENT);

for (const base of leaked) if (onDisk.has(base)) needed.add(base);
const leakedMissing = [...leaked].filter((b) => !onDisk.has(b)).sort();

const legacyResolvable = [...legacy].filter((p) => onDisk.has(p.split('/').pop())).sort();
const legacyMissing = [...legacy].filter((p) => !onDisk.has(p.split('/').pop())).sort();
for (const p of legacyResolvable) needed.add(p.split('/').pop());

const present = [...needed].filter((f) => onDisk.has(f)).sort();
const missing = [...needed].filter((f) => !onDisk.has(f)).sort();

const bytes = (list) =>
  list.reduce((n, f) => {
    try {
      return n + statSync(join(SOURCE, f)).size;
    } catch {
      return n;
    }
  }, 0);

console.log('media export');
console.log(`  files on disk        ${onDisk.size}`);
console.log(`  referenced by content ${needed.size}`);
console.log(`  present              ${present.length}  (${(bytes(present) / 1e6).toFixed(0)} MB)`);
console.log(`  MISSING              ${missing.length}`);
console.log(`  dropped as orphans   ${onDisk.size - present.length}  (${(bytes([...onDisk].filter((f) => !needed.has(f))) / 1e6).toFixed(0)} MB)`);
console.log(`  legacy /img,/docs    ${legacy.size} referenced, ${legacyResolvable.length} resolvable locally`);
console.log(`  leaked fs paths      ${leaked.size} referenced, ${leaked.size - leakedMissing.length} present`);

if (missing.length) {
  console.log('\n  missing files:');
  for (const f of missing) console.log(`    ${f}`);
}

if (!REPORT_ONLY) {
  mkdirSync(OUT, { recursive: true });
  let copied = 0;
  for (const f of present) {
    const dest = join(OUT, f);
    if (existsSync(dest) && statSync(dest).size === statSync(join(SOURCE, f)).size) continue;
    copyFileSync(join(SOURCE, f), dest);
    copied += 1;
  }
  console.log(`\n  copied ${copied} files to public/uploads/ (${present.length - copied} already current)`);
}

// A machine-readable record so verify-links can assert the same set.
writeFileSync(
  join(ROOT, 'data', 'media-manifest.json'),
  JSON.stringify(
    {
      copiedAt: new Date().toISOString(),
      present: present.length,
      /** filenames served from public/uploads, for link resolution */
      presentList: present,
      missing,
      leakedMissing,
      bytes: bytes(present),
      /**
       * Map of legacy path -> local filename, for links-rewrite.mjs to apply.
       * Paths absent from this map were never in the archive and must fall back
       * to the CDN at build time.
       */
      legacyResolvable: Object.fromEntries(
        legacyResolvable.map((p) => [p, `/uploads/${p.split('/').pop()}`]),
      ),
      legacyMissing,
    },
    null,
    2,
  ) + '\n',
  'utf8',
);
