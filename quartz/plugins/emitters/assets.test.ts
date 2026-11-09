import test, { afterEach, describe } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { Assets } from "./assets"
import { isContentError } from "../../util/pluginErrors"
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
    cfg: { configuration: { ignorePatterns: [] }, plugins: { pageTypes: [] } },
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

describe("Assets.emit", () => {
  const emitAll = async (directory: string, output: string) => {
    const ctx = {
      argv: { directory, output },
      cfg: { configuration: { ignorePatterns: [] }, plugins: { pageTypes: [] } },
    } as unknown as BuildCtx
    const emitted = Assets().emit(ctx, [], {} as StaticResources)
    const files: unknown[] = []
    for await (const file of emitted as AsyncIterable<unknown>) files.push(file)
    return files
  }
  const tempDir = async () => {
    const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-assets-"))
    tempDirs.push(dir)
    return dir
  }
  // chmod can't take read/write access away from root, and Windows ignores POSIX permission bits
  const noPermissions = process.getuid?.() === 0 || process.platform === "win32"

  test("an unreadable asset is a content error", { skip: noPermissions }, async () => {
    const content = await tempDir()
    const output = await tempDir()
    const asset = path.join(content, "secret.png")
    await fs.promises.writeFile(asset, "x")
    await fs.promises.chmod(asset, 0o000)
    try {
      await assert.rejects(
        emitAll(content, output),
        (err: Error) =>
          isContentError(err) &&
          err.message === "Cannot read `secret.png`: permission denied (EACCES)",
      )
    } finally {
      await fs.promises.chmod(asset, 0o644)
    }
  })

  test("an unwritable output is not a content error", { skip: noPermissions }, async () => {
    const content = await tempDir()
    const output = await tempDir()
    await fs.promises.writeFile(path.join(content, "image.png"), "x")
    await fs.promises.chmod(output, 0o555)
    try {
      await assert.rejects(emitAll(content, output), (err: Error) => !isContentError(err))
    } finally {
      await fs.promises.chmod(output, 0o755)
    }
  })
})
