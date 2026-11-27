import test, { describe, beforeEach, afterEach } from "node:test"
import assert from "node:assert"
import { execSync, spawnSync } from "child_process"
import fs from "fs"
import os from "os"
import path from "path"
import { pathToFileURL } from "url"
import YAML from "yaml"
import {
  buildPluginAsync,
  checkoutPinnedCommitAsync,
  linkPeerPlugins,
  pluginSourceChanged,
} from "./plugin-git-handlers.js"

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

describe("checkoutPinnedCommitAsync", () => {
  const git = (cwd, cmd) =>
    execSync(`git -c user.name=t -c user.email=t@t -c commit.gpgsign=false ${cmd}`, {
      cwd,
      stdio: "pipe",
      timeout: 30000,
    })
      .toString()
      .trim()

  function makeRemote() {
    const remote = path.join(root, "remote")
    fs.mkdirSync(remote)
    git(remote, "init -q -b main")
    git(remote, "config uploadpack.allowAnySHA1InWant true")
    fs.writeFileSync(path.join(remote, "package-lock.json"), `{ "v": 1 }`)
    git(remote, "add -A")
    git(remote, "commit -q -m one")
    const first = git(remote, "rev-parse HEAD")
    fs.writeFileSync(path.join(remote, "package-lock.json"), `{ "v": 2 }`)
    git(remote, "commit -q -am two")
    return { remote, first }
  }

  test("moves to a pinned commit that is not the branch tip", async () => {
    const { remote, first } = makeRemote()
    const dir = path.join(root, "plugin")
    git(root, `clone -q --depth 1 ${pathToFileURL(remote).href} "${dir}"`)
    await checkoutPinnedCommitAsync(dir, first)
    assert.strictEqual(git(dir, "rev-parse HEAD"), first)
  })

  // a plugin's build (npm install) rewrites its tracked package-lock.json; a restored CI cache
  // keeps that change, and the checkout refused to move ("commit your changes or stash them")
  test("moves even when the plugin's build left tracked files changed (#2639)", async () => {
    const { remote, first } = makeRemote()
    const dir = path.join(root, "plugin")
    git(root, `clone -q --depth 1 ${pathToFileURL(remote).href} "${dir}"`)
    fs.writeFileSync(path.join(dir, "package-lock.json"), `{ "v": "rewritten by npm" }`)
    await checkoutPinnedCommitAsync(dir, first)
    assert.strictEqual(git(dir, "rev-parse HEAD"), first)
    assert.strictEqual(fs.readFileSync(path.join(dir, "package-lock.json"), "utf-8"), `{ "v": 1 }`)
  })
})

