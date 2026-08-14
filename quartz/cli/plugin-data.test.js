import test, { describe } from "node:test"
import assert from "node:assert"
import { parseGitSource } from "./plugin-data.js"

describe("parseGitSource", () => {
  test("reads ref from the 'repo#ref' string shorthand", () => {
    assert.strictEqual(parseGitSource("github:owner/repo#some-branch").ref, "some-branch")
  })

  test("reads ref from a separate object-level ref field", () => {
    assert.strictEqual(
      parseGitSource({ repo: "github:owner/repo", ref: "some-branch" }).ref,
      "some-branch",
    )
  })

  test("object-level ref takes precedence over a '#ref' fragment", () => {
    assert.strictEqual(
      parseGitSource({ repo: "github:owner/repo#from-url", ref: "from-object" }).ref,
      "from-object",
    )
  })

  test("reads object-level ref for git+ and https sources", () => {
    assert.strictEqual(
      parseGitSource({ repo: "git+https://example.com/owner/repo.git", ref: "some-branch" }).ref,
      "some-branch",
    )
    assert.strictEqual(
      parseGitSource({ repo: "https://example.com/owner/repo.git", ref: "some-branch" }).ref,
      "some-branch",
    )
  })

  test("leaves ref undefined when neither form supplies one", () => {
    assert.strictEqual(parseGitSource("github:owner/repo").ref, undefined)
    assert.strictEqual(parseGitSource({ repo: "github:owner/repo" }).ref, undefined)
  })
})

test("carries object ref onto npm scoped packages, like gitLoader", () => {
  assert.strictEqual(parseGitSource({ repo: "@scope/pkg", ref: "v1" }).ref, "v1")
  assert.strictEqual(parseGitSource("@scope/pkg").ref, undefined)
})

test("an empty #fragment yields undefined, not an empty string", () => {
  assert.strictEqual(parseGitSource("github:owner/repo#").ref, undefined)
})
