import { Root, Html, BlockContent, DefinitionContent, Paragraph, Code } from "mdast"
import { SKIP, visit } from "unist-util-visit"
import { VFile } from "vfile"

const videoExtensionRegex = /\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/

export const videoEmbedPlugin = () => {
  return (tree: Root, _file: VFile) => {
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
}
