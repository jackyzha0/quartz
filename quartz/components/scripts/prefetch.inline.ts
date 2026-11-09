import { fetchCanonical } from "./util"

/**
 * Prefetching: fetch the pages a reader is likely to open next, so following a link shows the
 * page at once instead of waiting for the network.
 *
 * - `viewport` (default): links on screen are fetched while the browser is idle, a few at a
 *   time; pointing at or focusing a link fetches it first.
 * - `hover`: only links pointed at (after a short pause), focused, or touched.
 *
 * With SPA routing the pages are kept here, and the router (spa.inline.ts) and popovers
 * (popover.inline.ts) take them through `window.quartzPrefetch`. Without it, every link is a full
 * page load, so the browser prefetches instead: Speculation Rules where supported, otherwise
 * `<link rel="prefetch">`. Nothing is prefetched with Data Saver on or on a 2G connection,
 * except links pointed at.
 *
 * The mode is set by componentResources.ts, which prepends `window.__quartzPrefetchMode = …`.
 */

type Mode = "viewport" | "hover"

/** How long a fetched page is used before it is fetched again. */
const MAX_AGE_MS = 5 * 60 * 1000
/** Pages kept in memory (the oldest go first). */
const MAX_PAGES = 40
/** Pages fetched at once from the viewport. */
const CONCURRENCY = 2
/** Pages fetched from the viewport per page view. */
const VIEWPORT_BUDGET = 30
/** Pointing at a link this long counts as intent (instant.page's figure). */
const HOVER_DELAY_MS = 65

const mode: Mode = window.__quartzPrefetchMode === "hover" ? "hover" : "viewport"
const spa = window.__quartzSpa === true

type Cached = { time: number; page: Promise<PrefetchedPage | undefined> }
const cache = new Map<string, Cached>()
const requested = new Set<string>()

function keyOf(url: URL): string {
  const u = new URL(url)
  u.hash = ""
  return u.toString()
}

function constrained(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection
  return !!connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? "")
}

/** A same-site page link worth fetching ahead, or undefined. */
function targetOf(a: HTMLAnchorElement): URL | undefined {
  if (!a.href || a.target === "_blank" || a.hasAttribute("download")) return
  if ("routerIgnore" in a.dataset || "noPrefetch" in a.dataset) return
  let url: URL
  try {
    url = new URL(a.href)
  } catch {
    return
  }
  if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol)) return
  if (url.pathname === window.location.pathname && url.search === window.location.search) return
  // pages have no extension (or .html); a link to an image, PDF or file is not worth the bytes
  const last = url.pathname.split("/").pop() ?? ""
  if (/\.[A-Za-z0-9]+$/.test(last) && !/\.html?$/i.test(last)) return
  return url
}

async function load(url: URL, priority: "low" | "high"): Promise<PrefetchedPage | undefined> {
  try {
    const res = await fetchCanonical(url, { priority } as RequestInit)
    if (!res.ok) return undefined
    const contentType = res.headers.get("content-type") ?? ""
    if (!contentType.startsWith("text/html")) {
      await res.body?.cancel()
      return { url: res.url || url.toString(), contentType }
    }
    return { url: res.url || url.toString(), contentType, text: await res.text() }
  } catch {
    return undefined
  }
}

function remember(url: URL, priority: "low" | "high" = "low"): Promise<PrefetchedPage | undefined> {
  const key = keyOf(url)
  const hit = cache.get(key)
  if (hit && Date.now() - hit.time < MAX_AGE_MS) return hit.page
  const page = load(url, priority)
  cache.set(key, { time: Date.now(), page })
  // a failed fetch is not kept, so following the link fetches it normally
  page.then((p) => p === undefined && cache.get(key)?.page === page && cache.delete(key))
  while (cache.size > MAX_PAGES) cache.delete(cache.keys().next().value!)
  return page
}

const supportsSpeculationRules =
  typeof HTMLScriptElement !== "undefined" &&
  typeof HTMLScriptElement.supports === "function" &&
  HTMLScriptElement.supports("speculationrules")

/** Without SPA routing: ask the browser to prefetch the page for the navigation. */
function hintBrowser(url: URL) {
  const key = keyOf(url)
  if (requested.has(key)) return
  requested.add(key)
  if (supportsSpeculationRules) {
    const script = document.createElement("script")
    script.type = "speculationrules"
    script.textContent = JSON.stringify({ prefetch: [{ source: "list", urls: [key] }] })
    document.head.appendChild(script)
  } else {
    const link = document.createElement("link")
    link.rel = "prefetch"
    link.href = key
    link.setAttribute("as", "document")
    document.head.appendChild(link)
  }
}

