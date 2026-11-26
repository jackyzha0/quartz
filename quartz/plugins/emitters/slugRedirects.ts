import { QuartzEmitterPlugin } from "../types"
import { ProcessedContent } from "../vfile"
import {
  FilePath,
  FullSlug,
  getSlugOptions,
  resolveRelative,
  setSlugOptions,
  simplifySlug,
  slugifyFilePath,
} from "../../util/path"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"

/** The slug `fp` had without `slugs.stripDiacritics` (lowercased, diacritics kept). */
function unstrippedSlug(fp: string): FullSlug {
  const options = getSlugOptions()
  setSlugOptions({ ...options, stripDiacritics: false })
  try {
    return slugifyFilePath(fp as FilePath)
  } finally {
    setSlugOptions(options)
  }
}

/**
 * The addresses `slugs.stripDiacritics` changed → where they moved: every published page's
 * address as it was without the option (`české/žluťoučký-kůň/poznámka` →
 * `ceske/zlutoucky-kun/poznamka`), its folders' (`české/` → `ceske/`) and its aliases'. An old
 * address that is a page of the site, or another old address's, is left alone.
 */
export function strippedAddressMoves(
  content: ProcessedContent[],
  live: ReadonlySet<string>,
): Map<FullSlug, FullSlug> {
  const moves = new Map<FullSlug, FullSlug>()
  const add = (from: FullSlug, to: FullSlug) => {
    if (from === to || live.has(from) || moves.has(from)) return
    moves.set(from, to)
  }
  for (const [, file] of content) {
    const { slug, relativePath } = file.data
    if (!slug || !relativePath) continue
    const old = unstrippedSlug(relativePath)
    const now = slugifyFilePath(relativePath as FilePath)
    // a page at its file path (not a permalink) moved with it
    if (now === slug) add(old, slug)
    // its folders: `české/žluťoučký-kůň/x` → `české/index`, `české/žluťoučký-kůň/index`
    const oldParts = old.split("/")
    const nowParts = now.split("/")
    if (oldParts.length === nowParts.length) {
      for (let i = 1; i < oldParts.length; i++) {
        add(
          [...oldParts.slice(0, i), "index"].join("/") as FullSlug,
          [...nowParts.slice(0, i), "index"].join("/") as FullSlug,
        )
      }
    }
    for (const alias of (file.data.frontmatter?.aliases as unknown[] | undefined) ?? []) {
      if (typeof alias !== "string") continue
      const fp = alias.endsWith(".md") ? alias : `${alias}.md`
      add(unstrippedSlug(fp), slug)
    }
  }
  return moves
}

function redirectHtml(to: string, url: string): string {
  return `<!DOCTYPE html>
<html lang="en-us">
<head>
<title>${to}</title>
<link rel="canonical" href="${url}">
<meta name="robots" content="noindex">
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=${url}">
</head>
</html>
`
}

async function* emitMoves(ctx: BuildCtx, content: ProcessedContent[]) {
  if (!getSlugOptions().stripDiacritics) return
  const live = new Set<string>()
  for (const [, file] of content) {
    if (file.data.slug) live.add(file.data.slug)
    for (const alias of file.data.aliases ?? []) live.add(alias)
  }
  for (const [from, to] of strippedAddressMoves(content, live)) {
    const url = resolveRelative(from, simplifySlug(to) as unknown as FullSlug)
    yield write({ ctx, slug: from, ext: ".html", content: redirectHtml(simplifySlug(to), url) })
  }
}

/**
 * With `configuration.slugs.stripDiacritics`, pages, folders and aliases whose names have
 * diacritics get new addresses. This writes a redirect at each old address (as Quartz 5 slugged
 * it: lowercased, diacritics kept) to the new one, so links and bookmarks to the old site keep
 * working. alias-redirects' case redirects only cover the address as spelled in the vault.
 */
export const SlugRedirects: QuartzEmitterPlugin = () => ({
  name: "SlugRedirects",
  emit: (ctx, content) => emitMoves(ctx, content),
  partialEmit: (ctx, content) => emitMoves(ctx, content),
})
