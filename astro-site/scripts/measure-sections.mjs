#!/usr/bin/env node
/**
 * Measure the sections and headings of a page, and print them as a table.
 *
 *   node scripts/measure-sections.mjs <url> [--out file.json]
 *
 * Production and this build have no class names in common, so nothing here selects by
 * class. It walks the structural spine — the direct children of <main>, then every
 * heading and paragraph inside each — and records geometry and type. The point is to put
 * the two pages side by side and let the numbers show where they diverge, rather than
 * eyeballing screenshots.
 *
 * Deliberately reports *position* as well as size. A section that is the right height in
 * the wrong place is as wrong as one that is the wrong height.
 */
import { launch } from './chromium.mjs';
import { writeFileSync } from 'node:fs';

const url = process.argv[2];
const outFlag = process.argv.indexOf('--out');
const out = outFlag > -1 ? process.argv[outFlag + 1] : null;
if (!url) {
  console.error('usage: measure-sections.mjs <url> [--out file.json]');
  process.exit(1);
}

const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

// production throttles and returns a blank body rather than failing, so wait on commit
// and give the client-side sections time to render
await page.goto(url, { waitUntil: 'commit', timeout: 120000 });
await page.waitForTimeout(12000);

const data = await page.evaluate(() => {
  const px = (v) => Math.round(parseFloat(v) || 0);
  const box = (el) => {
    const r = el.getBoundingClientRect();
    return {
      x: Math.round(r.x + window.scrollX),
      y: Math.round(r.y + window.scrollY),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };

  /** the visible text of an element, minus anything that is only an icon or a rule */
  const text = (el) =>
    (el.innerText || el.textContent || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 70);

  const describe = (el) => {
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      text: text(el),
      ...box(el),
      fontSize: s.fontSize,
      lineHeight: s.lineHeight,
      fontWeight: s.fontWeight,
      fontFamily: s.fontFamily.split(',')[0].replace(/["']/g, ''),
      letterSpacing: s.letterSpacing,
      textTransform: s.textTransform,
      color: s.color,
      background: s.backgroundColor,
      // padding and gap drive section rhythm more than height does
      padding: [s.paddingTop, s.paddingRight, s.paddingBottom, s.paddingLeft].map(px).join(' '),
      margin: [s.marginTop, s.marginBottom].map(px).join('/'),
      display: s.display,
      gridCols: s.gridTemplateColumns === 'none' ? '' : s.gridTemplateColumns.split(' ').length,
    };
  };

  const main = document.querySelector('main') || document.body;

  /** group the spine: only record children that actually paint something */
  const sections = [...main.children]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.height > 8 && r.width > 100;
    })
    .map((el, i) => {
      const s = getComputedStyle(el);
      const headings = [...el.querySelectorAll('h1,h2,h3,h4,p,button,a')]
        .filter((n) => {
          const r = n.getBoundingClientRect();
          return r.height > 8 && r.width > 20 && !n.querySelector('h1,h2,h3,h4,p');
        })
        .slice(0, 14)
        .map(describe);
      return {
        index: i,
        tag: el.tagName.toLowerCase(),
        cls: (el.className && String(el.className).slice(0, 60)) || '',
        ...box(el),
        background: s.backgroundColor,
        padding: [s.paddingTop, s.paddingBottom].map(px).join('/'),
        headings,
      };
    });

  /** every heading on the page, in document order — the type scale, measured */
  const allHeadings = [...document.querySelectorAll('h1,h2,h3,h4')].map((el) => {
    const s = getComputedStyle(el);
    return { text: text(el), ...box(el), fontSize: s.fontSize, fontWeight: s.fontWeight, fontFamily: s.fontFamily.split(',')[0].replace(/["']/g, ''), lineHeight: s.lineHeight };
  });

  return {
    url: location.href,
    title: document.title,
    pageHeight: document.documentElement.scrollHeight,
    viewport: window.innerWidth,
    headerHeight: document.querySelector('header')?.getBoundingClientRect().height ?? 0,
    footerHeight: document.querySelector('footer')?.getBoundingClientRect().height ?? 0,
    images: document.images.length,
    brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
    sections,
    allHeadings,
  };
});

await browser.close();

if (out) {
  writeFileSync(out, JSON.stringify(data, null, 1));
  console.log(`wrote ${out}`);
}

const f = (n) => String(n).padStart(6);
console.log(`\n${data.url}`);
console.log(`  title "${data.title}"  page ${data.pageHeight}px  header ${data.headerHeight}px  footer ${data.footerHeight}px  images ${data.images} (${data.brokenImages} broken)`);

console.log(`\n  ${'#'.padStart(3)} ${'tag'.padEnd(6)} ${'y'.padStart(6)} ${'h'.padStart(6)} ${'w'.padStart(6)} ${'pad'.padStart(9)} ${'cols'.padStart(4)}  ${'bg'.padEnd(20)} heading type`);
for (const s of data.sections) {
  const big = s.headings.filter((h) => h.fontSize && parseFloat(h.fontSize) >= 30);
  const types = big.slice(0, 4).map((h) => `${h.text.slice(0, 22)}@${h.fontSize}`).join(' ');
  console.log(
    `  ${String(s.index).padStart(3)} ${s.tag.padEnd(6)} ${f(s.y)} ${f(s.h)} ${f(s.w)} ${s.padding.padStart(9)} ${String(s.gridCols).padStart(4)}  ${s.background.padEnd(20)} ${types}`,
  );
}

console.log(`\n  headings >= 30px, in document order:`);
for (const h of data.allHeadings.filter((x) => parseFloat(x.fontSize) >= 30)) {
  console.log(`    ${f(h.y)} ${h.fontSize.padStart(7)} ${h.fontWeight.padStart(4)} ${h.fontFamily.padEnd(24)} ${h.text}`);
}