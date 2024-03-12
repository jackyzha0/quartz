import rehypeCitation from "rehype-citation"
import rehypeRewrite from "rehype-rewrite"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  bibliographyFile: string
  suppressBibliography: boolean
  linkCitations: boolean
  csl: string
}

const defaultOptions: Options = {
  bibliographyFile: "./bibliography.bib",
  suppressBibliography: false,
  linkCitations: false,
  csl: "apa",
}

export const Citations: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Citations",
    htmlPlugins() {
      return [
        [
          rehypeCitation,
          {
            bibliography: opts.bibliographyFile,
            suppressBibliography: opts.suppressBibliography,
            linkCitations: opts.linkCitations,
          },
        ],
        // Transform the HTML of the citattions; add data-no-popover property to the citation links
        // using https://github.com/jaywcjlove/rehype-rewrite as they're just anochor links
        [
          rehypeRewrite,
          {
            rewrite: (node: any) => {
              // Add data-no-popover to all elements which have an ID that starts with "#bib"
              if (node.tagName === "a" && node.properties.href?.startsWith("#bib")) {
                node.properties["data-no-popover"] = true
              }
            },
          },
        ],
      ]
    },
  }
}
