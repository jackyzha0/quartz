import test, { after, before, describe } from "node:test"
import assert from "node:assert"
import { execSync } from "child_process"
import fs from "fs"
import os from "os"
import path from "path"

// the loader resolves .quartz/plugins from the working directory at import
const cwd = process.cwd()
const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "quartz-peers-test-")))
const quartz = path.join(root, "quartz")
const hostPreact = path.join(quartz, "node_modules", "preact")
let loader: typeof import("./gitLoader")

before(async () => {
  fs.mkdirSync(hostPreact, { recursive: true })
  fs.writeFileSync(path.join(hostPreact, "package.json"), `{ "name": "preact" }`)
  process.chdir(quartz)
  loader = await import("./gitLoader")
})

after(() => {
  process.chdir(cwd)
  fs.rmSync(root, { recursive: true, force: true })
})

// outside the checkout, at a different depth from .quartz/plugins
function makeLocalPlugin(name: string) {
  const source = path.join(root, "dev", "work", name)
  fs.mkdirSync(source, { recursive: true })
  const pkg = { name, peerDependencies: { preact: "^10.0.0" } }
  fs.writeFileSync(path.join(source, "package.json"), JSON.stringify(pkg))
  return { source, peer: path.join(source, "node_modules", "preact") }
}

// a tarball npm installs offline; npm resolves no peers for a linked directory
function pack(pkg: { name: string; version: string; peerDependencies?: object }) {
  const dir = path.join(root, "dev", pkg.name)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify(pkg))
  execSync("npm pack --silent", { cwd: dir, stdio: "pipe" })
  return path.join(dir, `${pkg.name}-${pkg.version}.tgz`)
}

// built from source, with a dev copy of preact and a dependency that peers on it, as
// @quartz-community/utils does
function makeGitPlugin(name: string) {
  const installed = path.join(quartz, ".quartz", "plugins", name)
  const spec = (tarball: string) =>
    `file:${path.relative(installed, tarball).replaceAll(path.sep, "/")}`
  const repo = path.join(root, "remote", name)
  fs.mkdirSync(repo, { recursive: true })
  const pkg = {
    name,
    scripts: { build: `node -e "require('fs').mkdirSync('dist')"` },
    dependencies: {
      utils: spec(
        pack({ name: "utils", version: "1.0.0", peerDependencies: { preact: "^10.0.0" } }),
      ),
    },
    peerDependencies: { preact: "^10.0.0" },
    devDependencies: { preact: spec(pack({ name: "preact", version: "10.0.0" })) },
  }
  fs.writeFileSync(path.join(repo, "package.json"), JSON.stringify(pkg))
  fs.writeFileSync(path.join(repo, ".gitignore"), "dist\n")
  fs.writeFileSync(path.join(repo, ".npmrc"), "audit=false\nfund=false\nupdate-notifier=false\n")
  execSync("git init -q && git add -A && git -c user.name=q -c user.email=q@q commit -q -m init", {
    cwd: repo,
  })
  return { repo, peer: path.join(installed, "node_modules", "preact") }
}

function linkIntoQuartz(name: string, source: string) {
  const pluginDir = path.join(quartz, ".quartz", "plugins", name)
  fs.mkdirSync(path.dirname(pluginDir), { recursive: true })
  fs.symlinkSync(source, pluginDir, "dir")
  return pluginDir
}

describe("linkPeerDependencies", () => {
  test("links a local plugin's peer to Quartz's copy", () => {
    const plugin = makeLocalPlugin("fresh")
    loader.linkPeerDependencies(linkIntoQuartz("fresh", plugin.source))
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("replaces a dangling link", () => {
    const plugin = makeLocalPlugin("dangling")
    fs.mkdirSync(path.dirname(plugin.peer), { recursive: true })
    fs.symlinkSync(path.join(root, "missing"), plugin.peer, "dir")
    loader.linkPeerDependencies(linkIntoQuartz("dangling", plugin.source))
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("replaces a package manager's link to the plugin's own copy", () => {
    const plugin = makeLocalPlugin("store")
    const store = path.join(root, "store", "preact")
    fs.mkdirSync(store, { recursive: true })
    fs.mkdirSync(path.dirname(plugin.peer), { recursive: true })
    fs.symlinkSync(store, plugin.peer, "dir")
    loader.linkPeerDependencies(linkIntoQuartz("store", plugin.source))
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("leaves an installed copy in place, and warns", (t) => {
    const plugin = makeLocalPlugin("installed")
    fs.mkdirSync(plugin.peer, { recursive: true })
    const warn = t.mock.method(console, "warn", () => {})
    loader.linkPeerDependencies(linkIntoQuartz("installed", plugin.source))
    assert.ok(!fs.lstatSync(plugin.peer).isSymbolicLink())
    assert.strictEqual(warn.mock.callCount(), 1)
  })
})

describe("installPlugin", () => {
  test("links a local plugin's peers", async () => {
    const plugin = makeLocalPlugin("local-source")
    await loader.installPlugin({ name: "local-source", repo: plugin.source, local: true })
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("links an already linked local plugin's peers", async () => {
    const plugin = makeLocalPlugin("already-linked")
    linkIntoQuartz("already-linked", plugin.source)
    await loader.installPlugin({ name: "already-linked", repo: plugin.source, local: true })
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })

  test("links a git plugin's peers when npm did not start Quartz", async () => {
    const plugin = makeGitPlugin("git-source")
    // npm passes Quartz's .npmrc on to the commands it runs; a plain `node` launch does not
    const legacyPeerDeps = process.env.npm_config_legacy_peer_deps
    delete process.env.npm_config_legacy_peer_deps
    try {
      await loader.installPlugin({ name: "git-source", repo: plugin.repo })
    } finally {
      if (legacyPeerDeps !== undefined) process.env.npm_config_legacy_peer_deps = legacyPeerDeps
    }
    assert.strictEqual(fs.realpathSync(plugin.peer), hostPreact)
  })
})
