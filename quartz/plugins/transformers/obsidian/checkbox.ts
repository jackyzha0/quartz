import { Root as HtmlRoot } from "hast"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"
import { JSResource } from "../../../util/resources"

// @ts-ignore
import checkboxScript from "../../../components/scripts/checkbox.inline.ts"

export const checkboxPlugin = () => {
  return (tree: HtmlRoot, _file: VFile) => {
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
}

export const checkboxResources = (js: JSResource[]) => {
  js.push({
    script: checkboxScript,
    loadTime: "afterDOMReady",
    contentType: "inline",
  })
}
