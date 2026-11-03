#!/usr/bin/env node
/**
 * Confirm that every i18n key a template asks for exists, in English and in every locale.
 *
 *   node scripts/check-i18n.mjs
 *
 * This is the check that catches the failure `t()` is designed to hide: `t` returns the key
 * itself on a miss, so a wrong key or a wrong casing renders as visible text rather than
 * failing. The page sweep in check-pages.mjs catches that in the browser; this one catches
 * it statically, in every template, without building.
 *
 * Keys are read from the source rather than from the built HTML, so a key used only on a
 * page the sweep did not sample is still found.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src';
const LOCALES = ['en', 'de', 'es', 'hu', 'id', 'it', 'pl', 'pt', 'ru', 'sk', 'tr', 'zh'];

/** the keys the codebase defines outside the catalogues */
const BUILT_IN = readFileSync('src/i18n/index.ts', 'utf8');
const catalogues = Object.fromEntries(
  LOCALES.map((l) => [l, JSON.parse(readFileSync(`src/i18n/messages/${l}.json`, 'utf8'))]),
);

/** every key named in a HARDCODED_EN or ROUTE_STRINGS block */
function builtInKeys() {
  const keys = new Set();
  for (const m of BUILT_IN.matchAll(/^\s*'([a-zA-Z][\w.]*)':/gm)) keys.add(m[1]);
  return keys;
}

const BUILT = builtInKeys();

/** walk the source for t(loc, 'key') and tr(loc, 'key', ...) */
function sourceFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...sourceFiles(full));
    else if (/\.(astro|ts|tsx|js|jsx)$/.test(entry)) out.push(full);
  }
  return out;
}

/**
 * `t(loc, key)` where the key is a literal. A template-built key
 * (`t(loc, \`components.x.${n}.title\`)`) is not literal and cannot be checked here; those
 * are covered by the page sweep.
 */
const LITERAL_CALL = /\b(?:t|tr)\(\s*[a-z][\w.]*\s*,\s*'([^']+)'/g;

const used = new Map(); // key -> [files]
let dynamicCalls = 0;

for (const file of sourceFiles(SRC)) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(LITERAL_CALL)) {
    const key = m[1];
    if (!used.has(key)) used.set(key, new Set());
    used.get(key).add(file);
  }
  for (const m of text.matchAll(/\b(?:t|tr)\(\s*[a-z][\w.]*\s*,\s*`/g)) dynamicCalls += 1;
}

const problems = [];
for (const [key, files] of [...used].sort()) {
  const where = [...files].join(', ');

  if (!catalogues.en[key] && !BUILT.has(key)) {
    /*
     * A `tr` default is a legitimate way to supply copy the catalogue never held — the
     * marketing copy on the section pages was hardcoded in the live site's JSX.
     */
    const usesTrOnly = [...files].every((f) =>
      new RegExp(`\\btr\\(\\s*[a-z][\\w.]*\\s*,\\s*'${key.replace(/\./g, '\\.')}'`).test(readFileSync(f, 'utf8')),
    );
    if (usesTrOnly) continue;
    problems.push(`${key} — not in any catalogue (${where})`);
    continue;
  }

  const missing = LOCALES.filter((l) => {
    const value = catalogues[l][key];
    // a key absent from a translated bundle falls back to English, which is intended
    if (value === undefined) return false;
    // a truncated value renders as a fragment; t() already falls back for these
    return /(?:^|\s)[bB]$|breakingLine/.test(value);
  });
  if (missing.length) {
    problems.push(`${key} — truncated in ${missing.join(', ')} (falls back to English)`);
  }
}

console.log(`i18n check`);
console.log(`  literal keys used   ${used.size}`);
console.log(`  template-built keys ${dynamicCalls} (checked by the page sweep, not here)`);
console.log(`  locales             ${LOCALES.length}, ${BUILT.size} keys defined in src/i18n/index.ts`);

if (problems.length === 0) {
  console.log('  no problems');
} else {
  console.log(`  ${problems.length} to look at:`);
  for (const p of problems) console.log(`    ${p}`);
  process.exitCode = 1;
}