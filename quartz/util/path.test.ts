import test, { describe } from "node:test"
import * as path from "./path"
import assert from "node:assert"
import { CanonicalSlug, ServerSlug, TransformOptions } from "./path"

describe("typeguards", () => {
  test("isClientSlug", () => {
    assert(path.isClientSlug("http://example.com"))
    assert(path.isClientSlug("http://example.com/index"))
    assert(path.isClientSlug("http://example.com/index.html"))
    assert(path.isClientSlug("http://example.com/"))
    assert(path.isClientSlug("https://example.com"))
    assert(path.isClientSlug("https://example.com/abc/def"))
    assert(path.isClientSlug("https://example.com/abc/def/"))
    assert(path.isClientSlug("https://example.com/abc/def#cool"))
    assert(path.isClientSlug("https://example.com/abc/def?field=1&another=2"))
    assert(path.isClientSlug("https://example.com/abc/def?field=1&another=2#cool"))
    assert(path.isClientSlug("https://example.com/abc/def.html?field=1&another=2#cool"))

    assert(!path.isClientSlug("./"))
    assert(!path.isClientSlug(""))
    assert(!path.isClientSlug("ipfs://example.com"))
    assert(!path.isClientSlug("http"))
    assert(!path.isClientSlug("https"))
  })

  test("isCanonicalSlug", () => {
    assert(path.isCanonicalSlug(""))
    assert(path.isCanonicalSlug("abc"))
    assert(path.isCanonicalSlug("notindex"))
    assert(path.isCanonicalSlug("notindex/def"))

    assert(!path.isCanonicalSlug("//"))
    assert(!path.isCanonicalSlug("index"))
    assert(!path.isCanonicalSlug("https://example.com"))
    assert(!path.isCanonicalSlug("/abc"))
    assert(!path.isCanonicalSlug("abc/"))
    assert(!path.isCanonicalSlug("abc/index"))
    assert(!path.isCanonicalSlug("abc#anchor"))
    assert(!path.isCanonicalSlug("abc?query=1"))
    assert(!path.isCanonicalSlug("index.md"))
    assert(!path.isCanonicalSlug("index.html"))
  })

  test("isRelativeURL", () => {
    assert(path.isRelativeURL("."))
    assert(path.isRelativeURL(".."))
    assert(path.isRelativeURL("./abc/def"))
    assert(path.isRelativeURL("./abc/def#an-anchor"))
    assert(path.isRelativeURL("./abc/def?query=1#an-anchor"))
    assert(path.isRelativeURL("../abc/def"))
    assert(path.isRelativeURL("./abc/def.pdf"))

    assert(!path.isRelativeURL("abc"))
    assert(!path.isRelativeURL("/abc/def"))
    assert(!path.isRelativeURL(""))
    assert(!path.isRelativeURL("./abc/def.html"))
    assert(!path.isRelativeURL("./abc/def.md"))
  })

  test("isServerSlug", () => {
    assert(path.isServerSlug("index"))
    assert(path.isServerSlug("abc/def"))
    assert(path.isServerSlug("html.energy"))
    assert(path.isServerSlug("test.pdf"))

    assert(!path.isServerSlug("."))
    assert(!path.isServerSlug("./abc/def"))
    assert(!path.isServerSlug("../abc/def"))
    assert(!path.isServerSlug("abc/def#anchor"))
    assert(!path.isServerSlug("abc/def?query=1"))
    assert(!path.isServerSlug("note with spaces"))
  })

  test("isFilePath", () => {
    assert(path.isFilePath("content/index.md"))
    assert(path.isFilePath("content/test.png"))
    assert(!path.isFilePath("../test.pdf"))
    assert(!path.isFilePath("content/test"))
    assert(!path.isFilePath("./content/test"))
  })
})

