import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { relative } from 'node:path';

/**
 * Content entry ids must be unique across the whole collection.
 *
 * Astro's default id for a glob entry prefers the frontmatter `slug`, and the CMS
 * reuses the same permalink for the same article in several locales — "Mew Finance"
 * exists in en, pt, ru and tr with an identical slug. Without this the later locale
 * silently overwrites the earlier one, so the id is derived from the file path, which
 * carries the locale directory.
 */
const pathId = ({ entry, base }: { entry: string; base: URL | string }) =>
  relative(base instanceof URL ? base.pathname : base, entry).replace(/\.md$/, '');

/**
 * A CMS media object, as exported from Strapi's `files` table.
 *
 * `url` is kept exactly as stored (`/uploads/<name>`) because 1620 post bodies and
 * every collection entry reference those paths literally.
 */
const media = z
  .object({
    url: z.string(),
    alt: z.string().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    mime: z.string().optional(),
    formats: z
      .record(
        z.string(),
        z.object({
          url: z.string(),
          width: z.number().optional(),
          height: z.number().optional(),
          mime: z.string().optional(),
        }),
      )
      .optional(),
  })
  .nullable();

/** CMS ISO timestamp with no offset: read it as UTC instead of build-machine local time. */
const cmsDate = z.preprocess(
  (value) =>
    typeof value === 'string' && !/(?:[zZ]|[+-]\d{2}:?\d{2})$/.test(value.trim())
      ? `${value.trim()}Z`
      : value,
  z.coerce.date().nullable(),
);

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.md',
    generateId: pathId,
  }),
  schema: () =>
    z.object({
      /** original CMS row id, kept so exports stay traceable */
      cmsId: z.number(),
      title: z.string(),
      /**
       * The URL, taken verbatim from the CMS `permalink` column.
       *
       * 81 permalinks contain non-ASCII characters or spaces, and 8 would be
       * altered by a slugifier. This field is the source of truth for the route;
       * never regenerate it from `title`.
       */
      slug: z.string(),
      type: z.enum(['blog', 'news']),
      locale: z.string(),
      /*
       * The CMS timestamps are UTC ISO strings; the importer drops the trailing Z, so
       * `z.coerce.date()` would otherwise read them in the build machine's timezone and
       * shift the displayed calendar day (the production site formats them in Moscow
       * time). Normalise the wall clock to UTC here so builds are deterministic.
       */
      date: cmsDate,
      publishedAt: cmsDate,
      updatedAt: cmsDate,
      author: z.string(),
      tags: z.array(z.string()).default([]),
      spotlight: z.boolean().default(false),
      subtitle: z.string().nullable(),
      image: media,
      authorPhoto: z.string().nullable(),
      blogPhoto: z.string().nullable(),
      /** news items that link out to another site have no body of their own */
      externalUrl: z.string().nullable(),
      /**
       * True when an earlier post already owns this permalink. 36 posts are a
       * blog/news pair sharing one slug; only the lower id gets a route, matching the
       * live site. The duplicate stays in the collection for the archive.
       */
      superseded: z.boolean().default(false),
    }),
});

