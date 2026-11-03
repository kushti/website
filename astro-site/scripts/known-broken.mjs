/**
 * Links that were already broken in the source archive.
 *
 * The rebuild repairs 563 of the 581 broken internal links the archive contained — via
 * locale prefixing, `/news` aliasing, slug-casing repair and cross-locale fallback. The
 * rest point at content that does not exist in the CMS at all: sections of the old
 * site (`/wallets/`, `/mobile_wallets/`, `/mining/`), posts that were deleted before
 * the export, and three malformed markdown links.
 *
 * They are listed here so that CI stays green on a known-broken baseline while still
 * failing if anything NEW breaks. Each line is `path` or `path -> target`.
 * Remove an entry once the underlying content is fixed.
 */

export const KNOWN_BROKEN = new Set([
  // sections of the previous site that no longer exist
  '/mobile_wallets/',
  '/wallets/',
  '/mining/',

  // posts referenced by others but never published in the CMS
  '/en/blog/2021-04-21-wrapassets-announces-integration-with-ergodex/',
  '/es/blog/2020-10-19-the-first-ergo-nft-auction-is-under-way/',
  '/it/blog/2021-07-16-ergoutils-a-how-to-guide/',
  '/it/blog/2021-04-26-il-manifesto-ergo/',
  '/en/blog/Centralized-Exchange-vs-Decentralized-Exchange-What-are-the-Differences',
  '/en/blog/EIP37 Hard Fork/',
  '/en/blog/Babel Fees on Ergo: How-To Guide/',
  '/en/blog/Ergo%E2%80%99s-Oracle-Pools-V2-An-Innovative-Design/',
  '/en/blog/Ergo%E2%80%99s-Rosen-Bridge-A-New-and-Better-Way-to-Interact-Cross-Chain/',
  '/it/blog/EIP37 Hard Fork/',

  // malformed markdown in the source
  'link',
  'docs.ergoplatform.org',

  // a localhost swagger URL pasted into a post body
  '127.0.0.1:9052/swagger',

  // casing drift in a locale the repair pass could not confirm against the index
  '/zh/blog/2019_04_22-lets/',
]);