function prefetch(url: URL) {
  if (spa) void remember(url)
  else hintBrowser(url)
}

window.quartzPrefetch = {
  // The page from the cache, or fetched now and kept: whoever asks first (a popover on
  // mouseenter, the prefetcher after its hover delay, the router on click) fetches it once.
  load: (url: URL) => remember(url, "high"),
}

// --- intent: pointing at, focusing or touching a link -------------------------------------

let hoverTimer: ReturnType<typeof setTimeout> | undefined
const anchorOf = (target: EventTarget | null) =>
  target instanceof Element ? target.closest("a") : null

document.addEventListener(
  "pointerover",
  (event) => {
    const a = anchorOf(event.target)
    const url = a && targetOf(a)
    if (!url) return
    clearTimeout(hoverTimer)
    hoverTimer = setTimeout(() => prefetch(url), HOVER_DELAY_MS)
  },
  { passive: true },
)
document.addEventListener(
  "pointerout",
  (event) => {
    if (anchorOf(event.target)) clearTimeout(hoverTimer)
  },
  { passive: true },
)
for (const type of ["pointerdown", "focusin"] as const) {
  document.addEventListener(
    type,
    (event) => {
      const a = anchorOf(event.target)
      const url = a && targetOf(a)
      if (url) prefetch(url)
    },
    { passive: true },
  )
}

// --- viewport: links on screen, while the browser is idle --------------------------------

const idle = (fn: () => void) =>
  "requestIdleCallback" in window
    ? window.requestIdleCallback(fn, { timeout: 2000 })
    : setTimeout(fn, 200)

let observer: IntersectionObserver | undefined
let queue: URL[] = []
let active = 0
let budget = VIEWPORT_BUDGET

function pump() {
  while (active < CONCURRENCY && queue.length > 0 && budget > 0) {
    const url = queue.shift()!
    if (cache.has(keyOf(url)) || requested.has(keyOf(url))) continue
    budget--
    active++
    idle(() => {
      if (spa) {
        remember(url).finally(() => {
          active--
          pump()
        })
      } else {
        hintBrowser(url)
        active--
        pump()
      }
    })
  }
}

// Links on screen are fetched only when they name a page the site has (the content index, plus
// the folder and tag pages it doesn't list): a link in a layout to a page that doesn't exist
// would otherwise log a 404 on every page view. Without a content index, any link counts.
let known: Set<string> | undefined
const knownReady: Promise<void> = (
  typeof fetchData === "undefined" ? Promise.resolve({}) : fetchData
).then((index) => {
  const slugs = Object.keys(index ?? {})
  if (slugs.length > 0) known = new Set(slugs)
})

function isKnownPage(url: URL): boolean {
  if (!known) return true
  const root = window.quartzStaticUrl ? new URL("..", window.quartzStaticUrl).pathname : "/"
  if (!url.pathname.startsWith(root)) return false
  let slug: string
  try {
    slug = decodeURI(url.pathname.slice(root.length)).replace(/\.html?$/i, "")
  } catch {
    return false
  }
  if (slug === "" || slug.endsWith("/")) slug += "index"
  return known.has(slug) || slug.endsWith("index") || slug.startsWith("tags/")
}

let observed = new WeakSet<Element>()
let queued = new Set<string>()

/** Watch the links on the page not watched yet (components may add theirs after `nav`). */
function scan() {
  if (!observer) return
  for (const a of document.querySelectorAll<HTMLAnchorElement>("a[href]")) {
    if (observed.has(a)) continue
    observed.add(a)
    if (targetOf(a)) observer.observe(a)
  }
}

function watchViewport() {
  observer?.disconnect()
  observer = undefined
  queue = []
  queued = new Set()
  observed = new WeakSet()
  budget = VIEWPORT_BUDGET
  if (mode !== "viewport" || constrained() || !("IntersectionObserver" in window)) return
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      observer?.unobserve(entry.target)
      const url = targetOf(entry.target as HTMLAnchorElement)
      if (!url || !isKnownPage(url) || queued.has(keyOf(url))) continue
      queued.add(keyOf(url))
      queue.push(url)
    }
    pump()
  })
  // after the other `nav` handlers have rendered their links (explorer, backlinks, …)
  idle(() => knownReady.then(scan))
}

// every page view (SPA navigations included) brings new links
document.addEventListener("nav", watchViewport)
document.addEventListener("render", () => idle(() => knownReady.then(scan)))
