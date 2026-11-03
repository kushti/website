#!/usr/bin/env node
/**
 * Dump the structure of the live home page, section by section, so the sections that were
 * hardcoded in the Next.js source can be recovered rather than retyped.
 *
 *   node scripts/dump-home.mjs [url]
 *
 * Read-only: prints an outline and writes /tmp/opencode/home-outline.json. The copy itself
 * is recovered by scripts/recover-home.mjs.
 */
import { launch } from './chromium.mjs';
import { writeFileSync } from 'node:fs';

const url = process.argv[2] ?? 'https://ergoplatform.org/en/';
const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
// the chat widget polls, so networkidle never fires
await page.waitForTimeout(9000);

const outline = await page.evaluate(() => {
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

  /** every text-bearing block, in document order, with its depth-3 ancestor chain */
  const blocks = [];
  for (const el of document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main a, main li')) {
    const text = clean(el.textContent);
    if (!text || text.length > 400) continue;
    // skip wrappers that merely contain other text
    if (el.children.length > 2 && !['H1', 'H2', 'H3', 'H4'].includes(el.tagName)) continue;

    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;

    const chain = [];
    for (let p = el; p && p !== document.body && chain.length < 5; p = p.parentElement) {
      chain.unshift(
        p.tagName.toLowerCase() +
          (typeof p.className === 'string' && p.className
            ? '.' + p.className.trim().split(/\s+/).slice(0, 2).join('.')
            : ''),
      );
    }

    blocks.push({
      tag: el.tagName.toLowerCase(),
      text,
      y: Math.round(r.y + window.scrollY),
      x: Math.round(r.x),
      w: Math.round(r.width),
      chain: chain.join(' > '),
      href: el.tagName === 'A' ? el.getAttribute('href') : undefined,
      img: el.tagName === 'A' ? el.querySelector('img')?.getAttribute('src') : undefined,
    });
  }

  /** the images with their rendered size, for the artwork inventory */
  const images = [...document.querySelectorAll('main img')]
    .map((el) => {
      const r = el.getBoundingClientRect();
      const s = el.getAttribute('src') || '';
      return {
        src: (s.match(/url=([^&]+)/) ? decodeURIComponent(s.match(/url=([^&]+)/)[1]) : s).slice(0, 160),
        alt: clean(el.getAttribute('alt')),
        y: Math.round(r.y + window.scrollY),
        box: `${Math.round(r.x)},${Math.round(r.y + window.scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    })
    .filter((i) => i.box !== '0,0 0x0');

  return { blocks, images };
});

await browser.close();
writeFileSync('/tmp/opencode/home-outline.json', JSON.stringify(outline, null, 1));

let lastY = -1;
for (const b of outline.blocks) {
  // a big vertical jump usually means a new section; mark it
  const gap = b.y - lastY;
  if (gap > 60) console.log(`\n  ......... (${gap}px) .........`);
  lastY = b.y;
  console.log(
    `${String(b.y).padStart(5)} x${String(b.x).padStart(4)} ${b.tag.padEnd(3)} ${b.text.slice(0, 76).padEnd(78)} ${b.href ?? ''}`,
  );
}
console.log(`\n\n=== images (${outline.images.length})`);
for (const i of outline.images) console.log(`  ${String(i.y).padStart(5)} ${i.box.padEnd(18)} ${i.alt.slice(0, 26).padEnd(28)} ${i.src}`);
