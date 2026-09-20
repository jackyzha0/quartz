import test, { describe } from "node:test"
import assert from "node:assert"
import { pluginSourceChanged } from "./plugin-git-handlers.js"

describe("pluginSourceChanged", () => {
  test("is false when there is no prior lockfile record", () => {
    // First-ever install: nothing to compare against, so this alone must not
    // force a reinstall of an unrelated pre-existing directory.
    assert.strictEqual(pluginSourceChanged(undefined, "github:owner/repo#main"), false)
  })

  test("is false when the source is unchanged", () => {
    const priorEntry = { source: "github:owner/repo#main", resolved: "...", commit: "abc123" }
    assert.strictEqual(pluginSourceChanged(priorEntry, "github:owner/repo#main"), false)
  })

  test("is true when the pinned ref changed", () => {
    // This is the case `plugin install --from-config` used to miss entirely:
    // the directory and lockfile entry both already exist, so the plugin was
    // treated as "already installed" and never re-cloned even though its
    // configured ref moved to a different branch.
    const priorEntry = { source: "github:owner/repo#old-branch", resolved: "...", commit: "abc123" }
    assert.strictEqual(pluginSourceChanged(priorEntry, "github:owner/repo#new-branch"), true)
  })

  test("is true when the repo itself changed", () => {
    const priorEntry = { source: "github:owner/old-repo", resolved: "...", commit: "abc123" }
    assert.strictEqual(pluginSourceChanged(priorEntry, "github:owner/new-repo"), true)
  })
})
