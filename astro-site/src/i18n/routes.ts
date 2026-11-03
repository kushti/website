/** Posts per page on the blog index. */
export const PER_PAGE = 18;

/**
 * Every top-level route, as it appears under a locale prefix.
 * Kept in one place so the header nav, the footer and the sitemap agree.
 */
export const ROUTES = [
  { path: '', label: 'home' },
  { path: 'blog', label: 'blog' },
  { path: 'discover', label: 'discover' },
  { path: 'ecosystem', label: 'ecosystem' },
  { path: 'community', label: 'community' },
  { path: 'get-erg', label: 'getErg' },
] as const;

export type RoutePath = (typeof ROUTES)[number]['path'];
