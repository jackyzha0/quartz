import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "fs"
import os from "os"
import path from "path"
import { isLocalSource, parsePluginSource, readLockedCommit } from "./gitLoader"

describe("parsePluginSource", () => {
  test("owner/repo shorthand supports #ref", () => {
    const spec = parsePluginSource("quartz-community/spacer#dev")
    assert.strictEqual(spec.name, "spacer")
    assert.strictEqual(spec.repo, "https://github.com/quartz-community/spacer.git")
    assert.strictEqual(spec.ref, "dev")
  })

  test("local sources are recognised in POSIX and Windows spellings", () => {
    for (const source of [
      "./plugin",
      "../plugin",
      "/abs/plugin",
      ".\\plugin",
      "..\\plugins\\x",
      "C:\\sites\\plugin",
      "D:/plugin",
      { repo: ".\\plugin" },
    ]) {
      assert.ok(isLocalSource(source), JSON.stringify(source))
    }
    for (const source of ["github:a/b", "a/b", "https://github.com/a/b.git", "@scope/pkg"]) {
      assert.ok(!isLocalSource(source), source)
    }
    assert.strictEqual(parsePluginSource(".\\plugin").local, true)
  })

  test("unknown sources get an explanatory error", () => {
    assert.throws(() => parsePluginSource("explorer"), /Expected github:owner\/repo/)
  })
})

describe("readLockedCommit", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-lock-test-"))
  const lockPath = path.join(dir, "quartz.lock.json")
  const repo = "https://github.com/quartz-community/spacer.git"
  fs.writeFileSync(
    lockPath,
    JSON.stringify({
      version: "1.0.0",
      plugins: {
        spacer: { source: "github:quartz-community/spacer", resolved: repo, commit: "abc123" },
        local: { source: "./local", resolved: "/x/local", commit: "local" },
        mono: { resolved: "https://github.com/a/mono.git", commit: "def456", subdir: "pkg" },
      },
    }),
  )

  test("returns the pinned commit for a matching repository", () => {
    assert.strictEqual(readLockedCommit({ name: "spacer", repo }, lockPath), "abc123")
  })

  test("ignores entries whose source changed", () => {
    assert.strictEqual(
      readLockedCommit({ name: "spacer", repo: "https://github.com/fork/spacer.git" }, lockPath),
      undefined,
    )
  })

  test("ignores local entries and subdir mismatches", () => {
    assert.strictEqual(readLockedCommit({ name: "local", repo: "/x/local" }, lockPath), undefined)
    assert.strictEqual(
      readLockedCommit({ name: "mono", repo: "https://github.com/a/mono.git" }, lockPath),
      undefined,
    )
    assert.strictEqual(
      readLockedCommit(
        { name: "mono", repo: "https://github.com/a/mono.git", subdir: "pkg" },
        lockPath,
      ),
      "def456",
    )
  })

  test("is undefined without a lockfile", () => {
    assert.strictEqual(
      readLockedCommit({ name: "spacer", repo }, path.join(dir, "missing.json")),
      undefined,
    )
    fs.rmSync(dir, { recursive: true, force: true })
  })
})
