import path from "path"
import { visit } from "unist-util-visit"
import isAbsoluteUrl from "is-absolute-url"
import { Element, Root, Text } from "hast"
import { VFile } from "vfile"
import { QuartzTransformerPlugin, QuartzTransformerPluginInstance } from "../types"
import { ProcessedContent } from "../vfile"
import { LinksConfig } from "../../cfg"
import {
  FullSlug,
  RelativeURL,
  linkPathDecodes,
  SimpleSlug,
  TransformOptions,
  resolveRelative,
  simplifySlug,
  slugifyFilePath,
  splitAnchor,
  stripSlashes,
  transformLink,
} from "../../util/path"
import { permalinkTargets } from "../../util/permalinks"

/**
 * Built-in link processing (formerly `@quartz-community/crawl-links`).
 *
 * Rewrites internal hrefs / resource srcs to paths relative to the current page (so links work at
 * any depth and under any base path), classifies links (`internal`, `external`, `alias`, `broken`)
 * and records outgoing links in `file.data.links` — which backlinks, graph, the content index and
 * the `has-backlinks` layout condition all read.
 *
 * Runs in the HTML stage at order 60, after the Markdown-flavour plugins that turn wikilinks into
 * `<a>` elements (OFM is 40) and before plugins that expect resolved links.
 */

export const linksDefaults: Required<Omit<LinksConfig, "enabled" | "order">> = {
  markdownLinkResolution: "shortest",
  prettyLinks: true,
  openLinksInNewTab: false,
  lazyLoad: false,
  externalLinkIcon: true,
  disableBrokenWikilinks: true,
}

/** Defaults of the former crawl-links plugin, applied when its config entry is migrated. */
export const legacyCrawlLinksDefaults: Partial<LinksConfig> = {
  markdownLinkResolution: "absolute",
}

// As in Obsidian: a URL with a scheme (`x:y`, but not `../x:y`), or a link whose path is not valid
// percent-encoding (`%zz`, `a%E2.md`), which names no file
const isExternalUrl = (url: string) =>
  isAbsoluteUrl(url, { httpOnly: false }) || !linkPathDecodes(url)
// An href percent-decoded, to compare with link text; left as it is when it does not decode
const decodedHref = (href: string) => {
  try {
    return decodeURI(href)
  } catch {
    return href
  }
}

const EXTERNAL_ICON_PATH =
  "M320 0H288V64h32 82.7L201.4 265.4 178.7 288 224 333.3l22.6-22.6L448 109.3V192v32h64V192 32 0H480 320zM32 32H0V64 480v32H32 456h32V480 352 320H424v32 96H64V96h96 32V32H160 32z"

function canonicalSlug(dest: string, curSlug: SimpleSlug): FullSlug {
  // url.resolve is considered legacy; WHATWG URL resolves relative to the current page.
  const url = new URL(dest, "https://base.com/" + stripSlashes(curSlug, true))
  let [canonical] = splitAnchor(url.pathname)
  if (canonical.endsWith("/")) canonical += "index"
  // WHATWG URL percent-encodes everything
  return decodeURIComponent(stripSlashes(canonical, true)) as FullSlug
}

/**
 * Whether a link's target is a page of the site. Tag and folder pages are generated after
 * the transformers run, so they aren't in `allSlugs` yet: a tag page (`tags/…`) exists for
 * every tag that is used, and a folder page (`folder/index`) for every folder with content.
 */
export function pageExists(allSlugs: readonly string[], full: string): boolean {
  if (allSlugs.includes(full)) return true
  if (full === "index" || full.startsWith("tags/")) return true
  if (full.endsWith("/index")) {
    const folder = full.slice(0, -"index".length)
    return allSlugs.some((s) => s.startsWith(folder))
  }
  return false
}

/** File types Obsidian opens from the vault (embeds and attachments): a link to one that the content doesn't have names a missing file. */
const VAULT_FILE_TYPES = new Set(
  "avif bmp gif jpeg jpg png svg webp flac m4a mp3 ogg wav 3gp mkv mov mp4 ogv webm pdf canvas base".split(
    " ",
  ),
)

