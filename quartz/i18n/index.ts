import { Translation } from "./locales/definition"
import en from "./locales/en-US"
import fr from "./locales/fr-FR"
import ja from "./locales/ja-JP"
import de from "./locales/de-DE"
import nl from "./locales/nl-NL"

export const TRANSLATIONS = {
  "en-US": en,
  "fr-FR": fr,
  "ja-JP": ja,
  "de-DE": de,
  "nl-NL": nl,
} as const

export const i18n = (locale: ValidLocale): Translation => TRANSLATIONS[locale ?? "en-US"]
export type ValidLocale = keyof typeof TRANSLATIONS
