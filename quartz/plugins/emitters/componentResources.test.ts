import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test, { describe } from "node:test"
import { createContext, runInContext, runInNewContext } from "node:vm"
import ts from "typescript"

// Exercise the actual generated script without importing the emitter's SCSS
// and inline-script assets into Node or copying its counting implementation.
const source = ts.createSourceFile(
  "componentResources.ts",
  readFileSync(new URL("./componentResources.ts", import.meta.url), "utf8"),
  ts.ScriptTarget.Latest,
  true,
)
let template: ts.TemplateExpression | undefined
function findTemplate(node: ts.Node) {
  if (ts.isTemplateExpression(node) && node.head.text.includes("const goatcounterScriptPre")) {
    assert.equal(template, undefined, "expected a single GoatCounter script")
    template = node
  }
  ts.forEachChild(node, findTemplate)
}
findTemplate(source)
assert.ok(template, "GoatCounter script template must exist")

type Pageview = { path: string; title?: string }
type Script = {
  textContent: string
  src: string
  defer: boolean
  attributes: Record<string, string>
  onload?: () => void
  setAttribute: (name: string, value: string) => void
}

function setup(
  analytics = { websiteId: "example", host: undefined, scriptSrc: undefined } as {
    websiteId: string
    host?: string
    scriptSrc?: string
  },
) {
  const calls: Pageview[] = []
  const scripts: Script[] = []
  const location = { pathname: "/a" }
  const document = Object.assign(new EventTarget(), {
    title: "Page A",
    createElement: (): Script => ({
      textContent: "",
      src: "",
      defer: false,
      attributes: {},
      setAttribute(name: string, value: string) {
        this.attributes[name] = value
      },
    }),
    head: {
      appendChild(script: Script) {
        scripts.push(script)
        if (script.textContent) runInContext(script.textContent, context)
      },
    },
  })
  const context = createContext({ document, location })
  context.window = context
  const script = runInNewContext(template!.getText(source), { cfg: { analytics } })
  runInContext(script, context)

  return {
    calls,
    scripts,
    context,
    navigate(path: string, title: string) {
      location.pathname = path
      document.title = title
      document.dispatchEvent(new Event("nav"))
    },
    load() {
      context.goatcounter.count = (pageview: Pageview) => {
        calls.push({ path: pageview.path, title: pageview.title ?? document.title })
      }
      scripts.find((script) => script.src)!.onload!()
    },
  }
}

describe("GoatCounter pageviews", () => {
  test("counts the initial nav once when the script loads first", () => {
    const counter = setup()
    counter.load()
    counter.navigate("/a", "Page A")
    assert.deepEqual(counter.calls, [{ path: "/a", title: "Page A" }])
  })

  test("counts the initial nav once when navigation happens first", () => {
    const counter = setup()
    counter.navigate("/a", "Page A")
    assert.deepEqual(counter.calls, [])
    counter.load()
    assert.deepEqual(counter.calls, [{ path: "/a", title: "Page A" }])
  })

  test("preserves paths, titles, and return visits while the script is loading", () => {
    const counter = setup()
    counter.navigate("/a", "Page A")
    counter.navigate("/b", "Page B")
    counter.navigate("/a", "Page A")
    assert.deepEqual(counter.calls, [])
    counter.load()
    assert.deepEqual(counter.calls, [
      { path: "/a", title: "Page A" },
      { path: "/b", title: "Page B" },
      { path: "/a", title: "Page A" },
    ])
  })

  test("counts later navigations without replaying the pending visits", () => {
    const counter = setup()
    counter.navigate("/a", "Page A")
    counter.load()
    counter.navigate("/b", "Page B")
    counter.navigate("/a", "Page A")
    assert.deepEqual(counter.calls, [
      { path: "/a", title: "Page A" },
      { path: "/b", title: "Page B" },
      { path: "/a", title: "Page A" },
    ])
  })

  test("retains automatic-count suppression and custom script/endpoint settings", () => {
    const counter = setup({
      websiteId: "garden",
      host: "stats.example.com",
      scriptSrc: "/analytics/count.js",
    })
    assert.equal(counter.context.goatcounter.no_onload, true)
    const script = counter.scripts.find((script) => script.src)!
    assert.equal(script.src, "/analytics/count.js")
    assert.equal(script.defer, true)
    assert.equal(script.attributes["data-goatcounter"], "https://garden.stats.example.com/count")
    counter.load()
    assert.equal(counter.context.goatcounter.endpoint, "https://garden.stats.example.com/count")
  })
})
