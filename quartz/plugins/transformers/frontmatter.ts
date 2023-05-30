import { PluggableList } from "unified"
import matter from "gray-matter"
import remarkFrontmatter from 'remark-frontmatter'
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  language: 'yaml' | 'toml',
  delims: string | string[]
}

const defaultOptions: Options = {
  language: 'yaml',
  delims: '---'
}

export class FrontMatter extends QuartzTransformerPlugin {
  name = "FrontMatter"
  opts: Options

  constructor(opts?: Options) {
    super()
    this.opts = { ...defaultOptions, ...opts }
  }

  markdownPlugins(): PluggableList {
    return [
      remarkFrontmatter,
      () => {
        return (_, file) => {
          const { data } = matter(file.value, this.opts)

          // fill in frontmatter
          file.data.frontmatter = {
            title: file.stem ?? "Untitled",
            tags: [],
            ...data
          }
        }
      }
    ]
  }

  htmlPlugins(): PluggableList {
    return []
  }
}

declare module 'vfile' {
  interface DataMap {
    frontmatter: { [key: string]: any } & {
      title: string
      tags: string[]
    }
  }
}
