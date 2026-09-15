import { FilePath, joinSegments, slugifyFilePath } from "../../util/path"
import { QuartzEmitterPlugin, QuartzPageTypePluginInstance } from "../types"
import { ProcessedContent } from "../vfile"
import path from "path"
import fs from "fs"
import { glob } from "../../util/glob"
import { Argv, BuildCtx } from "../../util/ctx"
import { QuartzConfig } from "../../cfg"
import { visit } from "unist-util-visit"
import { Element } from "hast"

function getPageTypeExtensions(ctx: BuildCtx): Set<string> {
  const extensions = new Set<string>()
  const pageTypes = (ctx.cfg.plugins.pageTypes ?? []) as unknown as QuartzPageTypePluginInstance[]
  for (const pt of pageTypes) {
    if (pt.fileExtensions) {
      for (const ext of pt.fileExtensions) {
        extensions.add(ext)
      }
    }
  }
  return extensions
}

function normalizeAssetPath(raw: string): string {
  return path.posix.normalize(raw.split("?")[0].split("#")[0]).replace(/^\.\//, "")
}

function extractAssetReferences(content: ProcessedContent[]): Set<string> {
  const assets = new Set<string>()

  for (const [tree, file] of content) {
    const baseDir = file.data.relativePath ? path.posix.dirname(file.data.relativePath) : ""

    visit(tree, "element", (node: Element) => {
      // Track both src (images, video, audio, iframe) and href (links to downloadable files)
      const src = node.properties?.src
      const href = node.properties?.href

      for (const assetPath of [src, href]) {
        if (!assetPath || typeof assetPath !== "string") continue
        if (
          assetPath.startsWith("http://") ||
          assetPath.startsWith("https://") ||
          assetPath.startsWith("data:")
        )
          continue

        let normalized = assetPath.split("?")[0].split("#")[0]
        // Handle root-relative paths (e.g., "/diagram.png") by stripping leading slash
        if (normalized.startsWith("/")) {
          normalized = normalized.slice(1)
        }
        if (baseDir && !normalized.startsWith("/")) {
          normalized = path.posix.join(baseDir, normalized)
        }
        normalized = path.posix.normalize(normalized).replace(/^\.\//, "")
        if (normalized) {
          assets.add(normalized)
        }
      }
    })
  }

  return assets
}

const filesToCopy = async (argv: Argv, cfg: QuartzConfig, excludeExtensions: Set<string>) => {
  const excludePatterns = ["**/*.md", ...cfg.configuration.ignorePatterns]
  for (const ext of excludeExtensions) {
    excludePatterns.push(`**/*${ext}`)
  }
  return await glob("**", argv.directory, excludePatterns)
}

const copyFile = async (argv: Argv, fp: FilePath) => {
  const src = joinSegments(argv.directory, fp) as FilePath

  const name = slugifyFilePath(fp)
  const dest = joinSegments(argv.output, name) as FilePath

  const dir = path.dirname(dest) as FilePath
  await fs.promises.mkdir(dir, { recursive: true })

  await fs.promises.copyFile(src, dest)
  return dest
}

export const Assets: QuartzEmitterPlugin = () => {
  return {
    name: "Assets",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const publishAssets = cfg.publishAssets ?? "all"

      const excludeExtensions = getPageTypeExtensions(ctx)
      const allCandidates = await filesToCopy(ctx.argv, ctx.cfg, excludeExtensions)

      if (publishAssets === "referenced") {
        const referencedAssets = extractAssetReferences(content)
        for (const fp of allCandidates) {
          if (referencedAssets.has(normalizeAssetPath(fp))) {
            yield copyFile(ctx.argv, fp)
          }
        }
      } else {
        for (const fp of allCandidates) {
          yield copyFile(ctx.argv, fp)
        }
      }
    },
    async *partialEmit(ctx, content, _resources, changeEvents) {
      const cfg = ctx.cfg.configuration
      const publishAssets = cfg.publishAssets ?? "all"
      const excludeExtensions = getPageTypeExtensions(ctx)

      // A markdown change can add or remove a page's published status, which
      // changes which assets should be present without the asset files
      // themselves appearing in changeEvents. In that case, reconcile the
      // full candidate set against the freshly-extracted references instead
      // of only looking at what changed on disk.
      const markdownChanged = changeEvents.some((e) => path.extname(e.path) === ".md")

      if (publishAssets === "referenced" && markdownChanged) {
        const referencedAssets = extractAssetReferences(content)
        const allCandidates = await filesToCopy(ctx.argv, ctx.cfg, excludeExtensions)
        for (const fp of allCandidates) {
          const normalized = normalizeAssetPath(fp)
          const dest = joinSegments(ctx.argv.output, slugifyFilePath(fp)) as FilePath
          if (referencedAssets.has(normalized)) {
            yield copyFile(ctx.argv, fp)
          } else {
            await fs.promises.rm(dest, { force: true })
          }
        }
        return
      }

      const referencedAssets =
        publishAssets === "referenced" ? extractAssetReferences(content) : null

      for (const changeEvent of changeEvents) {
        const ext = path.extname(changeEvent.path)
        if (excludeExtensions.has(ext)) continue

        // The .md file itself is not copied here (handled by PageTypeDispatcher)
        if (ext === ".md") {
          continue
        }

        const normalized = normalizeAssetPath(changeEvent.path)

        if (publishAssets === "referenced" && !referencedAssets!.has(normalized)) {
          continue
        }

        if (changeEvent.type === "add" || changeEvent.type === "change") {
          yield copyFile(ctx.argv, changeEvent.path)
        } else if (changeEvent.type === "delete") {
          const name = slugifyFilePath(changeEvent.path)
          const dest = joinSegments(ctx.argv.output, name) as FilePath
          await fs.promises.rm(dest, { force: true })
        }
      }
    },
  }
}
