import { MarkdownTransformerPlugin } from "../../types"
import { PluggableList } from "unified"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"
import { VFile } from "vfile"

const TODORegex = new RegExp(/{{.*?\bTODO\b.*?}}/, "g")

export const RoamFlavoredMarkdownTODO: MarkdownTransformerPlugin = () => {
  return {
    name: "RoamFlavoredMarkdownTODO",
    transformation() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file: VFile) => {
          const replacements: [RegExp, ReplaceFunction][] = []

          replacements.push([
            TODORegex,
            () => ({
              type: "html",
              value: `<input type="checkbox" disabled>`,
            }),
          ])

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
