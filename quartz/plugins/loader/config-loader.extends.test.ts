import test, { after, afterEach, before, describe } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { registerHooks } from "node:module"
import { getSlugOptions, setSlugOptions } from "../../util/path"
import type { QuartzComponent } from "../../components/types"

// loadQuartzConfig imports the built-in emitters, whose SCSS and inline browser scripts esbuild
// bundles in a real build; under tsx they are stubbed out.
registerHooks({
  load(url, context, next) {
    if (url.endsWith(".scss") || /\.inline\.ts$/.test(url)) {
      return { format: "module", source: "export default ''", shortCircuit: true }
    }
    return next(url, context)
  },
})
const { loadQuartzConfig, loadQuartzLayout } = await import("./config-loader")

const names = (list: { name: string }[]) => list.map((p) => p.name)
const componentNames = (list: QuartzComponent[] | undefined) =>
  (list ?? []).map((c) => c.displayName ?? c.name)

describe("loadQuartzConfig with extends: default", () => {
  let dir: string
  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-extends-"))
    process.env.QUARTZ_CONFIG_QUIET = "1"
  })
  afterEach(() => {
    delete process.env.QUARTZ_CONFIG_PATH
    setSlugOptions(undefined)
  })
  after(() => {
    delete process.env.QUARTZ_CONFIG_QUIET
    fs.rmSync(dir, { recursive: true })
  })
  const useConfig = (name: string, content: string) => {
    const file = path.join(dir, name)
    fs.writeFileSync(file, content)
    process.env.QUARTZ_CONFIG_PATH = file
  }

  test("merges configuration, plugins, layout and applies before/after", async () => {
    useConfig(
      "quartz.config.yaml",
      `extends: default
configuration:
  pageTitle: Extended garden
  slugs:
    stripDiacritics: true
plugins:
  - source: "@quartz-community/description"
    order: 60
    before: Links
  - source: "@quartz-community/favicon"
    after: [CustomOgImages, Links]
  # names that don't run among the transformers: a disabled plugin, an absorbed one, a built-in
  # emitter. They are accepted and change nothing
  - source: "@quartz-community/latex"
    after: [citations, remove-draft, Fonts]
  - source: "@quartz-community/explorer"
    layout:
      position: right
      priority: 5
layout:
  byPageType:
    folder:
      positions:
        right: null
`,
    )
    const cfg = await loadQuartzConfig()
    // the extending file's value, and the base's for what it leaves out
    assert.equal(cfg.configuration.pageTitle, "Extended garden")
    assert.equal(cfg.configuration.baseUrl, "quartz.jzhao.xyz")
    assert.equal(getSlugOptions().stripDiacritics, true)
    // plugins enabled only in the base are loaded; Description (order 60 here, 70 in the base)
    // runs before the built-in Links at the same order
    assert.deepEqual(names(cfg.plugins.transformers), [
      "Frontmatter",
      "NoteProperties",
      "CreatedModifiedDate",
      "SyntaxHighlighting",
      "GitHubFlavoredMarkdown",
      "ObsidianFlavoredMarkdown",
      "UnlistedPages",
      "TableOfContents",
      "BasesTransformer",
      "Description",
      "Links",
      "Latex",
      "EncryptedPages",
    ])
    // `after:` names og-image by its instance name; favicon comes first in the base list
    assert.deepEqual(names(cfg.plugins.emitters), [
      "ComponentResources",
      "Assets",
      "Static",
      "SlugRedirects",
      "ContentIndex",
      "AliasRedirects",
      "CustomOgImages",
      "Favicon",
      "CNAME",
      "Fonts",
      "EncryptedContentIndex",
      "PageTypeDispatcher",
    ])

    const layout = await loadQuartzLayout()
    assert.deepEqual(componentNames(layout.defaults.right), [
      "ExplorerComponent",
      "Graph",
      "TableOfContents",
      "Backlinks",
    ])
    assert.ok(!componentNames(layout.defaults.left).includes("ExplorerComponent"))
    // `right: null` removed the base's `right: []` for folder pages
    assert.deepEqual(Object.keys(layout.byPageType?.folder ?? {}), ["left"])
    assert.deepEqual(Object.keys(layout.byPageType?.tag ?? {}).sort(), ["left", "right"])
  })

  test("after: on a built-in is checked against the order kept from the base", async () => {
    useConfig(
      "after-links.yaml",
      `extends: default
plugins:
  - source: "@quartz-community/table-of-contents"
    after: Links
`,
    )
    await assert.rejects(loadQuartzConfig(), {
      name: "PluginOrderError",
      message:
        'plugin "@quartz-community/table-of-contents" (order 50) must run after "Links", but "Links" has order 60, so it runs later. ' +
        'Give "@quartz-community/table-of-contents" an order above 60, or "Links" one below 50.',
    })
  })

  test("a JSON config extends too", async () => {
    useConfig(
      "quartz.plugins.json",
      JSON.stringify({
        extends: "default",
        configuration: { pageTitle: "From JSON" },
        plugins: [{ source: "@quartz-community/latex", enabled: false }],
      }),
    )
    const cfg = await loadQuartzConfig()
    assert.equal(cfg.configuration.pageTitle, "From JSON")
    assert.equal(cfg.configuration.locale, "en-US")
    const transformers = names(cfg.plugins.transformers)
    assert.ok(!transformers.includes("Latex"))
    assert.ok(transformers.includes("Description"))
  })
})
