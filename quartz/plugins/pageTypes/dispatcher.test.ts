import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "fs"
import os from "os"
import path from "path"
import {
  collectComponents,
  collectTreeTransforms,
  folderTrie,
  generateVirtualPages,
  markLinksToUnpublishedPages,
  pageOutputPath,
  processVirtualPageHtml,
  referencesByTarget,
  removeStalePageOutput,
  resolveLayout,
} from "./dispatcher"
import { QuartzPageTypePluginInstance } from "../types"
import { QuartzComponent } from "../../components/types"
import { FilePath, FullSlug, SimpleSlug, setSlugOptions } from "../../util/path"
import { Root as HtmlRoot } from "hast"
import { BuildCtx } from "../../util/ctx"
import { defaultProcessedContent, ProcessedContent } from "../vfile"
import { removedPages } from "../builtins/links"
import { Element, Root } from "hast"
import { VFile } from "vfile"

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
  test("sidebar modes: a page type's override is merged per side over the defaults", () => {
    const pt = makePageType()
    const result = resolveLayout(
      pt,
      { head: StubHead, sidebars: { left: "static", right: "scroll" } },
      { [pt.layout]: { sidebars: { right: "fit" } } },
    )
    assert.deepStrictEqual(result.sidebars, { left: "static", right: "fit" })
    assert.deepStrictEqual(resolveLayout(pt, { head: StubHead }, {}).sidebars, {})
  })

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

