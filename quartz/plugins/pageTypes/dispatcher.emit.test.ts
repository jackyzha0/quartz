import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { registerHooks } from "node:module"
import test, { after, describe } from "node:test"
import { h } from "preact"
import type { BuildCtx } from "../../util/ctx"
import type { QuartzComponent, QuartzComponentProps } from "../../components/types"
import type { QuartzPageTypePluginInstance } from "../types"
import type { FilePath, FullSlug } from "../../util/path"
import type { StaticResources } from "../../util/resources"
import type { ChangeEvent } from "../types"
import type { Element, Root } from "hast"
import { toHtml } from "hast-util-to-html"

// Rendering a page imports components with SCSS and inline browser scripts, which esbuild bundles
// in a real build; under tsx they are stubbed out.
registerHooks({
  load(url, context, next) {
    if (url.endsWith(".scss") || /\.inline\.ts$/.test(url)) {
      return { format: "module", source: "export default ''", shortCircuit: true }
    }
    return next(url, context)
  },
})
const { PageTypeDispatcher } = await import("./dispatcher")
const { defaultProcessedContent } = await import("../vfile")

const Head: QuartzComponent = ({ fileData }: QuartzComponentProps) =>
  h("head", null, h("title", null, String(fileData.frontmatter?.title ?? "")))

/** A page type whose body names it, so the emitted HTML tells which page type rendered a page. */
function pageType(
  name: string,
  overrides: Partial<QuartzPageTypePluginInstance> = {},
): QuartzPageTypePluginInstance {
  const Body: QuartzComponent = ({ fileData }: QuartzComponentProps) =>
    h("article", { "data-type": name }, `${name}:${fileData.slug}`)
  return {
    name,
    layout: name,
    match: () => true,
    body: () => Body,
    ...overrides,
  } as QuartzPageTypePluginInstance
}

const dirs: string[] = []
after(() => {
  for (const dir of dirs) fs.rmSync(dir, { recursive: true, force: true })
})

function setup(
  pageTypes: QuartzPageTypePluginInstance[],
  removedPages?: Map<string, string>,
  transformers: unknown[] = [],
) {
  const output = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-dispatcher-"))
  dirs.push(output)
  const ctx = {
    argv: { output, serve: false, directory: "content" },
    cfg: {
      configuration: { baseUrl: "example.com/sub", locale: "en-US" },
      plugins: { pageTypes, transformers },
    },
    allSlugs: [],
    virtualPages: [],
    removedPages,
  } as unknown as BuildCtx
  const read = (slug: string) => fs.readFileSync(path.join(output, `${slug}.html`), "utf8")
  return { ctx, output, read }
}

const resources: StaticResources = { css: [], js: [], additionalHead: [] }
const dispatcher = () => PageTypeDispatcher({ defaults: { head: Head } })

function page(slug: string, html = "", links: string[] = []) {
  return defaultProcessedContent({
    slug: slug as FullSlug,
    relativePath: `${slug}.md` as FilePath,
    filePath: `content/${slug}.md` as FilePath,
    frontmatter: { title: slug, tags: [] },
    links: links as never,
    htmlAst: { type: "root", children: [] },
  }).map((x, i) =>
    i === 0 && html
      ? {
          type: "root",
          children: [
            {
              type: "element",
              tagName: "a",
              properties: { href: `./${html}`, "data-slug": html, className: ["internal"] },
              children: [{ type: "text", value: html }],
            },
          ],
        }
      : x,
  ) as ReturnType<typeof defaultProcessedContent>
}

const linkOf = ([tree]: ReturnType<typeof page>) => (tree as Root).children[0] as Element

async function collect(gen: AsyncGenerator<FilePath> | AsyncIterable<FilePath>, output: string) {
  const out: string[] = []
  for await (const fp of gen) out.push(path.relative(output, fp))
  return out.sort()
}

