/**
 * Locale configuration, mirroring the routing of the live site.
 *
 * `cn` is a legacy alias kept only so the old `/cn/*` URLs redirect rather than 404.
 * `ru` is the default the live site redirects `/` to, preserved for continuity.
 */

export const DEFAULT_LOCALE = 'ru';

export const LOCALES = [
  'en',
  'de',
  'es',
  'hu',
  'id',
  'it',
  'pl',
  'pt',
  'ru',
  'sk',
  'tr',
  'zh',
] as const;

export type Locale = (typeof LOCALES)[number];

/** Human-readable names, in each language's own convention. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  hu: 'Magyar',
  id: 'Bahasa Indonesia',
  it: 'Italiano',
  pl: 'Polski',
  pt: 'Português',
  ru: 'Русский',
  sk: 'Slovenčina',
  tr: 'Türkçe',
  zh: '中文',
};

/** Legacy prefixes that must redirect. */
export const LEGACY_LOCALE_ALIASES: Record<string, Locale> = {
  cn: 'zh',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Resolve a locale, following legacy aliases. */
export function normaliseLocale(value: string | undefined): Locale {
  if (!value) return DEFAULT_LOCALE;
  const lower = value.toLowerCase();
  if (isLocale(lower)) return lower;
  return LEGACY_LOCALE_ALIASES[lower] ?? DEFAULT_LOCALE;
}
