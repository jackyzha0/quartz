import { QuartzParserPlugin } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
// @ts-ignore
import checkboxScript from "../../components/scripts/checkbox.inline.ts"
import { visit } from "unist-util-visit"
import { JSResource } from "../../../util/resources"
import { Element, Literal, Root as HtmlRoot } from "hast"
import { Root } from "mdast"
import { Pluggable } from "unified"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

export const ObsidianCheckboxes: QuartzParserPlugin<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianCheckboxes",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_ctx) {
      const plug: Pluggable = (tree: Root, _file) => {
        const replacements: [RegExp, string | ReplaceFunction][] = []
        mdastFindReplace(tree, replacements)
      }
      return plug
    },
    htmlPlugins() {
      if (opts.enabled) {
        const plug: Pluggable = (tree: HtmlRoot, _file) => {
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
        return plug
      }
      return {} as Pluggable
    },
    externalResources() {
      if (opts.enabled) {
        const js: JSResource = {
          script: checkboxScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        }
        return js
      }
      return {} as JSResource
    },
  }
}
