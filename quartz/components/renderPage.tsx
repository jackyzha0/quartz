import { render } from "preact-render-to-string"
import { QuartzComponent, QuartzComponentProps } from "./types"
import BodyConstructor from "./Body"
import {
  CSSResource,
  JSResource,
  JSResourceToScriptElement,
  StaticResources,
} from "../util/resources"
import {
  FullSlug,
  RelativeURL,
  getSlugOptions,
  joinSegments,
  normalizeHastElement,
} from "../util/path"
import { clone } from "../util/clone"
import { Root, Element, ElementContent } from "hast"
import { GlobalConfiguration, SidebarModes } from "../cfg"
import { i18n } from "../i18n"
import { styleText } from "util"
import { resolveFrame } from "./frames"
import type { PageTreeTransforms, TreeTransform } from "../plugins/types"
import { blockOf, createIdScopes, scopeTranscludedIds, sliceWithFootnotes } from "./transcludeScope"
import type { BuildCtx } from "../util/ctx"

interface RenderComponents {
  head: QuartzComponent
  header: QuartzComponent[]
  beforeBody: QuartzComponent[]
  pageBody: QuartzComponent
  afterBody: QuartzComponent[]
  left: QuartzComponent[]
  right: QuartzComponent[]
  footer: QuartzComponent[]
  frame?: string
  sidebars?: SidebarModes
}

const headerRegex = new RegExp(/h[1-6]/)

/**
 * Whether a heading answers to `id`: its own id, or the id of a `span.heading-alias` inside it.
 * GitHubFlavoredMarkdown adds that alias when the anchor Obsidian writes for a heading (`:`, `|`,
 * `^`, `#` and `\` become spaces) slugs differently, e.g. `![[note#Colon unspaced]]` for
 * `## Colon:unspaced`.
 */
function headingHasId(heading: Element, id: string): boolean {
  if (heading.properties?.id === id) return true
  const hasAlias = (el: Element): boolean =>
    el.children.some(
      (child) =>
        child.type === "element" &&
        ((child.properties?.id === id &&
          ([] as unknown[]).concat(child.properties?.className ?? []).includes("heading-alias")) ||
          hasAlias(child)),
    )
  return hasAlias(heading)
}
/**
 * `configuration.slugs` for scripts in the browser. @quartz-community/utils (1.3+) keeps its slug
 * options on this global, so every plugin script that slugs (the explorer places pages by their
 * file path) slugs as the build did. Nothing is written with the default options.
 */
export function slugOptionsScript(): string {
  const options = getSlugOptions()
  if (!options.stripDiacritics) return ""
  return `;globalThis[Symbol.for("@quartz-community/utils/slugOptions")] = ${JSON.stringify(options)}`
}

