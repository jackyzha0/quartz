import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { readContentFile } from "./parse"
import { isContentError } from "../util/pluginErrors"
import type { FilePath } from "../util/path"

describe("readContentFile", () => {
  test("reads a file", async () => {
    const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-parse-"))
    try {
      const fp = path.join(dir, "note.md")
      await fs.promises.writeFile(fp, "# hi")
      assert.strictEqual((await readContentFile(fp as FilePath)).toString(), "# hi")
    } finally {
      await fs.promises.rm(dir, { recursive: true })
    }
  })

  test("a file that can't be read is a content error", async () => {
    const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "quartz-parse-"))
    try {
      // a directory named like a note, and a file that is gone
      await fs.promises.mkdir(path.join(dir, "folder.md"))
      for (const [name, reason] of [
        ["folder.md", "it is a directory (EISDIR)"],
        ["missing.md", "it no longer exists (ENOENT)"],
      ]) {
        await assert.rejects(
          readContentFile(path.join(dir, name) as FilePath),
          (err: Error) =>
            isContentError(err) && err.message === `Cannot read \`${name}\`: ${reason}`,
        )
      }
    } finally {
      await fs.promises.rm(dir, { recursive: true })
    }
  })
})
