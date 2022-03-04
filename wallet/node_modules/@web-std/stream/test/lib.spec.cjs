const lib = require("@web-std/stream")

/**
 * @param {import('./test').Test} test
 */
exports.test = async ({ test, assert }) => {
  console.log("define tests")
  test("test baisc", async () => {
    console.log("test basic")

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
