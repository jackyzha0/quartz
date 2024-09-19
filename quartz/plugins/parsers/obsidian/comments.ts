import { QuartzParserPlugin } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { Root } from "mdast"
import { Pluggable } from "unified"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const commentRegex = new RegExp(/%%[\s\S]*?%%/g)

export const ObsidianComments: QuartzParserPlugin<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianComments",
    textTransform(_ctx, src: string | Buffer) {
      if (opts.enabled) {
        if (src instanceof Buffer) {
          src = src.toString()
        }

        src = src.replace(commentRegex, "")
      }

      return src
    },
    markdownPlugins(_ctx) {
      const plug: Pluggable = (tree: Root, _file) => {
        if (opts.enabled) {
          const replacements: [RegExp, string | ReplaceFunction][] = []
          mdastFindReplace(tree, replacements)
        }
      }
      return plug
    },
    htmlPlugins(_ctx) {
      const plug: Pluggable = () => {}
      return plug
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
