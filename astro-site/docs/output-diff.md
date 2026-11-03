# Where this build differs from ergoplatform.org

Measured by serving `dist/` locally and diffing the rendered output against production.
Reproduce with:

```bash
npm run build
npm run serve                      # must be 127.0.0.1:4400
python3 scripts/compare-with-live.py --all      # status + title
python3 scripts/diff-article-body.py --prose-only   # article prose only
python3 scripts/diff-output.py --section blog    # whole page incl. chrome
python3 scripts/diff-sections.py                 # section inventory

npm run shots -- /en/ /en/discover/    # full-page captures, ours and live, side by side
npm run shots:one -- /en/get-erg/      # first viewport plus element counts
npm run measure:live -- <url> 'h1::Some heading'   # rendered text width and line count
```

Note: production rate-limits and drops connections. At more than ~4 concurrent requests it
starts returning empty bodies, which shows up as implausibly low live word counts. Run the
comparison scripts one page at a time, and re-run before believing a number.

---

## 1. Article prose: equivalent

For posts that have a body, the rendering is the same.

- 37 prose posts compared with the page chrome excluded.
- 0 where ours is empty and live has text.
- 0 where ours is longer.
- 3 where ours is under 90% of live's word count, and all three are the same artefact:
  live's related-posts cards leak past the cut heuristic on non-English locales.
- Heading sequences match exactly. Spot-checked on
  `/en/blog/Bitcoin-Runes-Rosen-Bridge-A-Practical-Path-for-Multi-Chain-Fungible-Assets/`:
  all twelve `<h2>`s identical, in order.

External-link news posts (848 of 1620) render as a link card on both sites. Live's
version adds its carousel underneath; ours adds ours.

**Conclusion: no article content is missing or altered.**

## 2. Real differences

### 2a. Content that was hardcoded in the live source

Everything editors typed is in the export and all of it renders. But the live Next.js
source also hardcoded a substantial amount of marketing and navigation copy that never
entered the database. Most of it has now been recovered from the rendered site rather than
left missing — see §2a.1 — but three pieces remain unrecoverable.

**Still missing:**

| Page | Missing |
|---|---|
| `/ergo-wallet-app/` | the *EIP3* reference |
| `/get-erg/` mining calculator | a price feed, so the revenue figure is in ERG only, not ERG and USD |
| everywhere | production's bespoke illustration — the HIGHLIGHTS donut charts, the WHAT MAKES ERGO UNIQUE motifs, the block above the article card. These render client-side, so they never appear in the served HTML and there is nothing to read back; the site's own hexagon stands in. The one piece that *is* in the markup, the /discover/ 3D hexagon, was recovered |

The first is a single string; the second is a missing endpoint; the third is illustration
work, not content.

#### 2a.1 Recovered from the rendered site

These were hardcoded in the live Next.js components and are absent from the database, but
they are all present in the rendered HTML. `scripts/recover-geterg.mjs` and
`scripts/recover-home.mjs` read them back out of the production DOM and the results are
committed, so the build never depends on the network.

| Page | Recovered |
|---|---|
| `/get-erg/` | the wallets table (6 wallets) with its "Best for..." notes and capability marks, 9 mining pools, 5 miners |
| `/` | the HIGHLIGHTS carousel — the one home section whose copy is in neither the CMS nor the i18n bundle |
| `/`, `/community/` | the eight channel cards, with the URLs read off the page (the wiki is ergonaut.space, not wiki.ergoplatform.org; X is @Ergo_Platform; Telegram is @Ergo_Chats) |
| `/discover/` | the 3D hexagon illustration, which production inlines as SVG rather than serving by URL |

Everything else on those pages is read from `src/i18n/messages`, which is already
translated into all twelve locales — so the recovered copy is the exception, not the rule.

**Section anchors.** Production's ids are reproduced exactly, because the header strip, the
footer and external articles all link to them with fragments. Four were wrong before:
`/discover/` served `#documents` and `#faq` where the footer links to `#Documents` and
`#FAQ`, so every one of those inbound links landed in the wrong place. `/community/`,
`/ecosystem/` and `/get-erg/` had the same problem. All are fixed; see
`scripts/dump-page.mjs` for the per-page inventory.

### 2b. Related-posts depth

Production ends every post with a block of 21 cards. This build shows 6, chosen by
shared tag.

1013 of 1620 published posts carry no tags at all — mostly the 2019-2020 archive — so
tag matching alone left those pages with no onward links. `relatedPosts()` now falls
back to recent posts from the same locale when a post is untagged. Matching production
exactly would mean 21 links on every page; 6 was chosen as the useful number.

### 2c. Image variant, not image

19 of 37 sampled pages report differing in-body images, and 18 of those are images we
render that live does not. They are the same file at a different size: we serve the
CMS's `large_` variant (1000 px), production serves the original through its
`/_next/image` optimizer. The `srcset` includes the original as the widest candidate.

One genuine case: `/en/blog/2018_10_19-smart-contracts/` references
`getting_startet.svg`, which live renders and this build does not.

### 2d. Titles

Category pages: production uses a bare "Blog" for all 119 of them; this build uses
"Ecosystem — Blog", which is better for search. Locale-less redirect shells take their
canonical target as the title instead of a nav label.

### 2e. Footer navigation

Production's footer links into anchors on other pages — `/en/discover/#FAQ`,
`/en/ecosystem/#Roadmap`, `/en/community/#Sigmanauts` and so on. This build now
reproduces all 28 of those links with the same fragments. Two live nav destinations
have no page here at all: `/Ergo_Chats` and `/Ergo_Platform`.

---

## 3. Fixes made during this comparison

- **204 untranslated i18n keys were rendering as literal text** in the page body —
  `footer.tagline`, `getErg.supply`, all sixteen `components.communityHero.*` entries.
  Cause: `t()` returns the key when a lookup misses, so the `t(loc, key) || 'fallback'`
  idiom never fired, and the community hero keys were cased differently at the call
  site than in the table. Added `has()` and `tr()` to `src/i18n/index.ts` and fixed the
  casing. Zero key leaks remain in `dist/`.
- **Four messages were truncated mid-word by the export**, leaving `I am a b` in place of
  `I am a developer` and `Ergo operates on an open model where b`. The values were cut at
  the first `<`, where the original held a `<br/>`. English is repaired from the rendered
  site; `t()` now treats an unusable value as missing, so the ten other locales fall back
  rather than rendering the fragment.
- **1013 untagged posts had no related-posts block at all.** See 2b.
- The blog index was rendering all 701 `en` posts in one document (604 KB). Now
  paginated.
- **`ergo-mark.svg` had a 50-unit viewBox over artwork drawn to 74 units**, so the hexagon
  was cropped to a black arc on every card and every article byline.
- **`/category/devs/` is served by production and linked from its own Discover page**, but
  has no row in the exported category table. It now redirects to the blog index.

## 4. What is verified clean

| Check | Result |
|---|---|
| Status codes | every shared route returns 200 on both |
| Article prose | equivalent, headings identical |
| Internal links | 0 broken (160,214 checked) |
| Images missing `alt` | 0 |
| Frontmatter | 1794 files parse |
| Console / page errors | 0 across the seven main pages |

The 17 links that remain broken were already broken in the archive and are listed in
`scripts/known-broken.mjs`.