import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { Root } from "mdast"
import { Pluggable } from "unified"
import { mdastFindReplaceInHtml } from "../../transformers/markdown"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const highlightRegex = new RegExp(/==([^=]+)==/g)

export const ObsidianHighlights: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianHighlights",
    textTransform(_ctx, src: string | Buffer) {
      if (opts.enabled) {
        if (src instanceof Buffer) {
          src = src.toString()
        }
      }
      return src
    },
    markdownPlugins() {
      if (opts.enabled) {
        return [
          highlightRegex,
          (_value: string, ...capture: string[]) => {
            const [inner] = capture
            return {
              type: "html",
              value: `<span class="text-highlight">${inner}</span>`,
            }
          },
        ] as [RegExp, string | ReplaceFunction]
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
