import { MarkdownTransformerPlugin } from "../../types"
import { PluggableList } from "unified"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"
import { VFile } from "vfile"

const DONERegex = new RegExp(/{{.*?\bDONE\b.*?}}/, "g")

export const RoamFlavoredMarkdownDONE: MarkdownTransformerPlugin = () => {
  return {
    name: "RoamFlavoredMarkdownDONE",
    transformation() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file: VFile) => {
          const replacements: [RegExp, ReplaceFunction][] = []

          replacements.push([
            DONERegex,
            () => ({
              type: "html",
              value: `<input type="checkbox" checked disabled>`,
            }),
          ])

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
