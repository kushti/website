#!/usr/bin/env node
/**
 * The illustrations production inlines in its markup, recovered as files.
 *
 * Production's Next.js build inlines a good deal of its artwork as <svg> in the served
 * HTML rather than serving it from a URL, so it cannot be fetched by name.
 * scripts/fetch-illustrations.py (Python) pulls those elements out and commits them here;
 * this module is how the templates reach them.
 *
 * Only artwork with no equivalent in the CMS is here. The logo, the hexagon mark and the
 * chrome icons are deliberately absent — they are reimplemented in this build, and copying
 * them would only add a second source of truth.
 *
 * Each entry has a light and a dark cut where production ships both. They are the same
 * artwork with the fills inverted, not a filter, so the switch follows the theme class
 * rather than a CSS filter that would wash out the gradients.
 */
export interface Illustration {
  /** path under /illustrations */
  light: string;
  dark: string;
  /** intrinsic aspect ratio, width / height */
  ratio: number;
  /** how the templates should place it */
  alt: string;
}

export const ILLUSTRATIONS = {
  /** the 3D hexagon block with the orbital ring, on the /discover/ hero */
  discoverHero: {
    light: '/illustrations/discover-hero-light.svg',
    dark: '/illustrations/discover-hero-dark.svg',
    ratio: 1011 / 811,
    alt: '',
  },
} as const satisfies Record<string, Illustration>;

export type IllustrationName = keyof typeof ILLUSTRATIONS;