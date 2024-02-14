import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import DepGraph from "../../depgraph"
import chalk from "chalk"

export type ContentIndex = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  bypassIndexCheck: boolean
  rssLimit?: number
  rssFullHtml: boolean
  includeEmptyFiles: boolean
  feedDirectories: string[]
}

const defaultOptions: Options = {
  bypassIndexCheck: false,
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  includeEmptyFiles: true,
  feedDirectories: ["index"],
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndex): string {
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

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: number): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description>${content.richContent ?? content.description}</description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!

        graph.addEdge(
          sourcePath,
          joinSegments(ctx.argv.output, "static/contentIndex.json") as FilePath,
        )
        if (opts?.enableSiteMap) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "sitemap.xml") as FilePath)
        }
        if (opts?.enableRSS) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "index.xml") as FilePath)
        }
      }

      return graph
    },
    async emit(ctx, content, _resources) {
      // If we're missing an index file, don't bother with sitemap/RSS gen
      if (!(opts?.bypassIndexCheck || content.map((c) => c[1].data.slug!).includes("index" as FullSlug))) {
        console.warn(
          chalk.yellow(`Warning: contentIndex: 
  content/ folder is missing an index.md. RSS feeds and sitemap will not be generated.
  If you still wish to generate these files, add:
    bypassIndexCheck: true,
  to your configuration for Plugin.ContentIndex({...}) in quartz.config.ts.
  Don't do this unless you know what you're doing!`),
        )
        return []
      }

      const cfg = ctx.cfg.configuration
      const emitted: Promise<FilePath>[] = []
      const feedIndices: Map<string, ContentIndex> = new Map()

      for (const feed of opts?.feedDirectories!) {
        const linkIndex: ContentIndex = new Map()
        for (const [tree, file] of content) {
          const slug = file.data.slug!

          const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
          if (
            (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) &&
            (slug.startsWith(feed) || feed == "index")
          ) {
            linkIndex.set(slug, {
              title: file.data.frontmatter?.title!,
              links: file.data.links ?? [],
              tags: file.data.frontmatter?.tags ?? [],
              content: file.data.text ?? "",
              richContent: opts?.rssFullHtml
                ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
                : undefined,
              date: date,
              description: file.data.description ?? "",
            })
          }
        }
        feedIndices.set(feed, linkIndex)
      }

      const siteFeed = feedIndices.get("index")!
      if (opts?.enableSiteMap) {
        emitted.push(
          write({
            ctx,
            // bfahrenfort: "index" is guaranteed non-null
            // see directories instantiation and feedIndices.set iterating over directories
            content: generateSiteMap(cfg, siteFeed),
            slug: "sitemap" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      if (opts?.enableRSS) {
        opts.feedDirectories!.map((feed) => {
          emitted.push(
            write({
              ctx,
              // bfahrenfort: we just generated a feedIndices entry for every directories entry, guaranteed non-null
              content: generateRSSFeed(cfg, feedIndices.get(feed)!, opts?.rssLimit),
              slug: feed as FullSlug,
              ext: ".xml",
            }),
          )
        })
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(feedIndices.get("index")!).map(([slug, content]) => {
          // remove description and from content index as nothing downstream
          // actually uses it. we only keep it in the index as we need it
          // for the RSS feed
          delete content.description
          delete content.date
          return [slug, content]
        }),
      )

      emitted.push(
        write({
          ctx,
          content: JSON.stringify(simplifiedIndex),
          slug: fp,
          ext: ".json",
        }),
      )

      return await Promise.all(emitted)
    },
    getQuartzComponents: () => [],
  }
}
