import matter from "gray-matter"
import remarkFrontmatter from "remark-frontmatter"
import yaml from "js-yaml"
import toml from "toml"
import { QuartzTransformerPlugin } from "../types"
import { QuartzPluginData } from "../vfile"
import { FrontmatterConfig } from "../../cfg"
import { ContentError } from "../../util/pluginErrors"
import {
  FilePath,
  FullSlug,
  getFileExtension,
  slugifyFilePath,
  slugTag,
  splitAnchor,
} from "../../util/path"

/**
 * Built-in frontmatter parsing (formerly the parsing half of `@quartz-community/note-properties`).
 *
 * Writes `file.data.frontmatter` (with a guaranteed `title`), `file.data.aliases` (+ registers
 * alias/permalink slugs in `ctx.allSlugs`) and `file.data.frontmatterLinks` (wikilinks / Markdown
 * links found in property values, counted as outgoing links by the links built-in).
 *
 * Every core feature depends on this (page titles, tags, drafts, dates, aliases), so it runs first
 * in the markdown stage. Rendering the properties panel stays in the note-properties plugin.
 */

export const frontmatterDefaults: Required<Omit<FrontmatterConfig, "enabled" | "order">> = {
  delimiters: "---",
  language: "yaml",
}

function coalesceAliases(data: Record<string, unknown>, aliases: string[]): unknown {
  for (const alias of aliases) {
    if (data[alias] !== undefined && data[alias] !== null) return data[alias]
  }
  return undefined
}

function coerceToArray(input: unknown): string[] | undefined {
  if (input === undefined || input === null) return undefined
  if (!Array.isArray(input)) {
    return String(input)
      .split(",")
      .map((s) => s.trim())
  }
  return input
    .filter((v: unknown) => typeof v === "string" || typeof v === "number")
    .map((v: string | number) => v.toString())
}

function getAliasSlugs(aliases: string[]): FullSlug[] {
  return aliases.map((alias) => {
    const isMd = getFileExtension(alias) === ".md"
    const mockFp = isMd ? alias : alias + ".md"
    return slugifyFilePath(mockFp as FilePath)
  })
}

/** `[[Some Note#Heading]]` target → `some-note#heading` (same slugging as wikilinks). */
export function slugifyWikilinkTarget(target: string): string {
  const [rawPath, anchor] = splitAnchor(target)
  if (!rawPath) return anchor
  const pathWithExt = rawPath.endsWith(".md") ? rawPath : `${rawPath}.md`
  return slugifyFilePath(pathWithExt as FilePath) + anchor
}

const WIKILINK_PATTERN = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g
const MDLINK_PATTERN = /\[(?:[^\]]*)\]\(([^)]+)\)/g

/** All link targets (wikilinks and Markdown links) inside a frontmatter value, recursively. */
export function extractLinksFromValue(value: unknown): string[] {
  if (typeof value === "string") {
    const links: string[] = []
    for (const match of value.matchAll(WIKILINK_PATTERN))
      links.push(slugifyWikilinkTarget(match[1]!))
    for (const match of value.matchAll(MDLINK_PATTERN)) links.push(match[1]!)
    return links
  }
  if (Array.isArray(value)) return value.flatMap((item) => extractLinksFromValue(item))
  if (value !== null && typeof value === "object") {
    return Object.values(value).flatMap((v) => extractLinksFromValue(v))
  }
  return []
}

/** Normalise raw frontmatter in place: title, tags, aliases, cssclasses, dates, socialImage. */
export function normalizeFrontmatter(
  data: Record<string, unknown>,
  fallbackTitle: string,
): { aliases: FullSlug[] } {
  if (data.title != null && data.title.toString() !== "") {
    data.title = data.title.toString()
  } else {
    data.title = fallbackTitle
  }

  const tags = coerceToArray(coalesceAliases(data, ["tags", "tag"]))
  if (tags) data.tags = [...new Set(tags.map((tag) => slugTag(tag)))]

  const aliasSlugs: FullSlug[] = []
  const aliases = coerceToArray(coalesceAliases(data, ["aliases", "alias"]))
  if (aliases) {
    data.aliases = aliases
    aliasSlugs.push(...getAliasSlugs(aliases))
  }

  // The page's address (Obsidian Publish semantics); applied before parsing, see util/permalinks.ts
  if (data.permalink != null && data.permalink.toString() !== "") {
    data.permalink = data.permalink.toString()
  }

  const cssclasses = coerceToArray(coalesceAliases(data, ["cssclasses", "cssclass"]))
  if (cssclasses) data.cssclasses = cssclasses

  const socialImage = coalesceAliases(data, ["socialImage", "image", "cover"])

  const created = coalesceAliases(data, ["created", "date"])
  if (created) data.created = created

  const modified = coalesceAliases(data, ["modified", "lastmod", "updated", "last-modified"])
  if (modified) data.modified = modified
  data.modified ||= created

  const published = coalesceAliases(data, ["published", "publishDate", "date"])
  if (published) data.published = published

  if (socialImage) data.socialImage = socialImage

  return { aliases: aliasSlugs }
}

