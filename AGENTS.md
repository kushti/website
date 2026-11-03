# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project overview

This workspace contains a **static rebuild of [ergoplatform.org](https://ergoplatform.org)**,
replacing a Next.js 14 SSR deployment (served uncached from a Node process with a
database round-trip per request) with a fully prerendered static site.

The active project lives in `astro-site/` (an Astro 7 site, `output: 'static'`).
Everything else in the workspace is input material or documentation:

| Path | What it is |
|---|---|
| `astro-site/` | The site. This is where all code changes happen. |
| `PROPOSAL.md` | The original migration proposal (implemented; `astro-site/README.md` is the authoritative record of what was actually built). |
| `ergo-site-export/` | Source archive: `ergo-cms.sql` (Strapi 4.3.9 / PostgreSQL dump), `uploads/` (CMS media, 636 MB), `README.txt`. Only needed for `npm run import`. |
| `ergo-site-export.tar.gz` | Compressed copy of the same archive. |

## Technology stack

- **Astro 7.3.5** with `@astrojs/mdx`, `@astrojs/sitemap`, Tailwind CSS 4 (via `@tailwindcss/vite`), `remark-gfm`.
- Node **>= 22.12** (`engines` in `astro-site/package.json`); ESM throughout (`"type": "module"`).
- **Markdown pipeline stays on `unified`** (`processor: unified()` pinned in `astro-site/astro.config.mjs`), not Astro 7's default Sätteri parser — `remark-gfm` is load-bearing for the archived corpus (bare-URL autolinks, tables). Do not change this in a version bump.
- No framework runtime (React/Vue/Svelte); pages are `.astro` components. The few interactive bits (live hashrate/difficulty numbers from `api.ergoplatform.com`, theme/locale switchers) are small client-side scripts, not hydrated islands.
- Python 3 is used for several verification/import scripts (no pip dependencies beyond `pyyaml` for `check-frontmatter.py`).
- Playwright (`playwright-core` + a chromium build) drives the browser-based checks and comparison tooling.

## Build and test commands

Run from `astro-site/`:

```bash
npm install
npm run dev            # local dev server
npm run build          # -> dist/ (also validates all content against the Zod schemas)
npm run serve          # serve dist/ on 127.0.0.1:4400 (the port the checks expect)

# verification — all of these run in CI (.github/workflows/build.yml)
npm run verify:links   # every internal link in dist/ resolves
npm run verify:pages   # sample of routes loaded in a real browser (needs chromium)
npm run verify:i18n    # every t() key a template uses resolves
python3 scripts/check-imports.py
python3 scripts/check-frontmatter.py

# comparison against production / between builds (not run in CI)
npm run compare:live -- --all
npm run diff:body
npm run diff:builds -- /path/to/old-dist dist
npm run compare:builds -- 4400 4401 /en/ /en/blog/
```

`npm run import` re-imports content from the CMS archive (needs a local PostgreSQL
with the dump loaded + `uploads/`); its output is committed, so a normal clone needs
neither. Run it only when pulling in new CMS content, never as part of the build.

**There is no unit-test suite.** "Testing" here means the verification scripts above:
the build itself is the schema check, `verify:links` catches links to pages that were
never generated, `verify:pages` catches components that throw at render time, and
`verify:i18n` catches wrong `t()` keys (a miss renders the key itself as visible text).

## Code organization (`astro-site/src/`)

- `content.config.ts` — Zod schemas for all Astro content collections (posts,
  categories, roadmaps, team, exchanges, documents, faqs, dapps, projects, partners,
  favorites, changing-the-worlds, pages, wallets, miningPools, miners, homeHighlights).
  The build fails on the first schema violation.
- `content/` — all site content as committed files. `posts/<locale>/<slug>.md` holds
  1620 posts across 12 locales; each other collection is one directory of `.md` files;
  `pages/` also holds JSON section data (wallets, mining pools, miners, home
  highlights) recovered from the live site's rendered HTML.
- `i18n/` — `config.ts` (12 locales, `ru` default, legacy `cn → zh` alias),
  `routes.ts` (top-level route table + blog page size, shared with nav/footer/sitemap),
  `messages/<locale>.json` (~290 UI strings per locale), `index.ts` (`t()` lookup with
  English fallback).
- `pages/[locale]/` — every route: home, blog index + `[slug]` + static `page/[n]`
  pagination, category, discover, ecosystem, community, get-erg, manifesto, legal,
  privacy-policy, ergo-wallet-app. `404.astro` and `[..._].astro` sit at the root.
- `components/` — shared Astro components (Header, Footer, PostCard, BlogList,
  Illustration, …) plus `components/home/` for the home-page sections.
- `lib/` — helpers: `content.ts` (cached `getCollection` wrappers, media src/srcset
  pickers), `illustrations.ts`, `artwork.ts`, `brand.ts`.
- `layouts/Base.astro` — the HTML shell (theme, hreflang).
- `styles/global.css` — type scale and section treatments.
- `scripts/` (~35 files) — the import pipeline (`import-archive.mjs`,
  `export-from-db.mjs`, `export-media.mjs`, `rewrite-links.mjs`, `write-redirects.mjs`),
  verification tools, and recovery scripts that read content back out of the live site.
- `public/uploads/` — 1213 CMS media files (397 MB, committed; makes the repo ~369 MB).
  `public/assets/`, `public/artwork/`, `public/illustrations/`, `public/fonts/` are
  scraped from production; provenance is documented in the README.

## Hard conventions — do not violate

These exist because the rebuild must keep ~1584 existing URLs byte-identical:

1. **Never normalise or regenerate a post `slug`.** It is the CMS `permalink` verbatim
   (81 contain non-ASCII or spaces; 8 would be mangled by a slugifier). The URL comes
   from the frontmatter `slug` field, never from the title or the filename.
2. **Never rename a content file without a redirect** in `scripts/write-redirects.mjs`.
3. **Media URLs stay exactly `/uploads/<name>`** — 1620 post bodies and every
   collection entry reference those paths literally. Filenames are preserved byte-for-byte.
4. **`contact_requests` (personal data) is never exported or committed.**
5. **Two webshell files in the archive** (`uploads/shell_*.php`, `uploads/test_*.phtml`,
   containing `<?php system($_GET['c']); ?>`) must never be copied into `public/` or `dist/`.

## Content editing workflow

Adding a post: create `src/content/posts/en/<slug>.md` with the frontmatter shape
shown in `astro-site/README.md` ("Adding a post"), then add translations under
`src/content/posts/<locale>/`. Pages fall back to English when a locale has no
translation. Frontmatter changes must match the Zod schema in `src/content.config.ts`.

## Deployment

Static `dist/` output; intended host is **Cloudflare Pages** (build `npm run build`,
output `dist`). `public/_redirects` handles `/cn/* → /zh/*`, `/news/* → /blog/*`, and
locale-less paths → default locale `ru`. CI (`.github/workflows/build.yml`) builds,
runs all checks, and deploys a preview per PR when `CLOUDFLARE_*` secrets are set.

## Key documentation

All in `astro-site/`, in English:

- `README.md` — the authoritative build/verification/media/provenance record. Read it first.
- `docs/data-notes.md` — archive defects that shaped the output (36 permalink collisions, missing PDFs, …).
- `docs/output-diff.md` — what this build does and does not match against production.
- `docs/visual-comparison.md` — measured visual parity work.
- `docs/upgrade-notes.md` — how the Astro 5 → 7 bump was verified as rendering-neutral
  (`diff:builds` + `compare:builds`); follow the same procedure after any framework bump.

## Security considerations

- The archive's webshells (see above) are an old-compromise artefact; never serve them.
- `contact_requests` rows are personal data; keep them out of the repo and the build.
- Production rate-limits above ~4 concurrent requests — the recovery/comparison
  scripts fetch one page at a time with backoff; keep that pattern when extending them.
- `/privacy-policy` is currently a placeholder and needs a real policy before cutover.
