import { createHash, randomUUID } from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"
import type { ShortPermalinksConfig } from "../../cfg"
import type { BuildCtx } from "../../util/ctx"
import { escapeHTML } from "../../util/escape"
import {
  type FilePath,
  type FullSlug,
  isFullSlug,
  isRelativeURL,
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
  unlisted: boolean
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

function routeKey(slug: string): string {
  const normalized = stripSlashes(path.posix.normalize(slug.replace(/\\/g, "/")))
  if (normalized === "." || normalized === "index") return ""
  return normalized.replace(/\/index$/, "")
}

function outputFile(slug: string): string {
  return path.posix.normalize(stripSlashes(`${slug}.html`))
}

function portableKey(value: string): string {
  return value.normalize("NFC").toLowerCase()
}

async function outputStat(file: string) {
  try {
    return await fs.stat(file)
  } catch (err) {
    const { code } = err as NodeJS.ErrnoException
    if (code !== "ENOENT" && code !== "ENOTDIR") throw err
  }
}

async function isCaseSensitiveOutput(directory: string): Promise<boolean> {
  await fs.mkdir(directory, { recursive: true })
  // Some filesystems support per-directory case sensitivity, so probe beside the redirects.
  const probe = path.join(directory, `.quartz-short-permalinks-${randomUUID()}`)
  const file = await fs.open(`${probe}-a`, "wx")
  try {
    await file.close()
    return !(await outputStat(`${probe}-A`))
  } finally {
    await fs.rm(`${probe}-a`, { force: true })
  }
}

async function existingOutputFiles(
  directory: string,
  caseSensitive: boolean,
): Promise<Set<string>> {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true })
    return new Set(
      entries
        .filter((entry) => entry.isFile() || entry.isSymbolicLink())
        .map(({ name }) => (caseSensitive ? name : portableKey(name))),
    )
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err
    return new Set()
  }
}

function occupiedPaths(
  ctx: BuildCtx,
  content: ProcessedContent[],
  pages: Map<string, ShortPermalinkPage>,
) {
  const contentRoutes = new Set(Array.from(pages.keys(), routeKey))
  const routes = new Set<string>()
  const files = new Map<string, Set<string>>()

  function reserve(slug: string) {
    // Reserve page routes across platforms, including case variants of directory indexes.
    routes.add(routeKey(portableKey(slug)))
    const file = outputFile(slug)
    const key = portableKey(file)
    const owners = files.get(key) ?? new Set<string>()
    owners.add(file)
    files.set(key, owners)
  }

  for (const slug of pages.keys()) reserve(slug)
  if (ctx.cfg.plugins.emitters.some((emitter) => emitter.name === "AliasRedirects")) {
    // Mirror AliasRedirects. Frontmatter also supplies a permalinked page's source slug here.
    for (const [, file] of content) {
      const slug = file.data.slug
      if (!slug) continue
      for (const alias of file.data.aliases ?? []) {
        const target = isRelativeURL(alias)
          ? path.posix.normalize(path.posix.join(simplifySlug(slug), "..", alias))
          : alias
        const normalized = path.posix.normalize(stripSlashes(target.replace(/\\/g, "/")))
        if (normalized === ".." || normalized.startsWith("../")) continue
        if (!contentRoutes.has(routeKey(target))) reserve(target)
      }
    }
  }
  return { routes, files }
}

async function isOwnedOutput(ctx: BuildCtx, staleSlug: FullSlug, files: Map<string, Set<string>>) {
  const stale = outputFile(staleSlug)
  const owners = files.get(portableKey(stale))
  if (!owners || owners.size === 0) return false
  if (owners.has(stale)) return true

  // A differently cased path can refer to the same file on a case-insensitive filesystem.
  const stat = (file: string) => outputStat(joinSegments(ctx.argv.output, file))
  const existing = await stat(stale)
  if (!existing) return false
  for (const owner of owners) {
    const candidate = await stat(owner)
    if (candidate && candidate.dev === existing.dev && candidate.ino === existing.ino) return true
  }
  return false
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
  return { slug, sourcePath, title, unlisted: data.unlisted === true }
}

