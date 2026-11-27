import test, { describe } from "node:test"
import assert from "node:assert"
import path from "path"
import fs from "fs"
import YAML from "yaml"
import {
  ConfigExtendsError,
  deepMerge,
  mergeQuartzConfigs,
  pluginMatchKey,
  localExtendsFiles,
  resolveExtends,
  resolveTarget,
  fetchRemoteConfig,
} from "./config-extends"
import os from "os"
import type { QuartzPluginsJson } from "./types"

const base = (): QuartzPluginsJson => ({
  configuration: {
    pageTitle: "Quartz",
    ignorePatterns: ["private", ".obsidian"],
    theme: { typography: { header: "Schibsted Grotesk", body: "Source Sans Pro" } },
    links: { markdownLinkResolution: "shortest" },
  },
  plugins: [
    { source: "@quartz-community/explorer", enabled: true, options: { a: 1, nested: { x: 1 } } },
    {
      source: "github:quartz-community/graph",
      enabled: true,
      order: 50,
      layout: { position: "right", priority: 10 },
    },
    { source: "@quartz-community/comments", enabled: false },
  ],
  layout: { byPageType: { folder: { exclude: ["graph"] } } },
})

describe("deepMerge", () => {
  test("objects merge, other values replace, null deletes", () => {
    assert.deepStrictEqual(
      deepMerge({ a: { b: 1, c: 2 }, l: [1, 2], k: 1 }, { a: { c: 3 }, l: [9], k: null }),
      {
        a: { b: 1, c: 3 },
        l: [9],
      },
    )
  })
  test("does not modify its inputs", () => {
    const b = { a: { b: 1 } }
    deepMerge(b, { a: { b: 2 } })
    assert.deepStrictEqual(b, { a: { b: 1 } })
  })
})

describe("pluginMatchKey", () => {
  test("npm, GitHub, git URL and local sources of one plugin match", () => {
    for (const source of [
      "@quartz-community/explorer",
      "@quartz-community/explorer@^2.0.0",
      "github:quartz-community/explorer",
      "github:someone/explorer#v2",
      "git+https://github.com/quartz-community/explorer.git",
      "https://github.com/quartz-community/explorer",
      "./plugins/explorer/",
      "explorer",
      { repo: "github:quartz-community/plugins", subdir: "x", name: "explorer" },
    ]) {
      assert.strictEqual(pluginMatchKey(source as never), "explorer", JSON.stringify(source))
    }
  })
})

describe("pluginMatchKey for monorepo subdirectories", () => {
  test("two plugins of one repository without a name get different keys", () => {
    const a = pluginMatchKey({ repo: "github:me/quartz-plugins", subdir: "plugins/a" })
    const b = pluginMatchKey({ repo: "github:me/quartz-plugins", subdir: "plugins/b" })
    assert.notStrictEqual(a, b)
    assert.strictEqual(a, "quartz-plugins/plugins/a")
  })
  test("subdir spellings are normalised", () => {
    for (const subdir of ["plugins/a", "./plugins/a/", "plugins\\a", "/plugins//a"]) {
      assert.strictEqual(
        pluginMatchKey({ repo: "https://github.com/me/quartz-plugins.git", subdir }),
        "quartz-plugins/plugins/a",
        subdir,
      )
    }
    assert.strictEqual(pluginMatchKey({ repo: "github:me/explorer", subdir: "." }), "explorer")
    assert.strictEqual(pluginMatchKey({ repo: "github:me/explorer" }), "explorer")
  })
  test("an overlay entry for one monorepo plugin leaves the other alone", () => {
    const merged = mergeQuartzConfigs(
      {
        configuration: {},
        plugins: [
          { source: { repo: "github:me/mono", subdir: "a" }, enabled: true },
          { source: { repo: "github:me/mono", subdir: "b" }, enabled: true },
        ],
      },
      { plugins: [{ source: { repo: "github:me/mono", subdir: "b" }, enabled: false }] },
    )
    assert.deepStrictEqual(
      merged.plugins.map((p) => p.enabled),
      [true, false],
    )
  })
})

