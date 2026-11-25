import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { afterEach, describe, test } from "node:test"
import type { BuildCtx } from "../../util/ctx"
import { type FilePath, type FullSlug, joinSegments } from "../../util/path"
import type { StaticResources } from "../../util/resources"
import { removeStalePageOutput } from "../pageTypes/dispatcher"
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

function page(
  slug: string,
  relativePath: string,
  title = slug,
  aliases: string[] = [],
): ProcessedContent {
  return defaultProcessedContent({
    slug: slug as FullSlug,
    relativePath: relativePath as FilePath,
    frontmatter: { title },
    aliases: aliases as FullSlug[],
  })
}

async function context(enableAliases = false): Promise<BuildCtx> {
  const output = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-short-permalinks-"))
  outputs.push(output)
  return {
    argv: { output },
    cfg: {
      configuration: { locale: "en-US" },
      plugins: { emitters: enableAliases ? [{ name: "AliasRedirects" }] : [] },
    },
  } as unknown as BuildCtx
}

async function isCaseSensitive(directory: string): Promise<boolean> {
  await fs.mkdir(directory, { recursive: true })
  await fs.writeFile(path.join(directory, "CheckCase"), "")
  return fs.access(path.join(directory, "checkcase")).then(
    () => false,
    (err: NodeJS.ErrnoException) => {
      assert.strictEqual(err.code, "ENOENT")
      return true
    },
  )
}

