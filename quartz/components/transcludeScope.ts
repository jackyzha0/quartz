import type { Element, ElementContent, Root } from "hast"

/**
 * Transcluded content is a copy of another page's HTML, ids included: two transclusions (or a
 * transclusion and its host) share heading ids and footnote ids (`user-content-fn-1`), so a
 * footnote reference or a `[[#Heading]]` link jumps to whichever element comes first on the page.
 * Obsidian resolves each embed on its own.
 *
 * {@link scopeTranscludedIds} gives the ids inside one transclusion a prefix, unique on the page,
 * and rewrites the references inside it to match. The host's ids stay as they are. A same-page
 * link (`#id`) whose target isn't in the transclusion (a heading slice that doesn't hold it) links
 * to the id on the transcluded page instead.
 */

/** Space-separated id references (hast property names). */
const ID_LIST_PROPERTIES = [
  "ariaDescribedBy",
  "ariaLabelledBy",
  "ariaControls",
  "ariaOwns",
  "ariaDetails",
  "ariaFlowTo",
  "htmlFor",
  "headers",
] as const

/** Subtrees whose ids are referenced from inside them in ways we don't rewrite (`url(#id)`). */
const OPAQUE = new Set(["svg", "math"])

function forEachElement(node: Element | Root, fn: (el: Element) => void) {
  for (const child of node.children) {
    if (child.type !== "element") continue
    fn(child)
    if (!OPAQUE.has(child.tagName)) forEachElement(child, fn)
  }
}

/** Per page render: a prefix for each transclusion, unique on the page. */
export function createIdScopes(): (target: string) => string {
  const used = new Map<string, number>()
  return (target) => {
    const base =
      (target.split("/").pop() ?? target)
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "") || "transclude"
    const count = (used.get(base) ?? 0) + 1
    used.set(base, count)
    return count === 1 ? `${base}--` : `${base}-${count}--`
  }
}

/**
 * Prefixes the ids inside the transclusion `el` with `prefix` and rewrites references to them
 * inside it. `sourceHref` is the link to the transcluded page (relative to the host), for
 * same-page links whose target isn't in the transclusion.
 */
export function scopeTranscludedIds(el: Element, prefix: string, sourceHref?: string) {
  const ids = new Set<string>()
  forEachElement(el, (node) => {
    const id = node.properties?.id
    if (typeof id === "string" && id) ids.add(id)
  })

  const pageHref = typeof sourceHref === "string" ? sourceHref.split("#")[0] : undefined
  const scoped = (id: string) => (ids.has(id) ? `${prefix}${id}` : id)

  forEachElement(el, (node) => {
    const props = node.properties
    if (!props) return
    if (typeof props.id === "string" && ids.has(props.id)) props.id = `${prefix}${props.id}`

    const href = props.href
    if (typeof href === "string" && href.startsWith("#") && href.length > 1) {
      let target = href.slice(1)
      try {
        target = decodeURIComponent(target)
      } catch {
        // keep as written
      }
      if (ids.has(target)) props.href = `#${prefix}${target}`
      else if (pageHref) props.href = `${pageHref}${href}`
    }

    const record = props as Record<string, unknown>
    for (const name of ID_LIST_PROPERTIES) {
      const value = record[name]
      if (Array.isArray(value)) record[name] = value.map((token) => scoped(String(token)))
      else if (typeof value === "string") record[name] = value.split(/\s+/).map(scoped).join(" ")
    }
  })
}

/**
 * The block inside Obsidian's per-block wrapper (`div.el-p > p`, `div.el-h2 > h2`), which
 * `@quartz-community/rehype-obsidian` renders around each of a note's top-level blocks; any other
 * node is its own block. Code walking a page's top-level blocks looks through the wrappers.
 */
export function blockOf(node: ElementContent): ElementContent {
  if (node.type !== "element" || node.tagName !== "div") return node
  const classes = ([] as unknown[]).concat(node.properties?.className ?? [])
  if (!classes.some((c) => /^el-[a-z0-9]+$/.test(String(c)))) return node
  const inner = node.children.filter((c) => c.type === "element")
  return inner.length === 1 ? inner[0]! : node
}

function isFootnotesSection(node: ElementContent): node is Element {
  node = blockOf(node)
  if (node.type !== "element" || node.tagName !== "section") return false
  const props = node.properties ?? {}
  const classes = (props.className ?? []) as string[]
  return props.dataFootnotes !== undefined || classes.includes("footnotes")
}

/**
 * A heading transclusion: the slice of the page from the heading to the next one of the same or
 * a higher level. The page's footnotes section is not part of the section; the footnotes the
 * slice references are added after it (in a copy of the section holding only those, in its block
 * wrapper if it has one).
 */
export function sliceWithFootnotes(
  pageChildren: ElementContent[],
  start: number,
  end: number | undefined,
): ElementContent[] {
  const slice = pageChildren.slice(start, end).filter((node): boolean => !isFootnotesSection(node))
  const section = pageChildren.find(isFootnotesSection)
  if (!section) return slice

  const referenced = new Set<string>()
  const collect = (node: Element | Root) =>
    forEachElement(node, (child) => {
      const href = child.properties?.href
      if (child.properties?.dataFootnoteRef !== undefined && typeof href === "string")
        referenced.add(href.replace(/^#/, ""))
    })
  for (const node of slice) if (node.type === "element") collect(node as Element)
  if (referenced.size === 0) return slice

  const copy = structuredClone(section) as Element
  const keep = (list: Element) => {
    list.children = list.children.filter(
      (item) =>
        item.type !== "element" ||
        item.tagName !== "li" ||
        referenced.has(String(item.properties?.id ?? "")),
    )
  }
  forEachElement(copy, (node) => {
    if (node.tagName === "ol") keep(node)
  })
  return [...slice, copy]
}
