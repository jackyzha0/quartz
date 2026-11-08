import path from "node:path"
import fs from "node:fs/promises"
import { Root } from "hast"
import { toHtml } from "hast-util-to-html"
import { styleText } from "util"
import { getDate } from "@quartz-community/utils"
import { ContentIndexConfig, GlobalConfiguration } from "../../cfg"
import { BuildCtx } from "../../util/ctx"
import { escapeHTML } from "../../util/escape"
import { i18n } from "../../i18n"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { ContentDetails, ContentIndexExtension, QuartzEmitterPlugin } from "../types"
import { ProcessedContent, QuartzPluginData } from "../vfile"

/**
 * Built-in content index (formerly `@quartz-community/content-index`).
 *
 * Emits `static/contentIndex.json` (read client-side by search, explorer, graph, recent notes …),
 * `sitemap.xml` and an RSS feed.
 *
 * Plugins can add their own fields to every entry of `contentIndex.json` by defining
 * `extendContentIndex` on their plugin instance (any category):
 *
 * ```ts
 * extendContentIndex({ fileData }) {
 *   return { readingTime: fileData.readingTime }
 * }
 * ```
 *
 * Returned fields must be JSON-serialisable. Core fields cannot be overridden, and when two
 * plugins return the same key the first one (in plugin order) wins — both cases print a warning
 * once. Namespacing keys (e.g. `"myPlugin:foo"` or a nested object) avoids collisions.
 */

export const contentIndexDefaults: Required<Omit<ContentIndexConfig, "enabled" | "order">> = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  rssSlug: "index",
  includeEmptyFiles: true,
}

export type ContentIndexMap = Map<FullSlug, ContentDetails>

/** Fields core writes for every entry (not overridable by extensions). */
export const CORE_CONTENT_INDEX_FIELDS = new Set([
  "slug",
  "filePath",
  "title",
  "links",
  "tags",
  "content",
  "richContent",
  "date",
  "description",
])

interface NamedExtension {
  plugin: string
  extend: ContentIndexExtension
}

/** Every `extendContentIndex` hook of the configured plugin instances, in plugin order. */
export function collectContentIndexExtensions(ctx: BuildCtx): NamedExtension[] {
  const plugins = ctx.cfg?.plugins
  if (!plugins) return []
  const instances = [
    ...plugins.transformers,
    ...plugins.filters,
    ...plugins.emitters,
    ...(plugins.pageTypes ?? []),
  ]
  const extensions: NamedExtension[] = []
  for (const instance of instances) {
    const extend = (instance as { extendContentIndex?: unknown }).extendContentIndex
    if (typeof extend === "function") {
      extensions.push({ plugin: instance.name, extend: extend as ContentIndexExtension })
    }
  }
  return extensions
}

const warned = new Set<string>()
function warnOnce(message: string) {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(styleText("yellow", "⚠") + ` ${message}`)
}

/** Apply extensions to one entry. Exported for tests. */
export function applyContentIndexExtensions(
  ctx: BuildCtx,
  extensions: NamedExtension[],
  entry: ContentDetails,
  fileData: QuartzPluginData,
): ContentDetails {
  if (extensions.length === 0) return entry
  const owners = new Map<string, string>()
  const result: Record<string, unknown> = { ...entry }
  for (const { plugin, extend } of extensions) {
    let fields: Record<string, unknown> | undefined | void
    try {
      fields = extend({ ctx, fileData, entry: Object.freeze({ ...entry }) })
    } catch (err) {
      warnOnce(
        `Content index: "${plugin}".extendContentIndex threw for ${entry.slug}: ${err instanceof Error ? err.message : String(err)}`,
      )
      continue
    }
    if (!fields || typeof fields !== "object") continue
    for (const [key, value] of Object.entries(fields)) {
      if (value === undefined) continue
      if (CORE_CONTENT_INDEX_FIELDS.has(key)) {
        warnOnce(
          `Content index: "${plugin}" tried to override core field "${key}" (ignored). Use a different key.`,
        )
        continue
      }
      const owner = owners.get(key)
      if (owner !== undefined && owner !== plugin) {
        warnOnce(
          `Content index: "${plugin}" and "${owner}" both add field "${key}"; keeping "${owner}"'s value.`,
        )
        continue
      }
      owners.set(key, plugin)
      result[key] = value
    }
  }
  return result as ContentDetails
}

/** Effective content index options from `configuration.contentIndex` (see planBuiltins). */
export function contentIndexOptions(
  ctx: BuildCtx,
): Required<Omit<ContentIndexConfig, "enabled" | "order">> {
  const raw = ctx.cfg?.configuration?.contentIndex
  return { ...contentIndexDefaults, ...(raw && typeof raw === "object" ? raw : {}) }
}