async function emittedFiles(
  result: FilePath[] | ReturnType<NonNullable<ReturnType<typeof ShortPermalinks>["partialEmit"]>>,
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

  test("skips collision listings that would reveal an unlisted page", async () => {
    const ctx = await context()
    const listed = page("article", "notes/a.md")
    const unlisted = page("unlisted", "notes/e.md")
    unlisted[1].data.unlisted = true
    assert.strictEqual(shortPermalinkHash("notes/a.md", 1), shortPermalinkHash("notes/e.md", 1))
    const plugin = ShortPermalinks({ hashLength: 1 })
    const resources = {} as StaticResources
    const [redirect] = await emittedFiles(await plugin.emit(ctx, [unlisted], resources))
    assert.match(await fs.readFile(redirect, "utf8"), /location\.replace\("\.\.\/unlisted"\)/)

    assert(plugin.partialEmit)
    const outputs = await emittedFiles(plugin.partialEmit(ctx, [listed, unlisted], resources, []))
    assert.deepStrictEqual(outputs, [])
    await assert.rejects(fs.access(redirect), { code: "ENOENT" })
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

  test("preserves case-distinct URLs where supported and handles case collisions otherwise", async () => {
    const ctx = await context()
    const caseSensitive = await isCaseSensitive(path.join(ctx.argv.output, "s"))
    const seen = new Map<string, { hash: string; sourcePath: string }>()
    let pair:
      [{ hash: string; sourcePath: string }, { hash: string; sourcePath: string }] | undefined
    for (let i = 0; i < 1000 && !pair; i++) {
      const sourcePath = `notes/case-${i}.md`
      const hash = shortPermalinkHash(sourcePath, 1)
      const previous = seen.get(hash.toLowerCase())
      if (previous && previous.hash !== hash) pair = [previous, { hash, sourcePath }]
      else seen.set(hash.toLowerCase(), { hash, sourcePath })
    }
    assert(pair, "expected two case-distinct hashes")

    const options = { hashLength: 1 }
    const ordered = [...pair].sort((a, b) => (a.hash < b.hash ? -1 : 1))
    const content = ordered.map(({ sourcePath }, i) => page(`case-${i}`, sourcePath))
    const expected = ordered.map(({ hash }) => joinSegments(ctx.argv.output, "s", `${hash}.html`))
    const resources = {} as StaticResources
    const plugin = ShortPermalinks(options)
    assert.deepStrictEqual(await emittedFiles(await plugin.emit(ctx, [content[1]], resources)), [
      expected[1],
    ])
    assert(plugin.partialEmit)
    const updated = await emittedFiles(plugin.partialEmit(ctx, content, resources, []))
    assert.deepStrictEqual(updated, [expected[0]])

    for (const [i, file] of expected.entries()) {
      const html = await fs.readFile(file, "utf8")
      if (caseSensitive) {
        assert.match(html, new RegExp(`location\\.replace\\("\\.\\./case-${i}"\\)`))
      } else {
        assert.match(html, /Did you mean one of these pages/)
        assert.match(html, />case-0</)
        assert.match(html, />case-1</)
      }
    }
    const skip = ShortPermalinks({ ...options, onCollision: "skip" })
    const files = await emittedFiles(await skip.emit(ctx, content, resources))
    assert.deepStrictEqual(files.sort(), caseSensitive ? expected : [])
  })

  test("does not overwrite case-insensitive page paths", async () => {
    const ctx = await context()
    const source = "notes/article.md"
    const hash = shortPermalinkHash(source)
    const occupied = `s/${hash === hash.toLowerCase() ? hash.toUpperCase() : hash.toLowerCase()}`
    assert.notStrictEqual(occupied, `s/${hash}`)
    const plugin = ShortPermalinks()
    const files = await emittedFiles(
      await plugin.emit(
        ctx,
        [page("article", source), page(occupied, `${occupied}.md`)],
        {} as StaticResources,
      ),
    )
    const redirect = joinSegments(ctx.argv.output, "s", `${hash}.html`)
    assert(!files.some((file) => file === redirect))
  })

  test("recreates an unchanged redirect deleted by the page dispatcher", async () => {
    const ctx = await context()
    const sourcePath = "notes/a.md"
    const original = page("article", sourcePath)
    const resources = {} as StaticResources
    const plugin = ShortPermalinks({ hashLength: 1 })
    const [redirect] = await emittedFiles(await plugin.emit(ctx, [original], resources))
    const originalHtml = await fs.readFile(redirect, "utf8")
    const draftSource = `s/${shortPermalinkHash(sourcePath, 1)}.md` as FilePath
    await removeStalePageOutput(ctx.argv.output, draftSource, new Set(["article" as FullSlug]))
    await assert.rejects(fs.access(redirect), { code: "ENOENT" })

    assert(plugin.partialEmit)
    const outputs = await emittedFiles(
      plugin.partialEmit(ctx, [original], resources, [{ type: "add", path: draftSource }]),
    )
    assert.deepStrictEqual(outputs, [redirect])
    assert.strictEqual(await fs.readFile(redirect, "utf8"), originalHtml)
  })

  test("reserves resolved aliases and permalink source redirects", async () => {
    const ctx = await context(true)
    const source = "notes/article.md"
    const hash = shortPermalinkHash(source)
    const shortSlug = `s/${hash}`
    const relative = page("folder/note", "folder/note.md", "Note", [`../${shortSlug}`])
    const moved = page("custom-address", `${shortSlug}.md`, "Permalinked", [shortSlug])
    for (const owner of [relative, moved]) {
      const plugin = ShortPermalinks()
      const result = await plugin.emit(ctx, [page("article", source), owner], {} as StaticResources)
      const files = await emittedFiles(result)
      assert(files.every((file) => file !== joinSegments(ctx.argv.output, `${shortSlug}.html`)))
    }
  })

  for (const indexName of ["index", "INDEX"]) {
    test(`removes a flat short redirect when a new ${indexName} page occupies its route`, async () => {
      const ctx = await context()
      const source = "notes/article.md"
      const hash = shortPermalinkHash(source)
      const shortSlug = `s/${hash}`
      const original = page("article", source)
      const plugin = ShortPermalinks()
      const resources = {} as StaticResources
      const [flat] = await emittedFiles(await plugin.emit(ctx, [original], resources))
      const index = joinSegments(ctx.argv.output, shortSlug, `${indexName}.html`)
      await fs.mkdir(path.dirname(index), { recursive: true })
      await fs.writeFile(index, "page")

      assert(plugin.partialEmit)
      await emittedFiles(
        plugin.partialEmit(
          ctx,
          [original, defaultProcessedContent({ slug: `${shortSlug}/${indexName}` as FullSlug })],
          resources,
          [],
        ),
      )
      await assert.rejects(fs.access(flat), { code: "ENOENT" })
      assert.strictEqual(await fs.readFile(index, "utf8"), "page")
    })
  }

  test("preserves a flat file taken over by a content page or alias on rebuild", async () => {
    const source = "notes/article.md"
    const shortSlug = `s/${shortPermalinkHash(source)}`
    const original = page("article", source)
    const resources = {} as StaticResources
    for (const owner of [
      page(shortSlug, `${shortSlug}.md`),
      page("new-address", `${shortSlug}.md`, "Alias owner", [shortSlug]),
    ]) {
      const ctx = await context(true)
      const plugin = ShortPermalinks()
      const [flat] = await emittedFiles(await plugin.emit(ctx, [original], resources))
      await fs.writeFile(flat, "replacement")
      assert(plugin.partialEmit)
      await emittedFiles(plugin.partialEmit(ctx, [original, owner], resources, []))
      assert.strictEqual(await fs.readFile(flat, "utf8"), "replacement")
    }
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
