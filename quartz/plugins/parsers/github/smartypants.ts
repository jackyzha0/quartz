import { QuartzParser } from "../../types"
import { JSResource } from "../../../util/resources"
import { Pluggable } from "unified"
import remarkGfm from "remark-gfm"
import smartypants from "remark-smartypants"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

export const GitHubSmartypants: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "GitHubSmartypants",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_ctx) {
      if (opts.enabled) {
        return [remarkGfm, smartypants]
      }
      return [remarkGfm]
    },
    htmlPlugins() {
      const plug: Pluggable = () => {}
      return plug
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
