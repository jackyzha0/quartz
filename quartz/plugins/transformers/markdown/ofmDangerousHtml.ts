import { MarkdownTransformerPlugin } from "../../types"
import { Root, Html, Paragraph } from "mdast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { visit } from "unist-util-visit"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { PhrasingContent } from "mdast-util-find-and-replace/lib"
import { PluggableList } from "unified"

export const ObsidianFlavoredMarkdownDangerousHtml: MarkdownTransformerPlugin = () => {
  const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!
    return toHtml(hast, { allowDangerousHtml: true })
  }

  return {
    name: "ObsidianFlavoredMarkdownDangerousHtml",
    transformation(_ctx) {
      const plugins: PluggableList = []

      // regex replacements
      plugins.push(() => {
        return (tree: Root, file) => {
          const replacements: [RegExp, string | ReplaceFunction][] = []

          visit(tree, "html", (node: Html) => {
            for (const [regex, replace] of replacements) {
              if (typeof replace === "string") {
                node.value = node.value.replace(regex, replace)
              } else {
                node.value = node.value.replace(regex, (substring: string, ...args) => {
                  const replaceValue = replace(substring, ...args)
                  if (typeof replaceValue === "string") {
                    return replaceValue
                  } else if (Array.isArray(replaceValue)) {
                    return replaceValue.map(mdastToHtml).join("")
                  } else if (typeof replaceValue === "object" && replaceValue !== null) {
                    return mdastToHtml(replaceValue)
                  } else {
                    return substring
                  }
                })
              }
            }
          })

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