export function pageResources(
  baseDir: FullSlug | RelativeURL,
  staticResources: StaticResources,
  ctx?: BuildCtx,
): StaticResources {
  const hashedNames = ctx?.hashedResourceNames
  const cssFile = hashedNames?.["index.css"] ?? "index.css"
  const prescriptFile = hashedNames?.["prescript.js"] ?? "prescript.js"
  const postscriptFile = hashedNames?.["postscript.js"] ?? "postscript.js"

  const componentCssResources: CSSResource[] = []
  if (ctx?.componentCssMap) {
    const seen = new Set<string>()
    for (const filename of ctx.componentCssMap.values()) {
      if (seen.has(filename)) continue
      seen.add(filename)
      componentCssResources.push({ content: joinSegments(baseDir, filename) })
    }
  }

  const extracted = ctx?.extractedInlineResources
  const resolvedCss: CSSResource[] = staticResources.css.map((resource) => {
    if (!(resource.inline ?? false) || !extracted) return resource
    const filename = extracted.get(resource.content)
    if (!filename) return resource
    return { content: joinSegments(baseDir, filename) }
  })

  const resolvedJs: JSResource[] = staticResources.js.map((resource) => {
    if (resource.contentType !== "inline" || !extracted) return resource
    const filename = extracted.get(resource.script)
    if (!filename) return resource
    return {
      src: joinSegments(baseDir, filename),
      loadTime: resource.loadTime,
      contentType: "external" as const,
      moduleType: resource.moduleType,
      spaPreserve: resource.spaPreserve,
    }
  })

  const contentIndexPath = joinSegments(baseDir, "static/contentIndex.json")
  // static/contentIndex.json is emitted by the content-index plugin, which may be disabled.
  // Resolve to an empty index instead of rejecting so consumers (search, explorer, graph, …)
  // degrade gracefully rather than throwing uncaught errors on every page.
  const contentIndexScript =
    `const fetchData = fetch("${contentIndexPath}")` +
    `.then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json() })` +
    `.catch(e => { console.warn("[Quartz] Could not load ${contentIndexPath} (" + e.message + "); is configuration.contentIndex disabled?"); return {} });` +
    // Absolute URL of static/ (plugin assets live in static/plugins/<to>). Resolved once on the
    // first page, so it stays valid across SPA navigations.
    `window.quartzStaticUrl = new URL(${JSON.stringify(joinSegments(baseDir, "static") + "/")}, location.href).href` +
    slugOptionsScript()

  const resources: StaticResources = {
    css: [
      {
        content: joinSegments(baseDir, cssFile),
      },
      ...componentCssResources,
      ...resolvedCss,
    ],
    js: [
      {
        src: joinSegments(baseDir, prescriptFile),
        loadTime: "beforeDOMReady",
        contentType: "external",
      },
      {
        loadTime: "beforeDOMReady",
        contentType: "inline",
        spaPreserve: true,
        script: contentIndexScript,
      },
      ...resolvedJs,
    ],
    additionalHead: staticResources.additionalHead,
  }

  resources.js.push({
    src: joinSegments(baseDir, postscriptFile),
    loadTime: "afterDOMReady",
    moduleType: "module",
    contentType: "external",
  })

  return resources
}

/** Lucide's maximize-2, Obsidian's icon for opening an embedded note. */
const MAXIMIZE_ICON: Element = {
  type: "element",
  tagName: "svg",
  properties: {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: ["svg-icon", "lucide-maximize-2"],
  },
  children: ["M15 3h6v6", "m21 3-7 7", "m3 21 7-7", "M9 21H3v-6"].map((d) => ({
    type: "element",
    tagName: "path",
    properties: { d },
    children: [],
  })),
}

/**
 * Obsidian's embed markup around transcluded content, so Obsidian themes' embed
 * styles apply: the title (the note's, for a whole-note embed), then the content in a
 * rendered view, then Quartz's link to the original, then Obsidian's icon link to it
 * (`.markdown-embed-link`), which Quartz hides and Obsidian's styles show.
 */
function obsidianEmbed(title: string, content: ElementContent[], link: Element): ElementContent[] {
  const embedLink: Element = {
    type: "element",
    tagName: "a",
    properties: {
      href: link.properties.href,
      className: ["markdown-embed-link"],
      ariaLabel: (link.children[0] as { value?: string } | undefined)?.value,
      dataNoPopover: true,
    },
    children: [structuredClone(MAXIMIZE_ICON)],
  }
  return [
    {
      type: "element",
      tagName: "div",
      properties: { className: ["embed-title", "markdown-embed-title"] },
      children: title ? [{ type: "text", value: title }] : [],
    },
    {
      type: "element",
      tagName: "div",
      properties: { className: ["markdown-embed-content"] },
      children: [
        {
          type: "element",
          tagName: "div",
          properties: { className: ["markdown-preview-view", "markdown-rendered"] },
          children: content,
        },
      ],
    },
    link,
    embedLink,
  ]
}

