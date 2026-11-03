#!/usr/bin/env node
/**
 * Recover the home page sections that were hardcoded in the live Next.js source.
 *
 * The HIGHLIGHTS cards, the WHAT MAKES ERGO UNIQUE cards, the GET ERG columns, the
 * AUTOLYKOS block and the Contribute columns are not in the CMS export, but they are all
 * present in the rendered page. Reading them back out is more faithful than retyping them
 * and keeps the copy editable as content rather than markup.
 *
 * The result is committed, so the build never depends on the network.
 *
 *   node scripts/recover-home.mjs
 */
import { launch } from './chromium.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const SOURCE = process.argv[2] ?? 'https://ergoplatform.org/en/';
const OUT = 'src/content/pages';
const NOTE = 'recovered from the rendered ergoplatform.org /en/ page';

mkdirSync(OUT, { recursive: true });

const browser = await launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage();
await page.goto(SOURCE, { waitUntil: 'domcontentloaded', timeout: 90000 });
// the chat widget polls, so networkidle never fires
await page.waitForTimeout(9000);

// the sections below the fold render on scroll, so nudge the page down and back
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(3000);

/**
 * The page is a client-rendered Next app, so a section can be missing from a given load
 * until its chunk arrives. Wait for the last section's heading rather than hope.
 */
for (const marker of ['HIGHLIGHTS', 'Contribute', 'I am a developer']) {
  try {
    await page.waitForFunction(
      (m) => document.querySelector('main')?.textContent?.includes(m),
      marker,
      { timeout: 25000 },
    );
  } catch {
    console.warn(`  warning: "${marker}" never appeared; its section will be empty`);
  }
}