/**
 * Whether an internal link target is known to be missing, so it gets the `broken` class.
 * Only targets Quartz can check are: pages (see pageExists) and files of the types a vault
 * holds (images, audio, video, PDFs, canvases, bases), which the content copies as assets.
 * Anything else may be a file Quartz or a plugin emits and the transformers can't know about
 * (`index.xml`, `sitemap.xml`, `robots.txt`, `static/…`, og images), so it is not marked.
 */
export function linkTargetMissing(allSlugs: readonly string[], full: string): boolean {
  // the not-found page is always emitted (`.html` is dropped from links like `.md`)
  if (full === "404" || pageExists(allSlugs, full)) return false
  // quartz/static and plugin assets are served at static/
  if (full.startsWith("static/")) return false
  const name = full.slice(full.lastIndexOf("/") + 1)
  const ext = /\.([a-z][a-z0-9]{0,9})$/i.exec(name)?.[1]?.toLowerCase()
  if (ext === undefined) return true
  return VAULT_FILE_TYPES.has(ext)
}

/** The `broken` mark added after filtering, so a later rebuild can take it off again. */
const FILTERED_ATTR = "data-filtered"
/** The `broken` mark for links to folder and tag pages that no page type generated. */
const MISSING_ATTR = "data-missing"

/**
 * The pages the filters removed (drafts, pages without `publish: true`, …) and their aliases,
 * each with the filter that removed it. A folder's `index` note is left out: the folder may still
 * get a generated folder page, which only the generated pages tell (markUnpublishedLinks).
 */
export function removedPages(
  all: ProcessedContent[],
  published: ProcessedContent[],
  filteredBy: (slug: string) => string | undefined = () => "filter",
): Map<string, string> {
  const publishedSet = new Set(published)
  const live = new Set<string>()
  for (const item of published) {
    const data = item[1].data
    if (data.slug) live.add(data.slug)
    for (const alias of data.aliases ?? []) live.add(alias)
  }
  const removed = new Map<string, string>()
  for (const item of all) {
    if (publishedSet.has(item)) continue
    const data = item[1].data
    if (!data.slug) continue
    const reason = filteredBy(data.slug) ?? "filter"
    // its aliases (and the file path of a page with a permalink) are gone with it
    for (const slug of [data.slug, ...(data.aliases ?? [])]) {
      if (slug.endsWith("/index")) continue
      if (!live.has(slug) && !removed.has(slug)) removed.set(slug, reason)
    }
  }
  return removed
}

/** Link targets that page types generate (folder pages, tag pages), unknown while transforming. */
function isGeneratedTarget(slug: string): boolean {
  return (
    slug === "tags" || slug.startsWith("tags/") || (slug !== "index" && slug.endsWith("/index"))
  )
}

/**
 * Links are classified while the transformers run, before the filters decide what is
 * published and before page types generate folder and tag pages, so two kinds of links that
 * 404 are not marked `broken` then:
 *
 * - a link to a page a filter removes (a draft, a page without `publish: true`) still points at
 *   an address in `allSlugs` (crawl-links#7): it gets `data-filtered="<filter>"`;
 * - a link to a folder or tag page (see pageExists) that no page type generated — a folder whose
 *   notes are all drafts or that holds only images, a tag no published page uses, any folder or
 *   tag when folder-page / tag-page isn't installed: it gets `data-missing`.
 *
 * With `generated` (the slugs of the virtual pages, once page types ran) both are checked;
 * without it only removed pages, and folder pages are assumed to exist. Links marked this way
 * whose target is published again (watch mode) lose the mark; pages whose tree changed are added
 * to `changed`, so watch mode re-emits them. Returns the number of links marked.
 */
