import { relativeToRoot } from "../../path"
import { QuartzEmitterPlugin } from "../types"
import path from 'path'

export const AliasRedirects: QuartzEmitterPlugin = () => ({
  name: "AliasRedirects",
  getQuartzComponents() {
    return []
  },
  async emit(contentFolder, _cfg, content, _resources, emit): Promise<string[]> {
    const fps: string[] = []

    for (const [_tree, file] of content) {
      const ogSlug = file.data.slug!
      const dir = path.relative(contentFolder, file.dirname ?? contentFolder)

      let aliases: string[] = []
      if (file.data.frontmatter?.aliases) {
        aliases = file.data.frontmatter?.aliases
      } else if (file.data.frontmatter?.alias) {
        aliases = [file.data.frontmatter?.alias]
      }

      for (const alias of aliases) {
        const slug = alias.startsWith("/")
          ? alias
          : path.posix.join(dir, alias)

        const fp = slug + ".html"
        const redirUrl = relativeToRoot(slug, ogSlug)
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
