import assert from "node:assert/strict"
import test, { afterEach, describe } from "node:test"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { VFile } from "vfile"
import { Root } from "hast"
import { ProcessedContent } from "../vfile"
import { FilePath, FullSlug, setSlugOptions, slugifyFilePath } from "../../util/path"
import { BuildCtx } from "../../util/ctx"
import type { StaticResources } from "../../util/resources"
import { SlugRedirects, strippedAddressMoves } from "./slugRedirects"

const page = (
  relativePath: string,
  frontmatter: Record<string, unknown> = {},
): ProcessedContent => {
  const file = new VFile("")
  file.data = {
    relativePath: relativePath as FilePath,
    slug: slugifyFilePath(relativePath as FilePath),
    frontmatter: { title: relativePath, ...frontmatter },
  } as VFile["data"]
  return [{ type: "root", children: [] } as Root, file]
}

describe("redirects from addresses slugs.stripDiacritics changed", () => {
  test("pages, their folders and aliases redirect from the unstripped address", () => {
    setSlugOptions({ stripDiacritics: true })
    try {
      const content = [
        page("české/Žluťoučký kůň/poznámka.md", { aliases: ["stará"] }),
        page("plain/note.md"),
      ]
      const live = new Set(content.map(([, f]) => f.data.slug!))
      assert.deepEqual(Object.fromEntries(strippedAddressMoves(content, live)), {
        "české/žluťoučký-kůň/poznámka": "ceske/zlutoucky-kun/poznamka",
        "české/index": "ceske/index",
        "české/žluťoučký-kůň/index": "ceske/zlutoucky-kun/index",
        stará: "ceske/zlutoucky-kun/poznamka",
      })
    } finally {
      setSlugOptions(undefined)
    }
  })

  test("an old address that is a page of the site is left alone", () => {
    setSlugOptions({ stripDiacritics: true })
    try {
      const content = [page("café.md")]
      const live = new Set(["café" as FullSlug, "cafe" as FullSlug])
      assert.equal(strippedAddressMoves(content, live).size, 0)
    } finally {
      setSlugOptions(undefined)
    }
  })
})

describe("SlugRedirects emitter", () => {
  const tempDirs: string[] = []
  afterEach(async () => {
    setSlugOptions(undefined)
    await Promise.all(tempDirs.splice(0).map((dir) => fs.promises.rm(dir, { recursive: true })))
  })

  /** Runs `emit` (or `partialEmit`) into a temp output dir → output path → file contents. */
  const emitAll = async (content: ProcessedContent[], partial = false) => {
    const output = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-slug-redirects-"))
    tempDirs.push(output)
    const ctx = { argv: { output } } as unknown as BuildCtx
    const plugin = SlugRedirects()
    assert.equal(plugin.name, "SlugRedirects")
    const emitted = partial
      ? plugin.partialEmit!(ctx, content, {} as StaticResources, [])
      : plugin.emit(ctx, content, {} as StaticResources)
    const written: Record<string, string> = {}
    for await (const fp of emitted as AsyncIterable<string>) {
      written[path.relative(output, fp).split(path.sep).join("/")] = await fs.promises.readFile(
        fp,
        "utf8",
      )
    }
    return written
  }

  const redirect = (to: string, url: string) => `<!DOCTYPE html>
<html lang="en-us">
<head>
<title>${to}</title>
<link rel="canonical" href="${url}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${url}">
</head>
</html>
`

  const withAliases = (content: ProcessedContent, aliases: string[]): ProcessedContent => {
    content[1].data.aliases = aliases as FullSlug[]
    return content
  }

  test("writes a redirect at each unstripped address to the stripped one", async () => {
    setSlugOptions({ stripDiacritics: true })
    const content = [withAliases(page("české/Čeština.md", { aliases: ["stará"] }), ["stara"])]
    assert.equal(content[0][1].data.slug, "ceske/cestina")
    const expected = {
      "české/čeština.html": redirect("ceske/cestina", "../ceske/cestina"),
      "české/index.html": redirect("ceske/", "../ceske/"),
      "stará.html": redirect("ceske/cestina", "./ceske/cestina"),
    }
    assert.deepEqual(await emitAll(content), expected)
    assert.deepEqual(await emitAll(content, true), expected)
  })

  test("the redirect target is relative to the nested old address", async () => {
    setSlugOptions({ stripDiacritics: true })
    const written = await emitAll([page("Ä/b/Über.md")])
    assert.deepEqual(written, {
      "ä/b/über.html": redirect("a/b/uber", "../../a/b/uber"),
      "ä/b/index.html": redirect("a/b/", "../../a/b/"),
      "ä/index.html": redirect("a/", "../a/"),
    })
  })

  test("an old address that is another page's alias is not overwritten", async () => {
    setSlugOptions({ stripDiacritics: true })
    // a page (e.g. from a plugin that registers addresses) already answers at `české/index`
    const content = [page("české/Čeština.md"), withAliases(page("other.md"), ["české/index"])]
    assert.deepEqual(Object.keys(await emitAll(content)).sort(), ["české/čeština.html"])
  })

  test("an old address that is a page without a file (a plugin's page) is not overwritten", async () => {
    setSlugOptions({ stripDiacritics: true })
    const virtual = new VFile("")
    virtual.data = { slug: "české/index" as FullSlug, frontmatter: { title: "České" } }
    const content: ProcessedContent[] = [
      page("české/Čeština.md"),
      [{ type: "root", children: [] } as Root, virtual],
    ]
    assert.deepEqual(Object.keys(await emitAll(content)), ["české/čeština.html"])
  })

  test("nothing is emitted without slugs.stripDiacritics", async () => {
    setSlugOptions({ stripDiacritics: false })
    assert.deepEqual(await emitAll([page("české/Čeština.md", { aliases: ["stará"] })]), {})
  })
})
