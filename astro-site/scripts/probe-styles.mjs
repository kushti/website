#!/usr/bin/env node
/**
 * Print the box and computed type of elements found by their visible text.
 *
 *   node scripts/probe-styles.mjs <url> "HIGHLIGHTS" "A Fair Start" ...
 *
 * The comparison pages have no class names in common, so elements are located by the text
 * they show. Prints one flat block per match so two runs — live and ours — can be diffed.
 */
import { launch } from './chromium.mjs';

const [url, ...texts] = process.argv.slice(2);
if (!url || texts.length === 0) {
  console.error('usage: probe-styles.mjs <url> <text> [text...]');
  process.exit(1);
}

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(url.startsWith('http://127') ? 1200 : 9000);

await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);

const out = await page.evaluate((texts) => {
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const lines = [];
  for (const needle of texts) {
    const el = [...document.querySelectorAll('body *')].find((e) => {
      if (e.children.length && !['H1', 'H2', 'H3', 'H4'].includes(e.tagName)) return false;
      const t = clean(e.textContent);
      return t.toLowerCase().startsWith(needle.toLowerCase());
    });
    if (!el) {
      lines.push(`${needle.padEnd(34)} NOT FOUND`);
      continue;
    }
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const px = (v) => Math.round(parseFloat(v) || 0);
    lines.push(
      `${needle.padEnd(34)} ${el.tagName.toLowerCase().padEnd(3)} ${Math.round(r.x)},${Math.round(r.y + window.scrollY)} ${Math.round(r.width)}x${Math.round(r.height)} ` +
        `fs=${s.fontSize} lh=${s.lineHeight} fw=${s.fontWeight} ff=${s.fontFamily.split(',')[0].replace(/["']/g, '')} ` +
        `tt=${s.textTransform} ls=${s.letterSpacing} color=${s.color} bg=${s.backgroundColor} ` +
        `pad=${s.padding} mar=${s.margin} disp=${s.display} cols=${s.gridTemplateColumns === 'none' ? '' : s.gridTemplateColumns.split(' ').length} gap=${s.gap} radius=${s.borderRadius} border=${s.borderTopWidth}`,
    );
  }
  return lines.join('\n');
}, texts);

console.log(out);
await browser.close();