describe("mergeQuartzConfigs", () => {
  test("configuration deep-merges; arrays replace; null resets a key", () => {
    const merged = mergeQuartzConfigs(base(), {
      configuration: {
        pageTitle: "My garden",
        ignorePatterns: ["drafts"],
        theme: { typography: { header: "Inter" } },
        links: null,
      },
    })
    assert.strictEqual(merged.configuration.pageTitle, "My garden")
    assert.deepStrictEqual(merged.configuration.ignorePatterns, ["drafts"])
    assert.deepStrictEqual(merged.configuration.theme, {
      typography: { header: "Inter", body: "Source Sans Pro" },
    })
    assert.ok(!("links" in merged.configuration))
    // the base plugins are kept when the overlay lists none
    assert.strictEqual(merged.plugins.length, 3)
  })

  test("plugins match by name; enabled/order/source replace, options/layout merge", () => {
    const merged = mergeQuartzConfigs(base(), {
      plugins: [
        {
          source: "github:quartz-community/explorer",
          options: { b: 2, nested: { y: 2 } },
        } as never,
        { source: "@quartz-community/graph", enabled: false, order: 10, layout: { priority: 1 } },
        { source: "@quartz-community/comments", enabled: true },
      ],
    })
    const [explorer, graph, comments] = merged.plugins
    assert.strictEqual(explorer.source, "github:quartz-community/explorer")
    assert.strictEqual(explorer.enabled, true)
    assert.deepStrictEqual(explorer.options, { a: 1, b: 2, nested: { x: 1, y: 2 } })
    assert.strictEqual(graph.enabled, false)
    assert.strictEqual(graph.order, 10)
    assert.deepStrictEqual(graph.layout, { position: "right", priority: 1 })
    assert.strictEqual(comments.enabled, true)
    assert.strictEqual(merged.plugins.length, 3)
  })

  test("new plugins are appended as written (no enabled → disabled, as in a full config)", () => {
    const merged = mergeQuartzConfigs(base(), {
      plugins: [
        { source: "github:me/my-plugin", enabled: true, order: 70 },
        { source: "github:me/other" },
      ],
    })
    assert.strictEqual(merged.plugins.length, 5)
    assert.deepStrictEqual(merged.plugins[3], {
      source: "github:me/my-plugin",
      enabled: true,
      order: 70,
    })
    assert.deepStrictEqual(merged.plugins[4], { source: "github:me/other" })
  })

  test("null removes a plugin's options, layout or order (back to the plugin's defaults)", () => {
    const merged = mergeQuartzConfigs(base(), {
      plugins: [
        { source: "@quartz-community/graph", layout: null, order: null } as never,
        { source: "@quartz-community/explorer", options: { nested: null } } as never,
      ],
    })
    const [explorer, graph] = merged.plugins
    assert.ok(!("layout" in graph) && !("order" in graph))
    assert.deepStrictEqual(explorer.options, { a: 1 })
  })

  test("layout merges; arrays like byPageType.*.exclude replace", () => {
    const merged = mergeQuartzConfigs(base(), {
      layout: { byPageType: { folder: { exclude: [] }, tag: { exclude: ["graph"] } } },
    })
    assert.deepStrictEqual(merged.layout, {
      byPageType: { folder: { exclude: [] }, tag: { exclude: ["graph"] } },
    })
  })

  test("does not modify the base", () => {
    const b = base()
    const before = JSON.stringify(b)
    mergeQuartzConfigs(b, {
      configuration: { pageTitle: "x" },
      plugins: [{ source: "@quartz-community/explorer", options: { a: 2 } } as never],
    })
    assert.strictEqual(JSON.stringify(b), before)
  })

  test("a plugin entry without source is an error", () => {
    assert.throws(
      () => mergeQuartzConfigs(base(), { plugins: [{ enabled: false } as never] }),
      ConfigExtendsError,
    )
  })
})

