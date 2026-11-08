import test, { describe, afterEach } from "node:test"
import assert from "node:assert"
import { buildLayoutForEntries, buildQuartzLayout } from "./config-loader"
import { LayoutDiagnostics, formatLayoutReport, suggest } from "./layoutReport"
import { componentRegistry, ComponentManifest } from "../../components/registry"
import { resolveLayout } from "../pageTypes/dispatcher"
import type { QuartzComponent } from "../../components/types"
import type { QuartzPageTypePluginInstance } from "../types"
import { PluginJsonEntry, QuartzPluginsJson } from "./types"

const makeComponent = (name: string): QuartzComponent => {
  const c = (() => null) as unknown as QuartzComponent
  c.displayName = name
  return c
}

const manifest = (name: string, extra: Partial<ComponentManifest> = {}): ComponentManifest => ({
  name,
  displayName: name,
  description: "",
  version: "1",
  ...extra,
})

function register(name: string, extra: Partial<ComponentManifest> = {}): QuartzComponent {
  const c = makeComponent(name)
  componentRegistry.register(name, c, "test-source", manifest(name, extra))
  return c
}

const entry = (source: string, layout?: Record<string, unknown>): PluginJsonEntry =>
  ({
    source,
    enabled: true,
    options: {},
    ...(layout ? { layout } : {}),
  }) as PluginJsonEntry

const head = makeComponent("Head")

const pageType = (layout: string): QuartzPageTypePluginInstance =>
  ({
    name: layout,
    layout,
    match: () => true,
    body: () => makeComponent("Body"),
  }) as unknown as QuartzPageTypePluginInstance

afterEach(() => {
  componentRegistry.clear()
})

describe("buildLayoutForEntries: partial layout blocks", () => {
  test("layout block without position falls back to manifest defaultPosition/Priority", () => {
    const c = register("tags", { defaultPosition: "beforeBody", defaultPriority: 30 })
    const diag = new LayoutDiagnostics()
    const result = buildLayoutForEntries([entry("tags", { condition: "has-tags" })], {}, diag)
    assert.strictEqual(result.beforeBody?.length, 1)
    assert.notStrictEqual(result.beforeBody?.[0], c, "wrapped in ConditionalRender")
    assert.deepStrictEqual(diag.warnings, [])
    assert.strictEqual(diag.placements[0].priority, 30)
    assert.strictEqual(diag.placements[0].condition, "has-tags")
  })

  test("layout block without position and no defaultPosition warns", () => {
    register("nopos")
    const diag = new LayoutDiagnostics()
    const result = buildLayoutForEntries([entry("nopos", { priority: 1 })], {}, diag)
    assert.strictEqual(Object.values(result).flat().length, 0)
    assert.match(diag.warnings[0], /no position/)
  })

  test("missing priority uses manifest defaultPriority (no NaN sorting)", () => {
    const a = register("a", { defaultPriority: 5 })
    const b = register("b")
    const result = buildLayoutForEntries(
      [entry("b", { position: "left", priority: 10 }), entry("a", { position: "left" })],
      {},
    )
    assert.deepStrictEqual(result.left, [a, b])
  })
})

