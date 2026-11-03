#!/usr/bin/env node
/**
 * Render every SVG in a directory so the recovered artwork can be eyeballed.
 *
 *   node scripts/preview-svg.mjs public/illustrations
 *
 * Served over the local build server rather than file://, because setContent leaves the
 * page on about:blank and Chromium will not load file:// subresources from there.
 */
import { chromium } from 'playwright-core';
import { readdirSync, unlinkSync, writeFileSync } from 'node:fs';

const LOCAL = 'http://127.0.0.1:4400';
const dir = (process.argv[2] ?? 'public/illustrations').replace(/^\//, '');

const files = readdirSync(dir).filter((f) => f.endsWith('.svg'));
if (files.length === 0) {
  console.log(`no SVGs in ${dir}`);
  process.exit(0);
}

/** public/ maps to the server root, so the URL drops it */
const served = dir.replace(/^public\//, '').replace(/^\/+/, '');

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await (await browser.newContext({ viewport: { width: 1000, height: 800 } })).newPage();

/*
 * Written into dist rather than set with setContent: the page has to share an origin with
 * the server for the <img> src to load, and setContent navigates away from it.
 */
const sheet = `preview-svg-${Date.now()}.html`;
writeFileSync(
  `dist/${sheet}`,
  `<!doctype html><meta charset="utf-8"><body style="margin:0;background:#fff">
${files
  .map(
    (f) =>
      `<figure style="margin:0;padding:12px;border-bottom:1px solid #eee">
         <figcaption style="font:12px monospace;color:#666">${f}</figcaption>
         <img src="/${served}/${f}" alt="" style="display:block;width:900px;height:auto;margin-top:8px">
       </figure>`,
  )
  .join('')}
</body>`,
);

await page.goto(`${LOCAL}/${sheet}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);
await page.screenshot({ path: "/tmp/opencode/shots/illustrations.png", fullPage: true });
await browser.close();
unlinkSync(`dist/${sheet}`);
console.log(`${files.length} SVG(s) -> /tmp/opencode/shots/illustrations.png`);