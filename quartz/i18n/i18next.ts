import { t } from "i18next"
import en from "./locales/en.json"
import fr from "./locales/fr.json"

export const resources = {
  "en-US": { translation: en },
  "fr-FR": { translation: fr },
} as const

export type Locale = "en-US" | "fr-FR"
const TRANSLATION = {
  "en-US": en,
  "fr-FR": fr,
} as const

type TranslationOptions = {
  [key: string]: string
}

export const i18n = (lang: Locale, key: string, options?: TranslationOptions) => {
  const getTranslation = (key: string) => {
    const keys = key.split(".")
    let translationString: string | Record<string, unknown> =
      TRANSLATION[lang as keyof typeof TRANSLATION]
    keys.forEach((key) => {
      // @ts-ignore
      translationString = translationString[key]
    })
    return translationString
  }
  if (options) {
    let translationString = getTranslation(key).toString()
    Object.keys(options).forEach((key) => {
      translationString = translationString.replace(`{{${key}}}`, options[key])
    })
    return translationString
  }
  return getTranslation(key).toString()
}
