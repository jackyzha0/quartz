import { QuartzParserPlugin } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { Root } from "mdast"
import { PluggableList } from "unified"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const highlightRegex = new RegExp(/==([^=]+)==/g)

export const ObsidianHighlights: QuartzParserPlugin<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianHighlights",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_ctx) {
      return [
        (tree: Root) => {
          if (opts.enabled) {
            const replacements: [RegExp, string | ReplaceFunction][] = []
            replacements.push([
              highlightRegex,
              (_value: string, ...capture: string[]) => {
                const [inner] = capture
                return {
                  type: "html",
                  value: `<span class="text-highlight">${inner}</span>`,
                }
              },
            ])
            mdastFindReplace(tree, replacements)
          }
        },
      ] as PluggableList
    },
    htmlPlugins(_ctx) {
      return [] as PluggableList
    },
    externalResources(_ctx) {
      const js = [] as JSResource[]
      return { js }
    },
  }
}
