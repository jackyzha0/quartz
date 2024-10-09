import { HtmlTransformerPlugin } from "../../types"
import { Element, Root as HtmlRoot } from "hast"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import { PluggableList } from "unified"

export const ObsidianFlavoredMarkdownCheckbox: HtmlTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownCheckbox",
    transformation() {
      const plugins: PluggableList = [rehypeRaw]

      plugins.push(() => {
        return (tree: HtmlRoot, _file) => {
          visit(tree, "element", (node) => {
            if (node.tagName === "input" && node.properties.type === "checkbox") {
              const isChecked = node.properties?.checked ?? false
              node.properties = {
                type: "checkbox",
                disabled: false,
                checked: isChecked,
                class: "checkbox-toggle",
              }
            }
          })
        }
      })

      return plugins
    },
  }
}
