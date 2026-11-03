// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkGfm from 'remark-gfm';

/**
 * Static output for ergoplatform.org.
 *
 * `output: 'static'` means every route is prerendered at build time — no Node
 * process in front of the content, and cacheable HTML at the edge. The two live
 * values on the site (network hash rate, difficulty) are fetched client-side by an
 * island, which is strictly better than the current setup where they were baked
 * into an uncacheable server response.
 */
export default defineConfig({
  site: 'https://ergoplatform.org',
  output: 'static',
  trailingSlash: 'always',
  build: {
    // 1620 post pages across 12 locales; the default 1000 cap silently truncates.
    inlineStylesheets: 'auto',
  },
  integrations: [
    mdx(),
    sitemap({
      // the CMS archive holds these but the live site never rendered them
      filter: (page) => !page.includes('/changing-the-worlds'),
      changefreq: 'weekly',
      lastmod: undefined,
    }),
  ],
  markdown: {
    /*
     * Astro 7 makes its own Sätteri pipeline the default. This site stays on unified,
     * because `remark-gfm` is load-bearing: 98 documents in the archive contain bare URLs
     * that only render as links under GFM's autolink literal, and several more rely on
     * table syntax. Porting that to a Sätteri plugin is possible but is a rendering change
     * across the whole corpus, so it is not folded into a version bump.
     */
    processor: unified(),
    // The corpus is CommonMark with GFM tables, task lists and autolinks.
    remarkPlugins: [remarkGfm],
    shikiConfig: { theme: 'github-dark' },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
