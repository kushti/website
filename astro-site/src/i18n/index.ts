import messages from './messages/en.json';

/**
 * UI string lookup with per-locale fallback to English.
 *
 * The catalogues are the ones the live site ships, recovered from its compiled
 * bundles and flattened to plain strings (see scripts/convert-i18n.mjs). English is
 * the baseline: it has 250 keys, and 41 further strings the current site hardcodes
 * in JSX for English readers appear only in the translated bundles, so those are
 * defined inline below.
 */
export type Catalogue = Record<string, string>;

const catalogues: Record<string, Catalogue> = { en: messages as Catalogue };

for (const loc of ['ru', 'de', 'es', 'pt', 'zh', 'id', 'it', 'pl', 'hu', 'tr', 'sk']) {
  catalogues[loc] = (await import(`./messages/${loc}.json`)).default as Catalogue;
}

/** Legacy alias used by the old site for Chinese. */
catalogues.cn = catalogues.zh;

/**
 * Strings the production site renders as hardcoded JSX when the language is English,
 * and only puts through react-intl for every other language. Recovered from the
 * translated bundles so the rebuild shows the same text in all 12 locales.
 */
const HARDCODED_EN: Catalogue = {
  // keyed lowercase to match `components.communityHero.<channel>.<field>` at the call site
  'components.communityHero.discord.title': 'Discord',
  'components.communityHero.discord.text': 'Join the conversation',
  'components.communityHero.discourse.title': 'Discourse',
  'components.communityHero.discourse.text': 'Forum discussions',
  'components.communityHero.github.title': 'GitHub',
  'components.communityHero.github.text': 'Contribute to the code',
  'components.communityHero.reddit.title': 'Reddit',
  'components.communityHero.reddit.text': 'Community threads',
  'components.communityHero.telegram.title': 'Telegram',
  'components.communityHero.telegram.text': 'Announcements',
  'components.communityHero.twitter.title': 'Twitter',
  'components.communityHero.twitter.text': 'Latest updates',
  'components.communityHero.wiki.title': 'Wiki',
  'components.communityHero.wiki.text': 'Community knowledge base',
  'components.communityHero.youtube.title': 'YouTube',
  'components.communityHero.youtube.text': 'Videos and streams',

  'components.communityHero.Discord.title': 'Discord',
  'components.communityHero.Discord.text': 'Join the conversation',
  'components.communityHero.Discourse.title': 'Discourse',
  'components.communityHero.Discourse.text': 'Forum discussions',
  'components.communityHero.Github.title': 'GitHub',
  'components.communityHero.Github.text': 'Contribute to the code',
  'components.communityHero.Reddit.title': 'Reddit',
  'components.communityHero.Reddit.text': 'Community threads',
  'components.communityHero.Telegram.title': 'Telegram',
  'components.communityHero.Telegram.text': 'Announcements',
  'components.communityHero.Twitter.title': 'Twitter',
  'components.communityHero.Twitter.text': 'Latest updates',
  'components.communityHero.Wiki.title': 'Wiki',
  'components.communityHero.Wiki.text': 'Community knowledge base',
  'components.communityHero.Youtube.title': 'YouTube',
  'components.communityHero.Youtube.text': 'Videos and streams',
  'components.ergoExplorer.button2': 'EXPLORER',
  'components.ergoExplorer.ergoWatch': 'Ergo Watch',
  'components.ergoExplorer.metrics': 'Network metrics',
  'components.ergoRaffle.heading': 'Ergo Raffle',
  'components.explore.description': 'Dive deeper into the technology.',
  'components.getErg.heroTitle': 'GET ERG',
  'components.hallOfFame.title': 'Hall of Fame',
  'components.highlights.slide.1.title': 'Autolykos ePoW',
  'components.highlights.slide.1.text': 'ASIC-resistant proof of work.',
  'components.highlights.slide.1.quote': 'Mining stays open to everyone.',
  'components.highlights.slide.2.title': 'Extended UTXO',
  'components.highlights.slide.2.text': 'Contracts with off-chain execution.',
  'components.highlights.slide.2.quote': 'Complex dApps, simple settlement.',
  'components.highlights.slide.3.title': 'ErgoScript',
  'components.highlights.slide.3.text': 'A language built for financial contracts.',
  'components.highlights.slide.3.quote': 'Ergonomics over trickiness.',
  'components.usingErg.BuyIt.title': 'Buy it',
  'components.usingErg.BuyIt.text': 'ERG is listed on major exchanges.',
  'components.usingErg.MineIt.title': 'Mine it',
  'components.usingErg.MineIt.text': 'Autolykos mining rewards the earliest blocks.',
  'components.usingErg.StoreIt.title': 'Store it',
  'components.usingErg.StoreIt.text': 'Wallets keep keys on your own device.',
  'components.usingErg.UseIt.title': 'Use it',
  'components.wallets.hotStorageHeader': 'Hot storage wallets',
  'components.wallets.mobileAppHeader': 'Mobile wallets',
};

