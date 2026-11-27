import test, { after, afterEach, before, describe } from "node:test"
import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { registerHooks } from "node:module"
import { getSlugOptions, setSlugOptions } from "../../util/path"
import { getDiagnostics, resetDiagnostics } from "../../util/diagnostics"
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

describe("loadQuartzConfig: configuration, options and loading", () => {
  let dir: string
  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-config-"))
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
  const useConfig = (content: string) => {
    const file = path.join(dir, "quartz.config.yaml")
    fs.writeFileSync(file, content)
    process.env.QUARTZ_CONFIG_PATH = file
  }
  const instance = (cfg: Awaited<ReturnType<typeof loadQuartzConfig>>, name: string) =>
    cfg.plugins.transformers.find((p) => p.name === name)

  test("CLI overrides win over the YAML configuration; built-ins are exposed with their settings", async () => {
    useConfig(`configuration:
  pageTitle: From YAML
  baseUrl: yaml.example.com
  links:
    prettyLinks: false
plugins: []
`)
    const cfg = await loadQuartzConfig({ baseUrl: "cli.example.com" })
    assert.equal(cfg.configuration.baseUrl, "cli.example.com")
    assert.equal(cfg.configuration.pageTitle, "From YAML")
    // configuration.links: the configured options over the built-in's defaults, enabled and order
    assert.deepEqual(cfg.configuration.links, {
      markdownLinkResolution: "shortest",
      prettyLinks: false,
      openLinksInNewTab: false,
      lazyLoad: false,
      externalLinkIcon: true,
      disableBrokenWikilinks: true,
      enabled: true,
      order: 60,
    })
    assert.deepEqual(names(cfg.plugins.transformers), ["Frontmatter", "Links"])
    // the built-in emitters, then the page renderer last; the 404 page type is always there
    assert.deepEqual(names(cfg.plugins.emitters), [
      "ComponentResources",
      "Assets",
      "Static",
      "SlugRedirects",
      "ContentIndex",
      "Fonts",
      "PageTypeDispatcher",
    ])
    assert.deepEqual(names(cfg.plugins.pageTypes ?? []), ["404"])
  })

  test("a former crawl-links entry configures the built-in with crawl-links' defaults and isn't loaded", async () => {
    useConfig(`plugins:
  - source: "@quartz-community/crawl-links"
    enabled: true
    options:
      openLinksInNewTab: true
`)
    resetDiagnostics()
    const cfg = await loadQuartzConfig()
    // not installed, and not tried: no load error
    assert.deepEqual(
      getDiagnostics().filter((d) => d.severity === "error"),
      [],
    )
    const links = cfg.configuration.links as unknown as Record<string, unknown>
    assert.equal(links.markdownLinkResolution, "absolute")
    assert.equal(links.openLinksInNewTab, true)
    assert.deepEqual(names(cfg.plugins.transformers), ["Frontmatter", "Links"])
  })

  test("an entry's options override the manifest's defaultOptions", async () => {
    // Latex' defaultOptions say renderEngine: katex, whose stylesheet it adds as a resource;
    // with mathjax it adds none
    useConfig(`plugins:
  - source: "@quartz-community/latex"
    enabled: true
`)
    const katex = instance(await loadQuartzConfig(), "Latex")
    assert.ok(katex?.externalResources?.({} as never), "katex resources")
    useConfig(`plugins:
  - source: "@quartz-community/latex"
    enabled: true
    options:
      renderEngine: mathjax
`)
    const mathjax = instance(await loadQuartzConfig(), "Latex")
    assert.ok(mathjax, "Latex is loaded")
    assert.equal(mathjax.externalResources?.({} as never), undefined)
  })

  test("plugins run by entry order, then defaultOrder; disabled entries aren't loaded", async () => {
    // defaultOrder: description 70, latex 80, table-of-contents 50
    useConfig(`plugins:
  - source: "@quartz-community/latex"
    enabled: true
    order: 5
  - source: "@quartz-community/description"
    enabled: true
  - source: "@quartz-community/table-of-contents"
    enabled: true
  - source: "@quartz-community/hard-line-breaks"
    enabled: false
`)
    const cfg = await loadQuartzConfig()
    assert.deepEqual(names(cfg.plugins.transformers), [
      "Frontmatter",
      "Latex",
      "TableOfContents",
      "Links",
      "Description",
    ])
  })

  test("a plugin that can't be loaded is skipped locally and fails the build in CI", async () => {
    useConfig(`plugins:
  - source: "@quartz-community/does-not-exist"
    enabled: true
  - source: "@quartz-community/description"
    enabled: true
`)
    const cfg = await loadQuartzConfig()
    assert.ok(names(cfg.plugins.transformers).includes("Description"))

    const saved = { ...process.env }
    try {
      delete process.env.QUARTZ_CONFIG_QUIET
      delete process.env.QUARTZ_ALLOW_BROKEN_PLUGINS
      process.env.CI = "true"
      await assert.rejects(loadQuartzConfig(), {
        message:
          /^1 enabled plugin could not be loaded: @quartz-community\/does-not-exist \(see above\)/,
      })
      process.env.QUARTZ_ALLOW_BROKEN_PLUGINS = "1"
      await loadQuartzConfig()
    } finally {
      for (const key of ["CI", "QUARTZ_ALLOW_BROKEN_PLUGINS", "QUARTZ_CONFIG_QUIET"]) {
        if (saved[key] === undefined) delete process.env[key]
        else process.env[key] = saved[key]
      }
    }
  })
})

