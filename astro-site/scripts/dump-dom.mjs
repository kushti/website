#!/usr/bin/env node
/**
 * Save the hydrated DOM of a page — live or ours — so its markup, classes and computed
 * layout can be read without the browser.
 *
 *   node scripts/dump-dom.mjs https://ergoplatform.org/en/ /tmp/opencode/live-home.html
 *
 * The live site renders its below-the-fold sections client-side, so this scrolls the whole
 * page and waits before capturing. With a SOCKS proxy in PLAYWRIGHT_PROXY it also reaches
 * production from networks that cannot connect directly.
 */
import { launch } from './chromium.mjs';
import { writeFileSync } from 'node:fs';

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error('usage: dump-dom.mjs <url> <output.html>');
  process.exit(1);
}

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(url.startsWith('http://127') ? 1000 : 9000);

await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2500);

const html = await page.evaluate(() => document.documentElement.outerHTML);
writeFileSync(out, html);
console.log(`wrote ${out} (${html.length} bytes)`);

await browser.close();
