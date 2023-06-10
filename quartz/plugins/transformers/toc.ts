import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"
import { toString } from "mdast-util-to-string"
import { slugAnchor } from "../../path"

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
  slug: string
}

export class TableOfContents extends QuartzTransformerPlugin {
  name = "TableOfContents"
  opts: Options

  constructor(opts?: Partial<Options>) {
    super()
    this.opts = { ...defaultOptions, ...opts }
  }

  markdownPlugins(): PluggableList {
    return [() => {
      return async (tree: Root, file) => {
        const display = file.data.frontmatter?.enableToc ?? this.opts.showByDefault
        if (display) {
          const toc: TocEntry[] = []
          let highestDepth: number = this.opts.maxDepth
          visit(tree, 'heading', (node) => {
            if (node.depth <= this.opts.maxDepth) {
              const text = toString(node)
              highestDepth = Math.min(highestDepth, node.depth)
              toc.push({
                depth: node.depth,
                text,
                slug: slugAnchor.slug(text)
              })
            }
          })

          if (toc.length > this.opts.minEntries) {
            file.data.toc = toc.map(entry => ({ ...entry, depth: entry.depth - highestDepth }))
          }
        }
      }
    }]
  }

  htmlPlugins(): PluggableList {
    return []
  }
}

declare module 'vfile' {
  interface DataMap {
    toc: TocEntry[]
  }
}

