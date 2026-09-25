import assert from "node:assert"
import { readFileSync } from "node:fs"
import test, { describe } from "node:test"
import YAML from "yaml"
import { getFontSpecificationName, joinStyles } from "./theme"
import {
  getThemePreset,
  getThemePresetFromEnvironment,
  quartzThemePresets,
  resolveBuildTheme,
  themePresetNames,
  UnknownThemePresetError,
} from "./themePresets"

describe("theme presets", () => {
  test("defines six complete light and dark Quartz theme sets", () => {
    assert.strictEqual(themePresetNames.length, 6)

    for (const name of themePresetNames) {
      const preset = getThemePreset(name)
      for (const mode of ["lightMode", "darkMode"] as const) {
        assert.deepStrictEqual(Object.keys(preset.colors[mode]).sort(), [
          "dark",
          "darkgray",
          "gray",
          "highlight",
          "light",
          "lightgray",
          "secondary",
          "tertiary",
          "textHighlight",
        ])
      }
    }
  })

  test("keeps oldwinter compatible with the existing CSS variable contract", () => {
    const css = joinStyles(quartzThemePresets.oldwinter, "")

    assert(css.includes(":root {"))
    assert(css.includes(':root[saved-theme="dark"] {'))
    assert(css.includes("--light: #faf8f7;"))
    assert(css.includes("--secondary: #28546a;"))
    assert(css.includes("--light: #151716;"))
    assert(css.includes("--secondary: #8ab2c4;"))
  })

  test("resolves a named theme preset from QUARTZ_THEME", () => {
    const preset = getThemePresetFromEnvironment({ QUARTZ_THEME: "sakura" })

    assert.strictEqual(preset, quartzThemePresets.sakura)
  })

  test("returns no preset when QUARTZ_THEME is unset", () => {
    const preset = getThemePresetFromEnvironment({})

    assert.strictEqual(preset, undefined)
  })

  test("resolveBuildTheme falls back to oldwinter when QUARTZ_THEME is unset", () => {
    assert.strictEqual(resolveBuildTheme({}), quartzThemePresets.oldwinter)
  })

  test("resolveBuildTheme honors QUARTZ_THEME", () => {
    assert.strictEqual(resolveBuildTheme({ QUARTZ_THEME: "ink" }), quartzThemePresets.ink)
  })

  test("keeps the YAML theme snapshot in sync with the oldwinter preset", () => {
    const yaml = YAML.parse(
      readFileSync(new URL("../../quartz.config.yaml", import.meta.url), "utf8"),
    )
    const preset = quartzThemePresets.oldwinter

    assert.deepStrictEqual(yaml.configuration.theme.colors, preset.colors)
    assert.strictEqual(yaml.configuration.theme.fontOrigin, preset.fontOrigin)
    assert.strictEqual(yaml.configuration.theme.cdnCaching, preset.cdnCaching)
    assert.strictEqual(
      yaml.configuration.theme.typography.header,
      getFontSpecificationName(preset.typography.header),
    )
    assert.strictEqual(
      yaml.configuration.theme.typography.body,
      getFontSpecificationName(preset.typography.body),
    )
    assert.strictEqual(
      yaml.configuration.theme.typography.code,
      getFontSpecificationName(preset.typography.code),
    )
  })

  test("rejects unknown theme preset names", () => {
    assert.throws(() => getThemePreset("missing"), UnknownThemePresetError)
    assert.throws(
      () => getThemePreset("missing"),
      /Unknown Quartz theme preset "missing". Expected one of: oldwinter, ink, mist, ember, atlas, sakura/,
    )
  })
})