function planShortPermalinks(
  ctx: BuildCtx,
  content: ProcessedContent[],
  prefix: string,
  hashLength: number,
  onCollision: NonNullable<ShortPermalinksConfig["onCollision"]>,
  caseSensitive: boolean,
) {
  const pages = new Map<string, ShortPermalinkPage>()
  for (const item of content) {
    const page = pageFromContent(item)
    if (page) pages.set(page.slug, page)
  }

  const occupied = occupiedPaths(ctx, content, pages)
  const groups = new Map<string, PlannedShortPermalink>()
  for (const page of pages.values()) {
    const hash = shortPermalinkHash(page.sourcePath, hashLength)
    const slug = joinSegments(prefix, hash) as FullSlug
    const key = caseSensitive ? slug : portableKey(outputFile(slug))
    const group = groups.get(key) ?? { slug, pages: [] }
    // Choose one spelling deterministically when different hashes differ only in case.
    if (slug < group.slug) group.slug = slug
    group.pages.push(page)
    groups.set(key, group)
  }

  const redirects: PlannedShortPermalink[] = []
  for (const { slug: shortSlug, pages: group } of groups.values()) {
    group.sort((a, b) => a.slug.localeCompare(b.slug))
    if (
      occupied.routes.has(routeKey(portableKey(shortSlug))) ||
      occupied.files.has(portableKey(outputFile(shortSlug)))
    ) {
      console.warn(
        `[ShortPermalinks] ${shortSlug} collides with an existing page or alias; skipping the short permalink.`,
      )
      continue
    }
    // A collision page would list otherwise unlisted destinations at a publicly shared URL.
    if (group.length > 1 && (onCollision === "skip" || group.some((page) => page.unlisted))) {
      console.warn(
        `[ShortPermalinks] ${shortSlug} maps to ${group.length} pages; skipping the colliding short permalink.`,
      )
      continue
    }
    redirects.push({ slug: shortSlug, pages: group })
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

async function writePage(outputPath: FilePath, html: string): Promise<FilePath> {
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
  let output: { directory: string; caseSensitive: boolean } | undefined

  async function* emitPages(ctx: BuildCtx, content: ProcessedContent[], incremental: boolean) {
    const directory = joinSegments(ctx.argv.output, prefix)
    if (!incremental || output?.directory !== directory) {
      if (output?.directory !== directory) previouslyRendered.clear()
      output = { directory, caseSensitive: await isCaseSensitiveOutput(directory) }
    }
    const { redirects, occupied } = planShortPermalinks(
      ctx,
      content,
      prefix,
      opts.hashLength,
      opts.onCollision,
      output.caseSensitive,
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

    for (const [staleSlug, previousHtml] of previouslyRendered) {
      if (
        !currentlyRendered.has(staleSlug) &&
        !(await isOwnedOutput(ctx, staleSlug, occupied.files))
      ) {
        const stalePath = joinSegments(ctx.argv.output, `${staleSlug}.html`)
        // Other emitters can take over files on a rebuild. Never remove a file they already wrote.
        const html = await fs.readFile(stalePath, "utf8").catch((err: NodeJS.ErrnoException) => {
          if (err.code !== "ENOENT" && err.code !== "ENOTDIR") throw err
        })
        if (html === previousHtml) await fs.rm(stalePath, { force: true })
      }
    }

    let existingFiles: Set<string> | undefined
    for (const [slug, html] of currentlyRendered) {
      const outputPath = joinSegments(ctx.argv.output, `${slug}.html`) as FilePath
      // An earlier emitter can remove a short link while cleaning up unpublished pages.
      if (incremental && previouslyRendered.get(slug) === html) {
        existingFiles ??= await existingOutputFiles(directory, output.caseSensitive)
        const name = path.basename(outputPath)
        if (existingFiles.has(output.caseSensitive ? name : portableKey(name))) continue
      }
      yield await writePage(outputPath, html)
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
