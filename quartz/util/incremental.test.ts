import test from "node:test"
import assert from "node:assert"
import { clearChangeRecord, ChangeRecord } from "./incremental"
import type { FilePath } from "./path"

test("clearChangeRecord clears the existing record", () => {
  const changes = {
    ["first.md" as FilePath]: "change",
    ["asset.png" as FilePath]: "delete",
  } satisfies ChangeRecord
  const originalRecord = changes

  clearChangeRecord(changes)

  assert.strictEqual(changes, originalRecord)
  assert.deepStrictEqual(changes, {})
})
