import test, { describe } from "node:test"
import assert from "node:assert"
import YAML from "yaml"
import {
  builtinKeyFor,
  builtinMessage,
  describeBuiltins,
  findBuiltinMigrations,
  migrateBuiltinEntries,
} from "./builtin-migration.js"
import { stringifyConfigYaml } from "./plugin-data.js"

const legacyConfig = () => ({
  configuration: { pageTitle: "Site" },
  plugins: [
    {
      source: "@quartz-community/note-properties",
      enabled: true,
      options: { includeAll: true, delimiters: "---", language: "toml" },
      order: 5,
    },
    {
      source: "@quartz-community/crawl-links",
      enabled: true,
      options: { lazyLoad: true },
      order: 60,
    },
    { source: "@quartz-community/remove-draft", enabled: true },
    { source: "@quartz-community/content-index", enabled: false },
    { source: "@quartz-community/graph", enabled: true },
  ],
})

describe("migrateBuiltinEntries", () => {
  test("moves absorbed plugins into configuration and removes their entries", () => {
    const { data, changes } = migrateBuiltinEntries(legacyConfig())
    assert.deepStrictEqual(
      data.plugins.map((p) => p.source),
      ["@quartz-community/note-properties", "@quartz-community/graph"],
    )
    // crawl-links' old default (absolute) is made explicit so behaviour does not change
    assert.deepStrictEqual(data.configuration.links, {
      markdownLinkResolution: "absolute",
      lazyLoad: true,
    })
    assert.strictEqual(data.configuration.drafts, undefined) // enabled remove-draft = default
    assert.deepStrictEqual(data.configuration.contentIndex, { enabled: false })
    // note-properties keeps its view options; frontmatter options move, defaults are dropped
    assert.deepStrictEqual(data.plugins[0].options, { includeAll: true })
    assert.deepStrictEqual(data.configuration.frontmatter, { language: "toml" })
    assert.strictEqual(changes.length, 4)
  })

  test("disabled remove-draft becomes drafts.publish: true; custom order is kept", () => {
    const { data } = migrateBuiltinEntries({
      plugins: [
        { source: "@quartz-community/remove-draft", enabled: false },
        { source: "github:quartz-community/crawl-links", enabled: true, order: 75 },
      ],
    })
    assert.deepStrictEqual(data.configuration.drafts, { publish: true })
    assert.deepStrictEqual(data.configuration.links, {
      markdownLinkResolution: "absolute",
      order: 75,
    })
  })

  test("existing configuration values win", () => {
    const { data } = migrateBuiltinEntries({
      configuration: { links: { markdownLinkResolution: "shortest" } },
      plugins: [
        {
          source: "@quartz-community/crawl-links",
          enabled: true,
          options: { markdownLinkResolution: "relative" },
        },
      ],
    })
    assert.strictEqual(data.configuration.links.markdownLinkResolution, "shortest")
  })

  test("leaves forks alone and does not mutate its input", () => {
    const input = { plugins: [{ source: "github:someone/crawl-links", enabled: true }] }
    const { data, changes } = migrateBuiltinEntries(input)
    assert.deepStrictEqual(data.plugins, input.plugins)
    assert.deepStrictEqual(changes, [])
    const legacy = legacyConfig()
    migrateBuiltinEntries(legacy)
    assert.strictEqual(legacy.plugins.length, 5)
  })

  test("keeps comments when written back in place", () => {
    const raw = [
      "configuration:",
      "  pageTitle: Site # my title",
      "plugins:",
      "  # links",
      '  - source: "@quartz-community/crawl-links"',
      "    enabled: true",
      "  # graph view",
      '  - source: "@quartz-community/graph"',
      "    enabled: true",
      "",
    ].join("\n")
    const { data } = migrateBuiltinEntries(YAML.parse(raw))
    const out = stringifyConfigYaml(data, raw)
    assert.match(out, /pageTitle: Site # my title/)
    assert.match(out, /# graph view/)
    assert.doesNotMatch(out, /crawl-links/)
    assert.match(out, /links:\n\s+markdownLinkResolution: absolute/)
  })
})

describe("built-in helpers", () => {
  test("findBuiltinMigrations lists absorbed entries and note-properties frontmatter options", () => {
    assert.deepStrictEqual(
      findBuiltinMigrations(legacyConfig()).map((m) => [m.name, m.key]),
      [
        ["note-properties", "frontmatter"],
        ["crawl-links", "links"],
        ["remove-draft", "drafts"],
        ["content-index", "contentIndex"],
      ],
    )
  })

  test("builtinKeyFor / builtinMessage recognise names and official sources", () => {
    assert.strictEqual(builtinKeyFor("crawl-links"), "links")
    assert.strictEqual(builtinKeyFor("@quartz-community/content-index"), "contentIndex")
    assert.strictEqual(builtinKeyFor("graph"), undefined)
    assert.match(builtinMessage("remove-draft"), /configuration\.drafts.*publish: true/)
    assert.strictEqual(builtinKeyFor({ repo: "github:quartz-community/crawl-links" }), "links")
    assert.match(
      builtinMessage({ repo: "github:quartz-community/crawl-links" }),
      /^crawl-links is built into Quartz/,
    )
    assert.strictEqual(builtinKeyFor({ repo: "github:me/crawl-links-fork" }), undefined)
  })

  test("describeBuiltins reflects configuration", () => {
    const rows = describeBuiltins({ links: false, drafts: { publish: true } })
    assert.deepStrictEqual(
      rows.map((r) => [r.key, r.enabled]),
      [
        ["frontmatter", true],
        ["links", false],
        ["drafts", false],
        ["contentIndex", true],
      ],
    )
  })
})
