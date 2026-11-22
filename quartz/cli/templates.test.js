import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { createRequire } from "node:module"
import YAML from "yaml"
import { validatePluginOptions } from "./plugin-validation.js"

const root = path.resolve(import.meta.dirname, "..", "..")
const templatesDir = path.join(import.meta.dirname, "templates")
const configs = [
  path.join(root, "quartz.config.default.yaml"),
  ...fs
    .readdirSync(templatesDir)
    .filter((f) => f.endsWith(".yaml"))
    .map((f) => path.join(templatesDir, f)),
]
const require = createRequire(path.join(root, "package.json"))

function manifestOf(source) {
  try {
    return JSON.parse(fs.readFileSync(require.resolve(`${source}/package.json`), "utf8")).quartz
  } catch {
    return undefined
  }
}

for (const file of configs) {
  const name = path.relative(root, file)
  const plugins = YAML.parse(fs.readFileSync(file, "utf8")).plugins ?? []
  const bySource = new Map(plugins.map((entry) => [entry.source, entry]))

  describe(name, () => {
    test("runs GitHubFlavoredMarkdown before ObsidianFlavoredMarkdown", () => {
      const gfm = bySource.get("@quartz-community/github-flavored-markdown")
      const ofm = bySource.get("@quartz-community/obsidian-flavored-markdown")
      if (!gfm || !ofm) return
      assert.ok(gfm.order < ofm.order, `GFM order ${gfm.order} must be below OFM ${ofm.order}`)
    })

    test("sets only options the plugins have", () => {
      const problems = []
      for (const entry of plugins) {
        if (typeof entry.source !== "string" || !entry.options) continue
        const manifest = manifestOf(entry.source)
        if (!manifest) continue
        for (const issue of validatePluginOptions(entry.options, manifest)) {
          problems.push(`${entry.source}: ${issue.message}`)
        }
      }
      assert.deepStrictEqual(problems, [])
    })
  })
}

describe("Quartz Themes 3 integration", () => {
  test("resolves every enabled template theme", async () => {
    const { resolveTheme } = await import("@quartz-themes/core")
    assert.strictEqual(typeof resolveTheme, "function", "Quartz 5.2 requires Themes Core 3")

    const registry = [
      { name: "Tokyo Night", repo: "themes/tokyo-night", modes: ["dark", "light"] },
      { name: "ITS Theme", repo: "themes/its", modes: ["dark", "light"] },
    ]
    const fetch = async (url) => {
      const value = String(url)
      const body = value.endsWith("community-css-themes.json")
        ? JSON.stringify(registry)
        : value.endsWith("/theme.css")
          ? ":root { --background-primary: white; }"
          : undefined
      return { ok: body !== undefined, text: async () => body ?? "" }
    }
    const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-template-themes-"))
    try {
      for (const file of configs) {
        const plugins = YAML.parse(fs.readFileSync(file, "utf8")).plugins ?? []
        const themes = plugins.find((entry) => entry.source === "@quartz-themes/core")
        if (!themes?.enabled) continue
        const theme = themes.options?.theme
        const spec = themes.options?.variation ? `${theme}.${themes.options.variation}` : theme
        await assert.doesNotReject(
          resolveTheme(spec, { cacheDir, cacheTtl: 0, fetch }),
          `${path.relative(root, file)} must select a theme that Themes Core can resolve`,
        )
      }
    } finally {
      fs.rmSync(cacheDir, { recursive: true, force: true })
    }
  })
})
