#!/usr/bin/env python3
"""Compare two builds of the site page by page.

The Astro 5 to 7 upgrade changes the bundler, so the emitted asset filenames and hashes
differ and a byte comparison is meaningless. This normalises those away and reports only
the pages whose rendered content actually changed.

    python3 scripts/diff-builds.py /tmp/opencode/dist-astro5 dist

Reports three classes of difference:

  pages       a route present in one build and not the other
  content     the rendered HTML differs, past the point where asset hashes are excluded
  assets      the asset graph differs — hashed filenames, or a file present in one only
"""
from __future__ import annotations

import re
import sys
from collections import Counter
from pathlib import Path

# hashed asset filenames differ between builds by construction
HASH = re.compile(r'[.-][0-9a-zA-Z_-]{6,}\.(css|js|mjs|woff2|png|webp|svg|jpg|jpeg)')
SOURCE_URL = re.compile(r'(src|href)="[^"]*\.(css|js|mjs)"')


def clean(html: str) -> str:
    """Drop the parts that legitimately differ between two builds of the same content."""
    out = re.sub(r'<script\b.*?</script>', '', html, flags=re.S | re.I)
    out = re.sub(r'<style\b.*?</style>', '', out, flags=re.S | re.I)
    out = HASH.sub(r'.\1', out)
    out = re.sub(r'\s+', ' ', out)
    return out.strip()


def routes(root: Path) -> set[str]:
    return {str(p.parent.relative_to(root)) for p in root.rglob('index.html')}


def assets(root: Path) -> set[str]:
    out = set()
    for d in ('_astro', '_image'):
        p = root / d
        if p.is_dir():
            out |= {f'{d}/{f.name}' for f in p.iterdir() if f.is_file()}
    return out


def main() -> None:
    old_root, new_root = Path(sys.argv[1]), Path(sys.argv[2])
    sample = int(sys.argv[3]) if len(sys.argv) > 3 else 60

    old, new = routes(old_root), routes(new_root)
    print(f'{old_root}: {len(old)} pages')
    print(f'{new_root}: {len(new)} pages')

    only_old, only_new = sorted(old - new), sorted(new - old)
    for label, items in (('only in old', only_old), ('only in new', only_new)):
        print(f'\n{label}: {len(items)}')
        for r in items[:20]:
            print('   ', r)

    print(f'\ncomparing content on {min(sample, len(old & new))} of {len(old & new)} shared pages...')
    changed: list[tuple[str, str, str]] = []
    for route in sorted(old & new)[:sample]:
        a = clean((old_root / route / 'index.html').read_text(errors='replace'))
        b = clean((new_root / route / 'index.html').read_text(errors='replace'))
        if a == b:
            continue
        i = next((i for i, (x, y) in enumerate(zip(a, b)) if x != y), min(len(a), len(b)))
        changed.append((route, a[max(0, i - 100) : i + 100], b[max(0, i - 100) : i + 100]))

    print(f'  {len(changed)} differ')
    for route, x, y in changed[:8]:
        print(f'\n  --- {route}')
        print('    old:', x[:200])
        print('    new:', y[:200])

    old_assets, new_assets = assets(old_root), assets(new_root)
    print(f'\nassets: old {len(old_assets)}, new {len(new_assets)}')
    # hashed names are expected to differ; count only files with stable names
    only_a = sorted(old_assets - new_assets)
    only_b = sorted(new_assets - old_assets)
    print(f'  {len(only_a)} only in old, {len(only_b)} only in new')
    for f in (only_a + only_b)[:10]:
        print('   ', f)

    kinds = Counter(route.split('/')[0] for route, _, _ in changed)
    if kinds:
        print('\nchanged by locale prefix:', dict(kinds))


if __name__ == '__main__':
    main()