/**
 * Extract production's WHAT MAKES ERGO UNIQUE card artwork.
 *
 *   node scripts/recover-card-art.mjs
 *
 * Each of the four cards leads with a line-art motif. It is an inline SVG in the production
 * DOM — a roughly 290x150 render — and small enough to copy out verbatim, which is what
 * this does. Each card also carries a `h-48` box that holds either an <img> (card 1) or an
 * <svg> (cards 2-4), so the two cases are both handled.
 *
 * Output is committed, so the build never touches the network. The raster section artwork
 * is fetched rather than copied because it is far too large to inline — see
 * scripts/fetch-artwork.py.
 */
import { launch } from './chromium.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = 'public/artwork/unique';
const URL = 'https://ergoplatform.org/en/';

mkdirSync(OUT, { recursive: true });

const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();

await page.goto(URL, { waitUntil: 'commit', timeout: 120000 });
await page.waitForTimeout(15000);

const cards = await page.evaluate(() => {
  /*
   * Anchor on the kicker text rather than on a class name: production's card markup is
   * `div > div.bg-center.bg-cover`, which is not something to select on directly. The kicker
   * is the only stable handle.
   */
  const kicker = [...document.querySelectorAll('*')].find(
    (e) => e.children.length === 0 && (e.textContent || '').trim() === 'WHAT MAKES ERGO UNIQUE',
  );
  if (!kicker) return { error: 'kicker not found' };

  /*
   * The section is the kicker's grandparent; the cards are its four `flex-col ... pt-16`
   * columns. Production's own class names are an implementation detail, so these are
   * treated as hints and the geometry is used to confirm: a card is 300-400px wide and
   * over 600px tall, which nothing else in the section matches.
   */
  const section = kicker.parentElement?.parentElement;
  if (!section) return { error: 'section not found' };

  const cards = [...section.querySelectorAll('div')]
    .filter((d) => {
      const bb = d.getBoundingClientRect();
      return bb.width > 300 && bb.width < 400 && bb.height > 600;
    })
    // keep only the innermost match, so a card is not also matched as its own parent
    .filter((d) => ![...d.querySelectorAll('div')].some((c) => {
      const bb = c.getBoundingClientRect();
      return bb.width > 300 && bb.width < 400 && bb.height > 600;
    }))
    .sort((a, b) => a.getBoundingClientRect().x - b.getBoundingClientRect().x);

  if (cards.length < 4) return { error: `found ${cards.length} cards, expected 4` };

  const out = [];
  for (const [i, card] of cards.entries()) {
    const bb = card.getBoundingClientRect();

    /*
     * The motif sits in the card's h-48 box. Prefer its <img> if there is one, otherwise
     * the <svg>. Filtering on height > 100 keeps out the EXPLORE arrow and the tick glyphs.
     */
    const art =
      [...card.querySelectorAll('svg')].find((s) => s.getBoundingClientRect().height > 100) ??
      [...card.querySelectorAll('img')].find((i2) => i2.getBoundingClientRect().height > 100);

    let svg = null;
    let src = null;
    if (art && art.tagName.toLowerCase() === 'svg') {
      svg = art.outerHTML;
    } else if (art) {
      src = art.currentSrc || art.src;
    }

    out.push({
      index: i,
      heading: (card.querySelector('[class*="label"]')?.textContent || card.textContent || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 40),
      svg,
      src,
      rendered: art ? `${Math.round(art.getBoundingClientRect().width)}x${Math.round(art.getBoundingClientRect().height)}` : null,
      cardBox: `${Math.round(bb.width)}x${Math.round(bb.height)}`,
      cardBg: getComputedStyle(card).backgroundColor,
    });
  }
  return out;
});

await browser.close();

if (cards.error) {
  console.error(cards.error);
  process.exit(1);
}

const index = [];
for (const c of cards) {
  if (!c.svg && !c.src) {
    console.log(`  card ${c.index + 1} (${c.heading}): no artwork found, card ${c.cardBox}`);
    continue;
  }
  let file;
  if (c.svg) {
    /*
     * Strip what production needs and we do not. The viewBox is kept — it is the only thing
     * that makes the file scalable — but the rendered width/height and the utility classes
     * go, so the card can size it itself.
     */
    const svg = c.svg
      .replace(/\sclass="[^"]*"/g, '')
      .replace(/\swidth="[^"]*"/, '')
      .replace(/\sheight="[^"]*"/, '');
    file = `${OUT}/card-${c.index + 1}.svg`;
    writeFileSync(file, svg + '\n');
    console.log(`  ${file}  ${c.rendered}  ${svg.length} chars  card ${c.cardBox}`);
  } else {
    file = c.src.replace(location.origin, '');
    console.log(`  card ${c.index + 1}: <img> ${file}  ${c.rendered}  card ${c.cardBox}`);
  }
  index.push({
    n: c.index + 1,
    heading: c.heading,
    file,
    rendered: c.rendered,
    cardBox: c.cardBox,
    cardBg: c.cardBg,
  });
}

writeFileSync(`${OUT}/index.json`, JSON.stringify(index, null, 1) + '\n');
console.log(`\n${index.length} motifs -> ${OUT}/index.json`);