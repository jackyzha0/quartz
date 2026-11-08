import { FilePath, FullSlug, slugifyFilePath } from "./path"

/**
 * Permalinks, as in Obsidian Publish: `permalink: page` in a note's frontmatter makes the note's
 * address on the site `/page`, whatever its file path. (`aliases` are extra addresses that
 * redirect to the note; see the alias-redirects plugin.)
 *
 * Quartz needs every page's address before parsing (links resolve against `ctx.allSlugs`), so
 * permalinks are collected from frontmatter up front, keyed by the file's path relative to the
 * content directory.
 */
export type Permalinks = Record<string, FullSlug>

/** The slug for a frontmatter `permalink` value, or undefined when it is empty. */
export function normalizePermalink(raw: unknown): FullSlug | undefined {
  if (raw === null || raw === undefined) return undefined
  const value = String(raw)
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "")
  if (value === "" || value === ".") return undefined
  return slugifyFilePath(`${value}.md` as FilePath)
}

export interface CollectPermalinksOptions {
  /** Markdown files, relative to the content directory. */
  files: string[]
  /** Frontmatter `permalink` of a file (undefined when it has none). */
  permalinkOf: (file: string) => unknown
  /** Called for permalinks that are ignored because the address is taken. */
  warn?: (message: string) => void
}

/**
 * Permalinks of `files`. A permalink is ignored (with a warning) when another page already has
 * that address — its file path or an earlier permalink — so a permalink never replaces a page.
 */
export function collectPermalinks({
  files,
  permalinkOf,
  warn = () => {},
}: CollectPermalinksOptions): Permalinks {
  const pathSlugs = new Map(files.map((f) => [slugifyFilePath(f as FilePath), f]))
  const taken = new Map<FullSlug, string>()
  const permalinks: Permalinks = {}
  for (const file of files) {
    const slug = normalizePermalink(permalinkOf(file))
    if (!slug) continue
    const own = slugifyFilePath(file as FilePath)
    if (slug === own) continue // the note's own path: nothing to do
    const owner = pathSlugs.get(slug) ?? taken.get(slug)
    if (owner !== undefined) {
      warn(
        `${file}: permalink "${slug}" is already the address of ${owner}; the note keeps its own path.`,
      )
      continue
    }
    taken.set(slug, file)
    permalinks[file] = slug
  }
  return permalinks
}

/** The slug a content file is published at: its permalink, else its slugified path. */
export function slugForFile(file: string, permalinks: Permalinks | undefined): FullSlug {
  return permalinks?.[file] ?? slugifyFilePath(file as FilePath)
}

/** Path slug → permalink slug, for mapping links resolved by file path to the page's address. */
export function permalinkTargets(permalinks: Permalinks | undefined): Map<FullSlug, FullSlug> {
  return new Map(
    Object.entries(permalinks ?? {}).map(([file, slug]) => [
      slugifyFilePath(file as FilePath),
      slug,
    ]),
  )
}
