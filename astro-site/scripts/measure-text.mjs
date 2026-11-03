import { launch } from './chromium.mjs';
const [url, ...pairs] = process.argv.slice(2);
const b = await launch();
const p = await (await b.newContext({viewport:{width:1440,height:1000}})).newPage();
await p.goto(url, {waitUntil: url.startsWith('http://127') ? 'load' : 'domcontentloaded', timeout: 90000});
await p.waitForTimeout(url.startsWith('http://127') ? 800 : 9000);
if (!url.startsWith('http://127')) {
  // sections below the fold render on scroll
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  await p.evaluate(async (h) => {
    for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 50)); }
    window.scrollTo(0, 0);
  }, h);
  await p.waitForTimeout(2000);
}
const r = await p.evaluate((pairs) => {
  const clean = s => (s||'').replace(/\s+/g,' ').trim();
  const out = {};
  for (const spec of pairs) {
    const i = spec.indexOf('::');
    const sel = spec.slice(0, i);
    const text = spec.slice(i + 2);
    const el = [...document.querySelectorAll(sel)].find(e => clean(e.textContent).startsWith(text));
    if (!el) { out[spec] = 'not found'; continue; }
    /*
     * Measure the text run itself. getClientRects() returns one rect per inline box and
     * per word, so summing them double-counts; the union from getBoundingClientRect() is
     * the width the text actually occupies, and its height divided by the line-height
     * gives the line count.
    */
    const range = document.createRange();
    range.selectNodeContents(el);
    const box = range.getBoundingClientRect();
    const s = getComputedStyle(el);
    const lh = parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.2;
    out[spec] = {
      textWidth: Math.round(box.width),
      lines: Math.max(1, Math.round(box.height / lh)),
      font: s.fontSize, lh: s.lineHeight, w: s.fontWeight, fam: s.fontFamily.split(',')[0].replace(/"/g,''),
    };
  }
  return out;
}, pairs);
console.log(JSON.stringify(r, null, 1));
await b.close();
