import { slug } from "github-slugger"
import { trace } from "./trace"

// Quartz Paths
// Things in boxes are not actual types but rather sources which these types can be acquired from
//
//                                                         ┌────────────┐
//                                             ┌───────────┤  Browser   ├────────────┐
//                                             │           └────────────┘            │
//                                             │                                     │
//                                             ▼                                     ▼
//                                        ┌────────┐                          ┌─────────────┐
//                    ┌───────────────────┤ Window │                          │ LinkElement │
//                    │                   └────┬───┘                          └──────┬──────┘
//                    │                        │                                     │
//                    │        getClientSlug() │                               .href │
//                    │                        ▼                                     ▼
//                    │
//                    │                  Client Slug                    ┌───►  Relative URL
// getCanonicalSlug() │     https://test.ca/note/abc#anchor?query=123   │      ../note/def#anchor
//                    │                                                 │
//                    │   canonicalizeClient() │                        │      ▲     ▲
//                    │                        ▼                        │      │     │
//                    │                                  pathToRoot()   │      │     │
//                    └───────────────►  Canonical Slug ────────────────┘      │     │
//                                          note/abc                           │     │
//                                                   ──────────────────────────┘     │
//                                             ▲             resolveRelative()       │
//                        canonicalizeServer() │                                     │
//                                                                                   │
// HTML File                               Server Slug                               │
//  note/abc/index.html  ◄─────────────   note/abc/index                             │
//                                                                                   │
//                                             ▲                            ┌────────┴────────┐
//                           slugifyFilePath() │            transformLink() │                 │
//                                             │                            │                 │
//                                   ┌─────────┴──────────┐           ┌─────┴─────┐  ┌────────┴──────┐
//                                   │     File Path      │           │ Wikilinks │  │ Markdown Link │
//                                   │  note/abc/index.md │           └───────────┘  └───────────────┘
//                                   └────────────────────┘                 ▲                 ▲
//                                             ▲                            │                 │
//                                             │            ┌─────────┐     │                 │
//                                             └────────────┤ MD File ├─────┴─────────────────┘
//                                                          └─────────┘

const STRICT_TYPE_CHECKS = false
const HARD_EXIT_ON_FAIL = false

function conditionCheck<T>(name: string, label: "pre" | "post", s: T, chk: (x: any) => x is T) {
  if (STRICT_TYPE_CHECKS && !chk(s)) {
    trace(`${name} failed ${label}-condition check: ${s} does not pass ${chk.name}`, new Error())
    if (HARD_EXIT_ON_FAIL) {
      process.exit(1)
    }
  }
}

/// Utility type to simulate nominal types in TypeScript
type SlugLike<T> = string & { __brand: T }

/** Client-side slug, usually obtained through `window.location` */
export type ClientSlug = SlugLike<"client">
export function isClientSlug(s: string): s is ClientSlug {
  const res = /^https?:\/\/.+/.test(s)
  return res
}

/** Canonical slug, should be used whenever you need to refer to the location of a file/note.
 * On the client, this is normally stored in `document.body.dataset.slug`
 */
export type CanonicalSlug = SlugLike<"canonical">
export function isCanonicalSlug(s: string): s is CanonicalSlug {
  const validStart = !(s.startsWith(".") || s.startsWith("/"))
  const validEnding = !(s.endsWith("/") || s.endsWith("/index") || s === "index")
  return validStart && !_containsForbiddenCharacters(s) && validEnding && !_hasFileExtension(s)
}

/** A relative link, can be found on `href`s but can also be constructed for
 * client-side navigation (e.g. search and graph)
 */
export type RelativeURL = SlugLike<"relative">
export function isRelativeURL(s: string): s is RelativeURL {
  const validStart = /^\.{1,2}/.test(s)
  const validEnding = !(s.endsWith("/") || s.endsWith("/index") || s === "index")
  return validStart && validEnding && !_hasFileExtension(s)
}

/** A server side slug. This is what Quartz uses to emit files so uses index suffixes */
export type ServerSlug = SlugLike<"server">
export function isServerSlug(s: string): s is ServerSlug {
  const validStart = !(s.startsWith(".") || s.startsWith("/"))
  const validEnding = !s.endsWith("/")
  return validStart && validEnding && !_containsForbiddenCharacters(s) && !_hasFileExtension(s)
}

/** The real file path to a file on disk */
export type FilePath = SlugLike<"filepath">
export function isFilePath(s: string): s is FilePath {
  const validStart = !s.startsWith(".")
  return validStart && _hasFileExtension(s)
}

export function getClientSlug(window: Window): ClientSlug {
  const res = window.location.href as ClientSlug
  conditionCheck(getClientSlug.name, "post", res, isClientSlug)
  return res
}

export function getCanonicalSlug(window: Window): CanonicalSlug {
  const res = window.document.body.dataset.slug! as CanonicalSlug
  conditionCheck(getCanonicalSlug.name, "post", res, isCanonicalSlug)
  return res
}

export function canonicalizeClient(slug: ClientSlug): CanonicalSlug {
  conditionCheck(canonicalizeClient.name, "pre", slug, isClientSlug)
  const { pathname } = new URL(slug)
  let fp = pathname.slice(1)
  fp = fp.replace(new RegExp(_getFileExtension(fp) + "$"), "")
  const res = _canonicalize(fp) as CanonicalSlug
  conditionCheck(canonicalizeClient.name, "post", res, isCanonicalSlug)
  return res
}

