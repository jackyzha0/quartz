import { QuartzTransformerPlugin } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { SKIP } from "unist-util-visit"
import { Root } from "mdast"

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

export const ObsidianMarkdownArrow: QuartzTransformerPlugin = () => {
  return {
    name: "ObsidianMarkdownArrow",
    markdownPlugins() {
      return [
        (tree: Root) => {
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
        },
      ]
    },
  }
}
