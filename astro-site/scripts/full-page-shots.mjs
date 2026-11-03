#!/usr/bin/env node
/**
 * Full-page screenshots of the rebuild and the live site, for side-by-side review of
 * page structure rather than just the first viewport.
 *
 *   node scripts/full-page-shots.mjs /en/ /en/discover/ /en/community/
 *
 * Production rate-limits above a few concurrent requests, so pages are captured one at a
 * time with a pause between them.
 */
import { launch } from './chromium.mjs';
import { mkdirSync } from 'node:fs';

const LOCAL = 'http://127.0.0.1:4400';
const OUT = '/tmp/opencode/shots';
mkdirSync(OUT, { recursive: true });

/** lazy-loaded images below the fold never load in a full-page capture, so scroll first */
async function settle(page) {
  /*
   * The below-the-fold sections render on scroll, and the page must be interactive before
   * scrollHeight is meaningful. Production is server-rendered but hydrates a client bundle
   * that fills those sections in, so a `load` wait alone is not enough.
   */
  await page.waitForLoadState('load', { timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(3000);

  /*
   * The scroll has to complete before anything else. Production marks every one of its
   * images `loading="lazy"`, and on the community page 88 of 98 are still unloaded when the
   * capture starts — `fullPage` then waits on them and times out rather than returning a
   * half-blank image.
   */
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  await page.evaluate(async (h) => {
    for (let y = 0; y < h; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  }, height);
  await page.waitForTimeout(2500);

  // the layout has to stop growing before a fullPage capture can succeed
  await page
    .waitForFunction(
      () => {
        const h = document.documentElement.scrollHeight;
        if (window.__lastHeight === h) return true;
        window.__lastHeight = h;
        return false;
      },
      { timeout: 20000, polling: 1000 },
    )
    .catch(() => {});

  /*
   * Blank out anything still loading. When production throttles, requests that were issued
   * stay pending indefinitely and `fullPage` waits on every one of them — the capture times
   * out rather than returning the page it has already rendered. Swapping the src releases
   * them; the screenshot is of what loaded, which is what a reader would see under the same
   * conditions.
   */
  const blanked = await page.evaluate(() => {
    const pending = [...document.images].filter((i) => !i.complete);
    for (const img of pending) {
      img.dataset.wasSrc = img.src;
      img.removeAttribute('srcset');
      img.src =
        'data:image/svg+xml;base64,' +
        btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="${img.naturalWidth || 4}" height="${img.naturalHeight || 4}"><rect width="100%" height="100%" fill="#e4e4e7"/></svg>`);
    }
    return pending.length;
  });
  if (blanked) console.log(`  ${blanked} image(s) still loading; blanked for the capture`);
  await page.waitForTimeout(400);
}

const paths = process.argv.slice(2);
if (paths.length === 0) paths.push('/en/');

const browser = await launch();

for (const p of paths) {
  const name = p.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'root';

  const ours = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  await ours.goto(LOCAL + p, { waitUntil: 'load', timeout: 60000 });
  await settle(ours);
  await ours.screenshot({ path: `${OUT}/full-ours-${name}.png`, fullPage: true, timeout: 120000 });
  const oursH = await ours.evaluate(() => document.documentElement.scrollHeight);
  await ours.close();

  // the live page never reaches networkidle: it embeds a chat widget that polls
  const live = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
  let liveH = null;
  try {
    await live.goto('https://ergoplatform.org' + p, { waitUntil: 'commit', timeout: 60000 });
    await settle(live);
    await live.screenshot({ path: `${OUT}/full-live-${name}.png`, fullPage: true, timeout: 120000 });
    liveH = await live.evaluate(() => document.documentElement.scrollHeight);
  } catch (err) {
    // production rate-limits and drops connections; keep the local capture either way
    console.warn(`  live capture failed: ${err.message.split('\n')[0]}`);
  }
  await live.close();

  const gap = liveH === null ? '?' : `${((liveH - oursH) / liveH * 100).toFixed(0)}% short`;
  console.log(`${p}  ours ${oursH}px  live ${liveH ?? 'failed'}px  (${gap})`);

  /*
   * Production starts throttling after a handful of requests, and a throttled response can
   * hang for 40s rather than failing fast. Wait it out between pages rather than reporting
   * the whole run as a failure.
   */
  await new Promise((r) => setTimeout(r, liveH === null ? 45000 : 8000));
}

await browser.close();
