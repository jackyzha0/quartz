import test from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { regeneratePluginIndex } from "./gitLoader"

test("scoped npm plugin overrides use the package name as the registry key", async () => {
  const pluginCacheDir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-plugin-index-"))

  try {
    await regeneratePluginIndex({
      npmPackages: ["@quartz-community/created-modified-date"],
      pluginCacheDir,
    })

    const index = fs.readFileSync(path.join(pluginCacheDir, "index.ts"), "utf8")

    assert.match(index, /"quartz-community__created-modified-date": {/)
    assert.match(index, /setOptionOverrides\("@quartz-community\/created-modified-date"/)
    assert.doesNotMatch(index, /setOptionOverrides\("quartz-community__created-modified-date"/)
  } finally {
    fs.rmSync(pluginCacheDir, { recursive: true, force: true })
  }
})
