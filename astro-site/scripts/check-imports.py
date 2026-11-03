#!/usr/bin/env python3
"""Resolve every relative import under src/ and report the ones that do not exist.

Vite only fails on the first bad path, which makes fixing import depth an iterative
guess. This checks the whole tree at once.
"""
import os
import re
import sys
from pathlib import Path

SRC = Path('src')
IMPORT = re.compile(r"""(?:from|import)\s+['"](\.[^'"]+)['"]""")

missing = []
checked = 0

for f in sorted(SRC.rglob('*')):
    if f.suffix not in {'.astro', '.ts', '.tsx', '.js', '.mjs'}:
        continue
    text = f.read_text(encoding='utf-8')
    for m in IMPORT.finditer(text):
        rel = m.group(1)
        # Vite asset queries (`?raw`, `?url`) are not part of the file path.
        rel_path = rel.split('?', 1)[0].split('#', 1)[0]
        target = (f.parent / rel_path).resolve()
        checked += 1
        if target.exists():
            continue
        # a bare specifier may be a directory with an index, or an extensionless file
        if (target / 'index.ts').exists() or (target / 'index.js').exists():
            continue
        if target.with_suffix('.ts').exists() or target.with_suffix('.js').exists():
            continue
        line_no = text[: m.start()].count('\n') + 1
        missing.append((str(f), line_no, rel, os.path.relpath(target, Path.cwd())))

print(f'checked {checked} relative imports in {SRC}')
if missing:
    print(f'\n{len(missing)} unresolved:')
    for f, line, rel, want in missing:
        print(f'  {f}:{line}\n     found   {rel}\n     wanted  {want}')
    sys.exit(1)
print('all relative imports resolve')
