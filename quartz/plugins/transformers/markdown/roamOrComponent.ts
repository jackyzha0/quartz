import { MarkdownTransformerPlugin, QuartzTransformerPlugin } from "../../types"
import { PluggableList } from "unified"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"

import { VFile } from "vfile"

const orRegex = new RegExp(/{{or:(.*?)}}/, "g")

export const RoamFlavoredMarkdownOrComponent: MarkdownTransformerPlugin = () => {
  return {
    name: "RoamFlavoredMarkdownOrComponent",
    transformation() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file: VFile) => {
          const replacements: [RegExp, ReplaceFunction][] = []

          replacements.push([
            orRegex,
            (match: string) => {
              const matchResult = match.match(/{{or:(.*?)}}/)
              if (matchResult === null) {
                return { type: "html", value: "" }
              }
              const optionsString: string = matchResult[1]
              const options: string[] = optionsString.split("|")
              const selectHtml: string = `<select>${options.map((option: string) => `<option value="${option}">${option}</option>`).join("")}</select>`
              return { type: "html", value: selectHtml }
            },
          ])

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
