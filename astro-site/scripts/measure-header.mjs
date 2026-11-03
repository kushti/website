#!/usr/bin/env node
/**
 * Measure the live header so the rebuild can match it.
 *
 *   node scripts/measure-header.mjs
 *
 * Production rate-limits above a few concurrent requests, so this opens one tab and
 * walks it.
 */
import { launch } from './chromium.mjs';

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto('https://ergoplatform.org/en/blog/Ergo-Summit-2023/', {
  waitUntil: 'domcontentloaded',
  timeout: 90000,
});
await page.waitForTimeout(8000);

const out = await page.evaluate(() => {
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) };
  };
  const cs = (el) => {
    const s = getComputedStyle(el);
    return {
      font: `${s.fontSize}/${s.lineHeight} w${s.fontWeight} ${s.fontFamily.split(',')[0]}`,
      ls: s.letterSpacing,
      tt: s.textTransform,
      color: s.color,
      bg: s.backgroundColor,
      pad: s.padding,
      radius: s.borderRadius,
    };
  };

  const links = [...document.querySelectorAll('a, button, select, [role="button"]')].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.y < 160;
  });

  return {
    bodyBg: getComputedStyle(document.body).backgroundColor,
    items: links.map((e) => ({
      tag: e.tagName.toLowerCase(),
      text: clean(e.textContent).slice(0, 40),
      aria: e.getAttribute('aria-label'),
      box: box(e),
      ...cs(e),
      html: e.outerHTML.slice(0, 220),
    })),
  };
});

await browser.close();

console.log('body bg', out.bodyBg);
for (const i of out.items) {
  console.log(
    `${String(i.box.x).padStart(5)},${String(i.box.y).padStart(4)} ${String(i.box.w).padStart(4)}x${String(i.box.h).padStart(3)}  ${i.tag.padEnd(6)} ${JSON.stringify(i.text).padEnd(44)} ${i.font} ls=${i.ls} tt=${i.tt} bg=${i.bg} pad=${i.pad} r=${i.radius}`,
  );
}
console.log('\nmarkup samples:');
for (const i of out.items.slice(0, 14)) console.log('  ' + i.html.replace(/\s+/g, ' '));
