import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { FilePath, pathToRoot, slugTag, slugifyFilePath } from "../../../util/path"
import { JSResource } from "../../../util/resources"
import { Root } from "mdast"
import { Pluggable } from "unified"
import { mdastFindReplaceInHtml } from "../../transformers/markdown"

interface Options {
  enabled: Boolean
  inHtml: Boolean
}

const defaultOptions: Options = {
  enabled: true,
  inHtml: false,
}

// (?:^| )              -> non-capturing group, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}\d\p{Z}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters and symbols, hyphens and/or underscores
// (?:\/[-_\p{L}\d\p{Z}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const tagRegex = new RegExp(
  /(?:^| )#((?:[-_\p{L}\p{Emoji}\p{M}\d])+(?:\/[-_\p{L}\p{Emoji}\p{M}\d]+)*)/gu,
)

export const ObsidianTags: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianTags",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_ctx) {
      const plug: Pluggable = (tree: Root, file) => {
        const base = pathToRoot(file.data.slug!)
        const replacements: [RegExp, string | ReplaceFunction][] = []
        replacements.push([
          tagRegex,
          (_value: string, tag: string) => {
            // Check if the tag only includes numbers and slashes
            if (/^[\/\d]+$/.test(tag)) {
              return false
            }

            tag = slugTag(tag)
            if (file.data.frontmatter) {
              const noteTags = file.data.frontmatter.tags ?? []
              file.data.frontmatter.tags = [...new Set([...noteTags, tag])]
            }

            return {
              type: "link",
              url: base + `/tags/${tag}`,
              data: {
                hProperties: {
                  className: ["tag-link"],
                },
              },
              children: [
                {
                  type: "text",
                  value: tag,
                },
              ],
            }
          },
        ])
        mdastFindReplaceInHtml(tree, replacements, opts.inHtml)
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
