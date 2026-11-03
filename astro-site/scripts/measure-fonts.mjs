#!/usr/bin/env node
/**
 * Find every element on the live site set in "Vinila Extended" or Roboto Bold, so the
 * rebuild knows which cuts of the substitute face it actually needs.
 *
 *   node scripts/measure-fonts.mjs
 */
import { launch } from './chromium.mjs';

const PAGES = [
  'https://ergoplatform.org/en/',
  'https://ergoplatform.org/en/blog/Ergo-Summit-2023/',
  'https://ergoplatform.org/en/get-erg/',
];

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();

for (const url of PAGES) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await page.waitForTimeout(7000);

  const rows = await page.evaluate(() => {
    const seen = new Map();
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width < 4 || r.height < 4) continue;
      // only leaf-ish nodes, so a wrapper does not stand in for its text
      if (el.children.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
        continue;
      const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (!text) continue;
      const s = getComputedStyle(el);
      const key = [s.fontFamily.split(',')[0], s.fontSize, s.fontWeight, s.fontStretch, el.tagName].join(' | ');
      if (!seen.has(key)) seen.set(key, { count: 0, sample: text.slice(0, 34) });
      seen.get(key).count++;
    }
    return [...seen.entries()].map(([k, v]) => ({ k, ...v }));
  });

  console.log(`\n=== ${url}`);
  for (const r of rows.sort((a, b) => b.count - a.count)) {
    console.log(`  ${String(r.count).padStart(4)}  ${r.k.padEnd(58)} ${r.sample}`);
  }
}

await browser.close();
