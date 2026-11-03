#!/usr/bin/env python3
"""Compare only the article body, excluding site chrome.

The whole-page comparison is dominated by the related-posts block: the live site ends
every post with 21 links and thumbnails, this build with 6, so page-level word counts
differ on every route even when the article itself is byte-identical. This isolates the
prose: everything between the <h1> and the first "related posts" marker.

A body mismatch is a content bug. A chrome difference is a design decision.
"""
import argparse
import concurrent.futures
import difflib
import html
import re
import subprocess
import sys
from urllib.parse import quote, urlparse

LOCAL = 'http://127.0.0.1:4400'
LIVE = 'https://ergoplatform.org'
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'

# a block that looks like a post card stamp rather than prose
DATEISH = re.compile(
    r'(^|\s)((\d{1,2}\s+)?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)'
    r'[a-z]*\s+\d{1,2},?\s+\d{4}|\d{4}-\d{2}-\d{2}|\d+\s*(min|minute|мin|'
    r'мин|分鐘|分钟|dakika)\b)', re.I)

MARKERS = re.compile(
    r'(related posts|back to all posts|nästa|relacionados|verwandte|'
    r'sledeți|Σχετικά|相关|ilgili|пов\'язані|bu içerik|naviazané)',
    re.I)


def fetch(url, timeout=35):
    try:
        r = subprocess.run(
            ['curl', '-sL', '--max-time', str(timeout), '-A', UA, url],
            capture_output=True, text=True, timeout=timeout + 5)
        return r.stdout
    except subprocess.TimeoutExpired:
        return ''


def clean(s):
    s = re.sub(r'<script\b.*?</script>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<style\b.*?</style>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<svg\b.*?</svg>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<!--.*?-->', ' ', s, flags=re.S)
    return s


def body_of(page):
    """
    Prose, taken only from block elements.

    Scraping all visible text picks up the live site's inline SVG and its 21-card
    related-posts carousel, which made every page look 80% longer than it is. Taking
    only p/li/h2-h4/td/blockquote/pre isolates what the reader reads as the article.
    """
    s = clean(page)
    m = re.search(r'<h1\b[^>]*>(.*?)</h1>', s, re.S | re.I)
    if not m:
        return '', [], set()

    blocks = []
    for tag in re.findall(
        r'<h[2-4]\b[^>]*>.*?</h[2-4]>|<p\b[^>]*>.*?</p>|<li\b[^>]*>.*?</li>|'
        r'<td\b[^>]*>.*?</td>|<blockquote\b[^>]*>.*?</blockquote>|<pre\b[^>]*>.*?</pre>',
        s[m.end():], re.S | re.I,
    ):
        t = re.sub(r'<[^>]+>', ' ', tag)
        t = re.sub(r'\s+', ' ', html.unescape(t)).strip()
        if t:
            blocks.append(t)

    heads = [re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', h))).strip()
             for h in re.findall(r'<h[2-4]\b[^>]*>.*?</h[2-4]>', s[m.end():], re.S | re.I)]

    # Cut the related-posts block. This build labels it with a heading; the live site
    # renders 21 cards with no heading at all, each stamped with a date, so on that
    # side the signature is a repeated date-ish block.
    cut = len(blocks)
    for i, b in enumerate(blocks):
        if MARKERS.match(b) and len(b) < 40:
            cut = i
            break
        if DATEISH.match(b) and i > 0 and any(DATEISH.match(x) for x in blocks[:i]):
            cut = i
            break

    text = ' '.join(blocks[:cut])
    heads = heads[:cut]
    return text, heads, body_images(s[m.end():])


def body_images(rest_html):
    s = clean(rest_html)
    out = set()
    for tag in re.findall(r'<img\b[^>]*>', s, re.I):
        u = re.search(r'(?:src|data-src)="([^"]+)"', tag)
        if u:
            v = html.unescape(u.group(1))
            if '/uploads/' in v or '/img/' in v:
                out.add(v.split('/')[-1])
    return out


EXTERNAL = set()


def external_news(route):
    """True when the post is an external link card rather than an article.

    The sitemap carries percent-encoded slugs and the frontmatter does not, so the
    route has to be decoded before it can be matched against the exported content.
    """
    from urllib.parse import unquote
    slug = unquote(route.rstrip('/').split('/')[-1])
    return bool(EXTERNAL.get((route.split('/')[1], slug)))


def compare(route):
    ours_raw = fetch(f'{LOCAL}{route}')
    live_raw = fetch(f'{LIVE}{quote(route, safe="/:&()!*+,!$._-~")}')

    ours, our_heads, our_imgs = body_of(ours_raw)
    theirs, their_heads, their_imgs = body_of(live_raw)

    ow = set(w.lower().strip('.,;:!?()[]\'"') for w in ours.split())
    tw = set(w.lower().strip('.,;:!?()[]\'"') for w in theirs.split())

    return {
        'route': route,
        'ourWords': len(ours.split()),
        'liveWords': len(theirs.split()),
        'onlyOurs': sorted(ow - tw),
        'onlyLive': sorted(tw - ow),
        'sameHeadings': our_heads == their_heads,
        'ourHeadings': our_heads,
        'liveHeadings': their_heads,
        'headingDiff': [l for l in difflib.unified_diff(our_heads, their_heads, 'ours', 'live', lineterm='', n=0)][:12],
        'imagesOnlyOurs': sorted(our_imgs - their_imgs),
        'imagesOnlyLive': sorted(their_imgs - our_imgs),
    }


