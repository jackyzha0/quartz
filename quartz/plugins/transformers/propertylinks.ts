import matter from "gray-matter"
import { QuartzTransformerPlugin } from "../types"
import yaml from "js-yaml"
import toml from "toml"

export interface Options {
  // To control whether to parse wikilinks from properties
  parsePropertiesWikilinks: boolean
  delims: string
  language: "yaml" | "toml"
}

const defaultOptions: Options = {
  parsePropertiesWikilinks: true,
  delims: "---",
  language: "yaml",
}

function propertyLinksToRegularMarkdown(obj: { [key: string]: any }): string {
  // Parses wikilinks from FrontMatter properties and returns a string with all.
  let result = ""

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (
        Array.isArray(obj[key]) &&
        typeof obj[key][0] === "string" &&
        obj[key][0].includes("[[")
      ) {
        result += `- ${key}: ${obj[key].join(", ")}\n`
      } else if (typeof obj[key] === "string" && obj[key].includes("[[")) {
        result += `- ${key}: ${obj[key]}\n`
      }
    }
  }

  return result
}

export const PropertyLinks: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "PropertyLinks",
    textTransform(_ctx, src) {
      // Prepend all links from properties to the content
      src = src.toString()

      if (!opts.parsePropertiesWikilinks) {
        return src
      }

      const { data } = matter(Buffer.from(src), {
        ...opts,
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
          toml: (s) => toml.parse(s) as object,
        },
      })
      const prop_links = propertyLinksToRegularMarkdown(data)

      if (prop_links == "") {
        return src
      }

      const yaml_props = src.split(opts.delims)[1]
      const content = src.split(opts.delims).slice(2).join(opts.delims)

      return (
        opts.delims + "\n" + yaml_props + opts.delims + "\n" + prop_links + opts.delims + content
      )
    },
  }
}
