import test, { describe } from "node:test"
import assert from "node:assert"
import {
  checkCapabilities,
  coreCapabilities,
  parseCapabilities,
  validatePluginCapabilities,
  type CapabilityPlugin,
} from "./capabilities"

const crawlLinks: CapabilityPlugin = {
  name: "crawl-links",
  capabilities: { provides: { data: ["links"] }, requires: { data: ["slug"] } },
}
const backlinks: CapabilityPlugin = {
  name: "backlinks",
  capabilities: {
    requires: {
      data: [{ name: "links", from: "crawl-links", reason: "backlinks list is always empty" }],
    },
  },
}

describe("checkCapabilities", () => {
  test("satisfied requirement produces no messages", () => {
    const r = checkCapabilities([crawlLinks, backlinks], { core: coreCapabilities() })
    assert.deepStrictEqual(r.warnings, [])
    assert.deepStrictEqual(r.missing, [])
  })

  test("missing provider warns with the expected provider and reason", () => {
    const r = checkCapabilities([backlinks], { core: coreCapabilities() })
    assert.strictEqual(r.warnings.length, 1)
    assert.match(r.warnings[0], /backlinks/)
    assert.match(r.warnings[0], /data "links"/)
    assert.match(r.warnings[0], /enable "crawl-links"/)
    assert.match(r.warnings[0], /always empty/)
    assert.deepStrictEqual(r.missing[0].candidates, ["crawl-links"])
  })

  test("suggests disabled plugins that declare the capability", () => {
    const consumer: CapabilityPlugin = {
      name: "graph",
      capabilities: { requires: { files: ["/static/contentIndex.json"] } },
    }
    const contentIndex: CapabilityPlugin = {
      name: "content-index",
      capabilities: { provides: { files: ["static/contentIndex.json"] } },
    }
    const r = checkCapabilities([consumer], { available: [contentIndex] })
    assert.strictEqual(r.warnings.length, 1)
    assert.match(r.warnings[0], /file "\/static\/contentIndex.json"/)
    assert.match(r.warnings[0], /enable "content-index"/)
  })

  test("a named provider that predates declarations satisfies the requirement", () => {
    const legacyCrawlLinks: CapabilityPlugin = { name: "crawl-links" }
    const r = checkCapabilities([legacyCrawlLinks, backlinks])
    assert.deepStrictEqual(r.warnings, [])
  })

  test("`from` also matches aliases such as the npm package name", () => {
    const legacy: CapabilityPlugin = {
      name: "LinkProcessing",
      aliases: ["@quartz-community/crawl-links", "crawl-links"],
    }
    assert.deepStrictEqual(checkCapabilities([legacy, backlinks]).warnings, [])
  })

  test("plugins without capabilities are never checked (backwards compatible)", () => {
    const r = checkCapabilities([{ name: "third-party" }, { name: "other", capabilities: {} }])
    assert.deepStrictEqual(r, { warnings: [], infos: [], missing: [] })
  })

  test("optional requirements are infos, not warnings", () => {
    const ofm: CapabilityPlugin = {
      name: "obsidian-flavored-markdown",
      capabilities: {
        optional: { dom: [{ name: ".clipboard-button", from: "syntax-highlighting" }] },
      },
    }
    const r = checkCapabilities([ofm])
    assert.deepStrictEqual(r.warnings, [])
    assert.strictEqual(r.infos.length, 1)
    assert.match(r.infos[0], /can use DOM element ".clipboard-button"/)
    assert.strictEqual(r.missing[0].required, false)
  })

  test("core capabilities satisfy requirements", () => {
    const p: CapabilityPlugin = {
      name: "p",
      capabilities: {
        requires: { data: ["slug"], globals: ["addCleanup"], events: ["nav", "prenav"] },
      },
    }
    assert.deepStrictEqual(checkCapabilities([p], { core: coreCapabilities() }).warnings, [])
    const noSpa = checkCapabilities([p], { core: coreCapabilities({ enableSPA: false }) })
    assert.strictEqual(noSpa.warnings.length, 1)
    assert.match(noSpa.warnings[0], /event "prenav"/)
  })

  test("a plugin can satisfy its own requirement", () => {
    const p: CapabilityPlugin = {
      name: "p",
      capabilities: { provides: { data: ["x"] }, requires: { data: ["x"] } },
    }
    assert.deepStrictEqual(checkCapabilities([p]).warnings, [])
  })
})

describe("parseCapabilities", () => {
  test("reports schema problems instead of throwing", () => {
    const { capabilities, problems } = parseCapabilities(
      { provides: { data: "links", bogus: [] }, requires: [], optional: { dom: [42, ".ok"] } },
      "p",
    )
    assert.strictEqual(problems.length, 4)
    assert.deepStrictEqual(capabilities?.optional?.dom, [".ok"])
    assert.strictEqual(capabilities?.requires, undefined)
  })

  test("non-object capabilities are ignored", () => {
    const { capabilities, problems } = parseCapabilities("nope", "p")
    assert.strictEqual(capabilities, undefined)
    assert.strictEqual(problems.length, 1)
  })

  test("schema problems surface as infos from checkCapabilities", () => {
    const r = checkCapabilities([{ name: "p", capabilities: { requires: { nope: [] } } }])
    assert.strictEqual(r.warnings.length, 0)
    assert.match(r.infos[0], /unknown capability kind "requires.nope"/)
  })
})

describe("validatePluginCapabilities", () => {
  type Entry = { source: string; enabled: boolean }
  const manifests: Record<string, { name: string; capabilities?: unknown }> = {
    "@quartz-community/backlinks": {
      name: "backlinks",
      capabilities: { requires: { data: ["links"] } },
    },
    "@quartz-community/crawl-links": {
      name: "crawl-links",
      capabilities: { provides: { data: ["links"] } },
    },
  }

  test("suggests the disabled provider from the config and only loads disabled manifests on demand", async () => {
    const loaded: string[] = []
    const entries: Entry[] = [
      { source: "@quartz-community/backlinks", enabled: true },
      { source: "@quartz-community/crawl-links", enabled: false },
    ]
    const report = await validatePluginCapabilities({
      entries,
      nameOf: (e) => e.source,
      manifestFor: (e) => {
        loaded.push(e.source)
        return manifests[e.source]
      },
    })
    assert.strictEqual(report.warnings.length, 1)
    assert.match(report.warnings[0], /enable "crawl-links"/)
    assert.deepStrictEqual(
      loaded,
      entries.map((e) => e.source),
    )
  })

  test("does not load disabled manifests when everything is satisfied", async () => {
    const loaded: string[] = []
    const report = await validatePluginCapabilities({
      entries: [
        { source: "@quartz-community/backlinks", enabled: true },
        { source: "@quartz-community/crawl-links", enabled: true },
        { source: "@quartz-community/unused", enabled: false },
      ],
      nameOf: (e) => e.source,
      manifestFor: (e) => {
        loaded.push(e.source)
        if (e.source.endsWith("unused")) throw new Error("should not be loaded")
        return manifests[e.source]
      },
    })
    assert.deepStrictEqual(report.warnings, [])
    assert.ok(!loaded.includes("@quartz-community/unused"))
  })

  test("manifest loading errors are tolerated", async () => {
    const report = await validatePluginCapabilities({
      entries: [{ source: "github:someone/broken", enabled: true }],
      nameOf: (e) => e.source,
      manifestFor: () => {
        throw new Error("boom")
      },
    })
    assert.deepStrictEqual(report.warnings, [])
  })
})
