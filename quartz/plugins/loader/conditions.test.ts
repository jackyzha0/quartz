import test, { describe } from "node:test"
import assert from "node:assert"
import { getCondition, hasBacklinks } from "./conditions"
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