describe("loadQuartzConfig: a local plugin's manifest (package.json → quartz)", () => {
  let dir: string
  const linked: string[] = []
  // .quartz/plugins and .quartz, where this test creates them
  const pluginsDir = path.join(process.cwd(), ".quartz", "plugins")
  const created = [pluginsDir, path.dirname(pluginsDir)].filter((d) => !fs.existsSync(d))
  before(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-local-plugin-"))
    process.env.QUARTZ_CONFIG_QUIET = "1"
  })
  afterEach(() => {
    delete process.env.QUARTZ_CONFIG_PATH
  })
  after(() => {
    delete process.env.QUARTZ_CONFIG_QUIET
    // the symlinks installPlugin made in .quartz/plugins
    for (const link of linked)
      if (fs.lstatSync(link, { throwIfNoEntry: false })) fs.unlinkSync(link)
    for (const d of created) if (fs.readdirSync(d).length === 0) fs.rmdirSync(d)
    fs.rmSync(dir, { recursive: true })
  })

  /** A transformer plugin in `dir/<name>` whose instance records the options it got. */
  function localPlugin(name: string, quartz: Record<string, unknown>) {
    const root = path.join(dir, name)
    fs.mkdirSync(root)
    fs.writeFileSync(
      path.join(root, "package.json"),
      JSON.stringify({ name, version: "2.3.4", type: "module", main: "index.js", quartz }),
    )
    fs.writeFileSync(
      path.join(root, "index.js"),
      `export default (opts) => ({ name: ${JSON.stringify(name)}, opts, textTransform: (_c, s) => s })\n`,
    )
    linked.push(path.join(process.cwd(), ".quartz", "plugins", name))
    return root
  }
  const useConfig = (plugins: { source: string; options?: object }[]) => {
    const file = path.join(dir, `config-${Math.random().toString(36).slice(2)}.yaml`)
    fs.writeFileSync(
      file,
      `plugins:\n${plugins.map((p) => `  - source: ${JSON.stringify(p.source)}\n    enabled: true\n    options: ${JSON.stringify(p.options ?? {})}\n`).join("")}`,
    )
    process.env.QUARTZ_CONFIG_PATH = file
  }
  const withEnv = async (env: Record<string, string | undefined>, fn: () => Promise<void>) => {
    const saved = Object.fromEntries(Object.keys(env).map((k) => [k, process.env[k]]))
    for (const [k, v] of Object.entries(env)) {
      if (v === undefined) delete process.env[k]
      else process.env[k] = v
    }
    try {
      await fn()
    } finally {
      for (const [k, v] of Object.entries(saved)) {
        if (v === undefined) delete process.env[k]
        else process.env[k] = v
      }
    }
  }

  test("its defaultOptions are the base of the entry's options", async () => {
    const root = localPlugin("audit-options", {
      name: "audit-options",
      category: "transformer",
      defaultOptions: { greeting: "hello", size: 1 },
    })
    useConfig([{ source: root, options: { size: 2 } }])
    const cfg = await loadQuartzConfig()
    const plugin = cfg.plugins.transformers.find((p) => p.name === "audit-options") as unknown as {
      opts: unknown
    }
    assert.deepEqual(plugin.opts, { greeting: "hello", size: 2 })
  })

  test("a plugin that needs a newer Quartz warns locally and fails the build in CI", async () => {
    const root = localPlugin("audit-future", {
      name: "audit-future",
      category: "transformer",
      quartzVersion: ">=99.0.0",
    })
    useConfig([{ source: root }])
    await withEnv({ CI: undefined, QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS: undefined }, async () => {
      const cfg = await loadQuartzConfig()
      assert.ok(names(cfg.plugins.transformers).includes("audit-future"))
    })
    await withEnv(
      { CI: "true", QUARTZ_CONFIG_QUIET: undefined, QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS: undefined },
      async () => {
        await assert.rejects(loadQuartzConfig(), {
          message: /^1 enabled plugin does not support Quartz [^:]+: audit-future \(see above\)/,
        })
      },
    )
    await withEnv(
      { CI: "true", QUARTZ_CONFIG_QUIET: undefined, QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS: "1" },
      async () => {
        await loadQuartzConfig()
      },
    )
  })

  test("a missing dependency fails the build", async () => {
    const root = localPlugin("audit-deps", {
      name: "audit-deps",
      category: "transformer",
      dependencies: ["github:someone/not-configured"],
    })
    useConfig([{ source: root }])
    await withEnv({ QUARTZ_CONFIG_QUIET: undefined }, async () => {
      await assert.rejects(loadQuartzConfig(), {
        message: "Plugin dependency validation failed with 1 error(s). See above for details.",
      })
    })
  })
})