def load_external():
    """locale/slug -> True for posts that are an external link card in the archive."""
    import glob, re as _re
    out = {}
    for f in glob.glob('src/content/posts/*/*.md'):
        head = open(f, encoding='utf-8', errors='replace').read(3000)
        m_loc = _re.search(r'^locale:\s*"?(\w+)"?', head, _re.M)
        m_slug = _re.search(r'^slug:\s*"?([^"\n]+)"?', head, _re.M)
        # `externalUrl: null` is the common case and must not count as a match
        m_ext = _re.search(r'^externalUrl:\s*(?!null)(\S+)', head, _re.M)
        if m_loc and m_slug and m_ext:
            out[(m_loc.group(1), m_slug.group(1).strip())] = True
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--sample', type=int, default=50)
    ap.add_argument('--workers', type=int, default=4)
    ap.add_argument('--locale')
    ap.add_argument('--route')
    ap.add_argument('--prose-only', action='store_true',
                    help='skip external-link news posts, which are a link card on both sides')
    args = ap.parse_args()

    if args.route:
        print(json.dumps(compare(args.route), indent=1, ensure_ascii=False))
        return 0

    sm = open('dist/sitemap-0.xml', encoding='utf-8').read()
    routes = [urlparse(l).path for l in re.findall(r'<loc>(.*?)</loc>', sm)]
    routes = [r for r in routes if re.match(r'^/[a-z]{2}/blog/[^/]+/?$', r)]
    if args.locale:
        routes = [r for r in routes if r.startswith(f'/{args.locale}/')]

    if args.sample < len(routes):
        step = max(1, len(routes) // args.sample)
        routes = routes[::step][: args.sample]

    global EXTERNAL
    EXTERNAL = load_external()

    if args.prose_only:
        # a news post whose url is external has no body of its own on either site
        import json as _json
        routes = [r for r in routes if not external_news(r)]
        print(f'(external-link news posts excluded)')

    print(f'comparing article bodies for {len(routes)} posts\n')
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
        for r in ex.map(compare, routes):
            results.append(r)

    empty = [r for r in results if r['ourWords'] == 0]
    missing = [r for r in results if r['liveWords'] > 0 and r['ourWords'] == 0]
    short = [r for r in results if r['liveWords'] and r['ourWords'] / r['liveWords'] < 0.9]
    heading_bad = [r for r in results if not r['sameHeadings']]
    extra = [r for r in results if r['liveWords'] and r['ourWords'] / r['liveWords'] > 1.1]
    img_diff = [r for r in results if r['imagesOnlyLive'] or r['imagesOnlyOurs']]

    print('=== article body (chrome excluded) ===')
    print(f'  compared                        {len(results)}')
    print(f'  empty on both sides             {len(empty)}')
    print(f'  ours empty, live has a body     {len(missing)}')
    print(f'  ours <90% of live words         {len(short)}')
    print(f'  ours >110% of live words        {len(extra)}')
    print(f'  heading sequences differ        {len(heading_bad)}')
    print(f'  in-body images differ           {len(img_diff)}')

    if short:
        print('\n--- ours materially shorter ---')
        for r in sorted(short, key=lambda r: r['ourWords'] / max(1, r['liveWords']))[:15]:
            print(f'  {r["route"][:66]:66} {r["ourWords"]:>5} vs {r["liveWords"]:>5}')
            print(f'      only on live: {" ".join(r["onlyLive"][:14])[:150]}')

    if extra:
        print('\n--- ours materially longer ---')
        for r in sorted(extra, key=lambda r: -r['ourWords'] / max(1, r['liveWords']))[:10]:
            print(f'  {r["route"][:66]:66} {r["ourWords"]:>5} vs {r["liveWords"]:>5}')
            print(f'      only on ours: {" ".join(r["onlyOurs"][:14])[:150]}')

    if img_diff:
        print('\n--- in-body images differ ---')
        for r in img_diff[:12]:
            print(f'  {r["route"][:70]}')
            if r['imagesOnlyLive']:
                print(f'      live only: {", ".join(r["imagesOnlyLive"][:4])}')
            if r['imagesOnlyOurs']:
                print(f'      ours only: {", ".join(r["imagesOnlyOurs"][:4])}')

    if heading_bad:
        print('\n--- heading sequence differs ---')
        for r in heading_bad[:10]:
            print(f'  {r["route"]}')
            for line in r['headingDiff']:
                print(f'      {line[:110]}')

    return 0


if __name__ == '__main__':
    sys.exit(main())