describe("transforms", () => {
  function asserts<Inp, Out>(
    pairs: [string, string][],
    transform: (inp: Inp) => Out,
    checkPre: (x: any) => x is Inp,
    checkPost: (x: any) => x is Out,
  ) {
    for (const [inp, expected] of pairs) {
      assert(checkPre(inp), `${inp} wasn't the expected input type`)
      const actual = transform(inp)
      assert.strictEqual(
        actual,
        expected,
        `after transforming ${inp}, '${actual}' was not '${expected}'`,
      )
      assert(checkPost(actual), `${actual} wasn't the expected output type`)
    }
  }

  test("canonicalizeServer", () => {
    asserts(
      [
        ["index", ""],
        ["abc/index", "abc"],
        ["abc/def", "abc/def"],
      ],
      path.canonicalizeServer,
      path.isServerSlug,
      path.isCanonicalSlug,
    )
  })

  test("canonicalizeClient", () => {
    asserts(
      [
        ["http://localhost:3000", ""],
        ["http://localhost:3000/index", ""],
        ["http://localhost:3000/test", "test"],
        ["http://example.com", ""],
        ["http://example.com/index", ""],
        ["http://example.com/index.html", ""],
        ["http://example.com/", ""],
        ["https://example.com", ""],
        ["https://example.com/abc/def", "abc/def"],
        ["https://example.com/abc/def/", "abc/def"],
        ["https://example.com/abc/def#cool", "abc/def"],
        ["https://example.com/abc/def?field=1&another=2", "abc/def"],
        ["https://example.com/abc/def?field=1&another=2#cool", "abc/def"],
        ["https://example.com/abc/def.html?field=1&another=2#cool", "abc/def"],
      ],
      path.canonicalizeClient,
      path.isClientSlug,
      path.isCanonicalSlug,
    )
  })

  test("slugifyFilePath", () => {
    asserts(
      [
        ["content/index.md", "content/index"],
        ["content/index.html", "content/index"],
        ["content/_index.md", "content/index"],
        ["/content/index.md", "content/index"],
        ["content/cool.png", "content/cool.png"],
        ["index.md", "index"],
        ["test.mp4", "test.mp4"],
        ["note with spaces.md", "note-with-spaces"],
      ],
      path.slugifyFilePath,
      path.isFilePath,
      path.isServerSlug,
    )
  })

  test("transformInternalLink", () => {
    asserts(
      [
        ["", "."],
        [".", "."],
        ["./", "./"],
        ["./index", "./"],
        ["./index#abc", "./#abc"],
        ["./index.html", "./"],
        ["./index.md", "./"],
        ["./index.css", "./index.css"],
        ["content", "./content"],
        ["content/test.md", "./content/test"],
        ["content/test.pdf", "./content/test.pdf"],
        ["./content/test.md", "./content/test"],
        ["../content/test.md", "../content/test"],
        ["tags/", "./tags/"],
        ["/tags/", "./tags/"],
        ["content/with spaces", "./content/with-spaces"],
        ["content/with spaces/index", "./content/with-spaces/"],
        ["content/with spaces#and Anchor!", "./content/with-spaces#and-anchor"],
      ],
      path.transformInternalLink,
      (_x: string): _x is string => true,
      path.isRelativeURL,
    )
  })

  test("pathToRoot", () => {
    asserts(
      [
        ["", "."],
        ["abc", ".."],
        ["abc/def", "../.."],
      ],
      path.pathToRoot,
      path.isCanonicalSlug,
      path.isRelativeURL,
    )
  })
})

