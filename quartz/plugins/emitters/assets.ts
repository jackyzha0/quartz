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

// Attributes that point at files: images, media, embeds (<object data>), downloads (<a href>)
const URL_ATTRIBUTES = ["src", "href", "data", "poster"] as const

function decode(value: string): string {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/**
 * Site paths of everything published pages link to or embed. Page hrefs are relative to the
 * page's output location (its slug), and point at slugified file names.
 */
function extractAssetReferences(content: ProcessedContent[]): Set<string> {
  const assets = new Set<string>()

  for (const [tree, file] of content) {
    const location = file.data.slug ?? file.data.relativePath ?? ""
    const baseDir = path.posix.dirname(location) === "." ? "" : path.posix.dirname(location)

    const add = (raw: string) => {
      if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//") || raw.startsWith("#")) return
      let ref = decode(raw.split("?")[0].split("#")[0])
      if (!ref) return
      ref = ref.startsWith("/") ? ref.slice(1) : path.posix.join(baseDir, ref)
      ref = path.posix.normalize(ref).replace(/^\.\//, "")
      if (ref && !ref.startsWith("..")) assets.add(ref)
    }

    visit(tree, "element", (node: Element) => {
      for (const attr of URL_ATTRIBUTES) {
        const value = node.properties?.[attr]
        if (typeof value === "string") add(value)
      }
      const srcset = node.properties?.srcSet ?? node.properties?.srcset
      for (const candidate of Array.isArray(srcset)
        ? srcset
        : typeof srcset === "string"
          ? srcset.split(",")
          : []) {
        const url = String(candidate).trim().split(/\s+/)[0]
        if (url) add(url)
      }
    })
  }

  return assets
}

/** Whether a content file is referenced, by its source path or its published (slugified) path. */
function isReferenced(references: Set<string>, fp: string): boolean {
  return references.has(normalizeAssetPath(fp)) || references.has(slugifyFilePath(fp as FilePath))
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
          if (isReferenced(referencedAssets, fp)) {
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
          const dest = joinSegments(ctx.argv.output, slugifyFilePath(fp)) as FilePath
          if (isReferenced(referencedAssets, fp)) {
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

        if (publishAssets === "referenced" && !isReferenced(referencedAssets!, changeEvent.path)) {
          continue
        }

        if (changeEvent.type === "add" || changeEvent.type === "change") {
          try {
            yield copyFile(ctx.argv, changeEvent.path)
          } catch (err) {
            if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err
          }
        } else if (changeEvent.type === "delete") {
          const name = slugifyFilePath(changeEvent.path)
          const dest = joinSegments(ctx.argv.output, name) as FilePath
          await fs.promises.rm(dest, { force: true })
        }
      }
    },
  }
}
