import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { SKIP } from "unist-util-visit"
import { Root } from "mdast"
import { Pluggable } from "unified"
import { mdastFindReplaceInHtml } from "../../transformers/markdown"

interface Options {
  enabled: Boolean
  inHtml: Boolean
}

const defaultOptions: Options = {
  enabled: true,
  inHtml: false,
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
    markdownPlugins(_ctx) {
      const plug: Pluggable = (tree: Root, _path) => {
        if (opts.enabled) {
          const replacements: [RegExp, string | ReplaceFunction][] = []
          replacements.push([
            arrowRegex,
            (value: string, ..._capture: string[]) => {
              const maybeArrow = arrowMapping[value]
              if (maybeArrow === undefined) return SKIP
              return {
                type: "html",
                value: `<span>${maybeArrow}</span>`,
              }
            },
          ])
          mdastFindReplaceInHtml(tree, replacements, opts.inHtml)
        }
      }
      return plug
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
