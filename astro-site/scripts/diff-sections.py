#!/usr/bin/env python3
"""Which page sections does the live site have that this build does not?

The CMS export only holds what editors entered. The rest of the live site — hero
copy, the wallet table, the mining pool list, feature blurbs — was hardcoded in the
Next.js source, so it is invisible to a database export. This extracts the section
labels from both renderings and diffs them, which is how you find the gap.
"""
import html
import re
import sys
from urllib.parse import quote

UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/126 Safari/537.36'
LOCAL = 'http://127.0.0.1:4400'

ROUTES = [
    '/en/',
    '/en/blog/',
    '/en/discover/',
    '/en/ecosystem/',
    '/en/community/',
    '/en/get-erg/',
    '/en/manifesto/',
    '/en/ergo-wallet-app/',
    '/en/legal/',
]


def fetch(url):
    import subprocess
    r = subprocess.run(['curl', '-sL', '--max-time', '45', '-A', UA, url],
                       capture_output=True, text=True)
    return r.stdout


def labels(page):
    """Short standalone strings that read as section headings or card titles."""
    s = re.sub(r'<script\b.*?</script>', ' ', page, flags=re.S | re.I)
    s = re.sub(r'<style\b.*?</style>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<svg\b.*?</svg>', ' ', s, flags=re.S | re.I)
    out = set()
    for m in re.findall(r'<(?:h[1-4]|button|summary|label)\b[^>]*>(.*?)</(?:h[1-4]|button|summary|label)>',
                        s, re.S | re.I):
        t = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', m))).strip()
        if 2 < len(t) <= 48 and not t.startswith('http'):
            out.add(t)
    # nav column headings are plain uppercase text
    for m in re.findall(r'>([A-Z][A-Z0-9 &\'-]{3,40})<', s):
        t = html.unescape(m).strip()
        if t:
            out.add(t)
    return out


def main():
    print(f'{"route":26} {"live-only sections"}')
    total_missing = 0
    for route in ROUTES:
        ours = labels(fetch(f'{LOCAL}{route}'))
        theirs = labels(fetch(f'https://ergoplatform.org{quote(route, safe="/:")}'))
        missing = sorted(theirs - ours)
        total_missing += len(missing)
        print(f'\n{route}   live {len(theirs)} labels, ours {len(ours)}, '
              f'{len(missing)} only on live')
        for m in missing[:28]:
            print(f'    - {m}')
        if len(missing) > 28:
            print(f'    ... and {len(missing) - 28} more')
    print(f'\ntotal live-only labels across {len(ROUTES)} pages: {total_missing}')


if __name__ == '__main__':
    sys.exit(main())
