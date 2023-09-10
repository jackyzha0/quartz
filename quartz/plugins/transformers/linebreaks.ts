import { QuartzTransformerPlugin } from "../types"
import remarkBreaks from "remark-breaks"

export const LineBreaks: QuartzTransformerPlugin<undefined> = (_) => {
  return {
    name: "LineBreaks",
    markdownPlugins() {
      return [remarkBreaks]
    },
  }
}
