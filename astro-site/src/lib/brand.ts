/**
 * Brand imagery that lives in the CMS-independent part of the site.
 *
 * The exported content covers uploads referenced by posts and collections. These are
 * the page-level images the live site serves from its own /assets directory, kept in
 * public/ so the build has no external dependency.
 */
export function getErgImages() {
  return {
    hero: '/images/hero.webp',
    og: '/images/og-default.png',
  };
}
