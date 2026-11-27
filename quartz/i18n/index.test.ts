import test, { describe } from "node:test"
import assert from "node:assert"
import { i18n, resolveTranslationLocale } from "./index"

describe("i18n locale fallback", () => {
  test("a locale with a translation uses it, whatever its case", (t) => {
    t.mock.method(console, "warn", () => {})
    assert.strictEqual(resolveTranslationLocale("de-DE"), "de-DE")
    assert.strictEqual(resolveTranslationLocale("de-de"), "de-DE")
    assert.strictEqual(resolveTranslationLocale(undefined), "en-US")
  })

  test("a locale without one uses the same language, else English, and warns once", (t) => {
    const warn = t.mock.method(console, "warn", () => {})
    assert.strictEqual(resolveTranslationLocale("es-MX"), "es-ES")
    assert.strictEqual(resolveTranslationLocale("es-MX"), "es-ES")
    assert.strictEqual(resolveTranslationLocale("sv-SE"), "en-US")
    assert.strictEqual(resolveTranslationLocale("nb"), "nb-NO")
    assert.strictEqual(warn.mock.callCount(), 3)
    assert.match(String(warn.mock.calls[0]!.arguments[0]), /no translation for locale "es-MX"/)
  })

  // used to throw: TRANSLATIONS["sv-SE"] was undefined
  test("i18n() of a locale without a translation returns one", (t) => {
    t.mock.method(console, "warn", () => {})
    assert.strictEqual(i18n("da-DK").pages.error.title, i18n("en-US").pages.error.title)
  })
})
