#!/usr/bin/env python3
"""Download the SVG illustrations production inlines in its markup.

Production's Next.js build inlines a fair amount of artwork as SVG in the served HTML
rather than serving it as a file, so it cannot be fetched by URL. Recovering it means
pulling the live page and extracting the inline <svg> elements — the same argument as
recovering the copy: it is the site's own artwork and it has to end up somewhere.

    python3 scripts/fetch-illustrations.py https://ergoplatform.org/en/ /en/blog/ ...

Chrome is excluded: the logo, the hexagon mark, the social glyphs, the sun and moon and
the hamburger are all small, viewBox'd icons and are already reimplemented in this build.
What is kept is the illustration work — the 3D blocks, which have no equivalent here.

Files are named by content hash so a page that shares the chrome with another page does
not duplicate it, and identical art across pages collapses to one file. The result is
committed, so the build never depends on the network.

Production rate-limits and drops connections above ~4 concurrent requests, so pages are
fetched one at a time with a pause between them.
"""
import hashlib
import json
import re
import subprocess
import sys
import time
from pathlib import Path

OUT = Path('public/illustrations')
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

# viewBoxes that are chrome, already reimplemented in this build
CHROME_VIEWBOXES = {'0 0 213 82', '0 0 82 82'}

# an illustration has some substance to it; an icon does not
MIN_PATHS = 2


def slugify(text: str) -> str:
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')[:36] or 'art'


def fetch(url: str) -> str:
    """curl rather than urllib: this machine has no IPv6 route, and Node's DNS-ordering
    flags do not apply to a plain urllib call either."""
    res = subprocess.run(
        ['curl', '-sL', '-m', '60', '--compressed', '-A', UA, url],
        capture_output=True,
        text=True,
    )
    return res.stdout


def sanitize(attrs: str, inner: str) -> str:
    """Turn an inline <svg> into a standalone, valid document.

    The production build repeats xmlns, and its CSS-module class names mean nothing outside
    its stylesheet. The intrinsic width and height are dropped so the file scales to
    whatever box it is put in, and a `currentColor`-friendly fill is left alone.
    """
    keep = {}
    for m in re.finditer(r'([a-zA-Z-]+)="([^"]*)"', attrs):
        name, value = m.group(1), m.group(2)
        if name in ('class', 'width', 'height', 'xmlns'):
            continue
        keep[name] = value  # a repeated attribute keeps its first value, as XML does

    head = ' '.join(f'{k}="{v}"' for k, v in keep.items())
    return f'<svg xmlns="http://www.w3.org/2000/svg" {head}>{inner}</svg>'


def illustrations(body: str):
    """Yield (viewBox, svg) for every inline illustration, chrome excluded."""
    body = re.sub(r'<script\b.*?</script>', ' ', body, flags=re.S | re.I)
    body = re.sub(r'<style\b.*?</style>', ' ', body, flags=re.S | re.I)

    for m in re.finditer(r'<svg\b([^>]*)>(.*?)</svg>', body, re.S | re.I):
        attrs, inner = m.group(1), m.group(2)
        viewbox = re.search(r'\bviewBox="([^"]+)"', attrs)
        if not viewbox or not inner.strip():
            continue
        vb = viewbox.group(1)
        if vb in CHROME_VIEWBOXES:
            continue

        svg = sanitize(attrs, inner)
        if svg.count('<path') < MIN_PATHS:
            continue
        yield vb, svg


def main() -> None:
    urls = sys.argv[1:] or ['https://ergoplatform.org/en/']

    OUT.mkdir(parents=True, exist_ok=True)

    manifest: dict[str, list[dict]] = {}
    seen: dict[str, str] = {}  # hash -> filename
    previous = set()
    manifest_path = OUT / 'manifest.json'
    if manifest_path.exists():
        try:
            previous = {
                entry['file']
                for entries in json.loads(manifest_path.read_text()).values()
                for entry in entries
            }
        except (ValueError, KeyError):
            previous = set()

    for url in urls:
        page = slugify(url.replace('https://ergoplatform.org', '').strip('/').replace('/', '-'))
        print(f'fetching {url}')
        body = fetch(url)
        if not body:
            print('  empty response; skipping')
            time.sleep(4)
            continue

        found = []
        for vb, svg in illustrations(body):
            digest = hashlib.sha256(svg.encode()).hexdigest()[:10]
            if digest in seen:
                found.append({'viewBox': vb, 'file': seen[digest]})
                print(f'  {vb}  (already have {seen[digest]})')
                continue

            name = f'{slugify(vb)}-{digest}.svg'
            (OUT / name).write_text(svg, encoding='utf-8')
            seen[digest] = name
            found.append({'viewBox': vb, 'file': name})
            print(f'  {name}  {len(svg) // 1024} kB')

        manifest[page] = found
        time.sleep(4)

    # keep files this run did not touch: they were recovered from a page not in this run
    for entry in previous - set(seen.values()):
        if (OUT / entry).exists() and not (OUT / entry).read_text().strip():
            (OUT / entry).unlink()

    path = OUT / 'manifest.json'
    existing = json.loads(path.read_text()) if path.exists() else {}
    existing.update(manifest)
    path.write_text(json.dumps(existing, indent=1) + '\n', encoding='utf-8')
    print(f'\n{len(list(OUT.glob("*.svg")))} illustrations in {OUT}; manifest at {path}')


if __name__ == '__main__':
    main()