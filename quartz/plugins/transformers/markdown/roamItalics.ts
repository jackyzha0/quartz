import { MarkdownTransformerPlugin } from "../../types"
import { PluggableList } from "unified"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"
import { VFile } from "vfile"

const roamItalicRegex = new RegExp(/__(.+)__/, "g")

export const RoamFlavoredMarkdownItalics: MarkdownTransformerPlugin = () => {
  return {
    name: "RoamFlavoredMarkdownItalics",
    transformation() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file: VFile) => {
          const replacements: [RegExp, ReplaceFunction][] = []

          // Roam italic syntax
          replacements.push([
            roamItalicRegex,
            (_value: string, match: string) => ({
              type: "emphasis",
              children: [{ type: "text", value: match }],
            }),
          ])

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
