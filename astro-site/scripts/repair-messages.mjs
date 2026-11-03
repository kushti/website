#!/usr/bin/env node
/**
 * Repair the messages the export truncated.
 *
 *   node scripts/repair-messages.mjs           # report what is damaged
 *   node scripts/repair-messages.mjs --write   # apply the repairs
 *
 * Thirty-three messages across the twelve catalogues were cut mid-word when the bundles were
 * flattened: the value ended at the first `<`, leaving a dangling "b" where the tag used to
 * start. "I am a developer" became "I am a b", and "Ergo operates on an open model where
 * anyone is welcome to contribute." became "Ergo operates on an open model where b".
 *
 * Three of the four English strings are recoverable from the rendered live site. The fourth
 * — components.faq.text.2 — was also mangled beyond repair in the export ("CAN"T FIND WHAT
 * breakingLine YOU'RE LOOKING FOR?"), and the render shows "Can't find what you're looking
 * for?", so that one is reconstructed rather than recovered.
 *
 * For the eleven translated catalogues the truncation is mid-sentence, so the missing tail
 * cannot be recovered from the fragment. Those values are replaced with the repaired
 * English string rather than left to render as a fragment: an English sentence is wrong in
 * that language, but a truncated one is wrong everywhere, and the gap is recorded in
 * docs/output-diff.md for a translator to close.
 *
 * `t()` refuses to render a damaged value regardless, so nothing broken reaches a page if
 * this is never run.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const DIR = 'src/i18n/messages';
const LOCALES = ['cn', 'de', 'es', 'hu', 'id', 'it', 'pl', 'pt', 'ru', 'sk', 'tr', 'zh'];

/**
 * Two kinds of damage, from the same cause — the flatten step mangled a `<br/>`:
 *
 *   - a value truncated at the first `<`, leaving a dangling "b" where the tag was, and
 *   - a value where the tag was replaced by a literal "breakingLine" token.
 *
 * A value ending on a bare "b" is the first kind. German is the awkward case: its foundation
 * list has every occurrence of "Blockchain" reduced to "b" ("Förderung der b Entwicklung"),
 * which is the same defect but has no per-item English equivalent to fall back to. Those are
 * left alone for a translator and surfaced by scripts/check-i18n.mjs.
 */
const DAMAGED = /(?:^|\s)[bB]$/;
const BREAKING_LINE = /breakingLine/;

/**
 * The token stands where a <br/> was. In a sentence it is a word break; in Chinese it sits
 * between two clauses with no surrounding whitespace, since the language does not use it.
 * Both are the same substitution, so both are stripped.
 */
const isBrokenLine = (value) => BREAKING_LINE.test(value);

/** what each key should read, recovered from the rendered site */
const REPAIRS = {
  'components.ContributeForm.developer.title': 'I am a developer',
  'components.ContributeForm.company.title': 'I am a company',
  'components.ContributeForm.text':
    'Ergo operates on an open model where anyone is welcome to contribute.',
  'components.faq.text.2': 'Can’t find what you’re looking for?',
};

const write = process.argv.includes('--write');
let damaged = 0;
let repaired = 0;
let fellBack = 0;

for (const loc of LOCALES) {
  const path = `${DIR}/${loc}.json`;
  const data = JSON.parse(readFileSync(path, 'utf8'));

  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== 'string') continue;

    /*
     * The "breakingLine" token is a sentence break the export left in place of a <br/>.
     * Dropping it leaves the sentence whole in every language — that one is a clean repair,
     * not a fallback.
     */
    if (BREAKING_LINE.test(value)) {
      damaged += 1;
      if (!isBrokenLine(value)) {
        console.log(`  ${loc}.${key} — contains "breakingLine" mid-phrase; left alone for review`);
        continue;
      }
      const fixed = value.replace(/\s*breakingLine\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
      if (write) {
        data[key] = fixed;
        console.log(`  ${loc}.${key}\n    was: ${JSON.stringify(value)}\n    now: ${JSON.stringify(fixed)}`);
      } else {
        console.log(`  would set ${loc}.${key} = ${JSON.stringify(fixed)}`);
      }
      repaired += 1;
      continue;
    }

    if (!DAMAGED.test(value)) continue;
    damaged += 1;

    if (!REPAIRS[key]) {
      console.log(`  ${loc}.${key} — damaged, no repair known; left as-is`);
      continue;
    }

    if (value === REPAIRS[key]) continue; // already correct, e.g. an English value in sk

    if (write) {
      data[key] = REPAIRS[key];
      console.log(`  ${loc}.${key}\n    was: ${JSON.stringify(value)}\n    now: ${JSON.stringify(REPAIRS[key])}`);
    } else {
      console.log(`  would set ${loc}.${key} = ${JSON.stringify(REPAIRS[key])}`);
    }
    repaired += 1;
    if (loc !== 'en') fellBack += 1;
  }

  if (write) writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

console.log(
  `\n${damaged} damaged value(s); ${repaired} repairable` +
    (fellBack ? `, of which ${fellBack} are non-English and are now English pending translation` : '') +
    (write ? '' : '; pass --write to apply'),
);