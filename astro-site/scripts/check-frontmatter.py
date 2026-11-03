#!/usr/bin/env python3
"""Parse every exported content file's frontmatter, the same way the build will.

The archive contains titles and subtitles in a dozen languages, and several contain
characters YAML treats as syntax: colons, leading dashes, full-width punctuation. The
build fails hard on the first malformed file, so this check runs before it and reports
every offender at once rather than one per run.
"""
import glob
import sys

try:
    import yaml
except ImportError:
    print('pyyaml not available; skipping', file=sys.stderr)
    sys.exit(0)

bad = []
n = 0
for path in sorted(glob.glob('src/content/**/*.md', recursive=True)):
    text = open(path, encoding='utf-8').read()
    if not text.startswith('---'):
        bad.append((path, 'missing frontmatter'))
        continue
    end = text.find('\n---', 3)
    if end == -1:
        bad.append((path, 'unterminated frontmatter'))
        continue
    fm = text[4:end]
    n += 1
    try:
        yaml.safe_load(fm)
    except Exception as e:
        bad.append((path, str(e).replace('\n', ' ')[:160]))

print('checked %d files' % n)
if bad:
    print('\n%d file(s) with invalid frontmatter:' % len(bad))
    for p, e in bad[:40]:
        print('  %s\n     %s' % (p, e))
    sys.exit(1)
print('all frontmatter parses')
