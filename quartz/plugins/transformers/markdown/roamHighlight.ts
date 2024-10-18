import { MarkdownTransformerPlugin } from "../../types"
import { PluggableList } from "unified"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"
import { VFile } from "vfile"

const roamHighlightRegex = new RegExp(/\^\^(.+)\^\^/, "g")

export const RoamFlavoredMarkdownHighlight: MarkdownTransformerPlugin = () => {
  return {
    name: "RoamFlavoredMarkdownHighlight",
    transformation() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file: VFile) => {
          const replacements: [RegExp, ReplaceFunction][] = []

          // Roam highlight syntax
          replacements.push([
            roamHighlightRegex,
            (_value: string, inner: string) => ({
              type: "html",
              value: `<span class="text-highlight">${inner}</span>`,
            }),
          ])

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
