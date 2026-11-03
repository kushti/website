#!/usr/bin/env node
/**
 * Shared Chromium launcher for the comparison and recovery scripts.
 *
 * Playwright does not read the usual proxy environment variables, and on some networks
 * ergoplatform.org is only reachable through a SOCKS proxy. Set PLAYWRIGHT_PROXY (or the
 * conventional ALL_PROXY / HTTPS_PROXY) to a proxy server string and every script that
 * launches its browser through here will route through it:
 *
 *   PLAYWRIGHT_PROXY=socks5://192.168.43.1:1080 npm run shots -- /en/
 *
 * With no proxy set — the CI case — the browser connects directly.
 */
import { chromium } from 'playwright-core';

const PROXY =
  process.env.PLAYWRIGHT_PROXY ||
  process.env.ALL_PROXY || process.env.all_proxy ||
  process.env.HTTPS_PROXY || process.env.https_proxy ||
  process.env.HTTP_PROXY || process.env.http_proxy ||
  null;

export function launch(options = {}) {
  return chromium.launch({
    args: ['--no-sandbox'],
    ...(PROXY ? { proxy: { server: PROXY, bypass: '127.0.0.1,localhost' } } : {}),
    ...options,
  });
}
