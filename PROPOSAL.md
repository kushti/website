# Proposal: rebuild ergoplatform.org on a static-site generator
Date: 2026-09-29
Sources analysed: `ergo-site-export` archive (Strapi 4.3.9 / PostgreSQL dump) + live
ergoplatform.org (Next.js 14, SSR behind Cloudflare).

> **Implemented.** This proposal was carried out in `astro-site/`. See
> `astro-site/README.md` for the build instructions, the verification commands and the
> known gaps. Where the two disagree, the README reflects what was actually built.

---

## 1. What the archive actually contains

Loaded into a local PostgreSQL 17 instance and queried. 46 tables, 13 with content.

| Table | Rows | Rendered on | Notes |
|---|---:|---|---|
| `posts` | 1627 | `/<locale>/blog/*` | the whole editorial corpus |
| `files` | 622 | media | 1293 derived variants via `files.formats` |
| `files_related_morphs` | 406 | media wiring | 11 (type, field) pairs |
| `contact_requests` | 544 | — | personal data, do not publish |
| `roadmaps` | 89 | `/ecosystem` | 64 published `en` |
| `team_members` | 45 | `/community` | only 16 published |
| `exchanges` | 35 | `/get-erg` | 28 published, `image`/`image_dark` |
| `documents` | 17 | `/discover` | 16 carry a PDF via morphs |
| `f_a_qs` | 13 | `/discover` | |
| `categories` | 11 | `/blog` filter | |
| `partners` | 11 | `/` | 6 published |
| `dapps` | 9 | `/ecosystem` | |
| `features_and_projects` | 8 | `/ecosystem` | |
| `changing_the_worlds` | 6 | unused by live site | 1 published |
| `our_favorites` | 5 | `/ecosystem` | |

`posts` detail, all 1627 rows:
- 1625 have a renderable slug; 2 do not.
- 849 are **external-link news**: `type=news`, `url` is an absolute `http(s)` URL, no body.
- 778 have markdown bodies (4.0 MB total; median 4.3 KB, max 38 KB).
- 12 locales: `en 701, es 329, sk 254, zh 104, pt 100, it 41, de 21, ru 14, hu 14, id 14, pl 14, tr 14`.
- `published_at IS NULL` on 7 rows — drafts, excluded.

Media: 2546 files / 636 MB in `uploads.tar.gz`. Reachability analysis shows only
**1563 files (473 MB)** are referenced by published content; 983 files (163 MB) are
orphans and can be dropped. 14 files referenced by `files.url` are genuinely absent
(the README is correct) — all PDFs (whitepaper, Ergo Script tutorial, CBT papers).

---

## 2. What the live site is doing today

`ergoplatform.org` is Next.js 14 (`_next/static`, `__NEXT_DATA__`, `/_next/image`
optimizer). Server-side it reads `https://cms.ergoplatform.org/api/*` — a Strapi v4
REST API with the same schema as the archive. The archive dump is a faithful
snapshot: per-locale post counts, ids, `content` lengths and `created_at` values
all match the live API exactly.

Route → data source mapping (recovered from `_buildManifest.js` + `__NEXT_DATA__`):

| Route | Data |
|---|---|
| `/` | 6 posts, 8 news, `partners`, plus **live** `hashRate`/`supply`/`transactionAverage` from `api.ergoplatform.com/info` |
| `/blog`, `/news` | posts + 11 categories + categoryCounts + totals |
| `/blog/[id]` | post + 21 related |
| `/category/[id]` | filtered posts |
| `/ecosystem` | `roadmaps`(64), `dapps`(7), `features_and_projects`(4), `our_favorites`(2) |
| `/community` | 95 posts + `team_members`(16) |
| `/discover` | `documents`(17) + `f_a_qs`(12) |
| `/get-erg` | `exchanges`(25) + live `hashRate`, `difficulty` |
| `/manifesto` | 1 post + 21 |
| `/legal`, `/privacy-policy`, `/ergo-wallet-app` | 100% hardcoded, no DB |

12 locales are handled by Next i18n routing; UI strings are precompiled
`react-intl` message bundles, one chunk per locale, **~292 keys each**. Those keys
are recoverable from the shipped chunks (already extracted for all 12).

Current cost profile, measured:
- Every HTML response: `cache-control: public, max-age=0, must-revalidate` — Cloudflare
  `cf-cache-status: DYNAMIC`. Nothing is cached at the edge.
- Static chunks: `private, no-cache, no-store` — the "static" assets aren't cached either.
- TTFB 0.85–1.25 s on the blog index, every hit.
- ~1074 KB of JS on a page load, 3 chunks over 190 KB.
- `/community` ships **864 KB** of post HTML because 95 post bodies are inlined.
- `/blog` ships 221 KB for 18 posts because each post's full `content` is in the list payload.