describe("resolveExtends", () => {
  const files: Record<string, string> = {}
  const root = path.resolve("/site")
  const readFile = (f: string) => {
    const content = files[path.resolve(f)]
    if (content === undefined) throw new Error("ENOENT")
    return content
  }
  const put = (rel: string, data: unknown) => {
    files[path.join(root, rel)] = YAML.stringify(data)
  }
  put("quartz.config.default.yaml", base())

  test("a config without extends is returned as is", async () => {
    const data = { configuration: { pageTitle: "x" }, plugins: [] }
    assert.strictEqual(
      await resolveExtends(data, path.join(root, "quartz.config.yaml")),
      data as never,
    )
  })

  test("extends: default merges onto quartz.config.default.yaml", async () => {
    const merged = await resolveExtends(
      {
        extends: "default",
        configuration: { pageTitle: "Mine" },
        plugins: [{ source: "@quartz-community/graph", enabled: false }],
      },
      path.join(root, "quartz.config.yaml"),
      { quartzRoot: root, readFile },
    )
    assert.strictEqual(merged.configuration.pageTitle, "Mine")
    assert.deepStrictEqual(merged.configuration.ignorePatterns, ["private", ".obsidian"])
    assert.strictEqual(
      merged.plugins.find((p) => pluginMatchKey(p.source) === "graph")!.enabled,
      false,
    )
    assert.ok(!("extends" in merged))
  })

  test("relative paths, chains and lists (later wins)", async () => {
    put("configs/team.yaml", {
      extends: "default",
      configuration: { pageTitle: "Team", locale: "cs-CZ" },
    })
    put("configs/dark.yaml", { configuration: { pageTitle: "Dark" } })
    const merged = await resolveExtends(
      {
        extends: ["./configs/team.yaml", "configs/dark.yaml"],
        configuration: { baseUrl: "x.org" },
      },
      path.join(root, "quartz.config.yaml"),
      { quartzRoot: root, readFile },
    )
    assert.strictEqual(merged.configuration.pageTitle, "Dark")
    assert.strictEqual(merged.configuration.locale, "cs-CZ")
    assert.strictEqual(merged.configuration.baseUrl, "x.org")
    assert.strictEqual(merged.plugins.length, 3) // from default, through team.yaml
  })

  test("presets stack: each listed base adds its own changes; a shared base applies once", async () => {
    put("presets/title.yaml", {
      extends: "default",
      configuration: { pageTitle: "Preset A", locale: "fr-FR" },
      plugins: [{ source: "@quartz-community/graph", enabled: false }],
    })
    put("presets/explorer.yaml", {
      extends: "default",
      configuration: { locale: "nl-NL" },
      plugins: [{ source: "@quartz-community/explorer", options: { b: 2 } }],
    })
    const merged = await resolveExtends(
      { extends: ["./presets/title.yaml", "./presets/explorer.yaml"] },
      path.join(root, "quartz.config.yaml"),
      { quartzRoot: root, readFile },
    )
    // a's changes survive b (both extend default)
    assert.strictEqual(merged.configuration.pageTitle, "Preset A")
    assert.strictEqual(
      merged.plugins.find((p) => pluginMatchKey(p.source) === "graph")!.enabled,
      false,
    )
    // b wins where both change something
    assert.strictEqual(merged.configuration.locale, "nl-NL")
    assert.deepStrictEqual(
      merged.plugins.find((p) => pluginMatchKey(p.source) === "explorer")!.options,
      { a: 1, nested: { x: 1 }, b: 2 },
    )
    assert.strictEqual(merged.plugins.length, 3)
  })

  test("diamond: a base reached twice is applied once, at its first appearance", async () => {
    put("d/common.yaml", { extends: "default", configuration: { locale: "common" } })
    put("d/left.yaml", { extends: "./common.yaml", configuration: { pageTitle: "Left" } })
    put("d/right.yaml", { extends: "./common.yaml", configuration: { baseUrl: "right.org" } })
    const merged = await resolveExtends(
      { extends: ["./d/left.yaml", "./d/right.yaml", "./d/left.yaml"] },
      path.join(root, "quartz.config.yaml"),
      { quartzRoot: root, readFile },
    )
    assert.strictEqual(merged.configuration.pageTitle, "Left")
    assert.strictEqual(merged.configuration.baseUrl, "right.org")
    assert.strictEqual(merged.configuration.locale, "common")
    assert.deepStrictEqual(
      await localExtendsFiles(
        { extends: ["./d/left.yaml", "./d/right.yaml"] },
        path.join(root, "quartz.config.yaml"),
        { quartzRoot: root, readFile },
      ),
      ["quartz.config.default.yaml", "d/common.yaml", "d/left.yaml", "d/right.yaml"].map((f) =>
        path.join(root, f),
      ),
    )
  })

  test("extends: [] is no base; an empty base file is an empty config", async () => {
    const data = { extends: [], configuration: { pageTitle: "x" }, plugins: [] }
    assert.deepStrictEqual(await resolveExtends(data, path.join(root, "quartz.config.yaml")), {
      configuration: { pageTitle: "x" },
      plugins: [],
    })
    files[path.join(root, "empty.yaml")] = "# nothing here yet\n"
    const merged = await resolveExtends(
      { extends: ["default", "./empty.yaml"], configuration: { pageTitle: "E" } },
      path.join(root, "quartz.config.yaml"),
      { quartzRoot: root, readFile },
    )
    assert.strictEqual(merged.configuration.pageTitle, "E")
    assert.strictEqual(merged.plugins.length, 3)
  })

  test("plugins that are not a list are reported clearly", async () => {
    await assert.rejects(
      () =>
        resolveExtends(
          { extends: "default", plugins: { explorer: { enabled: false } } },
          path.join(root, "quartz.config.yaml"),
          { quartzRoot: root, readFile },
        ),
      (err: Error) => err instanceof ConfigExtendsError && /must be a list/.test(err.message),
    )
  })

  test("cycles and missing files are reported", async () => {
    put("a.yaml", { extends: "./b.yaml" })
    put("b.yaml", { extends: "./a.yaml" })
    await assert.rejects(
      () =>
        resolveExtends({ extends: "./a.yaml" }, path.join(root, "quartz.config.yaml"), {
          quartzRoot: root,
          readFile,
        }),
      {
        name: "ConfigExtendsError",
        message: '"extends" cycle: quartz.config.yaml → a.yaml → b.yaml → a.yaml',
      },
    )
    await assert.rejects(
      () =>
        resolveExtends({ extends: "./nope.yaml" }, path.join(root, "quartz.config.yaml"), {
          quartzRoot: root,
          readFile,
        }),
      /not found/,
    )
    await assert.rejects(
      () =>
        resolveExtends({ extends: 3 }, path.join(root, "quartz.config.yaml"), {
          quartzRoot: root,
          readFile,
        }),
      ConfigExtendsError,
    )
  })

  test("a base that is not a configuration object is an error", async () => {
    files[path.join(root, "list.yaml")] = "- source: explorer\n- source: graph\n"
    const file = path.join(root, "list.yaml")
    await assert.rejects(
      resolveExtends({ extends: "./list.yaml" }, path.join(root, "quartz.config.yaml"), {
        quartzRoot: root,
        readFile,
      }),
      {
        name: "ConfigExtendsError",
        message: `"extends: ./list.yaml": ${file} is not a valid config (${file} does not contain a configuration object)`,
      },
    )
  })

  test("extends: default reproduces the shipped default config exactly", async () => {
    const defaultFile = path.resolve("quartz.config.default.yaml")
    const shipped = YAML.parse(fs.readFileSync(defaultFile, "utf-8"))
    const merged = await resolveExtends({ extends: "default" }, path.resolve("quartz.config.yaml"))
    assert.deepStrictEqual(merged, shipped)
  })

  describe("https bases", () => {
    const remote: Record<string, string> = {
      "https://cfg.example/base/site.yaml": YAML.stringify({
        extends: "./common.yaml",
        configuration: { pageTitle: "Remote" },
      }),
      "https://cfg.example/base/common.yaml": YAML.stringify({
        extends: "default",
        configuration: { locale: "de-DE" },
      }),
    }
    const fetchRemote = async (url: string) => {
      if (!(url in remote)) throw new ConfigExtendsError(`404 ${url}`)
      return remote[url]
    }
    const opts = () => ({ quartzRoot: root, readFile, fetchRemote })

    test("a URL base; its relative extends resolve against the URL; default stays local", async () => {
      const merged = await resolveExtends(
        { extends: "https://cfg.example/base/site.yaml", configuration: { baseUrl: "me.org" } },
        path.join(root, "quartz.config.yaml"),
        opts(),
      )
      assert.strictEqual(merged.configuration.pageTitle, "Remote")
      assert.strictEqual(merged.configuration.locale, "de-DE")
      assert.strictEqual(merged.configuration.baseUrl, "me.org")
      assert.strictEqual(merged.plugins.length, 3) // the local default, via the remote chain
    })

    test("uppercase HTTPS:// is https", async () => {
      const merged = await resolveExtends(
        { extends: "HTTPS://CFG.example/base/site.yaml" },
        path.join(root, "quartz.config.yaml"),
        opts(),
      )
      assert.strictEqual(merged.configuration.pageTitle, "Remote")
    })

    test("only https", async () => {
      await assert.rejects(
        resolveExtends({ extends: "http://cfg.example/x.yaml" }, path.join(root, "q.yaml"), opts()),
        /only https/,
      )
      assert.strictEqual(
        resolveTarget("../other.yaml", "https://cfg.example/base/site.yaml", root),
        "https://cfg.example/other.yaml",
      )
    })
  })
})

