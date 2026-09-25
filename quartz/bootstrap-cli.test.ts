import assert from "node:assert"
import { readFileSync } from "node:fs"
import test, { describe } from "node:test"

const source = readFileSync(new URL("./bootstrap-cli.mjs", import.meta.url), "utf8")
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"))

describe("bootstrap CLI Node.js version gate", () => {
  test("derives the minimum Node.js version from package.json engines", () => {
    assert.match(source, /engines\.node/, "bootstrap-cli.mjs should read engines.node")
    assert.match(source, /package\.json/, "bootstrap-cli.mjs should load package.json")
    assert.doesNotMatch(
      source,
      /requires Node\.js >= \d|major < \d/,
      "bootstrap-cli.mjs must not hardcode a Node.js major",
    )
  })

  test("package.json declares an exact major engine floor", () => {
    const match = String(pkg.engines.node).match(/\d+/)
    assert.ok(match, "engines.node should start with a numeric major")
    assert.strictEqual(Number(match[0]) >= 26, true)
  })
})
