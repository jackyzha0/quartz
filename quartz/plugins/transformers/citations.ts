import rehypeCitation from "rehype-citation"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  bibliographyFile: string
  suppressBibliography: boolean
}

const defaultOptions: Options = {
  bibliographyFile: "./bibliography.bib",
  suppressBibliography: false,
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
            // Until popovers are implemented to not show for citation links, I
            // don't want to link citations
            linkCitations: false,
          },
        ],
      ]
    },
  }
}