describe("fetchRemoteConfig", () => {
  const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "quartz-extends-"))
  const ok = (body: string) =>
    (async () => new Response(body, { status: 200 })) as unknown as typeof fetch
  const failing = (async () => {
    throw new Error("getaddrinfo ENOTFOUND")
  }) as unknown as typeof fetch

  test("caches a fetched copy and falls back to it when offline or failing", async () => {
    const cacheDir = tmp()
    const url = "https://cfg.example/a.yaml"
    assert.strictEqual(
      await fetchRemoteConfig(url, { cacheDir, fetchImpl: ok("a: 1\n"), offline: false }),
      "a: 1\n",
    )
    const warnings: string[] = []
    const other = tmp()
    fs.cpSync(cacheDir, other, { recursive: true })
    assert.strictEqual(
      await fetchRemoteConfig(url, {
        cacheDir: other,
        fetchImpl: failing,
        offline: false,
        warn: (m) => warnings.push(m),
      }),
      "a: 1\n",
    )
    assert.match(warnings[0], /using the cached copy/)
    // offline (QUARTZ_EXTENDS_OFFLINE=1, worker threads): the cache only
    assert.strictEqual(
      await fetchRemoteConfig("https://cfg.example/a.yaml?x", {
        cacheDir: other,
        offline: true,
      }).catch((e: Error) => e.message),
      `"extends: https://cfg.example/a.yaml?x": no cached copy in ${other} (offline build). Build once online first.`,
    )
  })

  test("without a cached copy a failed fetch stops the build", async () => {
    await assert.rejects(
      fetchRemoteConfig("https://cfg.example/b.yaml", {
        cacheDir: tmp(),
        fetchImpl: failing,
        offline: false,
      }),
      /could not be fetched: getaddrinfo ENOTFOUND/,
    )
    await assert.rejects(
      fetchRemoteConfig("https://cfg.example/c.yaml", { cacheDir: tmp(), offline: true }),
      /no cached copy/,
    )
  })

  test("HTTP errors are failures, too", async () => {
    const notFound = (async () => new Response("nope", { status: 404 })) as unknown as typeof fetch
    await assert.rejects(
      fetchRemoteConfig("https://cfg.example/d.yaml", {
        cacheDir: tmp(),
        fetchImpl: notFound,
        offline: false,
      }),
      /HTTP 404/,
    )
  })
})

