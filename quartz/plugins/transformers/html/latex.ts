import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
import { HtmlTransformerPlugin } from "../../types"

interface Options {
  renderEngine: "katex" | "mathjax"
  customMacros: MacroType
}

interface MacroType {
  [key: string]: string
}

export const Latex: HtmlTransformerPlugin<Partial<Options>> = (opts) => {
  const engine = opts?.renderEngine ?? "katex"
  const macros = opts?.customMacros ?? {}
  return {
    name: "Latex",
    transformation() {
      if (engine === "katex") {
        return [[rehypeKatex, { output: "html", macros }]]
      } else {
        return [[rehypeMathjax, { macros }]]
      }
    },
  }
}
