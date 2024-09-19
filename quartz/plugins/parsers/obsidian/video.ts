import { QuartzParser } from "../../types"
import { JSResource } from "../../../util/resources"
import { Root, Html } from "mdast"
import { Pluggable } from "unified"
import { SKIP, visit } from "unist-util-visit"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const videoExtensionRegex = new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/)

export const ObsidianVideo: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianVideo",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_ctx) {
      const plug: Pluggable = (tree: Root, _file) => {
        if (opts.enabled) {
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
      return plug
    },
    htmlPlugins() {
      const plug: Pluggable = () => {}
      return plug
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
