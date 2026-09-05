import test, { describe, before, after } from "node:test"
import assert from "node:assert"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"
import { spawn } from "child_process"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PROJECT_ROOT = path.join(__dirname, "..", "..", "..")
const TEST_FIXTURE = path.join(__dirname, "fixtures", "asset-filtering")
const OUTPUT_DIR = path.join(PROJECT_ROOT, "test/fixtures/asset-filtering/public")
const TEST_CONFIG = path.join(PROJECT_ROOT, "quartz.config.test.yaml")

async function cleanOutput() {
  try {
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true })
  } catch {}
}

function runQuartzBuild(args: string[]): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn("/opt/homebrew/bin/node", [
      path.join(PROJECT_ROOT, "quartz/bootstrap-cli.mjs"),
      "build",
      ...args,
    ], {
      cwd: PROJECT_ROOT,
      stdio: ["ignore", "pipe", "pipe"],
    })

    let stdout = ""
    let stderr = ""

    child.stdout?.on("data", (data) => { stdout += data.toString() })
    child.stderr?.on("data", (data) => { stderr += data.toString() })

    child.on("close", (code) => {
      resolve({ code: code ?? 0, stdout, stderr })
    })

    child.on("error", (err) => {
      resolve({ code: 1, stdout, stderr: err.message })
    })
  })
}

describe("Assets emitter with publishAssets config", () => {
  before(async () => {
    await cleanOutput()
    // Use test config for this test suite
    const testConfigContent = await fs.readFile(TEST_CONFIG, "utf-8")
    await fs.writeFile(path.join(PROJECT_ROOT, "quartz.config.yaml"), testConfigContent)
  })

  after(async () => {
    await cleanOutput()
    // Restore original config (quartz.config.default.yaml)
    const defaultConfigContent = await fs.readFile(path.join(PROJECT_ROOT, "quartz.config.default.yaml"), "utf-8")
    await fs.writeFile(path.join(PROJECT_ROOT, "quartz.config.yaml"), defaultConfigContent)
  })

  test("publishAssets: 'referenced' only copies assets referenced by published pages", async () => {
    const result = await runQuartzBuild([
      "-d", "test/fixtures/asset-filtering",
      "-o", "test/fixtures/asset-filtering/public",
      "--verbose"
    ])

    if (result.code !== 0) {
      console.error("Build failed:", result.stderr)
      console.error("stdout:", result.stdout)
    }
    assert.strictEqual(result.code, 0, "Build should succeed")

    const publicFiles = await fs.readdir(OUTPUT_DIR, { recursive: true })

    // Should exist: published page + its referenced assets
    assert.ok(publicFiles.includes("content/published.html"), "published.html should exist")
    assert.ok(publicFiles.includes("content/diagram.png"), "diagram.png (referenced by published) should exist")
    assert.ok(publicFiles.includes("content/assets/nested.png"), "nested.png (referenced by published) should exist")

    // Should NOT exist: filtered pages + their assets
    assert.ok(!publicFiles.includes("content/private.html"), "private.html should NOT exist (filtered)")
    assert.ok(!publicFiles.includes("content/secret.png"), "secret.png should NOT exist (only referenced by private)")
    assert.ok(!publicFiles.includes("content/draft.html"), "draft.html should NOT exist (filtered)")
    assert.ok(!publicFiles.includes("content/draft-img.png"), "draft-img.png should NOT exist (only referenced by draft)")

    // Should NOT exist: orphan assets
    assert.ok(!publicFiles.includes("content/orphan.png"), "orphan.png should NOT exist (unreferenced)")
  })
})