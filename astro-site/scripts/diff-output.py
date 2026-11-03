#!/usr/bin/env python3
"""Compare what a reader actually gets, not just the status code.

Status and <title> matching is a weak signal — a page can return 200 with the right
title and still be missing the article body, an image, or half its links. This walks
both sites, reduces each page to comparable facts (prose, headings, links, images) and
reports what differs.

Usage:
    python3 scripts/diff-output.py --sample 40          # spread across the corpus
    python3 scripts/diff-output.py --route /en/blog/... # one page, verbose
    python3 scripts/diff-output.py --section blog --sample 60
"""
import argparse
import concurrent.futures
import html
import json
import re
import subprocess
import sys
from collections import Counter
from urllib.parse import quote, urljoin, urlparse

LOCAL = 'http://127.0.0.1:4400'
LIVE = 'https://ergoplatform.org'
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'


def fetch(url, timeout=35):
    try:
        r = subprocess.run(
            ['curl', '-sL', '--max-time', str(timeout), '-A', UA,
             '-w', '\n##STATUS:%{http_code}', url],
            capture_output=True, text=True, timeout=timeout + 5)
        return r.stdout
    except subprocess.TimeoutExpired:
        return '\n##STATUS:timeout'


def strip_noise(s):
    """Drop script/style/svg so their contents do not count as page text."""
    s = re.sub(r'<script\b.*?</script>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<style\b.*?</style>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<svg\b.*?</svg>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<noscript\b.*?</noscript>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<!--.*?-->', ' ', s, flags=re.S)
    return s


def facts(body):
    """Reduce a page to the things a reader would notice."""
    clean = strip_noise(body)

    # prose: all visible text, whitespace-normalised
    text = re.sub(r'<[^>]+>', ' ', clean)
    text = html.unescape(text)
    text = re.sub(r'\s+', ' ', text).strip()
    words = [w for w in re.split(r'\s+', text) if w]
    word_set = set(w.lower().strip('.,;:!?()[]\'"') for w in words)

    headings = [re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', h))).strip()
                for h in re.findall(r'<h[1-6]\b[^>]*>.*?</h[1-6]>', clean, re.S | re.I)]

    links = set()
    for m in re.finditer(r'<a\b[^>]*href="([^"]+)"', clean, re.I):
        href = html.unescape(m.group(1))
        if href.startswith(('#', 'mailto:', 'tel:', 'javascript:')):
            continue
        links.add(href)

    images = set()
    for m in re.finditer(r'<img\b[^>]*>', clean, re.I):
        tag = m.group(0)
        for attr in ('src', 'data-src'):
            u = re.search(rf'{attr}="([^"]+)"', tag)
            if u:
                images.add(html.unescape(u.group(1)))
                break

    # alt text matters for accessibility, not just presence
    alts = [re.search(r'alt="([^"]*)"', t) for t in re.findall(r'<img\b[^>]*>', clean, re.I)]
    alts = [html.unescape(a.group(1)) for a in alts if a]

    return {
        'text': text,
        'words': len(words),
        'wordSet': word_set,
        'headings': headings,
        'links': links,
        'images': images,
        'alts': alts,
        'has_main': bool(re.search(r'<main\b', clean, re.I)),
        'has_h1': len(re.findall(r'<h1\b', clean, re.I)),
    }


def analyse(route):
    ours_raw = fetch(f'{LOCAL}{route}')
    theirs_raw = fetch(f'{LIVE}{quote(route, safe="/:&()!*+,!$._-~")}')

    def status(raw):
        m = re.search(r'##STATUS:(\S+)', raw)
        return m.group(1) if m else None

    ours, theirs = facts(ours_raw), facts(theirs_raw)

    ow, tw = ours['wordSet'], theirs['wordSet']
    our_links_norm = {normalise(l) for l in ours['links']}
    their_links_norm = {normalise(l) for l in theirs['links']}
    our_imgs_norm = {normalise(i) for i in ours['images']}
    their_imgs_norm = {normalise(i) for i in theirs['images']}

    return {
        'route': route,
        'ourStatus': status(ours_raw),
        'liveStatus': status(theirs_raw),
        'ourWords': ours['words'],
        'liveWords': theirs['words'],
        'wordsOnlyOurs': sorted(ow - tw)[:400],
        'wordsOnlyLive': sorted(tw - ow)[:400],
        'linksOnlyOurs': sorted(our_links_norm - their_links_norm),
        'linksOnlyLive': sorted(their_links_norm - our_links_norm),
        'imagesOnlyOurs': sorted(our_imgs_norm - their_imgs_norm),
        'imagesOnlyLive': sorted(their_imgs_norm - our_imgs_norm),
        'ourHeadings': ours['headings'],
        'liveHeadings': theirs['headings'],
        'ourAlts': ours['alts'],
        'liveAlts': theirs['alts'],
    }


