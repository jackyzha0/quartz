import test, { describe } from 'node:test'
import * as path from './path'
import assert from 'node:assert'

describe('typeguards', () => {
  test('isClientSlug', () => {
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

  test('isCanonicalSlug', () => {
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

  test('isRelativeURL', () => {
    assert(path.isRelativeURL("."))
    assert(path.isRelativeURL(".."))
    assert(path.isRelativeURL("./abc/def"))
    assert(path.isRelativeURL("./abc/def#an-anchor"))
    assert(path.isRelativeURL("./abc/def?query=1#an-anchor"))
    assert(path.isRelativeURL("../abc/def"))

    assert(!path.isRelativeURL("abc"))
    assert(!path.isRelativeURL("/abc/def"))
    assert(!path.isRelativeURL(""))
    assert(!path.isRelativeURL("../"))
    assert(!path.isRelativeURL("./"))
    assert(!path.isRelativeURL("./abc/def.html"))
    assert(!path.isRelativeURL("./abc/def.md"))
  })

  test('isServerSlug', () => {
    assert(path.isServerSlug("index"))
    assert(path.isServerSlug("abc/def"))

    assert(!path.isServerSlug("."))
    assert(!path.isServerSlug("./abc/def"))
    assert(!path.isServerSlug("../abc/def"))
    assert(!path.isServerSlug("index.html"))
    assert(!path.isServerSlug("abc/def.html"))
    assert(!path.isServerSlug("abc/def#anchor"))
    assert(!path.isServerSlug("abc/def?query=1"))
    assert(!path.isServerSlug("note with spaces"))
  })

  test('isFilePath', () => {
    assert(path.isFilePath("content/index.md"))
    assert(path.isFilePath("content/test.png"))
    assert(!path.isFilePath("../test.pdf"))
    assert(!path.isFilePath("content/test"))
    assert(!path.isFilePath("./content/test"))
  })
})


describe('transforms', () => {
  function asserts<Inp, Out>(pairs: [string, string][], transform: (inp: Inp) => Out, checkPre: (x: any) => x is Inp, checkPost: (x: any) => x is Out) {
    for (const [inp, expected] of pairs) {
      assert(checkPre(inp), `${inp} wasn't the expected input type`)
      const actual = transform(inp)
      assert.strictEqual(actual, expected, `after transforming ${inp}, '${actual}' was not '${expected}'`)
      assert(checkPost(actual), `${actual} wasn't the expected output type`)
    }
  }

  test('canonicalizeServer', () => {
    asserts([
      ["index", ""],
      ["abc/index", "abc"],
      ["abc/def", "abc/def"],
    ], path.canonicalizeServer, path.isServerSlug, path.isCanonicalSlug)
  })

  test('canonicalizeClient', () => {
    asserts([
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
    ], path.canonicalizeClient, path.isClientSlug, path.isCanonicalSlug)
  })

  describe('slugifyFilePath', () => {
    asserts([
      ["content/index.md", "content/index"],
      ["content/_index.md", "content/index"],
      ["/content/index.md", "content/index"],
      ["content/cool.png", "content/cool"],
      ["index.md", "index"],
      ["note with spaces.md", "note-with-spaces"],
    ], path.slugifyFilePath, path.isFilePath, path.isServerSlug)
  })

  describe('transformInternalLink', () => {
    asserts([
      ["", "."],
      [".", "."],
      ["./", "."],
      ["./index", "."],
      ["./index.html", "."],
      ["./index.md", "."],
      ["content", "./content"],
      ["content/test.md", "./content/test"],
      ["./content/test.md", "./content/test"],
      ["../content/test.md", "../content/test"],
      ["tags/", "./tags"],
      ["/tags/", "./tags"],
      ["content/with spaces", "./content/with-spaces"],
      ["content/with spaces#and Anchor!", "./content/with-spaces#and-anchor"],
    ], path.transformInternalLink, (_x: string): _x is string => true, path.isRelativeURL)
  })

  describe('pathToRoot', () => {
    asserts([
      ["", "."],
      ["abc", ".."],
      ["abc/def", "../.."],
    ], path.pathToRoot, path.isCanonicalSlug, path.isRelativeURL)
  })
})

