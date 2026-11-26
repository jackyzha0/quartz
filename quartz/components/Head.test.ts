import test, { describe } from "node:test"
import assert from "node:assert"
import { h } from "preact"
import { render } from "preact-render-to-string"
import HeadConstructor from "./Head"
import type { QuartzComponentProps } from "./types"

const Head = HeadConstructor()

function head(fileData: Record<string, unknown>): string {
  const props = {
    cfg: {
      pageTitle: "Site",
      baseUrl: "example.org",
      locale: "en-US",
      theme: { cdnCaching: false, typography: {} },
    },
    fileData: { relativePath: `${fileData.slug}.md`, frontmatter: { title: "T" }, ...fileData },
    externalResources: { css: [], js: [], additionalHead: [] },
    ctx: { cfg: { plugins: { emitters: [] } } },
  } as unknown as QuartzComponentProps
  return render(h(Head, props))
}
const meta = (html: string, property: string) =>
  new RegExp(`<meta property="${property}" content="([^"]*)"`).exec(html)?.[1]

describe("Head", () => {
  test("a note whose name ends in 'index' is an article; index pages are not", () => {
    assert.strictEqual(meta(head({ slug: "reindex" }), "og:type"), "article")
    assert.strictEqual(meta(head({ slug: "notes/reindex" }), "og:type"), "article")
    assert.strictEqual(meta(head({ slug: "index" }), "og:type"), "website")
    assert.strictEqual(meta(head({ slug: "notes/index" }), "og:type"), "website")
  })

  test("article dates: only real ones (no build-time stand-ins, no invalid published:)", () => {
    const now = new Date()
    const real = new Date("2024-05-06T00:00:00")
    const modified = new Date("2025-01-02T03:04:05.000Z")
    // created-modified-date >= 1.0.5 marks the stand-ins
    let html = head({
      slug: "a",
      dates: { created: now, modified, published: now },
      fallbackDates: ["published"],
    })
    assert.strictEqual(meta(html, "article:published_time"), undefined)
    assert.strictEqual(meta(html, "article:modified_time"), modified.toISOString())
    // older versions: an invalid `published:` gave the build time
    html = head({
      slug: "a",
      frontmatter: { title: "T", published: "not a date" },
      dates: { created: now, modified, published: now },
    })
    assert.strictEqual(meta(html, "article:published_time"), undefined)
    html = head({
      slug: "a",
      frontmatter: { title: "T", published: "2024-05-06" },
      dates: { created: now, modified, published: real },
    })
    assert.strictEqual(meta(html, "article:published_time"), real.toISOString())
    html = head({
      slug: "a",
      dates: { created: now, modified: now, published: now },
      fallbackDates: ["modified", "published"],
    })
    assert.strictEqual(meta(html, "article:modified_time"), undefined)
  })
})