describe("collectTreeTransforms", () => {
  test("transformers' renderTransforms wrap the page types' treeTransforms, in plugin order", () => {
    const t = (name: string) => Object.assign(() => {}, { tname: name })
    const ctx = {
      cfg: {
        plugins: {
          transformers: [
            {
              name: "a",
              renderTransforms: () => ({ before: [t("a-before")], after: [t("a-after")] }),
            },
            { name: "b", htmlPlugins: () => [] },
            { name: "c", renderTransforms: () => ({ after: [t("c-after")] }) },
          ],
        },
      },
    } as unknown as BuildCtx
    const result = collectTreeTransforms(ctx, [
      makePageType({ treeTransforms: () => [t("page") as never] }),
    ])
    const names = (list: unknown[]) => list.map((f) => (f as { tname: string }).tname)
    assert.deepStrictEqual(names(result.before), ["a-before"])
    assert.deepStrictEqual(names(result.treeTransforms), ["page"])
    assert.deepStrictEqual(names(result.after), ["a-after", "c-after"])
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

describe("generateVirtualPages", () => {
  const makeCtx = () => ({ cfg: { configuration: {} }, virtualPages: [] }) as unknown as BuildCtx
  const page = (slug: string) => ({ slug: slug as FullSlug, title: slug, data: {} })

  test("accepts sync and async generate, in page type order (#2575)", async () => {
    const ctx = makeCtx()
    const entries = await generateVirtualPages(
      [
        makePageType({ name: "sync", generate: () => [page("tags/a")] }),
        makePageType({
          name: "async",
          generate: async () => {
            await new Promise((resolve) => setTimeout(resolve, 5))
            return [page("mdx/b")]
          },
        }),
        makePageType({ name: "none" }),
      ],
      [],
      ctx,
      { head: StubHead },
      {},
    )
    assert.deepStrictEqual(
      entries.map((e) => e.vpSlug),
      ["tags/a", "mdx/b"],
    )
    assert.strictEqual(entries[1].vfile.data.slug, "mdx/b")
    assert.strictEqual(ctx.virtualPages.length, 2)
  })

  test("slugs.stripDiacritics moves folder pages to the stripped folder slug (#2410)", async () => {
    setSlugOptions({ stripDiacritics: true })
    try {
      const entries = await generateVirtualPages(
        [makePageType({ generate: () => [page("české/index"), page("tags/čeština")] })],
        [],
        makeCtx(),
        { head: StubHead },
        {},
      )
      // tag pages keep their slugs: tag links are slugged by the plugins that render them
      assert.deepStrictEqual(
        entries.map((e) => e.vpSlug),
        ["ceske/index", "tags/čeština"],
      )
      assert.strictEqual(entries[0].vfile.data.slug, "ceske/index")
    } finally {
      setSlugOptions(undefined)
    }
  })

  test("keeps the 404 page out of ctx.virtualPages", async () => {
    const ctx = makeCtx()
    const entries = await generateVirtualPages(
      [makePageType({ generate: async () => [page("404")] })],
      [],
      ctx,
      { head: StubHead },
      {},
    )
    assert.strictEqual(entries.length, 1)
    assert.strictEqual(ctx.virtualPages.length, 0)
  })

  test("a failing async generate rejects instead of being skipped", async () => {
    await assert.rejects(
      generateVirtualPages(
        [
          makePageType({
            generate: async () => {
              throw new Error("boom")
            },
          }),
        ],
        [],
        makeCtx(),
        { head: StubHead },
        {},
      ),
      /boom/,
    )
  })
})

describe("folders of virtual pages (#2576)", () => {
  const makeCtx = () => ({ cfg: { configuration: {} }, virtualPages: [] }) as unknown as BuildCtx
  const page = (slug: string) => ({ slug: slug as FullSlug, title: slug, data: {} })
  const note = (slug: string) =>
    defaultProcessedContent({
      slug: slug as FullSlug,
      relativePath: `${slug}.md` as FilePath,
      filePath: `content/${slug}.md` as FilePath,
      frontmatter: { title: slug },
    })[1].data

  test("a page type sees the virtual pages of higher-priority page types in ctx.virtualPages", async () => {
    const ctx = makeCtx()
    let seen: string[] = []
    await generateVirtualPages(
      [
        makePageType({ name: "bases", generate: () => [page("trips/map.base")] }),
        makePageType({
          name: "folders",
          generate: ({ ctx }) => {
            seen = ctx.virtualPages.map(([, vfile]) => vfile.data.slug!)
            return []
          },
        }),
      ],
      [],
      ctx,
      { head: StubHead },
      {},
    )
    assert.deepStrictEqual(seen, ["trips/map.base"])
  })

  test("only pages of page types that render files are file-backed", async () => {
    const entries = await generateVirtualPages(
      [
        makePageType({
          name: "bases",
          fileExtensions: [".base"],
          generate: () => [page("trips/map.base")],
        }),
        makePageType({ name: "tags", generate: () => [page("tags/a")] }),
      ],
      [],
      makeCtx(),
      { head: StubHead },
      {},
    )
    assert.deepStrictEqual(
      entries.map((e) => [e.vpSlug, e.fileBacked]),
      [
        ["trips/map.base", true],
        ["tags/a", false],
      ],
    )
  })

  test("the folder trie holds file-backed virtual pages, not tag or folder pages", async () => {
    const entries = await generateVirtualPages(
      [
        makePageType({
          name: "bases",
          fileExtensions: [".base"],
          generate: () => [page("trips/map.base"), page("mixed/board.base")],
        }),
        makePageType({ name: "tags", generate: () => [page("tags/a")] }),
        makePageType({ name: "folders", generate: () => [page("trips/index")] }),
      ],
      [],
      makeCtx(),
      { head: StubHead },
      {},
    )
    const trie = folderTrie([note("mixed/note")], entries)
    const children = (folder: string) =>
      trie
        .findNode([folder, "index"])
        ?.children.map((c) => c.slug)
        .sort()
    assert.deepStrictEqual(children("trips"), ["trips/map.base"])
    assert.deepStrictEqual(children("mixed"), ["mixed/board.base", "mixed/note"])
    assert.strictEqual(trie.findNode(["tags", "index"]), undefined)
    assert.strictEqual(trie.findNode(["trips", "index"])?.data, null)
  })
})

describe("publish filters on pages that stand for files (bases-page#11)", () => {
  const note = (slug: string, links: string[], frontmatter: Record<string, unknown> = {}) =>
    defaultProcessedContent({
      slug: slug as FullSlug,
      relativePath: `${slug}.md` as FilePath,
      links: links as SimpleSlug[],
      frontmatter: { title: slug, ...frontmatter },
    })
  const page = (slug: string, data: Record<string, unknown> = {}) => ({
    slug: slug as FullSlug,
    title: slug,
    data: { relativePath: slug as FilePath, ...data },
  })
  // publishes notes with `publish: true`, and files a published page links to
  const explicitPublish = {
    name: "ExplicitPublish",
    shouldPublish: (_ctx: BuildCtx, [, vfile]: ReturnType<typeof note>) =>
      vfile.data.frontmatter?.publish === true || (vfile.data.referencedBy?.length ?? 0) > 0,
  }
  const makeCtx = (plugins: Record<string, unknown[]> = {}) =>
    ({
      cfg: { configuration: {}, plugins: { filters: [explicitPublish], ...plugins } },
      argv: {},
      virtualPages: [],
    }) as unknown as BuildCtx

  test("referencesByTarget lists the pages linking to each target", () => {
    const refs = referencesByTarget([
      note("a", ["board.canvas", "b"]),
      note("b", ["board.canvas", "board.canvas"]),
    ])
    assert.deepStrictEqual(refs.get("board.canvas" as SimpleSlug), ["a", "b"])
    assert.deepStrictEqual(refs.get("b" as SimpleSlug), ["a"])
  })

  test("file-backed pages go through the filters, with referencedBy; listings do not", async () => {
    const ctx = makeCtx()
    const entries = await generateVirtualPages(
      [
        makePageType({
          name: "canvas",
          fileExtensions: [".canvas"],
          generate: () => [page("linked.canvas"), page("secret.canvas")],
        }),
        makePageType({
          name: "excalidraw",
          fileExtensions: [".excalidraw.md"],
          generate: () => [
            page("drawing.excalidraw", { frontmatter: { title: "drawing", publish: true } }),
          ],
        }),
        makePageType({ name: "tags", generate: () => [page("tags/a")] }),
      ],
      [note("index", ["linked.canvas"], { publish: true })],
      ctx,
      { head: StubHead },
      {},
    )
    assert.deepStrictEqual(
      entries.map((e) => e.vpSlug),
      ["linked.canvas", "drawing.excalidraw", "tags/a"],
    )
    assert.deepStrictEqual(entries[0].vfile.data.referencedBy, ["index"])
    assert.deepStrictEqual(entries[1].vfile.data.referencedBy, [])
    assert.strictEqual(entries[2].vfile.data.referencedBy, undefined)
    assert.deepStrictEqual(
      ctx.virtualPages.map(([, vfile]) => vfile.data.slug),
      ["linked.canvas", "drawing.excalidraw", "tags/a"],
    )
  })

  const rendered = (ctx: BuildCtx) => {
    const [tree, vfile] = defaultProcessedContent({
      slug: "board.canvas" as FullSlug,
      relativePath: "board.canvas" as FilePath,
      frontmatter: { title: "board", password: "pw" },
      htmlAst: {
        type: "root",
        children: [{ type: "element", tagName: "p", properties: {}, children: [] }],
      } as HtmlRoot,
    })
    const layout = resolveLayout(makePageType(), { head: StubHead }, {})
    ctx.virtualPages.push([tree, vfile])
    return {
      ve: { tree, vfile, layout, vpSlug: "board.canvas" as FullSlug, fileBacked: true },
      ctx,
    }
  }

  test("virtualPageHtmlPlugins process the rendered body, which the page then shows", () => {
    const seen: unknown[] = []
    const { ve, ctx } = rendered(
      makeCtx({
        transformers: [
          {
            name: "Encrypt",
            virtualPageHtmlPlugins: (_ctx: BuildCtx, content: unknown[]) => {
              seen.push(content)
              return [
                () => (tree: HtmlRoot, file: { data: Record<string, unknown> }) => {
                  tree.children = [{ type: "text", value: "encrypted" }]
                  file.data.encrypted = true
                },
              ]
            },
          },
        ],
      }),
    )
    const Body = ve.layout.pageBody
    assert.strictEqual(processVirtualPageHtml(ve, ctx, []), true)
    assert.deepStrictEqual(seen, [[]])
    assert.deepStrictEqual(ve.tree.children, [{ type: "text", value: "encrypted" }])
    assert.strictEqual(ve.vfile.data.htmlAst, ve.tree)
    assert.strictEqual((ve.vfile.data as Record<string, unknown>).encrypted, true)
    assert.strictEqual(ctx.virtualPages[0][0], ve.tree)
    assert.notStrictEqual(ve.layout.pageBody, Body)
  })

  test("a page whose processing leaves the tree alone keeps its body", () => {
    const { ve, ctx } = rendered(
      makeCtx({ transformers: [{ name: "Noop", virtualPageHtmlPlugins: () => [() => () => {}] }] }),
    )
    const Body = ve.layout.pageBody
    assert.strictEqual(processVirtualPageHtml(ve, ctx, []), true)
    assert.strictEqual(ve.layout.pageBody, Body)
    assert.strictEqual(ve.tree.children.length, 0)
  })

  test("a page whose body failed to render is not published unprocessed", () => {
    const { ve, ctx } = rendered(
      makeCtx({ transformers: [{ name: "Encrypt", virtualPageHtmlPlugins: () => [] }] }),
    )
    ve.vfile.data.htmlAst = undefined
    assert.strictEqual(processVirtualPageHtml(ve, ctx, []), false)
    // without such plugins nothing changes
    assert.strictEqual(processVirtualPageHtml(ve, makeCtx(), []), true)
  })
})

describe("links to unpublished pages, after the page types ran (crawl-links#7)", () => {
  const link = (slug: string): Element => ({
    type: "element",
    tagName: "a",
    properties: { href: `./${slug}`, "data-slug": slug, className: ["internal"] },
    children: [],
  })
  const content = (slug: string, links: string[] = []): ProcessedContent => {
    const file = new VFile("")
    file.data = { slug: slug as FullSlug, frontmatter: { title: slug } } as VFile["data"]
    return [{ type: "root", children: links.map(link) } as Root, file]
  }
  const marks = (item: ProcessedContent) =>
    ((item[0] as Root).children as Element[]).map((a) =>
      (a.properties.className as string[]).includes("broken")
        ? (a.properties["data-filtered"] ?? (a.properties["data-missing"] === "" ? "missing" : "?"))
        : "ok",
    )
  // a folder page type that generates a page for each folder with a published note, as folder-page does
  const folders = makePageType({
    name: "folders",
    generate: ({ content }) =>
      [...new Set(content.map(([, f]) => f.data.slug!.split("/").slice(0, -1).join("/")))]
        .filter((f) => f !== "" && !content.some(([, g]) => g.data.slug === `${f}/index`))
        .map((f) => ({ slug: `${f}/index` as FullSlug, title: f, data: {} })),
  })

  const setup = async (removedBy: ((slug: string) => string | undefined) | undefined) => {
    const home = content("index", [
      "notes/a",
      "notes/index",
      "drafts/index",
      "drafts/b",
      "projects/index",
      "missing-in-source",
    ])
    const all = [home, content("notes/a"), content("drafts/b"), content("projects/index")]
    const published = all.filter(([, f]) => f.data.slug !== "drafts/b")
    const ctx = {
      cfg: { configuration: {} },
      virtualPages: [],
      removedPages: removedBy ? removedPages(all, published, removedBy) : undefined,
    } as unknown as BuildCtx
    const entries = await generateVirtualPages([folders], published, ctx, { head: StubHead }, {})
    return { home, ctx, published, entries }
  }

  test("marks drafts with their filter and folders no page type generated as missing", async () => {
    const { home, ctx, published, entries } = await setup(() => "RemoveDrafts")
    assert.deepStrictEqual(
      entries.map((e) => e.vpSlug),
      ["notes/index"],
    )
    const changed = markLinksToUnpublishedPages(ctx, published, entries)
    assert.deepStrictEqual(marks(home), [
      "ok", // notes/a: published
      "ok", // notes/index: generated folder page
      "missing", // drafts/index: its only note is a draft, so no folder page
      "RemoveDrafts", // drafts/b
      "ok", // projects/index: a published folder note
      "ok", // not in the content: the Links transformer's own check, not this one
    ])
    assert.deepStrictEqual([...changed], ["index"])
    // run again (watch mode, nothing changed): nothing to re-emit
    assert.deepStrictEqual([...markLinksToUnpublishedPages(ctx, published, entries)], [])
  })

  test("marks nothing when the Links transformer doesn't mark broken links", async () => {
    const { home, ctx, published, entries } = await setup(undefined)
    assert.deepStrictEqual([...markLinksToUnpublishedPages(ctx, published, entries)], [])
    assert.ok(marks(home).every((m) => m === "ok"))
  })
})

describe("resolveLayout: every slot", () => {
  test("a page type's override replaces each default slot; the page type's body is the page body", () => {
    const Body = (() => null) as unknown as QuartzComponent
    const pt = makePageType({ body: () => Body })
    const slots = ["header", "beforeBody", "afterBody", "left", "right", "footer"] as const
    const defaults = Object.fromEntries(slots.map((s) => [s, [StubA]]))
    const overrides = Object.fromEntries(slots.map((s) => [s, [StubB]]))
    const OtherHead = (() => null) as unknown as QuartzComponent
    const layout = resolveLayout(
      pt,
      { head: StubHead, ...defaults },
      { [pt.layout]: { head: OtherHead, ...overrides } },
    )
    for (const slot of slots) assert.deepStrictEqual(layout[slot], [StubB], slot)
    assert.strictEqual(layout.head, OtherHead)
    assert.strictEqual(layout.pageBody, Body)
    // without an override, the defaults
    const plain = resolveLayout(pt, { head: StubHead, ...defaults }, {})
    for (const slot of slots) assert.deepStrictEqual(plain[slot], [StubA], slot)
  })

  test("collectComponents leaves out a missing head", () => {
    const components = collectComponents([makePageType()], { left: [StubA] }, {})
    assert.ok(!components.includes(undefined as never))
    assert.strictEqual(components.length, 2)
  })

  test("collectTreeTransforms: page types without treeTransforms add none", () => {
    const t = (() => {}) as never
    const ctx = { cfg: { plugins: { transformers: [] } } } as unknown as BuildCtx
    const result = collectTreeTransforms(ctx, [{}, { treeTransforms: () => [t] }])
    assert.deepStrictEqual(result, { before: [], treeTransforms: [t], after: [] })
  })
})
