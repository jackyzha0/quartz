import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { afterEach, describe, test } from "node:test"
import type { BuildCtx } from "../../util/ctx"
import { type FilePath, type FullSlug, joinSegments } from "../../util/path"
import type { StaticResources } from "../../util/resources"
import { defaultProcessedContent, type ProcessedContent } from "../vfile"
import { ShortPermalinks, shortPermalinkHash } from "./shortPermalinks"

interface ShortPermalinkPage {
  slug: string
  sourcePath: string
  title: string
}

const outputs: string[] = []

afterEach(async () => {
  await Promise.all(
    outputs.splice(0).map((output) => fs.rm(output, { recursive: true, force: true })),
  )
})

function page(slug: string, relativePath: string, title = slug): ProcessedContent {
  return defaultProcessedContent({
    slug: slug as FullSlug,
    relativePath: relativePath as FilePath,
    frontmatter: { title },
  })
}

async function context(): Promise<BuildCtx> {
  const output = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-short-permalinks-"))
  outputs.push(output)
  return {
    argv: { output },
    cfg: { configuration: { locale: "en-US" } },
  } as unknown as BuildCtx
}

async function emittedFiles(
  result: ReturnType<NonNullable<ReturnType<typeof ShortPermalinks>["partialEmit"]>>,
): Promise<FilePath[]> {
  if (result === null) return []
  if (Symbol.asyncIterator in result) {
    const files: FilePath[] = []
    for await (const file of result) files.push(file)
    return files
  }
  return result
}

describe("shortPermalinkHash", () => {
  test("is deterministic, alphanumeric, and changes with the source path", () => {
    const first = shortPermalinkHash("2024/week/C言語.md", 12)
    assert.strictEqual(first, shortPermalinkHash("2024/week/C言語.md", 12))
    assert.notStrictEqual(first, shortPermalinkHash("2024/week/other.md", 12))
    assert.match(first, /^[0-9A-Za-z]{12}$/)
  })

  test("rejects hash lengths outside the SHA-256 base62 range", () => {
    assert.throws(() => shortPermalinkHash("note.md", 0), /between 1 and 43/)
    assert.throws(() => shortPermalinkHash("note.md", 44), /between 1 and 43/)
    assert.throws(() => shortPermalinkHash("note.md", 1.5), /integer/)
  })
})

