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

  test("cycles and missing files are reported", async () => {
    put("a.yaml", { extends: "./b.yaml" })
    put("b.yaml", { extends: "./a.yaml" })
    await assert.rejects(
      () =>
        resolveExtends({ extends: "./a.yaml" }, path.join(root, "quartz.config.yaml"), {
          quartzRoot: root,
          readFile,
        }),
      /cycle/,
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
    // memoised per process: a second call does not fetch again
    assert.strictEqual(
      await fetchRemoteConfig(url, { cacheDir, fetchImpl: failing, offline: false }),
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
