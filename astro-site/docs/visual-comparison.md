# Visual comparison against ergoplatform.org

Measured with a real browser (Chromium via `playwright-core`), not by reading the HTML.

```bash
npm run build && npm run serve        # 127.0.0.1:4400

npm run shots -- /en/ /en/discover/   # full-page captures of ours and live
npm run shots:one -- /en/get-erg/     # first viewport plus element counts
npm run measure:live -- <url> 'h1::Some heading'   # text width and line count
node scripts/measure-fonts.mjs       # every font/size/weight in use on three pages
node scripts/measure-header.mjs      # the header's geometry and computed styles
node scripts/measure-header2.mjs     # bar backgrounds, fonts, theme-toggle box
```

Screenshots land in `/tmp/opencode/shots/`. Production rate-limits and drops connections
above roughly 4 concurrent requests, so the scripts take the live side one page at a time
and wait on `domcontentloaded` rather than `networkidle` — the live pages embed a chat
widget that polls, so `networkidle` never fires.

---

## Fonts

Production sets body copy in **Roboto** and every heading, nav item and button in
**"Vinila Extended"** — a commercial Dinamo face that cannot be redistributed.

| Role | Production | Here |
|---|---|---|
| body, nav strip, stat values | Roboto 400, 16px | Roboto 400, 16px — self-hosted, Apache-2.0 |
| headings, nav items, buttons | Vinila Extended / Vinila Extended Bold | Archivo, stretched |

`scripts/fetch-fonts.mjs` downloads both as variable fonts — five files, 332 KB — and
generates `src/styles/fonts.css`. Only the subsets the twelve locales need are kept:
latin, latin-ext and cyrillic. Archivo has no cyrillic, so Russian headings fall back to
Roboto; its Latin coverage is complete.

**Two cuts, not weights.** Production picks between "Vinila Extended" and "Vinila
Extended Bold" by family name and leaves `font-weight: 400` on its bold headings, so the
computed weight does not identify the cut. The substitute is one variable family, so the
cut is chosen by weight instead.

**The stretch is measured, not guessed.** Archivo is 27% wider than Vinila Extended at the
same stretch. Measured after the first attempt:

| Heading | Live | Archivo at 112% | Archivo at 88% |
|---|---:|---:|---:|
| `Mine It` at 20px | 60px | 72px | 63px |
| `News` at 96px | 251px | 318px | — |

88% is the stretch in use. It is applied to every display size as `font-stretch: 88%`.

## Type scale

Named for what they render at, because that is what `scripts/measure-fonts.mjs` records:

| Class | Size | Used on |
|---|---|---|
| `display-140` | 140px / 1.1 / 700 | Grants & Bounties, Explore, Documents, Ecosystem, Posts |
| `display-120` | 120px / 1.25 / 400 | Discover Ergo, Software, Learn, FAQ |
| `display-96` | 96px / 1.0 / 700 | highlight titles, GET ERG, News & Blog, Wallets, Mining, Exchanges |
| `display-80` | 80px / 1.0 / 700 | The Future of Proof of Work, Wiki, Contribute |
| `display-72` | 72px / 1.25 / 700 | the home hero |
| `display-56` | 56px / 1.0 / 400 | the 95.57% figure |
| `display-32` | 32px / 1.5 / 700 | New features and projects you might like |
| `display-20` | 20px / 1.4 / 700 | the GET ERG step titles |
| `display-18` | 18px / 1.55 / 700 | footer column titles, small sub-headings |
| `.kicker` | 20px / 1.5 / 700, Roboto | HIGHLIGHTS, WHAT MAKES ERGO UNIQUE, UNSTOPPABLE DEFI |

Production's sizes are fixed; ours go fluid below 1024px, because its own layout is already
broken there and a 140px heading overflows a phone viewport.

**The bare-heading rule had to go.** The earlier stylesheet applied the fluid scale to
`h1:not([class*='text-'])`, which is more specific than a class — so it silently overrode
every display utility. Each heading now carries its size explicitly, and the fluid scale is
gone with it.

