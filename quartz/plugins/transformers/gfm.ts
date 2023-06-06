import { PluggableList } from "unified"
import remarkGfm from "remark-gfm"
import smartypants from 'remark-smartypants'
import { QuartzTransformerPlugin } from "../types"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"

export interface Options {
  enableSmartyPants: boolean
  linkHeadings: boolean
}

const defaultOptions: Options = {
  enableSmartyPants: true,
  linkHeadings: true
}

export class GitHubFlavoredMarkdown extends QuartzTransformerPlugin {
  name = "GitHubFlavoredMarkdown"
  opts: Options

  constructor(opts?: Options) {
    super()
    this.opts = { ...defaultOptions, ...opts }
  }

  markdownPlugins(): PluggableList {
    return this.opts.enableSmartyPants ? [remarkGfm] : [remarkGfm, smartypants]
  }

  htmlPlugins(): PluggableList {
    return this.opts.linkHeadings
      ? [rehypeSlug, [rehypeAutolinkHeadings, {
        behavior: 'append', content: {
          type: 'text',
          value: ' §'
        }
      }]]
      : []
  }
}
