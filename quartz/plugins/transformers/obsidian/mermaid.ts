import { Root, Code } from "mdast"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"
import { JSResource } from "../../../util/resources"

export const mermaidPlugin = () => {
  return (tree: Root, _file: VFile) => {
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

export const mermaidResources = (js: JSResource[]) => {
  js.push({
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
  })
}
