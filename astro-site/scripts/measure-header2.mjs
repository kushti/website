#!/usr/bin/env node
/**
 * Second pass over the live header: the things the first pass could not see — the theme
 * toggle (not a button element), the bar backgrounds, the loaded fonts and the exact
 * vertical geometry.
 *
 *   node scripts/measure-header2.mjs
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
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return `x${Math.round(r.x)} y${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`;
  };
  const bg = (el) => getComputedStyle(el).backgroundColor;

  /** every element whose painted box is in the header, with its own background */
  const painted = [...document.querySelectorAll('body *')]
    .map((el) => ({ el, r: el.getBoundingClientRect() }))
    .filter(({ r }) => r.width > 40 && r.height > 8 && r.y < 150 && r.y + r.height > 0)
    .map(({ el, r }) => ({
      sel: el.tagName.toLowerCase() + (el.className?.baseVal !== undefined ? '[svg]' : typeof el.className === 'string' ? '.' + el.className.split(/\s+/).slice(0, 4).join('.') : ''),
      box: `x${Math.round(r.x)} y${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`,
      bg: bg(el),
      pos: getComputedStyle(el).position,
    }))
    // only the outermost of each nested run, so the bars themselves show up
    .filter((p) => p.bg !== 'rgba(0, 0, 0, 0)' || p.pos === 'fixed' || p.pos === 'sticky');

  return {
    painted: painted.slice(0, 30),
    fonts: [...new Set([...document.querySelectorAll('h1,h2,p,a,span,body')].map((e) => getComputedStyle(e).fontFamily))].slice(0, 8),
    loaded: [...document.styleSheets].flatMap((s) => {
      try {
        return [...s.cssRules];
      } catch {
        return [];
      }
    }).filter((r) => r.constructor.name === 'CSSFontFaceRule').map((r) => r.style.getPropertyValue('font-family') + ' ' + r.style.getPropertyValue('font-weight')),
    fontLinks: [...document.querySelectorAll('link[rel*=font],link[href*=font]')].map((l) => l.getAttribute('href')).slice(0, 12),
    preloads: [...document.querySelectorAll('link[rel=preload][as=font]')].map((l) => l.getAttribute('href')).slice(0, 12),
    themeToggle: [...document.querySelectorAll('div,span,svg')]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return r.x > 1150 && r.x < 1300 && r.y > 60 && r.y < 110 && r.width > 20 && r.height > 15;
      })
      .map((e) => ({ sel: e.tagName.toLowerCase() + (typeof e.className === 'string' ? '.' + e.className.split(/\s+/).slice(0, 3).join('.') : ''), box: box(e), bg: bg(e) })),
  };
});

await browser.close();
console.log('--- painted header boxes');
for (const p of out.painted) console.log(`  ${p.box.padEnd(22)} ${p.bg.padEnd(22)} ${p.pos.padEnd(7)} ${p.sel.slice(0, 80)}`);
console.log('\n--- theme toggle candidates');
for (const t of out.themeToggle) console.log(`  ${t.box} ${t.bg} ${t.sel}`);
console.log('\n--- font families in use\n  ' + out.fonts.join('\n  '));
console.log('\n--- @font-face\n  ' + out.loaded.join('\n  '));
console.log('\n--- font links\n  ' + [...out.fontLinks, ...out.preloads].join('\n  '));
