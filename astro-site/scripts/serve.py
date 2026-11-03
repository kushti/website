#!/usr/bin/env python3
"""Threaded static file server for the built site.

`python3 -m http.server` is single-threaded, which stalls the comparison scripts: a page
pulls dozens of images and each one waits for the previous request to finish.

    python3 scripts/serve.py dist 4400
"""
import functools
import http.server
import socketserver
import sys
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else 'dist').resolve()
port = int(sys.argv[2] if len(sys.argv) > 2 else 4400)


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):  # noqa: D102 - silence per-request logging
        pass


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


handler = functools.partial(Handler, directory=str(root))
with Server(('127.0.0.1', port), handler) as httpd:
    print(f'serving {root} on http://127.0.0.1:{port}', flush=True)
    httpd.serve_forever()