export function markUnpublishedLinks(
  published: ProcessedContent[],
  removed: ReadonlyMap<string, string>,
  generated?: ReadonlySet<string>,
  changed?: Set<FullSlug>,
): number {
  const live = new Set<string>(generated ?? [])
  for (const [, file] of published) {
    if (file.data.slug) live.add(file.data.slug)
    for (const alias of file.data.aliases ?? []) live.add(alias)
  }
  let marked = 0
  for (const [tree, file] of published) {
    let touched = false
    visit(tree as Root, "element", (node: Element) => {
      if (node.tagName !== "a" || !node.properties) return
      const target = node.properties["data-slug"]
      if (typeof target !== "string") return
      const props = node.properties
      const classes = Array.isArray(props.className) ? (props.className as string[]) : []
      let attr: string | undefined
      let value = ""
      // a parent tag's page is `tags/a/index`, served at `tags/a` too
      if (!live.has(target) && !live.has(`${target}/index`)) {
        const reason = removed.get(target)
        if (reason !== undefined) [attr, value] = [FILTERED_ATTR, reason]
        else if (generated && isGeneratedTarget(target)) attr = MISSING_ATTR
      }
      let cleared = false
      for (const other of [FILTERED_ATTR, MISSING_ATTR]) {
        if (other === attr || props[other] === undefined) continue
        delete props[other]
        cleared = touched = true
      }
      if (attr !== undefined) {
        if (props[attr] !== value || !classes.includes("broken")) touched = true
        if (!classes.includes("broken")) classes.push("broken")
        props.className = classes
        props[attr] = value
        marked++
      } else if (cleared) {
        props.className = classes.filter((c) => c !== "broken")
      }
    })
    if (touched && changed && file.data.slug) changed.add(file.data.slug)
  }
  return marked
}

/** {@link removedPages} + {@link markUnpublishedLinks}, before page types ran. */
export function markLinksToRemovedPages(
  all: ProcessedContent[],
  published: ProcessedContent[],
  filteredBy: (slug: string) => string | undefined = () => "filter",
): number {
  return markUnpublishedLinks(published, removedPages(all, published, filteredBy))
}

/** The Links instance marks links to removed pages after filtering (see build.ts). */
export type LinksInstance = QuartzTransformerPluginInstance & { marksBrokenLinks: boolean }