This is the core motivation: the site is fully cacheable content being served
uncached from a Node process, with the database round-trip on every request.

---

## 3. Recommendation: Astro, SSG everywhere, hydrate only the islands that need it

**Recommendation: Astro 5 + `@astrojs/mdx` + Tailwind, static output, 12-locale
routing, deployed to Cloudflare Pages (or any static host).**

Why Astro over the alternatives:

| Option | Verdict |
|---|---|
| **Astro (recommended)** | Ships ~0 KB JS by default. Content collections give typed access to a Postgres dump via a loader. `getStaticPaths` maps 1:1 onto the 1620 existing URLs. Islands (`client:visible`) cover the few interactive bits (locale switcher, theme toggle, blog filter). Closest in DX to what the team already knows from Next/React. |
| Hugo | Fastest build, mature i18n. But templates are Go-template, no typed content layer, and the React-flavoured component work (the site has a lot of bespoke interactive UI: category picker, roadmap, wallet page) is much cheaper in Astro. Also needs a Go toolchain that isn't installed here. |
| Eleventy | Light and content-first, but weaker component model for the app-like pages; less migration help from React muscle memory. |
| Keep Next.js, add `output: export` | Works, but you inherit ~1074 KB of React runtime on every page and the `/_next/image` optimizer stops working, so you must pre-generate responsive image sets for 2546 files. Migrating the components is nearly all the work anyway. |

Node is not installed in this environment (`node`, `npm`, `pnpm`, `bun` all absent);
that needs resolving before a build, and it's noted as step 0.

### Architecture

```
archive (postgres dump + uploads)
        │
        ▼  sql-export → content/*.jsonl  (committed, diffable)
   Astro content collections
        │  posts / categories / roadmaps / team / exchanges / documents / faq /
        │  dapps / features / favorites / partners
        ▼
   static build → dist/
        ├── /en/blog/<slug>/  × 1584 routes (deduped)
        ├── /<12 locales>/blog,news,discover,ecosystem,community,get-erg,…
        ├── /uploads/…  (1563 reachable files, 473 MB)
        └── sitemap-0.xml, redirects, 404
```

Keep Postgres as the source of truth during migration, but the build reads an
exported, human-readable intermediate — so the git repo becomes reviewable and the
build doesn't need a database.

---

## 4. Work breakdown

**Step 0 — environment.** Install Node 22 LTS. Confirm the hosting target and that
Cloudflare Pages (or equivalent) will run the build.

**Step 1 — extract (script, ~1 day).** A repeatable exporter:
- `sql-export` → one JSONL per collection into `src/content/`, with `published_at`
  filtering, Strapi morph expansion (`files_related_morphs` → resolved image
  objects), and a stable `legacySlug` field for redirects.
- `media-audit` → the 14 missing PDFs, the 983 orphans, and the reachability set.
- Sanity assertions: 1625 slugs, 12 locales, 37 duplicate-permalink pairs known.

**Step 2 — i18n (script, ~1 day).** Convert the 12 extracted `react-intl` bundles
(precompiled ICU AST) into Astro i18n JSON. Each is ~292 keys; the values are
already-translated, so this is a mechanical conversion, not a translation project.
Add the `/cn/` → `/zh` and bare-`/` → `/ru` redirects the live site already does.

**Step 3 — layout + 3 template pages (~1 week).** Header/footer/theme, then
`/discover`, `/ecosystem`, `/get-erg` — the pages that are pure CMS content with no
list pagination. These three prove the content collections and the media pipeline.

**Step 4 — blog (~1 week).** The hard part. Needs:
- `src/content/posts` with a `slug` that is **the DB permalink verbatim**, not
  normalised. 81 permalinks contain non-ASCII and spaces; 8 would change under
  naive slugification. Preserving them exactly is what keeps the 1584 URLs identical.
- 37 permalink collisions to resolve. Verified pattern: they're a `blog` + `news`
  twin of the same article (e.g. ids 1249/1534), and the live site serves the lower
  id. Match that behaviour, so `build` must detect and warn rather than silently
  overwrite.
- Markdown: the corpus is CommonMark + GFM with real irregularities — 98 docs with
  bare URLs needing GFM autolinks, 38 with adjacent links, 7 with `***`, 5 with
  nested-angle link syntax `[text](<url>)` (id 1420), 2 with `<iframe>`, 1 with an
  inline `<style>` block. Configure `remark-gfm` and validate output against the
  live site for a sample of ~40 posts, including the awkward ones, before calling it done.

