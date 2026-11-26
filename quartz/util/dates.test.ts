import test, { describe } from "node:test"
import assert from "node:assert"
import { realDate } from "./dates"
import type { QuartzPluginData } from "../plugins/vfile"

const data = (d: Record<string, unknown>) => d as unknown as QuartzPluginData

describe("realDate", () => {
  const now = new Date()
  const fm = new Date("2024-05-06T00:00:00")

  test("drops dates the date plugin lists in fallbackDates", () => {
    const d = data({ dates: { modified: now, published: now }, fallbackDates: ["published"] })
    assert.strictEqual(realDate(d, "published"), undefined)
    assert.strictEqual(realDate(d, "modified"), now)
  })

  test("without fallbackDates (older plugin), published needs a matching frontmatter value", () => {
    assert.strictEqual(realDate(data({ dates: { published: now } }), "published"), undefined)
    assert.strictEqual(
      realDate(
        data({ frontmatter: { published: "nope" }, dates: { published: now } }),
        "published",
      ),
      undefined,
    )
    assert.strictEqual(
      realDate(
        data({ frontmatter: { published: "2024-05-06" }, dates: { published: fm } }),
        "published",
      ),
      fm,
    )
    assert.strictEqual(realDate(data({ dates: { modified: now } }), "modified"), now)
  })

  test("missing and invalid dates", () => {
    assert.strictEqual(realDate(data({}), "modified"), undefined)
    assert.strictEqual(
      realDate(data({ dates: { modified: new Date(NaN) } }), "modified"),
      undefined,
    )
    assert.strictEqual(realDate(data({ dates: { modified: now } }), undefined), undefined)
  })
})
