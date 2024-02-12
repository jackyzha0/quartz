import { FilePath, FullSlug, joinSegments, resolveRelative, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import { write } from "./helpers"
import DepGraph from "../../depgraph"

export const AliasRedirects: QuartzEmitterPlugin = () => ({
  name: "AliasRedirects",
  getQuartzComponents() {
    return []
  },
  async getDependencyGraph(ctx, content, _resources) {
    const graph = new DepGraph<FilePath>()

    const { argv } = ctx
    for (const [_tree, file] of content) {
      const dir = path.posix.relative(argv.directory, path.dirname(file.data.filePath!))
      const aliases = file.data.frontmatter?.aliases ?? []
      const slugs = aliases.map((alias) => path.posix.join(dir, alias) as FullSlug)
      const permalink = file.data.frontmatter?.permalink
      if (typeof permalink === "string") {
        slugs.push(permalink as FullSlug)
      }

      for (let slug of slugs) {
        // fix any slugs that have trailing slash
        if (slug.endsWith("/")) {
          slug = joinSegments(slug, "index") as FullSlug
        }

        graph.addEdge(file.data.filePath!, joinSegments(argv.output, slug + ".html") as FilePath)
      }
    }

    return graph
  },
  async emit(ctx, content, _resources): Promise<FilePath[]> {
    const { argv } = ctx
    const fps: FilePath[] = []

    for (const [_tree, file] of content) {
      const ogSlug = simplifySlug(file.data.slug!)
      const dir = path.posix.relative(argv.directory, path.dirname(file.data.filePath!))
      const aliases = file.data.frontmatter?.aliases ?? []
      const slugs: FullSlug[] = aliases.map((alias) => path.posix.join(dir, alias) as FullSlug)
      const permalink = file.data.frontmatter?.permalink
      if (typeof permalink === "string") {
        slugs.push(permalink as FullSlug)
      }

      for (let slug of slugs) {
        // fix any slugs that have trailing slash
        if (slug.endsWith("/")) {
          slug = joinSegments(slug, "index") as FullSlug
        }

        const redirUrl = resolveRelative(slug, file.data.slug!)
        const fp = await write({
          ctx,
          content: `
            <!DOCTYPE html>
            <html lang="en-us">
            <head>
            <title>${ogSlug}</title>
            <link rel="canonical" href="${redirUrl}">
            <meta name="robots" content="noindex">
            <meta charset="utf-8">
            <meta http-equiv="refresh" content="0; url=${redirUrl}">
            </head>
            </html>
            `,
          slug,
          ext: ".html",
        })

        fps.push(fp)
      }
    }
    return fps
  },
})
