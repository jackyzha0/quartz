import test, { describe, beforeEach, afterEach } from "node:test"
import assert from "node:assert"
import fs from "fs"
import os from "os"
import path from "path"
import { linkPeerPlugins } from "./plugin-git-handlers.js"

describe("linkPeerPlugins", () => {
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
