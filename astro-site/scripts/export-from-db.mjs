#!/usr/bin/env node
/**
 * Export the Strapi CMS database into Astro content collections.
 *
 * Reads the PostgreSQL dump of ergoplatform.org's Strapi 4.3.9 instance and writes
 * one Markdown file per content entry into src/content/. Everything the site
 * renders comes from these files, so the git repository becomes the source of
 * truth and the build needs no database.
 *
 * Usage:
 *   node scripts/export-from-db.mjs            # requires a running local postgres
 *   node scripts/export-from-db.mjs --offline  # read from data/export-*.json instead
 *
 * Slugs are taken VERBATIM from the CMS `permalink` column. This is deliberate:
 * 81 permalinks contain non-ASCII characters or spaces, and 8 of them would be
 * altered by any slug-normalisation routine. Preserving them byte-for-byte keeps
 * the existing 1584 URLs working. Slug normalisation would silently break them.
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'src', 'content');

const PGHOST = process.env.PGHOST ?? '/tmp/opencode/pg';
const PGPORT = process.env.PGPORT ?? '55432';
const PGUSER = process.env.PGUSER ?? 'ergo';
const PGDATABASE = process.env.PGDATABASE ?? 'ergocms';
const PSQL = process.env.PSQL ?? '/tmp/opencode/pg/extracted/usr/lib/postgresql/17/bin/psql';

const OFFLINE = process.argv.includes('--offline');
const DATA = join(ROOT, 'data');

/** Run a query and return parsed JSON rows. */
function query(sql) {
  const out = execFileSync(
    PSQL,
    ['-h', PGHOST, '-p', PGPORT, '-U', PGUSER, '-d', PGDATABASE, '-At', '-F', '\x1f', '-c', sql],
    { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 },
  );
  return out
    .split('\n')
    .filter((l) => l.length > 0)
    .map((line) => {
      const cells = line.split('\x1f');
      // cells are text; the first column of every query below is a json value
      return JSON.parse(cells[0]);
    });
}

/** Query returning a single json aggregate. */
function queryOne(sql) {
  const out = execFileSync(
    PSQL,
    ['-h', PGHOST, '-p', PGPORT, '-U', PGUSER, '-d', PGDATABASE, '-At', '-c', sql],
    { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 },
  );
  return JSON.parse(out.trim() || 'null');
}

function offline(name) {
  const p = join(DATA, `export-${name}.json`);
  if (!existsSync(p)) {
    throw new Error(
      `offline mode: ${p} missing. Run without --offline first, or restore data/.`,
    );
  }
  return JSON.parse(readFileSync(p, 'utf8'));
}

// ---------------------------------------------------------------------------
// data source
// ---------------------------------------------------------------------------

const files = OFFLINE ? offline('files') : query('select json_build_object(\'id\',id,\'name\',name,\'alt\',alternative_text,\'caption\',caption,\'width\',width,\'height\',height,\'formats\',formats,\'url\',url,\'mime\',mime,\'ext\',ext,\'size\',size,\'hash\',hash) from files order by id');
const fileById = new Map(files.map((f) => [f.id, f]));

const morphs = OFFLINE ? offline('morphs') : query('select json_build_object(\'file\',file_id,\'related\',related_id,\'type\',related_type,\'field\',field) from files_related_morphs order by id');

/** media attachments keyed by `${relatedType}:${relatedId}` then field name */
const media = new Map();
for (const m of morphs) {
  const f = fileById.get(m.file);
  if (!f || !f.url) continue;
  const key = `${m.type}:${m.related}`;
  if (!media.has(key)) media.set(key, {});
  media.get(key)[m.field] = f;
}

const posts = OFFLINE ? offline('posts') : query(`select json_build_object(
  'id',id,'tag',tag,'title',title,'author',author,'date',date,'content',content,
  'spotlight',spotlight,'type',type,'createdAt',created_at,'updatedAt',updated_at,
  'publishedAt',published_at,'locale',locale,'subtitle',subtitle,'url',url,
  'permalink',permalink,'authorPhoto',author_photo,'blogPhoto',blog_photo)
  from posts order by id`);

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

/** Strapi morph type -> content collection field name. */
const MORPH_COLLECTION = {
  'api::post.post': 'post',
  'api::exchange.exchange': 'exchange',
  'api::team-member.team-member': 'teamMember',
  'api::document.document': 'document',
  'api::partner.partner': 'partner',
  'api::feature-and-project.feature-and-project': 'feature',
  'api::dapp.dapp': 'dapp',
  'api::changing-the-world.changing-the-world': 'changingTheWorld',
  'api::our-favorite.our-favorite': 'ourFavorite',
};

