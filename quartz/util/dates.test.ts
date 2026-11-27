import test, { describe } from "node:test"
import assert from "node:assert"
import { dateIsFromFrontmatter, realDate } from "./dates"
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

describe("dateIsFromFrontmatter", () => {
  test("a date-time value is compared as written, a date-only one as local midnight", () => {
    const d = data({ frontmatter: { published: "2024-01-02T10:00:00" } })
    assert.strictEqual(dateIsFromFrontmatter(d, new Date("2024-01-02T10:00:00"), "published"), true)
    assert.strictEqual(
      dateIsFromFrontmatter(d, new Date("2024-01-02T00:00:00"), "published"),
      false,
    )
    const dateOnly = data({ frontmatter: { published: "2024-01-02" } })
    assert.strictEqual(
      dateIsFromFrontmatter(dateOnly, new Date("2024-01-02T00:00:00"), "published"),
      true,
    )
  })

  test("YAML dates and timestamps compare by value; other values and missing ones never match", () => {
    const when = new Date("2024-01-02T10:00:00Z")
    const of = (published: unknown) => data({ frontmatter: { published } })
    assert.strictEqual(dateIsFromFrontmatter(of(new Date(when)), when, "published"), true)
    assert.strictEqual(dateIsFromFrontmatter(of(when.getTime()), when, "published"), true)
    assert.strictEqual(dateIsFromFrontmatter(of([when.toISOString()]), when, "published"), false)
    assert.strictEqual(dateIsFromFrontmatter(of(""), new Date(0), "published"), false)
    assert.strictEqual(dateIsFromFrontmatter(of(null), new Date(0), "published"), false)
    assert.strictEqual(dateIsFromFrontmatter(of(when), new Date(NaN), "published"), false)
    // the page's default date type
    const d = data({ frontmatter: { modified: when.toISOString() }, defaultDateType: "modified" })
    assert.strictEqual(dateIsFromFrontmatter(d, when), true)
  })
})