## Header

Production's geometry at a 1440 viewport, from `scripts/measure-header.mjs`:

| | Live | Here |
|---|---|---|
| header height | 144px (32px strip + 112px row) | same |
| strip background | `#f3f4f6` | same |
| strip links | 12px Roboto 400, 56px between centres | same |
| content inset | 86px each edge | same (max-w 1268px) |
| logo | 128px wide | same |
| nav | 16px, 4px 16px padding, 16px gap, 84px from the logo | same |
| active nav | `#ff5e18` fill, black text | same |
| locale button | 80×30, 6px radius, 14px | same |
| theme switch | 80×40 track, one 40×40 icon cell, 24px icon | same (sun right, moon left) |
| hamburger | 50×25 | same |

The theme switch's icon and position are driven by `html[data-theme]`, which the inline
script in `Base.astro` sets before paint — so the sun/moon state is correct on the first
frame without script, rather than after hydration.

The locale control shows only the flag and chevron when closed, as production does; its
opened menu names each language. The menu uses buttons rather than links, so switching
locale keeps the current path without emitting dead URLs for posts that exist only in
some languages. The flag is a regional-indicator pair; emoji flag coverage is universal
on current desktop and mobile platforms and the fallback — the two letters — still reads
correctly.

Below `md` the header is 96px tall with an 8px top inset and a 4px bottom inset, a 96px
logo and 20px between controls. From 1024px up the logo gutter follows production's fluid
width — 150px at 1024, 198px at 1120, 278px at 1280, capped at 288px — so the controls
land at production's x positions and `scrollWidth` equals the viewport at 1024, 768, 390
and 320px.

## Cards

- Hexagon-masked artwork via `clip-path`, as production does with an SVG mask.
- The heading is always the post title. `subtitle` is an excerpt in the CMS and is shown
  below it; using it as the heading put the first line of the body in the headline slot on
  118 posts.
- The author row carries the hexagon mark. `ergo-mark.svg` had a 50-unit viewBox over
  artwork drawn to 74 units, so it was cropping to a black arc.

## Measured page heights

Measured at a 1440px viewport, October 2026:

| Route | Ours | Live |
|---|---:|---:|
| `/en/` | 7665px | 7665px |
| `/en/get-erg/` | 6551px | 6551px |
| `/en/discover/` | 6074px | 6074px |
| `/en/community/` | 6946px | 6952px |
| `/en/ecosystem/` | 6623px | 6623px |
| `/en/blog/` | 4650px | 4650px |
| `/en/category/Ecosystem/` | 3522px | 3523px |
| `/en/blog/Ergo-Summit-2023/` | 4503px | 8084px |

The home page now matches the live document height while still omitting the HIGHLIGHTS
donut charts, so the remaining artwork difference is not a vertical one. The post page is
the widest gap: production appends the latest 21 cards against this build's six related
cards.

The live figures carry a caveat: production throttles after a handful of requests, and a
throttled response arrives blank rather than failing, so some of its images are measured as
placeholders. Its home and community captures also stop at 7537px and 6867px respectively
before late content settles; the natural heights are shown above. The category and post
figures were measured by rendering the saved production DOM with the live stylesheet.
`npm run shots` says how many images per page. `node scripts/measure-sections.mjs <url>`
re-measures a single page, including the per-section geometry and the full type scale.

## Section artwork

Earlier revisions of this document recorded production's section illustrations as
unrecoverable, on the grounds that they "render client-side and never appear in the served
markup". **That was wrong**, and it was the single biggest reason this build looked unlike
the original.

They are ordinary static files under `/assets/<section>/`, 119 of them across seven sections.
They are reached two ways: `background-image` on a positioned box, and `<img>` inside a
`<picture>`. Both are in the production DOM — the earlier scripts were reading the HTML
*before* hydration and concluding the artwork was absent.

`scripts/fetch-artwork.py` reads the list out of production's own CSS and JS bundles rather
than hard-coding it, so a new section's artwork is picked up automatically. Output lands in
`public/assets/` with a manifest recording every file and its byte size.