describe("fetchRemoteConfig limits and memoisation", () => {
  const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), "quartz-extends-"))
  /** A fetch that answers `body` (from `finalUrl` after redirects) and counts its calls. */
  const counting = (body: string, finalUrl?: string) => {
    const calls: string[] = []
    const impl = (async (url: string) => {
      calls.push(url)
      return {
        ok: true,
        status: 200,
        url: finalUrl ?? url,
        text: async () => body,
      }
    }) as unknown as typeof fetch
    return { calls, impl }
  }
  const failing = (async () => {
    throw new Error("getaddrinfo ENOTFOUND")
  }) as unknown as typeof fetch

  test("two calls for one URL fetch once", async () => {
    const cacheDir = tmp()
    const { calls, impl } = counting("a: 1\n")
    const url = "https://cfg.example/memo.yaml"
    const warnings: string[] = []
    const opts = {
      cacheDir,
      fetchImpl: impl,
      offline: false,
      warn: (m: string) => warnings.push(m),
    }
    const [first, second] = await Promise.all([
      fetchRemoteConfig(url, opts),
      fetchRemoteConfig(url, opts),
    ])
    assert.strictEqual(await fetchRemoteConfig(url, opts), "a: 1\n")
    assert.deepStrictEqual([first, second], ["a: 1\n", "a: 1\n"])
    assert.deepStrictEqual(calls, [url])
    assert.deepStrictEqual(warnings, [])
  })

  test("a failed fetch is tried again by the next call", async () => {
    const cacheDir = tmp()
    const url = "https://cfg.example/retry.yaml"
    await assert.rejects(
      fetchRemoteConfig(url, { cacheDir, fetchImpl: failing, offline: false }),
      /could not be fetched: getaddrinfo ENOTFOUND/,
    )
    const { calls, impl } = counting("b: 2\n")
    assert.strictEqual(
      await fetchRemoteConfig(url, { cacheDir, fetchImpl: impl, offline: false }),
      "b: 2\n",
    )
    assert.deepStrictEqual(calls, [url])
  })

  test("offline, the cached copy is returned without fetching", async () => {
    const online = tmp()
    const url = "https://cfg.example/offline.yaml"
    await fetchRemoteConfig(url, { cacheDir: online, fetchImpl: counting("c: 3\n").impl })
    const offlineDir = tmp()
    fs.cpSync(online, offlineDir, { recursive: true })
    const { calls, impl } = counting("c: changed\n")
    assert.strictEqual(
      await fetchRemoteConfig(url, { cacheDir: offlineDir, fetchImpl: impl, offline: true }),
      "c: 3\n",
    )
    assert.deepStrictEqual(calls, [])
  })

  test("a redirect to http:// is an error, even with a cached copy", async () => {
    const url = "https://cfg.example/redirected.yaml"
    const cacheDir = tmp()
    await fetchRemoteConfig(url, { cacheDir, fetchImpl: counting("d: 4\n").impl })
    const other = tmp()
    fs.cpSync(cacheDir, other, { recursive: true })
    const warnings: string[] = []
    await assert.rejects(
      fetchRemoteConfig(url, {
        cacheDir: other,
        fetchImpl: counting("d: evil\n", "http://evil.example/x.yaml").impl,
        offline: false,
        warn: (m) => warnings.push(m),
      }),
      {
        name: "ConfigExtendsError",
        message: `"extends: ${url}" redirected to http://evil.example/x.yaml, which is not https`,
      },
    )
    assert.deepStrictEqual(warnings, [])
    // a redirect that stays on https is fine
    assert.strictEqual(
      await fetchRemoteConfig(url, {
        cacheDir: tmp(),
        fetchImpl: counting("d: 5\n", "https://mirror.example/x.yaml").impl,
        offline: false,
      }),
      "d: 5\n",
    )
  })

  test("a body over 1 MB is an error and is not cached", async () => {
    const limit = 1024 * 1024
    const exactly = tmp()
    const atLimit = "#".repeat(limit)
    assert.strictEqual(
      await fetchRemoteConfig("https://cfg.example/1mb.yaml", {
        cacheDir: exactly,
        fetchImpl: counting(atLimit).impl,
        offline: false,
      }),
      atLimit,
    )
    for (const [name, body] of [
      ["over.yaml", "#".repeat(limit + 1)],
      // 524 289 characters, 1 048 578 bytes: the limit is in bytes
      ["utf8.yaml", "é".repeat(limit / 2 + 1)],
    ]) {
      const url = `https://cfg.example/${name}`
      const cacheDir = tmp()
      await assert.rejects(
        fetchRemoteConfig(url, { cacheDir, fetchImpl: counting(body).impl, offline: false }),
        { name: "ConfigExtendsError", message: `"extends: ${url}" is larger than 1 MB` },
      )
      assert.deepStrictEqual(fs.readdirSync(cacheDir), [])
    }
  })
})

describe("resolveTarget accepts only https URLs", () => {
  const from = path.resolve("/site/quartz.config.yaml")
  test("an http URL with https:// in its query is refused", () => {
    for (const target of [
      "http://evil.example/?https://cfg.example/x.yaml",
      "http://evil.example/https://cfg.example/x.yaml",
      "file:///etc/https://x.yaml",
    ]) {
      assert.throws(() => resolveTarget(target, from, "/site"), {
        name: "ConfigExtendsError",
        message: `${from}: "extends: ${target}" — only https:// URLs can be extended`,
      })
    }
    assert.throws(
      () => resolveTarget("?https://x", "http://evil.example/base.yaml", "/site"),
      /only https:\/\/ URLs can be extended/,
    )
  })

  test("a local path that contains :// is a path, not a URL", () => {
    assert.strictEqual(
      resolveTarget("mirror/https://cfg.example/x.yaml", from, "/site"),
      path.resolve("/site/mirror/https:/cfg.example/x.yaml"),
    )
  })
})
