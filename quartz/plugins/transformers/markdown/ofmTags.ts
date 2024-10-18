import { MarkdownTransformerPlugin } from "../../types"
import { Root } from "mdast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { pathToRoot, slugTag } from "../../../util/path"
import { PluggableList } from "unified"

// (?:^| )              -> non-capturing group, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}\d\p{Z}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters and symbols, hyphens and/or underscores
// (?:\/[-_\p{L}\d\p{Z}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const tagRegex = new RegExp(
  /(?:^| )#((?:[-_\p{L}\p{Emoji}\p{M}\d])+(?:\/[-_\p{L}\p{Emoji}\p{M}\d]+)*)/gu,
)

export const ObsidianFlavoredMarkdownTags: MarkdownTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownTags",
    transformation(_ctx) {
      const plugins: PluggableList = []

      // regex replacements
      plugins.push(() => {
        return (tree: Root, file) => {
          const replacements: [RegExp, string | ReplaceFunction][] = []
          const base = pathToRoot(file.data.slug!)

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

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
