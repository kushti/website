#!/usr/bin/env node
/**
 * Probe one page for a specific set of visual facts, on production or on ours.
 *
 *   node scripts/probe-visual.mjs <url> [live|ours]
 *
 * Answers the questions the screenshots raised but cannot settle: does the nav have pill
 * borders, how tall is the logo box, what is the footer's internal structure. Prints one
 * flat list of measurements so two runs can be diffed by eye.
 */
import { launch } from './chromium.mjs';

const url = process.argv[2];
const tag = process.argv[3] ?? 'page';
if (!url) {
  console.error('usage: probe-visual.mjs <url> [label]');
  process.exit(1);
}

const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
await page.goto(url, { waitUntil: 'commit', timeout: 120000 });
await page.waitForTimeout(tag === 'live' ? 12000 : 2500);

const out = await page.evaluate(() => {
  const px = (v) => Math.round(parseFloat(v) || 0);
  const rect = (el) => {
    const r = el.getBoundingClientRect();
    return `${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.x)},${Math.round(r.y + window.scrollY)}`;
  };
  const borders = (s) =>
    ['Top', 'Right', 'Bottom', 'Left']
      .map((k) => `${k[0].toLowerCase()}${px(s[`border${k}Width`])}`)
      .filter((b) => !b.endsWith('0'))
      .join(' ') || 'none';

  const lines = [];
  const push = (k, v) => lines.push(`${k.padEnd(34)} ${v}`);

  const header = document.querySelector('header');
  push('header height', Math.round(header.getBoundingClientRect().height));

  // every direct child of the header, in visual order
  const kids = [...header.children].sort((a, b) => a.getBoundingClientRect().y - b.getBoundingClientRect().y);
  kids.forEach((k, i) => {
    const r = k.getBoundingClientRect();
    push(`header child ${i}`, `${k.tagName.toLowerCase()} ${rect(k)} bg=${getComputedStyle(k).backgroundColor}`);
  });

  // the logo: report the <img> and its <a> separately, they are not the same box
  const logoImg = header.querySelector('img');
  const logoA = logoImg?.closest('a');
  push('logo img', logoImg ? `${rect(logoImg)} natural=${logoImg.naturalWidth}x${logoImg.naturalHeight} src=${logoImg.getAttribute('src')}` : 'none');
  push('logo anchor', logoA ? rect(logoA) : 'none');

  // nav links, with their borders — the pill question
  const navLinks = [...header.querySelectorAll('a')].filter((a) => {
    const s = getComputedStyle(a);
    return px(s.fontSize) >= 15 && a.getBoundingClientRect().width > 40;
  });
  push('nav link count', String(navLinks.length));
  navLinks.forEach((a) => {
    const s = getComputedStyle(a);
    push(
      `nav "${a.textContent.trim().slice(0, 13)}"`,
      `${rect(a)} fs=${s.fontSize} lh=${s.lineHeight} bg=${s.backgroundColor} border=${borders(s)} radius=${s.borderRadius} ff=${s.fontFamily.split(',')[0].replace(/["']/g, '')}`,
    );
  });

  // the strip links: small type at the very top
  const strip = [...header.querySelectorAll('a')].filter((a) => px(getComputedStyle(a).fontSize) <= 13);
  push('strip link count', String(strip.length));
  const stripRow = strip[0]?.closest('div');
  if (stripRow) push('strip row', `${rect(stripRow)} bg=${getComputedStyle(stripRow).backgroundColor}`);

  // the three right-hand controls
  const controls = [...header.querySelectorAll('button, a[role], svg')].filter((e) => {
    const r = e.getBoundingClientRect();
    return r.width > 20 && r.width < 120 && r.height > 15 && r.height < 60;
  });
  push('controls', String(controls.length));
  controls.forEach((c) => push(`  control`, `${c.tagName.toLowerCase()} ${rect(c)} bg=${getComputedStyle(c).backgroundColor}`));

  // footer
  const footer = document.querySelector('footer');
  push('footer height', Math.round(footer.getBoundingClientRect().height));
  push('footer top border', borders(getComputedStyle(footer)));
  const fcols = [...footer.querySelectorAll('h1,h2,h3,h4,h5,h6,div > span')].filter((e) => {
    const s = getComputedStyle(e);
    return px(s.fontSize) >= 12 && e.textContent.trim().length < 22;
  });
  push('footer col titles', fcols.slice(0, 10).map((e) => `${e.textContent.trim()}@${getComputedStyle(e).fontSize}`).join(' | '));
  const fImgs = [...footer.querySelectorAll('img')];
  push('footer images', `${fImgs.length}: ${fImgs.slice(0, 14).map((i) => `${i.alt || '·'} ${Math.round(i.getBoundingClientRect().width)}x${Math.round(i.getBoundingClientRect().height)}`).join(', ')}`);
  push('footer text transform', getComputedStyle(footer.querySelector('a') || footer).textTransform);

  // section kickers: the small uppercase labels that separate sections
  const kickers = [...document.querySelectorAll('*')].filter((e) => {
    if (e.children.length) return false;
    const s = getComputedStyle(e);
    const t = (e.textContent || '').trim();
    return t.length < 30 && s.textTransform === 'uppercase' && px(s.fontSize) >= 10 && px(s.fontSize) <= 22;
  });
  push('kickers', kickers.slice(0, 20).map((e) => `${e.textContent.trim()}@${getComputedStyle(e).fontSize}`).join(' | '));

  return lines.join('\n');
});

await browser.close();
console.log(`\n===== ${tag}  ${url}\n${out}\n`);