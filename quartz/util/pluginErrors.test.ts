import test, { describe, beforeEach } from "node:test"
import assert from "node:assert"
import { unified, type Plugin } from "unified"
import remarkParse from "remark-parse"
import { VFile } from "vfile"
import {
  attributePluggables,
  pluginErrorInfo,
  PluginError,
  ContentError,
  isContentError,
  unreadableFileError,
} from "./pluginErrors"
import {
  recordDiagnostic,
  resetDiagnostics,
  knownProblemsFor,
  recordFiltered,
  getDiagnostics,
  reportError,
  printDiagnosticsSummary,
} from "./diagnostics"
import { describePluginError, firstPluginFrame } from "./trace"
import { findUnresolvedLinks, reportUnresolvedLinks } from "./linkReport"
import type { BuildCtx } from "./ctx"
import type { ProcessedContent } from "../plugins/vfile"
import type { FullSlug } from "./path"

const origin = { name: "Broken", displayName: "broken-plugin", source: "@me/broken-plugin" }

function run(plugins: ReturnType<typeof attributePluggables>) {
  const file = new VFile({ value: "# hi", path: "notes/a.md" })
  file.data = { relativePath: "notes/a.md" } as VFile["data"]
  const processor = unified().use(remarkParse).use(plugins)
  return processor.run(processor.parse(file), file)
}

describe("attributePluggables", () => {
  test("sync transformer errors carry plugin, stage and file", async () => {
    const boom: Plugin = () => () => {
      throw new TypeError("nope")
    }
    await assert.rejects(run(attributePluggables([boom], origin, "markdown")), (err) => {
      const info = pluginErrorInfo(err)!
      assert.strictEqual(info.origin.displayName, "broken-plugin")
      assert.strictEqual(info.stage, "markdown")
      assert.strictEqual(info.file, "notes/a.md")
      assert.strictEqual((err as Error).message, "nope")
      assert.strictEqual((err as Error).name, "TypeError")
      return true
    })
  })

  test("async and callback-style transformers are attributed too", async () => {
    const asyncBoom: Plugin = () => async () => {
      throw new Error("async nope")
    }
    const callbackBoom: Plugin = () => (_tree: unknown, _file: unknown, next: Function) =>
      next(new Error("callback nope"))
    await assert.rejects(run(attributePluggables([asyncBoom], origin, "html")), (err) => {
      assert.strictEqual(pluginErrorInfo(err)?.stage, "html")
      return true
    })
    await assert.rejects(run(attributePluggables([callbackBoom], origin, "html")), (err) => {
      assert.strictEqual((err as Error).message, "callback nope")
      assert.ok(pluginErrorInfo(err))
      return true
    })
  })

  test("working transformers and [plugin, options] tuples behave as before", async () => {
    let seen: unknown
    const ok: Plugin<[{ value: number }]> = (opts) => () => {
      seen = opts.value
    }
    await run(attributePluggables([[ok, { value: 42 }]], origin, "markdown"))
    assert.strictEqual(seen, 42)
  })

  test("keeps attacher identity so unified still de-duplicates shared plugins", async () => {
    let runs = 0
    const shared: Plugin = () => () => {
      runs++
    }
    const a = attributePluggables([shared], origin, "markdown")
    const b = attributePluggables([shared], { ...origin, name: "Other" }, "markdown")
    assert.strictEqual(a[0], b[0])
    await run([...a, ...b])
    assert.strictEqual(runs, 1)
  })

  test("the innermost attribution wins", () => {
    const inner = new PluginError(new Error("x"), { origin, stage: "render" })
    const wrapped = attributePluggables([], origin, "markdown")
    assert.deepStrictEqual(wrapped, [])
    assert.strictEqual(pluginErrorInfo(inner)?.stage, "render")
  })
})

