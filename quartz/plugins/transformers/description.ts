import { Root as HTMLRoot } from "hast"
import { toString } from "hast-util-to-string"
import { QuartzTransformerPlugin } from "../types"
import { escapeHTML } from "../../util/escape"

export interface Options {
  descriptionLength: number
}

const defaultOptions: Options = {
  descriptionLength: 150,
}

export const Description: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Description",
    htmlPlugins() {
      return [
        () => {
          return async (tree: HTMLRoot, file) => {
            const frontMatterDescription = file.data.frontmatter?.description
            const text = escapeHTML(toString(tree))

            const desc = frontMatterDescription ?? text
            const sentences = desc.replace(/\s+/g, " ").split(".")
            let finalDesc = ""
            let sentenceIdx = 0
            const len = opts.descriptionLength
            while (finalDesc.length < len) {
              const sentence = sentences[sentenceIdx]
              if (!sentence) break
              finalDesc += sentence + "."
              sentenceIdx++
            }

            file.data.description = finalDesc
            file.data.text = text
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    description: string
    text: string
  }
}