/**
 * gray-matter adds custom engines to its defaults, which include a `javascript`/`js` engine that
 * `eval`s the frontmatter (`---js`). Content is data, not code: refuse those languages.
 */
const refuseJavaScript = (): never => {
  throw new ContentError(
    "JavaScript frontmatter (---js / ---javascript) is not supported: Quartz does not execute code from content. Use YAML or TOML frontmatter.",
  )
}

/** Parse a file's frontmatter with the configured delimiters and language (`{}` when it has none). */
export function readFrontmatterData(
  source: Buffer | string,
  options: Pick<FrontmatterConfig, "delimiters" | "language"> = {},
): Record<string, unknown> {
  const language = options.language ?? frontmatterDefaults.language
  if (language !== "yaml" && language !== "toml") {
    // a configuration mistake, not a problem in the file: no ContentError
    throw new Error(
      `Frontmatter: unsupported \`language\` option ${JSON.stringify(language)} (use "yaml" or "toml")`,
    )
  }
  try {
    const { data } = matter(Buffer.isBuffer(source) ? source : Buffer.from(source), {
      delimiters: options.delimiters ?? frontmatterDefaults.delimiters,
      language,
      engines: {
        yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        toml: (s) => toml.parse(s) as object,
        javascript: refuseJavaScript,
        js: refuseJavaScript,
      },
    })
    // YAML/TOML can hold a single value (`--- hello ---`) or a list (`- a`); properties are
    // key/value pairs
    if (typeof data !== "object" || data === null || Array.isArray(data)) {
      const kind = Array.isArray(data) ? "list" : typeof data
      throw new ContentError(
        `Invalid frontmatter: expected properties (\`key: value\` lines), got a ${kind} (${JSON.stringify(data)})`,
      )
    }
    return data
  } catch (err) {
    if (err instanceof ContentError) throw err
    throw new ContentError(`Invalid frontmatter: ${err instanceof Error ? err.message : err}`, {
      cause: err,
    })
  }
}

export const Frontmatter: QuartzTransformerPlugin<FrontmatterConfig> = (userOpts) => {
  const opts = { ...frontmatterDefaults, ...userOpts }
  return {
    name: "Frontmatter",
    markdownPlugins(ctx) {
      const { allSlugs } = ctx
      return [
        [remarkFrontmatter, ["yaml", "toml"]],
        () => {
          return (_, file) => {
            const data = readFrontmatterData(Buffer.from(file.value as Uint8Array), opts)

            const { aliases } = normalizeFrontmatter(data, file.stem ?? "Untitled")
            // With a permalink the page lives at the permalink (set in parse.ts); its file path
            // becomes an extra address that redirects there (like an alias).
            const pathSlug = file.data.relativePath
              ? slugifyFilePath(file.data.relativePath)
              : undefined
            if (pathSlug && file.data.slug && file.data.slug !== pathSlug) aliases.push(pathSlug)
            if (aliases.length > 0) {
              file.data.aliases = aliases
              allSlugs.push(...aliases)
              const unique = [...new Set(allSlugs)]
              allSlugs.splice(0, allSlugs.length, ...unique)
            }

            const frontmatterLinks = extractLinksFromValue(data)
            if (frontmatterLinks.length > 0) {
              file.data.frontmatterLinks = [
                ...(file.data.frontmatterLinks ?? []),
                ...frontmatterLinks,
              ]
            }

            file.data.frontmatter = data as QuartzPluginData["frontmatter"]
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    /** Slugs of this page's `aliases` and `permalink` (built-in frontmatter). */
    aliases: FullSlug[]
    /** Link targets found in frontmatter values (built-in frontmatter). */
    frontmatterLinks: string[]
  }
}