describe("link strategies", () => {
  const allSlugs = [
    "a/b/c",
    "a/b/d",
    "a/b/index",
    "e/f",
    "e/g/h",
    "index",
    "a/test.png",
  ] as ServerSlug[]

  describe("absolute", () => {
    const opts: TransformOptions = {
      strategy: "absolute",
      allSlugs,
    }

    test("from a/b/c", () => {
      const cur = "a/b/c" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "a/b/d", opts), "../../../a/b/d")
      assert.strictEqual(path.transformLink(cur, "a/b/index", opts), "../../../a/b/")
      assert.strictEqual(path.transformLink(cur, "e/f", opts), "../../../e/f")
      assert.strictEqual(path.transformLink(cur, "e/g/h", opts), "../../../e/g/h")
      assert.strictEqual(path.transformLink(cur, "index", opts), "../../../")
      assert.strictEqual(path.transformLink(cur, "index.png", opts), "../../../index.png")
      assert.strictEqual(path.transformLink(cur, "index#abc", opts), "../../../#abc")
      assert.strictEqual(path.transformLink(cur, "tag/test", opts), "../../../tag/test")
      assert.strictEqual(path.transformLink(cur, "a/b/c#test", opts), "../../../a/b/c#test")
      assert.strictEqual(path.transformLink(cur, "a/test.png", opts), "../../../a/test.png")
    })

    test("from a/b/index", () => {
      const cur = "a/b" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "a/b/d", opts), "../../a/b/d")
      assert.strictEqual(path.transformLink(cur, "a/b", opts), "../../a/b")
      assert.strictEqual(path.transformLink(cur, "index", opts), "../../")
    })

    test("from index", () => {
      const cur = "" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "index", opts), "./")
      assert.strictEqual(path.transformLink(cur, "a/b/c", opts), "./a/b/c")
      assert.strictEqual(path.transformLink(cur, "a/b/index", opts), "./a/b/")
    })
  })

  describe("shortest", () => {
    const opts: TransformOptions = {
      strategy: "shortest",
      allSlugs,
    }

    test("from a/b/c", () => {
      const cur = "a/b/c" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "d", opts), "../../../a/b/d")
      assert.strictEqual(path.transformLink(cur, "h", opts), "../../../e/g/h")
      assert.strictEqual(path.transformLink(cur, "a/b/index", opts), "../../../a/b/")
      assert.strictEqual(path.transformLink(cur, "a/b/index.png", opts), "../../../a/b/index.png")
      assert.strictEqual(path.transformLink(cur, "a/b/index#abc", opts), "../../../a/b/#abc")
      assert.strictEqual(path.transformLink(cur, "index", opts), "../../../")
      assert.strictEqual(path.transformLink(cur, "index.png", opts), "../../../index.png")
      assert.strictEqual(path.transformLink(cur, "test.png", opts), "../../../a/test.png")
      assert.strictEqual(path.transformLink(cur, "index#abc", opts), "../../../#abc")
    })

    test("from a/b/index", () => {
      const cur = "a/b" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "d", opts), "../../a/b/d")
      assert.strictEqual(path.transformLink(cur, "h", opts), "../../e/g/h")
      assert.strictEqual(path.transformLink(cur, "a/b/index", opts), "../../a/b/")
      assert.strictEqual(path.transformLink(cur, "index", opts), "../../")
    })

    test("from index", () => {
      const cur = "" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "d", opts), "./a/b/d")
      assert.strictEqual(path.transformLink(cur, "h", opts), "./e/g/h")
      assert.strictEqual(path.transformLink(cur, "a/b/index", opts), "./a/b/")
      assert.strictEqual(path.transformLink(cur, "index", opts), "./")
    })
  })

  describe("relative", () => {
    const opts: TransformOptions = {
      strategy: "relative",
      allSlugs,
    }

    test("from a/b/c", () => {
      const cur = "a/b/c" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "d", opts), "./d")
      assert.strictEqual(path.transformLink(cur, "index", opts), "./")
      assert.strictEqual(path.transformLink(cur, "../../../index", opts), "../../../")
      assert.strictEqual(path.transformLink(cur, "../../../index.png", opts), "../../../index.png")
      assert.strictEqual(path.transformLink(cur, "../../../index#abc", opts), "../../../#abc")
      assert.strictEqual(path.transformLink(cur, "../../../", opts), "../../../")
      assert.strictEqual(
        path.transformLink(cur, "../../../a/test.png", opts),
        "../../../a/test.png",
      )
      assert.strictEqual(path.transformLink(cur, "../../../e/g/h", opts), "../../../e/g/h")
      assert.strictEqual(path.transformLink(cur, "../../../e/g/h", opts), "../../../e/g/h")
      assert.strictEqual(path.transformLink(cur, "../../../e/g/h#abc", opts), "../../../e/g/h#abc")
    })

    test("from a/b/index", () => {
      const cur = "a/b" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "../../index", opts), "../../")
      assert.strictEqual(path.transformLink(cur, "../../", opts), "../../")
      assert.strictEqual(path.transformLink(cur, "../../e/g/h", opts), "../../e/g/h")
      assert.strictEqual(path.transformLink(cur, "c", opts), "./c")
    })

    test("from index", () => {
      const cur = "" as CanonicalSlug
      assert.strictEqual(path.transformLink(cur, "e/g/h", opts), "./e/g/h")
      assert.strictEqual(path.transformLink(cur, "a/b/index", opts), "./a/b/")
    })
  })
})
