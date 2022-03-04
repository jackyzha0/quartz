import { TextEncoder, TextDecoder } from "../src/lib.js"
import assert from "assert"

describe("text encode/decode", () => {
  const data = Uint8Array.from([
    104,
    101,
    108,
    108,
    111,
    32,
    119,
    111,
    114,
    108,
    100,
  ])

  it("can encode text", () => {
    const bytes = new TextEncoder().encode("hello world")
    assert.deepStrictEqual(bytes, data)
  })

  it("can decode text", () => {
    const text = new TextDecoder().decode(data)
    assert.equal(text, "hello world")
  })
})
