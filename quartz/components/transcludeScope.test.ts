import test, { describe } from "node:test"
import assert from "node:assert"
import type { Element, ElementContent } from "hast"
import { blockOf, createIdScopes, scopeTranscludedIds, sliceWithFootnotes } from "./transcludeScope"

const h = (
  tagName: string,
  properties: Element["properties"] = {},
  children: ElementContent[] = [],
): Element => ({ type: "element", tagName, properties, children })
const text = (value: string): ElementContent => ({ type: "text", value })

describe("createIdScopes", () => {
  test("a prefix per transclusion, unique on the page", () => {
    const scope = createIdScopes()
    assert.strictEqual(scope("notes/Source"), "source--")
    assert.strictEqual(scope("notes/source"), "source-2--")
    assert.strictEqual(scope("other"), "other--")
  })
})

describe("scopeTranscludedIds", () => {
  test("prefixes ids and the references to them inside the transclusion", () => {
    const el = h("div", { className: ["transclude"] }, [
      h("h2", { id: "details" }, [text("Details")]),
      h("p", {}, [
        h("a", { href: "#details" }, [text("jump")]),
        h("sup", {}, [
          h(
            "a",
            {
              href: "#user-content-fn-1",
              id: "user-content-fnref-1",
              dataFootnoteRef: "",
              ariaDescribedBy: ["footnote-label"],
            },
            [text("1")],
          ),
        ]),
      ]),
      h("section", { dataFootnotes: "" }, [
        h("h2", { id: "footnote-label" }, [text("Footnotes")]),
        h("ol", {}, [
          h("li", { id: "user-content-fn-1" }, [
            h("a", { href: "#user-content-fnref-1" }, [text("↩")]),
          ]),
        ]),
      ]),
    ])
    scopeTranscludedIds(el, "source--", "./source")
    const [heading, para, section] = el.children as Element[]
    assert.strictEqual(heading!.properties.id, "source--details")
    const [jump, sup] = para!.children as Element[]
    assert.strictEqual(jump!.properties.href, "#source--details")
    const ref = (sup!.children[0] as Element).properties
    assert.strictEqual(ref.href, "#source--user-content-fn-1")
    assert.strictEqual(ref.id, "source--user-content-fnref-1")
    assert.deepStrictEqual(ref.ariaDescribedBy, ["source--footnote-label"])
    const li = (section!.children[1] as Element).children[0] as Element
    assert.strictEqual(li.properties.id, "source--user-content-fn-1")
    assert.strictEqual((li.children[0] as Element).properties.href, "#source--user-content-fnref-1")
  })

  test("a same-page link whose target isn't in the transclusion goes to the transcluded page", () => {
    const el = h("div", {}, [h("a", { href: "#elsewhere" }, [text("x")])])
    scopeTranscludedIds(el, "source--", "./source#overview")
    assert.strictEqual((el.children[0] as Element).properties.href, "./source#elsewhere")
  })

  test("leaves inline svg and math alone, and other links", () => {
    const el = h("div", {}, [
      h("svg", {}, [h("linearGradient", { id: "grad" }), h("rect", { fill: "url(#grad)" })]),
      h("a", { href: "./other#x" }, [text("x")]),
    ])
    scopeTranscludedIds(el, "source--", "./source")
    const svg = el.children[0] as Element
    assert.strictEqual((svg.children[0] as Element).properties.id, "grad")
    assert.strictEqual((el.children[1] as Element).properties.href, "./other#x")
  })
})

describe("sliceWithFootnotes", () => {
  const page: ElementContent[] = [
    h("h2", { id: "a" }, [text("A")]),
    h("p", {}, [h("a", { href: "#user-content-fn-2", dataFootnoteRef: "" }, [text("2")])]),
    h("h2", { id: "b" }, [text("B")]),
    h("p", {}, [h("a", { href: "#user-content-fn-1", dataFootnoteRef: "" }, [text("1")])]),
    h("section", { dataFootnotes: "", className: ["footnotes"] }, [
      h("ol", {}, [h("li", { id: "user-content-fn-1" }), h("li", { id: "user-content-fn-2" })]),
    ]),
  ]
  const footnoteIds = (nodes: ElementContent[]) =>
    nodes
      .filter((n): n is Element => n.type === "element" && n.tagName === "section")
      .flatMap((s) =>
        ((s.children[0] as Element).children as Element[]).map((li) => li.properties.id),
      )

  test("the last section gets only its own footnotes, not the whole footnotes section", () => {
    assert.deepStrictEqual(footnoteIds(sliceWithFootnotes(page, 2, undefined)), [
      "user-content-fn-1",
    ])
  })

  test("an earlier section gets its footnotes too", () => {
    const slice = sliceWithFootnotes(page, 0, 2)
    assert.strictEqual(slice.length, 3)
    assert.deepStrictEqual(footnoteIds(slice), ["user-content-fn-2"])
  })

  test("a section without footnote references gets no footnotes section", () => {
    const plain = [h("h2", { id: "c" }), h("p"), page[4]!]
    assert.deepStrictEqual(footnoteIds(sliceWithFootnotes(plain, 0, undefined)), [])
  })
})

describe("block wrappers", () => {
  const wrap = (block: Element) => h("div", { className: [`el-${block.tagName}`] }, [block])
  const page: ElementContent[] = [
    wrap(h("h2", { id: "a" }, [text("A")])),
    text("\n"),
    wrap(h("p", {}, [h("a", { href: "#user-content-fn-1", dataFootnoteRef: "" }, [text("1")])])),
    text("\n"),
    wrap(
      h("section", { dataFootnotes: "", className: ["footnotes"] }, [
        h("ol", {}, [h("li", { id: "user-content-fn-1" }), h("li", { id: "user-content-fn-2" })]),
      ]),
    ),
  ]

  test("blockOf looks through Obsidian's per-block wrapper", () => {
    assert.strictEqual((blockOf(page[0]!) as Element).tagName, "h2")
    const plain = h("p")
    assert.strictEqual(blockOf(plain), plain)
    const callout = h("div", { className: ["callout"] }, [h("p")])
    assert.strictEqual(blockOf(callout), callout)
  })

  test("a heading slice gets its footnotes in the section's wrapper", () => {
    const slice = sliceWithFootnotes(page, 0, undefined)
    const wrappers = slice.filter((n): n is Element => n.type === "element")
    assert.deepStrictEqual(
      wrappers.map((w) => w.properties.className),
      [["el-h2"], ["el-p"], ["el-section"]],
    )
    const section = wrappers[2]!.children[0] as Element
    const ids = ((section.children[0] as Element).children as Element[]).map(
      (li) => li.properties.id,
    )
    assert.deepStrictEqual(ids, ["user-content-fn-1"])
  })
})
