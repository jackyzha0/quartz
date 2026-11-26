import micromorph from "micromorph"
import { FullSlug, RelativeURL, getFullSlug, normalizeRelativeURLs } from "../../util/path"
import { fetchCanonical } from "./util"

// adapted from `micromorph`
// https://github.com/natemoo-re/micromorph
const NODE_TYPE_ELEMENT = 1
let announcer = document.createElement("route-announcer")
const isElement = (target: EventTarget | null): target is Element =>
  (target as Node)?.nodeType === NODE_TYPE_ELEMENT
const isLocalUrl = (href: string) => {
  try {
    const url = new URL(href)
    if (window.location.origin === url.origin) {
      return true
    }
  } catch (e) {}
  return false
}

const isSamePage = (url: URL): boolean => {
  const sameOrigin = url.origin === window.location.origin
  const samePath = url.pathname === window.location.pathname
  return sameOrigin && samePath
}

const getOpts = ({ target }: Event): { url: URL; scroll?: boolean } | undefined => {
  if (!isElement(target)) return
  if (target.attributes.getNamedItem("target")?.value === "_blank") return
  const a = target.closest("a")
  if (!a) return
  if ("routerIgnore" in a.dataset) return
  const { href } = a
  if (!isLocalUrl(href)) return
  return { url: new URL(href), scroll: "routerNoscroll" in a.dataset ? false : undefined }
}

function notifyNav(url: FullSlug) {
  const event: CustomEventMap["nav"] = new CustomEvent("nav", { detail: { url } })
  document.dispatchEvent(event)
}

const cleanupFns: Set<(...args: any[]) => void> = new Set()
window.addCleanup = (fn) => cleanupFns.add(fn)

function startLoading() {
  document.querySelector(".navigation-progress")?.remove()
  const loadingBar = document.createElement("div")
  loadingBar.className = "navigation-progress"
  loadingBar.style.width = "0"
  document.body.prepend(loadingBar)

  setTimeout(() => {
    loadingBar.style.width = "80%"
  }, 100)
}

function stopLoading() {
  const loadingBar = document.querySelector(".navigation-progress")
  if (loadingBar) {
    loadingBar.remove()
  }
}

// Scroll positions are restored by the router, not the browser (#2674). The browser
// saves an entry's position when `pushState` runs and restores it on Back while the
// *other* page's content is still shown, before the router swaps the page in, so
// positions came out wrong. Each entry keeps its own `scrollY` in `history.state`.
history.scrollRestoration = "manual"
let renderedPath = window.location.pathname
let saveTimer: ReturnType<typeof setTimeout> | undefined

// Each entry the router creates gets a key, so a position that was still waiting to be saved
// when Back or Forward left its entry (history.state is the new entry's by then) is kept here
// and written to the entry when it is shown again.
type EntryState = { key?: string; scrollY?: unknown } | null
const newKey = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
const unsavedScroll = new Map<string, number>()
let shownKey: string | undefined

function entryKey(): string {
  let key = (history.state as EntryState)?.key
  if (typeof key !== "string") {
    key = newKey()
    history.replaceState({ ...(history.state ?? {}), key }, "")
  }
  return key
}

function pushEntry(url: URL) {
  history.pushState({ key: newKey() }, "", url)
  shownKey = entryKey()
}

function saveScroll() {
  clearTimeout(saveTimer)
  saveTimer = undefined
  history.replaceState({ ...(history.state ?? {}), scrollY: window.scrollY }, "")
}

function savedScroll(): number | undefined {
  const key = entryKey()
  const unsaved = unsavedScroll.get(key)
  if (unsaved !== undefined) {
    unsavedScroll.delete(key)
    history.replaceState({ ...(history.state ?? {}), scrollY: unsaved }, "")
    return unsaved
  }
  const y = (history.state as EntryState)?.scrollY
  return typeof y === "number" ? y : undefined
}

/** Scrolls to where the current entry was left, else to its `#heading`, else to the top. */
function restoreScroll() {
  const y = savedScroll()
  if (y !== undefined) {
    window.scrollTo({ top: y, behavior: "instant" })
    return
  }
  const hash = window.location.hash
  const el = hash ? document.getElementById(decodeURIComponent(hash.substring(1))) : null
  if (el) el.scrollIntoView({ behavior: "instant" })
  else window.scrollTo({ top: 0, behavior: "instant" })
}