describe("buildLayoutForEntries: warnings instead of silent drops", () => {
  test("unknown position warns with a suggestion and is not placed", () => {
    register("explorer")
    const diag = new LayoutDiagnostics()
    const result = buildLayoutForEntries(
      [entry("explorer", { position: "sidebar-left", priority: 1 })],
      {},
      diag,
    )
    assert.strictEqual(Object.values(result).flat().length, 0)
    assert.strictEqual(diag.warnings.length, 1)
    assert.match(diag.warnings[0], /unknown layout position "sidebar-left"/)

    const diag2 = new LayoutDiagnostics()
    buildLayoutForEntries([entry("explorer", { position: "Left", priority: 1 })], {}, diag2)
    assert.match(diag2.warnings[0], /did you mean "left"/)
  })

  test("unknown display is ignored (previously became desktop-only)", () => {
    const c = register("search")
    const diag = new LayoutDiagnostics()
    const result = buildLayoutForEntries(
      [entry("search", { position: "left", priority: 1, display: "mobile" })],
      {},
      diag,
    )
    assert.deepStrictEqual(result.left, [c], "not wrapped")
    assert.match(diag.warnings[0], /unknown display "mobile"/)
  })

  test("desktop-only / mobile-only are recorded in placements", () => {
    register("search")
    const diag = new LayoutDiagnostics()
    buildLayoutForEntries(
      [entry("search", { position: "left", priority: 1, display: "desktop-only" })],
      {},
      diag,
    )
    assert.strictEqual(diag.placements[0].display, "desktop-only")
  })

  test("unknown condition warns once with suggestion; component renders unwrapped", () => {
    const c = register("backlinks")
    const diag = new LayoutDiagnostics()
    const result = buildLayoutForEntries(
      [entry("backlinks", { position: "right", priority: 1, condition: "has-backlink" })],
      {},
      diag,
    )
    assert.deepStrictEqual(result.right, [c])
    assert.strictEqual(diag.warnings.length, 1)
    assert.match(
      diag.warnings[0],
      /unknown condition "has-backlink" \(did you mean "has-backlinks"\?\)/,
    )
    assert.strictEqual(diag.placements[0].conditionUnknown, true)
  })

  test("layout block for a plugin with no registered component warns", () => {
    const diag = new LayoutDiagnostics()
    buildLayoutForEntries([entry("not-a-component", { position: "left", priority: 1 })], {}, diag)
    assert.match(diag.warnings[0], /no component is registered/)
  })

  test("plugins without a layout block and no component stay silent", () => {
    const diag = new LayoutDiagnostics()
    buildLayoutForEntries([entry("some-transformer")], {}, diag)
    assert.deepStrictEqual(diag.warnings, [])
  })

  test("duplicate entries warn", () => {
    register("graph")
    const diag = new LayoutDiagnostics()
    const result = buildLayoutForEntries(
      [
        entry("graph", { position: "right", priority: 1 }),
        entry("graph", { position: "left", priority: 1 }),
      ],
      {},
      diag,
    )
    assert.strictEqual(result.right?.length, 1)
    assert.strictEqual(result.left?.length, 1)
    assert.match(diag.warnings[0], /listed more than once/)
  })

  test("disabled entries are never placed", () => {
    register("graph")
    const result = buildLayoutForEntries(
      [{ ...entry("graph", { position: "right", priority: 1 }), enabled: false }],
      {},
    )
    assert.deepStrictEqual(result.right, [])
  })
})

describe("buildLayoutForEntries: ordering", () => {
  test("priority ties keep config order", () => {
    const a = register("a")
    const b = register("b")
    const result = buildLayoutForEntries(
      [
        entry("b", { position: "left", priority: 10 }),
        entry("a", { position: "left", priority: 10 }),
      ],
      {},
    )
    assert.deepStrictEqual(result.left, [b, a])
  })

  test("explicit layout entries sort before manifest defaults at equal priority", () => {
    const d = register("d", { defaultPosition: "left", defaultPriority: 10 })
    const e = register("e")
    const result = buildLayoutForEntries(
      [entry("d"), entry("e", { position: "left", priority: 10 })],
      {},
    )
    assert.deepStrictEqual(result.left, [e, d])
  })

  test("groups work in header and footer", () => {
    register("a")
    register("b")
    const result = buildLayoutForEntries(
      [
        entry("a", { position: "header", priority: 1, group: "bar" }),
        entry("b", { position: "header", priority: 2, group: "bar" }),
      ],
      { groups: { bar: { direction: "row" } } },
    )
    assert.strictEqual(result.header?.length, 1, "one Flex wrapper")
  })
})

function config(
  plugins: PluginJsonEntry[],
  layout: QuartzPluginsJson["layout"],
): QuartzPluginsJson {
  return { configuration: {}, plugins, layout }
}

describe("buildQuartzLayout: byPageType", () => {
  test("only customized slots are stored per page type", () => {
    register("explorer")
    register("graph")
    register("reader-mode")
    const { layout, report } = buildQuartzLayout(
      config(
        [
          entry("explorer", { position: "left", priority: 1 }),
          entry("graph", { position: "right", priority: 1 }),
          entry("reader-mode", { position: "beforeBody", priority: 1 }),
        ],
        {
          byPageType: {
            content: {},
            folder: { exclude: ["reader-mode"], positions: { right: [] } },
          },
        },
      ),
      head,
    )
    assert.deepStrictEqual(Object.keys(layout.byPageType.content), [])
    assert.deepStrictEqual(Object.keys(layout.byPageType.folder).sort(), ["beforeBody", "right"])
    assert.deepStrictEqual(layout.byPageType.folder.right, [])
    assert.deepStrictEqual(layout.byPageType.folder.beforeBody, [])
    assert.deepStrictEqual(report.byPageType.folder.customizedSlots, ["beforeBody", "right"])
    assert.deepStrictEqual(report.warnings, [])

    const folder = resolveLayout(pageType("folder"), layout.defaults, layout.byPageType)
    assert.strictEqual(folder.left.length, 1, "left inherited from defaults")
    assert.strictEqual(folder.head, head)
  })

  test("typos in byPageType are reported", () => {
    register("reader-mode")
    const { report } = buildQuartzLayout(
      config([entry("reader-mode", { position: "beforeBody", priority: 1 })], {
        byPageType: {
          folder: {
            exclude: ["readermode"],
            positions: { rigth: [], left: [{ position: "left", priority: 1 }] },
            template: "fullwidth",
            excludes: [],
          } as never,
        },
      }),
      head,
    )
    const all = report.warnings.join("\n")
    assert.match(all, /exclude: no plugin named "readermode" \(did you mean "reader-mode"\?\)/)
    assert.match(all, /unknown position "rigth" \(did you mean "right"\?\)/)
    assert.match(all, /positions.left: only an empty list/)
    assert.match(all, /unknown frame "fullwidth"/)
    assert.match(all, /unknown key "excludes" \(did you mean "exclude"\?\)/)
  })

  test("warnings are deduplicated across page types", () => {
    register("x")
    const { report } = buildQuartzLayout(
      config([entry("x", { position: "nowhere", priority: 1 })], {
        byPageType: { content: {}, folder: {}, tag: {} },
      }),
      head,
    )
    assert.strictEqual(report.warnings.length, 1)
  })
})

