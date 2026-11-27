import { Translation, CalloutTranslation } from "./locales/definition"
import enUs from "./locales/en-US"
import enGb from "./locales/en-GB"
import fr from "./locales/fr-FR"
import it from "./locales/it-IT"
import ja from "./locales/ja-JP"
import de from "./locales/de-DE"
import nl from "./locales/nl-NL"
import ro from "./locales/ro-RO"
import ca from "./locales/ca-ES"
import es from "./locales/es-ES"
import ar from "./locales/ar-SA"
import uk from "./locales/uk-UA"
import ru from "./locales/ru-RU"
import ko from "./locales/ko-KR"
import zh from "./locales/zh-CN"
import zhTw from "./locales/zh-TW"
import vi from "./locales/vi-VN"
import pt from "./locales/pt-BR"
import hu from "./locales/hu-HU"
import fa from "./locales/fa-IR"
import pl from "./locales/pl-PL"
import cs from "./locales/cs-CZ"
import tr from "./locales/tr-TR"
import th from "./locales/th-TH"
import lt from "./locales/lt-LT"
import fi from "./locales/fi-FI"
import no from "./locales/nb-NO"
import id from "./locales/id-ID"
import kk from "./locales/kk-KZ"
import he from "./locales/he-IL"

export const TRANSLATIONS = {
  "en-US": enUs,
  "en-GB": enGb,
  "fr-FR": fr,
  "it-IT": it,
  "ja-JP": ja,
  "de-DE": de,
  "nl-NL": nl,
  "nl-BE": nl,
  "ro-RO": ro,
  "ro-MD": ro,
  "ca-ES": ca,
  "es-ES": es,
  "ar-SA": ar,
  "ar-AE": ar,
  "ar-QA": ar,
  "ar-BH": ar,
  "ar-KW": ar,
  "ar-OM": ar,
  "ar-YE": ar,
  "ar-IR": ar,
  "ar-SY": ar,
  "ar-IQ": ar,
  "ar-JO": ar,
  "ar-PL": ar,
  "ar-LB": ar,
  "ar-EG": ar,
  "ar-SD": ar,
  "ar-LY": ar,
  "ar-MA": ar,
  "ar-TN": ar,
  "ar-DZ": ar,
  "ar-MR": ar,
  "uk-UA": uk,
  "ru-RU": ru,
  "ko-KR": ko,
  "zh-CN": zh,
  "zh-TW": zhTw,
  "vi-VN": vi,
  "pt-BR": pt,
  "hu-HU": hu,
  "fa-IR": fa,
  "pl-PL": pl,
  "cs-CZ": cs,
  "tr-TR": tr,
  "th-TH": th,
  "lt-LT": lt,
  "fi-FI": fi,
  "nb-NO": no,
  "id-ID": id,
  "kk-KZ": kk,
  "he-IL": he,
} as const

export const defaultTranslation = "en-US"

const warnedLocales = new Set<string>()

/**
 * The translation to use for `locale`: its own, else one of the same language (`es-MX` uses
 * `es-ES`), else English. A locale without a translation used to crash the build
 * (`TRANSLATIONS[locale]` is undefined); dates and numbers still use the configured locale.
 */
export function resolveTranslationLocale(locale: string | undefined): ValidLocale {
  if (!locale) return defaultTranslation
  const keys = Object.keys(TRANSLATIONS) as ValidLocale[]
  const exact = keys.find((key) => key.toLowerCase() === locale.toLowerCase())
  if (exact) return exact
  const language = locale.split("-")[0]!.toLowerCase()
  const chosen =
    keys.find((key) => key.split("-")[0]!.toLowerCase() === language) ?? defaultTranslation
  if (!warnedLocales.has(locale)) {
    warnedLocales.add(locale)
    console.warn(
      `Quartz has no translation for locale "${locale}"; its text uses ${chosen}. ` +
        `Dates still use ${locale}. Translations: https://quartz.jzhao.xyz/features/i18n`,
    )
  }
  return chosen
}

export const i18n = (locale: ValidLocale | string | undefined): Translation =>
  TRANSLATIONS[resolveTranslationLocale(locale)]
export type ValidLocale = keyof typeof TRANSLATIONS
export type ValidCallout = keyof CalloutTranslation
