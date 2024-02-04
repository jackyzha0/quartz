import en from "./locales/en.json"
import fr from "./locales/fr.json"

const TRANSLATION = {
  "en-US": en,
  "fr-FR": fr,
} as const

type TranslationOptions = {
  [key: string]: string
}

export const i18n = (lang = "en-US", key: string, options?: TranslationOptions) => {
  const locale =
    Object.keys(TRANSLATION).find(
      (key) =>
        key.toLowerCase() === lang.toLowerCase() || key.toLowerCase().includes(lang.toLowerCase()),
    ) ?? "en-US"
  const getTranslation = (key: string) => {
    const keys = key.split(".")
    let translationString: string | Record<string, unknown> =
      TRANSLATION[locale as keyof typeof TRANSLATION]
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
