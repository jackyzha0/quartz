import { Translation } from "./locales/definition"
import en from "./locales/en-US"
import fr from "./locales/fr-FR"

export const TRANSLATIONS = {
  "en-US": en,
  "fr-FR": fr,
} as const

export const i18n = (locale: ValidLocale): Translation => TRANSLATIONS[locale]
export type ValidLocale = keyof typeof TRANSLATIONS