const raw = await page.evaluate(() => {
  const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

  /** the nearest ancestor whose text starts with `label` — a reliable section handle */
  const byText = (label, tag) =>
    [...document.querySelectorAll(`main ${tag}`)].find(
      (el) => clean(el.textContent).toUpperCase() === label.toUpperCase(),
    );

  /**
   * Widen from a label to the ancestor that actually holds `count` more elements. The
   * label usually sits in a narrow wrapper, so its own parent is not the section.
   */
  const sectionOf = (label, count, sel) => {
    for (let el = label; el && el !== document.body; el = el.parentElement) {
      if (el.querySelectorAll(sel).length >= count) return el;
    }
    return label.parentElement ?? document.body;
  };

  /** every link inside an element, de-duplicated, in document order */
  const linksIn = (root) => {
    const out = [];
    const seen = new Set();
    for (const a of root.querySelectorAll('a[href]')) {
      const href = a.getAttribute('href');
      const text = clean(a.textContent);
      if (!href || seen.has(href) || !text || /[{}]/.test(text)) continue;
      seen.add(href);
      out.push({ text: text.slice(0, 90), href, el: a });
    }
    return out;
  };

  /** the paragraph copy of a block, skipping the heading and the call to action */
  const proseIn = (root) =>
    [...root.querySelectorAll('p')]
      .map((p) => clean(p.textContent))
      .filter((t) => t.length > 40 && !/^Read More/i.test(t));

  const topOf = (el) => el.getBoundingClientRect().top + window.scrollY;

  /**
   * Sections are not reliably wrapped in their own element, and a section root found by
   * walking up from a label runs into the next one. Geometry is the dependable boundary:
   * a section spans from its label to the label of the section after it.
   */
  const bandOf = (label, nextLabels) => {
    const from = topOf(label);
    const to = Math.min(
      ...nextLabels.map((l) => topOf(l)).filter((y) => y > from),
      Infinity,
    );
    const inBand = (el) => {
      const t = topOf(el);
      return t >= from - 8 && t < to;
    };
    const collect = (sel) => [...document.querySelectorAll(`main ${sel}`)].filter(inBand);
    return { from, to, h2: collect('h2'), h3: collect('h3, h4'), a: collect('a[href]'), p: collect('p') };
  };

  /* ---------------------------------------------------------- HIGHLIGHTS */
  const highlightsLabel = byText('HIGHLIGHTS', 'p');
  const uniqueLabel = byText('WHAT MAKES ERGO UNIQUE', 'p');
  const autoLabel = byText('AUTOLYKOS', 'p');
  const getErgLabel = byText('UNSTOPPABLE DEFI', 'p');

  const highlights = [];
  if (highlightsLabel) {
    const { h2 } = bandOf(highlightsLabel, [uniqueLabel, getErgLabel, autoLabel].filter(Boolean));
    // each card is an h2 heading with prose, a stat and a "Read More" link below it
    for (const title of h2) {
      const card = title.closest('div');
      if (!card) continue;
      const readMore = linksIn(card).find((l) => /^Read More/i.test(l.text));
      highlights.push({
        title: clean(title.textContent),
        kicker: clean(
          [...card.querySelectorAll('p')]
            .map((p) => clean(p.textContent))
            .find((t) => t.length < 40) ?? '',
        ),
        body: proseIn(card).find((t) => t.length > 60) ?? '',
        cta: readMore ? { text: readMore.text, href: readMore.href } : null,
      });
    }
  }

  /* ------------------------------------------------ WHAT MAKES ERGO UNIQUE */
  const unique = [];
  if (uniqueLabel) {
    const band = bandOf(uniqueLabel, [getErgLabel, autoLabel].filter(Boolean));
    for (const link of band.a
      .filter((a) => clean(a.textContent) === 'EXPLORE')
      .map((a) => ({ text: 'EXPLORE', href: a.getAttribute('href'), el: a }))) {
      /*
       * Each card is a `bg-cover` shell with an inline background image wrapping a single
       * column of three stacked divs: the heading, the prose and the call to action.
       */
      const shell = link.el.closest('div[class*="card"]') ?? link.el.closest('div');
      let column = shell;
      while (column && column.children.length === 1) column = column.firstElementChild;
      const panels = [...(column?.children ?? [])];
      const text = (el) => clean(el?.textContent ?? '');
      unique.push({
        title: panels.map(text).find((t) => t.length > 6 && t.length < 60) ?? '',
        body: panels.map(text).find((t) => t.length > 60) ?? '',
        artwork: (shell?.getAttribute('style') ?? '').match(/url\(&?quot;?([^&")]+)/)?.[1] ?? null,
        cta: { text: link.text, href: link.href },
      });
    }
  }

  /* ------------------------------------------------------------- GET ERG */
  const getErgHeading = [...document.querySelectorAll('main h2')].find(
    (h) => clean(h.textContent) === 'GETERG',
  );
  const getErg = {
    kicker: getErgLabel ? clean(getErgLabel.textContent) : '',
    title: clean(getErgHeading?.textContent ?? '').replace(/^GETERG$/, 'GET ERG'),
    body: '',
    steps: [],
  };
  if (getErgLabel && getErgHeading) {
    // the four step columns sit in the same band as the heading
    const band = bandOf(getErgLabel, [autoLabel].filter(Boolean));
    getErg.body = band.p.map((p) => clean(p.textContent)).find((t) => t.startsWith('There is a rich ecosystem')) ?? '';

    for (const a of band.a) {
      const label = clean(a.textContent).match(/^(Mine|Buy|Store|Use) It/);
      if (!label) continue;
      // the anchor holds the step title and the blurb with no separator between them
      const blurb = clean(a.textContent).slice(label[0].length);
      getErg.steps.push({ title: label[0], body: blurb, href: a.getAttribute('href') });
    }
  }

  /* ---------------------------------------------------------- AUTOLYKOS */
  const autoHeading = [...document.querySelectorAll('main p')].find(
    (p) => clean(p.textContent) === 'The Future of Proof of Work',
  );
  const partnersLabel = byText('Partners', 'h2');
  const autolykos = {
    kicker: autoLabel ? clean(autoLabel.textContent) : '',
    title: clean(autoHeading?.textContent ?? ''),
    body: '',
    cta: null,
  };
  if (autoHeading) {
    const band = bandOf(autoLabel ?? autoHeading, [partnersLabel].filter(Boolean));
    autolykos.body = band.p.map((p) => clean(p.textContent)).find((t) => t.startsWith('Autolykos is the underlying')) ?? '';
    const cta = band.a.find((a) => /START MINING/i.test(clean(a.textContent)));
    autolykos.cta = cta ? { text: clean(cta.textContent), href: cta.getAttribute('href') } : null;
  }

  /* ---------------------------------------------------------- CONTRIBUTE */
  const contributeLabel = [...document.querySelectorAll('main h1')].find(
    (h) => clean(h.textContent) === 'Contribute',
  );
  const contribute = {
    title: 'Contribute',
    body: '',
    columns: [],
  };
  if (contributeLabel) {
    // the section runs from the heading down to the footer
    const band = bandOf(contributeLabel, [document.querySelector('footer')].filter(Boolean));
    contribute.body =
      band.p.map((p) => clean(p.textContent)).find((t) => t.startsWith('Ergo operates on an open model')) ?? '';
    for (const h2 of band.h2) {
      const col = h2.parentElement;
      if (!col) continue;
      const kicker =
        [...col.querySelectorAll('p')].map((p) => clean(p.textContent)).find((t) => t === t.toUpperCase() && t.length > 4) ?? '';
      contribute.columns.push({
        title: clean(h2.textContent),
        kicker,
        links: linksIn(col)
          .filter((l) => l.text !== clean(h2.textContent) && l.text !== kicker)
          .map((l) => ({ text: l.text, href: l.href })),
      });
    }
  }

  /* ---------------------------------------------------------------- FOOTER */
  const footer = document.querySelector('footer');
  const footerColumns = footer
    ? [...footer.querySelectorAll('h3, p')].reduce((acc, el) => {
        const text = clean(el.textContent);
        if (!text || text === text.toLowerCase()) return acc;
        const col = el.closest('div, li');
        if (!col) return acc;
        const items = linksIn(col).filter((l) => l.text !== text);
        if (items.length) acc.push({ title: text, items });
        return acc;
      }, [])
    : [];

  return { highlights, unique, getErg, autolykos, contribute, footerColumns };
});

/** content files hold data only, never DOM handles */
const data = JSON.parse(JSON.stringify(raw, (k, v) => (k === 'el' ? undefined : v)));

await browser.close();

const write = (file, payload) => {
  writeFileSync(`${OUT}/${file}.en.json`, JSON.stringify({ note: NOTE, ...payload }, null, 1) + '\n', 'utf8');
};

write('home-highlights', { items: data.highlights });
write('home-unique', { items: data.unique });
write('home-geterg', data.getErg);
write('home-autolykos', data.autolykos);
write('home-contribute', data.contribute);
write('site-footer-links', { items: data.footerColumns });

for (const [k, v] of Object.entries(data)) {
  const n = Array.isArray(v) ? v.length : Object.keys(v).length;
  console.log(`${k.padEnd(16)} ${n}`);
}
for (const h of data.highlights) console.log(`   highlight: ${h.title} / ${h.kicker} / ${h.cta?.href ?? '-'}`);
for (const u of data.unique) console.log(`   unique:    ${u.title} -> ${u.cta?.href ?? '-'}`);
for (const s of data.getErg.steps) console.log(`   step:      ${s.title} -> ${s.href}`);
for (const c of data.footerColumns) console.log(`   footer:    ${c.title} (${c.items.length})`);