const categories = defineCollection({
  loader: glob({ base: './src/content/categories', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({ cmsId: z.number(), name: z.string(), locale: z.string().optional() }),
});

const roadmaps = defineCollection({
  loader: glob({ base: './src/content/roadmaps', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().nullable(),
    order: z.number().default(0),
    group: z.string().nullable(),
    status: z.string().nullable(),
  }),
});

const team = defineCollection({
  loader: glob({ base: './src/content/team', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    name: z.string(),
    role: z.string().nullable(),
    bio: z.string().nullable(),
    github: z.string().nullable(),
    twitter: z.string().nullable(),
    linkedin: z.string().nullable(),
    image: media,
  }),
});

const exchanges = defineCollection({
  loader: glob({ base: './src/content/exchanges', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    name: z.string(),
    url: z.string().nullable(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
    image: media,
    imageDark: media,
  }),
});

const documents = defineCollection({
  loader: glob({ base: './src/content/documents', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    title: z.string(),
    group: z.string().nullable(),
    url: z.string().nullable(),
    file: media,
  }),
});

const faqs = defineCollection({
  loader: glob({ base: './src/content/faqs', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    question: z.string(),
    answer: z.string(),
    order: z.number().default(0),
  }),
});

const dapps = defineCollection({
  loader: glob({ base: './src/content/dapps', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().nullable(),
    image: media,
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    title: z.string(),
    description: z.string().nullable(),
    url: z.string().nullable(),
    buttonText: z.string().nullable(),
    group: z.string().nullable(),
    order: z.number().default(0),
    image: media,
  }),
});

const partners = defineCollection({
  loader: glob({ base: './src/content/partners', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    name: z.string(),
    url: z.string().nullable(),
    image: media,
    imageDark: media,
  }),
});

const favorites = defineCollection({
  loader: glob({ base: './src/content/favorites', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    title: z.string(),
    subtitle: z.string().nullable(),
    description: z.string().nullable(),
    buttonText: z.string().nullable(),
    url: z.string().nullable(),
    order: z.number().default(0),
    image: media,
  }),
});

const changingTheWorlds = defineCollection({
  loader: glob({ base: './src/content/changing-the-worlds', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.number(),
    title: z.string(),
    subtitle: z.string().nullable(),
    description: z.string().nullable(),
    url: z.string().nullable(),
    buttonText: z.string().nullable(),
    order: z.number().default(0),
    image: media,
  }),
});

/**
 * Pages the CMS never held. Legal, privacy and the wallet landing page were hardcoded
 * as JSX on the live site; they live here so translators can edit them as content.
 */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md', generateId: pathId }),
  schema: z.object({
    cmsId: z.string(),
    kind: z.enum(['legal', 'privacy-policy', 'ergo-wallet-app']),
    locale: z.string(),
    title: z.string(),
  }),
});

/**
 * Section content recovered from the rendered production site.
 *
 * The wallets table, the mining pool list and the miner list were hardcoded in the live
 * Next.js source and never entered the database, so they are absent from the Strapi
 * export. scripts/recover-geterg.mjs reads them back out of the live DOM and commits the
 * result here, where they are editable content rather than markup.
 */
const getergItem = z.object({
  name: z.string(),
  note: z.string().nullable().optional(),
  url: z.string(),
  image: z.string().nullable().optional(),
});

const getergList = z.object({
  note: z.string().optional(),
  items: z.array(getergItem),
});

/** a "Read more: X" style call to action */
const link = z.object({ text: z.string(), href: z.string() });

/** one file per section, so the schema is just the section's own shape */
const section = <T extends z.ZodType>(name: string, shape: T) =>
  defineCollection({
    loader: glob({ base: './src/content/pages', pattern: `${name}.*.json`, generateId: pathId }),
    schema: z.object({ note: z.string().optional() }).extend(shape.shape),
  });

/**
 * The wallets table carries a capability grid as well as the links. `group` is the bold
 * heading production drops in above a run of rows, and `marks` is one capability state
 * per column in the order the page's WALLET_COLUMNS lists them: `yes` paints the orange
 * tick, `no` the grey cross, and `in_progress` the dark tick production uses for partial
 * support. Recovered from the live table rather than transcribed from it.
 */
const wallets = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: 'wallets.*.json', generateId: pathId }),
  schema: z.object({
    note: z.string().optional(),
    items: z.array(
      getergItem.extend({
        group: z.string().optional(),
        marks: z.array(z.enum(['yes', 'no', 'in_progress'])).optional(),
      }),
    ),
  }),
});
const miningPools = defineCollection({
  loader: glob({
    base: './src/content/pages',
    pattern: 'mining-pools.*.json',
    generateId: pathId,
  }),
  schema: getergList,
});
const miners = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: 'miners.*.json', generateId: pathId }),
  schema: getergList,
});

/*
 * The HIGHLIGHTS carousel on the home page, recovered by scripts/recover-home.mjs.
 *
 * The other home sections are not modelled here: their copy is in the CMS's own i18n
 * bundle (src/i18n/messages), already translated into all twelve locales, so the pages
 * read it with t() rather than duplicating it.
 */
const homeHighlights = section(
  'home-highlights',
  z.object({
    items: z.array(
      z.object({ title: z.string(), kicker: z.string(), body: z.string(), cta: link.nullable() }),
    ),
  }),
);

export const collections = {
  posts,
  categories,
  roadmaps,
  team,
  exchanges,
  documents,
  faqs,
  dapps,
  projects,
  partners,
  favorites,
  changingTheWorlds,
  pages,
  wallets,
  miningPools,
  miners,
  homeHighlights,
};
