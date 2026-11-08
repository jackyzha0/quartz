import test, { describe } from "node:test"
import assert from "node:assert"
import YAML from "yaml"
import { stringifyConfigYaml, parseGitSource, extractPluginName } from "./plugin-data.js"

const ORIGINAL = `# yaml-language-server: $schema=./quartz/plugins/quartz-plugins.schema.json
configuration:
  pageTitle: "My Garden" # site title
plugins:
  # keep explorer first
  - source: "@quartz-community/explorer" # inline note
    enabled: true
    layout:
      position: left
      priority: 50
  # graph, tweaked
  - source: "@quartz-community/graph"
    enabled: true
    options:
      localGraph: { depth: 2 }
`

describe("stringifyConfigYaml", () => {
  test("round-trips an unchanged document byte for byte", () => {
    assert.strictEqual(stringifyConfigYaml(YAML.parse(ORIGINAL), ORIGINAL), ORIGINAL)
  })

  test("keeps comments and quoting when a value changes", () => {
    const data = YAML.parse(ORIGINAL)
    data.plugins[0].enabled = false
    const out = stringifyConfigYaml(data, ORIGINAL)
    assert.match(out, /# keep explorer first/)
    assert.match(out, /"@quartz-community\/explorer" # inline note/)
    assert.match(out, /pageTitle: "My Garden" # site title/)
    assert.match(out, /# graph, tweaked/)
    assert.deepStrictEqual(YAML.parse(out), data)
  })

  test("removing an entry keeps the comments of the others", () => {
    const data = YAML.parse(ORIGINAL)
    data.plugins.splice(0, 1)
    const out = stringifyConfigYaml(data, ORIGINAL)
    // (a comment directly above the first list item belongs to the list and is kept)
    assert.doesNotMatch(out, /@quartz-community\/explorer/)
    assert.match(out, /# graph, tweaked/)
    assert.match(out, /localGraph: \{ depth: 2 \}/)
    assert.deepStrictEqual(YAML.parse(out), data)
  })

  test("adds new entries and options", () => {
    const data = YAML.parse(ORIGINAL)
    data.plugins[0].options = { folderDefaultState: "open" }
    data.plugins.push({ source: "github:me/thing", enabled: true })
    const out = stringifyConfigYaml(data, ORIGINAL)
    assert.deepStrictEqual(YAML.parse(out), data)
    assert.match(out, /# keep explorer first/)
  })

  test("writes a schema header for brand-new files", () => {
    const out = stringifyConfigYaml({ configuration: {}, plugins: [] })
    assert.ok(out.startsWith("# yaml-language-server: $schema="))
  })

  test("falls back to a fresh document when the old one is invalid", () => {
    const data = { configuration: { pageTitle: "x" }, plugins: [] }
    const out = stringifyConfigYaml(data, "plugins: [\n")
    assert.deepStrictEqual(YAML.parse(out), data)
  })
})

describe("parseGitSource", () => {
  test("accepts owner/repo shorthand like the build loader", () => {
    const parsed = parseGitSource("quartz-community/spacer#dev")
    assert.strictEqual(parsed.name, "spacer")
    assert.strictEqual(parsed.url, "https://github.com/quartz-community/spacer.git")
    assert.strictEqual(parsed.ref, "dev")
    assert.strictEqual(extractPluginName("quartz-community/spacer"), "spacer")
  })

  test("uses the ref field of object sources", () => {
    const parsed = parseGitSource({ repo: "github:me/mono", subdir: "pkg", ref: "v2" })
    assert.strictEqual(parsed.ref, "v2")
    assert.strictEqual(parsed.subdir, "pkg")
  })

  test("still treats @scope/name as npm", () => {
    assert.strictEqual(parseGitSource("@quartz-community/explorer").npmPackage, true)
  })

  test("explains supported formats for unknown sources", () => {
    assert.throws(() => parseGitSource("explorer"), /Supported formats/)
    assert.throws(() => parseGitSource("github:onlyowner"), /Expected github:owner\/repo/)
  })
})
