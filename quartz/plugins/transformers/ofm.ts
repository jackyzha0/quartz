import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../types"
import { Root } from 'mdast'
import { findAndReplace } from "mdast-util-find-and-replace"
import { slugify } from "../../path"
import rehypeRaw from "rehype-raw"

export interface Options {
  highlight: boolean
  wikilinks: boolean
}

const defaultOptions: Options = {
  highlight: true,
  wikilinks: true,
}

export class ObsidianFlavoredMarkdown extends QuartzTransformerPlugin {
  name = "ObsidianFlavoredMarkdown"
  opts: Options

  constructor(opts?: Options) {
    super()
    this.opts = { ...defaultOptions, ...opts }
  }

  markdownPlugins(): PluggableList {
    const plugins: PluggableList = []

    if (this.opts.wikilinks) {
      plugins.push(() => {
        // Match wikilinks 
        // !?               -> optional embedding
        // \[\[             -> open brace
        // ([^\[\]\|\#]+)   -> one or more non-special characters ([,],|, or #) (name)
        // (#[^\[\]\|\#]+)? -> # then one or more non-special characters (heading link)
        // (|[^\[\]\|\#]+)? -> | then one or more non-special characters (alias)
        const backlinkRegex = new RegExp(/!?\[\[([^\[\]\|\#]+)(#[^\[\]\|\#]+)?(\|[^\[\]\|\#]+)?\]\]/, "g")
        return (tree: Root, _file) => {
          findAndReplace(tree, backlinkRegex, (value: string, ...capture: string[]) => {
            if (value.startsWith("!")) {
              // TODO: handle embeds
            } else {
              const [path, rawHeader, rawAlias] = capture
              const anchor = rawHeader?.trim() ?? ""
              const alias = rawAlias?.slice(1).trim() ?? path
              const url = slugify(path.trim() + anchor)
              return {
                type: 'link',
                url,
                children: [{
                  type: 'text',
                  value: alias
                }]
              }
            }
          })
        }
      }
      )
    }

    if (this.opts.highlight) {
      plugins.push(() => {
        // Match highlights 
        const highlightRegex = new RegExp(/==(.+)==/, "g")
        return (tree: Root, _file) => {
          findAndReplace(tree, highlightRegex, (_value: string, ...capture: string[]) => {
            const [inner] = capture
            return {
              type: 'html',
              value: `<span class="text-highlight">${inner}</span>`
            }
          })
        }
      })
    }

    return plugins
  }

  htmlPlugins(): PluggableList {
    return [rehypeRaw]
  }
}
