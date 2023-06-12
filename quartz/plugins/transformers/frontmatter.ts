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

export const FrontMatter: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "FrontMatter",
    markdownPlugins() {
      return [
        remarkFrontmatter,
        () => {
          return (_, file) => {
            const { data } = matter(file.value, opts)

            // fill in frontmatter
            file.data.frontmatter = {
              title: file.stem ?? "Untitled",
              tags: [],
              ...data
            }
          }
        }
      ]
    },
    htmlPlugins() {
      return []
    }
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
