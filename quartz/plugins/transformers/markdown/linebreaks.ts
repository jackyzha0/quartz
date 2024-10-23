import { MarkdownTransformerPlugin } from "../../types"
import remarkBreaks from "remark-breaks"

export const HardLineBreaks: MarkdownTransformerPlugin = () => {
  return {
    name: "HardLineBreaks",
    transformation() {
      return [remarkBreaks]
    },
  }
}
