import { QuartzParser } from "../../types"
import { JSResource } from "../../../util/resources"
import { visit } from "unist-util-visit"
import { Root, Code } from "mdast"
import { Pluggable } from "unified"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

export const ObsidianMermaid: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianMermaid",
    textTransform(_ctx, src: string | Buffer) {
      if (opts.enabled) {
        if (src instanceof Buffer) {
          src = src.toString()
        }
      }
      return src
    },
    markdownPlugins() {
      const plug: Pluggable = (tree: Root, _file) => {
        if (opts.enabled) {
          visit(tree, "code", (node: Code) => {
            if (node.lang === "mermaid") {
              node.data = {
                hProperties: {
                  className: ["mermaid"],
                },
              }
            }
          })
        }
      }
      return plug
    },
    htmlPlugins() {
      const plug: Pluggable = () => {}
      return plug
    },
    externalResources() {
      if (opts.enabled) {
        const js: JSResource = {
          script: `
            let mermaidImport = undefined
            document.addEventListener('nav', async () => {
              if (document.querySelector("code.mermaid")) {
                mermaidImport ||= await import('https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.7.0/mermaid.esm.min.mjs')
                const mermaid = mermaidImport.default
                const darkMode = document.documentElement.getAttribute('saved-theme') === 'dark'
                mermaid.initialize({
                  startOnLoad: false,
                  securityLevel: 'loose',
                  theme: darkMode ? 'dark' : 'default'
                })
  
                await mermaid.run({
                  querySelector: '.mermaid'
                })
              }
            });
            `,
          loadTime: "afterDOMReady",
          moduleType: "module",
          contentType: "inline",
        }
        return js
      }
      return {} as JSResource
    },
  }
}
