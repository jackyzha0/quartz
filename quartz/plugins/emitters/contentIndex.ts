import { QuartzEmitterPlugin } from "../types"
import path from "path"

export type ContentIndex = Map<string, ContentDetails>
export type ContentDetails = {
  title: string,
  links?: string[],
  tags?: string[],
  content: string,
}

export const ContentIndex: QuartzEmitterPlugin = () => {
  return {
    name: "ContentIndex",
    async emit(_contentDir, _cfg, content, _resources, emit) {
      const fp = path.join("static", "contentIndex")
      const linkIndex: ContentIndex = new Map()
      for (const [_tree, file] of content) {
        let slug = file.data.slug!
        linkIndex.set(slug, {
          title: file.data.frontmatter?.title!,
          links: file.data.links ?? [],
          tags: file.data.frontmatter?.tags,
          content: file.data.text ?? ""
        })
      }

      await emit({
        content: JSON.stringify(Object.fromEntries(linkIndex)),
        slug: fp,
        ext: ".json",
      })

      return [`${fp}.json`]
    },
    getQuartzComponents: () => [],
  }
}
