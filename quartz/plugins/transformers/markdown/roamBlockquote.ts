import { MarkdownTransformerPlugin } from "../../types"
import { PluggableList } from "unified"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"
import { VFile } from "vfile"

const blockquoteRegex = new RegExp(/(\[\[>\]\])\s*(.*)/, "g")

export const RoamFlavoredMarkdownBlockquote: MarkdownTransformerPlugin = () => {
  return {
    name: "RoamFlavoredMarkdownBlockquote",
    transformation() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file: VFile) => {
          const replacements: [RegExp, ReplaceFunction][] = []

          replacements.push([
            blockquoteRegex,
            (_match: string, _marker: string, content: string) => ({
              type: "html",
              value: `<blockquote>${content.trim()}</blockquote>`,
            }),
          ])

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
