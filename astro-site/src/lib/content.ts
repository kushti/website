import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, type Locale } from '../i18n/config';

export type Post = CollectionEntry<'posts'>;
export type Media = NonNullable<Post['data']['image']>;

/** Media URLs point at /uploads/<name>; pick the variant closest to a target width. */
export function mediaSrc(media: Media | null | undefined, width?: number): string | null {
  if (!media?.url) return null;
  if (!width) return media.url;
  const formats = media.formats ?? {};
  const order = ['thumbnail', 'small', 'medium', 'large'] as const;
  let best: { url: string; width: number } | null = null;
  for (const key of order) {
    const f = formats[key];
    if (!f?.url) continue;
    const w = f.width ?? Number.POSITIVE_INFINITY;
    if (w <= width && (!best || w > best.width)) best = { url: f.url, width: w };
  }
  // nothing small enough: use the original
  return best?.url ?? media.url;
}

/** srcset covering the variants the CMS generated, so the browser picks sensibly. */
export function mediaSrcset(media: Media | null | undefined): string | null {
  if (!media?.url) return null;
  const formats = media.formats ?? {};
  const parts: string[] = [];
  for (const f of Object.values(formats)) {
    if (f?.url && f.width) parts.push(`${f.url} ${f.width}w`);
  }
  if (parts.length === 0) return null;
  parts.push(`${media.url} ${media.width ?? 2000}w`);
  return parts.join(', ');
}

/*
 * `getCollection` is async, so the post list is fetched once per build and cached
 * here. Every helper below awaits it, and pages call them with top-level await.
 */
let postsPromise: Promise<Post[]> | null = null;

function allPosts(): Promise<Post[]> {
  postsPromise ??= getCollection('posts');
  return postsPromise;
}

const byDateDesc = (a: Post, b: Post) =>
  (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0) ||
  // Production keeps CMS/id order for posts sharing an editorial timestamp
  // (e.g. the two 26 Nov 2025 entries).
  a.data.cmsId - b.data.cmsId;

/** All posts for a locale, newest first. */
export async function postsByLocale(loc: Locale, type?: 'blog' | 'news'): Promise<Post[]> {
  const all = await allPosts();
  return all
    .filter((p) => p.data.locale === loc && (!type || p.data.type === type))
    .sort(byDateDesc);
}

/** Posts for a locale that have a body to render (external news links are excluded). */
export async function readablePosts(loc: Locale, type?: 'blog' | 'news'): Promise<Post[]> {
  const all = await postsByLocale(loc, type);
  return all.filter((p) => !p.data.externalUrl);
}

export async function spotlightPosts(loc: Locale, limit = 6): Promise<Post[]> {
  const all = await readablePosts(loc);
  return all.filter((p) => p.data.spotlight).slice(0, limit);
}

/** Tag -> post count, for the category filter. Parent tags include their children. */
export async function categoryCounts(
  loc: Locale,
  type?: 'blog' | 'news',
): Promise<Record<string, number>> {
  const out: Record<string, number> = {};
  for (const p of await postsByLocale(loc, type)) {
    for (const tag of p.data.tags) out[tag] = (out[tag] ?? 0) + 1;
  }
  for (const [parent, children] of Object.entries(CATEGORY_CHILDREN)) {
    for (const child of children) out[parent] = (out[parent] ?? 0) + (out[child] ?? 0);
  }
  return out;
}

/** Distinct tags in a locale, ordered by frequency then alphabetically. */
export async function categories(loc: Locale, type?: 'blog' | 'news'): Promise<string[]> {
  const counts = await categoryCounts(loc, type);
  return Object.keys(counts).sort((a, b) => counts[b] - counts[a] || a.localeCompare(b));
}

/**
 * Production's tag pages are hierarchical: the parent category lists its own posts
 * plus those filed under the child tag. The CMS export flattens that relation into
 * `tags`, so reproduce the three parent/child links the live category counts expose.
 */
const CATEGORY_CHILDREN: Record<string, string[]> = {
  Ecosystem: ['Ecosystem Announcement'],
  Mining: ['Core Mining'],
  Core: ['Core Mining'],
};

/** Posts carrying a given tag (or one of its child tags), in a locale. */
export async function postsWithTag(loc: Locale, tag: string): Promise<Post[]> {
  const all = await postsByLocale(loc);
  const tags = [tag, ...(CATEGORY_CHILDREN[tag] ?? [])];
  return all.filter((p) => p.data.tags.some((t) => tags.includes(t)));
}

/**
 * Related posts: same locale, sharing at least one tag, excluding the post itself.
 *
 * 1013 of the 1620 published posts carry no tags at all, mostly the 2019-2020 archive.
 * Returning nothing for those leaves a page with an article and no onward links, while
 * the live site always ends a post with a block of 21 links. Recent posts from the
 * same locale are used as the fallback so every article has somewhere to go next.
 */
export async function relatedPosts(post: Post, limit = 6): Promise<Post[]> {
  const all = await postsByLocale(post.data.locale as Locale).then((posts) =>
    posts.filter((p) => !p.data.superseded),
  );
  const others = all.filter((p) => p.id !== post.id);

  const tags = new Set(post.data.tags);
  if (tags.size > 0) {
    const shared = others.filter((p) => p.data.tags.some((t) => tags.has(t)));
    if (shared.length > 0) return shared.slice(0, limit);
  }
  return others.slice(0, limit);
}

export { LOCALES };
export type { Locale };
