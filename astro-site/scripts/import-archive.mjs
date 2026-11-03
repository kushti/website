#!/usr/bin/env node
/**
 * One command that rebuilds all content from the CMS archive.
 *
 * Order matters:
 *   1. export   — database -> src/content/*.md
 *   2. media    — work out which uploads are still referenced, copy them to public/
 *   3. rewrite  — fix internal links now that the media manifest exists
 *
 * Requires the local PostgreSQL instance holding the Strapi dump. See README.
 */

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const UPLOADS = process.env.UPLOADS_DIR ?? join(ROOT, '..', 'ergo-site-export', 'uploads');

const STEPS = [
  ['export content', 'export-from-db.mjs', []],
  ['export media', 'export-media.mjs', ['--from', UPLOADS]],
  ['rewrite links', 'rewrite-links.mjs', []],
  ['write redirects', 'write-redirects.mjs', []],
];

for (const [label, script, extra] of STEPS) {
  process.stdout.write(`\n=== ${label} ===\n`);
  const r = spawnSync(process.execPath, [join(ROOT, 'scripts', script), ...extra], {
    stdio: 'inherit',
  });
  if (r.status !== 0) {
    console.error(`\n${label} failed (exit ${r.status})`);
    process.exit(r.status ?? 1);
  }
}

console.log('\ncontent export complete — run `npm run build`');
