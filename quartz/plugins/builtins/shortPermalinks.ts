import { createHash } from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"
import type { ShortPermalinksConfig } from "../../cfg"
import type { BuildCtx } from "../../util/ctx"
import { escapeHTML } from "../../util/escape"
import {
  type FilePath,
  type FullSlug,
  isFullSlug,
  joinSegments,
  resolveRelative,
  simplifySlug,
  stripSlashes,
} from "../../util/path"
import type { QuartzEmitterPlugin } from "../types"
import type { ProcessedContent } from "../vfile"

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const MAX_BASE62_SHA256_LENGTH = 43

export const shortPermalinksDefaults: Required<Omit<ShortPermalinksConfig, "enabled" | "order">> = {
  prefix: "s",
  hashLength: 8,
  onCollision: "disambiguation-page",
}

interface ShortPermalinkPage {
  slug: string
  sourcePath: string
  title: string
}

interface PlannedShortPermalink {
  slug: FullSlug
  pages: ShortPermalinkPage[]
}

/** Encode a SHA-256 digest as fixed-width base62, then take the requested prefix. */
export function shortPermalinkHash(sourcePath: string, length = 8): string {
  if (!Number.isInteger(length)) {
    throw new Error("Short permalink hashLength must be an integer")
  }
  if (length < 1 || length > MAX_BASE62_SHA256_LENGTH) {
    throw new Error(`Short permalink hashLength must be between 1 and ${MAX_BASE62_SHA256_LENGTH}`)
  }

  const digest = createHash("sha256").update(sourcePath).digest("hex")
  let value = BigInt(`0x${digest}`)
  let encoded = ""
  do {
    encoded = BASE62[Number(value % 62n)] + encoded
    value /= 62n
  } while (value > 0n)

  return encoded.padStart(MAX_BASE62_SHA256_LENGTH, "0").slice(0, length)
}

function normalizePrefix(prefix: string): string {
  const portable = prefix.trim().replace(/\\/g, "/")
  const segments = portable.split("/").filter((segment) => segment.length > 0)
  if (segments.length === 0 || segments.some((segment) => segment === "." || segment === "..")) {
    throw new Error("Short permalink prefix must be a non-empty path inside the output directory")
  }
  const normalized = segments.join("/")
  if (!isFullSlug(normalized)) {
    throw new Error("Short permalink prefix must be a valid URL path")
  }
  return normalized
}

function normalizeForComparison(slug: string): string {
  const simplified = simplifySlug(slug as FullSlug)
  return simplified === "/" ? "" : stripSlashes(simplified)
}

function pageFromContent(content: ProcessedContent): ShortPermalinkPage | undefined {
  const data = content[1].data
  const slug = data.slug
  if (typeof slug !== "string" || slug.length === 0) return undefined

  const sourcePath =
    typeof data.relativePath === "string" && data.relativePath.length > 0
      ? data.relativePath.replace(/\\/g, "/").replace(/^\/+/, "")
      : slug
  const frontmatter = data.frontmatter as Record<string, unknown> | undefined
  const title = typeof frontmatter?.title === "string" ? frontmatter.title : slug
  return { slug, sourcePath, title }
}

function planShortPermalinks(
  content: ProcessedContent[],
  prefix: string,
  hashLength: number,
  onCollision: NonNullable<ShortPermalinksConfig["onCollision"]>,
): { redirects: PlannedShortPermalink[]; occupied: Set<string> } {
  const pages = new Map<string, ShortPermalinkPage>()
  for (const item of content) {
    const page = pageFromContent(item)
    if (page) pages.set(page.slug, page)
  }

  const occupied = new Set(Array.from(pages, ([slug]) => normalizeForComparison(slug)))
  const groups = new Map<string, ShortPermalinkPage[]>()
  for (const page of pages.values()) {
    const hash = shortPermalinkHash(page.sourcePath, hashLength)
    const shortSlug = joinSegments(prefix, hash)
    const group = groups.get(shortSlug) ?? []
    group.push(page)
    groups.set(shortSlug, group)
  }

  const redirects: PlannedShortPermalink[] = []
  for (const [shortSlug, group] of groups) {
    group.sort((a, b) => a.slug.localeCompare(b.slug))
    if (occupied.has(normalizeForComparison(shortSlug))) {
      console.warn(
        `[ShortPermalinks] ${shortSlug} collides with an existing page; skipping the short permalink.`,
      )
      continue
    }
    if (group.length > 1 && onCollision === "skip") {
      console.warn(
        `[ShortPermalinks] ${shortSlug} maps to ${group.length} pages; skipping the colliding short permalink.`,
      )
      continue
    }
    redirects.push({ slug: shortSlug as FullSlug, pages: group })
  }

  redirects.sort((a, b) => a.slug.localeCompare(b.slug))
  return { redirects, occupied }
}

