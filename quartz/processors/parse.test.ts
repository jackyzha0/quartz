import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { createHtmlProcessor, createMdProcessor, parseMarkdown, readContentFile } from "./parse"
import type { Root as MdRoot } from "mdast"
import type { Root as HtmlRoot } from "hast"
import type { VFile } from "vfile"
import { toHtml } from "hast-util-to-html"
import type { BuildCtx } from "../util/ctx"
import { isContentError } from "../util/pluginErrors"
import type { FilePath } from "../util/path"

describe("readContentFile", () => {
  test("reads a file", async () => {
    const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-parse-"))
    try {
      const fp = path.join(dir, "note.md")
      await fs.promises.writeFile(fp, "# hi")
      assert.strictEqual((await readContentFile(fp as FilePath)).toString(), "# hi")
    } finally {
      await fs.promises.rm(dir, { recursive: true })
    }
  })

  test("a file that can't be read is a content error", async () => {
    const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-parse-"))
    try {
      // a directory named like a note, and a file that is gone
      await fs.promises.mkdir(path.join(dir, "folder.md"))
      for (const [name, reason] of [
        ["folder.md", "it is a directory (EISDIR)"],
        ["missing.md", "it no longer exists (ENOENT)"],
      ]) {
        await assert.rejects(
          readContentFile(path.join(dir, name) as FilePath),
          (err: Error) =>
            isContentError(err) && err.message === `Cannot read \`${name}\`: ${reason}`,
        )
      }
    } finally {
      await fs.promises.rm(dir, { recursive: true })
    }
  })
})

describe("parseMarkdown (one thread)", () => {
  // a transformer that records which of its hooks ran, in which order
  const recorder = (name: string, log: string[]) => ({
    name,
    textTransform: (_ctx: unknown, src: string) => {
      log.push(`${name}:text`)
      return `${src}\n\n${name}`
    },
    markdownPlugins: () => [
      () => (tree: MdRoot) => {
        log.push(`${name}:md`)
        tree.children.push({ type: "paragraph", children: [{ type: "text", value: `md-${name}` }] })
      },
    ],
    htmlPlugins: () => [
      () => (tree: HtmlRoot, file: VFile) => {
        log.push(`${name}:html`)
        file.data[`html-${name}` as "slug"] = toHtml(tree) as never
      },
    ],
  })

  test("runs text, Markdown and HTML transforms in plugin order and sets the file's paths", async () => {
    // Quartz passes POSIX-style paths (its glob yields them on Windows too)
    const posix = (p: string) => p.split(path.sep).join("/")
    const dir = posix(await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-parse-")))
    try {
      await fs.promises.mkdir(`${dir}/Sub Folder`)
      const a = `${dir}/Sub Folder/My Note.md`
      const b = `${dir}/other.md`
      await fs.promises.writeFile(a, "\n\n  # Title  \n\n")
      await fs.promises.writeFile(b, "text")
      const log: string[] = []
      const ctx = {
        argv: { directory: dir, verbose: false, concurrency: 1 },
        // a transformer may implement any subset of the hooks
        cfg: {
          plugins: { transformers: [recorder("one", log), { name: "bare" }, recorder("two", log)] },
        },
        // a frontmatter permalink is the page's address
        permalinks: { "other.md": "elsewhere/page" },
      } as unknown as BuildCtx
      const res = await parseMarkdown(ctx, [a, b] as FilePath[])

      assert.deepStrictEqual(
        res.map(([, file]) => [file.data.relativePath, file.data.slug, file.data.filePath]),
        [
          ["Sub Folder/My Note.md", "sub-folder/my-note", a],
          ["other.md", "elsewhere/page", b],
        ],
      )
      // the text is trimmed before the first textTransform, which sees what the one before returned
      assert.strictEqual(String(res[0][1].value), "# Title\n\none\n\ntwo")
      // per file: all text transforms, then Markdown plugins, then (after all files) HTML plugins
      assert.deepStrictEqual(log, [
        "one:text",
        "two:text",
        "one:md",
        "two:md",
        "one:text",
        "two:text",
        "one:md",
        "two:md",
        "one:html",
        "two:html",
        "one:html",
        "two:html",
      ])
      const data = res[0][1].data as Record<string, string>
      // Markdown plugins ran in order, and remark-rehype turned the Markdown AST into HTML
      assert.strictEqual(
        data["html-one"],
        "<h1>Title</h1>\n<p>one</p>\n<p>two</p>\n<p>md-one</p>\n<p>md-two</p>",
      )
      assert.strictEqual(res[0][0].type, "root")
      assert.strictEqual(toHtml(res[0][0] as HtmlRoot), data["html-two"])
    } finally {
      await fs.promises.rm(dir, { recursive: true })
    }
  })

  test("raw HTML in Markdown is kept (allowDangerousHtml)", async () => {
    const ctx = { cfg: { plugins: { transformers: [] } } } as unknown as BuildCtx
    const md = createMdProcessor(ctx)
    const ast = md.parse('<div class="x">hi</div>')
    const html = await createHtmlProcessor(ctx).run(await md.run(ast))
    assert.strictEqual(toHtml(html, { allowDangerousHtml: true }), '<div class="x">hi</div>')
  })
})
