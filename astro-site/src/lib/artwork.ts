/**
 * Production's section artwork, mapped onto the components that display it.
 *
 * Every entry is a file fetched from ergoplatform.org by scripts/fetch-artwork.py. The
 * names, the light/dark pairs and the render sizes are read off the production DOM by
 * scripts/probe-visual.mjs, not chosen here — this module only records what was measured.
 *
 * Previously these were absent: docs/visual-comparison.md claimed the section illustrations
 * "render client-side and never appear in the served markup", so the build substituted the
 * site's own hexagon and CSS gradients. That was wrong. They are ordinary static files
 * under /assets/<section>/, reached by background-image and <img> after hydration. Only
 * the HIGHLIGHTS donut charts are genuinely absent from the DOM.
 */

export interface Art {
  /** light-mode source, always present */
  light: string;
  /** dark-mode source; falls back to light where production ships no dark cut */
  dark?: string;
  /** intrinsic width/height in px, for width/height attributes to avoid layout shift */
  width: number;
  height: number;
  /**
   * Rendered width as a percentage of its container. Production positions these with
   * percentage widths and `background-size: contain`, so recording the rendered box as a
   * ratio keeps the layout fluid the way theirs is.
   */
  renderWidth?: number;
}

const at = (section: string, file: string) => `/assets/${section}/${file}`;

/** shared helper: a light/dark pair, with dark optional */
const pair = (
  section: string,
  base: string,
  width: number,
  height: number,
  hasDark = true,
  renderWidth?: number,
): Art => ({
  light: at(section, `${base}-light.png`),
  dark: hasDark ? at(section, `${base}.png`) : undefined,
  width,
  height,
  renderWidth,
});

export const ARTWORK = {
  /**
   * The home hero. A 1440x810 raster that production shows as a full-bleed band directly
   * under the header, behind the h1 and the paragraph.
   */
  hero: {
    light: at('home', 'hero-poster-light.webp'),
    dark: at('home', 'hero-poster-dark.webp'),
    width: 1440,
    height: 810,
  } as Art,

  /** the same hero, narrower — production swaps to this below its own breakpoint */
  heroMobile: {
    light: at('home', 'hero-poster-light-mobile.webp'),
    dark: at('home', 'hero-poster-dark-mobile.webp'),
    width: 640,
    height: 360,
  } as Art,

  /**
   * Section artwork. Production uses these as `background-image` with
   * `background-size: contain` on a positioned box, so they are recorded with the rendered
   * width each was measured at rather than an intrinsic one.
   */
  home: {
    frame1: pair('home', 'frame-1', 304, 1114, true, 351),
    frame2: pair('home', 'frame-2', 304, 1114, true, 382),
    frame3: {
      light: at('home', 'frame-3-light.avif'),
      dark: at('home', 'frame-3.avif'),
      width: 304,
      height: 1114,
      renderWidth: 351,
    } as Art,
    frame4: {
      light: at('home', 'frame-4-light.avif'),
      dark: at('home', 'frame-4.avif'),
      width: 667,
      height: 1031,
      renderWidth: 667,
    } as Art,
    frame5: {
      light: at('home', 'frame-5-light.avif'),
      dark: at('home', 'frame-5.avif'),
      width: 382,
      height: 1491,
      renderWidth: 382,
    } as Art,
  },

  /** the soft gradient washes behind the footer and the lower sections */
  blur: {
    home1: { light: at('home', 'blur-1-light.svg'), dark: at('home', 'blur-1.svg'), width: 769, height: 895 } as Art,
    home2: { light: at('home', 'blur-2-light.svg'), dark: at('home', 'blur-2.svg'), width: 606, height: 2402 } as Art,
    home3: { light: at('home', 'blur-3.svg'), width: 524, height: 1419 } as Art,
    home4: { light: at('home', 'blur-4-light.svg'), dark: at('home', 'blur-4.svg'), width: 459, height: 1677 } as Art,
  },

  /** the footer band: a 1440x752 raster behind the whole footer */
  footer: {
    light: '/assets/footer-light.webp',
    dark: '/assets/footer.webp',
    width: 1440,
    height: 752,
  } as Art,

  /** per-section frames, for the inner pages */
  blog: {
    frame1: pair('blog', 'frame-1', 384, 1080),
    frame2: pair('blog', 'frame-2', 384, 1080, false),
    blur1: { light: at('blog', 'blur-1.svg'), width: 600, height: 900 } as Art,
    blur2: { light: at('blog', 'blur-2.svg'), width: 600, height: 900 } as Art,
  },
  geterg: {
    frame1: pair('geterg', 'frame-1', 400, 1200),
    frame2: pair('geterg', 'frame-2', 400, 1200),
    frame3: pair('geterg', 'frame-3', 400, 1200),
    frame4: pair('geterg', 'frame-4', 400, 1200),
    frame5: pair('geterg', 'frame-5', 400, 1200),
  },
  discover: {
    frame1: pair('discover', 'frame-1', 384, 1080),
    frame2: pair('discover', 'frame-2', 384, 1080),
    frame3: pair('discover', 'frame-3', 384, 1080),
  },
  community: {
    frame1: pair('community', 'frame-1', 400, 1200),
    frame2: pair('community', 'frame-2', 400, 1200),
    frame3: pair('community', 'frame-3', 400, 1200),
    frame4: pair('community', 'frame-4', 400, 1200),
    frame5: pair('community', 'frame-5', 400, 1200),
    frame6: pair('community', 'frame-6', 400, 1200),
    frame7: pair('community', 'frame-7', 400, 1200),
    frame8: pair('community', 'frame-8', 400, 1200),
    frame9: pair('community', 'frame-9', 400, 1200),
    frame10: pair('community', 'frame-10', 400, 1200),
  },
  ecosystem: {
    frame1: pair('ecosystem', 'frame-1', 384, 1080),
    frame2: pair('ecosystem', 'frame-2', 384, 1080),
    frame3: pair('ecosystem', 'frame-3', 384, 1080),
    frame4: { light: at('ecosystem', 'frame-4.png'), width: 384, height: 1080 } as Art,
    frame5: { light: at('ecosystem', 'frame-5.png'), width: 384, height: 1080 } as Art,
  },
  legal: {
    frame1: { light: '/assets/legal-frame-1.png', width: 1440, height: 810 } as Art,
    blur1: { light: '/assets/legal-blur-1.svg', width: 600, height: 900 } as Art,
  },
} as const;

/** every light/dark pair the browser should preload, for the pages that use them */
export const PRELOAD = [ARTWORK.hero.light, ARTWORK.footer.light];