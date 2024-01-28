import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"
import { QuartzTransformerPlugin } from "../types"
import yaml from "js-yaml"
import toml from "toml"
import { slugTag } from "../../util/path"
import { QuartzPluginData } from "../vfile"
import chalk from "chalk"

export interface Options {
  delims: string | string[]
  language: "yaml" | "toml"
}

const defaultOptions: Options = {
  delims: "---",
  language: "yaml",
}

function coerceDate(fp: string, d: unknown): Date | undefined {
  if (d === undefined || d === null) return undefined
  const dt = new Date(d as string | number)
  const invalidDate = isNaN(dt.getTime()) || dt.getTime() === 0
  if (invalidDate) {
    console.log(
      chalk.yellow(
        `\nWarning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`,
      ),
    )

    return undefined
  }

  return dt
}

function coalesceAliases(data: { [key: string]: any }, aliases: string[]) {
  for (const alias of aliases) {
    if (data[alias] !== undefined && data[alias] !== null) return data[alias]
  }
}

function coerceToArray(input: string | string[]): string[] | undefined {
  if (input === undefined || input === null) return undefined

  // coerce to array
  if (!Array.isArray(input)) {
    input = input
      .toString()
      .split(",")
      .map((tag: string) => tag.trim())
  }

  // remove all non-strings
  return input
    .filter((tag: unknown) => typeof tag === "string" || typeof tag === "number")
    .map((tag: string | number) => tag.toString())
}

export const FrontMatter: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "FrontMatter",
    markdownPlugins() {
      return [
        [remarkFrontmatter, ["yaml", "toml"]],
        () => {
          return (_, file) => {
            const fp = file.data.filePath!
            const { data } = matter(Buffer.from(file.value), {
              ...opts,
              engines: {
                yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
                toml: (s) => toml.parse(s) as object,
              },
            })

            if (data.title) {
              data.title = data.title.toString()
            } else if (data.title === null || data.title === undefined) {
              data.title = file.stem ?? "Untitled"
            }

            const tags = coerceToArray(coalesceAliases(data, ["tags", "tag"]))
            if (tags) data.tags = [...new Set(tags.map((tag: string) => slugTag(tag)))]

            const aliases = coerceToArray(coalesceAliases(data, ["aliases", "alias"]))
            if (aliases) data.aliases = aliases
            const cssclasses = coerceToArray(coalesceAliases(data, ["cssclasses", "cssclass"]))
            if (cssclasses) data.cssclasses = cssclasses
            const created = coerceDate(fp, coalesceAliases(data, ["created", "date"]))

            if (created) data.created = created
            const modified = coerceDate(
              fp,
              coalesceAliases(data, ["modified", "lastmod", "updated", "last-modified"]),
            )
            if (modified) data.modified = modified
            const published = coerceDate(fp, coalesceAliases(data, ["published", "publishDate"]))
            if (published) data.published = published

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
    frontmatter: { [key: string]: unknown } & {
      title: string
    } & Partial<{
        tags: string[]
        aliases: string[]
        description: string
        publish: boolean
        draft: boolean
        enableToc: string
        cssclasses: string[]
        created: Date
        modified: Date
        published: Date
      }>
  }
}
