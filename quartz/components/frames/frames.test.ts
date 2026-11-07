import test, { describe } from "node:test"
import assert from "node:assert"
import { resolveFrame, frameRegistry } from "./index"
import { DefaultFrame } from "./DefaultFrame"
import { FullWidthFrame } from "./FullWidthFrame"
import type { PageFrame } from "./types"

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
