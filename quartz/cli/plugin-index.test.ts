import test, { describe } from "node:test"
import assert from "node:assert"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { pathToFileURL } from "node:url"
import esbuild from "esbuild"
import { componentRegistry } from "../components/registry"
import {
  collectPluginExports,
  isOverridableExport,
  renderPluginIndex,
  writePluginIndex,
} from "./plugin-index.js"

/** A fake Quartz checkout: <root>/quartz → this repo's quartz/, plus one installed plugin. */
function fakeSite() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-plugin-index-"))
  fs.symlinkSync(path.resolve(import.meta.dirname, ".."), path.join(root, "quartz"), "dir")
  // like Quartz's own package.json, so the generated index.ts loads as an ES module
  fs.writeFileSync(path.join(root, "package.json"), `{"type":"module"}`)
  const dist = path.join(root, ".quartz", "plugins", "my-widget", "dist")
  fs.mkdirSync(path.join(dist, "components"), { recursive: true })
  // like most component plugins: the constructor is re-exported from a sub-module
  fs.writeFileSync(
    path.join(dist, "index.d.ts"),
    `export { Widget, WidgetOptions } from './components/index.js';\nexport { helper } from './util.js';\n`,
  )
  fs.writeFileSync(
    path.join(dist, "components", "index.d.ts"),
    `import { QuartzComponent } from '@quartz-community/types';\ninterface WidgetOptions { label: string }\ndeclare const _default: (userOpts?: Partial<WidgetOptions>) => QuartzComponent;\nexport { _default as Widget, type WidgetOptions };\n`,
  )
  fs.writeFileSync(
    path.join(dist, "util.d.ts"),
    `declare const helper: (x: number) => number;\nexport { helper };\n`,
  )
  fs.writeFileSync(
    path.join(dist, "index.js"),
    `const Widget = (opts) => ({ component: "widget", opts });\nconst helper = (x) => x * 2;\nexport { Widget, helper };\n`,
  )
  fs.writeFileSync(
    path.join(root, ".quartz", "plugins", "my-widget", "package.json"),
    `{"type":"module","main":"dist/index.js"}`,
  )
  return { root, pluginsDir: path.join(root, ".quartz", "plugins") }
}

describe("plugin index", () => {
  test("component constructors re-exported from a sub-module are wrapped (#2565)", () => {
    const { root, pluginsDir } = fakeSite()
    const entry = collectPluginExports({ pluginsDir }).get("my-widget")!
    assert.deepStrictEqual(entry.overridable, ["Widget"])
    assert.deepStrictEqual(entry.passthrough, ["helper"])
    assert.deepStrictEqual(entry.types, ["WidgetOptions"])
    assert.strictEqual(entry.registryKey, "my-widget")
    fs.rmSync(root, { recursive: true, force: true })
  })

  test("calling a wrapped export records overrides AND returns the original's result", async () => {
    const { root, pluginsDir } = fakeSite()
    writePluginIndex({ pluginsDir })
    // Bundle the index as the build does (esbuild resolves "./my-widget" through its package.json),
    // keeping the registry external so this test sees the same instance.
    const registry = path.resolve(import.meta.dirname, "..", "components", "registry.ts")
    const bundle = await esbuild.build({
      entryPoints: [path.join(pluginsDir, "index.ts")],
      bundle: true,
      format: "esm",
      platform: "node",
      write: false,
      plugins: [
        {
          name: "shared-registry",
          setup(build) {
            build.onResolve({ filter: /components\/registry$/ }, () => ({
              path: pathToFileURL(registry).href,
              external: true,
            }))
          },
        },
      ],
    })
    const out = path.join(root, "index.bundle.mjs")
    fs.writeFileSync(out, bundle.outputFiles[0].text)
    const index = await import(pathToFileURL(out).href)

    const result = index.Widget({ label: "hi" })
    assert.deepStrictEqual(result, { component: "widget", opts: { label: "hi" } })
    assert.deepStrictEqual(componentRegistry.getOptionOverrides("my-widget"), { label: "hi" })
    assert.strictEqual(index.helper(2), 4)
    fs.rmSync(root, { recursive: true, force: true })
  })

  test("npm plugins register under their package name", () => {
    const source = renderPluginIndex(
      new Map([
        [
          "quartz-community__explorer",
          {
            overridable: ["Explorer"],
            passthrough: [],
            types: [],
            importPath: "@quartz-community/explorer",
            registryKey: "@quartz-community/explorer",
          },
        ],
      ]),
    )
    assert.match(source, /setOptionOverrides\("@quartz-community\/explorer"/)
    assert.match(
      source,
      /import \{ Explorer as __quartzPlugin0_Explorer \} from "@quartz-community\/explorer"/,
    )
    assert.match(
      source,
      /export const Explorer = plugins\["quartz-community__explorer"\]\.Explorer as unknown as typeof __quartzPlugin0_Explorer/,
    )
  })

  test("plain values and unknown declarations are not wrapped", () => {
    assert.strictEqual(isOverridableExport("x", "declare const x: number;"), false)
    assert.strictEqual(
      isOverridableExport("P", "declare const P: QuartzTransformerPlugin<Options>;"),
      true,
    )
  })
})
