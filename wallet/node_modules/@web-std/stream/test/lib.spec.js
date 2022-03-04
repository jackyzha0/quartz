import * as lib from "@web-std/stream"
import { assert } from "./test.js"

/**
 * @param {import('./test').Test} test
 */
export const test = test => {
  test("test baisc", async () => {
    assert.isEqual(typeof lib.ReadableStream, "function")
  })

  if (globalThis.window === globalThis) {
    test("uses built-ins", async () => {
      assert.isEqual(lib.ReadableStream, globalThis.ReadableStream)
      assert.isEqual(lib.WritableStream, globalThis.WritableStream)
      assert.isEqual(lib.TransformStream, globalThis.TransformStream)
    })
  }
}
