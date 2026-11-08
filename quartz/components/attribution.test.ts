import test, { describe } from "node:test"
import assert from "node:assert"
import { h, Fragment } from "preact"
import { render } from "preact-render-to-string"
import {
  attributeComponent,
  attributeComponentExport,
  attributeVNode,
  shortPluginName,
} from "./attribution"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const props = {} as QuartzComponentProps
const who = { plugin: "graph", component: "Graph" }

describe("component attribution", () => {
  test("shortPluginName", () => {
    assert.strictEqual(shortPluginName("@quartz-community/graph"), "graph")
    assert.strictEqual(shortPluginName("github:someone/my-plugin#v2"), "my-plugin")
    assert.strictEqual(shortPluginName("footer"), "footer")
  })

  test("annotates intrinsic root elements without touching existing attributes", () => {
    const out = render(attributeVNode(h("div", { class: "graph", id: "g" }), who))
    assert.strictEqual(
      out,
      '<div class="graph" id="g" data-quartz-plugin="graph" data-quartz-component="Graph"></div>',
    )
  })

  test("leaves null, strings, fragments and component roots alone", () => {
    assert.strictEqual(attributeVNode(null, who), null)
    assert.strictEqual(attributeVNode("text", who), "text")
    const frag = h(Fragment, null, h("p", null))
    assert.strictEqual(attributeVNode(frag, who), frag)
    const Inner = () => h("span", null)
    const nested = h(Inner, null)
    assert.strictEqual(attributeVNode(nested, who), nested)
  })

  test("wraps constructors, preserving statics and options", () => {
    const ctor = ((opts?: { label: string }) => {
      const C: QuartzComponent = () => h("nav", null, opts?.label ?? "none")
      C.css = ".x{}"
      C.afterDOMLoaded = "console.log(1)"
      return C
    }) as QuartzComponentConstructor<any>
    const wrapped = attributeComponentExport(ctor, who) as QuartzComponentConstructor<any>
    const instance = wrapped({ label: "hi" })
    assert.strictEqual(instance.css, ".x{}")
    assert.strictEqual(instance.afterDOMLoaded, "console.log(1)")
    assert.match(
      render(instance(props)),
      /<nav data-quartz-plugin="graph" data-quartz-component="Graph">hi<\/nav>/,
    )
    assert.strictEqual(attributeComponentExport(wrapped, who), wrapped, "idempotent")
  })

  test("wraps component instances (displayName) directly", () => {
    const C: QuartzComponent = () => h("footer", null)
    C.displayName = "Footer"
    const wrapped = attributeComponentExport(C, { plugin: "footer", component: "Footer" })
    assert.strictEqual(wrapped.displayName, "Footer")
    assert.match(render((wrapped as QuartzComponent)(props)), /data-quartz-plugin="footer"/)
    assert.strictEqual(attributeComponent(wrapped as QuartzComponent, who), wrapped)
  })
})
