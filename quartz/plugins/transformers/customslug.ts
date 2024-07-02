import { Root, Element, Text } from "hast"
import { Plugin } from "unified"
import { VFile } from "vfile"

export function generateSlug(node: Element, slugs: Map<string, number>): string {
  let text = ""
  const traverse = (n: Element | Text) => {
    if (n.type === "text") {
      text += n.value
    } else if (n.type === "element" && n.tagName !== "span") {
      n.children.forEach((child) => {
        if (child.type === "element" || child.type === "text") {
          traverse(child)
        }
      })
    }
  }
  node.children.forEach((child) => {
    if (child.type === "element" || child.type === "text") {
      traverse(child)
    }
  })

  let slug = text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/^-+|-+$/g, "")
  const count = slugs.get(slug) || 0
  slugs.set(slug, count + 1)
  return count ? `${slug}-${count}` : slug
}

const customRehypeSlugWrapper: Plugin<[Root], Root> = function () {
  return function (tree: Root, _file: VFile) {
    const slugs = new Map<string, number>()

    function processNode(node: Element | Text): void {
      if (node.type === "element" && /^h[1-6]$/.test(node.tagName)) {
        node.properties = node.properties || {}
        node.properties.id = generateSlug(node, slugs)
      }
      if ("children" in node) {
        node.children.forEach((child) => {
          if (child.type === "element" || child.type === "text") {
            processNode(child)
          }
        })
      }
    }

    processNode(tree as any)
  }
}

export default customRehypeSlugWrapper
