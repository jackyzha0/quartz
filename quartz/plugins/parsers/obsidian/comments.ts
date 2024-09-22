import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { Root } from "mdast"
import { Pluggable } from "unified"
import { visit } from "unist-util-visit"
import { mdastFindReplaceInHtml } from "../../transformers/markdown"

interface Options {
  enabled: Boolean
  inHtml: Boolean
}

const defaultOptions: Options = {
  enabled: true,
  inHtml: false,
}

const commentRegex = new RegExp(/%%[\s\S]*?%%/g)

export const ObsidianComments: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianComments",
    textTransform(_ctx, src: string | Buffer) {
      if (opts.enabled) {
        if (src instanceof Buffer) {
          src = src.toString()
        }

        src = src.replace(commentRegex, "")
      }

      return src
    },
    markdownPlugins(tree, file) {
      return [new RegExp(""), ""] as [RegExp, string | ReplaceFunction]
    },
    htmlPlugins() {
      return {} as Pluggable
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
