import { TextTransformerPlugin } from "../../types"

const commentRegex = new RegExp(/%%[\s\S]*?%%/g)

export const ObsidianFlavoredMarkdownComments: TextTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownComments",
    transformation(_ctx, src) {
      // do comments at text level
      if (src instanceof Buffer) {
        src = src.toString()
      }

      src = src.replace(commentRegex, "")

      return src
    },
  }
}