describe("PageTypeDispatcher.emit", () => {
  test("each page is rendered by the first matching page type in priority order", async () => {
    const types = [
      pageType("low", { priority: 1 }),
      pageType("high", { priority: 10, match: ({ slug }) => slug.startsWith("special/") }),
      pageType("none", { match: () => false, priority: 100 }),
    ]
    const { ctx, output, read } = setup(types)
    const content = [page("index"), page("special/a")]
    const files = await collect(dispatcher().emit(ctx, content, resources) as never, output)
    assert.deepEqual(files, ["index.html", "special/a.html"])
    assert.match(read("index"), /<article data-type="low">low:index<\/article>/)
    assert.match(read("special/a"), /<article data-type="high">high:special\/a<\/article>/)
    assert.match(read("special/a"), /<title>special\/a<\/title>/)
  })

  test("virtual pages are emitted with their page type's body; the 404 page uses the site's base path", async () => {
    const generated = pageType("tags", {
      match: () => false,
      generate: () => [
        { slug: "tags/x" as FullSlug, title: "Tag x", data: {} },
        { slug: "404" as FullSlug, title: "Not found", data: {} },
      ],
    })
    const { ctx, output, read } = setup([pageType("content"), generated])
    const files = await collect(dispatcher().emit(ctx, [page("a/b")], resources) as never, output)
    assert.deepEqual(files, ["404.html", "a/b.html", "tags/x.html"])
    assert.match(read("tags/x"), /tags:tags\/x/)
    assert.match(read("tags/x"), /<title>Tag x<\/title>/)
    // the 404 page is served from any depth: its assets are under the absolute base path
    assert.match(read("404"), /<script src="\/sub\/postscript\.js"/)
    assert.match(read("a/b"), /<script src="\.\.\/postscript\.js"/)
    assert.deepEqual(
      ctx.virtualPages.map(([, f]) => f.data.slug),
      ["tags/x"],
    )
  })

  test("links to a draft are marked broken in the emitted page", async () => {
    const removed = new Map([["draft", "Drafts"]])
    const { ctx, output } = setup([pageType("content")], removed)
    const a = page("a", "draft")
    await collect(dispatcher().emit(ctx, [a], resources) as never, output)
    assert.deepEqual(linkOf(a).properties, {
      href: "./draft",
      "data-slug": "draft",
      className: ["internal", "broken"],
      "data-filtered": "Drafts",
    })
  })
})

describe("PageTypeDispatcher: pages that stand for files", () => {
  test("virtualPageHtmlPlugins' result is what the page shows; a page whose body fails isn't emitted", async () => {
    const Board: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
      if (fileData.slug === "broken.canvas") throw new Error("cannot render")
      return h("p", null, `board ${fileData.slug}`)
    }
    const canvas = pageType("canvas", {
      match: () => false,
      fileExtensions: [".canvas"],
      body: () => Board,
      generate: () =>
        ["a.canvas", "secret.canvas", "broken.canvas"].map((slug) => ({
          slug: slug as FullSlug,
          title: slug,
          data: {},
        })),
    })
    const encrypt = {
      name: "Encrypt",
      virtualPageHtmlPlugins: () => [
        () => (tree: Root, file: { data: { slug?: string } }) => {
          if (file.data.slug === "secret.canvas") {
            tree.children = [
              {
                type: "element",
                tagName: "div",
                properties: {},
                children: [{ type: "text", value: "ciphertext" }],
              },
            ]
          }
        },
      ],
    }
    // transformers without virtualPageHtmlPlugins are skipped
    const { ctx, output, read } = setup([pageType("content"), canvas], undefined, [
      { name: "Plain" },
      encrypt,
    ])
    const files = await collect(dispatcher().emit(ctx, [page("index")], resources) as never, output)
    assert.deepEqual(files, ["a.canvas.html", "index.html", "secret.canvas.html"])
    assert.match(read("a.canvas"), /<p>board a\.canvas<\/p>/)
    assert.match(read("secret.canvas"), /<div>ciphertext<\/div>/)
    assert.doesNotMatch(read("secret.canvas"), /board/)
    // later emitters read the processed tree from ctx.virtualPages; the failed page is gone
    const trees = Object.fromEntries(
      ctx.virtualPages.map(([tree, f]) => [f.data.slug, toHtml(tree as Root)]),
    )
    assert.deepEqual(Object.keys(trees), ["a.canvas", "secret.canvas"])
    assert.equal(trees["secret.canvas"], "<div>ciphertext</div>")
    assert.equal(trees["a.canvas"], "")
  })
})

