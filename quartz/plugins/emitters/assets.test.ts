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
// The CLI always resolves `quartz.config.yaml` relative to process.cwd(),
// so building the fixture requires temporarily swapping the repo's own
// config file. This is not parallel-safe against other processes touching
// that file, but no other test in this suite does.
const REPO_CONFIG = path.join(REPO_ROOT, "quartz.config.yaml")

async function cleanOutput() {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true })
}

function runQuartzBuild(): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(
      process.execPath,
      [
        path.join(REPO_ROOT, "quartz/bootstrap-cli.mjs"),
        "build",
        "-d",
        "test/fixtures/asset-filtering",
        "-o",
        "test/fixtures/asset-filtering/public",
      ],
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

  before(async () => {
    await cleanOutput()
    originalConfig = await fs.readFile(REPO_CONFIG, "utf-8").catch(() => null)
    const testConfigContent = await fs.readFile(TEST_CONFIG, "utf-8")
    await fs.writeFile(REPO_CONFIG, testConfigContent)
  })

  after(async () => {
    await cleanOutput()
    // Restore original config exactly as it was (or remove it if it never existed)
    if (originalConfig !== null) {
      await fs.writeFile(REPO_CONFIG, originalConfig)
    } else {
      await fs.rm(REPO_CONFIG, { force: true })
    }
  })

  test("publishAssets: 'referenced' only copies assets referenced by published pages", async () => {
    const result = await runQuartzBuild()

    if (result.code !== 0) {
      console.error("Build failed:", result.stderr)
      console.error("stdout:", result.stdout)
    }
    assert.strictEqual(result.code, 0, "Build should succeed")

    const rawFiles = await fs.readdir(OUTPUT_DIR, { recursive: true })
    // Normalize to POSIX separators — fs.readdir uses the platform separator
    // (backslashes on Windows), but the assertions below use forward slashes.
    const publicFiles = rawFiles.map((f) => f.split(path.sep).join("/"))

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