```
119 files, 5.6 MB
  home       1.7 MB   blog       256 KB   not-found   272 KB
  discover   940 KB   geterg     764 KB   legal       115 KB
  community  824 KB   ecosystem  724 KB   footer       8 files at the root
```

Two things about the fetch that are easy to get wrong:

- **Two concurrent requests, not six.** Production starts returning
  `Network is unreachable` above that, and urllib's pool does not recover quickly. The
  script retries with a backoff and skips files it already has, so an interrupted run
  resumes.
- **The type check must special-case SVG.** A `200` can still be an error page, so rasters
  are rejected if the body starts with `<` — but SVG files legitimately start with `<svg`.

`scripts/recover-card-art.mjs` copies the four WHAT MAKES ERGO UNIQUE motifs out of the DOM
instead, because they are small inline SVGs (~3-5 KB) and copying is better than fetching.
The generated hexagon placeholder those replaced is gone.

The `ILLUSTRATIONS` map in `src/lib/artwork.ts` records which file belongs to which section,
with the intrinsic sizes and the rendered widths measured by `scripts/probe-visual.mjs`.

**Provenance:** every file here was scraped from ergoplatform.org. That is the same category
as `public/illustrations/` and the recovered `wallets`/`homeHighlights` JSON — artwork and
data belonging to the site being rebuilt. See the licensing note in `README.md`.

## Header

Rebuilt from measurement after `scripts/probe-visual.mjs` showed the documented geometry was
wrong in two ways. Both had been documented as correct.

| | Live | Before | Now |
|---|---|---|---|
| header total | 144px | 113px | 146px |
| row height | 82px | 112px | 82px |
| content inset | 70px | 86px | 70px |
| logo box | 288px, mark centred | flush left | 288px, mark centred |
| nav pill height | 24px | 32px | 24px |
| theme track | x=1184 | x=1204 | x=1184 |
| hamburger | x=1304 | x=1280 | x=1304 |

- The row is `max-w-[1300px] px-4`, not `max-w-[1268px] px-6`. 35 call sites carried the
  wrong container.
- The logo is centred in a 288px box. Flush left it put the first nav pill at x=342 instead
  of x=374.
- `leading-none` on the nav pills is what makes them 24px rather than 32px.
- **GET ERG is orange on every page** — checked `/en/`, `/en/blog/`, `/en/get-erg/` and
  `/en/discover/` — so it is a call to action, not an active-page state. It is now marked
  `cta` in `PRIMARY` and painted independently of `aria-current`.
- The strip separator is a text bullet in the muted foreground colour, not an orange dot.

## Type scale corrections

`scripts/measure-sections.mjs` found four headings at the wrong size. All four are now
measured against production:

| Heading | Was | Live | Now |
|---|---|---|---|
| Partners | 96px | 120px, bold cut | `display-120-bold` |
| Contribute | 80px | 120px, **regular** cut | `display-120` |
| I am a developer | 96px | 70px | `display-70` |
| I am a company | 96px | 80px | `display-80` |

Production sizes the two Contribute columns differently from each other, and offsets them by
64px vertically. Both reproduced. Contribute's subtitle sits beside the heading rather than
under it, as production has it.

## Known remaining differences

- **The HIGHLIGHTS donut charts are genuinely absent.** Unlike everything else, these do not
  appear in the production DOM at any point — not before or after hydration. This build shows
  the recovered text and figures (`95.57% Public Allocation`, `A Fair Start`) without the
  chart artwork.
- Production's related-posts block is 21 cards; this is 6 (see `docs/output-diff.md` §2b).
- The home hero's copy wraps identically to production's, but that is a consequence of the
  760px measure, not a shared line break: production's markup contains a `<br>`, which would
  be wrong in the other eleven languages.
- The exchanges grid reproduces production's client-side filtering but not its URL state:
  production leaves the active filter out of the URL, so a filtered view cannot be linked to.
  Reproduced rather than improved, because inbound links to production's filtered URLs would
  otherwise break.