describe("buildQuartzLayout: quartz.ts overrides", () => {
  test("TS defaults reach page types listed in YAML byPageType", () => {
    register("explorer")
    const Custom = makeComponent("Custom")
    const { layout, report } = buildQuartzLayout(
      config([entry("explorer", { position: "left", priority: 1 })], {
        byPageType: { content: {}, "404": { positions: { left: [] } } },
      }),
      head,
      { defaults: { left: [Custom] } },
    )
    const content = resolveLayout(pageType("content"), layout.defaults, layout.byPageType)
    assert.deepStrictEqual(content.left, [Custom])
    // explicit YAML per-page-type change still wins over TS defaults
    const notFound = resolveLayout(pageType("404"), layout.defaults, layout.byPageType)
    assert.deepStrictEqual(notFound.left, [])
    assert.deepStrictEqual(report.tsOverrides.defaults, ["left"])
  })

  test("TS byPageType wins over everything", () => {
    register("explorer")
    const Custom = makeComponent("Custom")
    const { layout } = buildQuartzLayout(
      config([entry("explorer", { position: "left", priority: 1 })], {
        byPageType: { "404": { positions: { left: [] } } },
      }),
      head,
      { byPageType: { "404": { left: [Custom] } } },
    )
    const notFound = resolveLayout(pageType("404"), layout.defaults, layout.byPageType)
    assert.deepStrictEqual(notFound.left, [Custom])
  })
})

describe("formatLayoutReport", () => {
  test("lists slots, wrappers, frames and warnings", () => {
    register("search")
    register("backlinks")
    const { report } = buildQuartzLayout(
      config(
        [
          entry("search", { position: "left", priority: 20, display: "desktop-only" }),
          entry("backlinks", { position: "right", priority: 5, condition: "nope" }),
        ],
        { byPageType: { folder: { positions: { right: [] } }, canvs: {} } },
      ),
      head,
    )
    const text = formatLayoutReport(report, [
      { name: "ContentPage", layout: "content" },
      { name: "FolderPage", layout: "folder" },
      { name: "CanvasPage", layout: "canvas", frame: "canvas" },
    ])
    assert.match(text, /left:\n\s+20 search\s+\[config, desktop-only\]/)
    assert.match(text, /cleared: right\n\s+right: \(empty\)/)
    assert.match(text, /if nope \(UNKNOWN, always shown\)/)
    assert.match(text, /canvas \(CanvasPage\): frame "canvas" \(page type\)/)
    assert.match(text, /folder \(FolderPage\): frame "default" \(fallback\)/)
    assert.match(text, /cleared: right/)
    assert.match(text, /no enabled page type uses layout key "canvs"/)
    assert.match(text, /warnings:/)
  })
})

describe("suggest", () => {
  test("finds close matches only", () => {
    assert.strictEqual(suggest("befoerBody", ["beforeBody", "afterBody"]), "beforeBody")
    assert.strictEqual(suggest("zzzzzz", ["left", "right"]), undefined)
  })
})

describe("buildQuartzLayout: exclude matches npm specifiers", () => {
  test('exclude: [reader-mode] matches source "@quartz-community/reader-mode"', () => {
    register("@quartz-community/reader-mode")
    register("@quartz-community/explorer")
    const { layout, report } = buildQuartzLayout(
      config(
        [
          entry("@quartz-community/reader-mode", { position: "beforeBody", priority: 1 }),
          entry("@quartz-community/explorer", { position: "beforeBody", priority: 2 }),
        ],
        { byPageType: { tag: { exclude: ["reader-mode"] } } },
      ),
      head,
    )
    assert.strictEqual(layout.byPageType.tag.beforeBody?.length, 1)
    assert.strictEqual(layout.defaults.beforeBody?.length, 2)
    assert.deepStrictEqual(report.warnings, [])
  })
})
