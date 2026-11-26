import assert from "node:assert/strict"
import test, { describe } from "node:test"
import { VFile } from "vfile"
import { Root } from "hast"
import { ProcessedContent } from "../vfile"
import { FilePath, FullSlug, setSlugOptions, slugifyFilePath } from "../../util/path"
import { strippedAddressMoves } from "./slugRedirects"

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
