import { QuartzTransformerPlugin } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const highlightRegex = new RegExp(/==([^=]+)==/g)

export const ObsidianMarkdownHighlights: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianMarkdownHighlights",
    markdownPlugins() {
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
      ]
    },
  }
}
