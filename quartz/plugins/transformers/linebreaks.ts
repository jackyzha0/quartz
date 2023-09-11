import { QuartzTransformerPlugin } from "../types"
import remarkBreaks from "remark-breaks"

export const HardLineBreaks: QuartzTransformerPlugin = () => {
  return {
    name: "HardLineBreaks",
    markdownPlugins() {
      return [remarkBreaks]
    },
  }
}
