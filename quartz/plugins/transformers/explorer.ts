import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"
import Slugger from "github-slugger"

export interface Options {
  maxDepth: 1 | 2 | 3 | 4 | 5 | 6
  minEntries: 1
  showByDefault: boolean
}

const defaultOptions: Options = {
  maxDepth: 3,
  minEntries: 1,
  showByDefault: true,
}

interface ExplorerEntry {
  depth: number
  text: string
  slug: string // this is just the anchor (#some-slug), not the canonical slug
}

export const Explorer: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Explorer",
    markdownPlugins() {
      return [
        () => {
          return async (tree: Root, file) => {
            const display = file.data.frontmatter?.enableToc ?? opts.showByDefault
            const slugAnchor = new Slugger()
            const toc: ExplorerEntry[] = []
            let highestDepth: number = opts.maxDepth
            visit(tree, "heading", (node) => {
              if (node.depth <= opts.maxDepth) {
                const text = toString(node)
                highestDepth = Math.min(highestDepth, node.depth)
                toc.push({
                  depth: node.depth,
                  text,
                  slug: slugAnchor.slug(text),
                })
              }
            })

            if (toc.length > opts.minEntries) {
              file.data.toc = toc.map((entry) => ({
                ...entry,
                depth: entry.depth - highestDepth,
              }))
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    explorer: ExplorerEntry[]
  }
}
