import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { visit } from "unist-util-visit"
import { Root } from "mdast"
import { Pluggable } from "unified"
import { Element, Literal, Root as HtmlRoot } from "hast"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const blockReferenceRegex = new RegExp(/\^([-_A-Za-z0-9]+)$/g)

export const ObsidianBlockReference: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianBlockReference",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_tree, _file) {
      return [new RegExp(""), ""] as [RegExp, string | ReplaceFunction]
    },
    htmlPlugins(tree, file) {
      const inlineTagTypes = new Set(["p", "li"])
      const blockTagTypes = new Set(["blockquote"])
      if (opts.enabled) {
        return () => {
          file.data.blocks = {}

          visit(tree, "element", (node, index, parent) => {
            if (blockTagTypes.has(node.tagName)) {
              const nextChild = parent?.children.at(index! + 2) as Element
              if (nextChild && nextChild.tagName === "p") {
                const text = nextChild.children.at(0) as Literal
                if (text && text.value && text.type === "text") {
                  const matches = text.value.match(blockReferenceRegex)
                  if (matches && matches.length >= 1) {
                    parent!.children.splice(index! + 2, 1)
                    const block = matches[0].slice(1)

                    if (!Object.keys(file.data.blocks!).includes(block)) {
                      node.properties = {
                        ...node.properties,
                        id: block,
                      }
                      file.data.blocks![block] = node
                    }
                  }
                }
              }
            } else if (inlineTagTypes.has(node.tagName)) {
              const last = node.children.at(-1) as Literal
              if (last && last.value && typeof last.value === "string") {
                const matches = last.value.match(blockReferenceRegex)
                if (matches && matches.length >= 1) {
                  last.value = last.value.slice(0, -matches[0].length)
                  const block = matches[0].slice(1)

                  if (last.value === "") {
                    // this is an inline block ref but the actual block
                    // is the previous element above it
                    let idx = (index ?? 1) - 1
                    while (idx >= 0) {
                      const element = parent?.children.at(idx)
                      if (!element) break
                      if (element.type !== "element") {
                        idx -= 1
                      } else {
                        if (!Object.keys(file.data.blocks!).includes(block)) {
                          element.properties = {
                            ...element.properties,
                            id: block,
                          }
                          file.data.blocks![block] = element
                        }
                        return
                      }
                    }
                  } else {
                    // normal paragraph transclude
                    if (!Object.keys(file.data.blocks!).includes(block)) {
                      node.properties = {
                        ...node.properties,
                        id: block,
                      }
                      file.data.blocks![block] = node
                    }
                  }
                }
              }
            }
          })

          file.data.htmlAst = tree
        }
      }
      return {} as Pluggable
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