describe("PageTypeDispatcher: what page bodies see", () => {
  // a body listing the pages it can embed (allFiles) and the files of folder "f" (ctx.trie)
  const Lister: QuartzComponent = ({ allFiles, ctx }: QuartzComponentProps) =>
    h(
      "article",
      null,
      `files:${allFiles.map((f) => f.slug).join(",")};` +
        `f:${(ctx.trie?.findNode(["f"])?.children ?? []).map((c) => c.slug).join(",")}`,
    )
  const types = () => [
    pageType("content", { body: () => Lister }),
    pageType("canvas", {
      match: () => false,
      fileExtensions: [".canvas"],
      generate: () => [{ slug: "f/board.canvas" as FullSlug, title: "Board", data: {} }],
    }),
    pageType("tags", {
      match: () => false,
      generate: () => [{ slug: "tags/t" as FullSlug, title: "t", data: {} }],
    }),
  ]
  const expected = "files:f/note,f/board.canvas,tags/t;f:f/note,f/board.canvas"

  test("emit: virtual pages are in allFiles; the folder trie holds the pages that stand for files", async () => {
    const { ctx, output, read } = setup(types())
    await collect(dispatcher().emit(ctx, [page("f/note")], resources) as never, output)
    assert.match(read("f/note"), new RegExp(`<article>${expected}</article>`))
  })

  test("partialEmit: the same, for the pages it re-emits", async () => {
    const { ctx, output, read } = setup(types())
    const note = page("f/note")
    const events = [
      { type: "change", path: "f/note.md", file: note[1] },
    ] as unknown as ChangeEvent[]
    await collect(dispatcher().partialEmit!(ctx, [note], resources, events) as never, output)
    assert.match(read("f/note"), new RegExp(`<article>${expected}</article>`))
  })

  test("partialEmit renders a changed page with the first matching page type by priority", async () => {
    const { ctx, output, read } = setup([
      pageType("low", { priority: 1 }),
      pageType("high", { priority: 10, match: ({ slug }) => slug === "special" }),
    ])
    const [a, b] = [page("special"), page("plain")]
    const events = [
      { type: "change", path: "special.md", file: a[1] },
      { type: "change", path: "plain.md", file: b[1] },
    ] as unknown as ChangeEvent[]
    await collect(dispatcher().partialEmit!(ctx, [a, b], resources, events) as never, output)
    assert.match(read("special"), /data-type="high"/)
    assert.match(read("plain"), /data-type="low"/)
  })
})

describe("PageTypeDispatcher.partialEmit", () => {
  test("re-emits changed Markdown pages and all virtual pages, removes deleted pages' output", async () => {
    const generated = pageType("folder", {
      match: () => false,
      generate: () => [{ slug: "f/index" as FullSlug, title: "F", data: {} }],
    })
    const { ctx, output } = setup([pageType("content"), generated])
    const [a, b] = [page("a"), page("b")]
    await collect(dispatcher().emit(ctx, [a, b], resources) as never, output)
    fs.writeFileSync(path.join(output, "gone.html"), "stale")

    const events = [
      { type: "change", path: "a.md", file: a[1] },
      { type: "delete", path: "gone.md" },
      // not Markdown: no page of its own
      { type: "change", path: "image.png" },
    ] as unknown as ChangeEvent[]
    ctx.virtualPages = []
    const files = await collect(
      dispatcher().partialEmit!(ctx, [a, b], resources, events) as never,
      output,
    )
    assert.deepEqual(files, ["a.html", "f/index.html"])
    assert.ok(!fs.existsSync(path.join(output, "gone.html")))
  })

  test("a page whose link to a removed page changed is re-emitted although its source didn't", async () => {
    const removed = new Map([["draft", "Drafts"]])
    const { ctx, output } = setup([pageType("content")], removed)
    const linking = page("linking", "draft")
    const files = await collect(
      dispatcher().partialEmit!(ctx, [linking, page("other")], resources, []) as never,
      output,
    )
    assert.deepEqual(files, ["linking.html"])
    assert.equal(linkOf(linking).properties["data-filtered"], "Drafts")
  })
})
