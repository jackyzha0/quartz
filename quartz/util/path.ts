// Re-export shared path utilities from @quartz-community/utils
export {
  isFilePath,
  isFullSlug,
  isSimpleSlug,
  isRelativeURL,
  isAbsoluteURL,
  getFullSlug,
  simplifySlug,
  joinSegments,
  endsWith,
  trimSuffix,
  stripSlashes,
  getFileExtension,
  isFolderPath,
  getAllSegmentPrefixes,
  pathToRoot,
  resolveRelative,
  splitAnchor,
  slugTag,
  transformInternalLink,
  linkPathDecodes,
  transformLink,
  normalizeHastElement,
} from "@quartz-community/utils"

export type {
  FilePath,
  FullSlug,
  SimpleSlug,
  RelativeURL,
  TransformOptions,
} from "@quartz-community/utils"

// --- v5-specific exports below ---

import { slugifyFilePath as slugifyFilePathBase } from "@quartz-community/utils"
import * as quartzUtils from "@quartz-community/utils"
import type { FilePath as _FilePath, FullSlug as _FullSlug } from "@quartz-community/utils"

export interface SlugOptions {
  /** Strip accents and other diacritics (`č` → `c`, `é` → `e`) from generated slugs. */
  stripDiacritics?: boolean
}

let slugOptions: SlugOptions = {}

/**
 * Set how core turns file paths into slugs (`configuration.slugs`). Called when the config is
 * loaded, in the main thread and in every worker, so all slugs of a build agree.
 */
export function setSlugOptions(options: SlugOptions | undefined): void {
  slugOptions = { ...(options ?? {}) }
  // @quartz-community/utils 1.3+ applies the same options to every slug it computes, for core
  // and for plugins (tag pages, canvas, bases, alias-redirects …). Older utils lack it; core's
  // own wrapper below and the links/dispatcher handling then cover core's slugs. Stripping is
  // idempotent, so both applying is harmless. (Drop the wrapper once core requires utils 1.3.)
  const utilsSetter = (quartzUtils as { setSlugOptions?: (o: SlugOptions | undefined) => void })
    .setSlugOptions
  utilsSetter?.(slugOptions)
}

export function getSlugOptions(): Readonly<SlugOptions> {
  return slugOptions
}

/**
 * Remove combining diacritical marks (U+0300–U+036F) after canonical decomposition:
 * `Čeština` → `Cestina`, `Ελληνικά` → `Ελληνικα`. The string is recomposed afterwards, so
 * scripts whose marks are outside that block (Hangul, kana with dakuten, Devanagari, Arabic)
 * keep their usual form. Letters without a decomposition (`ø`, `ł`, `ß`, `æ`) are kept.
 */
export function stripDiacritics(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .normalize("NFC")
}

/** `stripDiacritics` when `configuration.slugs.stripDiacritics` is on, else unchanged. */
export function applySlugOptions(s: string): string {
  return slugOptions.stripDiacritics ? stripDiacritics(s) : s
}

/**
 * Slug of a content file path (see `@quartz-community/utils`), honouring
 * `configuration.slugs` (see setSlugOptions).
 */
export function slugifyFilePath(fp: _FilePath, excludeExt?: boolean): _FullSlug {
  return slugifyFilePathBase(applySlugOptions(fp) as _FilePath, excludeExt)
}

export const QUARTZ = "quartz"

// from micromorph/src/utils.ts
// https://github.com/natemoo-re/micromorph/blob/main/src/utils.ts#L5
const _rebaseHtmlElement = (el: Element, attr: string, newBase: string | URL) => {
  const rebased = new URL(el.getAttribute(attr)!, newBase)
  el.setAttribute(attr, rebased.pathname + rebased.hash)
}
export function normalizeRelativeURLs(el: Element | Document, destination: string | URL) {
  el.querySelectorAll('[href=""], [href^="./"], [href^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "href", destination)
  })
  el.querySelectorAll('[src=""], [src^="./"], [src^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "src", destination)
  })
}
