import { MarkdownTransformerPlugin } from "../../types"
import { Root } from "mdast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { SKIP } from "unist-util-visit"
import { PluggableList } from "unified"

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

export const arrowRegex = new RegExp(/(-{1,2}>|={1,2}>|<-{1,2}|<={1,2})/g)

export const ObsidianFlavoredMarkdownArrow: MarkdownTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownArrow",
    transformation(_ctx) {
      const plugins: PluggableList = []

      // regex replacements
      plugins.push(() => {
        return (tree: Root, _file) => {
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
      })

      return plugins
    },
  }
}