describe("ShortPermalinks", () => {
  test("emits a static redirect based on the source path", async () => {
    const ctx = await context()
    const content = [page("日本語/電卓", "notes/日本語/電卓.md", "電卓")]
    const plugin = ShortPermalinks({ prefix: "go", hashLength: 10 })
    const files = await plugin.emit(ctx, content, {} as StaticResources)
    const emitted = Symbol.asyncIterator in files ? await emittedFiles(files) : files

    const hash = shortPermalinkHash("notes/日本語/電卓.md", 10)
    const redirectPath = joinSegments(ctx.argv.output, "go", `${hash}.html`) as FilePath
    assert.deepStrictEqual(emitted, [redirectPath])

    const html = await fs.readFile(redirectPath, "utf8")
    assert.match(html, /<link rel="canonical" href="\.\.\/日本語\/電卓">/)
    assert.match(html, /<meta http-equiv="refresh" content="0; url=\.\.\/日本語\/電卓">/)
    assert.match(html, /window\.location\.replace/)
    assert.match(html, />Continue to 電卓<\/a>/)
  })

  test("keeps the short link when only the published permalink changes", async () => {
    const ctx = await context()
    const plugin = ShortPermalinks()
    const initial = await plugin.emit(
      ctx,
      [page("original-address", "notes/stable.md")],
      {} as StaticResources,
    )
    const initialFiles = Symbol.asyncIterator in initial ? await emittedFiles(initial) : initial
    const changed = await plugin.emit(
      ctx,
      [page("custom-address", "notes/stable.md")],
      {} as StaticResources,
    )
    const changedFiles = Symbol.asyncIterator in changed ? await emittedFiles(changed) : changed

    assert.deepStrictEqual(changedFiles, initialFiles)
    const html = await fs.readFile(changedFiles[0], "utf8")
    assert.match(html, /href="\.\.\/custom-address"/)
  })

  test("emits a disambiguation page for deterministic hash collisions", async () => {
    const ctx = await context()
    const seen = new Map<string, ShortPermalinkPage>()
    let pair: [ShortPermalinkPage, ShortPermalinkPage] | undefined
    for (let i = 0; pair === undefined; i++) {
      const candidate = {
        slug: `article-${i}`,
        sourcePath: `notes/article-${i}.md`,
        title: `Article ${i}`,
      }
      const hash = shortPermalinkHash(candidate.sourcePath, 1)
      const previous = seen.get(hash)
      if (previous) pair = [previous, candidate]
      else seen.set(hash, candidate)
    }

    const content = pair.map(({ slug, sourcePath, title }) => page(slug, sourcePath, title))
    const plugin = ShortPermalinks({ hashLength: 1 })
    const result = await plugin.emit(ctx, content, {} as StaticResources)
    const emitted = Symbol.asyncIterator in result ? await emittedFiles(result) : result
    assert.strictEqual(emitted.length, 1)

    const html = await fs.readFile(emitted[0], "utf8")
    assert.match(html, /Did you mean one of these pages\?/)
    assert.match(html, new RegExp(pair[0].title))
    assert.match(html, new RegExp(pair[1].title))
  })

  test("can skip colliding hashes", async () => {
    const ctx = await context()
    const byHash = new Map<string, ProcessedContent>()
    let collision: ProcessedContent[] | undefined
    for (let i = 0; collision === undefined; i++) {
      const candidate = page(`article-${i}`, `notes/article-${i}.md`)
      const hash = shortPermalinkHash(candidate[1].data.relativePath as string, 1)
      const previous = byHash.get(hash)
      if (previous) collision = [previous, candidate]
      else byHash.set(hash, candidate)
    }

    const plugin = ShortPermalinks({ hashLength: 1, onCollision: "skip" })
    const result = await plugin.emit(ctx, collision, {} as StaticResources)
    const emitted = Symbol.asyncIterator in result ? await emittedFiles(result) : result
    assert.deepStrictEqual(emitted, [])
  })

  test("does not overwrite an existing page at a generated short path", async () => {
    const ctx = await context()
    const original = page("article", "notes/article.md")
    const hash = shortPermalinkHash("notes/article.md", 8)
    const occupied = page(`s/${hash}`, `s/${hash}.md`)
    const plugin = ShortPermalinks()
    const result = await plugin.emit(ctx, [original, occupied], {} as StaticResources)
    const emitted = Symbol.asyncIterator in result ? await emittedFiles(result) : result

    const occupiedPath = joinSegments(ctx.argv.output, "s", `${hash}.html`)
    assert.ok(emitted.every((file) => file !== occupiedPath))
  })

  test("removes stale redirects during an incremental rebuild", async () => {
    const ctx = await context()
    const original = page("article", "notes/article.md")
    const hash = shortPermalinkHash("notes/article.md", 8)
    const redirectPath = joinSegments(ctx.argv.output, "s", `${hash}.html`) as FilePath
    const plugin = ShortPermalinks()

    const initial = await plugin.emit(ctx, [original], {} as StaticResources)
    if (Symbol.asyncIterator in initial) await emittedFiles(initial)
    await fs.access(redirectPath)

    assert(plugin.partialEmit)
    await emittedFiles(plugin.partialEmit(ctx, [], {} as StaticResources, []))
    await assert.rejects(fs.access(redirectPath), { code: "ENOENT" })
  })

  test("does not rewrite unchanged redirects during an incremental rebuild", async () => {
    const ctx = await context()
    const original = page("article", "notes/article.md")
    const plugin = ShortPermalinks()
    const initial = await plugin.emit(ctx, [original], {} as StaticResources)
    if (Symbol.asyncIterator in initial) await emittedFiles(initial)

    assert(plugin.partialEmit)
    const unchanged = await emittedFiles(
      plugin.partialEmit(ctx, [original], {} as StaticResources, []),
    )
    assert.deepStrictEqual(unchanged, [])
  })

  test("rejects prefixes that could escape or produce invalid URLs", () => {
    assert.throws(() => ShortPermalinks({ prefix: "../outside" }), /inside the output directory/)
    assert.throws(() => ShortPermalinks({ prefix: "short links" }), /valid URL path/)
    assert.throws(
      () => ShortPermalinks({ onCollision: "invalid" as "skip" }),
      /onCollision must be either/,
    )
  })
})
