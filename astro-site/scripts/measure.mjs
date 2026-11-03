#!/usr/bin/env node
/** Measure a specific element's rendered box on both sites. */
import { chromium } from 'playwright-core';

const targets = process.argv.slice(2);
const browser = await chromium.launch({ args: ['--no-sandbox'] });

const PROBE = (sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const s = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    text: (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 50),
    fontSize: s.fontSize,
    fontWeight: s.fontWeight,
    lineHeight: s.lineHeight,
    letterSpacing: s.letterSpacing,
    maxWidth: s.maxWidth,
    width: Math.round(r.width),
    height: Math.round(r.height),
    color: s.color,
    padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
    margin: `${s.marginTop} ${s.marginBottom}`,
    background: s.backgroundColor,
    borderRadius: s.borderRadius,
    textTransform: s.textTransform,
  };
};

for (const route of ['/en/']) {
  for (const [tag, base] of [['ours', 'http://127.0.0.1:4400'], ['live', 'https://ergoplatform.org']]) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(1500);
    for (const sel of ['h1', 'header', 'header nav a', 'main section:first-of-type p']) {
      const r = await page.evaluate(PROBE, sel);
      if (r) console.log(`${tag.padEnd(4)} ${sel.padEnd(28)} ${JSON.stringify(r)}`);
    }
    console.log();
    await ctx.close();
  }
}
await browser.close();
