import { FilePath, FullSlug, resolveRelative, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import path from "path"

export const AliasRedirects: QuartzEmitterPlugin = () => ({
  name: "AliasRedirects",
  getQuartzComponents() {
    return []
  },
  async emit({ argv }, content, _resources, emit): Promise<FilePath[]> {
    const fps: FilePath[] = []

    for (const [_tree, file] of content) {
      const ogSlug = simplifySlug(file.data.slug!)
      const dir = path.posix.relative(argv.directory, file.dirname ?? argv.directory)

      let aliases: FullSlug[] = file.data.frontmatter?.aliases ?? file.data.frontmatter?.alias ?? []
      if (typeof aliases === "string") {
        aliases = [aliases]
      }

      for (const alias of aliases) {
        const slug = path.posix.join(dir, alias) as FullSlug
        const redirUrl = resolveRelative(slug, file.data.slug!)
        const fp = await emit({
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
