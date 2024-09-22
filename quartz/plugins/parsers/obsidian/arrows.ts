import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { SKIP } from "unist-util-visit"
import { Root } from "mdast"
import { Pluggable } from "unified"
import { mdastFindReplaceInHtml } from "../../transformers/markdown"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const arrowMapping: Record<string, string> = {
  "->": "&rarr;",
  "-->": "&rArr;",
  "=>": "&rArr;",
  "==>": "&rArr;",
  "<-": "&larr;",
  "<--": "&lArr;",
  "<=": "&lArr;",
  "<==": "&lArr;",
}

const arrowRegex = new RegExp(/(-{1,2}>|={1,2}>|<-{1,2}|<={1,2})/g)

export const ObsidianArrow: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianArrow",
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
          arrowRegex,
          (value: string, ..._capture: string[]) => {
            const maybeArrow = arrowMapping[value]
            if (maybeArrow === undefined) return SKIP
            return {
              type: "html",
              value: `<span>${maybeArrow}</span>`,
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