/** Attached media for an entry, e.g. { image: {...}, imageDark: {...} }. */
function mediaFor(type, id) {
  const raw = media.get(`${type}:${id}`);
  if (!raw) return undefined;
  const out = {};
  for (const [field, f] of Object.entries(raw)) {
    const key = field.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    out[key] = {
      url: f.url,
      alt: f.alt ?? f.name ?? '',
      width: f.width ?? undefined,
      height: f.height ?? undefined,
      mime: f.mime ?? undefined,
      formats: f.formats ?? undefined,
    };
  }
  return out;
}

/**
 * YAML would silently retype some strings: a slug like `2019-03-14` parses as a date,
 * `true` parses as a boolean, and a leading `-` marks a list item. Any of those in
 * frontmatter would corrupt the value on load, so they are quoted explicitly.
 */
function needsQuoting(s) {
  return (
    /^\s/.test(s) ||
    /\s$/.test(s) ||
    /^[-?:,[\]{}#&*!|>'"%@`]/.test(s) ||
    /^-$/.test(s) ||
    /^- /.test(s) ||
    s.includes(':') ||
    /\s#/.test(s) ||
    s.includes('\t') ||
    s.endsWith(':') ||
    /\d[\d_]*(\.\d+)?([eE][-+]?\d+)?$/.test(s) ||
    /^\d{4}-\d{1,2}-\d{1,2}([T ].*)?$/.test(s) ||
    /^(true|false|null|yes|no|on|off|~)$/i.test(s)
  );
}

/** Quote a value for YAML frontmatter, or emit a block scalar for multiline text. */
function yamlValue(v) {
  if (v === null || v === undefined || v === '') return 'null';
  if (typeof v === 'boolean' || typeof v === 'number') return String(v);
  if (typeof v === 'object') return JSON.stringify(v);
  const s = String(v);
  if (s.includes('\n')) return null; // caller uses a block scalar
  if (needsQuoting(s)) return JSON.stringify(s);
  return s;
}

/** Serialise an object into YAML frontmatter. */
function frontmatter(obj) {
  const lines = ['---'];
  for (const [key, raw] of Object.entries(obj)) {
    if (raw === undefined) continue;
    if (typeof raw === 'string' && raw.includes('\n')) {
      lines.push(`${key}: |-`);
      for (const l of raw.replace(/\n$/, '').split('\n')) lines.push(`  ${l}`);
    } else {
      const v = yamlValue(raw);
      if (v === null && (raw === null || raw === '')) lines.push(`${key}: null`);
      else lines.push(`${key}: ${v}`);
    }
  }
  lines.push('---');
  return lines.join('\n');
}

/** Build a filesystem-safe name that never loses the original slug. */
function fileName(slug, fallbackId) {
  const base = slug
    // Only characters that are illegal or ambiguous on a filesystem. The slug is
    // stored verbatim in frontmatter, so the filename is just a readable handle.
    .replace(/[\/\\?%*:|"<>]/g, '_')
    .replace(/\s+/g, ' ')
    .trim();
  return `${base || `post-${fallbackId}`}.md`;
}

// ---------------------------------------------------------------------------
// posts -> src/content/posts/<locale>/<slug>.md
// ---------------------------------------------------------------------------

const stats = {
  postsWritten: 0,
  externalNews: 0,
  draftsSkipped: 0,
  slugCollisions: 0,
  missingImages: 0,
  slugRepaired: [],
};

/**
 * Is this string usable as a single route segment?
 *
 * One published post has `permalink = github.com/ergoplatform/ergo/releases/tag/v5.0.7`
 * — an editor pasted a URL into the slug field. It contains no path segment that a
 * reader could ever navigate to, and it already 404s on the live site, so it is
 * repaired from the `url` column instead.
 */
function looksLikeSlug(s) {
  // a trailing `.MD` is a real, live URL (id 2062), so a dot alone is not disqualifying
  return !!s && !s.includes('/') && !s.includes('://');
}

/** Fall back to the title when neither permalink nor url yields a usable segment. */
function slugifyTitle(title) {
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/** Track slug reuse within a locale; CMS has blog/news twins sharing a permalink. */
const usedPaths = new Set();

/** locale -> canonical slugs actually rendered, written to data/post-index.json */
const renderedSlugs = new Map();

function writePost(p) {
  let slug = p.permalink || (p.url && !p.url.startsWith('http') ? p.url.split('/').pop() : '');
  if (slug && !looksLikeSlug(slug)) {
    const repaired = p.url && !p.url.startsWith('http') ? p.url.split('/').pop() : '';
    stats.slugRepaired.push({ id: p.id, from: slug, to: repaired || slugifyTitle(p.title ?? '') });
    slug = looksLikeSlug(repaired) ? repaired : slugifyTitle(p.title ?? '');
  }
  if (!slug) {
    stats.externalNews += 1;
    return;
  }
  if (!p.publishedAt) {
    stats.draftsSkipped += 1;
    return;
  }

  const postLocale = p.locale ?? 'en';
  const dir = join(CONTENT, 'posts', postLocale);
  let name = fileName(slug, p.id);
  let rel = join(dir, name);

  /*
   * 36 permalinks are shared by a blog/news pair of the same article — the CMS created
   * a `news` row alongside a `blog` row with an identical permalink.
   *
   * Only one can own the URL. The live site serves the lower id, verified against
   * production: `/en/blog/2020-09-17-defi-finance-but-not-always-decentralised/`
   * returns post 1249, not 1534. The duplicate is still exported, so nothing is lost,
   * but it is flagged `superseded` and excluded from routing.
   */
  const superseded = usedPaths.has(rel);
  if (superseded) {
    stats.slugCollisions += 1;
    name = fileName(slug, p.id).replace(/\.md$/, `-${p.id}.md`);
    rel = join(dir, name);
  }
  usedPaths.add(rel);

  // index by the primary path only; a collision duplicate is parked under a suffixed
  // filename and is reachable at the same URL, so one entry per slug is correct
  if (!renderedSlugs.has(postLocale)) renderedSlugs.set(postLocale, new Set());
  renderedSlugs.get(postLocale).add(slug);

  const img = mediaFor('api::post.post', p.id)?.image;
  if (!img) stats.missingImages += 1;

  const meta = {
    cmsId: p.id,
    // 3 rows have an empty title in the CMS. The live site renders an empty <h1>;
    // a dated heading is more useful than either that or a leaked row id.
    title:
      (p.title ?? '').trim() ||
      (p.date ? `Untitled post — ${new Date(p.date).toISOString().slice(0, 10)}` : `Untitled post ${p.id}`),
    slug, // verbatim: this is the URL
    type: p.type ?? 'blog',
    locale: p.locale ?? 'en',
    date: p.date ?? p.publishedAt ?? null,
    publishedAt: p.publishedAt ?? null,
    updatedAt: p.updatedAt ?? null,
    // 872 rows carry no author at all
    author: (p.author ?? '').trim() || 'Ergo Platform',
    tags: p.tag ? String(p.tag).split(',').map((t) => t.trim()).filter(Boolean) : [],
    spotlight: p.spotlight === true,
    subtitle: p.subtitle || null,
    image: img ?? null,
    authorPhoto: p.authorPhoto || null,
    blogPhoto: p.blogPhoto || null,
    /** news posts that point at an external article have no body of their own */
    externalUrl: p.url && p.url.startsWith('http') ? p.url : null,
    /**
     * Set when an earlier post already owns this permalink. The row is kept for the
     * archive but generates no route, so the live site's behaviour is preserved:
     * both rows share a URL and the lower id wins.
     */
    superseded: superseded || false,
  };

  const body = p.content ?? '';
  const file =
    `${frontmatter(meta)}\n\n${body.trim()}\n`;

  mkdirSync(dir, { recursive: true });
  writeFileSync(rel, file, 'utf8');
  stats.postsWritten += 1;
}

const POSTS_DIR = join(CONTENT, 'posts');
rmSync(POSTS_DIR, { recursive: true, force: true });
for (const p of posts) writePost(p);

// ---------------------------------------------------------------------------
// other collections
// ---------------------------------------------------------------------------

const SIMPLE = [
  {
    name: 'categories',
    table: 'categories',
    type: null,
    orderBy: null, // no order column
    fields: `json_build_object('id',id,'name',name,'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({ cmsId: r.id, name: (r.name ?? '').trim() || `Category ${r.id}`, locale: r.locale ?? 'en' }),
  },
  {
    name: 'roadmaps',
    table: 'roadmaps',
    type: 'api::changing-the-world.changing-the-world', // unused; roadmaps have no media
    fields: `json_build_object('id',id,'title',title,'description',description,'url',url,'order',"order",'group',"group",'status',status,'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({
      cmsId: r.id,
      title: (r.title ?? '').trim() || `Roadmap item ${r.id}`,
      description: r.description ?? null,
      url: r.url ?? null,
      order: r.order ?? 0,
      group: r.group ?? null,
      status: r.status ?? null,
    }),
  },
  {
    name: 'team',
    table: 'team_members',
    type: 'api::team-member.team-member',
    orderBy: null, // no order column
    fields: `json_build_object('id',id,'name',name,'github',github,'twitter',twitter,'linkedin',linkedin,'bio',bio,'group',"group",'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({
      cmsId: r.id,
      name: (r.name ?? '').trim() || `Member ${r.id}`,
      role: r.group ?? null,
      bio: r.bio ?? null,
      github: r.github ?? null,
      twitter: r.twitter ?? null,
      linkedin: r.linkedin ?? null,
      image: mediaFor('api::team-member.team-member', r.id)?.image ?? null,
    }),
  },
  {
    name: 'exchanges',
    table: 'exchanges',
    type: 'api::exchange.exchange',
    fields: `json_build_object('id',id,'name',name,'url',url,'order',"order",'tags',tags,'publishedAt',published_at)`,
    map: (r) => {
      const m = mediaFor('api::exchange.exchange', r.id) ?? {};
      return {
        cmsId: r.id,
        name: (r.name ?? '').trim() || `Exchange ${r.id}`,
        url: r.url ?? null,
        order: r.order ?? 0,
        tags: r.tags ? String(r.tags).split(',').map((t) => t.trim()).filter(Boolean) : [],
        image: m.image ?? null,
        imageDark: m.imageDark ?? null,
      };
    },
  },
  {
    name: 'documents',
    table: 'documents',
    type: 'api::document.document',
    orderBy: null, // no order column
    fields: `json_build_object('id',id,'title',title,'group',"group",'url',url,'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({
      cmsId: r.id,
      title: (r.title ?? '').trim() || `Document ${r.id}`,
      group: r.group ?? null,
      url: r.url ?? null,
      file: mediaFor('api::document.document', r.id)?.file ?? null,
    }),
  },
  {
    name: 'faqs',
    table: 'f_a_qs',
    type: null,
    fields: `json_build_object('id',id,'question',question,'answer',answer,'order',"order",'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({
      cmsId: r.id,
      question: (r.question ?? '').trim() || `Question ${r.id}`,
      answer: r.answer ?? '',
      order: r.order ?? 0,
    }),
  },
  {
    name: 'dapps',
    table: 'dapps',
    type: 'api::dapp.dapp',
    orderBy: null, // no order column
    fields: `json_build_object('id',id,'title',title,'description',description,'url',url,'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({
      cmsId: r.id,
      title: (r.title ?? '').trim() || `dApp ${r.id}`,
      description: r.description ?? null,
      url: r.url ?? null,
      image: mediaFor('api::dapp.dapp', r.id)?.image ?? null,
    }),
  },
  {
    name: 'projects',
    table: 'features_and_projects',
    type: 'api::feature-and-project.feature-and-project',
    fields: `json_build_object('id',id,'title',title,'description',description,'url',url,'buttonText',button_text,'group',"group",'order',"order",'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({
      cmsId: r.id,
      title: (r.title ?? '').trim() || `Project ${r.id}`,
      description: r.description ?? null,
      url: r.url ?? null,
      buttonText: r.buttonText ?? null,
      group: r.group ?? null,
      order: r.order ?? 0,
      image: mediaFor('api::feature-and-project.feature-and-project', r.id)?.image ?? null,
    }),
  },
  {
    name: 'partners',
    table: 'partners',
    type: 'api::partner.partner',
    orderBy: null, // no order column
    fields: `json_build_object('id',id,'name',name,'url',url,'publishedAt',published_at)`,
    map: (r) => {
      const m = mediaFor('api::partner.partner', r.id) ?? {};
      return {
        cmsId: r.id,
        name: (r.name ?? '').trim() || `Partner ${r.id}`,
        url: r.url ?? null,
        image: m.image ?? null,
        imageDark: m.imageDark ?? null,
      };
    },
  },
  {
    name: 'favorites',
    table: 'our_favorites',
    type: 'api::our-favorite.our-favorite',
    fields: `json_build_object('id',id,'title',title,'subtitle',subtitle,'description',description,'buttonText',button_text,'url',url,'order',"order",'locale',locale,'publishedAt',published_at)`,
    map: (r) => ({
      cmsId: r.id,
      title: (r.title ?? '').trim() || `Favourite ${r.id}`,
      subtitle: r.subtitle ?? null,
      description: r.description ?? null,
      buttonText: r.buttonText ?? null,
      url: r.url ?? null,
      order: r.order ?? 0,
      image: mediaFor('api::our-favorite.our-favorite', r.id)?.image ?? null,
    }),
  },
];

const collectionStats = {};

for (const spec of SIMPLE) {
  const orderCol = spec.orderBy === null ? 'id' : `"${spec.orderBy ?? 'order'}"`;
  const rows = OFFLINE
    ? offline(spec.name)
    : query(`select ${spec.fields} from ${spec.table} where published_at is not null order by ${orderCol} nulls last, id`);
  const dir = join(CONTENT, spec.name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  let n = 0;
  for (const r of rows) {
    const m = spec.map(r);
    if (m.cmsId === undefined) continue;
    const label = String(m.name ?? m.title ?? m.question ?? m.cmsId)
      .replace(/[\/\\?%*:|"<>]/g, '_')
      .slice(0, 60)
      .trim();
    writeFileSync(
      join(dir, `${label || spec.name}-${m.cmsId}.md`),
      `${frontmatter(m)}\n`,
      'utf8',
    );
    n += 1;
  }
  collectionStats[spec.name] = n;
}

// changing_the_worlds is populated in the CMS but unused by the live site.
// Exported so the data is not lost; nothing renders it yet.
{
  const rows = OFFLINE
    ? offline('changingTheWorlds')
    : query(`select json_build_object('id',id,'title',title,'subtitle',subtitle,'description',description,'url',url,'buttonText',button_text,'order',"order",'locale',locale,'publishedAt',published_at) from changing_the_worlds where published_at is not null order by "order", id`);
  const dir = join(CONTENT, 'changing-the-worlds');
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  let n = 0;
  for (const r of rows) {
    writeFileSync(
      join(dir, `${String(r.title ?? r.id).replace(/[\/\\?%*:|"<>]/g, '_').slice(0, 60)}.md`),
      `${frontmatter({
        cmsId: r.id,
        title: (r.title ?? '').trim() || `Entry ${r.id}`,
        subtitle: r.subtitle ?? null,
        description: r.description ?? null,
        url: r.url ?? null,
        buttonText: r.buttonText ?? null,
        order: r.order ?? 0,
        image: mediaFor('api::changing-the-world.changing-the-world', r.id)?.image ?? null,
      })}\n`,
      'utf8',
    );
    n += 1;
  }
  collectionStats['changing-the-worlds'] = n;
}

// ---------------------------------------------------------------------------
// offline snapshot, so the repo can be rebuilt without postgres
// ---------------------------------------------------------------------------

/**
 * Index of every rendered slug, per locale.
 *
 * rewrite-links.mjs uses it to repair internal links whose casing drifted from the
 * canonical slug — the archive has, for example, a link to `/blog/2019_04_22-lets`
 * while the post is published at `/blog/2019_04_22-LETS`.
 */
const slugIndex = Object.fromEntries(
  [...renderedSlugs.entries()].map(([loc, set]) => [loc, [...set].sort()]),
);

mkdirSync(DATA, { recursive: true });
writeFileSync(join(DATA, 'post-index.json'), JSON.stringify(slugIndex) + '\n', 'utf8');


mkdirSync(DATA, { recursive: true });
writeFileSync(join(DATA, 'post-index.json'), JSON.stringify(slugIndex, null, 0) + '\n', 'utf8');
writeFileSync(
  join(DATA, 'export-snapshot.json'),
  JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      source: OFFLINE ? 'archive snapshot' : `${PGDATABASE}@${PGHOST}:${PGPORT}`,
      posts: stats,
      collections: collectionStats,
    },
    null,
    2,
  ) + '\n',
  'utf8',
);

// ---------------------------------------------------------------------------

console.log('export complete');
console.log(`  posts written      ${stats.postsWritten}`);
console.log(`  external news      ${stats.externalNews} (no page, listed only)`);
console.log(`  drafts skipped     ${stats.draftsSkipped}`);
console.log(`  slug collisions    ${stats.slugCollisions} (duplicate parked under post id)`);
console.log(`  posts without img  ${stats.missingImages}`);
if (stats.slugRepaired.length) {
  console.log(`\n  ${stats.slugRepaired.length} malformed slug(s) repaired:`);
  for (const r of stats.slugRepaired) {
    console.log(`    id=${r.id}  ${r.from}  ->  ${r.to}`);
  }
}
for (const [k, v] of Object.entries(collectionStats)) {
  console.log(`  ${k.padEnd(20)}${v}`);
}
