import remarkMath from "remark-math"
import rehypeKatex from 'rehype-katex'
import rehypeMathjax from 'rehype-mathjax/svg.js'
import { QuartzTransformerPlugin } from "../types"

interface Options {
  renderEngine: 'katex' | 'mathjax'
}

export const Latex: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  const engine = opts?.renderEngine ?? 'katex'
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      return [
        engine === 'katex'
          ? [rehypeKatex, { output: 'html' }]
          : [rehypeMathjax]
      ]
    },
    externalResources() {
      return engine === 'katex'
        ? {
          css: [
            // base css
            "https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css",
          ],
          js: [
            {
              // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
              src: "https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/contrib/copy-tex.min.js",
              loadTime: "afterDOMReady",
              contentType: 'external'
            }
          ]
        }
        : {}
    }
  }
}
