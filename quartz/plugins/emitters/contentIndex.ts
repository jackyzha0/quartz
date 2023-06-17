import { visit } from "unist-util-visit"
import { QuartzEmitterPlugin } from "../types"
import { Element } from "hast"
import path from "path"
import { trimPathSuffix } from "../../path"

interface Options {
  indexAnchorLinks: boolean,
  indexExternalLinks: boolean,
}

const defaultOptions: Options = {
  indexAnchorLinks: false,
  indexExternalLinks: false,
}

type ContentIndex = Map<string, {
  title: string,
  links?: string[],
  tags?: string[],
  content: string,
}> 

export const ContentIndex: QuartzEmitterPlugin<Options> = (userOpts) => {
  const opts = { ...userOpts, ...defaultOptions }
  return {
    name: "ContentIndex",
    async emit(_contentDir, _cfg, content, _resources, emit) {
      const fp = "contentIndex"
      const linkIndex: ContentIndex = new Map()
      for (const [tree, file] of content) {
        let slug = trimPathSuffix(file.data.slug!)

        const outgoing: Set<string> = new Set()
        visit(tree, 'element', (node: Element) => {
          if (node.tagName === 'a' && node.properties && typeof node.properties.href === 'string') {
            let dest = node.properties.href
            if (dest.startsWith(".")) {
              const normalizedPath = path.normalize(path.join(slug, dest))
              dest = trimPathSuffix(normalizedPath)
              outgoing.add(dest)
            } else if (dest.startsWith("#")) {
              if (opts.indexAnchorLinks) {
                outgoing.add(dest)
              }
            } else {
              if (opts.indexExternalLinks) {
                outgoing.add(dest)
              }
            }
          }
        })

        linkIndex.set(slug, {
          title: file.data.frontmatter?.title!,
          links: [...outgoing],
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