/** @internal Exported for testing only. */
export function renderTranscludes(
  root: Root,
  cfg: GlobalConfiguration,
  slug: FullSlug,
  componentData: QuartzComponentProps,
  visited: Set<FullSlug>,
) {
  // a prefix per transclusion, unique on the page, for the ids inside it
  const scopeFor = createIdScopes()

  // Walk the tree manually instead of using visit() so we can track the
  // ancestor chain for cycle detection. visit() runs the callback before
  // descending into replaced children, so a Set-based guard there falsely
  // rejects sibling transclusions of the same target.
  function walk(node: Element | Root) {
    const children = (node as Root).children ?? []
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (child?.type !== "element") continue
      const el = child as Element

      // Transclusions are <div class="transclude"> (Quartz 5.2+; <blockquote> before).
      const classNames = (el.properties?.className ?? []) as string[]
      if (
        (el.tagName !== "div" && el.tagName !== "blockquote") ||
        !classNames.includes("transclude")
      ) {
        walk(el)
        continue
      }

      const inner = el.children[0] as Element
      const linkToOriginal = (): Element => ({
        type: "element",
        tagName: "a",
        properties: {
          href: inner.properties?.href,
          class: ["internal", "internal-link", "transclude-src"],
        },
        children: [{ type: "text", value: i18n(cfg.locale).components.transcludes.linkToOriginal }],
      })
      const transcludeTarget = (inner.properties["data-slug"] ?? slug) as FullSlug
      if (visited.has(transcludeTarget)) {
        console.warn(
          styleText(
            "yellow",
            `Warning: Skipping circular transclusion: ${slug} -> ${transcludeTarget}`,
          ),
        )
        el.children = [
          {
            type: "element",
            tagName: "p",
            properties: { style: "color: var(--secondary);" },
            children: [
              {
                type: "text",
                value: `Circular transclusion detected: ${transcludeTarget}`,
              },
            ],
          },
        ]
        continue
      }

      visited.add(transcludeTarget)

      let page = componentData.allFiles.find((f) => f.slug === transcludeTarget)
      if (!page) {
        const dotIdx = transcludeTarget.lastIndexOf(".")
        const slashIdx = transcludeTarget.lastIndexOf("/")
        if (dotIdx > slashIdx + 1) {
          const stripped = transcludeTarget.slice(0, dotIdx) as FullSlug
          page = componentData.allFiles.findLast((f) => f.slug === stripped)
        }
      }
      if (!page) {
        visited.delete(transcludeTarget)
        continue
      }

      let blockRef = el.properties.dataBlock as string | undefined
      if (blockRef?.startsWith("#^")) {
        // block transclude: `data.blocks` is keyed by the block's name, lowercased (`para-1`); the
        // block element's id is `^para-1` (rehype-obsidian), its anchor `#^para-1`
        blockRef = blockRef.slice("#^".length).toLowerCase()
        let blockNode = page.blocks?.[blockRef]
        if (blockNode) {
          if (blockNode.tagName === "li") {
            blockNode = {
              type: "element",
              tagName: "ul",
              properties: {},
              children: [blockNode],
            }
          }

          el.children = obsidianEmbed(
            "",
            [normalizeHastElement(blockNode, slug, transcludeTarget)],
            linkToOriginal(),
          )
        }
      } else if (blockRef?.startsWith("#") && page.htmlAst) {
        // header transclude
        blockRef = blockRef.slice(1)
        let startIdx = undefined
        let startDepth = undefined
        let endIdx = undefined
        for (const [i, child] of page.htmlAst.children.entries()) {
          // The heading, inside its block wrapper if it has one (`div.el-h2 > h2`).
          const htmlEl = blockOf(child as ElementContent)
          if (!(htmlEl.type === "element" && htmlEl.tagName.match(headerRegex))) continue
          const depth = Number(htmlEl.tagName.substring(1))

          if (startIdx === undefined || startDepth === undefined) {
            if (headingHasId(htmlEl, blockRef)) {
              startIdx = i
              startDepth = depth
            }
          } else if (depth <= startDepth) {
            endIdx = i
            break
          }
        }

        if (startIdx === undefined) {
          visited.delete(transcludeTarget)
          continue
        }

        el.children = obsidianEmbed(
          "",
          sliceWithFootnotes(page.htmlAst.children as ElementContent[], startIdx, endIdx).map((c) =>
            normalizeHastElement(c as Element, slug, transcludeTarget),
          ),
          linkToOriginal(),
        )
      } else if (page.htmlAst) {
        // page transclude
        el.children = obsidianEmbed(
          page.frontmatter?.title ??
            i18n(cfg.locale).components.transcludes.transcludeOf({
              targetSlug: page.slug!,
            }),
          (page.htmlAst.children as ElementContent[]).map((c) =>
            normalizeHastElement(c as Element, slug, transcludeTarget),
          ),
          linkToOriginal(),
        )
      }

      // Recurse into the replaced children to resolve nested transclusions,
      // then remove from visited so sibling embeds of the same target work.
      walk(el)
      // its ids (headings, footnotes) are unique on the page, and links inside it go to them
      scopeTranscludedIds(el, scopeFor(transcludeTarget), inner.properties?.href as string)
      visited.delete(transcludeTarget)
    }
  }

  walk(root)
}

