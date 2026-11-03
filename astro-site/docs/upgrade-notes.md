# Upgrade notes

Notes on dependency upgrades that could change what a reader sees. Each entry records what
was verified, so the next person does not have to re-derive it.

The rule for this repo: a version bump is only finished when the rendered output is proven
unchanged. Two scripts do that, and they are complementary.

| Script | Question it answers |
|---|---|
| `python3 scripts/diff-builds.py OLD NEW` | Did the markup change, ignoring asset hashes? |
| `node scripts/compare-builds.mjs PORT_A PORT_B routes...` | Does it *look* the same — rendered text, element geometry, computed fonts? |

`diff-builds.py` compares HTML **byte for byte**, whitespace significant. It strips only
`<script>`/`<style>` bodies and normalises hashed asset filenames, because a bundler upgrade
renames those by construction and everything else is signal. `compare-builds.mjs` covers what
markup comparison cannot: a stylesheet that loses a rule, or an element that moves 3px.

Compare element boxes **by position, not by text**. Keying on `textContent` collapses
duplicates — a related-posts card appears once per post that links it — and every duplicate
then compares against the last occurrence, so a correct build reports a difference on every
card on the page.

---

## Astro 5.18.2 → 7.3.5

**Why.** Astro 5.18.2 carried 11 open advisories, including a critical RCE in the AVIF
optimisation path (`GHSA-26w7-cxv4-gfx2`) and two XSS paths around slot names and spread
attributes. Most require SSR, islands or the dev server, none of which a fully prerendered
build uses — but shipping a repository that invites outside contributions on a version with
a known critical is not a trade worth making. Every one is fixed by 7.2.8; 7.3.5 is current.

Verified with OSV per-version queries (`https://api.osv.dev/v1/query`), not `npm audit`:
the registry audit endpoint was returning `400 Invalid package tree` and then failing TLS.

> OSV's `/v1/querybatch` endpoint **ignores the version** in each query and returns every
> advisory ever published for the package name. It reports 27 advisories for `astro@7.3.5`,
> including the critical that 7.2.8 fixed. Use `/v1/query` with an explicit version, or you
> will "discover" advisories that do not apply.

Installed versions after the bump, all clean per OSV: `astro@7.3.5`, `@astrojs/mdx@8.0.2`,
`@astrojs/sitemap@3.7.4`, `vite@8.3.1`, `sharp@0.35.5`, `zod@4.6.5`, `shiki@4.5.0`.

### What the upgrade actually changed here

Two of the breaking changes were real risks, and both are deliberately not adopted.

**Markdown processor.** Astro 7 makes its own Sätteri parser the default and stops installing
`@astrojs/markdown-remark`. This site depends on `remark-gfm` for load-bearing behaviour, not
niceties: 98 archived documents contain bare URLs that only become links under GFM's autolink
literal, and others use table syntax. Porting that to a Sätteri plugin is a rendering change
across the whole 1620-post corpus, so `astro.config.mjs` sets `processor: unified()` and keeps
`@astrojs/markdown-remark` installed. Revisit on the next content migration, not in a version
bump.

**Whitespace compression.** Astro 7 changes `compressHTML` from `true` to `'jsx'`, which strips
whitespace between inline elements using JSX rules instead of HTML rules. `<span>hello</span>
<em>world</em>` renders as `helloworld`. This would have been a site-wide visual regression
risk across 1945 pages, and it is the reason `compare-builds.mjs` exists rather than trusting
the markup diff.

It turned out to be a no-op here — `dist/en/blog/Ergo-Summit-2023/index.html` and every other
page are byte-identical between the two builds — but that is a measured result, not an
assumption. Nothing needed `compressHTML` pinning.

Everything else was inert for this project: `Astro.glob()` was already gone, there are no
route *files* with `%25` (slugs come from `getStaticPaths` params and are still emitted
verbatim, non-ASCII and spaces intact), zod 4 accepted the existing `src/content.config.ts`
schemas unchanged, and `@astrojs/mdx@8`'s peer of `astro ^7.2.10` is satisfied by 7.3.5.

### Verification

```
1945 pages   0 routes only in one build
1945 pages   0 differ byte-for-byte, whitespace significant
1945 pages   0 inline script bodies differ
CSS          byte-identical, same emitted filename (Base.CPlluaCt.css, 54587 bytes)
14 routes    rendered text, page height, image count, element boxes and computed
             fonts all identical (home, blog, get-erg, discover, community,
             ecosystem, a post, manifesto, legal, privacy-policy, ergo-wallet-app,
             a category index, ru/, zh/)
npm run verify:links    0 new broken of 160129 internal links
npm run verify:pages    132 routes, no problems
npm run verify:i18n     clean
check-frontmatter.py    1794 files parse
check-imports.py        118 relative imports resolve
npx astro dev           /en/, /en/blog/, /zh/blog/ all 200
```

Note for the next upgrade: `npm audit` was unusable throughout, both for the stale lockfile
(`Invalid package tree`) and for network failures. OSV's per-version endpoint is the fallback,
and the two scripts above are what make the bump safe rather than hopeful.
