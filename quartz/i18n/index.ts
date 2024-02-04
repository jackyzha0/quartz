import {
  Translation,
  TranslationEntry,
  TranslationString,
  ValidTranslationKey,
  VariableType,
} from "./locales/definition"
import en from "./locales/en"
import fr from "./locales/fr"

const TRANSLATIONS = {
  "en-US": en,
  "fr-FR": fr,
} as const

export type Locales = keyof typeof TRANSLATIONS
export function i18n<Key extends ValidTranslationKey>(
  lang: Locales = "en-US",
  key: Key,
  variables?: VariableType<Key, Translation>,
) {
  const getTranslation = (key: Key): undefined | TranslationString => {
    const keys = key.split(".")
    let translationStringOrFn: TranslationString | TranslationEntry = TRANSLATIONS[
      lang
    ] as TranslationEntry
    for (const key of keys) {
      if (typeof translationStringOrFn === "object") {
        translationStringOrFn = translationStringOrFn[key]
      } else {
        return undefined
      }
    }
  }

  let translation = getTranslation(key)
  if (!translation) {
    throw new Error(`Invalid i18n key ${key} for ${lang}`)
  }

  if (typeof translation === "string") {
    return translation
  } else if (!variables) {
    throw new Error(`i18n translation in ${lang} for key ${key} requires passing in variables`)
  }

  return translation(variables)
}
