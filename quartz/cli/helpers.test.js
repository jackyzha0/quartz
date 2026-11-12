import test, { describe, beforeEach, afterEach, mock } from "node:test"
import assert from "node:assert"
import fs from "fs"
import path from "path"
import os from "os"
import { localLinkMatches, symlinkOrCopySync, symlinkOrCopy } from "./helpers.js"

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "quartz-symlink-test-"))
}

function makeTarget(tmpDir) {
  const target = path.join(tmpDir, "target")
  fs.mkdirSync(target)
  fs.writeFileSync(path.join(target, "marker.txt"), "hello")
  return target
}

describe("localLinkMatches", () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = makeTmpDir()
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  test("matches an absolute link target and a target relative to the link", () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")
    fs.symlinkSync(target, linkPath, "dir")
    assert.strictEqual(localLinkMatches(linkPath, target), true)

    fs.unlinkSync(linkPath)
    fs.symlinkSync(path.basename(target), linkPath, "dir")
    assert.strictEqual(localLinkMatches(linkPath, target), true)
    assert.strictEqual(localLinkMatches(linkPath, path.join(tmpDir, "elsewhere")), false)
  })

  test("returns false when the path is not a link", () => {
    assert.strictEqual(localLinkMatches(path.join(tmpDir, "missing"), tmpDir), false)
  })
})

describe("symlinkOrCopySync", () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = makeTmpDir()
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  test("creates a symlink on success", () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    symlinkOrCopySync(target, linkPath)

    const stat = fs.lstatSync(linkPath)
    assert.ok(stat.isSymbolicLink())
    assert.ok(fs.existsSync(path.join(linkPath, "marker.txt")))
  })

  test("silently succeeds when link already exists (EEXIST)", () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    symlinkOrCopySync(target, linkPath)
    assert.doesNotThrow(() => symlinkOrCopySync(target, linkPath))
  })

  test("re-throws non-EPERM errors", () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "nonexistent-parent", "link")

    assert.throws(
      () => symlinkOrCopySync(target, linkPath),
      (err) => {
        return err.code === "ENOENT"
      },
    )
  })

  test("falls back to junction on Windows EPERM", () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform")
    Object.defineProperty(process, "platform", { value: "win32", configurable: true })

    let callCount = 0
    const originalSymlinkSync = fs.symlinkSync
    mock.method(fs, "symlinkSync", (t, lp, type) => {
      callCount++
      if (callCount === 1 && type === "dir") {
        const err = new Error("EPERM: operation not permitted, symlink")
        err.code = "EPERM"
        err.errno = -4048
        err.syscall = "symlink"
        throw err
      }
      return originalSymlinkSync(t, lp, type)
    })

    try {
      symlinkOrCopySync(target, linkPath)
      assert.ok(fs.existsSync(path.join(linkPath, "marker.txt")))
      assert.strictEqual(callCount, 2)
    } finally {
      fs.symlinkSync.mock.restore()
      if (originalPlatform) {
        Object.defineProperty(process, "platform", originalPlatform)
      }
    }
  })

  test("falls back to copy when both symlink and junction fail on Windows", () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform")
    Object.defineProperty(process, "platform", { value: "win32", configurable: true })

    const originalSymlinkSync = fs.symlinkSync
    mock.method(fs, "symlinkSync", (_t, _lp, _type) => {
      const err = new Error("EPERM: operation not permitted, symlink")
      err.code = "EPERM"
      err.errno = -4048
      err.syscall = "symlink"
      throw err
    })

    try {
      symlinkOrCopySync(target, linkPath)

      const stat = fs.lstatSync(linkPath)
      assert.ok(stat.isDirectory(), "fallback should produce a real directory, not a symlink")
      assert.strictEqual(fs.readFileSync(path.join(linkPath, "marker.txt"), "utf-8"), "hello")
    } finally {
      fs.symlinkSync.mock.restore()
      if (originalPlatform) {
        Object.defineProperty(process, "platform", originalPlatform)
      }
    }
  })

  test("does not fall back on EPERM when not on Windows", () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform")
    Object.defineProperty(process, "platform", { value: "linux", configurable: true })

    const originalSymlinkSync = fs.symlinkSync
    mock.method(fs, "symlinkSync", (_t, _lp, _type) => {
      const err = new Error("EPERM: operation not permitted, symlink")
      err.code = "EPERM"
      throw err
    })

    try {
      assert.throws(
        () => symlinkOrCopySync(target, linkPath),
        (err) => err.code === "EPERM",
      )
    } finally {
      fs.symlinkSync.mock.restore()
      if (originalPlatform) {
        Object.defineProperty(process, "platform", originalPlatform)
      }
    }
  })
})

describe("symlinkOrCopy", () => {
  let tmpDir

  beforeEach(() => {
    tmpDir = makeTmpDir()
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  test("creates a symlink on success", async () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    await symlinkOrCopy(target, linkPath)

    const stat = fs.lstatSync(linkPath)
    assert.ok(stat.isSymbolicLink())
    assert.ok(fs.existsSync(path.join(linkPath, "marker.txt")))
  })

  test("silently succeeds when link already exists (EEXIST)", async () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    await symlinkOrCopy(target, linkPath)
    await assert.doesNotReject(() => symlinkOrCopy(target, linkPath))
  })

  test("falls back to copy when both symlink and junction fail on Windows", async () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform")
    Object.defineProperty(process, "platform", { value: "win32", configurable: true })

    const originalSymlink = fs.promises.symlink
    mock.method(fs.promises, "symlink", async (_t, _lp, _type) => {
      const err = new Error("EPERM: operation not permitted, symlink")
      err.code = "EPERM"
      err.errno = -4048
      err.syscall = "symlink"
      throw err
    })

    try {
      await symlinkOrCopy(target, linkPath)

      const stat = fs.lstatSync(linkPath)
      assert.ok(stat.isDirectory(), "fallback should produce a real directory, not a symlink")
      assert.strictEqual(fs.readFileSync(path.join(linkPath, "marker.txt"), "utf-8"), "hello")
    } finally {
      fs.promises.symlink.mock.restore()
      if (originalPlatform) {
        Object.defineProperty(process, "platform", originalPlatform)
      }
    }
  })

  test("does not fall back on EPERM when not on Windows", async () => {
    const target = makeTarget(tmpDir)
    const linkPath = path.join(tmpDir, "link")

    const originalPlatform = Object.getOwnPropertyDescriptor(process, "platform")
    Object.defineProperty(process, "platform", { value: "linux", configurable: true })

    mock.method(fs.promises, "symlink", async (_t, _lp, _type) => {
      const err = new Error("EPERM: operation not permitted, symlink")
      err.code = "EPERM"
      throw err
    })

    try {
      await assert.rejects(
        () => symlinkOrCopy(target, linkPath),
        (err) => err.code === "EPERM",
      )
    } finally {
      fs.promises.symlink.mock.restore()
      if (originalPlatform) {
        Object.defineProperty(process, "platform", originalPlatform)
      }
    }
  })
})
