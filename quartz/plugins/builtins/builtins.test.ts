import test, { describe } from "node:test"
import assert from "node:assert"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { VFile } from "vfile"
import { Element, Root, Text } from "hast"
import { visit } from "unist-util-visit"
import { BUILTINS, instantiateBuiltins, officialPluginName, planBuiltins, PlanInput } from "."
import { normalizePluginName, orderPlugins } from "../loader/plugin-order"
import {
  Frontmatter,
  normalizeFrontmatter,
  extractLinksFromValue,
  readFrontmatterData,
} from "./frontmatter"
import {
  Links,
  LinksInstance,
  markLinksToRemovedPages,
  markUnpublishedLinks,
  removedPages,
} from "./links"
import {
  buildLayeredCSS,
  buildUnlayeredCSS,
  googleFontHref,
  resolveFontSpecs,
  resolveFonts,
} from "./fonts"
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
import type { FilePath, FullSlug, SimpleSlug } from "../../util/path"
import { setSlugOptions, slugifyFilePath } from "../../util/path"
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
  test("core built-ins are on by default and opt-in built-ins stay off", () => {
    const p = plan([])
    assert.deepStrictEqual(
      p.builtins.map((b) => [b.spec.id, b.enabled]),
      BUILTINS.map((b) => [b.id, b.defaultEnabled ?? true]),
    )
    assert.strictEqual(byId(p, "links").options.markdownLinkResolution, "shortest")
    assert.strictEqual(byId(p, "frontmatter").order, 0)
    assert.strictEqual(byId(p, "links").order, 60)
    assert.strictEqual(byId(p, "shortPermalinks").enabled, false)
    assert.deepStrictEqual(p.notices, [])
  })

  test("an opt-in built-in can be enabled with boolean or object configuration", () => {
    assert.strictEqual(byId(plan([], { shortPermalinks: true }), "shortPermalinks").enabled, true)
    const configured = byId(
      plan([], { shortPermalinks: { prefix: "go", hashLength: 12 } }),
      "shortPermalinks",
    )
    assert.strictEqual(configured.enabled, true)
    assert.strictEqual(configured.options.prefix, "go")
    assert.strictEqual(configured.options.hashLength, 12)
    assert.ok(
      instantiateBuiltins(plan([], { shortPermalinks: true }), "emitter").some(
        ({ instance }) => instance.name === "ShortPermalinks",
      ),
    )
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

describe("plugin order constraints naming a replaced plugin", () => {
  test("after: crawl-links / before: remove-draft order against the built-in", () => {
    const transformers = instantiateBuiltins(plan([]), "transformer")
    const links = transformers.find((b) => b.instance.name === "Links")!
    assert.ok(links.names.includes("crawl-links"))
    const known = new Set(
      [...transformers.flatMap((b) => b.names), "my-plugin"].map(normalizePluginName),
    )
    // same order as Links (60): without the mapping the constraint was ignored and the list
    // order (built-ins first) put Links first anyway, so run it before
    const mine = {
      order: 60,
      instance: { name: "Mine" },
      label: "my-plugin",
      names: ["my-plugin"],
      before: ["crawl-links"],
    }
    const ordered = orderPlugins(
      [
        ...transformers.map((b) => ({
          order: b.order,
          instance: b.instance as { name: string },
          label: b.instance.name,
          names: b.names,
        })),
        mine,
      ],
      known,
    ).map((i) => i.name)
    assert.ok(ordered.indexOf("Mine") < ordered.indexOf("Links"), ordered.join(", "))
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

  test("frontmatter Markdown links with an angle-bracket destination drop the brackets", () => {
    assert.deepStrictEqual(
      extractLinksFromValue([
        "[Exec Briefing](<./Exec Briefing.md>)",
        "[x](<./Exec Briefing.md#Next steps>)",
        "[y](./Exec Briefing.md)",
      ]),
      ["./Exec Briefing.md", "./Exec Briefing.md#Next steps", "./Exec Briefing.md"],
    )
  })

  test("frontmatter Markdown links: parentheses, titles and escapes as CommonMark reads them (#2672)", () => {
    assert.deepStrictEqual(
      extractLinksFromValue([
        "[b](<Note (2024).md>)",
        '[c](<My Note.md> "t")',
        "[d](notes/Note_(2024).md)",
        "[e](other.md 'single')",
        "[f](other.md (paren title))",
        '[g](<a b.md>  "t" )',
        "[h](a\\(1\\).md)",
        "[i](./My Note.md)",
        "[j](unclosed.md",
        "two: [k](k.md) and [l](<l l.md>)",
      ]),
      [
        "Note (2024).md",
        "My Note.md",
        "notes/Note_(2024).md",
        "other.md",
        "other.md",
        "a b.md",
        "a(1).md",
        "./My Note.md",
        "k.md",
        "l l.md",
      ],
    )
  })

  test("reads YAML frontmatter with YAML 1.2's core schema, as Obsidian does", () => {
    const data = readFrontmatterData(
      "---\ntitle: Hello world\ndate: 2024-01-02\ndraft: True\nn: 012\nnone: ~\nratio: .5\nalias: yes\n---\n",
    )
    assert.deepStrictEqual(data, {
      title: "Hello world",
      date: "2024-01-02",
      draft: true,
      n: 12,
      none: null,
      ratio: 0.5,
      alias: "yes",
    })
    // a block without a document holds no properties
    assert.deepStrictEqual(readFrontmatterData("---\n# only a comment\n---\nbody\n"), {})
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

  test("slugs.stripDiacritics: link targets are stripped like the slugs they point at (#2410)", () => {
    setSlugOptions({ stripDiacritics: true })
    try {
      const img: Element = {
        type: "element",
        tagName: "img",
        properties: { src: "obr%C3%A1zek.png" },
        children: [],
      }
      const { els, file } = run(
        [a("./%C4%8Ce%C5%A1tina#%C4%8Cesk%C3%BD-nadpis", "Čeština"), a("Příliš"), img],
        "ceske/page",
        { markdownLinkResolution: "shortest" },
        ["ceske/page", "ceske/cestina", "jine/prilis", "ceske/obrazek.png"],
      )
      const [cestina, prilis] = els.filter((e) => e.tagName === "a")
      assert.strictEqual(cestina.properties.href, "../ceske/cestina#český-nadpis")
      assert.ok(!(cestina.properties.className as string[]).includes("broken"))
      assert.strictEqual(prilis.properties.href, "../jine/prilis")
      assert.strictEqual(
        els.find((e) => e.tagName === "img")!.properties.src,
        "../ceske/obrazek.png",
      )
      assert.ok(file.data.links?.includes("ceske/cestina" as SimpleSlug))
    } finally {
      setSlugOptions(undefined)
    }
  })

  test("slugs.stripDiacritics: a percent-encoded % in a link target is decoded once", () => {
    setSlugOptions({ stripDiacritics: true })
    try {
      // `Kódování/Mezera je %20.md`, linked as Obsidian writes a Markdown link to it
      const target = slugifyFilePath("Kódování/Mezera je %20.md" as FilePath)
      assert.strictEqual(target, "kodovani/mezera-je--percent20")
      const { els } = run(
        [a("K%C3%B3dov%C3%A1n%C3%AD/Mezera%20je%20%2520.md")],
        "index",
        { markdownLinkResolution: "shortest" },
        ["index", target],
      )
      assert.strictEqual(els[0].properties.href, "./kodovani/mezera-je--percent20")
      assert.ok(!(els[0].properties.className as string[]).includes("broken"))
    } finally {
      setSlugOptions(undefined)
    }
  })

  test("without slugs.stripDiacritics link targets keep their diacritics", () => {
    const { els } = run([a("Příliš")], "page", { markdownLinkResolution: "shortest" }, [
      "page",
      "jine/příliš",
    ])
    assert.strictEqual(els[0].properties.href, "./jine/příliš")
  })

  test("footnote anchors stay internal without Obsidian's note-link class", () => {
    const fn = (props: Record<string, unknown>): Element => ({
      type: "element",
      tagName: "a",
      properties: { href: "#user-content-fn-1", ...props },
      children: [{ type: "text", value: "1" }],
    })
    const { els } = run([fn({ dataFootnoteRef: "" }), fn({ dataFootnoteBackref: "" })])
    for (const el of els.filter((e) => e.tagName === "a")) {
      const classes = el.properties.className as string[]
      assert.ok(classes.includes("internal"))
      assert.ok(!classes.includes("internal-link"))
    }
  })

  test("makes internal links relative, records outgoing links, marks external ones", () => {
    const { els, file } = run(
      [a("other/note", "Note"), a("https://example.com"), a("#heading")],
      "folder/page",
      { markdownLinkResolution: "absolute" },
      ["folder/page", "other/note"],
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

  // Obsidian 1.15.0 (remark-obsidian 2.2.1's triage, re-probed): a path that is not valid
  // percent-encoding names no file, so the link is external; `x:y` has a scheme, `../x:y` doesn't
  test("links Obsidian reads as external", () => {
    const { els } = run([a("%zz"), a("a%E2.md"), a("x:y"), a("../x:y")], "sub/note", {}, ["xy"])
    const classes = els.filter((e) => e.tagName === "a").map((e) => e.properties.className)
    assert.deepStrictEqual(
      classes.map((c) => (c as string[])[0]),
      ["external", "external", "external", "internal"],
    )
  })

  test("an image of a missing file without alt text shows its decoded path", () => {
    const img = (src: string, alt?: string): Element => ({
      type: "element",
      tagName: "img",
      properties: alt === undefined ? { src } : { src, alt },
      children: [],
    })
    const { els } = run(
      [
        img("missing%20pic.png"),
        img("missing%20image.png", "alt"),
        img("pic.png"),
        img("/static/x.png"),
      ],
      "page",
      { markdownLinkResolution: "absolute" },
      ["page", "pic.png"],
    )
    assert.deepStrictEqual(
      els.map((e) => e.properties.alt),
      ["missing pic.png", "alt", undefined, undefined],
    )
  })

  test("pretty links keep the last /-separated part of the link text, on every OS", () => {
    const { els } = run([a("folder/note"), a("a\\b")], "page", { prettyLinks: true }, [
      "folder/note",
      "a\\b",
    ])
    assert.deepStrictEqual(
      els.filter((e) => e.tagName === "a").map((e) => (e.children[0] as Text).value),
      ["note", "a\\b"],
    )
  })

  test("pretty links shorten a link whose text is its percent-decoded href (#2643)", () => {
    const { els } = run(
      [
        a("Folder/Name%20With%20Space", "Folder/Name With Space"),
        a("Ordner/%C3%9Cbersicht", "Ordner/Übersicht"),
        a("Folder/Name%20With%20Space", "own text"),
      ],
      "page",
      { prettyLinks: true },
    )
    const links = els.filter((e) => e.tagName === "a")
    assert.deepStrictEqual(
      links.map((e) => (e.children[0] as Text).value),
      ["Name With Space", "Übersicht", "own text"],
    )
    assert.deepStrictEqual(
      links.map((e) => (e.properties.className as string[]).includes("alias")),
      [false, false, true],
    )
  })

  test("missing targets get the broken class by default, as Obsidian marks them", () => {
    const { els } = run([a("missing"), a("page")], "page", {}, ["page"])
    assert.ok((els[0].properties.className as string[]).includes("broken"))
    assert.ok(!(els[1].properties.className as string[]).includes("broken"))
  })

  test("tag and folder pages, generated later, are not broken", () => {
    const { els } = run([a("tags/specimen"), a("folder/"), a("empty/")], "page", {}, [
      "page",
      "folder/note",
    ])
    const broken = els.map((e) => (e.properties.className as string[]).includes("broken"))
    assert.deepStrictEqual(broken, [false, false, true])
  })

  test("links to files Quartz emits are not broken; missing vault files are", () => {
    const targets = [
      "/index.xml",
      "/sitemap.xml",
      "/static/icon.png",
      "/robots.txt",
      "/404.html",
      "/page.html",
      "/pic.png",
      "/missing.png",
      "/missing.pdf",
      "/missing.html",
      "/v1.2",
    ]
    const { els } = run(
      targets.map((t) => a(t)),
      "page",
      {},
      ["page", "pic.png"],
    )
    const broken = els.map((e) => (e.properties.className as string[]).includes("broken"))
    assert.deepStrictEqual(broken, [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      true,
      true,
    ])
  })

  test("disableBrokenWikilinks: false leaves missing targets unmarked", () => {
    const { els } = run([a("missing")], "page", { disableBrokenWikilinks: false }, ["page"])
    assert.ok(!(els[0].properties.className as string[]).includes("broken"))
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

  test("writes the page date to contentIndex.json as an ISO string (explorer#5)", () => {
    const created = new Date("2024-01-02T03:04:05.000Z")
    const modified = new Date("2025-06-07T08:09:10.000Z")
    const dated = page("dated", { defaultDateType: "created", dates: { created, modified } })
    const idx = buildContentIndex(ctxWith([]), [dated, page("undated")])
    const json = JSON.parse(serializeContentIndex(idx))
    assert.strictEqual(json.dated.date, "2024-01-02T03:04:05.000Z")
    assert.ok(!("description" in json.dated))
    // pages without a date keep the build-time stand-in for RSS, but not in the JSON
    assert.ok(idx.get("undated" as FullSlug)!.date instanceof Date)
    assert.ok(!("date" in json.undated))
  })

  test("dateFromFrontmatter marks dates set in frontmatter for the configured type", () => {
    const fmModified = new Date("2024-03-04T00:00:00") // local midnight, like the date plugin
    const gitModified = new Date("2025-01-01T10:00:00.000Z")
    const created = new Date("2020-01-01T00:00:00.000Z")
    const fromFm = page("fm", {
      defaultDateType: "modified",
      frontmatter: { title: "FM", modified: "2024-03-04" },
      dates: { created, modified: fmModified },
    })
    const fromGit = page("git", {
      defaultDateType: "modified",
      frontmatter: { title: "GIT", created: "2020-01-01T00:00:00.000Z" },
      dates: { created, modified: gitModified },
    })
    // frontmatter has a date, but for another type than the configured one
    const otherType = page("other", {
      defaultDateType: "created",
      frontmatter: { title: "O", modified: "2024-03-04" },
      dates: { created: gitModified, modified: fmModified },
    })
    // frontmatter value lost to a higher-priority source (date differs)
    const overridden = page("over", {
      defaultDateType: "modified",
      frontmatter: { title: "OV", modified: "2023-01-01" },
      dates: { created, modified: gitModified },
    })
    const json = JSON.parse(
      serializeContentIndex(
        buildContentIndex(ctxWith([]), [fromFm, fromGit, otherType, overridden, page("undated")]),
      ),
    )
    assert.strictEqual(json.fm.dateFromFrontmatter, true)
    assert.strictEqual(json.fm.date, fmModified.toISOString())
    for (const slug of ["git", "other", "over", "undated"]) {
      assert.ok(!("dateFromFrontmatter" in json[slug]), slug)
    }
  })

  test("stand-in dates of the date plugin are not written to contentIndex.json", () => {
    const now = new Date()
    const published = new Date("2024-05-06T00:00:00")
    const json = JSON.parse(
      serializeContentIndex(
        buildContentIndex(ctxWith([]), [
          // created-modified-date >= 1.0.5 lists the dates it filled with the build time
          page("marked", {
            defaultDateType: "published",
            dates: { created: now, modified: now, published: now },
            fallbackDates: ["published"],
          }),
          // older versions don't: a published date only counts when frontmatter sets it
          page("old", {
            defaultDateType: "published",
            frontmatter: { title: "OLD" },
            dates: { created: now, modified: now, published: now },
          }),
          page("invalid", {
            defaultDateType: "published",
            frontmatter: { title: "INV", published: "not a date" },
            dates: { created: now, modified: now, published: now },
          }),
          page("real", {
            defaultDateType: "published",
            frontmatter: { title: "REAL", published: "2024-05-06" },
            dates: { created: now, modified: now, published },
            fallbackDates: [],
          }),
          page("oldReal", {
            defaultDateType: "published",
            frontmatter: { title: "OR", published: "2024-05-06" },
            dates: { created: now, modified: now, published },
          }),
        ]),
      ),
    )
    for (const slug of ["marked", "old", "invalid"]) assert.ok(!("date" in json[slug]), slug)
    assert.strictEqual(json.real.date, published.toISOString())
    assert.strictEqual(json.oldReal.date, published.toISOString())
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

describe("fonts built-in", () => {
  test("absorbs a @quartz-community/quartz-fonts entry with its options", () => {
    const fonts = entry("@quartz-community/quartz-fonts", {
      options: { h1: "Lora", fontOrigin: "local" },
    })
    const p = plan([fonts])
    assert.strictEqual(byId(p, "fonts").enabled, true)
    assert.strictEqual(byId(p, "fonts").options.h1, "Lora")
    assert.strictEqual(byId(p, "fonts").options.fontOrigin, "local")
    assert.ok(p.absorbedEntries.has(fonts))
  })

  test("a disabled plugin entry turns the built-in off", () => {
    const p = plan([entry("@quartz-community/quartz-fonts", { enabled: false })])
    assert.strictEqual(byId(p, "fonts").enabled, false)
  })

  test("without a theme, configured heading fonts are forced and Obsidian's variables set", () => {
    delete (globalThis as Record<string, unknown>).__quartzFonts
    const opts = { header: "Lora" }
    const fonts = resolveFonts(opts, {})
    assert.match(buildLayeredCSS(fonts, opts, false), /--h1-font: Lora;/)
    assert.match(buildUnlayeredCSS(fonts, opts, false), /h1 \{ font-family: Lora; \}/)
  })

  test("with a theme, its fonts are left alone unless configured explicitly", () => {
    ;(globalThis as Record<string, unknown>).__quartzFonts = {
      themeName: "Minimal",
      fonts: { "--font-text": "Inter" },
    }
    try {
      const fonts = resolveFonts({}, {})
      assert.strictEqual(fonts.body, "Inter")
      assert.doesNotMatch(buildLayeredCSS(fonts, {}, true), /--h1-font|--font-text/)
      assert.strictEqual(buildUnlayeredCSS(fonts, {}, true), "")
      assert.match(
        buildUnlayeredCSS(resolveFonts({ h2: "Lora" }, {}), { h2: "Lora" }, true),
        /^h2 \{ font-family: Lora; \}$/,
      )
    } finally {
      delete (globalThis as Record<string, unknown>).__quartzFonts
    }
  })

  test("the interface and per-heading fonts are loaded from Google Fonts", () => {
    const href = decodeURIComponent(
      googleFontHref(
        resolveFontSpecs(
          { interface: "Inter", h1: { name: "Playfair Display", weights: [700] } },
          {},
        ),
      ),
    )
    assert.match(href, /family=Inter:wght@400;600/)
    assert.match(href, /family=Playfair Display:wght@700/)
    assert.doesNotMatch(decodeURIComponent(googleFontHref(resolveFontSpecs({}, {}))), /Inter/)
    const single = (spec: object) =>
      decodeURIComponent(googleFontHref(resolveFontSpecs({ title: spec as never }, {})))
    assert.match(single({ name: "Lora", weights: [400] }), /family=Lora&/)
    assert.match(
      single({ name: "Lora", weights: [400], includeItalic: true }),
      /family=Lora:ital@0;1&/,
    )
    assert.match(
      single({ name: "Lora", weights: [700], includeItalic: true }),
      /family=Lora:ital,wght@0,700;1,700&/,
    )
  })

  test("explicit body/interface/code fonts set Obsidian's overrides on body", () => {
    ;(globalThis as Record<string, unknown>).__quartzFonts = {
      themeName: "Things",
      fonts: { "--font-text": "Inter", "--font-monospace": "JetBrains Mono" },
    }
    try {
      const opts = { body: "Lora", code: "Fira Code" }
      const css = buildUnlayeredCSS(resolveFonts(opts, {}), opts, true)
      assert.match(css, /html body \{[^}]*--font-text-override: Lora;/)
      assert.match(css, /html body \{[^}]*--font-monospace-override: Fira Code;/)
      assert.doesNotMatch(css, /--font-interface-override/)
      // a theme with themeFonts: false registers no fonts, but still reads the overrides
      assert.match(
        buildUnlayeredCSS(resolveFonts({ interface: "Inter" }, {}), { interface: "Inter" }, false),
        /html body \{\n  --font-interface-override: Inter;\n\}/,
      )
      assert.doesNotMatch(buildUnlayeredCSS(resolveFonts({}, {}), {}, true), /override/)
    } finally {
      delete (globalThis as Record<string, unknown>).__quartzFonts
    }
  })
})

describe("links to pages removed by filters (crawl-links#7)", () => {
  const link = (slug: string, className: string[] = ["internal", "internal-link"]): Element => ({
    type: "element",
    tagName: "a",
    properties: { href: `./${slug}`, "data-slug": slug, className: [...className] },
    children: [{ type: "text", value: slug }],
  })
  const page = (slug: string, links: Element[], data: Record<string, unknown> = {}) => {
    const file = new VFile("")
    file.data = { slug: slug as FullSlug, ...data } as VFile["data"]
    return [{ type: "root", children: links } as Root, file] as ProcessedContent
  }
  const anchors = (item: ProcessedContent) => (item[0] as Root).children as Element[]

  test("marks links to removed pages and their aliases broken, with the filter", () => {
    const home = page("index", [
      link("draft"),
      link("old-name"),
      link("published"),
      link("folder/index"),
    ])
    const draft = page("draft", [], { aliases: ["old-name"] })
    const published = page("published", [])
    const folderIndex = page("folder/index", [])
    const all = [home, draft, published, folderIndex]
    const marked = markLinksToRemovedPages(all, [home, published], (s) =>
      s === "draft" || s === "folder/index" ? "RemoveDrafts" : undefined,
    )
    const [toDraft, toAlias, toPublished, toFolder] = anchors(home)
    assert.strictEqual(marked, 2)
    assert.ok((toDraft.properties.className as string[]).includes("broken"))
    assert.strictEqual(toDraft.properties["data-filtered"], "RemoveDrafts")
    assert.ok((toAlias.properties.className as string[]).includes("broken"))
    assert.ok(!(toPublished.properties.className as string[]).includes("broken"))
    // a folder whose index note is a draft still gets a generated folder page
    assert.ok(!(toFolder.properties.className as string[]).includes("broken"))
  })

  test("a removed page's alias that a published page owns is not broken", () => {
    const home = page("index", [link("shared")])
    const draft = page("draft", [], { aliases: ["shared"] })
    const owner = page("shared", [])
    markLinksToRemovedPages([home, draft, owner], [home, owner])
    assert.ok(!(anchors(home)[0].properties.className as string[]).includes("broken"))
  })

  test("unmarks links when the target is published again (watch mode)", () => {
    const home = page("index", [link("draft")])
    const draft = page("draft", [])
    markLinksToRemovedPages([home, draft], [home])
    assert.ok((anchors(home)[0].properties.className as string[]).includes("broken"))
    markLinksToRemovedPages([home, draft], [home, draft])
    const a = anchors(home)[0]
    assert.deepStrictEqual(a.properties.className, ["internal", "internal-link"])
    assert.strictEqual(a.properties["data-filtered"], undefined)
  })

  test("leaves links marked broken by the links transformer alone", () => {
    const home = page("index", [link("missing", ["internal", "internal-link", "broken"])])
    markLinksToRemovedPages([home], [home])
    assert.ok((anchors(home)[0].properties.className as string[]).includes("broken"))
  })

  test("marks links to folder and tag pages no page type generated", () => {
    const home = page("index", [
      link("drafts/index"),
      link("notes/index"),
      link("tags/unused"),
      link("tags/used"),
      link("tags/parent"),
      link("index"),
    ])
    const generated = new Set(["notes/index", "tags/used", "tags/parent/index", "tags/index"])
    const changed = new Set<FullSlug>()
    const marked = markUnpublishedLinks([home], new Map(), generated, changed)
    const broken = anchors(home).map((a) => (a.properties.className as string[]).includes("broken"))
    assert.deepStrictEqual(broken, [true, false, true, false, false, false])
    assert.strictEqual(marked, 2)
    assert.strictEqual(anchors(home)[0].properties["data-missing"], "")
    assert.deepStrictEqual([...changed], ["index"])
  })

  test("links to published folder notes and pages are not marked once page types ran", () => {
    // `notes/index` is a content page (notes/index.md or a folder note), so no page type
    // generates it: it is live because it is published, not because it was generated
    const home = page("index", [
      link("notes/index"),
      link("projects/index"),
      link("published"),
      link("aka"),
      link("tags/x"),
    ])
    const notes = page("notes/index", [])
    const projects = page("projects/index", [], { aliases: ["aka"] })
    const published = page("published", [])
    const changed = new Set<FullSlug>()
    const marked = markUnpublishedLinks(
      [home, notes, projects, published],
      new Map(),
      new Set(["tags/x"]),
      changed,
    )
    assert.strictEqual(marked, 0)
    for (const a of anchors(home)) {
      assert.deepStrictEqual(a.properties.className, ["internal", "internal-link"])
      assert.strictEqual(a.properties["data-missing"], undefined)
      assert.strictEqual(a.properties["data-filtered"], undefined)
    }
    assert.deepStrictEqual([...changed], [])
  })

  test("a folder note that is a draft: its folder page is generated, or the link is missing", () => {
    const home = page("index", [link("notes/index"), link("drafts/index")])
    const notesIndex = page("notes/index", [])
    const draftsIndex = page("drafts/index", [])
    const all = [home, notesIndex, draftsIndex]
    const removed = removedPages(all, [home], () => "RemoveDrafts")
    // folder index notes are left to the generated pages
    assert.deepStrictEqual([...removed], [])
    markUnpublishedLinks([home], removed, new Set(["notes/index"]))
    const [toNotes, toDrafts] = anchors(home)
    assert.ok(!(toNotes.properties.className as string[]).includes("broken"))
    assert.ok((toDrafts.properties.className as string[]).includes("broken"))
    assert.strictEqual(toDrafts.properties["data-missing"], "")
    assert.strictEqual(toDrafts.properties["data-filtered"], undefined)
  })

  test("reports the pages whose marks changed, so watch mode re-emits them", () => {
    const home = page("index", [link("draft")])
    const other = page("other", [link("published")])
    const draft = page("draft", [])
    const all = [home, other, draft]
    const changed = new Set<FullSlug>()
    markUnpublishedLinks([home, other], removedPages(all, [home, other]), new Set(), changed)
    assert.deepStrictEqual([...changed], ["index"])
    changed.clear()
    // nothing changed: nothing to re-emit
    markUnpublishedLinks([home, other], removedPages(all, [home, other]), new Set(), changed)
    assert.deepStrictEqual([...changed], [])
    // the draft is published: its link is unmarked, the page re-emitted
    markUnpublishedLinks([home, other, draft], removedPages(all, all), new Set(), changed)
    assert.deepStrictEqual([...changed], ["index"])
    assert.deepStrictEqual(anchors(home)[0].properties.className, ["internal", "internal-link"])
  })

  test("the Links instance says whether it marks broken links", () => {
    assert.strictEqual((Links() as LinksInstance).marksBrokenLinks, true)
    assert.strictEqual(
      (Links({ disableBrokenWikilinks: false }) as LinksInstance).marksBrokenLinks,
      false,
    )
  })
})

describe("links built-in: options, other elements and edge cases", () => {
  const el = (tagName: string, properties: Element["properties"], text?: string): Element => ({
    type: "element",
    tagName,
    properties,
    children: text === undefined ? [] : [{ type: "text", value: text }],
  })
  const a = (href: string, text = href) => el("a", { href }, text)
  function run(
    nodes: Element[],
    {
      slug = "folder/page",
      opts = {},
      allSlugs = ["folder/page"],
      data = {},
      permalinks,
    }: {
      slug?: string
      opts?: Record<string, unknown>
      allSlugs?: string[]
      data?: Record<string, unknown>
      permalinks?: Record<string, string>
    } = {},
  ) {
    const tree: Root = { type: "root", children: nodes }
    const file = new VFile("")
    file.data = { slug: slug as FullSlug, ...data } as VFile["data"]
    const ctx = { allSlugs, permalinks } as unknown as BuildCtx
    const [factory] = Links(opts).htmlPlugins!(ctx) as [() => (t: Root, f: VFile) => void]
    factory()(tree, file)
    return { nodes, file }
  }
  const classes = (e: Element) => e.properties.className as string[] | undefined
  const text = (e: Element) => (e.children[0] as Text).value

  test("defaults: pretty links, external links open in place with an icon, no lazy loading", () => {
    const { nodes } = run([
      a("https://example.com/a/b"),
      a("other/note"),
      el("img", { src: "pic.png", alt: "x" }),
    ])
    const [external, internal, img] = nodes
    assert.strictEqual(external.properties.target, undefined)
    assert.strictEqual(text(external), "https://example.com/a/b")
    assert.deepStrictEqual(external.children[1], {
      type: "element",
      tagName: "svg",
      properties: {
        "aria-hidden": "true",
        class: "external-icon",
        style: "max-width:0.8em;max-height:0.8em",
        viewBox: "0 0 512 512",
      },
      children: [
        {
          type: "element",
          tagName: "path",
          properties: {
            d: "M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z",
          },
          children: [],
        },
      ],
    })
    assert.strictEqual(text(internal), "note")
    assert.strictEqual(img.properties.loading, undefined)
  })

  test("openLinksInNewTab and externalLinkIcon: false apply to external links only", () => {
    const { nodes } = run([a("https://example.com"), a("other")], {
      opts: { openLinksInNewTab: true, externalLinkIcon: false },
    })
    const [external, internal] = nodes
    assert.strictEqual(external.properties.target, "_blank")
    assert.strictEqual(external.children.length, 1)
    assert.strictEqual(internal.properties.target, undefined)
  })

  test("prettyLinks: false keeps the link text; text that isn't a single text node is left alone", () => {
    const off = run([a("folder/note")], { opts: { prettyLinks: false } }).nodes
    assert.strictEqual(text(off[0]), "folder/note")
    const formatted: Element = {
      type: "element",
      tagName: "a",
      properties: { href: "folder/note" },
      children: [el("em", {}, "folder/note"), { type: "text", value: " more" }],
    }
    run([formatted])
    assert.strictEqual(text(formatted.children[0] as Element), "folder/note")
    assert.strictEqual((formatted.children[1] as Text).value, " more")
    assert.ok(!classes(formatted)!.includes("alias"))
  })

  test("lazyLoad and src resolution for img, video, audio and iframe; external sources are kept", () => {
    const { nodes } = run(
      [
        el("img", { src: "a.png", alt: "a" }),
        el("video", { src: "v.mp4" }),
        el("audio", { src: "s.mp3" }),
        el("iframe", { src: "doc.pdf" }),
        el("img", { src: "https://cdn.example.com/x.png", alt: "x" }),
        el("script", { src: "x.js" }),
      ],
      { opts: { lazyLoad: true, markdownLinkResolution: "absolute" } },
    )
    assert.deepStrictEqual(
      nodes.map((n) => [n.properties.src, n.properties.loading]),
      [
        ["../a.png", "lazy"],
        ["../v.mp4", "lazy"],
        ["../s.mp3", "lazy"],
        ["../doc.pdf", "lazy"],
        ["https://cdn.example.com/x.png", "lazy"],
        ["x.js", undefined],
      ],
    )
  })

  test("only an image of a missing file gets its path as alt text", () => {
    const { nodes } = run([el("video", { src: "missing.mp4" }), el("img", { src: "#x" })])
    assert.strictEqual(nodes[0].properties.alt, undefined)
    assert.strictEqual(nodes[1].properties.alt, undefined)
  })

  test("object[data] / source[src] that are empty, fragments or external are not rewritten", () => {
    const values = ["", "#frag", "https://example.com/x.svg"]
    const { nodes } = run([
      ...values.map((data) => el("object", { data })),
      ...values.map((src) => el("source", { src })),
    ])
    assert.deepStrictEqual(
      nodes.map((n) => n.properties.data ?? n.properties.src),
      [...values, ...values],
    )
  })

  test("anchors without an href are not links", () => {
    const named = el("a", { id: "here" }, "folder/x")
    run([named])
    assert.deepStrictEqual(named.properties, { id: "here" })
    assert.strictEqual(text(named), "folder/x")
  })

  test("the home page and folder pages: index always exists; a folder needs a page under it", () => {
    const { nodes } = run([a("/"), a("/fold/"), a("/folder/"), a("/a/")], {
      slug: "page",
      allSlugs: ["page", "folder/note", "a/b"],
    })
    assert.deepStrictEqual(
      nodes.map((n) => classes(n)!.includes("broken")),
      [false, true, false, false],
    )
  })

  test("a missing vault file's type is its last extension", () => {
    const { nodes } = run([a("/missing.txt.png"), a("/missing.png.txt")], { slug: "page" })
    assert.deepStrictEqual(
      nodes.map((n) => classes(n)!.includes("broken")),
      [true, false],
    )
  })

  test("permalinks: a link's heading anchor is kept when it is rebased onto the permalink", () => {
    const { nodes, file } = run([a("target#Some Heading", "Target"), a("#local")], {
      slug: "home",
      data: { relativePath: "folder/page.md" },
      allSlugs: ["home", "t", "folder/page", "folder/target"],
      permalinks: { "folder/page.md": "home", "folder/target.md": "t" },
    })
    assert.strictEqual(nodes[0].properties.href, "./t#some-heading")
    assert.strictEqual(nodes[1].properties.href, "#local")
    assert.deepStrictEqual(file.data.links, ["t"])
  })

  test("frontmatter links: a bare #heading adds no outgoing link, note#heading links the note", () => {
    const { file } = run([], {
      data: { frontmatterLinks: ["#intro", "other#part", "https://example.com"] },
      opts: { markdownLinkResolution: "absolute" },
    })
    assert.deepStrictEqual(file.data.links, ["other"])
  })
})

describe("links to removed pages: marks that change", () => {
  const link = (slug: string): Element => ({
    type: "element",
    tagName: "a",
    properties: { href: `./${slug}`, "data-slug": slug, className: ["internal"] },
    children: [{ type: "text", value: slug }],
  })
  const page = (slug: string, children: Element[], data: Record<string, unknown> = {}) => {
    const file = new VFile("")
    file.data = { slug: slug as FullSlug, ...data } as VFile["data"]
    return [{ type: "root", children } as Root, file] as ProcessedContent
  }

  test("a filter that changes re-marks the link once and re-emits the page", () => {
    const home = page("index", [link("draft")])
    const changed = new Set<FullSlug>()
    markUnpublishedLinks([home], new Map([["draft", "Drafts"]]), undefined, changed)
    markUnpublishedLinks([home], new Map([["draft", "Drafts"]]), undefined, changed)
    const a = (home[0] as Root).children[0] as Element
    assert.deepStrictEqual(a.properties.className, ["internal", "broken"])
    changed.clear()
    markUnpublishedLinks([home], new Map([["draft", "ExplicitPublish"]]), undefined, changed)
    assert.deepStrictEqual([...changed], ["index"])
    assert.strictEqual(a.properties["data-filtered"], "ExplicitPublish")
    assert.deepStrictEqual(a.properties.className, ["internal", "broken"])
  })

  test("removedPages names the filter, 'filter' when unknown, and the first removed page wins", () => {
    const home = page("index", [])
    const a = page("a", [], { aliases: ["shared"] })
    const b = page("b", [], { aliases: ["shared"] })
    const noSlug = page("", [])
    noSlug[1].data.slug = undefined
    assert.deepStrictEqual(
      [...removedPages([home, a, b, noSlug], [home])],
      [
        ["a", "filter"],
        ["shared", "filter"],
        ["b", "filter"],
      ],
    )
    const reasons = removedPages([home, a, b], [home], (s) => (s === "a" ? "Drafts" : undefined))
    assert.deepStrictEqual(
      [...reasons],
      [
        ["a", "Drafts"],
        ["shared", "Drafts"],
        ["b", "filter"],
      ],
    )
  })

  test("only <a> elements are marked; the tags index is a generated target", () => {
    const div: Element = {
      type: "element",
      tagName: "div",
      properties: { "data-slug": "draft" },
      children: [],
    }
    const home = page("index", [div, link("tags")])
    markUnpublishedLinks([home], new Map([["draft", "Drafts"]]), new Set())
    assert.deepStrictEqual(div.properties, { "data-slug": "draft" })
    const tags = (home[0] as Root).children[1] as Element
    assert.strictEqual(tags.properties["data-missing"], "")
  })
})
