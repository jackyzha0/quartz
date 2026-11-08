import test, { describe } from "node:test"
import assert from "node:assert"
import { resolveFrame, frameRegistry } from "./index"
import { DefaultFrame } from "./DefaultFrame"
import { FullWidthFrame } from "./FullWidthFrame"
import type { PageFrame } from "./types"
import { render as renderToString } from "preact-render-to-string"
import { parseSidebars } from "../../plugins/loader/config-loader"

const customFrame: PageFrame = {
  name: "custom-test-frame",
  render: () => null as any,
}

describe("resolveFrame", () => {
  test("returns DefaultFrame for undefined", () => {
    assert.strictEqual(resolveFrame(undefined), DefaultFrame)
  })

  test("returns DefaultFrame for 'default'", () => {
    assert.strictEqual(resolveFrame("default"), DefaultFrame)
  })

  test("returns named built-in frame", () => {
    assert.strictEqual(resolveFrame("full-width"), FullWidthFrame)
  })

  test("returns DefaultFrame for unknown frame name", () => {
    assert.strictEqual(resolveFrame("nonexistent"), DefaultFrame)
  })

  test("plugin-registered frame takes priority", () => {
    frameRegistry.register("custom-test-frame", customFrame, "test-plugin")
    const result = resolveFrame("custom-test-frame")
    assert.strictEqual(result, customFrame)
  })

  test("returns DefaultFrame for unknown name even with plugin frames registered", () => {
    frameRegistry.register("custom-test-frame", customFrame, "test-plugin")
    const result = resolveFrame("totally-unknown")
    assert.strictEqual(result, DefaultFrame)
  })

  test("warns about an unknown frame once, not once per page", () => {
    const original = console.warn
    const calls: unknown[][] = []
    console.warn = (...args: unknown[]) => calls.push(args)
    try {
      for (let i = 0; i < 5; i++) resolveFrame("warn-once-frame")
    } finally {
      console.warn = original
    }
    assert.strictEqual(calls.length, 1)
  })
})

describe("sidebar modes", () => {
  const empty = () => null
  const render = (sidebars?: {
    left: "fit" | "scroll" | "static"
    right: "fit" | "scroll" | "static"
  }) =>
    renderToString(
      DefaultFrame.render({
        componentData: {} as never,
        head: empty as never,
        header: [],
        beforeBody: [],
        pageBody: empty as never,
        afterBody: [],
        left: [],
        right: [],
        footer: [],
        sidebars,
      }),
    )

  test("the default frame marks each sidebar with its mode", () => {
    const html = render({ left: "static", right: "scroll" })
    assert.match(html, /class="left sidebar" data-sidebar-mode="static"/)
    assert.match(html, /class="right sidebar" data-sidebar-mode="scroll"/)
  })

  test("defaults to fit", () => {
    assert.match(render(), /class="left sidebar" data-sidebar-mode="fit"/)
  })

  test("parseSidebars validates sides and modes", () => {
    const warnings: string[] = []
    const modes = parseSidebars(
      { left: "static", right: "scrol", top: "fit" },
      "layout.sidebars",
      (w) => warnings.push(w),
    )
    assert.deepStrictEqual(modes, { left: "static" })
    assert.strictEqual(warnings.length, 2)
    assert.ok(
      warnings.some((w) => /right: unknown mode "scrol" \(did you mean "scroll"\?\)/.test(w)),
    )
    assert.ok(warnings.some((w) => /unknown sidebar "top"/.test(w)))
    assert.deepStrictEqual(
      parseSidebars(undefined, "x", () => {}),
      {},
    )
  })
})
