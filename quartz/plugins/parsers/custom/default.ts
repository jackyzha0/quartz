import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { Root } from "mdast"
import { Pluggable } from "unified"
import { visit } from "unist-util-visit"
import { Element, Literal, Root as HtmlRoot } from "hast"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

export const CustomDefault: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "CustomDefault",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(tree, file) {
      return [new RegExp(""), ""] as [RegExp, string | ReplaceFunction]
    },
    htmlPlugins(tree, file) {
      if (opts.enabled) {
        return () => {
          visit(tree!, "element", (node) => {})
        }
      }
      return {} as Pluggable
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
