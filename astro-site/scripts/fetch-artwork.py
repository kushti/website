#!/usr/bin/env python3
"""Fetch production's section artwork and put it in public/assets/.

    python3 scripts/fetch-artwork.py [--only home,footer] [--dry-run]

Why this exists
---------------
docs/visual-comparison.md claimed the section illustrations were unrecoverable because they
"render client-side and never appear in the served markup". That was wrong. They are ordinary
static files under /assets/<section>/, referenced from the production stylesheet and from
inline style attributes. Only the *donut charts* in the HIGHLIGHTS carousel are genuinely
absent from the DOM; everything else is a plain <img> or background-image once the page has
hydrated.

The list is read out of the production CSS and JS bundles rather than hard-coded, so a new
section's artwork is picked up automatically.

Provenance
----------
Every file here is scraped from ergoplatform.org, not from any documented asset source. That
is the same category as public/illustrations/ and the recovered homeHighlights /
wallets JSON: artwork belonging to the site being rebuilt. See the licensing note in
README.md before cutover.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ORIGIN = 'https://ergoplatform.org'
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'assets'

# the bundles the asset list is mined from
BUNDLES = [
    'https://ergoplatform.org/_next/static/css/a6e96115e6fa1443.css',
    'https://ergoplatform.org/_next/static/chunks/pages/index-a572bdb8b527a814.js',
    'https://ergoplatform.org/_next/static/chunks/pages/_app-749e29e6de283cf2.js',
    'https://ergoplatform.org/_next/static/chunks/9414-22fb31dbb6f87dd6.js',
    'https://ergoplatform.org/_next/static/chunks/4587-348d2880dcd171e3.js',
    'https://ergoplatform.org/_next/static/chunks/9995-9f7404a70570541b.js',
    'https://ergoplatform.org/_next/static/chunks/2758-e323e68893a5e503.js',
]

# fonts are handled by scripts/fetch-fonts.mjs and are a licensing question of their own
SKIP_DIRS = ('fonts',)
ART_EXT = r'(?:png|webp|avif|svg|jpg|jpeg)'
ASSET_RE = re.compile(r'["\'(]((?:/|https?://)[^"\')\s]*?\.' + ART_EXT + r')')
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'


def fetch(url: str, timeout: int = 60, attempts: int = 4) -> bytes:
    """GET with retries. Production drops the connection under a few concurrent requests."""
    last: Exception | None = None
    for i in range(attempts):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read()
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            last = exc
            time.sleep(2 * (i + 1))
    raise last  # type: ignore[misc]


def discover() -> list[str]:
    """Read the asset list out of production's own bundles."""
    found: set[str] = set()
    for url in BUNDLES:
        try:
            txt = fetch(url).decode('utf-8', 'replace')
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            print(f'  ! {url.rsplit("/", 1)[-1]}: {exc}', file=sys.stderr)
            continue
        for m in ASSET_RE.findall(txt):
            if any(f'/{d}/' in m or m.endswith(f'/{d}') for d in SKIP_DIRS):
                continue
            found.add(m if m.startswith('/') else '/' + m.split('://', 1)[1].split('/', 1)[1])
    return sorted(found)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument('--only', help='comma-separated section names, e.g. home,footer')
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()

    print('reading asset list from production bundles...')
    urls = discover()
    if args.only:
        keep = set(args.only.split(','))
        urls = [u for u in urls if any(f'/{k}/' in u or f'/{k}-' in u for k in keep)]
    print(f'  {len(urls)} files')

    if args.dry_run:
        for u in urls:
            print('  ' + u)
        return

    OUT.mkdir(parents=True, exist_ok=True)
    fetched, failed, total = 0, [], 0

    def grab(path: str) -> tuple[str, int, str | None]:
        dest = ROOT / 'public' / path.lstrip('/')
        dest.parent.mkdir(parents=True, exist_ok=True)
        # already have it: an interrupted run should resume, not refetch
        if dest.is_file() and dest.stat().st_size > 64:
            return path, dest.stat().st_size, None
        try:
            data = fetch(ORIGIN + path)
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            return path, 0, str(exc)
        # a 200 can still be an error page. SVG legitimately starts with '<', so only the
        # raster types get the binary check.
        if path.endswith('.svg'):
            looks_real = b'<svg' in data[:2048]
        else:
            looks_real = len(data) > 64 and data[:1] != b'<'
        if not looks_real:
            return path, 0, 'not an image'
        dest.write_bytes(data)
        return path, len(data), None

    # production starts refusing connections at around four in flight, and urllib's pool
    # does not recover quickly, so this stays at two
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        for path, size, err in pool.map(grab, urls):
            if err:
                failed.append((path, err))
            else:
                fetched += 1
                total += size
                print(f'  {size / 1024:8.1f} KB  {path}')

    print(f'\n{fetched} fetched, {total / 1024 / 1024:.1f} MB total')
    if failed:
        print(f'{len(failed)} failed:')
        for path, err in failed:
            print(f'  {path}: {err}')

    manifest = {
        'origin': ORIGIN,
        'note': 'scraped from ergoplatform.org; see README.md licensing note',
        'files': {p: (ROOT / 'public' / p.lstrip('/')).stat().st_size
                  for p in urls if (ROOT / 'public' / p.lstrip('/')).is_file()},
    }
    (OUT.parent / 'assets.manifest.json').write_text(json.dumps(manifest, indent=1) + '\n')
    print('wrote public/assets.manifest.json')


if __name__ == '__main__':
    main()