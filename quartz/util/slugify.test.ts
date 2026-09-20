import { test, describe } from "node:test"
import assert from "node:assert"
import { resolveSlugify } from "./slugify"
import { QuartzTransformerPluginInstance } from "../plugins/types"
import { FilePath, FullSlug, slugifyFilePath } from "./path"

function transformer(
  name: string,
  slugify?: QuartzTransformerPluginInstance["slugify"],
): QuartzTransformerPluginInstance {
  return { name, slugify }
}

describe("resolveSlugify", () => {
  test("falls back to the built-in slugifyFilePath when no plugin overrides it", () => {
    const slugify = resolveSlugify([transformer("A"), transformer("B")])
    assert.strictEqual(slugify, slugifyFilePath)
  })

  test("falls back to the built-in slugifyFilePath with an empty plugin list", () => {
    const slugify = resolveSlugify([])
    assert.strictEqual(slugify, slugifyFilePath)
  })

  test("uses the single plugin's override when exactly one is defined", () => {
    const custom = ((fp: FilePath) =>
      fp.toUpperCase() as FullSlug) as QuartzTransformerPluginInstance["slugify"]
    const slugify = resolveSlugify([transformer("A"), transformer("Custom", custom)])
    assert.strictEqual(slugify, custom)
    assert.strictEqual(slugify!("foo/bar.md" as FilePath), "FOO/BAR.MD")
  })

  test("throws a descriptive error when more than one plugin overrides slugify", () => {
    const one = ((fp: FilePath) =>
      fp as unknown as FullSlug) as QuartzTransformerPluginInstance["slugify"]
    const two = ((fp: FilePath) =>
      fp as unknown as FullSlug) as QuartzTransformerPluginInstance["slugify"]
    assert.throws(
      () => resolveSlugify([transformer("PluginOne", one), transformer("PluginTwo", two)]),
      /PluginOne, PluginTwo/,
    )
  })
})