def normalise(u):
    """Strip origin and query so /uploads/x?w=1 compares equal to /uploads/x."""
    p = urlparse(u)
    path = p.path
    # the live site serves media through a Cloudflare 308; normalise the shape
    path = path.replace('/_next/image', '/uploads')
    m = re.search(r'url=%2Fuploads%2F(.+?)&', u)
    if m:
        path = '/uploads/' + m.group(1)
    if path.startswith('/en') or path.startswith('/ru') or path.startswith('/de') \
       or path.startswith('/es') or path.startswith('/pt') or path.startswith('/zh') \
       or path.startswith('/it') or path.startswith('/pl') or path.startswith('/hu') \
       or path.startswith('/tr') or path.startswith('/sk') or path.startswith('/id'):
        path = path.split('/', 2)[-1]
        path = '/' + path if path else '/'
    return path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--route', help='compare one route in detail')
    ap.add_argument('--sample', type=int, default=30)
    ap.add_argument('--section', default='blog', help='blog | category | shell')
    ap.add_argument('--workers', type=int, default=4)
    ap.add_argument('--json', default='/tmp/opencode/output-diff.json')
    args = ap.parse_args()

    if args.route:
        r = analyse(args.route)
        print(json.dumps(r, indent=1, ensure_ascii=False))
        return 0

    routes = load_routes(args.section)
    if not args.sample or args.sample >= len(routes):
        chosen = routes
    else:
        step = max(1, len(routes) // args.sample)
        chosen = routes[::step][: args.sample]

    print(f'comparing rendered output for {len(chosen)} /{args.section} routes\n')
    results = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
        for r in ex.map(analyse, chosen):
            results.append(r)
            flag = ''
            if r['liveStatus'] != '200':
                flag = f"LIVE {r['liveStatus']}"
            elif abs(r['ourWords'] - r['liveWords']) / max(1, r['liveWords']) > 0.35:
                flag = 'TEXT'
            elif r['imagesOnlyLive']:
                flag = 'IMG'
            print(f'  {flag:8} {r["route"][:70]:70} words {r["ourWords"]:>6} vs {r["liveWords"]:>6}')
            sys.stdout.flush()

    json.dump(results, open(args.json, 'w'), indent=1, ensure_ascii=False)
    summarise(results, args.json)
    return 0


def load_routes(section):
    sm = open('dist/sitemap-0.xml', encoding='utf-8').read()
    locs = re.findall(r'<loc>(.*?)</loc>', sm)
    paths = [urlparse(l).path for l in locs]
    if section == 'blog':
        return sorted(p for p in paths if re.match(r'^/[a-z]{2}/blog/[^/]+/?$', p))
    if section == 'category':
        return sorted(p for p in paths if '/category/' in p)
    if section == 'shell':
        return sorted(p for p in paths if re.match(r'^/[a-z]{2}/?$', p))
    return sorted(paths)


def summarise(results, path):
    n = len(results)
    both200 = [r for r in results if r['ourStatus'] == '200' and r['liveStatus'] == '200']

    word_ratios = sorted(
        ((r['ourWords'] / max(1, r['liveWords']), i) for i, r in enumerate(both200)))
    word_ratios = [(ratio, both200[i]) for ratio, i in word_ratios]
    missing_text = [r for r in both200 if r['liveWords'] - r['ourWords'] > 0.25 * r['liveWords']]
    extra_text = [r for r in both200 if r['ourWords'] - r['liveWords'] > 0.25 * r['ourWords']]

    lost_images = [r for r in both200 if len(r['imagesOnlyLive']) > len(r['imagesOnlyOurs'])]
    lost_links = [r for r in both200 if len(r['linksOnlyLive']) > len(r['linksOnlyOurs'])]

    print(f'\n=== {n} routes, {len(both200)} returning 200 on both ===')

    print('\n--- prose volume ---')
    print(f'  ours is >25% shorter : {len(missing_text)}')
    print(f'  ours is >25% longer  : {len(extra_text)}')
    print(f'  within 25%           : {len(both200) - len(missing_text) - len(extra_text)}')
    print(f'  shortest ratio       : {word_ratios[0][0]:.2f}  {word_ratios[0][1]["route"]}')
    print(f'  longest ratio        : {word_ratios[-1][0]:.2f}  {word_ratios[-1][1]["route"]}')

    print('\n--- images ---')
    print(f'  pages where live has images we lack : {len(lost_images)}')
    print(f'  pages where we have images live lacks : {len([r for r in both200 if len(r["imagesOnlyOurs"]) > len(r["imagesOnlyLive"])])}')

    print('\n--- outbound links ---')
    print(f'  pages where live has links we lack : {len(lost_links)}')

    print('\n--- accessibility ---')
    live_no_alt = [r for r in both200 if r['liveAlts'] and not r['ourAlts']]
    print(f'  live has images, we render none at all : {len(live_no_alt)}')

    if missing_text:
        print('\n=== pages where OUR PROSE IS MUCH SHORTER ===')
        for r in sorted(missing_text, key=lambda r: r['ourWords'] / max(1, r['liveWords']))[:12]:
            print(f'\n  {r["route"]}')
            print(f'    words: ours {r["ourWords"]}  live {r["liveWords"]}')
            sample = [w for w in r['wordsOnlyLive'] if len(w) > 5][:12]
            print(f'    words only on live: {" ".join(sample)[:220]}')

    if lost_images:
        print('\n=== pages with images we do not render ===')
        for r in lost_images[:12]:
            print(f'  {r["route"][:70]:70} missing {len(r["imagesOnlyLive"])}')

    if lost_links:
        print('\n=== pages with links we do not render ===')
        for r in lost_links[:12]:
            print(f'  {r["route"][:70]:70} missing {len(r["linksOnlyLive"])}')

    print(f'\nfull report: {path}')


if __name__ == '__main__':
    sys.exit(main())
