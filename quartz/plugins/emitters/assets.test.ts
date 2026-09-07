import test, { describe, before, after } from "node:test"
import assert from "node:assert"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { spawn } from "child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Repo root is 3 levels up from quartz/plugins/emitters/
const REPO_ROOT = path.join(__dirname, "..", "..", "..")
const TEST_FIXTURE = path.join(REPO_ROOT, "test", "fixtures", "asset-filtering")
const OUTPUT_DIR = path.join(TEST_FIXTURE, "public")
const TEST_CONFIG = path.join(TEST_FIXTURE, "quartz.config.yaml")

async function cleanOutput() {
  try {
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true })
  } catch {}
}

function runQuartzBuild(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [path.join(REPO_ROOT, "quartz/bootstrap-cli.mjs"), "build", ...args],
      {
        cwd: REPO_ROOT,
        stdio: ["ignore", "pipe", "pipe"],
      },
    )

    let stdout = ""
    let stderr = ""

    child.stdout?.on("data", (data) => {
      stdout += data.toString()
    })
    child.stderr?.on("data", (data) => {
      stderr += data.toString()
    })

    child.on("close", (code) => {
      resolve({ code: code ?? 0, stdout, stderr })
    })

    child.on("error", (err) => {
      resolve({ code: 1, stdout, stderr: err.message })
    })
  })
}

describe("Assets emitter with publishAssets config", () => {
  let originalConfig: string | null = null
  let hadOriginalConfig = false

  before(async () => {
    await cleanOutput()
    // Save original config if it exists
    const repoConfigPath = path.join(REPO_ROOT, "quartz.config.yaml")
    try {
      originalConfig = await fs.readFile(repoConfigPath, "utf-8")
      hadOriginalConfig = true
    } catch {
      hadOriginalConfig = false
    }
    // Use test config for this test suite
    const testConfigContent = await fs.readFile(TEST_CONFIG, "utf-8")
    await fs.writeFile(repoConfigPath, testConfigContent)
    // Verify config was written
    const written = await fs.readFile(path.join(REPO_ROOT, "quartz.config.yaml"), "utf-8")
    if (written !== testConfigContent) {
      throw new Error("Config file write verification failed")
    }
  })

  after(async () => {
    await cleanOutput()
    // Restore original config exactly as it was
    const repoConfigPath = path.join(REPO_ROOT, "quartz.config.yaml")
    if (hadOriginalConfig && originalConfig !== null) {
      await fs.writeFile(repoConfigPath, originalConfig)
    } else {
      try {
        await fs.rm(repoConfigPath, { force: true })
      } catch {}
    }
  })

  test("publishAssets: 'referenced' only copies assets referenced by published pages", async () => {
    const result = await runQuartzBuild([
      "-d",
      "test/fixtures/asset-filtering",
      "-o",
      "test/fixtures/asset-filtering/public",
      "--verbose",
    ])

    if (result.code !== 0) {
      console.error("Build failed:", result.stderr)
      console.error("stdout:", result.stdout)
      console.error("REPO_ROOT:", REPO_ROOT)
      console.error("TEST_FIXTURE:", TEST_FIXTURE)
      console.error("OUTPUT_DIR:", OUTPUT_DIR)
    }
    assert.strictEqual(result.code, 0, "Build should succeed")

    // Longer delay for Windows CI file system settling
    await new Promise((r) => setTimeout(r, 2000))

    const publicFiles = await fs.readdir(OUTPUT_DIR, { recursive: true })

    // Debug output on failure
    console.log("Public files:", publicFiles)

    // Should exist: published page + its referenced assets
    assert.ok(publicFiles.includes("content/published.html"), "published.html should exist")
    assert.ok(
      publicFiles.includes("content/diagram.png"),
      "diagram.png (referenced by published) should exist",
    )
    assert.ok(
      publicFiles.includes("content/assets/nested.png"),
      "nested.png (referenced by published) should exist",
    )

    // Should NOT exist: filtered pages + their assets
    assert.ok(
      !publicFiles.includes("content/private.html"),
      "private.html should NOT exist (filtered)",
    )
    assert.ok(
      !publicFiles.includes("content/secret.png"),
      "secret.png should NOT exist (only referenced by private)",
    )
    assert.ok(!publicFiles.includes("content/draft.html"), "draft.html should NOT exist (filtered)")
    assert.ok(
      !publicFiles.includes("content/draft-img.png"),
      "draft-img.png should NOT exist (only referenced by draft)",
    )

    // Should NOT exist: orphan assets
    assert.ok(
      !publicFiles.includes("content/orphan.png"),
      "orphan.png should NOT exist (unreferenced)",
    )
  })
})