let isNavigating = false
let p: DOMParser
async function _navigate(url: URL, isBack: boolean = false) {
  isNavigating = true
  startLoading()
  p = p || new DOMParser()
  // Where the page really came from: a redirect (e.g. `folder` → `folder/`, or an alias page's
  // canonical link) changes the base its relative links resolve against, and the address bar
  // should show it too. fetch() drops the #hash, so keep the requested one.
  let finalUrl = url
  // A page fetched ahead (prefetch.inline.ts) is shown at once; one still loading is awaited.
  const prefetched = await window.quartzPrefetch?.load(url)
  if (prefetched && prefetched.text === undefined) {
    // not a page (e.g. a file served without an extension): let the browser open it
    window.location.assign(url)
    return
  }
  if (prefetched) {
    finalUrl = new URL(prefetched.url)
    finalUrl.hash = url.hash
  }
  const contents = prefetched
    ? prefetched.text
    : await fetchCanonical(url)
        .then((res) => {
          if (res.url) {
            finalUrl = new URL(res.url)
            finalUrl.hash = url.hash
          }
          const contentType = res.headers.get("content-type")
          if (contentType?.startsWith("text/html")) {
            return res.text()
          } else {
            window.location.assign(url)
          }
        })
        .catch(() => {
          window.location.assign(url)
        })

  if (!contents) return

  // Keep the position of the page being left, for Back. (On Back, the entry has
  // already changed: what's on screen belongs to another entry.)
  if (!isBack) saveScroll()

  // notify about to nav
  const event: CustomEventMap["prenav"] = new CustomEvent("prenav", { detail: {} })
  document.dispatchEvent(event)

  // cleanup old
  cleanupFns.forEach((fn) => fn())
  cleanupFns.clear()

  const html = p.parseFromString(contents, "text/html")
  normalizeRelativeURLs(html, finalUrl)

  let title = html.querySelector("title")?.textContent
  if (title) {
    document.title = title
  } else {
    const h1 = document.querySelector("h1")
    title = h1?.innerText ?? h1?.textContent ?? url.pathname
  }
  if (announcer.textContent !== title) {
    announcer.textContent = title
  }
  announcer.dataset.persist = ""
  html.body.appendChild(announcer)

  document.querySelector(".navigation-progress")?.remove()
  micromorph(document.body, html.body)

  // scroll into place and add history
  if (isBack) {
    restoreScroll()
  } else if (url.hash) {
    const el = document.getElementById(decodeURIComponent(url.hash.substring(1)))
    el?.scrollIntoView()
  } else {
    window.scrollTo({ top: 0 })
  }

  // now, patch head, re-executing scripts
  const elementsToRemove = document.head.querySelectorAll(":not([data-persist])")
  elementsToRemove.forEach((el) => el.remove())
  const elementsToAdd = html.head.querySelectorAll(":not([data-persist])")
  elementsToAdd.forEach((el) => document.head.appendChild(el))

  // delay setting the url until now
  // at this point everything is loaded so changing the url should resolve to the correct addresses
  if (!isBack) {
    pushEntry(finalUrl)
  }
  renderedPath = window.location.pathname

  notifyNav(getFullSlug(window))
  delete announcer.dataset.persist
}

async function navigate(url: URL, isBack: boolean = false) {
  if (isNavigating) return
  isNavigating = true
  try {
    await _navigate(url, isBack)
  } catch (e) {
    console.error(e)
    window.location.assign(url)
  } finally {
    stopLoading()
    isNavigating = false
  }
}

window.spaNavigate = navigate

function createRouter() {
  if (typeof window !== "undefined") {
    window.addEventListener("click", async (event) => {
      const { url } = getOpts(event) ?? {}
      // dont hijack behaviour, just let browser act normally
      if (!url || event.ctrlKey || event.metaKey) return
      event.preventDefault()

      if (isSamePage(url) && url.hash) {
        // Save where the reader was, then add the entry, then jump: Back returns here.
        saveScroll()
        pushEntry(url)
        const el = document.getElementById(decodeURIComponent(url.hash.substring(1)))
        el?.scrollIntoView()
        return
      }

      navigate(url, false)
    })

    window.addEventListener("popstate", () => {
      // Whatever is pending belongs to the entry just left: keep it for when it's shown again.
      if (saveTimer !== undefined && shownKey !== undefined) {
        unsavedScroll.set(shownKey, window.scrollY)
      }
      clearTimeout(saveTimer)
      saveTimer = undefined
      shownKey = entryKey()
      // Back or Forward between headings of the page on screen: only scroll.
      if (window.location.pathname === renderedPath) {
        restoreScroll()
        return
      }
      navigate(new URL(window.location.toString()), true)
    })

    // Record the position as the reader scrolls, so that Forward (and Back to an
    // entry left without a link) also lands where the reader was.
    window.addEventListener(
      "scroll",
      () => {
        if (isNavigating) return
        clearTimeout(saveTimer)
        saveTimer = setTimeout(() => {
          if (!isNavigating) saveScroll()
        }, 150)
      },
      { passive: true },
    )
    // A reload or a return from another site: the browser no longer restores it.
    window.addEventListener("pagehide", () => {
      if (!isNavigating) saveScroll()
    })
    shownKey = entryKey()
    if (savedScroll() !== undefined) restoreScroll()
  }

  return new (class Router {
    go(pathname: RelativeURL) {
      const url = new URL(pathname, window.location.toString())
      return navigate(url, false)
    }

    back() {
      return window.history.back()
    }

    forward() {
      return window.history.forward()
    }
  })()
}

createRouter()
notifyNav(getFullSlug(window))

if (!customElements.get("route-announcer")) {
  const attrs = {
    "aria-live": "assertive",
    "aria-atomic": "true",
    style:
      "position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px",
  }

  customElements.define(
    "route-announcer",
    class RouteAnnouncer extends HTMLElement {
      constructor() {
        super()
      }
      connectedCallback() {
        for (const [key, value] of Object.entries(attrs)) {
          this.setAttribute(key, value)
        }
      }
    },
  )
}
