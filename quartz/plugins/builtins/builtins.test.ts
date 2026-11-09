import test, { describe } from "node:test"
import assert from "node:assert"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { VFile } from "vfile"
import { Element, Root } from "hast"
import { visit } from "unist-util-visit"
import { BUILTINS, instantiateBuiltins, officialPluginName, planBuiltins, PlanInput } from "."
import {
  Frontmatter,
  normalizeFrontmatter,
  extractLinksFromValue,
  readFrontmatterData,
} from "./frontmatter"
import { Links } from "./links"
import { isContentError } from "../../util/pluginErrors"
import { Drafts, isDraft } from "./drafts"
import {
  ContentIndex,
  applyContentIndexExtensions,
  buildContentIndex,
  contentIndexOptions,
  prepareContentIndex,
  serializeContentIndex,
} from "./contentIndex"
import type { PluginJsonEntry } from "../loader/types"
import type { BuildCtx } from "../../util/ctx"
import type { ContentDetails } from "../types"
import type { FullSlug } from "../../util/path"
import type { ProcessedContent } from "../vfile"

const entry = (source: string, extra: Partial<PluginJsonEntry> = {}): PluginJsonEntry => ({
  source,
  enabled: true,
  ...extra,
})

const plan = (
  entries: PluginJsonEntry[],
  configuration: PlanInput["configuration"] = {},
  provides: Record<string, PlanInput["providesOf"] extends (e: never) => infer R ? R : never> = {},
) =>
  planBuiltins({
    configuration,
    entries,
    nameOf: (e) => String(e.source).replace(/^@[^/]+\//, ""),
    providesOf: (e) => provides[String(e.source)],
  })

const byId = (p: ReturnType<typeof plan>, id: string) => p.builtins.find((b) => b.spec.id === id)!

describe("officialPluginName", () => {
  test("recognises npm and GitHub sources of quartz-community plugins", () => {
    assert.strictEqual(officialPluginName("@quartz-community/crawl-links"), "crawl-links")
    assert.strictEqual(officialPluginName("github:quartz-community/remove-draft"), "remove-draft")
    assert.strictEqual(
      officialPluginName("https://github.com/quartz-community/content-index.git#v1"),
      "content-index",
    )
    assert.strictEqual(
      officialPluginName({ repo: "github:quartz-community/crawl-links" }),
      "crawl-links",
    )
  })

  test("ignores forks and local paths", () => {
    assert.strictEqual(officialPluginName("github:someone/crawl-links"), undefined)
    assert.strictEqual(officialPluginName("./plugins/crawl-links"), undefined)
    assert.strictEqual(officialPluginName("@someone/crawl-links"), undefined)
  })
})

describe("planBuiltins", () => {
  test("all built-ins are on by default with their defaults", () => {
    const p = plan([])
    assert.deepStrictEqual(
      p.builtins.map((b) => [b.spec.id, b.enabled]),
      BUILTINS.map((b) => [b.id, true]),
    )
    assert.strictEqual(byId(p, "links").options.markdownLinkResolution, "shortest")
    assert.strictEqual(byId(p, "frontmatter").order, 0)
    assert.strictEqual(byId(p, "links").order, 60)
    assert.deepStrictEqual(p.notices, [])
  })

  test("configuration.<key> sets options, `false` and enabled:false turn a built-in off", () => {
    const p = plan([], {
      links: { markdownLinkResolution: "relative", lazyLoad: true },
      contentIndex: false,
      drafts: { enabled: false },
    })
    assert.strictEqual(byId(p, "links").options.markdownLinkResolution, "relative")
    assert.strictEqual(byId(p, "links").options.lazyLoad, true)
    assert.strictEqual(byId(p, "contentIndex").enabled, false)
    assert.strictEqual(byId(p, "drafts").enabled, false)
  })

  test("absorbs an enabled crawl-links entry: options, legacy default and order carry over", () => {
    const crawl = entry("@quartz-community/crawl-links", { options: { lazyLoad: true }, order: 65 })
    const p = plan([crawl])
    const links = byId(p, "links")
    assert.strictEqual(links.enabled, true)
    // crawl-links defaulted to "absolute" — keep the old behaviour for migrated entries
    assert.strictEqual(links.options.markdownLinkResolution, "absolute")
    assert.strictEqual(links.options.lazyLoad, true)
    assert.strictEqual(links.order, 65)
    assert.ok(p.absorbedEntries.has(crawl))
    assert.match(p.notices.join("\n"), /crawl-links.*built into Quartz/)
  })

  test("configuration wins over an absorbed entry's options", () => {
    const p = plan(
      [entry("@quartz-community/crawl-links", { options: { markdownLinkResolution: "absolute" } })],
      { links: { markdownLinkResolution: "shortest" } },
    )
    assert.strictEqual(byId(p, "links").options.markdownLinkResolution, "shortest")
  })

  test("a disabled legacy entry keeps the feature off (unless configuration enables it)", () => {
    const off = plan([entry("@quartz-community/remove-draft", { enabled: false })])
    assert.strictEqual(byId(off, "drafts").enabled, false)
    const forced = plan([entry("@quartz-community/remove-draft", { enabled: false })], {
      drafts: { enabled: true },
    })
    assert.strictEqual(byId(forced, "drafts").enabled, true)
  })

  test("yields to an enabled plugin that provides the same capability", () => {
    const p = plan([entry("my-frontmatter")], {}, { "my-frontmatter": { data: ["frontmatter"] } })
    assert.strictEqual(byId(p, "frontmatter").enabled, false)
    assert.strictEqual(byId(p, "frontmatter").replacedBy, "my-frontmatter")
    // explicit enabled: true runs both
    const both = plan(
      [entry("my-frontmatter")],
      { frontmatter: { enabled: true } },
      { "my-frontmatter": { data: ["frontmatter"] } },
    )
    assert.strictEqual(byId(both, "frontmatter").enabled, true)
  })

  test("a disabled provider does not replace the built-in", () => {
    const p = plan(
      [entry("@quartz-community/note-properties", { enabled: false })],
      {},
      { "@quartz-community/note-properties": { data: ["frontmatter"] } },
    )
    assert.strictEqual(byId(p, "frontmatter").enabled, true)
  })

  test("note-properties' delimiters/language are used when configuration does not set them", () => {
    const p = plan([
      entry("@quartz-community/note-properties", {
        options: { delimiters: "+++", language: "toml", includeAll: true },
      }),
    ])
    assert.strictEqual(byId(p, "frontmatter").options.delimiters, "+++")
    assert.strictEqual(byId(p, "frontmatter").options.language, "toml")
    assert.strictEqual(byId(p, "frontmatter").options.includeAll, undefined)
  })

  test("unknown option keys produce a notice", () => {
    const p = plan([], { links: { markdownLinkResolutoin: "shortest" } as never })
    assert.match(p.notices.join("\n"), /configuration\.links\.markdownLinkResolutoin/)
  })

  test("drafts.publish: true instantiates no filter", () => {
    assert.strictEqual(instantiateBuiltins(plan([]), "filter").length, 1)
    assert.strictEqual(
      instantiateBuiltins(plan([], { drafts: { publish: true } }), "filter").length,
      0,
    )
  })
})

describe("frontmatter built-in", () => {
  const ctx = () => ({ allSlugs: [] as FullSlug[] }) as unknown as BuildCtx

  async function parse(markdown: string, path = "notes/my note.md", c = ctx()) {
    const file = new VFile({ value: Buffer.from(markdown), path })
    file.data = {}
    const processor = unified().use(remarkParse).use(Frontmatter({}).markdownPlugins!(c))
    const tree = await processor.run(processor.parse(file), file)
    return { file, tree, ctx: c }
  }

  test("parses YAML, normalises title/tags/aliases and strips the block from the body", async () => {
    const {
      file,
      tree,
      ctx: c,
    } = await parse(
      "---\ntitle: 42\ntags: [Foo Bar, foo bar]\nalias: Old Name\ndate: 2024-01-02\n---\n# Body\n",
    )
    const fm = file.data.frontmatter as Record<string, unknown>
    assert.strictEqual(fm.title, "42")
    assert.deepStrictEqual(fm.tags, ["foo-bar"])
    assert.deepStrictEqual(fm.aliases, ["Old Name"])
    assert.strictEqual(fm.created, "2024-01-02") // JSON schema: dates stay strings
    assert.strictEqual(fm.modified, "2024-01-02")
    assert.deepStrictEqual(file.data.aliases, ["old-name"])
    assert.deepStrictEqual(c.allSlugs, ["old-name"])
    const types = (tree as unknown as { children: { type: string }[] }).children.map((n) => n.type)
    assert.deepStrictEqual(types, ["yaml", "heading"])
  })

  test("falls back to the file name for a missing title", async () => {
    const { file } = await parse("no frontmatter here\n")
    assert.strictEqual((file.data.frontmatter as Record<string, unknown>).title, "my note")
  })

  test("collects wikilinks and Markdown links from property values", () => {
    assert.deepStrictEqual(
      extractLinksFromValue({ related: ["[[My Note#Part]]", "see [x](other.md)"], n: 1 }),
      ["my-note#part", "other.md"],
    )
  })

  test("refuses JavaScript frontmatter instead of executing it", async () => {
    const g = globalThis as { __quartzFrontmatterRan?: boolean }
    delete g.__quartzFrontmatterRan
    for (const lang of ["js", "javascript"]) {
      const source = `---${lang}\n{ title: "x", ran: (globalThis.__quartzFrontmatterRan = true) }\n---\nbody\n`
      assert.throws(() => readFrontmatterData(source), /JavaScript frontmatter/)
      await assert.rejects(parse(source), /JavaScript frontmatter/)
      // also when a site sets `language: js` (the type allows only yaml/toml, a YAML config does not)
      assert.throws(
        () =>
          readFrontmatterData(`---\n{ ran: (globalThis.__quartzFrontmatterRan = true) }\n---\n`, {
            language: lang as "yaml",
          }),
        /unsupported `language` option/,
      )
    }
    assert.strictEqual(g.__quartzFrontmatterRan, undefined)
  })

  test("invalid frontmatter is reported as a content error", () => {
    assert.throws(
      () => readFrontmatterData("---\ntitle: [unclosed\n---\nbody\n"),
      (err: Error) => isContentError(err) && err.message.startsWith("Invalid frontmatter: "),
    )
  })

  test("an unsupported language option is a configuration error, not a content error", () => {
    assert.throws(
      () => readFrontmatterData("---\ntitle: a\n---\n", { language: "json" as "yaml" }),
      (err: Error) =>
        !isContentError(err) && /unsupported `language` option "json"/.test(err.message),
    )
  })

  test("frontmatter holding a single value or a list instead of properties is a content error", () => {
    for (const source of [
      "---\nhello\n---\nbody\n",
      "---\n42\n---\n",
      "---\n- a\n- b\n---\nbody\n",
    ]) {
      assert.throws(
        () => readFrontmatterData(source),
        (err: Error) => isContentError(err) && /expected properties/.test(err.message),
      )
    }
    // empty frontmatter keeps working
    assert.deepStrictEqual(readFrontmatterData("---\n---\nbody\n"), {})
    assert.deepStrictEqual(readFrontmatterData("---\n# just a comment\n---\nbody\n"), {})
    assert.deepStrictEqual(readFrontmatterData("---\nnull\n---\n"), {})
  })

  test("a permalink is the page's address, not an alias (Obsidian Publish)", () => {
    const data: Record<string, unknown> = { permalink: "short", aliases: ["old-name"] }
    assert.deepStrictEqual(normalizeFrontmatter(data, "x").aliases, ["old-name"])
    assert.strictEqual(data.permalink, "short")
  })
})

describe("links built-in", () => {
  function run(html: Element[], slug = "folder/page", opts = {}, allSlugs: string[] = []) {
    const tree: Root = { type: "root", children: html }
    const file = new VFile("")
    file.data = {
      slug: slug as FullSlug,
      frontmatterLinks: ["fm-target", "https://github.com/quartz-community/graph"],
    }
    const ctx = { allSlugs } as unknown as BuildCtx
    const [factory] = Links(opts).htmlPlugins!(ctx) as [() => (t: Root, f: VFile) => void]
    factory()(tree, file)
    const els: Element[] = []
    visit(tree, "element", (n: Element) => {
      els.push(n)
    })
    return { els, file }
  }
  const a = (href: string, text = href): Element => ({
    type: "element",
    tagName: "a",
    properties: { href },
    children: [{ type: "text", value: text }],
  })

  test("permalinks: links resolve by file path and point at the permalink", () => {
    // folder/page.md has permalink "home"; folder/target.md has permalink "t"
    const tree: Root = {
      type: "root",
      children: [
        a("target", "Target"),
        a("./sibling"),
        {
          type: "element",
          tagName: "img",
          properties: { src: "img.png" },
          children: [],
        },
      ],
    }
    const file = new VFile("")
    file.data = { slug: "home" as FullSlug, relativePath: "folder/page.md" as never }
    const ctx = {
      allSlugs: ["folder/page", "folder/target", "folder/sibling", "folder/img.png", "home", "t"],
      permalinks: { "folder/page.md": "home", "folder/target.md": "t" },
    } as unknown as BuildCtx
    const [factory] = Links({ markdownLinkResolution: "shortest" }).htmlPlugins!(ctx) as [
      () => (t: Root, f: VFile) => void,
    ]
    factory()(tree, file)
    const [target, sibling, img] = tree.children as Element[]
    assert.strictEqual(target.properties.href, "./t") // the target's permalink, from /home
    assert.strictEqual(sibling.properties.href, "./folder/sibling") // relative to the file
    assert.strictEqual(img.properties.src, "./folder/img.png")
    assert.deepStrictEqual(file.data.links?.sort(), ["folder/sibling", "t"])
  })

  test("makes internal links relative, records outgoing links, marks external ones", () => {
    const { els, file } = run(
      [a("other/note", "Note"), a("https://example.com"), a("#heading")],
      "folder/page",
      { markdownLinkResolution: "absolute" },
    )
    const [internal, external] = els.filter((e) => e.tagName === "a")
    assert.strictEqual(internal.properties.href, "../other/note")
    assert.deepStrictEqual(internal.properties.className, ["internal", "internal-link", "alias"])
    assert.strictEqual(internal.properties["data-slug"], "other/note")
    assert.deepStrictEqual(external.properties.className, ["external", "external-link"])
    assert.ok(
      els.some((e) => e.tagName === "svg"),
      "external link icon",
    )
    assert.deepStrictEqual(file.data.links, ["other/note", "fm-target"])
  })

  test("resolves object[data] and source[src] like img src", () => {
    const { els } = run(
      [
        { type: "element", tagName: "object", properties: { data: "static/x.svg" }, children: [] },
        { type: "element", tagName: "source", properties: { src: "media/a.mp4" }, children: [] },
      ],
      "deep/nested/page",
      { markdownLinkResolution: "absolute" },
    )
    assert.strictEqual(els[0].properties.data, "../../static/x.svg")
    assert.strictEqual(els[1].properties.src, "../../media/a.mp4")
  })

  test("disableBrokenWikilinks adds a broken class to missing targets", () => {
    const { els } = run([a("missing")], "page", { disableBrokenWikilinks: true }, ["page"])
    assert.ok((els[0].properties.className as string[]).includes("broken"))
  })
})

describe("drafts built-in", () => {
  test('draft: true and "true" are drafts', () => {
    assert.strictEqual(isDraft({ draft: true }), true)
    assert.strictEqual(isDraft({ draft: "true" }), true)
    assert.strictEqual(isDraft({ draft: false }), false)
    assert.strictEqual(isDraft(undefined), false)
  })

  test("filters drafts", () => {
    const file = new VFile("")
    file.data = { frontmatter: { title: "x", draft: true } }
    const content = [{ type: "root", children: [] }, file] as ProcessedContent
    assert.strictEqual(Drafts({}).shouldPublish({} as BuildCtx, content), false)
  })
})

describe("content index built-in", () => {
  const page = (slug: string, data: Record<string, unknown> = {}): ProcessedContent => {
    const file = new VFile("")
    file.data = {
      slug: slug as FullSlug,
      relativePath: `${slug}.md`,
      frontmatter: { title: slug.toUpperCase(), tags: ["t"] },
      links: [],
      text: "body",
      ...data,
    } as unknown as VFile["data"]
    return [{ type: "root", children: [] }, file]
  }
  const ctxWith = (instances: Record<string, unknown>[]) =>
    ({
      cfg: { plugins: { transformers: instances, filters: [], emitters: [], pageTypes: [] } },
    }) as unknown as BuildCtx

  test("builds entries from frontmatter, links and text; skips unlisted pages", () => {
    const idx = buildContentIndex(ctxWith([]), [page("a"), page("b", { unlisted: true })])
    assert.deepStrictEqual([...idx.keys()], ["a"])
    assert.strictEqual(idx.get("a" as FullSlug)!.title, "A")
    const json = JSON.parse(serializeContentIndex(idx))
    assert.deepStrictEqual(Object.keys(json.a).sort(), [
      "content",
      "filePath",
      "links",
      "slug",
      "tags",
      "title",
    ])
  })

  test("plugins add fields through extendContentIndex", () => {
    const ctx = ctxWith([
      {
        name: "ReadingTime",
        extendContentIndex: ({ fileData }: { fileData: Record<string, unknown> }) => ({
          words: String(fileData.text).split(" ").length,
        }),
      },
      { name: "NoHook" },
    ])
    const json = JSON.parse(serializeContentIndex(buildContentIndex(ctx, [page("a")])))
    assert.strictEqual(json.a.words, 1)
  })

  test("extensions cannot override core fields; first plugin wins on collisions; throws are contained", () => {
    const ctx = ctxWith([
      { name: "First", extendContentIndex: () => ({ title: "hacked", extra: 1 }) },
      { name: "Second", extendContentIndex: () => ({ extra: 2, other: true }) },
      {
        name: "Broken",
        extendContentIndex: () => {
          throw new Error("boom")
        },
      },
    ])
    const warn = console.warn
    const warnings: string[] = []
    console.warn = (m: string) => warnings.push(m)
    try {
      const base: ContentDetails = {
        slug: "a" as FullSlug,
        filePath: "a.md" as never,
        title: "A",
        links: [],
        tags: [],
        content: "",
      }
      const out = applyContentIndexExtensions(
        ctx,
        (ctx.cfg.plugins.transformers as never[]).flatMap(
          (i: { name: string; extendContentIndex?: never }) =>
            i.extendContentIndex ? [{ plugin: i.name, extend: i.extendContentIndex }] : [],
        ),
        base,
        {},
      )
      assert.strictEqual(out.title, "A")
      assert.strictEqual(out.extra, 1)
      assert.strictEqual(out.other, true)
    } finally {
      console.warn = warn
    }
    assert.ok(warnings.some((w) => w.includes('override core field "title"')))
    assert.ok(warnings.some((w) => w.includes('both add field "extra"')))
    assert.ok(warnings.some((w) => w.includes("threw")))
  })
})

// keep remark-rehype import used (parity with the real pipeline: frontmatter nodes are dropped)
void remarkRehype

describe("ctx.contentIndex", () => {
  const page = (slug: string): ProcessedContent => {
    const file = new VFile("")
    file.data = {
      slug: slug as FullSlug,
      relativePath: `${slug}.md`,
      frontmatter: { title: slug },
      text: "x",
    } as unknown as VFile["data"]
    return [{ type: "root", children: [] }, file]
  }

  test("prepareContentIndex puts a read-only index on ctx using configuration.contentIndex", () => {
    const ctx = {
      cfg: {
        configuration: { contentIndex: { includeEmptyFiles: false } },
        plugins: { transformers: [], filters: [], emitters: [], pageTypes: [] },
      },
    } as unknown as BuildCtx
    assert.strictEqual(contentIndexOptions(ctx).includeEmptyFiles, false)
    assert.strictEqual(contentIndexOptions(ctx).enableRSS, true)
    const idx = prepareContentIndex(ctx, [page("a"), page("b")])
    assert.strictEqual(ctx.contentIndex, idx)
    assert.deepStrictEqual([...ctx.contentIndex!.keys()], ["a", "b"])
  })

  test("the ContentIndex emitter reuses ctx.contentIndex instead of rebuilding it", async () => {
    const fs = await import("node:fs/promises")
    const os = await import("node:os")
    const path = await import("node:path")
    const out = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-ci-"))
    try {
      const ctx = {
        argv: { output: out },
        cfg: {
          configuration: { pageTitle: "T", locale: "en-US", baseUrl: "example.com" },
          plugins: { transformers: [], filters: [], emitters: [], pageTypes: [] },
        },
      } as unknown as BuildCtx
      prepareContentIndex(ctx, [page("prepared")])
      // content passed to emit differs: the prepared index must win
      await ContentIndex({ enableRSS: false, enableSiteMap: false }).emit(ctx, [page("other")], {
        css: [],
        js: [],
        additionalHead: [],
      })
      const json = JSON.parse(await fs.readFile(path.join(out, "static/contentIndex.json"), "utf8"))
      assert.deepStrictEqual(Object.keys(json), ["prepared"])
    } finally {
      await fs.rm(out, { recursive: true, force: true })
    }
  })
})
