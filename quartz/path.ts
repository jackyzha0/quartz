import path from 'path'
import { slug as slugAnchor } from 'github-slugger'

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
//                    │                  Client Slug                           Relative URL
// getCanonicalSlug() │     https://test.ca/note/abc#anchor?query=123          ../note/def#anchor
//                    │
//                    │   canonicalizeClient() │                                     ▲
//                    │                        ▼                                     │
//                    │                                                              │
//                    └───────────────►  Canonical Slug                              │
//                                         /note/abc                                 │
//                                                                                   │
//                                             ▲                                     │
//                        canonicalizeServer() │                                     │
//                                                                                   │
// HTML File                               Server Slug                               │
// /note/abc/index.html  ◄─────────────  /note/abc/index                             │
//                                                                                   │
//                                             ▲                            ┌────────┴────────┐
//                           slugifyFilePath() │    transformInternalLink() │                 │
//                                             │                            │                 │
//                                   ┌─────────┴──────────┐           ┌─────┴─────┐  ┌────────┴──────┐
//                                   │     File Path      │           │ Wikilinks │  │ Markdown Link │
//                                   │ /note/abc/index.md │           └───────────┘  └───────────────┘
//                                   └────────────────────┘                 ▲                 ▲
//                                             ▲                            │                 │
//                                             │            ┌─────────┐     │                 │
//                                             └────────────┤ MD File ├─────┴─────────────────┘
//                                                          └─────────┘

/// Utility type to simulate nominal types in TypeScript
type SlugLike<T> = string & { __brand: T }

/** Client-side slug, usually obtained through `window.location` */
export type ClientSlug = SlugLike<"client">
export function isClientSlug(s: string): s is ClientSlug {
  return /^https?:\/\/.+/.test(s)
}

/** Canonical slug, should be used whenever you need to refer to the location of a file/note.
  * On the client, this is normally stored in `document.body.dataset.slug`
  */
export type CanonicalSlug = SlugLike<"canonical">
export function isCanonicalSlug(s: string): s is CanonicalSlug {
  const validStart = s.startsWith("/")
  const validEnding = s.length === 1 || (!s.endsWith("/") && !s.endsWith("/index"))
  return !_containsForbiddenCharacters(s) && validStart && validEnding && !_hasFileExtension(s)
}

/** A relative link, can be found on `href`s but can also be constructed for
  * client-side navigation (e.g. search and graph)
  */
export type RelativeURL = SlugLike<"relative">
export function isRelativeURL(s: string): s is RelativeURL {
  const validStart = /^\.{1,2}/.test(s)
  const validEnding = !s.endsWith("/") && !s.endsWith("/index")
  return validStart && validEnding && !_hasFileExtension(s)
}

/** A server side slug. This is what Quartz uses to emit files so uses index suffixes */
export type ServerSlug = SlugLike<"server">
export function isServerSlug(s: string): s is ServerSlug {
  // must start with forward slash
  const validStart = s.startsWith("/")
  const validEnding = !s.endsWith("/")
  return validStart && validEnding && !_containsForbiddenCharacters(s) && !_hasFileExtension(s)
}

/** The real file path to a file on disk */
export type FilePath = SlugLike<"filepath">
export function isFilePath(s: string): s is FilePath {
  return s.startsWith("/") && _hasFileExtension(s)
}

export function getClientSlug(window: Window): ClientSlug {
  return window.location.href as ClientSlug
}

export function getCanonicalSlug(window: Window): CanonicalSlug {
  return window.document.body.dataset.slug! as CanonicalSlug
}

export function canonicalizeClient(slug: ClientSlug): CanonicalSlug {
  const { pathname } = new URL(slug)
  let fp = pathname
  fp = fp.replace(new RegExp(path.extname(fp) + '$'), '')
  return _canonicalize(fp) as CanonicalSlug
}

export function canonicalizeServer(slug: ServerSlug): CanonicalSlug {
  let fp = slug as string
  return _canonicalize(fp) as CanonicalSlug
}

export function slugifyFilePath(fp: FilePath): ServerSlug {
  // strip file extension
  const withoutFileExt = fp.replace(new RegExp(path.extname(fp) + '$'), '')
  const slug = withoutFileExt
    .split(path.sep) // fs can have diff interpretations of /
    .map((segment) => segment.replace(/\s/g, '-')) // slugify all segments
    .join('/') // always use / as sep
    .replace(/\/$/, '') // remove trailing slash

  return slug as ServerSlug
}

export function transformInternalLink(link: string): RelativeURL {
  let [fplike, anchor] = link.split("#", 2)
  let segments = fplike.split("/").filter(x => x.length > 0)
  let prefix = segments.filter(_isRelativeSegment).join("/")
  let fp = "/" + segments.filter(seg => !_isRelativeSegment(seg)).join("/")
  fp = canonicalizeServer(slugifyFilePath(fp as FilePath))

  if (fp.endsWith("index")) {
    fp = fp.slice(0, -"index".length)
  }

  let joined = [_stripSlashes(prefix), _stripSlashes(fp)].filter(x => x !== "").join("/")
  anchor = anchor === undefined ? "" : '#' + slugAnchor(anchor)
  return _addRelativeToStart(joined) + anchor as RelativeURL
}

// resolve /a/b/c to ../../
export function pathToRoot(slug: CanonicalSlug): RelativeURL {
  let rootPath = slug
    .split('/')
    .filter(x => x !== '')
    .map(_ => '..')
    .join('/')

  return _addRelativeToStart(rootPath) as RelativeURL
}

export const QUARTZ = "quartz"

function _canonicalize(fp: string): string {
  if (fp.endsWith("index")) {
    fp = fp.slice(0, -"index".length)
  }

  // remove trailing slash
  if (fp.endsWith("/")) {
    fp = fp.slice(0, -1)
  }

  if (fp.length === 0) {
    return "/" as CanonicalSlug
  }

  return fp
}

function _containsForbiddenCharacters(s: string): boolean {
  return s.includes(" ") || s.includes("#") || s.includes("?")
}

function _hasFileExtension(s: string): boolean {
  return /\.[A-Za-z]+$/.test(s)
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
    s = "./" + s
  }

  return s
}
