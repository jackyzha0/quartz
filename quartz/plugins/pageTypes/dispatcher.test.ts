import test, { describe, mock } from "node:test"
import assert from "node:assert"
import { FolderPage } from "@quartz-community/folder-page"
import { collectComponents, generateVirtualPages, resolveLayout } from "./dispatcher"
import { PageGenerator, QuartzPageTypePluginInstance } from "../types"
import { QuartzComponent } from "../../components/types"
import { ProcessedContent, defaultProcessedContent } from "../vfile"
import { BuildCtx } from "../../util/ctx"
import { FullSlug } from "../../util/path"

const StubA: QuartzComponent = (() => null) as unknown as QuartzComponent
const StubB: QuartzComponent = (() => null) as unknown as QuartzComponent
const StubHead: QuartzComponent = (() => null) as unknown as QuartzComponent

function makePageType(
  overrides: Partial<QuartzPageTypePluginInstance> = {},
): QuartzPageTypePluginInstance {
  return {
    name: "test-page-type",
    layout: "content",
    match: () => true,
    body: () => (() => null) as unknown as QuartzComponent,
    ...overrides,
  } as QuartzPageTypePluginInstance
}

describe("resolveLayout", () => {
  test("footer defaults to [] when sharedDefaults omits footer", () => {
    const result = resolveLayout(makePageType(), { head: StubHead }, {})
    assert.deepStrictEqual(result.footer, [])
  })

  test("header defaults to [] when sharedDefaults omits header", () => {
    const result = resolveLayout(makePageType(), { head: StubHead }, {})
    assert.deepStrictEqual(result.header, [])
  })

  test("footer from sharedDefaults is used when no override", () => {
    const result = resolveLayout(makePageType(), { head: StubHead, footer: [StubA] }, {})
    assert.deepStrictEqual(result.footer, [StubA])
  })

  test("byPageType override replaces footer", () => {
    const result = resolveLayout(
      makePageType(),
      { head: StubHead, footer: [StubA] },
      { content: { footer: [StubB] } },
    )
    assert.deepStrictEqual(result.footer, [StubB])
  })

  test("byPageType override clears footer with []", () => {
    const result = resolveLayout(
      makePageType(),
      { head: StubHead, footer: [StubA] },
      { content: { footer: [] } },
    )
    assert.deepStrictEqual(result.footer, [])
  })

  test("byPageType override clears header with []", () => {
    const result = resolveLayout(
      makePageType(),
      { head: StubHead, header: [StubA] },
      { content: { header: [] } },
    )
    assert.deepStrictEqual(result.header, [])
  })

  test("all array slots default to [] when sharedDefaults only has head", () => {
    const result = resolveLayout(makePageType(), { head: StubHead }, {})
    assert.deepStrictEqual(result.header, [])
    assert.deepStrictEqual(result.left, [])
    assert.deepStrictEqual(result.right, [])
    assert.deepStrictEqual(result.beforeBody, [])
    assert.deepStrictEqual(result.afterBody, [])
    assert.deepStrictEqual(result.footer, [])
  })

  test("preserves component references through override", () => {
    const result = resolveLayout(makePageType(), { head: StubHead, footer: [StubA, StubB] }, {})
    assert.strictEqual(result.footer[0], StubA)
    assert.strictEqual(result.footer[1], StubB)
  })
})

describe("resolveLayout frame resolution", () => {
  test("config override frame wins over page type frame", () => {
    const result = resolveLayout(
      makePageType({ frame: "minimal" }),
      { head: StubHead },
      { content: { frame: "full-width" } },
    )
    assert.strictEqual(result.frame, "full-width")
  })

  test("page type frame wins when no config override", () => {
    const result = resolveLayout(makePageType({ frame: "minimal" }), { head: StubHead }, {})
    assert.strictEqual(result.frame, "minimal")
  })

  test("defaults to 'default' when no frame specified", () => {
    const result = resolveLayout(makePageType(), { head: StubHead }, {})
    assert.strictEqual(result.frame, "default")
  })

  test("defaults to 'default' when byPageType entry exists but has no frame", () => {
    const result = resolveLayout(makePageType(), { head: StubHead }, { content: { left: [StubA] } })
    assert.strictEqual(result.frame, "default")
  })
})

describe("collectComponents", () => {
  test("collects all unique components across page types", () => {
    const pageTypes = [makePageType(), makePageType({ layout: "landing" })]
    const sharedDefaults = { head: StubHead }
    const byPageType = {
      content: { footer: [StubA] },
      landing: { footer: [StubB] },
    }

    const result = collectComponents(pageTypes, sharedDefaults, byPageType)
    assert.ok(result.includes(StubA))
    assert.ok(result.includes(StubB))
  })

  test("deduplicates shared components", () => {
    const pageTypes = [makePageType(), makePageType({ layout: "landing" })]
    const sharedDefaults = { head: StubHead }
    const byPageType = {
      content: { left: [StubA] },
      landing: { left: [StubA] },
    }

    const result = collectComponents(pageTypes, sharedDefaults, byPageType)
    const matches = result.filter((component) => component === StubA)
    assert.strictEqual(matches.length, 1)
  })

  test("handles empty footer and header arrays", () => {
    const pageTypes = [makePageType({ layout: "empty" })]
    const sharedDefaults = { head: StubHead }
    const byPageType = { empty: { footer: [], header: [] } }

    const result = collectComponents(pageTypes, sharedDefaults, byPageType)
    assert.ok(result.every((component) => component))
  })
})

describe("generateVirtualPages", () => {
  const ctx = () => ({ cfg: { configuration: {} }, virtualPages: [] }) as unknown as BuildCtx
  const note = (slug: string) => defaultProcessedContent({ slug: slug as FullSlug })
  const slugs = (content: ProcessedContent[]) => content.map(([, vfile]) => vfile.data.slug)

  test("a page type sees the virtual pages generated before it", () => {
    const first = makePageType({ generate: () => [{ slug: "trips/map", title: "Map", data: {} }] })
    const generate = mock.fn<PageGenerator>(() => [])
    generateVirtualPages(
      [first, makePageType({ generate })],
      [note("trips/plan")],
      ctx(),
      { head: StubHead },
      {},
    )
    assert.deepStrictEqual(slugs(generate.mock.calls[0].arguments[0].content), [
      "trips/plan",
      "trips/map",
    ])
  })

  test("a folder holding only virtual pages gets a folder page", () => {
    const base = makePageType({ generate: () => [{ slug: "trips/map", title: "Map", data: {} }] })
    const folderPage = FolderPage() as unknown as QuartzPageTypePluginInstance
    const entries = generateVirtualPages([base, folderPage], [], ctx(), { head: StubHead }, {})
    assert.ok(entries.some((entry) => entry.vpSlug === "trips/index"))
  })
})
