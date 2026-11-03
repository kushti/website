#!/usr/bin/env node
/**
 * Compare what a reader actually sees, between two builds served side by side.
 *
 * The HTML diff in scripts/diff-builds.py proves the markup is byte-identical once asset
 * hashes are normalised. This is the other question: does it *look* the same. It reads
 * innerText and computed geometry out of both builds and compares them, which is where
 * CSS regressions and whitespace changes show up.
 *
 *   node scripts/compare-builds.mjs 4400 4401 /en/ /en/blog/ ...
 *
 * Also takes screenshots of both and writes them side by side, so a difference can be seen
 * as well as measured.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const [portA = '4400', portB = '4401', ...routes] = process.argv.slice(2);
const A = `http://127.0.0.1:${portA}`;
const B = `http://127.0.0.1:${portB}`;
const OUT = '/tmp/opencode/shots';
mkdirSync(OUT, { recursive: true });

const targets = routes.length ? routes : ['/en/'];

/** everything a reader would notice: the text, the layout box, and the type on each heading */
const PROBE = () => {
  const text = (document.querySelector('main')?.innerText ?? '').replace(/\s+/g, ' ').trim();

  const boxes = [...document.querySelectorAll('main h1, main h2, main h3, main p, main a, main li, main td, main th')]
    .slice(0, 120)
    .map((el) => {
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return null;
      const s = getComputedStyle(el);
      return {
        t: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 40),
        w: Math.round(r.width),
        y: Math.round(r.y + window.scrollY),
        font: s.fontSize,
        family: s.fontFamily.split(',')[0].replace(/"/g, ''),
        weight: s.fontWeight,
        color: s.color,
      };
    })
    .filter(Boolean);

  return {
    text,
    textLength: text.length,
    height: document.documentElement.scrollHeight,
    images: document.images.length,
    boxes,
    fonts: [...new Set(boxes.map((b) => `${b.font}/${b.weight}/${b.family}`))].sort(),
  };
};

const browser = await chromium.launch({ args: ['--no-sandbox'] });
let problems = 0;

for (const route of targets) {
  const read = async (origin) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await ctx.newPage();
    await page.goto(origin + route, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(1200);
    const probe = await page.evaluate(PROBE);
    await page.screenshot({
      path: `${OUT}/cmp-${portA === portB ? 'a' : portA}-${route.replace(/[^a-z0-9]+/gi, '_') || 'home'}.png`,
      fullPage: true,
      timeout: 90000,
    });
    await ctx.close();
    return probe;
  };

  const a = await read(A);
  const b = await read(B);
  const why = [];

  if (a.textLength !== b.textLength) {
    // show the first divergence rather than just the size
    const i = nextDiff(a.text, b.text);
    why.push(`visible text ${a.textLength} vs ${b.textLength} chars`);
    why.push(`  first divergence: ${JSON.stringify(a.text.slice(i - 40, i + 40))}`);
    why.push(`                    ${JSON.stringify(b.text.slice(i - 40, i + 40))}`);
  }

  if (a.height !== b.height) why.push(`page height ${a.height} vs ${b.height}`);
  if (a.images !== b.images) why.push(`${a.images} vs ${b.images} images`);

  if (a.fonts.join('|') !== b.fonts.join('|')) {
    why.push('fonts differ:');
    for (const f of a.fonts) if (!b.fonts.includes(f)) why.push(`  only in ${portA}: ${f}`);
    for (const f of b.fonts) if (!a.fonts.includes(f)) why.push(`  only in ${portB}: ${f}`);
  }

  /*
   * Boxes are compared by position, not by their text. Keying on the text collapses the
   * duplicates — a related-posts card appears once per post that links it — and every
   * duplicate then compares against the last occurrence, which reports a difference for
   * every card on the page.
   */
  const n = Math.min(a.boxes.length, b.boxes.length);
  for (let i = 0; i < n; i++) {
    const boxA = a.boxes[i];
    const boxB = b.boxes[i];
    if (boxA.t !== boxB.t) {
      why.push(`element ${i} text differs: ${JSON.stringify(boxA.t)} vs ${JSON.stringify(boxB.t)}`);
      continue;
    }
    if (Math.abs(boxA.w - boxB.w) > 2) {
      why.push(`"${boxA.t.slice(0, 28)}" width ${boxA.w} vs ${boxB.w}`);
    }
    if (Math.abs(boxA.y - boxB.y) > 2) {
      why.push(`"${boxA.t.slice(0, 28)}" y ${boxA.y} vs ${boxB.y}`);
    }
    if (boxA.font !== boxB.font || boxA.weight !== boxB.weight || boxA.family !== boxB.family) {
      why.push(`"${boxA.t.slice(0, 20)}" type ${boxA.font}/${boxA.weight}/${boxA.family} vs ${boxB.font}/${boxB.weight}/${boxB.family}`);
    }
    if (boxA.color !== boxB.color) {
      why.push(`"${boxA.t.slice(0, 20)}" colour ${boxA.color} vs ${boxB.color}`);
    }
  }
  if (a.boxes.length !== b.boxes.length) {
    why.push(`${a.boxes.length} vs ${b.boxes.length} measurable elements`);
  }

  if (why.length) {
    problems += 1;
    console.log(`\n${route}`);
    for (const w of why.slice(0, 10)) console.log(`  ${w}`);
  } else {
    console.log(`${route.padEnd(40)} identical (${a.textLength} chars, ${a.height}px)`);
  }
}

await browser.close();
console.log(`\n${targets.length - problems}/${targets.length} identical`);
process.exitCode = problems ? 1 : 0;

function nextDiff(a, b) {
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) return i;
  return n;
}
