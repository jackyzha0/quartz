import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { Root, Html, Paragraph } from "mdast"
import { Pluggable } from "unified"
import { mdastFindReplaceInHtml } from "../../transformers/markdown"
import { SKIP, visit } from "unist-util-visit"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { PhrasingContent } from "mdast-util-find-and-replace/lib"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
  const hast = toHast(ast, { allowDangerousHtml: true })!
  return toHtml(hast, { allowDangerousHtml: true })
}

export const ObsidianHtml: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianHtml",
    textTransform(_ctx, src: string | Buffer) {
      if (opts.enabled) {
        if (src instanceof Buffer) {
          src = src.toString()
        }
      }
      return src
    },
    markdownPlugins(tree, _file, replacements) {
      if (opts.enabled && tree !== undefined && replacements !== undefined) {
        return visit(tree, "html", (node: Html) => {
          for (const [regex, replace] of replacements) {
            if (typeof replace === "string") {
              node.value = node.value.replace(regex, replace)
            } else {
              node.value = node.value.replace(regex, (substring: string, ...args) => {
                const replaceValue = replace(substring, ...args)
                if (typeof replaceValue === "string") {
                  return replaceValue
                } else if (Array.isArray(replaceValue)) {
                  return replaceValue.map(mdastToHtml).join("")
                } else if (typeof replaceValue === "object" && replaceValue !== null) {
                  return mdastToHtml(replaceValue)
                } else {
                  return substring
                }
              })
            }
          }
        })
      }
      return [new RegExp(""), ""] as [RegExp, string | ReplaceFunction]
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
