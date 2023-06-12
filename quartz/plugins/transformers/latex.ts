import remarkMath from "remark-math"
import rehypeKatex from 'rehype-katex'
import { QuartzTransformerPlugin } from "../types"

export const Katex: QuartzTransformerPlugin = () => ({
  name: "Katex",
  markdownPlugins() {
    return [remarkMath]
  },
  htmlPlugins() {
    return [
      [rehypeKatex, {
        output: 'html',
      }]
    ]
  },
  externalResources: {
    css: [
      // base css
      "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css",
    ],
    js: [
      {
        // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
        src: "https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/contrib/copy-tex.min.js",
        loadTime: "afterDOMReady"
      }
    ]
  }
})
