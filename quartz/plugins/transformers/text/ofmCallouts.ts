import { TextTransformerPlugin } from "../../types"

const calloutLineRegex = new RegExp(/^> *\[\!\w+\|?.*?\][+-]?.*$/gm)

export const ObsidianFlavoredMarkdownCallouts: TextTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownCallouts",
    transformation(_ctx, src) {
      // pre-transform blockquotes
      if (src instanceof Buffer) {
        src = src.toString()
      }

      src = src.replace(calloutLineRegex, (value) => {
        // force newline after title of callout
        return value + "\n> "
      })

      return src
    },
  }
}
