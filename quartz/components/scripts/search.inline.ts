import FlexSearch from "flexsearch"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, normalizeRelativeURLs, resolveRelative } from "../../util/path"

interface Item {
  id: number
  slug: FullSlug
  title: string
  content: string
  tags: string[]
}

let index: FlexSearch.Document<Item> | undefined = undefined

// Can be expanded with things like "term" in the future
type SearchType = "basic" | "tags"

// Current searchType
let searchType: SearchType = "basic"

const contextWindowWords = 30
const numSearchResults = 8
const numTagResults = 5
function highlight(searchTerm: string, text: string, trim?: boolean) {
  // try to highlight longest tokens first
  const tokenizedTerms = searchTerm
    .split(/\s+/)
    .filter((t) => t !== "")
    .sort((a, b) => b.length - a.length)
  let tokenizedText = text.split(/\s+/).filter((t) => t !== "")

  let startIndex = 0
  let endIndex = tokenizedText.length - 1
  if (trim) {
    const includesCheck = (tok: string) =>
      tokenizedTerms.some((term) => tok.toLowerCase().startsWith(term.toLowerCase()))
    const occurrencesIndices = tokenizedText.map(includesCheck)

    let bestSum = 0
    let bestIndex = 0
    for (let i = 0; i < Math.max(tokenizedText.length - contextWindowWords, 0); i++) {
      const window = occurrencesIndices.slice(i, i + contextWindowWords)
      const windowSum = window.reduce((total, cur) => total + (cur ? 1 : 0), 0)
      if (windowSum >= bestSum) {
        bestSum = windowSum
        bestIndex = i
      }
    }

    startIndex = Math.max(bestIndex - contextWindowWords, 0)
    endIndex = Math.min(startIndex + 2 * contextWindowWords, tokenizedText.length - 1)
    tokenizedText = tokenizedText.slice(startIndex, endIndex)
  }

  const slice = tokenizedText
    .map((tok) => {
      // see if this tok is prefixed by any search terms
      for (const searchTok of tokenizedTerms) {
        if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
          const regex = new RegExp(searchTok.toLowerCase(), "gi")
          return tok.replace(regex, `<span class="highlight">$&</span>`)
        }
      }
      return tok
    })
    .join(" ")

  return `${startIndex === 0 ? "" : "..."}${slice}${
    endIndex === tokenizedText.length - 1 ? "" : "..."
  }`
}

const p = new DOMParser()
const encoder = (str: string) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)
let prevShortcutHandler: ((e: HTMLElementEventMap["keydown"]) => void) | undefined = undefined

