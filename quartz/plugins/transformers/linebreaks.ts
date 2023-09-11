import { QuartzTransformerPlugin } from "../types"
import remarkBreaks from "remark-breaks"

export const LineBreaks: QuartzTransformerPlugin = () => {
  return {
    name: "LineBreaks",
    markdownPlugins() {
      return [remarkBreaks]
    },
  }
}
