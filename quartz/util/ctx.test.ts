import { describe, test } from "node:test"
import assert from "node:assert"
import { BuildCtx, workerCtx } from "./ctx"
import { FullSlug, FilePath } from "./path"

describe("workerCtx", () => {
  const ctx = {
    buildId: "b",
    argv: { directory: "content" },
    cfg: { configuration: {} },
    allSlugs: ["index", "elsewhere/moved"] as FullSlug[],
    allFiles: ["index.md", "Moved.md"] as FilePath[],
    permalinks: { "Moved.md": "elsewhere/moved" as FullSlug },
    incremental: false,
    virtualPages: [],
    trie: {},
  } as unknown as BuildCtx

  test("carries permalinks to worker threads (#2644)", () => {
    assert.deepStrictEqual(workerCtx(ctx).permalinks, { "Moved.md": "elsewhere/moved" })
  })

  test("holds plain data only, and survives structured cloning", () => {
    const worker = workerCtx(ctx)
    assert.ok(!("cfg" in worker) && !("trie" in worker))
    assert.deepStrictEqual(structuredClone(worker), worker)
    assert.deepStrictEqual(worker.virtualPages, [])
  })
})
