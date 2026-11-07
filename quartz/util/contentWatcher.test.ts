import test, { describe } from "node:test"
import assert from "node:assert"
import { diffContentFiles, pollingEnabled } from "./contentWatcher"
import type { FilePath } from "./path"

const files = (...paths: string[]) => new Set(paths as FilePath[])

describe("pollingEnabled", () => {
  test("recognizes enabled values", () => {
    for (const value of ["true", "TRUE", "1", "yes"]) {
      assert.strictEqual(pollingEnabled(value), true)
    }
  })

  test("recognizes disabled values", () => {
    for (const value of [undefined, "", "false", "FALSE", "0"]) {
      assert.strictEqual(pollingEnabled(value), false)
    }
  })
})

test("diffContentFiles finds additions and deletions", () => {
  const result = diffContentFiles(files("kept.md", "deleted.md"), files("kept.md", "added.md"))

  assert.deepStrictEqual(result.added, files("added.md"))
  assert.deepStrictEqual(result.deleted, files("deleted.md"))
})