/**
 * Build the index once and put it on `ctx.contentIndex` for the emitters that follow.
 * Called by the emit phase (full builds and incremental rebuilds) after page types have
 * generated their virtual pages.
 */
export function prepareContentIndex(ctx: BuildCtx, content: ProcessedContent[]): ContentIndexMap {
  const index = buildContentIndex(ctx, content, contentIndexOptions(ctx))
  ctx.contentIndex = index
  return index
}

/** Build the index from processed content (also used by tests and potentially other emitters). */
export function buildContentIndex(
  ctx: BuildCtx,
  content: ProcessedContent[],
  options: Pick<ContentIndexConfig, "includeEmptyFiles" | "rssFullHtml"> = contentIndexDefaults,
): ContentIndexMap {
  const extensions = collectContentIndexExtensions(ctx)
  const index: ContentIndexMap = new Map()
  for (const [tree, file] of content) {
    const data = (file.data ?? {}) as QuartzPluginData
    if (data.unlisted === true) continue
    const text = data.text
    if (!(options.includeEmptyFiles ?? true) && !(text && text !== "")) continue
    const slug = data.slug as FullSlug
    const frontmatter = (data.frontmatter ?? {}) as Record<string, unknown>
    const entry: ContentDetails = {
      slug,
      filePath: data.relativePath as FilePath,
      title: (frontmatter.title as string | undefined) ?? "",
      links: (data.links as SimpleSlug[] | undefined) ?? [],
      tags: (frontmatter.tags as string[] | undefined) ?? [],
      content: text ?? "",
      richContent:
        options.rssFullHtml && data.encrypted !== true
          ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
          : undefined,
      date: getDate(data as Parameters<typeof getDate>[0]) ?? new Date(),
      description: (data.description as string | undefined) ?? "",
    }
    index.set(slug, applyContentIndexExtensions(ctx, extensions, entry, data))
  }
  return index
}

async function write(ctx: BuildCtx, slug: string, ext: string, content: string): Promise<FilePath> {
  const pathToPage = joinSegments(ctx.argv.output, slug + ext) as FilePath
  await fs.mkdir(path.dirname(pathToPage), { recursive: true })
  await fs.writeFile(pathToPage, content)
  return pathToPage
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndexMap): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${content.date && `<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndexMap, limit?: number): string {
  const base = cfg.baseUrl ?? ""
  const pageTitle = cfg.pageTitle ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description><![CDATA[ ${content.richContent ?? content.description} ]]></description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) return f2.date.getTime() - f1.date.getTime()
      if (f1.date && !f2.date) return -1
      if (!f1.date && f2.date) return 1
      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  const rss = i18n(cfg.locale).pages.rss
  const description = `${limit ? rss.lastFewNotes({ count: limit }) : rss.recentNotes} on ${escapeHTML(pageTitle)}`

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(pageTitle)}</title>
      <link>https://${base}</link>
      <description>${description}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

/** Entries as written to contentIndex.json (date and description are RSS/sitemap-only). */
export function serializeContentIndex(idx: ContentIndexMap): string {
  const simplified = Object.fromEntries(
    Array.from(idx).map(([slug, { date: _date, description: _description, ...rest }]) => [
      slug,
      rest,
    ]),
  )
  return JSON.stringify(simplified)
}

export const ContentIndex: QuartzEmitterPlugin<ContentIndexConfig> = (userOpts) => {
  const opts = { ...contentIndexDefaults, ...userOpts }
  const emitAll = async (ctx: BuildCtx, content: ProcessedContent[]): Promise<FilePath[]> => {
    const cfg = ctx.cfg.configuration
    // Reuse the index the emit phase prepared for this build (same content), else build it.
    const index =
      (ctx.contentIndex as ContentIndexMap | undefined) ?? buildContentIndex(ctx, content, opts)
    const outputs: FilePath[] = []
    if (opts.enableSiteMap) {
      outputs.push(await write(ctx, "sitemap", ".xml", generateSiteMap(cfg, index)))
    }
    if (opts.enableRSS) {
      outputs.push(
        await write(
          ctx,
          opts.rssSlug ?? "index",
          ".xml",
          generateRSSFeed(cfg, index, opts.rssLimit),
        ),
      )
    }
    outputs.push(
      await write(
        ctx,
        joinSegments("static", "contentIndex"),
        ".json",
        serializeContentIndex(index),
      ),
    )
    return outputs
  }

  return {
    name: "ContentIndex",
    emit: (ctx, content) => emitAll(ctx, content),
    partialEmit: (ctx, content) => emitAll(ctx, content),
  }
}
