import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "fs"
import path from "path"
import YAML from "yaml"
import {
  levenshtein,
  suggestClosest,
  shortPluginName,
  findConfigEntries,
  validatePluginOptions,
  validatePluginEntry,
  parseOptionPath,
  setOptionPath,
  unsetOptionPath,
  LAYOUT_POSITIONS,
} from "./plugin-validation.js"
import { extractPluginName, formatSource } from "./plugin-data.js"

const helpers = { extractName: extractPluginName, formatSource }

describe("levenshtein / suggestClosest", () => {
  test("computes edit distance", () => {
    assert.strictEqual(levenshtein("kitten", "sitting"), 3)
    assert.strictEqual(levenshtein("", "abc"), 3)
    assert.strictEqual(levenshtein("same", "same"), 0)
  })

  test("suggests close candidates and ignores distant ones", () => {
    assert.strictEqual(suggestClosest("lst", ["list", "install"]), "list")
    assert.strictEqual(
      suggestClosest("folderDefaultStat", ["folderDefaultState"]),
      "folderDefaultState",
    )
    assert.strictEqual(suggestClosest("ENABLED", ["enabled"]), "enabled")
    assert.strictEqual(suggestClosest("zzzz", ["list", "install"]), null)
  })
})

describe("shortPluginName", () => {
  test("strips npm scopes only", () => {
    assert.strictEqual(shortPluginName("@quartz-community/explorer"), "explorer")
    assert.strictEqual(shortPluginName("explorer"), "explorer")
  })
})

describe("findConfigEntries", () => {
  const plugins = [
    { source: "@quartz-community/explorer", enabled: true },
    { source: "github:someone/graph", enabled: true },
    { source: { repo: "https://github.com/a/mono.git", subdir: "x", name: "custom" } },
  ]

  test("matches the full npm name, the short name and github names", () => {
    assert.deepStrictEqual(
      findConfigEntries(plugins, "@quartz-community/explorer", helpers).indices,
      [0],
    )
    assert.deepStrictEqual(findConfigEntries(plugins, "explorer", helpers).indices, [0])
    assert.deepStrictEqual(findConfigEntries(plugins, "graph", helpers).indices, [1])
    assert.deepStrictEqual(findConfigEntries(plugins, "custom", helpers).indices, [2])
  })

  test("suggests a near miss", () => {
    const result = findConfigEntries(plugins, "explorr", helpers)
    assert.deepStrictEqual(result.indices, [])
    assert.strictEqual(result.suggestion, "explorer")
  })

  test("reports ambiguity when two scopes share a short name", () => {
    const dupes = [{ source: "@a/thing" }, { source: "@b/thing" }]
    assert.deepStrictEqual(findConfigEntries(dupes, "thing", helpers).indices, [0, 1])
    assert.deepStrictEqual(findConfigEntries(dupes, "@b/thing", helpers).indices, [1])
  })
})

describe("validatePluginOptions", () => {
  const manifest = {
    defaultOptions: {
      folderDefaultState: "collapsed",
      useSavedState: true,
      limit: 10,
      nested: { depth: 2 },
    },
  }

  test("flags typos with a suggestion", () => {
    const issues = validatePluginOptions({ folderDefaultStat: "open" }, manifest)
    assert.strictEqual(issues.length, 1)
    assert.strictEqual(issues[0].severity, "warning")
    assert.strictEqual(issues[0].suggestion, "folderDefaultState")
  })

  test("flags type mismatches against defaults", () => {
    const issues = validatePluginOptions({ useSavedState: "yes", limit: "10" }, manifest)
    assert.deepStrictEqual(
      issues.map((i) => i.path),
      ["useSavedState", "limit"],
    )
    assert.ok(issues.every((i) => i.severity === "warning"))
  })

  test("undocumented keys without a close match are informational only", () => {
    const issues = validatePluginOptions({ sortFn: "x" }, manifest)
    assert.strictEqual(issues.length, 1)
    assert.strictEqual(issues[0].severity, "info")
  })

  test("checks nested objects", () => {
    const issues = validatePluginOptions({ nested: { dpth: 3 } }, manifest)
    assert.strictEqual(issues.length, 1)
    assert.strictEqual(issues[0].path, "nested.dpth")
  })

  test("valid options and null values produce no issues", () => {
    assert.deepStrictEqual(
      validatePluginOptions({ useSavedState: false, limit: 3, folderDefaultState: null }, manifest),
      [],
    )
  })

  test("is silent when the manifest documents no options", () => {
    assert.deepStrictEqual(validatePluginOptions({ anything: 1 }, { defaultOptions: {} }), [])
    assert.deepStrictEqual(validatePluginOptions({ anything: 1 }, null), [])
  })

  test("honours configSchema enums and additionalProperties: false", () => {
    const schemaManifest = {
      configSchema: {
        type: "object",
        additionalProperties: false,
        properties: { mode: { type: "string", enum: ["light", "dark"] } },
      },
    }
    const issues = validatePluginOptions({ mode: "drak", other: 1 }, schemaManifest)
    assert.strictEqual(issues.length, 2)
    assert.strictEqual(issues[0].suggestion, "dark")
    assert.strictEqual(issues[1].severity, "warning")
  })
})

