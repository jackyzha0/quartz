import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "fs"
import os from "os"
import path from "path"
import {
  collectComponents,
  pageOutputPath,
  removeStalePageOutput,
  resolveLayout,
} from "./dispatcher"
import { QuartzPageTypePluginInstance } from "../types"
import { QuartzComponent } from "../../components/types"
import { FilePath, FullSlug } from "../../util/path"

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

describe("incremental page deletion", () => {
  test("maps Markdown sources to their emitted HTML paths", () => {
    const cases: Array<[FilePath, string]> = [
      ["note.md" as FilePath, "public/note.html"],
      ["index.md" as FilePath, "public/index.html"],
      ["folder/index.md" as FilePath, "public/folder/index.html"],
      ["folder/folder.md" as FilePath, "public/folder/index.html"],
    ]

    for (const [sourcePath, expected] of cases) {
      assert.strictEqual(pageOutputPath("public", sourcePath), expected)
    }
  })

  test("removes stale output and tolerates an already-missing file", async (t) => {
    const outputDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-page-delete-"))
    t.after(() => fs.promises.rm(outputDir, { recursive: true, force: true }))

    const sourcePath = "folder/folder.md" as FilePath
    const outputPath = pageOutputPath(outputDir, sourcePath)
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.promises.writeFile(outputPath, "stale")

    const removed = await removeStalePageOutput(outputDir, sourcePath, new Set<FullSlug>())
    assert.strictEqual(removed, outputPath)
    await assert.rejects(fs.promises.access(outputPath), { code: "ENOENT" })

    await removeStalePageOutput(outputDir, sourcePath, new Set<FullSlug>())
  })

  test("preserves output when another source still owns the slug", async (t) => {
    const outputDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-page-delete-"))
    t.after(() => fs.promises.rm(outputDir, { recursive: true, force: true }))

    const sourcePath = "folder/folder.md" as FilePath
    const outputPath = pageOutputPath(outputDir, sourcePath)
    await fs.promises.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.promises.writeFile(outputPath, "current")

    const removed = await removeStalePageOutput(
      outputDir,
      sourcePath,
      new Set(["folder/index" as FullSlug]),
    )
    assert.strictEqual(removed, undefined)
    assert.strictEqual(await fs.promises.readFile(outputPath, "utf8"), "current")
  })
})
