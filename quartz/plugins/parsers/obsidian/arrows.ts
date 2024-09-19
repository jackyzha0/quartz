import { QuartzParserPlugin } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { SKIP } from "unist-util-visit"
import { Root } from "mdast"
import { PluggableList } from "unified"

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

export const ObsidianArrow: QuartzParserPlugin<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianArrow",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_ctx) {
      return [
        (tree: Root) => {
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
            mdastFindReplace(tree, replacements)
          }
        },
      ] as PluggableList
    },
    htmlPlugins(_ctx) {
      return [] as PluggableList
    },
    externalResources(_ctx) {
      const js = [] as JSResource[]
      return { js }
    },
  }
}
