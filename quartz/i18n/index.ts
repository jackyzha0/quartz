import { Translation } from "./locales/definition"
import en from "./locales/en-US"
import fr from "./locales/fr-FR"
import ja from "./locales/ja-JP"
import de from "./locales/de-DE"
import nl from "./locales/nl-NL"
import ro from "./locales/ro-RO"
import es from "./locales/es-ES"
import uk from "./locales/uk-UA"

export const TRANSLATIONS = {
  "en-US": en,
  "fr-FR": fr,
  "ja-JP": ja,
  "de-DE": de,
  "nl-NL": nl,
  "ro-RO": ro,
  "ro-MD": ro,
  "es-ES": es,
  "uk-UA": uk,
} as const

export const defaultTranslation = "en-US"
export const i18n = (locale: ValidLocale): Translation => TRANSLATIONS[locale ?? defaultTranslation]
export type ValidLocale = keyof typeof TRANSLATIONS
