import test, { describe } from "node:test"
import assert from "node:assert"
import { getCondition, hasBacklinks, registerCondition } from "./conditions"
import type { QuartzComponentProps } from "../../components/types"

type Props = Pick<QuartzComponentProps, "fileData" | "allFiles">

const props = (slug: string, allFiles: Record<string, unknown>[]): Props =>
  ({ fileData: { slug }, allFiles }) as unknown as Props

describe("has-backlinks condition", () => {
  test("is registered as a built-in condition", () => {
    assert.ok(getCondition("has-backlinks"))
  })

  test("true when another file links to the page", () => {
    const p = props("target", [
      { slug: "index", links: ["target"] },
      { slug: "target", links: [] },
    ])
    assert.strictEqual(hasBacklinks(p), true)
    assert.strictEqual(getCondition("has-backlinks")!(p as QuartzComponentProps), true)
  })

  test("false when nothing links to the page", () => {
    const p = props("target", [{ slug: "index", links: ["other"] }, { slug: "target" }])
    assert.strictEqual(hasBacklinks(p), false)
  })

  test("compares against the simplified slug (folder index pages)", () => {
    // links are stored as simple slugs: "folder/index" is linked as "folder/"
    const p = props("folder/index", [{ slug: "a", links: ["folder/"] }])
    assert.strictEqual(hasBacklinks(p), true)
  })

  test("ignores links from unlisted pages, like the backlinks component", () => {
    const p = props("target", [{ slug: "secret", unlisted: true, links: ["target"] }])
    assert.strictEqual(hasBacklinks(p), false)
  })

  test("does not read fileData.backlinks (nothing produces it)", () => {
    const p = {
      fileData: { slug: "target", backlinks: ["x"] },
      allFiles: [],
    } as unknown as Props
    assert.strictEqual(hasBacklinks(p), false)
  })

  test("false when fileData has no slug or allFiles is missing", () => {
    assert.strictEqual(hasBacklinks({ fileData: {}, allFiles: [] } as unknown as Props), false)
    assert.strictEqual(hasBacklinks({ fileData: { slug: "a" } } as unknown as Props), false)
  })
})

describe("index conditions (#2465)", () => {
  const run = (name: string, slug: string | undefined) =>
    getCondition(name)!({ fileData: { slug }, allFiles: [] } as unknown as QuartzComponentProps)

  test("is-index is true only on the root index page", () => {
    assert.strictEqual(run("is-index", "index"), true)
    assert.strictEqual(run("is-index", "folder/index"), false)
    assert.strictEqual(run("is-index", "page"), false)
    assert.strictEqual(run("is-index", undefined), false)
  })

  test("is-index and not-index are complements", () => {
    for (const slug of ["index", "folder/index", "a/b", undefined]) {
      assert.strictEqual(run("is-index", slug), !run("not-index", slug))
    }
  })

  test("is-folder-index matches folder index pages, not the root index", () => {
    assert.strictEqual(run("is-folder-index", "folder/index"), true)
    assert.strictEqual(run("is-folder-index", "a/b/index"), true)
    assert.strictEqual(run("is-folder-index", "index"), false)
    assert.strictEqual(run("is-folder-index", "folder/indexes"), false)
    assert.strictEqual(run("is-folder-index", undefined), false)
  })
})

describe("not-<condition> negation", () => {
  const withTags = { fileData: { slug: "a", frontmatter: { tags: ["x"] } }, allFiles: [] }
  const noTags = { fileData: { slug: "a", frontmatter: {} }, allFiles: [] }
  const call = (name: string, p: unknown) => getCondition(name)!(p as QuartzComponentProps)

  test("not-has-tags negates has-tags", () => {
    assert.strictEqual(call("not-has-tags", withTags), false)
    assert.strictEqual(call("not-has-tags", noTags), true)
  })

  test("negates custom conditions too", () => {
    registerCondition("is-draft-test", (p) => p.fileData.slug === "draft")
    assert.strictEqual(call("not-is-draft-test", { fileData: { slug: "draft" } }), false)
    assert.strictEqual(call("not-is-draft-test", { fileData: { slug: "x" } }), true)
  })

  test("an exact name wins over negation (not-index is its own built-in)", () => {
    assert.strictEqual(call("not-index", { fileData: { slug: "index" } }), false)
    assert.strictEqual(call("not-index", { fileData: { slug: "a" } }), true)
  })

  test("unknown names stay unknown", () => {
    assert.strictEqual(getCondition("not-nonexistent"), undefined)
    assert.strictEqual(getCondition("not-"), undefined)
    assert.strictEqual(getCondition("nonexistent"), undefined)
  })

  test("double negation works", () => {
    assert.strictEqual(call("not-not-has-tags", withTags), true)
  })
})
