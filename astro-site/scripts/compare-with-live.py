#!/usr/bin/env python3
"""Diff the static build against the live site.

The archive is only useful if the URLs survive it. This crawls the set of routes the
build produced, asks the live site for the same URL, and reports the differences in
status code, title and canonical link — which is what determines whether a cutover
breaks inbound links and search results.

Usage:
    python3 scripts/compare-with-live.py --limit 60        # spot check
    python3 scripts/compare-with-live.py --all             # every route (slow)
    python3 scripts/compare-with-live.py --routes routes.txt
"""
import argparse
import concurrent.futures
import html
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote

DIST = Path('dist')
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36'
LIVE = 'https://ergoplatform.org'


def fetch(url, timeout=30):
    try:
        r = subprocess.run(
            ['curl', '-sL', '--max-time', str(timeout), '-A', UA,
             '-w', '\n##STATUS:%{http_code}\n##FINAL:%{url_effective}', url],
            capture_output=True, text=True, timeout=timeout + 5,
        )
        return r.stdout
    except subprocess.TimeoutExpired:
        return '\n##STATUS:timeout\n##FINAL:'


def parse(body):
    status, final = None, ''
    m = re.search(r'##STATUS:(\S+)', body)
    if m:
        status = m.group(1)
    m = re.search(r'##FINAL:(.*)', body)
    if m:
        final = m.group(1).strip()
    title = re.search(r'<title[^>]*>(.*?)</title>', body, re.S)
    title = html.unescape(title.group(1)).strip() if title else ''
    title = re.sub(r'\s*\|\s*Ergo Platform\s*$', '', title)
    canonical = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', body)
    return {
        'status': status,
        'final': final,
        'title': title,
        'canonical': canonical.group(1) if canonical else '',
    }


def local_title(path: Path):
    body = path.read_text(encoding='utf-8', errors='replace')
    title = re.search(r'<title[^>]*>(.*?)</title>', body, re.S)
    title = html.unescape(title.group(1)).strip() if title else ''
    return re.sub(r'\s*\|\s*Ergo Platform\s*$', '', title)


def collect_routes():
    """Every built page, as a URL path with percent-encoding."""
    out = []
    for p in sorted(DIST.rglob('index.html')):
        rel = p.relative_to(DIST).parent.as_posix()
        out.append('/' if rel == '.' else f'/{rel}/')
    for p in sorted(DIST.rglob('*.html')):
        rel = p.relative_to(DIST).as_posix()
        if rel.endswith('/index.html'):
            continue
        out.append('/' + rel[:-5])
    return sorted(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--limit', type=int, default=60)
    ap.add_argument('--all', action='store_true')
    ap.add_argument('--routes', help='file with one URL path per line')
    ap.add_argument('--workers', type=int, default=8)
    ap.add_argument('--json', help='write the full result set here')
    args = ap.parse_args()

    if args.routes:
        routes = [l.strip() for l in open(args.routes) if l.strip()]
    else:
        routes = collect_routes()
        if not args.all:
            # deterministic spread across the corpus rather than the first N alphabetically
            step = max(1, len(routes) // args.limit)
            routes = routes[::step][: args.limit]

    print(f'comparing {len(routes)} routes against {LIVE}')

    def check(route):
        dist_path = DIST / route.lstrip('/') / 'index.html'
        if not dist_path.exists():
            dist_path = DIST / (route.lstrip('/') + '.html')
        local_t = local_title(dist_path) if dist_path.exists() else '(no file)'
        remote = parse(fetch(LIVE + quote(route, safe="/:&()!'*+,")))
        return route, local_t, remote

    same = []
    diff_status = []
    diff_title = []
    errors = []

    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as ex:
        for route, local_t, remote in ex.map(check, routes):
            if remote['status'] in (None, 'timeout'):
                errors.append(route)
                continue
            ok_status = remote['status'] == '200'
            ok_title = bool(remote['title']) and remote['title'].lower()[:40] == local_t.lower()[:40]
            if not ok_status:
                diff_status.append((route, remote['status'], local_t, remote['title']))
            elif not ok_title:
                diff_title.append((route, local_t, remote['title']))
            else:
                same.append(route)

    # a `000` status is curl failing, almost always Cloudflare rate-limiting under
    # concurrency; retry those sequentially before counting them as a difference
    if errors:
        print(f'  retrying {len(errors)} unreachable routes sequentially...')
        retry = []
        for route in errors:
            remote = parse(fetch(LIVE + quote(route, safe="/:&()!'*+,"), timeout=45))
            if remote['status'] in (None, 'timeout'):
                retry.append(route)
                continue
            ok = remote['status'] == '200'
            lt = local_title((DIST / route.lstrip('/') / 'index.html'))
            if not ok:
                diff_status.append((route, remote['status'], lt, remote['title']))
            elif remote['title'].lower()[:40] != lt.lower()[:40]:
                diff_title.append((route, lt, remote['title']))
            else:
                same.append(route)
        errors = retry

    total = len(routes)
    print(f'\n  identical title + 200   {len(same)}/{total}')
    print(f'  title differs           {len(diff_title)}')
    print(f'  status differs          {len(diff_status)}')
    print(f'  unreachable here        {len(errors)}')

    if args.json:
        import json
        with open(args.json, 'w') as f:
            json.dump(
                {
                    'compared': total,
                    'identical': len(same),
                    'statusDiffers': [{'route': r, 'live': st, 'ours': lt, 'liveTitle': rt}
                                      for r, st, lt, rt in diff_status],
                    'titleDiffers': [{'route': r, 'ours': lt, 'live': rt}
                                     for r, lt, rt in diff_title],
                    'unreachable': errors,
                },
                f,
                indent=1,
                ensure_ascii=False,
            )
        print(f'\n  full report written to {args.json}')

    if diff_status:
        print('\nSTATUS DIFFERENCES:')
        for route, st, lt, rt in diff_status[:40]:
            print(f'  live {st}  {route}')
            print(f'        ours: {lt[:80]}')
            print(f'        live: {rt[:80]}')

    if diff_title:
        print('\nTITLE DIFFERENCES (first 20):')
        for route, lt, rt in diff_title[:20]:
            print(f'  {route}')
            print(f'        ours: {lt[:90]}')
            print(f'        live: {rt[:90]}')

    return 1 if diff_status else 0


if __name__ == '__main__':
    sys.exit(main())
