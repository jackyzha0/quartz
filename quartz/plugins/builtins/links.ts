import path from "path"
import { visit } from "unist-util-visit"
import isAbsoluteUrl from "is-absolute-url"
import { Element, Root, Text } from "hast"
import { VFile } from "vfile"
import { QuartzTransformerPlugin } from "../types"
import { LinksConfig } from "../../cfg"
import {
  FullSlug,
  RelativeURL,
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
  disableBrokenWikilinks: false,
}

/** Defaults of the former crawl-links plugin, applied when its config entry is migrated. */
export const legacyCrawlLinksDefaults: Partial<LinksConfig> = {
  markdownLinkResolution: "absolute",
}

const isAbsolute = isAbsoluteUrl as (url: string, options?: { httpOnly?: boolean }) => boolean
const isExternalUrl = (url: string) => isAbsolute(url, { httpOnly: false })

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

export const Links: QuartzTransformerPlugin<LinksConfig> = (userOpts) => {
  const opts = { ...linksDefaults, ...userOpts }
  return {
    name: "Links",
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
                classes.push(
                  ...(isExternal ? ["external", "external-link"] : ["internal", "internal-link"]),
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

                // link text differs from the href → it's an alias ("[[note|text]]")
                const firstChild = node.children[0]
                if (
                  node.children.length === 1 &&
                  firstChild?.type === "text" &&
                  firstChild.value !== dest
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

                  if (opts.disableBrokenWikilinks && !ctx.allSlugs.includes(full)) {
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
                    textChild.value = path.basename(textChild.value)
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
                if (!isExternalUrl(node.properties.src)) {
                  node.properties.src = resolveLink(node.properties.src as RelativeURL)
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
}
