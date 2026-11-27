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

// `configuration.slugs` (stripDiacritics) lives in @quartz-community/utils, on a global shared by
// every copy of the package, so core's slugs and plugins' slugs (tag pages, canvas, bases,
// alias-redirects …) agree. The config loader sets it in the main thread and in every worker.
import { getSlugOptions, stripDiacritics } from "@quartz-community/utils"
export {
  getSlugOptions,
  setSlugOptions,
  slugifyFilePath,
  stripDiacritics,
} from "@quartz-community/utils"
export type { SlugOptions } from "@quartz-community/utils"

/** `stripDiacritics` when `configuration.slugs.stripDiacritics` is on, else unchanged. */
export function applySlugOptions(s: string): string {
  return getSlugOptions().stripDiacritics ? stripDiacritics(s) : s
}

export const QUARTZ = "quartz"

// from micromorph/src/utils.ts
// https://github.com/natemoo-re/micromorph/blob/main/src/utils.ts#L5
const _rebaseHtmlElement = (el: Element, attr: string, newBase: string | URL) => {
  const rebased = new URL(el.getAttribute(attr)!, newBase)
  el.setAttribute(attr, rebased.pathname + rebased.search + rebased.hash)
}
export function normalizeRelativeURLs(el: Element | Document, destination: string | URL) {
  el.querySelectorAll('[href=""], [href^="./"], [href^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "href", destination)
  })
  el.querySelectorAll('[src=""], [src^="./"], [src^="../"]').forEach((item) => {
    _rebaseHtmlElement(item, "src", destination)
  })
}
