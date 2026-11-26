import { QuartzComponentProps } from "../../components/types"
import { FullSlug, simplifySlug } from "../../util/path"

export type ConditionPredicate = (props: QuartzComponentProps) => boolean

const builtinConditions: Record<string, ConditionPredicate> = {
  "is-index": (props) => props.fileData.slug === "index",
  "not-index": (props) => props.fileData.slug !== "index",
  // A folder's index page: `folder/index.md` or a generated folder page, not the root index.
  "is-folder-index": (props) => {
    const slug = props.fileData.slug
    return typeof slug === "string" && slug.endsWith("/index")
  },
  "has-tags": (props) => {
    const tags = props.fileData.frontmatter?.tags
    return Array.isArray(tags) && tags.length > 0
  },
  // Backlinks are not stored on fileData; they are derived at render time from
  // every other file's `links` (same rule as the backlinks plugin: unlisted
  // pages don't count, and links are compared against the simplified slug).
  "has-backlinks": (props) => hasBacklinks(props),
  "has-toc": (props) => {
    const toc = (props.fileData as Record<string, unknown>).toc
    return Array.isArray(toc) && toc.length > 0
  },
}

/** @internal Exported for testing only. */
export function hasBacklinks(props: Pick<QuartzComponentProps, "fileData" | "allFiles">): boolean {
  const slug = props.fileData.slug
  if (!slug) return false
  const target = simplifySlug(slug as FullSlug)
  return (props.allFiles ?? []).some((file) => {
    const f = file as { unlisted?: boolean; links?: unknown }
    return f.unlisted !== true && Array.isArray(f.links) && f.links.includes(target)
  })
}

const customConditions = new Map<string, ConditionPredicate>()

export function registerCondition(name: string, predicate: ConditionPredicate): void {
  customConditions.set(name, predicate)
}

const NEGATION_PREFIX = "not-"

/**
 * Look up a condition. Besides the registered names, `not-<name>` negates any other
 * condition (`not-has-tags`, `not-is-folder-index`, a custom `not-<custom>`), unless a
 * condition with that exact name exists (`not-index` is its own built-in).
 */
export function getCondition(name: string): ConditionPredicate | undefined {
  const direct = customConditions.get(name) ?? builtinConditions[name]
  if (direct) return direct
  if (name.startsWith(NEGATION_PREFIX)) {
    const inner = getCondition(name.slice(NEGATION_PREFIX.length))
    if (inner) return (props) => !inner(props)
  }
  return undefined
}

export function getAllConditionNames(): string[] {
  return [...Object.keys(builtinConditions), ...customConditions.keys()]
}