function safeScriptString(value: string): string {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

function redirectHtml(lang: string, shortSlug: FullSlug, page: ShortPermalinkPage): string {
  const target = resolveRelative(shortSlug, simplifySlug(page.slug as FullSlug))
  const escapedTarget = escapeHTML(target)
  const escapedTitle = escapeHTML(page.title)
  return `<!DOCTYPE html>
<html lang="${escapeHTML(lang)}">
<head>
<meta charset="utf-8">
<title>Redirecting to ${escapedTitle}</title>
<link rel="canonical" href="${escapedTarget}">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${escapedTarget}">
<script>window.location.replace(${safeScriptString(target)})</script>
</head>
<body>
<p>Redirecting… <a href="${escapedTarget}">Continue to ${escapedTitle}</a>.</p>
</body>
</html>
`
}

function disambiguationHtml(
  lang: string,
  shortSlug: FullSlug,
  pages: ShortPermalinkPage[],
): string {
  const links = pages
    .map((page) => {
      const target = resolveRelative(shortSlug, simplifySlug(page.slug as FullSlug))
      return `<li><a href="${escapeHTML(target)}">${escapeHTML(page.title)}</a></li>`
    })
    .join("\n")
  return `<!DOCTYPE html>
<html lang="${escapeHTML(lang)}">
<head>
<meta charset="utf-8">
<title>Choose a page</title>
<meta name="robots" content="noindex">
</head>
<body>
<main>
<h1>Did you mean one of these pages?</h1>
<ul>
${links}
</ul>
</main>
</body>
</html>
`
}

async function writePage(ctx: BuildCtx, slug: FullSlug, html: string): Promise<FilePath> {
  const outputPath = joinSegments(ctx.argv.output, `${slug}.html`) as FilePath
  await fs.mkdir(path.dirname(outputPath), { recursive: true })
  await fs.writeFile(outputPath, html)
  return outputPath
}

export const ShortPermalinks: QuartzEmitterPlugin<ShortPermalinksConfig> = (userOpts) => {
  const opts = { ...shortPermalinksDefaults, ...userOpts }
  const prefix = normalizePrefix(opts.prefix)
  // Validate eagerly even when a site currently has no pages.
  shortPermalinkHash("", opts.hashLength)
  if (opts.onCollision !== "disambiguation-page" && opts.onCollision !== "skip") {
    throw new Error('Short permalink onCollision must be either "disambiguation-page" or "skip"')
  }
  let previouslyRendered = new Map<FullSlug, string>()

  async function* emitPages(ctx: BuildCtx, content: ProcessedContent[], incremental: boolean) {
    const { redirects, occupied } = planShortPermalinks(
      content,
      prefix,
      opts.hashLength,
      opts.onCollision,
    )
    const lang = ctx.cfg.configuration.locale
    const currentlyRendered = new Map(
      redirects.map((redirect) => [
        redirect.slug,
        redirect.pages.length === 1
          ? redirectHtml(lang, redirect.slug, redirect.pages[0])
          : disambiguationHtml(lang, redirect.slug, redirect.pages),
      ]),
    )

    for (const staleSlug of previouslyRendered.keys()) {
      if (!currentlyRendered.has(staleSlug) && !occupied.has(normalizeForComparison(staleSlug))) {
        const stalePath = joinSegments(ctx.argv.output, `${staleSlug}.html`)
        await fs.rm(stalePath, { force: true })
      }
    }

    for (const [slug, html] of currentlyRendered) {
      if (!incremental || previouslyRendered.get(slug) !== html) {
        yield await writePage(ctx, slug, html)
      }
    }

    previouslyRendered = currentlyRendered
  }

  return {
    name: "ShortPermalinks",
    emit(ctx, content) {
      return emitPages(ctx, content, false)
    },
    partialEmit(ctx, content) {
      return emitPages(ctx, content, true)
    },
  }
}