export const Links: QuartzTransformerPlugin<LinksConfig> = (userOpts) => {
  const opts = { ...linksDefaults, ...userOpts }
  const instance: LinksInstance = {
    name: "Links",
    marksBrokenLinks: opts.disableBrokenWikilinks,
    htmlPlugins(ctx) {
      return [
        () => {
          return (tree: Root, file: VFile) => {
            const fileSlug = file.data.slug as FullSlug
            const curSlug = simplifySlug(fileSlug)
            const outgoing: Set<SimpleSlug> = new Set()
            const transformOptions: TransformOptions = {
              strategy: opts.markdownLinkResolution,
              allSlugs: ctx.allSlugs,
            }

            // Permalinks: links are written relative to the note's file, and resolved by file
            // path (as in Obsidian). Resolve against the file's path slug, then point at where
            // the target is published (its permalink) from where this page is published.
            const targets = permalinkTargets(ctx.permalinks)
            const pathSlug = file.data.relativePath
              ? slugifyFilePath(file.data.relativePath)
              : fileSlug
            const rebase = targets.size > 0 || pathSlug !== fileSlug
            const resolveLink = (raw: string): RelativeURL => {
              const rel = transformLink(pathSlug, raw, transformOptions)
              if (!rebase) return rel
              const hash = rel.indexOf("#")
              const anchor = hash === -1 ? "" : rel.slice(hash)
              const target = canonicalSlug(rel, simplifySlug(pathSlug))
              return (resolveRelative(fileSlug, targets.get(target) ?? target) +
                anchor) as RelativeURL
            }

            visit(tree, "element", (node: Element) => {
              if (
                node.tagName === "a" &&
                node.properties &&
                typeof node.properties.href === "string"
              ) {
                let dest = node.properties.href as RelativeURL
                const classes = (node.properties.className ?? []) as string[]
                const isExternal = isExternalUrl(dest)
                // Footnote anchors aren't note links: Obsidian gives them `footnote-link`,
                // never `internal-link`, whose link styles would override theirs.
                const isFootnote =
                  node.properties.dataFootnoteRef !== undefined ||
                  node.properties.dataFootnoteBackref !== undefined
                classes.push(
                  ...(isExternal
                    ? ["external", "external-link"]
                    : isFootnote
                      ? ["internal"]
                      : ["internal", "internal-link"]),
                )

                if (isExternal && opts.externalLinkIcon) {
                  node.children.push({
                    type: "element",
                    tagName: "svg",
                    properties: {
                      "aria-hidden": "true",
                      class: "external-icon",
                      style: "max-width:0.8em;max-height:0.8em",
                      viewBox: "0 0 512 512",
                    },
                    children: [
                      {
                        type: "element",
                        tagName: "path",
                        properties: { d: EXTERNAL_ICON_PATH },
                        children: [],
                      },
                    ],
                  })
                }

                // link text differs from the href → it's an alias ("[[note|text]]"). The href is
                // percent-encoded by now ("a%20b" for "a b"), so it is compared decoded too (#2643)
                const firstChild = node.children[0]
                if (
                  node.children.length === 1 &&
                  firstChild?.type === "text" &&
                  firstChild.value !== dest &&
                  firstChild.value !== decodedHref(dest)
                ) {
                  classes.push("alias")
                }
                node.properties.className = classes

                if (isExternal && opts.openLinksInNewTab) {
                  node.properties.target = "_blank"
                }

                const isInternal = !(isExternal || dest.startsWith("#"))
                if (isInternal) {
                  dest = node.properties.href = resolveLink(dest)
                  const full = canonicalSlug(dest, curSlug)
                  outgoing.add(simplifySlug(full))
                  node.properties["data-slug"] = full

                  if (opts.disableBrokenWikilinks && linkTargetMissing(ctx.allSlugs, full)) {
                    classes.push("broken")
                    node.properties.className = classes
                  }
                }

                if (opts.prettyLinks && isInternal && node.children.length === 1) {
                  const textChild = node.children[0] as Text | undefined
                  if (
                    textChild?.type === "text" &&
                    !textChild.value.startsWith("#") &&
                    !classes.includes("alias")
                  ) {
                    // link text is not an OS path: path.posix, or Windows would also cut at a backslash
                    textChild.value = path.posix.basename(textChild.value)
                  }
                }
              }

              // other resources that reference files
              if (
                ["img", "video", "audio", "iframe"].includes(node.tagName) &&
                node.properties &&
                typeof node.properties.src === "string"
              ) {
                if (opts.lazyLoad) node.properties.loading = "lazy"
                const src = node.properties.src
                if (!isExternalUrl(src)) {
                  node.properties.src = resolveLink(src as RelativeURL)
                  // An embed of a file the site doesn't have: Obsidian shows its path, percent-decoded
                  // (`![](missing%20pic.png)` → “missing pic.png”). The image shows its alt text, so
                  // an image without one gets the path; an author's alt text is kept.
                  const target =
                    node.tagName === "img" && !node.properties.alt && !src.startsWith("#")
                      ? canonicalSlug(node.properties.src as string, curSlug)
                      : undefined
                  // (quartz/static is served at static/ but holds no content files)
                  if (target && !target.startsWith("static/") && !ctx.allSlugs.includes(target)) {
                    node.properties.alt = decodeURI(splitAnchor(src)[0])
                  }
                }
              }

              // <object data="…"> (SVG embeds) and <source src="…"> (in <video>/<audio>/<picture>)
              const resourceAttr =
                node.tagName === "object" ? "data" : node.tagName === "source" ? "src" : undefined
              if (resourceAttr && node.properties) {
                const value = node.properties[resourceAttr]
                if (
                  typeof value === "string" &&
                  value.length > 0 &&
                  !value.startsWith("#") &&
                  !isExternalUrl(value)
                ) {
                  node.properties[resourceAttr] = resolveLink(value as RelativeURL)
                }
              }
            })

            // links inside frontmatter values (built-in frontmatter) count as outgoing links too
            for (const fmLink of file.data.frontmatterLinks ?? []) {
              // external URLs (e.g. `repository: "[repo](https://github.com/…)"`) are not pages
              if (isExternalUrl(fmLink)) continue
              const [targetRaw] = splitAnchor(fmLink)
              if (!targetRaw) continue
              const dest = resolveLink(targetRaw)
              outgoing.add(simplifySlug(canonicalSlug(dest, curSlug)))
            }

            file.data.links = [...outgoing]
          }
        },
      ]
    },
  }
  return instance
}
