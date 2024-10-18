import { MarkdownTransformerPlugin } from "../../types"
import { Root, Html } from "mdast"
import { SKIP, visit } from "unist-util-visit"
import { PluggableList } from "unified"

const videoExtensionRegex = new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/)

export const ObsidianFlavoredMarkdownVideoEmbed: MarkdownTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownVideoEmbed",
    transformation(_ctx) {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file) => {
          visit(tree, "image", (node, index, parent) => {
            if (parent && index != undefined && videoExtensionRegex.test(node.url)) {
              const newNode: Html = {
                type: "html",
                value: `<video controls src="${node.url}"></video>`,
              }

              parent.children.splice(index, 1, newNode)
              return SKIP
            }
          })
        }
      })

      return plugins
    },
  }
}
