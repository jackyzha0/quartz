import test, { afterEach, describe } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { Assets } from "./assets"
import type { StaticResources } from "../../util/resources"
import type { BuildCtx } from "../../util/ctx"
import type { ChangeEvent } from "../types"
import type { FilePath } from "../../util/path"

const tempDirs: string[] = []

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => fs.promises.rm(dir, { recursive: true })))
})

const consumeDelete = async (output: string, changeEvent: ChangeEvent) => {
  const partialEmit = Assets().partialEmit
  assert(partialEmit)

  const ctx = {
    argv: { output },
    cfg: { plugins: { pageTypes: [] } },
  } as unknown as BuildCtx
  const emitted = partialEmit(ctx, [], {} as StaticResources, [changeEvent])
  assert(emitted)

  if (Symbol.asyncIterator in emitted) {
    for await (const _file of emitted) {
      // Consume the async generator so the delete side effect runs.
    }
  } else {
    await emitted
  }
}

describe("Assets.partialEmit", () => {
  test("deleting an asset is idempotent", async () => {
    const output = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-assets-"))
    tempDirs.push(output)

    const asset = path.join(output, "image.png")
    await fs.promises.writeFile(asset, "test")
    const changeEvent: ChangeEvent = {
      type: "delete",
      path: "image.png" as FilePath,
    }

    await consumeDelete(output, changeEvent)
    assert.strictEqual(fs.existsSync(asset), false)
    await assert.doesNotReject(consumeDelete(output, changeEvent))
  })
})
