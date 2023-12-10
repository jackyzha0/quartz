import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"
import { QuartzTransformerPlugin } from "../types"
import yaml from "js-yaml"
import toml from "toml"
import { slugTag } from "../../util/path"
import { QuartzPluginData } from "../vfile"

export interface Options {
  delims: string | string[]
  language: "yaml" | "toml"
  oneLineTagDelim: string
}

const defaultOptions: Options = {
  delims: "---",
  language: "yaml",
  oneLineTagDelim: ",",
}

export const FrontMatter: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "FrontMatter",
    markdownPlugins() {
      const { oneLineTagDelim } = opts

      return [
        [remarkFrontmatter, ["yaml", "toml"]],
        () => {
          return (_, file) => {
            const { data } = matter(file.value, {
              ...opts,
              engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
                toml: (s) => toml.parse(s) as object,
              },
            })

            // tag is an alias for tags
            if (data.tag) {
              data.tags = data.tag
            }

            // coerce title to string
            if (data.title) {
              data.title = data.title.toString()
            } else if (data.title === null || data.title === undefined) {
              data.title = file.stem ?? "Untitled"
            }

            if (data.tags && !Array.isArray(data.tags)) {
              data.tags = data.tags
                .toString()
                .split(oneLineTagDelim)
                .map((tag: string) => tag.trim())
            }

            // slug them all!!
            data.tags = [...new Set(data.tags?.map((tag: string) => slugTag(tag)))] ?? []

            // fill in frontmatter
            file.data.frontmatter = data as QuartzPluginData["frontmatter"]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    frontmatter: { [key: string]: any } & {
      title: string
      tags: string[]
    }
  }
}