describe("validatePluginEntry", () => {
  test("accepts a well-formed entry", () => {
    assert.deepStrictEqual(
      validatePluginEntry({
        source: "@quartz-community/explorer",
        enabled: true,
        options: {},
        order: 50,
        layout: { position: "left", priority: 50 },
      }),
      [],
    )
  })

  test("catches typoed keys and a missing enabled flag", () => {
    const issues = validatePluginEntry({ source: "x/y", enable: true, option: {} })
    const messages = issues.map((i) => i.message).join("\n")
    assert.match(messages, /did you mean "enabled"/)
    assert.match(messages, /did you mean "options"/)
    assert.match(messages, /treated as disabled/)
  })

  test("warns about string booleans", () => {
    const issues = validatePluginEntry({ source: "x/y", enabled: "false" })
    assert.strictEqual(issues.length, 1)
    assert.match(issues[0].message, /treated as enabled/)
  })

  test("checks layout keys and positions", () => {
    const issues = validatePluginEntry({
      source: "x/y",
      enabled: true,
      layout: { positon: "left", position: "rigth" },
    })
    assert.deepStrictEqual(
      issues.map((i) => i.suggestion),
      ["position", "right"],
    )
  })

  test("errors on a missing source", () => {
    assert.strictEqual(validatePluginEntry({ enabled: true })[0].severity, "error")
  })
})

describe("option paths", () => {
  test("parses dotted and bracketed paths", () => {
    assert.deepStrictEqual(parseOptionPath("a.b.c"), ["a", "b", "c"])
    assert.deepStrictEqual(parseOptionPath('a["x.y"]'), ["a", "x.y"])
  })

  test("sets and unsets nested values", () => {
    const options = {}
    setOptionPath(options, ["a", "b"], 1)
    assert.deepStrictEqual(options, { a: { b: 1 } })
    assert.strictEqual(unsetOptionPath(options, ["a", "b"]), true)
    assert.deepStrictEqual(options, {})
    assert.strictEqual(unsetOptionPath(options, ["missing"]), false)
  })
})

describe("shipped configs", () => {
  const root = path.resolve(import.meta.dirname, "..", "..")
  const schema = JSON.parse(
    fs.readFileSync(path.join(root, "quartz", "plugins", "quartz-plugins.schema.json"), "utf-8"),
  )
  const schemaPositions = schema.properties.plugins.items.properties.layout.properties.position.enum
  const files = [
    path.join(root, "quartz.config.default.yaml"),
    ...fs
      .readdirSync(path.join(root, "quartz", "cli", "templates"))
      .filter((f) => f.endsWith(".yaml"))
      .map((f) => path.join(root, "quartz", "cli", "templates", f)),
  ]

  test("schema and CLI agree on layout positions", () => {
    assert.deepStrictEqual([...schemaPositions].sort(), [...LAYOUT_POSITIONS].sort())
  })

  for (const file of files) {
    test(`${path.basename(file)} has no plugin entry problems`, () => {
      const data = YAML.parse(fs.readFileSync(file, "utf-8"))
      for (const entry of data.plugins) {
        assert.deepStrictEqual(validatePluginEntry(entry), [], JSON.stringify(entry.source))
        if (entry.layout?.position) {
          assert.ok(schemaPositions.includes(entry.layout.position), entry.layout.position)
        }
      }
    })
  }
})