const fetchContentCache: Map<FullSlug, Element[]> = new Map()

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const currentSlug = e.detail.url

  const data = await fetchData
  const container = document.getElementById("search-container")
  const sidebar = container?.closest(".sidebar") as HTMLElement
  const searchIcon = document.getElementById("search-icon")
  const searchBar = document.getElementById("search-bar") as HTMLInputElement | null
  const searchLayout = document.getElementById("search-layout")
  const idDataMap = Object.keys(data) as FullSlug[]

  const appendLayout = (el: HTMLElement) => {
    if (searchLayout?.querySelector(`#${el.id}`) === null) {
      searchLayout?.appendChild(el)
    }
  }

  const enablePreview = searchLayout?.dataset?.preview === "true"
  let preview: HTMLDivElement | undefined = undefined
  const results = document.createElement("div")
  results.id = "results-container"
  results.style.flexBasis = enablePreview ? "30%" : "100%"
  appendLayout(results)

  if (enablePreview) {
    preview = document.createElement("div")
    preview.id = "preview-container"
    preview.style.flexBasis = "70%"
    appendLayout(preview)
  }

  function hideSearch() {
    container?.classList.remove("active")
    if (searchBar) {
      searchBar.value = "" // clear the input when we dismiss the search
    }
    if (sidebar) {
      sidebar.style.zIndex = "unset"
    }
    if (results) {
      removeAllChildren(results)
    }
    if (preview) {
      removeAllChildren(preview)
    }

    searchType = "basic" // reset search type after closing
  }

  function showSearch(searchTypeNew: SearchType) {
    searchType = searchTypeNew
    if (sidebar) {
      sidebar.style.zIndex = "1"
    }
    container?.classList.add("active")
    searchBar?.focus()
  }

  async function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (e.key === "k" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault()
      const searchBarOpen = container?.classList.contains("active")
      searchBarOpen ? hideSearch() : showSearch("basic")
    } else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      // Hotkey to open tag search
      e.preventDefault()
      const searchBarOpen = container?.classList.contains("active")
      searchBarOpen ? hideSearch() : showSearch("tags")

      // add "#" prefix for tag search
      if (searchBar) searchBar.value = "#"
    }

    const resultCards = document.getElementsByClassName("result-card")

    // If search is active, then we will render the first result and display accordingly
    if (!container?.classList.contains("active")) return
    else if (results?.contains(document.activeElement)) {
      const active = document.activeElement as HTMLInputElement
      await displayPreview(active)
      if (e.key === "Enter") {
        active.click()
      }
    } else {
      const anchor = resultCards[0] as HTMLInputElement | null
      await displayPreview(anchor)
      if (e.key === "Enter") {
        anchor?.click()
      }
    }

    if (e.key === "ArrowUp" || (e.shiftKey && e.key === "Tab")) {
      e.preventDefault()
      if (results?.contains(document.activeElement)) {
        // If an element in results-container already has focus, focus previous one
        const currentResult = document.activeElement as HTMLInputElement | null
        const prevResult = currentResult?.previousElementSibling as HTMLInputElement | null
        currentResult?.classList.remove("focus")
        await displayPreview(prevResult)
        prevResult?.focus()
      }
    } else if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault()
      // The results should already been focused, so we need to find the next one.
      // The activeElement is the search bar, so we need to find the first result and focus it.
      if (!results?.contains(document.activeElement)) {
        const firstResult = resultCards[0] as HTMLInputElement | null
        const secondResult = firstResult?.nextElementSibling as HTMLInputElement | null
        firstResult?.classList.remove("focus")
        await displayPreview(secondResult)
        secondResult?.focus()
      } else {
        // If an element in results-container already has focus, focus next one
        const active = document.activeElement as HTMLInputElement | null
        active?.classList.remove("focus")
        const nextResult = active?.nextElementSibling as HTMLInputElement | null
        await displayPreview(nextResult)
        nextResult?.focus()
      }
    }
  }

  function trimContent(content: string) {
    // works without escaping html like in `description.ts`
    const sentences = content.replace(/\s+/g, " ").split(".")
    let finalDesc = ""
    let sentenceIdx = 0

    // Roughly estimate characters by (words * 5). Matches description length in `description.ts`.
    const len = contextWindowWords * 5
    while (finalDesc.length < len) {
      const sentence = sentences[sentenceIdx]
      if (!sentence) break
      finalDesc += sentence + "."
      sentenceIdx++
    }

    // If more content would be available, indicate it by finishing with "..."
    if (finalDesc.length < content.length) {
      finalDesc += ".."
    }

    return finalDesc
  }

  const formatForDisplay = (term: string, id: number) => {
    const slug = idDataMap[id]
    return {
      id,
      slug,
      title: searchType === "tags" ? data[slug].title : highlight(term, data[slug].title ?? ""),
      // if searchType is tag, display context from start of file and trim, otherwise use regular highlight
      content:
        searchType === "tags"
          ? trimContent(data[slug].content)
          : highlight(term, data[slug].content ?? "", true),
      tags: highlightTags(term, data[slug].tags),
    }
  }

  function highlightTags(term: string, tags: string[]) {
    if (tags && searchType === "tags") {
      // Find matching tags
      const termLower = term.toLowerCase()
      let matching = tags.filter((str) => str.includes(termLower))

      // Subtract matching from original tags, then push difference
      if (matching.length > 0) {
        let difference = tags.filter((x) => !matching.includes(x))

        // Convert to html (cant be done later as matches/term dont get passed to `resultToHTML`)
        matching = matching.map((tag) => `<li><p class="match-tag">#${tag}</p></li>`)
        difference = difference.map((tag) => `<li><p>#${tag}</p></li>`)
        matching.push(...difference)
      }

      // Only allow max of `numTagResults` in preview
      if (tags.length > numTagResults) {
        matching.splice(numTagResults)
      }

      return matching
    } else {
      return []
    }
  }

  function resolveUrl(slug: FullSlug): URL {
    return new URL(resolveRelative(currentSlug, slug), location.toString())
  }

  const resultToHTML = ({ slug, title, content, tags }: Item) => {
    const htmlTags = tags.length > 0 ? `<ul>${tags.join("")}</ul>` : ``
    const resultContent = enablePreview && window.innerWidth > 600 ? "" : `<p>${content}</p>`

    const itemTile = document.createElement("a")
    itemTile.classList.add("result-card")
    Object.assign(itemTile, {
      id: slug,
      href: resolveUrl(slug).toString(),
      innerHTML: `<h3>${title}</h3>${htmlTags}${resultContent}`,
    })

    async function onMouseEnter(ev: MouseEvent) {
      // Actually when we hover, we need to clean all highlights within the result childs
      for (const el of document.getElementsByClassName(
        "result-card",
      ) as HTMLCollectionOf<HTMLElement>) {
        el.classList.remove("focus")
        el.blur()
      }
      const target = ev.target as HTMLAnchorElement
      target.classList.add("focus")
      await displayPreview(target)
    }

    async function onMouseLeave(ev: MouseEvent) {
      const target = ev.target as HTMLAnchorElement
      target.classList.remove("focus")
    }

    const events = [
      ["mouseenter", onMouseEnter],
      ["mouseleave", onMouseLeave],
      [
        "click",
        (event: MouseEvent) => {
          if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
          hideSearch()
        },
      ],
    ] as [keyof HTMLElementEventMap, (this: HTMLElement) => void][]

    events.forEach(([event, handler]) => itemTile.addEventListener(event, handler))

    return itemTile
  }

  async function displayResults(finalResults: Item[]) {
    if (!results) return

    removeAllChildren(results)
    if (finalResults.length === 0) {
      results.innerHTML = `<a class="result-card">
                    <h3>No results.</h3>
                    <p>Try another search term?</p>
                </a>`
    } else {
      results.append(...finalResults.map(resultToHTML))
    }
    // focus on first result, then also dispatch preview immediately
    if (results?.firstElementChild) {
      results?.firstElementChild?.classList.add("focus")
      await displayPreview(results?.firstElementChild as HTMLElement)
    }
  }

  async function fetchContent(slug: FullSlug): Promise<Element[]> {
    if (fetchContentCache.has(slug)) {
      return fetchContentCache.get(slug) as Element[]
    }

    const targetUrl = resolveUrl(slug).toString()
    const contents = await fetch(targetUrl)
      .then((res) => res.text())
      .then((contents) => {
        if (contents === undefined) {
          throw new Error(`Could not fetch ${targetUrl}`)
        }
        const html = p.parseFromString(contents ?? "", "text/html")
        normalizeRelativeURLs(html, targetUrl)
        return [...html.getElementsByClassName("popover-hint")]
      })

    fetchContentCache.set(slug, contents)
    return contents
  }

  async function displayPreview(el: HTMLElement | null) {
    if (!searchLayout || !enablePreview || !el) return

    const slug = el.id as FullSlug
    el.classList.add("focus")

    removeAllChildren(preview as HTMLElement)
    const contentDetails = await fetchContent(slug)

    const previewInner = document.createElement("div")
    previewInner.classList.add("preview-inner")
    preview?.appendChild(previewInner)
    contentDetails?.forEach((elt) => previewInner.appendChild(elt))
  }

  async function onType(e: HTMLElementEventMap["input"]) {
    let term = (e.target as HTMLInputElement).value
    let searchResults: FlexSearch.SimpleDocumentSearchResultSetUnit[]

    if (searchLayout) {
      searchLayout.style.opacity = "1"
    }

    if (term.toLowerCase().startsWith("#")) {
      searchType = "tags"
    } else {
      searchType = "basic"
    }

    switch (searchType) {
      case "tags": {
        term = term.substring(1)
        searchResults =
          (await index?.searchAsync({ query: term, limit: numSearchResults, index: ["tags"] })) ??
          []
        break
      }
      case "basic":
      default: {
        searchResults =
          (await index?.searchAsync({
            query: term,
            limit: numSearchResults,
            index: ["title", "content"],
          })) ?? []
      }
    }

    const getByField = (field: string): number[] => {
      const results = searchResults.filter((x) => x.field === field)
      return results.length === 0 ? [] : ([...results[0].result] as number[])
    }

    // order titles ahead of content
    const allIds: Set<number> = new Set([
      ...getByField("title"),
      ...getByField("content"),
      ...getByField("tags"),
    ])
    const finalResults = [...allIds].map((id) => formatForDisplay(term, id))
    await displayResults(finalResults)
  }

  if (prevShortcutHandler) {
    document.removeEventListener("keydown", prevShortcutHandler)
  }

  document.addEventListener("keydown", shortcutHandler)
  prevShortcutHandler = shortcutHandler
  searchIcon?.removeEventListener("click", () => showSearch("basic"))
  searchIcon?.addEventListener("click", () => showSearch("basic"))
  searchBar?.removeEventListener("input", onType)
  searchBar?.addEventListener("input", onType)

  // setup index if it hasn't been already
  if (!index) {
    index = new FlexSearch.Document({
      charset: "latin:extra",
      encode: encoder,
      document: {
        id: "id",
        index: [
          {
            field: "title",
            tokenize: "forward",
          },
          {
            field: "content",
            tokenize: "forward",
          },
          {
            field: "tags",
            tokenize: "forward",
          },
        ],
      },
    })

    fillDocument(index, data)
  }

  // register handlers
  registerEscapeHandler(container, hideSearch)
})

/**
 * Fills flexsearch document with data
 * @param index index to fill
 * @param data data to fill index with
 */
async function fillDocument(index: FlexSearch.Document<Item, false>, data: any) {
  let id = 0
  for (const [slug, fileData] of Object.entries<ContentDetails>(data)) {
    await index.addAsync(id, {
      id,
      slug: slug as FullSlug,
      title: fileData.title,
      content: fileData.content,
      tags: fileData.tags,
    })
    id++
  }
}
