#!/usr/bin/env node
/**
 * Convert extracted `react-intl` catalogues into plain key -> string maps.
 *
 * The bundles recovered from the live site are *precompiled* ICU ASTs, e.g.
 *   { "blog.media.read": [{ "type": 0, "value": "READ" }] }
 * which is not something a translator should be asked to edit. This flattens each
 * message to a readable string, keeping `{placeholder}` tokens intact.
 *
 * The 41 keys present in the locale bundles but absent from English are strings the
 * current site hardcodes in JSX for English readers and only routes through
 * react-intl for other languages. They are preserved here so the rebuild can show
 * the same text everywhere.
 *
 * Usage: node scripts/convert-i18n.mjs <input dir> <output dir>
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const IN = process.argv[2] ?? '/tmp/opencode/i18n_out';
const OUT = process.argv[3] ?? 'src/i18n/messages';

/** Flatten a react-intl AST back into a display string. */
function flatten(nodes) {
  if (typeof nodes === 'string') return nodes;
  if (!Array.isArray(nodes)) return String(nodes ?? '');
  let out = '';
  for (const n of nodes) {
    if (typeof n === 'string') {
      out += n;
    } else if (n && typeof n === 'object') {
      // type 8 wraps a child: the placeholder name is preserved as {name}
      if (n.value !== undefined && n.type !== 0) out += flatten(n.value);
      else if (n.children) out += flatten(n.children);
      else if (n.value !== undefined) out += n.value;
    }
  }
  return out;
}

mkdirSync(OUT, { recursive: true });

const files = readdirSync(IN).filter((f) => f.endsWith('.json'));
const all = new Map();

for (const f of files) {
  const loc = f.replace(/\.json$/, '');
  const raw = JSON.parse(readFileSync(join(IN, f), 'utf8'));
  const flat = {};
  for (const [key, nodes] of Object.entries(raw)) {
    const text = flatten(nodes).trim();
    if (text) flat[key] = text;
  }
  writeFileSync(join(OUT, `${loc}.json`), JSON.stringify(flat, null, 2) + '\n', 'utf8');
  if (!all.has(loc)) all.set(loc, new Set());
  for (const k of Object.keys(flat)) all.get(loc).add(k);
  console.log(`  ${loc.padEnd(4)} ${String(Object.keys(flat).length).padStart(4)} keys`);
}

// Cross-locale coverage, so a translator can see what is missing at a glance.
const [base, ...others] = ['en', ...[...all.keys()].filter((k) => k !== 'en' && k !== 'cn')];
const baseKeys = all.get(base) ?? new Set();
const report = {};
for (const [loc, keys] of all) {
  if (loc === 'cn') continue; // legacy alias, same content as zh
  const missing = [...baseKeys].filter((k) => !keys.has(k));
  const extra = [...keys].filter((k) => !baseKeys.has(k));
  report[loc] = {
    total: keys.size,
    missingFromEnglish: missing.length,
    onlyInThisLocale: extra.length,
    missing,
  };
}
writeFileSync(join(OUT, '_coverage.json'), JSON.stringify(report, null, 2) + '\n', 'utf8');

console.log(`\nbaseline locale: ${base} (${baseKeys.size} keys)`);
console.log('coverage written to src/i18n/messages/_coverage.json');