describe("plugin commands with an extending config", () => {
  const cli = path.resolve(import.meta.dirname, "..", "bootstrap-cli.mjs")
  // stdout and stderr, whatever the exit code (doctor fails on npm plugins that aren't installed)
  const run = (dir, args) => {
    const result = spawnSync(process.execPath, [cli, ...args.split(" ")], {
      cwd: dir,
      encoding: "utf-8",
      timeout: 60_000,
      env: { ...process.env, QUARTZ_CONFIG_PATH: "" },
    })
    return { output: result.stdout + result.stderr, status: result.status }
  }
  const site = () => {
    const dir = path.join(root, "site")
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, "package.json"), `{ "name": "site", "version": "5.3.0" }`)
    fs.writeFileSync(
      path.join(dir, "quartz.config.default.yaml"),
      [
        "configuration:",
        "  pageTitle: Default",
        "plugins:",
        '  - source: "@quartz-community/graph"',
        "    enabled: true",
        "    options: { depth: 1, scale: 2 }",
        '  - source: "@quartz-community/comments"',
        "    enabled: false",
        "",
      ].join("\n"),
    )
    fs.writeFileSync(
      path.join(dir, "quartz.config.yaml"),
      [
        "extends: default",
        "plugins:",
        '  - source: "@quartz-community/graph"',
        "    options: { depth: 3 }",
        "",
      ].join("\n"),
    )
    return dir
  }
  const read = (dir) => fs.readFileSync(path.join(dir, "quartz.config.yaml"), "utf-8")

  test("list and doctor read the merged configuration", () => {
    const dir = site()
    const list = run(dir, "plugin list").output
    assert.match(list, /@quartz-community\/comments .*disabled/)
    assert.match(list, /@quartz-community\/graph .*enabled/)
    const doctor = run(dir, "plugin doctor").output
    assert.match(doctor, /Checking plugins/)
    assert.doesNotMatch(doctor, /no `enabled` field/)
  })

  test("enable, disable and config change only the user's entries", () => {
    const dir = site()
    run(dir, "plugin enable comments")
    run(dir, "plugin disable graph")
    run(dir, "plugin config graph --unset scale")
    run(dir, "plugin config graph --unset depth")
    const out = read(dir)
    assert.match(out, /^extends: default$/m)
    assert.doesNotMatch(out, /pageTitle/) // the merged configuration is not written back
    const data = YAML.parse(out)
    assert.deepStrictEqual(data.plugins, [
      // the base sets both: null drops them from the merged options, so the plugin's defaults
      // apply (the user's own depth: 3 is gone too)
      { source: "@quartz-community/graph", options: { depth: null, scale: null }, enabled: false },
      { source: "@quartz-community/comments", enabled: true },
    ])
  })

  test("remove refuses a plugin that comes from a base", () => {
    const dir = site()
    const { output, status } = run(dir, "plugin remove comments")
    assert.match(output, /comes from the configuration/)
    assert.strictEqual(status, 1)
    assert.doesNotMatch(read(dir), /comments/)
  })
})

describe("plugin install --latest with a plugin that can't be updated", () => {
  const cli = path.resolve(import.meta.dirname, "..", "bootstrap-cli.mjs")
  // A Git plugin whose repository no longer has the configured subdirectory (an old
  // quartz-themes entry: the repository moved its plugin out of `plugin/`).
  const site = (enabled) => {
    const repo = path.join(root, "repo")
    fs.mkdirSync(repo, { recursive: true })
    fs.writeFileSync(path.join(repo, "README.md"), "no plugin/ here\n")
    const git = (args) => execSync(`git ${args}`, { cwd: repo, stdio: "ignore", timeout: 30_000 })
    git("init -q -b main")
    git("-c user.name=t -c user.email=t@t add .")
    git("-c user.name=t -c user.email=t@t commit -q -m init")
    const url = pathToFileURL(repo).href
    const dir = path.join(root, "site")
    fs.mkdirSync(path.join(dir, ".quartz", "plugins", "old-theme"), { recursive: true })
    fs.writeFileSync(path.join(dir, "package.json"), `{ "name": "site", "version": "5.3.1" }`)
    fs.writeFileSync(
      path.join(dir, "quartz.config.yaml"),
      YAML.stringify({
        configuration: { pageTitle: "t" },
        plugins: [{ source: { name: "old-theme", repo: url, subdir: "plugin" }, enabled }],
      }),
    )
    fs.writeFileSync(
      path.join(dir, "quartz.lock.json"),
      JSON.stringify({
        version: "1.0.0",
        plugins: {
          "old-theme": {
            source: url,
            resolved: url,
            subdir: "plugin",
            commit: "0000000000000000000000000000000000000000",
            installedAt: "2026-01-01T00:00:00.000Z",
          },
        },
      }),
    )
    return dir
  }
  const run = (dir) => {
    const result = spawnSync(process.execPath, [cli, "plugin", "install", "--latest"], {
      cwd: dir,
      encoding: "utf-8",
      timeout: 60_000,
      env: { ...process.env, QUARTZ_CONFIG_PATH: "" },
    })
    return { output: result.stdout + result.stderr, status: result.status }
  }

  test("a disabled plugin only warns: the build doesn't load it", () => {
    const { output, status } = run(site(false))
    assert.match(output, /Could not update old-theme \(disabled/)
    assert.match(output, /npx quartz plugin remove old-theme/)
    assert.strictEqual(status, 0)
  })

  test("an enabled plugin fails the update", () => {
    const { output, status } = run(site(true))
    assert.match(output, /Failed to update old-theme/)
    assert.strictEqual(status, 1)
  })
})
