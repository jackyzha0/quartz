import test, { describe, beforeEach } from "node:test"
import assert from "node:assert"
import fs from "fs"
import os from "os"
import path from "path"
import { emitStaticAssets, normalizeAssetTarget } from "./staticAssets"
import { getDiagnostics, resetDiagnostics } from "../../util/diagnostics"
import type { BuildCtx } from "../../util/ctx"

async function collect<T>(gen: AsyncGenerator<T>): Promise<T[]> {
  const out: T[] = []
  for await (const item of gen) out.push(item)
  return out
}

function setup() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "quartz-assets-"))
  const src = path.join(root, "src")
  fs.mkdirSync(path.join(src, "chunks"), { recursive: true })
  fs.writeFileSync(path.join(src, "lazy.js"), "export {}")
  fs.writeFileSync(path.join(src, "chunks", "a.js"), "export const a = 1")
  fs.writeFileSync(path.join(root, "single.wasm"), Buffer.from([0, 97, 115, 109]))
  const ctx = { argv: { output: path.join(root, "public") } } as unknown as BuildCtx
  return { root, src, ctx }
}

describe("normalizeAssetTarget", () => {
  test("accepts relative paths below static/plugins and rejects escapes", () => {
    assert.strictEqual(normalizeAssetTarget("ofm/pele"), "ofm/pele")
    assert.strictEqual(normalizeAssetTarget("/ofm/pele/"), "ofm/pele")
    for (const bad of ["", "..", "a/../b", "a//b", "./a", "a\\b"]) {
      assert.strictEqual(normalizeAssetTarget(bad), undefined, bad)
    }
  })
})

describe("emitStaticAssets", () => {
  beforeEach(() => resetDiagnostics())

  test("copies directories recursively and single files, yielding written paths", async () => {
    const { root, src, ctx } = setup()
    const written = await collect(
      emitStaticAssets(ctx, [
        { from: src, to: "ofm/pele" },
        { from: path.join(root, "single.wasm"), to: "other/engine.wasm" },
      ]),
    )
    const rel = written.map((f) => path.relative(ctx.argv.output, f)).sort()
    assert.deepStrictEqual(rel, [
      path.join("static/plugins/ofm/pele/chunks/a.js"),
      path.join("static/plugins/ofm/pele/lazy.js"),
      path.join("static/plugins/other/engine.wasm"),
    ])
    assert.deepStrictEqual(
      [...fs.readFileSync(path.join(ctx.argv.output, "static/plugins/other/engine.wasm"))],
      [0, 97, 115, 109],
    )
  })

  test("warns about invalid targets, missing sources and conflicting targets", async () => {
    const { root, src, ctx } = setup()
    const written = await collect(
      emitStaticAssets(ctx, [
        { from: src, to: "../escape" },
        { from: path.join(root, "nope"), to: "missing" },
        { from: src, to: "dup" },
        { from: path.join(root, "single.wasm"), to: "dup" },
        { from: src, to: "dup" },
      ]),
    )
    assert.strictEqual(written.length, 2) // only the first "dup"
    const messages = getDiagnostics().map((d) => d.message)
    assert.strictEqual(messages.length, 3)
    assert.match(messages[0], /invalid target/)
    assert.match(messages[1], /does not exist/)
    assert.match(messages[2], /Two plugin assets are copied to static\/plugins\/dup/)
  })
})
