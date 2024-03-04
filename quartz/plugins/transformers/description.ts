import { Root as HTMLRoot } from "hast"
import { toString } from "hast-util-to-string"
import { QuartzTransformerPlugin } from "../types"
import { escapeHTML } from "../../util/escape"

export interface Options {
  descriptionLength: number
  replaceExternalLinks: boolean
}

const defaultOptions: Options = {
  descriptionLength: 150,
  replaceExternalLinks: true,
}

const urlRegex = new RegExp(
  /(https?:\/\/)?(?<domain>([\da-z\.-]+)\.([a-z\.]{2,6})(:\d+)?)(?<path>[\/\w\.-]*)(\?[\/\w\.=&;-]*)?/,
  "g",
)

export const Description: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Description",
    htmlPlugins() {
      return [
        () => {
          return async (tree: HTMLRoot, file) => {
            let frontMatterDescription = file.data.frontmatter?.description
            let text = escapeHTML(toString(tree))

            if (opts.replaceExternalLinks) {
              frontMatterDescription = frontMatterDescription?.replace(
                urlRegex,
                "$<domain>" + "$<path>",
              )
              text = text.replace(urlRegex, "$<domain>" + "$<path>")
            }

            const desc = frontMatterDescription ?? text
            const sentences = desc.replace(/\s+/g, " ").split(/\.\s/)
            let finalDesc = ""
            let sentenceIdx = 0
            const len = opts.descriptionLength

            if (sentences[0] !== undefined && sentences[0].length >= len) {
              const firstSentence = sentences[0].split(" ")
              while (finalDesc.length < len) {
                const sentence = firstSentence[sentenceIdx]
                if (!sentence) break
                finalDesc += sentence + " "
                sentenceIdx++
              }
              finalDesc = finalDesc.trimEnd() + "..."
            } else {
              while (finalDesc.length < len) {
                const sentence = sentences[sentenceIdx]
                if (!sentence) break
                finalDesc += sentence.endsWith(".") ? sentence : sentence + "."
                sentenceIdx++
              }
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
