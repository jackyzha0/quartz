import { PluggableList } from "unified"
import { Root as HTMLRoot } from 'hast'
import { toString } from "hast-util-to-string"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  descriptionLength: number
}

const defaultOptions: Options = {
  descriptionLength: 150
}

export class Description extends QuartzTransformerPlugin {
  name = "Description"
  opts: Options

  constructor(opts?: Options) {
    super()
    this.opts = { ...defaultOptions, ...opts }
  }

  markdownPlugins(): PluggableList {
    return []
  }

  htmlPlugins(): PluggableList {
    return [
      () => {
        return async (tree: HTMLRoot, file) => {
          const frontMatterDescription = file.data.frontmatter?.description
          const desc = frontMatterDescription ?? toString(tree)
          const sentences = desc.replace(/\s+/g, ' ').split('.')
          let finalDesc = ""
          let sentenceIdx = 0
          const len = this.opts.descriptionLength
          while (finalDesc.length < len) {
            finalDesc += sentences[sentenceIdx] + '.'
            sentenceIdx++
          }

          file.data.description = finalDesc
        }
      }
    ]
  }
}

declare module 'vfile' {
  interface DataMap {
    description: string
  }
}

