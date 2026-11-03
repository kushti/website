#!/usr/bin/env node
/**
 * Recover the /get-erg/ section content that the CMS never held, by reading the live DOM.
 *
 * The wallets table, the mining pool list and the miner list were hardcoded in the live
 * Next.js source, so they are not in the database export. They are fully present in the
 * rendered page, which means they can be read back out rather than rewritten by hand.
 *
 * Reading the served HTML does not work: the production build emits CSS-module names and
 * inlined SVG as text nodes. Reading the hydrated DOM does.
 *
 * The page renders each list twice (a mobile carousel and the desktop grid), so anchors
 * are classified by destination and deduplicated by URL, taking first occurrence.
 *
 * The result is committed, so the build never depends on the network.
 *
 *   node scripts/recover-geterg.mjs
 */
import { launch } from './chromium.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const SOURCE = process.argv[2] ?? 'https://ergoplatform.org/en/get-erg/';
const OUT = 'src/content/pages';
const NOTE = 'recovered from the rendered ergoplatform.org /en/get-erg/ page';

mkdirSync(OUT, { recursive: true });

/**
 * Destinations identify the list an anchor belongs to. Matched against the href, which
 * is stable; the visible labels vary with the locale and with the design.
 */
const GROUPS = [
  {
    key: 'wallets',
    match: [
      // the site links to its own page with a locale-prefixed relative href
      /(^|\/)en\/ergo-wallet-app\/?$/,
      /nautilus-wallet/,
      /satergo\.com/,
      /ThierryM1212\/SAFEW/i,
      /minotaur-ergo/,
      /docs\.ergoplatform\.com\/node\/install/,
    ],
  },
  {
    key: 'pools',
    match: [
      /f2pool\.com/,
      /666pool\.cn/,
      /herominers\.com/,
      /nanopool\.org/,
      /woolypooly\.com/,
      /2miners\.com/,
      /pool\.kryptex\.com/,
      /k1pool\.com/,
      /sigmanauts\.com\/mining/,
    ],
  },
  {
    key: 'miners',
    match: [
      /rigelminer\/rigel/,
      /nanopool\/nanominer/,
      /NebuTech\/NBMiner/,
      /doktor83\/SRBMiner-Multi/,
      /todxx\/teamredminer/,
    ],
  },
];

/** names for the two links whose anchor text is an inlined stylesheet */
const FALLBACK_NAMES = [
  [/nautilus-wallet/, 'Nautilus'],
  [/SAFEW/i, 'SafeW'],
  [/ergo-wallet-app/, 'Ergo Wallet App'],
];

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1200 } })).newPage();
await page.goto(SOURCE, { waitUntil: 'commit', timeout: 90000 });
// networkidle never fires: the page embeds a Chatbase widget that polls
await page.waitForTimeout(9000);

const found = await page.evaluate(
  ({ groups, fallbacks }) => {
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

    const out = {};
    for (const g of groups) out[g.key] = [];

    for (const a of document.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#')) continue;

      const label = clean(a.textContent);

      const group = groups.find((g) => g.match.some((re) => re.test(href)));
      if (!group) continue;

      /*
       * Two of the wallet links carry their SVG's inline <style> inside the anchor, so
       * the visible text is a CSS-module rule rather than a name. The href still
       * identifies the wallet, and the repo name makes a good label.
       */
      const polluted = !label || /[{}]/.test(label) || label.length > 60;
      if (out[group.key].some((i) => i.url === href)) continue; // the list renders twice

      const img = a.querySelector('img');
      let image = null;
      if (img) {
        const src = img.getAttribute('src') || '';
        const m = src.match(/url=([^&]+)/);
        image = m ? decodeURIComponent(m[1]) : src;
      }

      /*
       * The wallet rows are structured, not concatenated: production puts the name and the
       * "Best for..." note in separate divs inside the anchor, so the two are read off those
       * children rather than split out of the flattened text. Splitting the text would have
       * been a guess, and it gets it wrong on "MinotaurMulti Platform".
       *
       * Two of the six anchors have their logo's inline <style> injected into the name div,
       * so that div's text is a CSS-module rule. The href still identifies the wallet.
       */
      let name;
      let note = null;
      let marks = null;
      const isWallet = group.key === 'wallets';
      if (isWallet) {
        /*
         * Cells in order: name, note, then one per capability column. Two rows have the
         * logo's inline <style> injected into the name cell, so that cell reads as a
         * CSS-module rule — drop that cell rather than the row, and take the name from the
         * href instead, so the note is still read from the cell after it.
         */
        const cells = [...a.children].map((c) => clean(c.textContent)).filter(Boolean);
        const firstIsRule = !cells[0] || /[{}]/.test(cells[0]);
        // cell 0 is the name, cell 1 the note, the rest are the capability marks
        name = firstIsRule ? fallbacks.find(([re]) => re.test(href))?.[1] ?? href : cells[0];
        note = cells[1] && !/[{}]/.test(cells[1]) ? cells[1] : null;

        /*
         * The capability marks. Each mark cell holds an SVG: a tick is drawn with two
         * subpaths, a cross with a single one, so the count distinguishes them without
         * reading the icon set. Recovered rather than listed, so the table matches
         * production's data rather than a transcription of it.
         */
        marks = [...a.children].slice(2).map((cell) => {
          const svg = cell.querySelector('svg');
          if (!svg) return false;
          return svg.querySelectorAll('path, line, polyline').length > 1;
        });
      }
      if (!name) name = polluted ? fallbacks.find(([re]) => re.test(href))?.[1] ?? href : label;

      if (!name) continue;
      const entry = { name, url: href, image };
      if (note) entry.note = note;
      if (marks) entry.marks = marks;
      out[group.key].push(entry);
    }
    return out;
  },
  { groups: GROUPS, fallbacks: FALLBACK_NAMES },
);

await browser.close();

for (const [key, file] of [
  ['wallets', 'wallets'],
  ['pools', 'mining-pools'],
  ['miners', 'miners'],
]) {
  const items = found[key] ?? [];
  writeFileSync(
    `${OUT}/${file}.en.json`,
    JSON.stringify({ note: NOTE, items }, null, 1) + '\n',
    'utf8',
  );
  console.log(`${file}: ${items.length}`);
  for (const i of items) console.log(`   ${(i.name + (i.note ? ` (${i.note})` : '')).padEnd(34)} ${i.url}`);
}
