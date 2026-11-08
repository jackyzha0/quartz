import test, { describe, beforeEach, afterEach } from "node:test"
import assert from "node:assert"
import { execSync } from "child_process"
import fs from "fs"
import os from "os"
import path from "path"
import { buildPluginAsync, linkPeerPlugins, pluginSourceChanged } from "./plugin-git-handlers.js"

let root
let hostPreact

beforeEach(() => {
  root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "quartz-peers-test-")))
  hostPreact = path.join(root, "quartz", "node_modules", "preact")
  fs.mkdirSync(hostPreact, { recursive: true })
  fs.writeFileSync(path.join(hostPreact, "package.json"), `{ "name": "preact" }`)
})

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true })
})

describe("linkPeerPlugins", () => {
  // outside the checkout, at a different depth from .quartz/plugins
  function makeLocalPlugin() {
    const source = path.join(root, "dev", "work", "my-plugin")
    fs.mkdirSync(source, { recursive: true })
    const pkg = { name: "my-plugin", peerDependencies: { preact: "^10.0.0" } }
    fs.writeFileSync(path.join(source, "package.json"), JSON.stringify(pkg))
    const pluginDir = path.join(root, "quartz", ".quartz", "plugins", "my-plugin")
    fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
    fs.symlinkSync(source, pluginDir, "dir")
    return { pluginDir, peer: path.join(source, "node_modules", "preact") }
  }

  test("links a local plugin's peer to Quartz's copy", () => {
    const plugin = makeLocalPlugin()
    linkPeerPlugins(plugin.pluginDir)
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("replaces a dangling link", () => {
    const plugin = makeLocalPlugin()
    fs.mkdirSync(path.dirname(plugin.peer), { recursive: true })
    fs.symlinkSync(path.join(root, "missing"), plugin.peer, "dir")
    linkPeerPlugins(plugin.pluginDir)
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("replaces a package manager's link to the plugin's own copy", () => {
    const plugin = makeLocalPlugin()
    const store = path.join(root, "store", "preact")
    fs.mkdirSync(store, { recursive: true })
    fs.mkdirSync(path.dirname(plugin.peer), { recursive: true })
    fs.symlinkSync(store, plugin.peer, "dir")
    linkPeerPlugins(plugin.pluginDir)
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("leaves an installed copy in place, and warns", (t) => {
    const plugin = makeLocalPlugin()
    fs.mkdirSync(plugin.peer, { recursive: true })
    const warn = t.mock.method(console, "warn", () => {})
    linkPeerPlugins(plugin.pluginDir)
    assert.ok(!fs.lstatSync(plugin.peer).isSymbolicLink())
    assert.strictEqual(warn.mock.callCount(), 1)
  })
})

describe("buildPluginAsync", () => {
  // a tarball npm installs offline; npm resolves no peers for a linked directory
  function pack(pkg) {
    const dir = path.join(root, "dev", pkg.name)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pkg))
    execSync("npm pack --silent", { cwd: dir, stdio: "pipe" })
    return path.join(dir, `${pkg.name}-${pkg.version}.tgz`)
  }

  // a cloned plugin built from source, with a dev copy of preact and a dependency that peers on
  // it, as @quartz-community/utils does
  function makeClonedPlugin() {
    const pluginDir = path.join(root, "quartz", ".quartz", "plugins", "my-plugin")
    fs.mkdirSync(pluginDir, { recursive: true })
    const spec = (tarball) => `file:${path.relative(pluginDir, tarball).replaceAll(path.sep, "/")}`
    const pkg = {
      name: "my-plugin",
      // a real entry point: an empty dist/ is reported as a failed build
      scripts: {
        build: `node -e "require('fs').mkdirSync('dist');require('fs').writeFileSync('dist/index.js','')"`,
      },
      dependencies: {
        utils: spec(
          pack({ name: "utils", version: "1.0.0", peerDependencies: { preact: "^10.0.0" } }),
        ),
      },
      peerDependencies: { preact: "^10.0.0" },
      devDependencies: { preact: spec(pack({ name: "preact", version: "10.0.0" })) },
    }
    fs.writeFileSync(path.join(pluginDir, "package.json"), JSON.stringify(pkg))
    fs.writeFileSync(path.join(pluginDir, ".gitignore"), "dist\n")
    fs.writeFileSync(
      path.join(pluginDir, ".npmrc"),
      "audit=false\nfund=false\nupdate-notifier=false\n",
    )
    return { pluginDir, peer: path.join(pluginDir, "node_modules", "preact") }
  }

  test("links a cloned plugin's peers when npm did not start Quartz", async (t) => {
    const plugin = makeClonedPlugin()
    t.mock.method(console, "log", () => {})
    // npm passes Quartz's .npmrc on to the commands it runs; a plain `node` launch does not
    const legacyPeerDeps = process.env.npm_config_legacy_peer_deps
    delete process.env.npm_config_legacy_peer_deps
    try {
      assert.ok(await buildPluginAsync(plugin.pluginDir, "my-plugin"))
    } finally {
      if (legacyPeerDeps !== undefined) process.env.npm_config_legacy_peer_deps = legacyPeerDeps
    }
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })
})

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

  test("object sources compare by content, not identity", () => {
    const priorEntry = { source: { repo: "github:owner/repo", ref: "main" }, commit: "abc123" }
    // read from YAML on every run, so never the same object as the lockfile's
    assert.strictEqual(
      pluginSourceChanged(priorEntry, { ref: "main", repo: "github:owner/repo" }),
      false,
    )
    assert.strictEqual(
      pluginSourceChanged(priorEntry, { repo: "github:owner/repo", ref: "dev" }),
      true,
    )
    assert.strictEqual(pluginSourceChanged(priorEntry, "github:owner/repo#main"), true)
  })

  test("is true when the repo itself changed", () => {
    const priorEntry = { source: "github:owner/old-repo", resolved: "...", commit: "abc123" }
    assert.strictEqual(pluginSourceChanged(priorEntry, "github:owner/new-repo"), true)
  })
})