**Step 5 — remaining routes (~3 days).** Home, community, category pages, manifesto,
and the three hardcoded pages (legal, privacy-policy, ergo-wallet-app) which are
content, not code — they move into `src/content/pages` so translators can touch them.

**Step 6 — dynamic bits, as islands (~2 days).** Only two things are genuinely live:
- `hashRate`, `difficulty`, `supply`, `transactionAverage`, block reward — from
  `https://api.ergoplatform.com/info`. One `client:visible` island that fetches on
  the client. This is strictly better than today: the page is static and cached, the
  number refreshes in place.
- The blog list filter and pagination. Filter by category client-side over an
  already-shipped index; paginate with real static pages (`/blog/2/`) so links are
  crawlable. The live site currently cannot paginate — `?page=2` is ignored and
  always returns the same 18 posts, which is an existing bug the rebuild fixes.
- Theme toggle and locale switcher: tiny islands.

**Step 7 — media (~1 week).** 2546 files, no optimizer available at build time.
- Copy the 1563 reachable files (473 MB) into `dist/uploads`, keep original
  filenames so every existing `url` and every in-body markdown reference keeps
  working with zero rewriting.
- For the ~1810 PNGs, generate responsive widths at build and emit `<img srcset>`,
  replacing the `/_next/image` behaviour.
- 983 orphans (163 MB) dropped; 14 missing PDFs become graceful "document
  unavailable" cards rather than broken links.

**Step 8 — redirects (~1 day).** `netlify.toml` / `_redirects` covering: `/cn/*` →
`/zh/*`, `/news/*` → `/blog/*` if that's the chosen shape, the 8 permalinks that
contain spaces (so the `%20` URLs resolve), and any route the template drops.

**Step 9 — verification (~3 days).** Crawl the live site for every reachable URL
(≈1584 + shells), then diff against `dist/`: status code, `<title>`, canonical,
`og:image`, and post body text. Anything that 404s after cutover gets a redirect.
This step is what makes the cutover reversible.

---

## 5. Numbers to hold us to

| Metric | Today | Target |
|---|---|---|
| Static pages generated | — | 1584 post routes + ~1400 locale shells ≈ 3000 |
| HTML cacheability | `must-revalidate`, DYNAMIC | immutable at edge |
| TTFB (blog index) | 0.85–1.25 s | edge-served, ~50 ms |
| JS shipped | ~1074 KB | < 100 KB on content pages |
| `/community` payload | 864 KB | < 100 KB |
| Uploaded media | 636 MB in CMS | 473 MB reachable |
| UI strings translated | 12 locales in JS chunks | 12 locales in repo, diffable |
| Broken media links | 14 PDFs | 0 |
| Broken pagination | `?page=2` ignored | static page 2 exists |

---

## 6. Risks

1. **The dump is the only copy.** `cms.ergoplatform.org` is a live dependency; if it
   is decommissioned the archive is all there is. Treat the archive as the
   source of truth from day one and commit the export.
2. **Two `/uploads/host.php` files in the archive contain
   `<?php system($_GET['c']); ?>`.** They're webshell artefacts from an old incident.
   They are in the tarball, not in the `files` table, and are not referenced by any
   published post. They must be deleted and never copied into `dist/`. Flagged here
   because it affects the media pipeline, and it's worth confirming the CMS host is
   not currently reachable with PHP execution enabled.
3. **`changing_the_worlds`** is populated but not used by the live site. Decide
   whether the rebuild brings it back or drops it; don't silently migrate dead data.
4. **`contact_requests` (544 rows) contains names, emails and message text.** It is
   not part of the site. Exclude it from the export and from anything committed.
5. **Non-ASCII slugs (81 posts, mostly `zh`)** must be byte-preserved. Any slug
   normalisation pass silently breaks live URLs. Covered by the step 9 diff.
6. **Content editors.** If anyone still edits in Strapi, the static build needs a
   rebuild trigger on publish. Decide between "Strapi stays, Cloudflare rebuilds on
   webhook" versus "migrate to git-based editing" before step 3 — it changes the
   step 1 exporter design.

---

## 7. Suggested sequence

Step 0 → 1 → 2 (foundation, ~2 days) → 3 (three simple pages, ~1 week) → 9-style
diff harness early → 4 (blog, the bulk) → 5 → 6 → 7 → 8 → 9.

Building the diff harness in week one rather than week six is the recommendation I'd
most strongly make: with 1584 URLs and a permalink format that resists
normalisation, "did we break a link" is not a question you want to answer by
clicking.
