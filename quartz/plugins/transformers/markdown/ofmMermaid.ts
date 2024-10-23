import { MarkdownTransformerPlugin } from "../../types"
import { Root, Code } from "mdast"
import { visit } from "unist-util-visit"
import { PluggableList } from "unified"

export const ObsidianFlavoredMarkdownMermaid: MarkdownTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownMermaid",
    transformation(_ctx) {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file) => {
          visit(tree, "code", (node: Code) => {
            if (node.lang === "mermaid") {
              node.data = {
                hProperties: {
                  className: ["mermaid"],
                },
              }
            }
          })
        }
      })

      return plugins
    },
  }
}
