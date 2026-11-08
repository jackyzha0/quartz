import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import {
  assertCommit,
  assertNpmSpec,
  assertRef,
  assertRepoUrl,
  git,
  isIdentifier,
  jsString,
  npmCommand,
} from "./subprocess.js"

describe("validation (#2571)", () => {
  test("commits must be hex SHAs", () => {
    assert.strictEqual(
      assertCommit("9a899bd8cce7cfc1ebfc68e4bd7ab6b4c6fcfd6f"),
      "9a899bd8cce7cfc1ebfc68e4bd7ab6b4c6fcfd6f",
    )
    assert.strictEqual(assertCommit("9a899bd"), "9a899bd")
    for (const bad of ["--upload-pack=touch x", "main", "9a89 9bd", "", undefined, "abc;id"]) {
      assert.throws(() => assertCommit(bad), /Invalid commit/, String(bad))
    }
  })

  test("refs: branch and tag names, never options or shell syntax", () => {
    for (const ok of ["main", "v5", "feature/x", "release-1.2", "v1.2.3", "dev_mode"]) {
      assert.strictEqual(assertRef(ok), ok)
    }
    for (const bad of [
      "main;touch pwned",
      "--upload-pack=touch pwned",
      "-b",
      "a b",
      "a..b",
      "a~1",
      "a^",
      "a:b",
      "a\\b",
      "x.lock",
      "a/",
      ".hidden",
      "a/.b",
      "@",
      "a@{1}",
      "",
    ]) {
      assert.throws(() => assertRef(bad), /Invalid git ref/, bad)
    }
  })

  test("repository URLs can't be options", () => {
    assert.strictEqual(
      assertRepoUrl("https://github.com/quartz-community/graph.git"),
      "https://github.com/quartz-community/graph.git",
    )
    assert.throws(() => assertRepoUrl("--upload-pack=touch pwned"), /Invalid repository/)
    assert.throws(() => assertRepoUrl("https://x\ny"), /Invalid repository/)
  })

  test("npm package specs", () => {
    for (const ok of [
      "@quartz-community/graph",
      "sharp",
      "sharp@0.34.1",
      "sharp@^0.34.0",
      "sharp@>=0.33.0 <1",
      "@scope/pkg@latest",
    ]) {
      assert.strictEqual(assertNpmSpec(ok), ok)
    }
    for (const bad of [
      "@scope/pkg;touch pwned",
      "$(id)",
      "@scope/pkg@1.0.0;id",
      "pkg@",
      "--global",
      "-g",
      "@-scope/pkg",
      "Pkg",
      "@scope/pkg@`id`",
      "pkg@npm:evil",
    ]) {
      assert.throws(() => assertNpmSpec(bad), /Invalid npm package/, bad)
    }
  })
})

describe("npmCommand", () => {
  test("no shell outside Windows; arguments untouched", () => {
    assert.deepStrictEqual(npmCommand(["install", "sharp@>=0.33 <1"], "linux"), {
      file: "npm",
      args: ["install", "sharp@>=0.33 <1"],
      shell: false,
    })
  })

  test("on Windows every argument is quoted, and cmd.exe metacharacters are refused", () => {
    assert.deepStrictEqual(npmCommand(["install", "sharp@>=0.33 <1"], "win32"), {
      file: "npm.cmd",
      args: ['"install"', '"sharp@>=0.33 <1"'],
      shell: true,
    })
    for (const bad of ['a"b', "%PATH%", "a&b", "a!b", "a\nb"]) {
      assert.throws(() => npmCommand(["install", bad], "win32"), /Refusing/, bad)
    }
  })
})

describe("generated source", () => {
  test("jsString escapes everything", () => {
    assert.strictEqual(jsString(`./a"b\\c`), '"./a\\"b\\\\c"')
    assert.strictEqual(jsString("x\n"), '"x\\n"')
  })

  test("isIdentifier", () => {
    assert.ok(isIdentifier("Graph"))
    assert.ok(isIdentifier("_x$1"))
    for (const bad of ["1a", "a-b", "a b", "a;b", 'x"', ""]) assert.ok(!isIdentifier(bad), bad)
  })
})

describe("git runs without a shell", () => {
  test("shell syntax in arguments is inert", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-subprocess-"))
    const marker = path.join(dir, "pwned")
    git(["init", "-q", dir])
    // As one argument, `$(touch …)` reaches git literally (an invalid config key), nothing runs.
    assert.throws(() => git(["-C", dir, "config", "--get", `x.$(touch ${marker})`]))
    assert.ok(!fs.existsSync(marker))
    fs.rmSync(dir, { recursive: true, force: true })
  })
})
