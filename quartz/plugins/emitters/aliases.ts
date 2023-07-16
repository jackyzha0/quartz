import { CanonicalSlug, FilePath, ServerSlug, canonicalizeServer, resolveRelative } from "../../path"
import { QuartzEmitterPlugin } from "../types"
import path from 'path'

export const AliasRedirects: QuartzEmitterPlugin = () => ({
  name: "AliasRedirects",
  getQuartzComponents() {
    return []
  },
  async emit(contentFolder, _cfg, content, _resources, emit): Promise<FilePath[]> {
    const fps: FilePath[] = []

    for (const [_tree, file] of content) {
      const ogSlug = canonicalizeServer(file.data.slug!)
      const dir = path.relative(contentFolder, file.dirname ?? contentFolder)

      let aliases: CanonicalSlug[] = []
      if (file.data.frontmatter?.aliases) {
        aliases = file.data.frontmatter?.aliases
      } else if (file.data.frontmatter?.alias) {
        aliases = [file.data.frontmatter?.alias]
      }

      for (const alias of aliases) {
        const slug = path.posix.join(dir, alias) as ServerSlug

        const fp = slug + ".html" as FilePath
        const redirUrl = resolveRelative(canonicalizeServer(slug), ogSlug)
        await emit({
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
  }
})
