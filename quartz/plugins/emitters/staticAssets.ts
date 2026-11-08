import fs from "fs"
import path from "path"
import { BuildCtx } from "../../util/ctx"
import { FilePath, joinSegments } from "../../util/path"
import { StaticAsset } from "../../util/resources"
import { warn } from "../../util/diagnostics"

/** Output directory (below the site output) that plugin assets are copied to. */
export const PLUGIN_ASSET_DIR = "static/plugins"

/** `to` must stay inside static/plugins/: relative, no `..`, no backslashes. */
export function normalizeAssetTarget(to: string): string | undefined {
  if (typeof to !== "string") return undefined
  const trimmed = to.replace(/^\/+|\/+$/g, "")
  if (!trimmed || trimmed.includes("\\")) return undefined
  const parts = trimmed.split("/")
  if (parts.some((p) => p === "" || p === "." || p === "..")) return undefined
  return parts.join("/")
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const entry of await fs.promises.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (entry.isFile()) yield full
  }
}

/**
 * Copy the files and directories plugins return in `externalResources().assets` to
 * `<output>/static/plugins/<to>`. Invalid targets, missing sources and two plugins claiming the
 * same target are reported as warnings instead of failing the build.
 */
export async function* emitStaticAssets(
  ctx: BuildCtx,
  assets: StaticAsset[] | undefined,
): AsyncGenerator<FilePath> {
  const claimed = new Map<string, string>()
  for (const asset of assets ?? []) {
    const target = normalizeAssetTarget(asset?.to)
    if (!target) {
      warn({
        area: "assets",
        message: `A plugin asset has an invalid target ${JSON.stringify(asset?.to)} (must be a relative path below static/plugins/).`,
      })
      continue
    }
    const previous = claimed.get(target)
    if (previous !== undefined) {
      if (previous !== asset.from) {
        warn({
          area: "assets",
          message: `Two plugin assets are copied to static/plugins/${target} (${previous} and ${asset.from}); keeping the first.`,
        })
      }
      continue
    }
    claimed.set(target, asset.from)

    let stat: fs.Stats
    try {
      stat = await fs.promises.stat(asset.from)
    } catch {
      warn({
        area: "assets",
        message: `Plugin asset ${asset.from} (for static/plugins/${target}) does not exist.`,
        hint: "Reinstall the plugin, or report it to the plugin's author.",
      })
      continue
    }

    const destRoot = joinSegments(ctx.argv.output, PLUGIN_ASSET_DIR, target)
    const files = stat.isDirectory() ? walk(asset.from) : single(asset.from)
    for await (const file of files) {
      const dest = (
        stat.isDirectory() ? path.join(destRoot, path.relative(asset.from, file)) : destRoot
      ) as FilePath
      await fs.promises.mkdir(path.dirname(dest), { recursive: true })
      await fs.promises.copyFile(file, dest)
      yield dest
    }
  }
}

async function* single(file: string): AsyncGenerator<string> {
  yield file
}
