import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"
import { slug as slugAnchor } from 'github-slugger'

export interface Options {
  maxDepth: 1 | 2 | 3 | 4 | 5 | 6,
  minEntries: 1,
  showByDefault: boolean
}

const defaultOptions: Options = {
  maxDepth: 3,
  minEntries: 1,
  showByDefault: true,
}

interface TocEntry {
  depth: number,
  text: string,
  slug: string // this is just the anchor (#some-slug), not the canonical slug
}

export const TableOfContents: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "TableOfContents",
    markdownPlugins() {
      return [() => {
        return async (tree: Root, file) => {
          const display = file.data.frontmatter?.enableToc ?? opts.showByDefault
          if (display) {
            const toc: TocEntry[] = []
            let highestDepth: number = opts.maxDepth
            visit(tree, 'heading', (node) => {
              if (node.depth <= opts.maxDepth) {
                const text = toString(node)
                highestDepth = Math.min(highestDepth, node.depth)
                toc.push({
                  depth: node.depth,
                  text,
                  slug: slugAnchor(text)
                })
              }
            })

            if (toc.length > opts.minEntries) {
              file.data.toc = toc.map(entry => ({ ...entry, depth: entry.depth - highestDepth }))
            }
          }
        }
      }]
    },
  }
}

declare module 'vfile' {
  interface DataMap {
    toc: TocEntry[]
  }
}

