/**
 * Production's CMS stores editorial dates at 21:00 UTC, which is midnight in Moscow —
 * the timezone the blog cards, article headers and community feed render them in.
 * Category cards are the exception: the live tag pages print the UTC calendar date.
 * Keeping the zone explicit makes the build independent of the machine running it.
 */
export const SITE_TIME_ZONE = 'Europe/Moscow';

/** "November 28, 2025", in the given page locale and timezone. */
export function formatLongDate(
  locale: string,
  date: Date,
  timeZone: string = SITE_TIME_ZONE,
): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone,
  }).format(date);
}