/** The 11 routes the site serves under every locale. */
const ROUTE_STRINGS: Catalogue = {
  'nav.home': 'Home',
  'nav.blog': 'Blog',
  'nav.discover': 'Discover',
  'nav.ecosystem': 'Ecosystem',
  'nav.community': 'Community',
  'nav.getErg': 'Get Ergo',
  'nav.manifesto': 'Manifesto',
  'nav.ergoWalletApp': 'Ergo Wallet App',
  'nav.legal': 'Legal',
  'nav.privacyPolicy': 'Privacy Policy',
  'nav.skipToContent': 'Skip to content',
  'nav.menu': 'Menu',
  'nav.close': 'Close',
  'nav.toggleTheme': 'Toggle theme',
  'nav.changeLanguage': 'Change language',
  'footer.ecosystem.title': 'ECOSYSTEM',
  'footer.blog.title': 'BLOG',
  'footer.community': 'Community',
  'footer.getErg': 'Get Ergo',
  'footer.discover': 'Discover Ergo',
  'footer.ecosystem': 'Ecosystem',
  'footer.community.title': 'COMMUNITY',
  'footer.discover.title': 'DISCOVER',
  'footer.getErg.title': 'GET ERGO',
  'footer.copyright': 'Ergo Platform. Licensed under CC BY 4.0.',
  'blog.post.backToAll': 'BACK TO ALL POSTS',
  'blog.post.machineTranslated': 'This page is machine-translated.',
  'blog.post.sharePost': 'Share post',
  'blog.post.readTime': 'min read',
  'blog.post.externalLink': 'Read the original article',
  'blog.post.relatedPosts': 'Related posts',
  'blog.filter.all': 'All',
  'blog.filter.categories': 'Categories',
  'blog.filter.showing': 'Showing',
  'blog.filter.of': 'of',
  'blog.filter.posts': 'posts',
  'blog.pagination.previous': 'Previous',
  'blog.pagination.next': 'Next',
  'blog.pagination.page': 'Page',
  'home.spotlight': 'Spotlight',
  'home.hero.title': 'Powering the Future of Finance',
  'home.hero.subtitle':
    'Ergo is a next-generation smart contract platform that ensures the economic freedom of ordinary people through secure, accessible, and decentralized financial tools.',
  'home.hero.cta': 'Dive in',
  'home.hero.pitch': 'Pitch deck',
  'home.blockReward': 'Block reward',
  'home.transactionsPerDay': 'Transactions per day',
  'home.hashRateHero': 'Hash rate',

  'home.latestNews': 'Latest News',
  'home.latestPosts': 'Latest Posts',
  'home.partners': 'Partners',
  'home.supply': 'Circulating supply',
  'home.hashRate': 'Network hashrate',
  'home.transactions': 'Avg block time',
  'discover.documents': 'DOCUMENTS',
  'discover.faq': 'FAQ',
  'ecosystem.roadmap': 'ROADMAP',
  'ecosystem.dapps': 'DAPPS',
  'ecosystem.projects': 'FEATURED PROJECTS',
  'ecosystem.favorites': 'OUR FAVOURITES',
  'community.team': 'TEAM',
  'getErg.exchanges': 'EXCHANGES',
  'getErg.hashRate': 'NETWORK HASHRATE',
  'getErg.supply': 'SUPPLY',
  'getErg.team': 'TEAM',
  'getErg.recentTransactions': 'RECENT TRANSACTIONS',
  'footer.tagline':
    'A next-generation smart contract platform focused on secure, accessible and decentralized financial tools.',
  'getErg.difficulty': 'DIFFICULTY',
  'getErg.blockReward': 'BLOCK REWARD',
  'getErg.price': 'ERG PRICE',
  'getErg.priceUnavailable': 'price feed unavailable',
  'notFound.title': 'Page not found',
  'notFound.body': 'The page you were looking for does not exist.',
  'notFound.cta': 'Go to the blog',
};

const localCatalogue = (loc: string): Catalogue => catalogues[loc] ?? catalogues.en;

/**
 * Some messages in the export are unusable: the value was truncated at the first `<` when
 * the catalogue was flattened, leaving a dangling "b" where the tag used to start
 * ("I am a b"), and one carries a stray "breakingLine" token. They are recognised here
 * and treated as missing, so `t` falls through to English rather than rendering the
 * fragment. The English values were repaired from the rendered site.
 */
const UNUSABLE = /(?:^|\s)[bB]$|breakingLine/;

const usable = (catalogue: Catalogue, key: string): string | undefined => {
  const value = catalogue[key];
  return value && !UNUSABLE.test(value) ? value : undefined;
};

/**
 * Look up a UI string. Falls back to the localised catalogue, then to the English
 * catalogue, then to the built-in route strings.
 *
 * Returns the key itself when nothing matches, so a missing string is visible in
 * review rather than silently blank. That also means `t(loc, key) || 'fallback'` never
 * falls back — the key is truthy. Use `tr` for that case.
 */
export function t(loc: string, key: string): string {
  const l = localCatalogue(loc);
  return (
    usable(l, key) ??
    usable(catalogues.en, key) ??
    HARDCODED_EN[key] ??
    ROUTE_STRINGS[key] ??
    key
  );
}

/** True when the key resolves to real text rather than echoing itself back. */
export function has(loc: string, key: string): boolean {
  return t(loc, key) !== key;
}

/**
 * Look up a UI string with an explicit default.
 *
 * The extracted catalogues cover the strings the previous site routed through
 * react-intl; the marketing copy on the section pages was hardcoded in JSX and is not
 * in any of them, so those keys need a default here.
 */
export function tr(loc: string, key: string, fallback: string): string {
  return has(loc, key) ? t(loc, key) : fallback;
}

/** All routes carry their own strings, so build once and merge. */
// HARDCODED_EN fills only what the recovered English bundle is missing; a real English
// string (for example the community channel copy) always wins over the old fallback.
for (const [key, value] of Object.entries(HARDCODED_EN)) {
  if (!(key in catalogues.en)) catalogues.en[key] = value;
}
Object.assign(catalogues.en, ROUTE_STRINGS);
for (const loc of Object.keys(catalogues)) {
  if (loc === 'en') continue;
  Object.assign(catalogues[loc], ROUTE_STRINGS);
}

/** Keys a given locale is missing relative to English. */
export function missingKeys(loc: string): string[] {
  return Object.keys(catalogues.en).filter((k) => !localCatalogue(loc)[k]);
}

export const catalogueFor = localCatalogue;
