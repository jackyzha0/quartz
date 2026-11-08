import { QuartzComponentProps } from "../../components/types"
import { FullSlug, simplifySlug } from "../../util/path"

export type ConditionPredicate = (props: QuartzComponentProps) => boolean

const builtinConditions: Record<string, ConditionPredicate> = {
  "not-index": (props) => props.fileData.slug !== "index",
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

export function getCondition(name: string): ConditionPredicate | undefined {
  return customConditions.get(name) ?? builtinConditions[name]
}

export function getAllConditionNames(): string[] {
  return [...Object.keys(builtinConditions), ...customConditions.keys()]
}