describe("describePluginError", () => {
  beforeEach(() => resetDiagnostics())

  test("names the plugin, stage and file, lists known problems and where to report", () => {
    recordDiagnostic({
      severity: "warning",
      area: "versions",
      plugin: "broken-plugin",
      message: "broken-plugin@2.0.0 requires Quartz >=5.1.0, but this is Quartz 5.0.0.",
    })
    const text = describePluginError({
      origin: { ...origin, version: "2.0.0", issues: "https://github.com/me/broken/issues" },
      stage: "markdown",
      file: "notes/a.md",
    })
      .join("\n")
      // strip ANSI colours
      .replace(/\x1b\[[0-9;]*m/g, "")
    assert.match(
      text,
      /plugin broken-plugin@2\.0\.0 while transforming the Markdown of notes\/a\.md/,
    )
    assert.match(text, /requires Quartz >=5\.1\.0/)
    assert.match(text, /npx quartz plugin disable broken-plugin/)
    assert.match(text, /https:\/\/github\.com\/me\/broken\/issues/)
    assert.deepStrictEqual(knownProblemsFor(origin).length, 1)
  })

  test("built-ins point to Quartz's issue tracker", () => {
    const text = describePluginError({
      origin: {
        name: "Links",
        displayName: "configuration.links",
        source: "built-in",
        builtin: true,
      },
      stage: "html",
    }).join("\n")
    assert.match(text, /Quartz built-in/)
    assert.match(text, /jackyzha0\/quartz\/issues/)
  })
})

describe("content errors", () => {
  test("are recognised through a plugin attribution", () => {
    const origin = { builtin: true, displayName: "frontmatter", source: "frontmatter" }
    const wrapped = new PluginError(new ContentError("Invalid frontmatter: bad"), {
      origin,
      stage: "markdown",
    } as never)
    assert.strictEqual(isContentError(wrapped), true)
    assert.strictEqual(isContentError(new PluginError(new Error("x"), { origin } as never)), false)
    assert.strictEqual(isContentError(undefined), false)
  })
})

describe("unresolved links report", () => {
  beforeEach(() => resetDiagnostics())

  const page = (slug: string, links: string[]): ProcessedContent => {
    const file = new VFile("")
    file.data = { slug: slug as FullSlug, links } as unknown as VFile["data"]
    return [{ type: "root", children: [] }, file]
  }
  const ctx = (extra: Partial<BuildCtx> = {}) =>
    ({
      allSlugs: ["index", "notes/a", "static/img.png", "secret"],
      argv: { verbose: false },
      ...extra,
    }) as unknown as BuildCtx

  test("ignores existing pages, assets, virtual pages and folder indexes", () => {
    const content = [
      page("index", ["notes/a", "static/img.png", "tags/x", "notes/", "/"]),
      page("tags/x", []),
    ]
    const c = ctx({
      contentIndex: new Map([["notes/index" as FullSlug, {} as never]]),
    })
    assert.deepStrictEqual(findUnresolvedLinks(c, content), [])
  })

  test("explains links to filtered pages and records one note", () => {
    recordFiltered("secret", "Drafts")
    const content = [page("index", ["secret", "missing"])]
    const unresolved = reportUnresolvedLinks(ctx(), content)
    assert.deepStrictEqual(
      unresolved.map((u) => [u.to, u.reason]),
      [
        ["secret", "removed by filter Drafts"],
        ["missing", undefined],
      ],
    )
    const notes = getDiagnostics().filter((d) => d.area === "links")
    assert.strictEqual(notes.length, 1)
    assert.match(
      notes[0].message,
      /2 links in 1 page .*index → secret \(removed by filter Drafts\)/,
    )
  })
})

describe("plugin load failures", () => {
  beforeEach(() => resetDiagnostics())

  test("firstPluginFrame prefers frames inside plugin packages", () => {
    const err = new Error("boom")
    err.stack = [
      "Error: boom",
      "    at load (node:internal/modules/esm/loader:1:1)",
      "    at file:///site/node_modules/unified/lib/index.js:5:1",
      "    at init (file:///site/node_modules/@quartz-community/graph/dist/index.js:12:5)",
      "    at loadQuartzConfig (file:///site/quartz/plugins/loader/config-loader.ts:400:1)",
    ].join("\n")
    assert.strictEqual(
      firstPluginFrame(err),
      "/site/node_modules/@quartz-community/graph/dist/index.js:12:5",
    )
    assert.strictEqual(firstPluginFrame("not an error"), undefined)
  })

  test("errors are recorded as known problems and lead the summary", (t) => {
    const lines: string[] = []
    t.mock.method(console, "error", () => {})
    t.mock.method(console, "log", (text: string) => lines.push(text))
    reportError({
      area: "plugins",
      plugin: "graph",
      message: "graph@1.0.0 failed to load its entry module: boom",
      hint: "at /x/graph/dist/index.js:1:7\nsource: @quartz-community/graph",
    })
    recordDiagnostic({ severity: "warning", area: "config", message: "some warning" })
    assert.deepStrictEqual(knownProblemsFor({ name: "graph", displayName: "graph" }), [
      "graph@1.0.0 failed to load its entry module: boom",
    ])
    printDiagnosticsSummary()
    const text = lines.join("\n").replace(/\x1b\[[0-9;]*m/g, "")
    assert.match(text, /1 error — the build continued/)
    assert.match(text, /→ at \/x\/graph\/dist\/index\.js:1:7\n.*→ source: @quartz-community\/graph/)
    assert.ok(text.indexOf("failed to load") < text.indexOf("some warning"))
  })
})

describe("unreadableFileError", () => {
  test("turns a file-system error into a content error naming the file", () => {
    const fsError = Object.assign(new Error("EACCES: permission denied, open 'x'"), {
      code: "EACCES",
    })
    const err = unreadableFileError(fsError, "notes/x.md")
    assert.ok(err && isContentError(err))
    assert.strictEqual(err.message, "Cannot read `notes/x.md`: permission denied (EACCES)")
    assert.strictEqual(err.cause, fsError)
  })

  test("leaves other errors alone", () => {
    assert.strictEqual(unreadableFileError(new TypeError("boom"), "x.md"), undefined)
  })
})
