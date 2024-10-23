import remarkMath from "remark-math"
import { MarkdownTransformerPlugin } from "../../types"

export const Latex: MarkdownTransformerPlugin = () => {
  return {
    name: "Latex",
    transformation() {
      return [remarkMath]
    },
  }
}