/**
 * A page's content as it is rendered: a copy of its tree with the transformers' `before`
 * transforms applied, transclusions inlined, then the page types' `treeTransforms` and the
 * transformers' `after` transforms applied.
 */
export function transformPageContent(
  cfg: GlobalConfiguration,
  slug: FullSlug,
  componentData: QuartzComponentProps,
  transforms?: TreeTransform[] | PageTreeTransforms,
): Root {
  const { before, treeTransforms, after } = Array.isArray(transforms)
    ? { before: [], treeTransforms: transforms, after: [] }
    : (transforms ?? { before: [], treeTransforms: [], after: [] })

  // make a deep copy of the tree so we don't remove the transclusion references
  // for the file cached in contentMap in build.ts
  const root = clone(componentData.tree) as Root

  // transformers' render-time transforms that need the content before it is filled in
  for (const transform of before) transform(root, slug, componentData)

  const visited = new Set<FullSlug>([slug])
  renderTranscludes(root, cfg, slug, componentData, visited)

  // Run plugin-provided tree transforms (e.g. resolving inline bases codeblocks)
  for (const transform of treeTransforms) transform(root, slug, componentData)

  // transformers' render-time transforms of the finished content (e.g. encrypting it)
  for (const transform of after) transform(root, slug, componentData)
  return root
}

export function renderPage(
  cfg: GlobalConfiguration,
  slug: FullSlug,
  componentData: QuartzComponentProps,
  components: RenderComponents,
  pageResources: StaticResources,
  transforms?: TreeTransform[] | PageTreeTransforms,
): string {
  const root = transformPageContent(cfg, slug, componentData, transforms)

  // set componentData.tree to the edited html that has transclusions rendered
  componentData.tree = root

  const {
    head: Head,
    header,
    beforeBody,
    pageBody: Content,
    afterBody,
    left,
    right,
    footer,
    frame: frameName,
    sidebars,
  } = components
  const Body = BodyConstructor()
  const frame = resolveFrame(frameName)

  const lang = componentData.fileData.frontmatter?.lang ?? cfg.locale?.split("-")[0] ?? "en"
  const direction = i18n(cfg.locale).direction ?? "ltr"
  // During local dev (--serve), the dev server serves from root without the
  // baseUrl subpath, so basePath must be empty to avoid broken links.
  const basePath =
    componentData.ctx.argv.serve || !cfg.baseUrl
      ? ""
      : new URL(`https://${cfg.baseUrl}`).pathname.replace(/\/$/, "")
  const doc = (
    <html lang={lang} dir={direction}>
      <Head {...componentData} />
      <body data-slug={slug} data-basepath={basePath}>
        {frame.css && <style dangerouslySetInnerHTML={{ __html: frame.css }} />}
        <div id="quartz-root" class="page" data-frame={frame.name}>
          <Body {...componentData}>
            {[
              frame.render({
                componentData,
                head: Head,
                header,
                beforeBody,
                pageBody: Content,
                afterBody,
                left,
                right,
                footer,
                sidebars: { left: sidebars?.left ?? "fit", right: sidebars?.right ?? "fit" },
              }),
            ]}
          </Body>
        </div>
      </body>
      {pageResources.js
        .filter((resource) => resource.loadTime === "afterDOMReady")
        .map((res) => JSResourceToScriptElement(res, true))}
    </html>
  )

  return "<!DOCTYPE html>\n" + render(doc)
}
