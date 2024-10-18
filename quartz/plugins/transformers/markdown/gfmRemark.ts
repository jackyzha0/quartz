import remarkGfm from "remark-gfm"
import smartypants from "remark-smartypants"
import { MarkdownTransformerPlugin } from "../../types"

export interface Options {
  enableSmartyPants: boolean
}

const defaultOptions: Options = {
  enableSmartyPants: true,
}

export const GitHubFlavoredMarkdownRemark: MarkdownTransformerPlugin<Partial<Options>> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "GitHubFlavoredMarkdownRemark",
    transformation() {
      return opts.enableSmartyPants ? [remarkGfm, smartypants] : [remarkGfm]
    },
  }
}
