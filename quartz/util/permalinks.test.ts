import test, { describe } from "node:test"
import assert from "node:assert"
import {
  collectPermalinks,
  normalizePermalink,
  permalinkTargets,
  slugForFile,
  type Permalinks,
} from "./permalinks"

describe("permalinks (Obsidian Publish semantics)", () => {
  test("normalizePermalink slugifies and strips slashes", () => {
    assert.strictEqual(normalizePermalink("page"), "page")
    assert.strictEqual(normalizePermalink("/a/b/"), "a/b")
    assert.strictEqual(normalizePermalink("My Page"), "my-page")
    assert.strictEqual(normalizePermalink(""), undefined)
    assert.strictEqual(normalizePermalink("/"), undefined)
    assert.strictEqual(normalizePermalink(undefined), undefined)
    assert.strictEqual(normalizePermalink(2024), "2024")
  })

  test("collectPermalinks maps files to their permalink; the address can't be taken twice", () => {
    const fm: Record<string, unknown> = {
      "folder/note.md": "page",
      "self.md": "self", // its own path: nothing to do
      "other.md": "existing", // another file's path
      "dup.md": "page", // already used by folder/note.md
    }
    const warnings: string[] = []
    const permalinks = collectPermalinks({
      files: ["folder/note.md", "self.md", "other.md", "dup.md", "existing.md"],
      permalinkOf: (f) => fm[f],
      warn: (m) => warnings.push(m),
    })
    assert.deepStrictEqual(permalinks, { "folder/note.md": "page" })
    assert.strictEqual(warnings.length, 2)
    assert.match(
      warnings[0],
      /other\.md: permalink "existing" is already the address of existing\.md/,
    )
    assert.match(
      warnings[1],
      /dup\.md: permalink "page" is already the address of folder\/note\.md/,
    )
  })

  test("slugForFile and permalinkTargets", () => {
    const permalinks = { "folder/note.md": "page" } as unknown as Permalinks
    assert.strictEqual(slugForFile("folder/note.md", permalinks), "page")
    assert.strictEqual(slugForFile("folder/other.md", permalinks), "folder/other")
    assert.deepStrictEqual([...permalinkTargets(permalinks)], [["folder/note", "page"]])
  })
})
