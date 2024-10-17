import { MarkdownTransformerPlugin } from "../../types"
import { Root } from "mdast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { PluggableList } from "unified"

const highlightRegex = new RegExp(/==([^=]+)==/g)

export const ObsidianFlavoredMarkdownHighlight: MarkdownTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownHighlight",
    transformation(_ctx) {
      const plugins: PluggableList = []

      // regex replacements
      plugins.push(() => {
        return (tree: Root, _file) => {
          const replacements: [RegExp, string | ReplaceFunction][] = []

          replacements.push([
            highlightRegex,
            (_value: string, ...capture: string[]) => {
              const [inner] = capture
              return {
                type: "html",
                value: `<span class="text-highlight">${inner}</span>`,
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
