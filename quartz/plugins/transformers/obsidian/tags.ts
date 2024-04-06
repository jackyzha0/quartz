import { ReplaceFunction } from "mdast-util-find-and-replace"
import { VFile } from "vfile";
import { RelativeURL, slugTag } from "../../../util/path";

// (?:^| )                   -> non-capturing group, tag should start be separated by a space or be the start of the line
// #(...)                    -> capturing group, tag itself must start with #
// (?:[-_\p{L}\d\p{Z}])+     -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters and symbols, hyphens and/or underscores
// (?:\/[-_\p{L}\d\p{Z}]+)*) -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const tagRegex = /(?:^| )#((?:[-_\p{L}\p{Emoji}\p{M}\d])+(?:\/[-_\p{L}\p{Emoji}\p{M}\d]+)*)/gu

export const tagsRegexReplacement = (file: VFile, base: RelativeURL): [RegExp, string | ReplaceFunction] => {

  return [
    tagRegex,
    (_value: string, tag: string) => {
      // Check if the tag only includes numbers
      if (/^\d+$/.test(tag)) {
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
  ];
};
