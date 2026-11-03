#!/usr/bin/env node
/**
 * Dump the structure of a live page, section by section, so anything that was hardcoded in
 * the Next.js source can be recovered rather than retyped.
 *
 *   node scripts/dump-page.mjs /en/discover/
 *
 * Read-only: prints an outline and writes /tmp/opencode/<slug>-outline.json.
 */
import { launch } from './chromium.mjs';
import { writeFileSync } from 'node:fs';

const path = process.argv[2] ?? '/en/discover/';
const slug = path.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'root';

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto('https://ergoplatform.org' + path, { waitUntil: 'domcontentloaded', timeout: 90000 });
// the chat widget polls, so networkidle never fires
await page.waitForTimeout(9000);

// the sections below the fold render on scroll, so walk the page before reading it
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 50));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2500);

const outline = await page.evaluate(() => {
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

  const blocks = [];
  for (const el of document.querySelectorAll('main h1, main h2, main h3, main h4, main p, main a, main li')) {
    const text = clean(el.textContent);
    if (!text || text.length > 300) continue;
    if (el.children.length > 2 && !['H1', 'H2', 'H3', 'H4'].includes(el.tagName)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 4 || r.height < 4) continue;

    blocks.push({
      tag: el.tagName.toLowerCase(),
      text,
      y: Math.round(r.y + window.scrollY),
      x: Math.round(r.x),
      href: el.tagName === 'A' ? el.getAttribute('href') : undefined,
      id: el.id || el.closest('[id]')?.id || undefined,
    });
  }

  const images = [...document.querySelectorAll('main img')]
    .map((el) => {
      const r = el.getBoundingClientRect();
      const s = el.getAttribute('src') || '';
      const m = s.match(/url=([^&]+)/);
      return {
        src: (m ? decodeURIComponent(m[1]) : s).slice(0, 160),
        alt: clean(el.getAttribute('alt')),
        y: Math.round(r.y + window.scrollY),
        box: `${Math.round(r.x)},${Math.round(r.y + window.scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    })
    .filter((i) => !i.box.endsWith(' 0x0'));

  return { blocks, images, height: document.documentElement.scrollHeight };
});

await browser.close();
writeFileSync(`/tmp/opencode/${slug}-outline.json`, JSON.stringify(outline, null, 1));

let lastY = -1;
for (const b of outline.blocks) {
  const gap = b.y - lastY;
  if (gap > 80) console.log(`\n  .......... (${gap}px) ..........`);
  lastY = b.y;
  console.log(
    `${String(b.y).padStart(5)} x${String(b.x).padStart(4)} ${b.tag.padEnd(3)} ${b.text.slice(0, 70).padEnd(72)} ${b.href ?? ''}${b.id ? '  #' + b.id : ''}`,
  );
}
console.log(`\n=== images (${outline.images.length})`);
for (const i of outline.images) console.log(`  ${String(i.y).padStart(5)} ${i.box.padEnd(18)} ${i.src.slice(0, 96)}`);
console.log(`\nheight ${outline.height}px`);