export function canonicalizeServer(slug: ServerSlug): CanonicalSlug {
  conditionCheck(canonicalizeServer.name, "pre", slug, isServerSlug)
  let fp = slug as string
  const res = _canonicalize(fp) as CanonicalSlug
  conditionCheck(canonicalizeServer.name, "post", res, isCanonicalSlug)
  return res
}

export function slugifyFilePath(fp: FilePath): ServerSlug {
  conditionCheck(slugifyFilePath.name, "pre", fp, isFilePath)
  fp = _stripSlashes(fp) as FilePath
  const withoutFileExt = fp.replace(new RegExp(_getFileExtension(fp) + "$"), "")
  let slug = withoutFileExt
    .split("/")
    .map((segment) => segment.replace(/\s/g, "-")) // slugify all segments
    .join("/") // always use / as sep
    .replace(/\/$/, "") // remove trailing slash

  // treat _index as index
  if (_endsWith(slug, "_index")) {
    slug = slug.replace(/_index$/, "index")
  }

  conditionCheck(slugifyFilePath.name, "post", slug, isServerSlug)
  return slug as ServerSlug
}

export function transformInternalLink(link: string): RelativeURL {
  let [fplike, anchor] = splitAnchor(decodeURI(link))
  let segments = fplike.split("/").filter((x) => x.length > 0)
  let prefix = segments.filter(_isRelativeSegment).join("/")
  let fp = segments.filter((seg) => !_isRelativeSegment(seg)).join("/")

  // implicit markdown
  if (!_hasFileExtension(fp)) {
    fp += ".md"
  }

  fp = canonicalizeServer(slugifyFilePath(fp as FilePath))
  fp = _trimSuffix(fp, "index")

  let joined = joinSegments(_stripSlashes(prefix), _stripSlashes(fp))
  const res = (_addRelativeToStart(joined) + anchor) as RelativeURL
  conditionCheck(transformInternalLink.name, "post", res, isRelativeURL)
  return res
}

// resolve /a/b/c to ../../
export function pathToRoot(slug: CanonicalSlug): RelativeURL {
  conditionCheck(pathToRoot.name, "pre", slug, isCanonicalSlug)
  let rootPath = slug
    .split("/")
    .filter((x) => x !== "")
    .map((_) => "..")
    .join("/")

  const res = _addRelativeToStart(rootPath) as RelativeURL
  conditionCheck(pathToRoot.name, "post", res, isRelativeURL)
  return res
}

export function resolveRelative(current: CanonicalSlug, target: CanonicalSlug): RelativeURL {
  conditionCheck(resolveRelative.name, "pre", current, isCanonicalSlug)
  conditionCheck(resolveRelative.name, "pre", target, isCanonicalSlug)
  const res = joinSegments(pathToRoot(current), target) as RelativeURL
  conditionCheck(resolveRelative.name, "post", res, isRelativeURL)
  return res
}

export function splitAnchor(link: string): [string, string] {
  let [fp, anchor] = link.split("#", 2)
  anchor = anchor === undefined ? "" : "#" + slugAnchor(anchor)
  return [fp, anchor]
}

export function slugAnchor(anchor: string) {
  return slug(anchor)
}

export function slugTag(tag: string) {
  return tag
    .split("/")
    .map((tagSegment) => slug(tagSegment))
    .join("/")
}

export function joinSegments(...args: string[]): string {
  return args.filter((segment) => segment !== "").join("/")
}

export function getAllSegmentPrefixes(tags: string): string[] {
  const segments = tags.split("/")
  const results: string[] = []
  for (let i = 0; i < segments.length; i++) {
    results.push(segments.slice(0, i + 1).join("/"))
  }
  return results
}

export const QUARTZ = "quartz"

function _canonicalize(fp: string): string {
  fp = _trimSuffix(fp, "index")
  return _stripSlashes(fp)
}

function _endsWith(s: string, suffix: string): boolean {
  return s === suffix || s.endsWith("/" + suffix)
}

function _trimSuffix(s: string, suffix: string): string {
  if (_endsWith(s, suffix)) {
    s = s.slice(0, -suffix.length)
  }
  return s
}

function _containsForbiddenCharacters(s: string): boolean {
  return s.includes(" ") || s.includes("#") || s.includes("?")
}

function _hasFileExtension(s: string): boolean {
  return _getFileExtension(s) !== undefined
}

function _getFileExtension(s: string): string | undefined {
  return s.match(/\.[A-Za-z]+$/)?.[0]
}

function _isRelativeSegment(s: string): boolean {
  return /^\.{0,2}$/.test(s)
}

function _stripSlashes(s: string): string {
  if (s.startsWith("/")) {
    s = s.substring(1)
  }

  if (s.endsWith("/")) {
    s = s.slice(0, -1)
  }

  return s
}

function _addRelativeToStart(s: string): string {
  if (s === "") {
    s = "."
  }

  if (!s.startsWith(".")) {
    s = joinSegments(".", s)
  }

  return s
}
