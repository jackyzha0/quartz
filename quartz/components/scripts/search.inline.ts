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

// Can be expanded with things like "term" in the future
type SearchType = "basic" | "tags"
let searchType: SearchType = "basic"
let currentSearchTerm: string = ""
const encoder = (str: string) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)
let index = new FlexSearch.Document<Item>({
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

const p = new DOMParser()
const fetchContentCache: Map<FullSlug, Element[]> = new Map()
const contextWindowWords = 30
const numSearchResults = 8
const numTagResults = 5

const tokenizeTerm = (term: string) => {
  const tokens = term.split(/\s+/).filter((t) => t.trim() !== "")
  const tokenLen = tokens.length
  if (tokenLen > 1) {
    for (let i = 1; i < tokenLen; i++) {
      tokens.push(tokens.slice(0, i + 1).join(" "))
    }
  }

  return tokens.sort((a, b) => b.length - a.length) // always highlight longest terms first
}

function highlight(searchTerm: string, text: string, trim?: boolean) {
  const tokenizedTerms = tokenizeTerm(searchTerm)
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

function highlightHTML(searchTerm: string, el: HTMLElement) {
  const p = new DOMParser()
  const tokenizedTerms = tokenizeTerm(searchTerm)
  const html = p.parseFromString(el.innerHTML, "text/html")

  const createHighlightSpan = (text: string) => {
    const span = document.createElement("span")
    span.className = "highlight"
    span.textContent = text
    return span
  }

  const highlightTextNodes = (node: Node, term: string) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const nodeText = node.nodeValue ?? ""
      const regex = new RegExp(term.toLowerCase(), "gi")
      const matches = nodeText.match(regex)
      if (!matches || matches.length === 0) return
      const spanContainer = document.createElement("span")
      let lastIndex = 0
      for (const match of matches) {
        const matchIndex = nodeText.indexOf(match, lastIndex)
        spanContainer.appendChild(document.createTextNode(nodeText.slice(lastIndex, matchIndex)))
        spanContainer.appendChild(createHighlightSpan(match))
        lastIndex = matchIndex + match.length
      }
      spanContainer.appendChild(document.createTextNode(nodeText.slice(lastIndex)))
      node.parentNode?.replaceChild(spanContainer, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if ((node as HTMLElement).classList.contains("highlight")) return
      Array.from(node.childNodes).forEach((child) => highlightTextNodes(child, term))
    }
  }

  for (const term of tokenizedTerms) {
    highlightTextNodes(html.body, term)
  }

  return html.body
}

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
  let previewInner: HTMLDivElement | undefined = undefined
  const results = document.createElement("div")
  results.id = "results-container"
  appendLayout(results)

  if (enablePreview) {
    preview = document.createElement("div")
    preview.id = "preview-container"
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
    if (searchLayout) {
      searchLayout.classList.remove("display-results")
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

  let currentHover: HTMLInputElement | null = null

  async function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (e.key === "k" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault()
      const searchBarOpen = container?.classList.contains("active")
      searchBarOpen ? hideSearch() : showSearch("basic")
      return
    } else if (e.shiftKey && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      // Hotkey to open tag search
      e.preventDefault()
      const searchBarOpen = container?.classList.contains("active")
      searchBarOpen ? hideSearch() : showSearch("tags")

      // add "#" prefix for tag search
      if (searchBar) searchBar.value = "#"
      return
    }

    if (currentHover) {
      currentHover.classList.remove("focus")
    }

    // If search is active, then we will render the first result and display accordingly
    if (!container?.classList.contains("active")) return
    if (e.key === "Enter") {
      // If result has focus, navigate to that one, otherwise pick first result
      if (results?.contains(document.activeElement)) {
        const active = document.activeElement as HTMLInputElement
        if (active.classList.contains("no-match")) return
        await displayPreview(active)
        active.click()
      } else {
        const anchor = document.getElementsByClassName("result-card")[0] as HTMLInputElement | null
        if (!anchor || anchor?.classList.contains("no-match")) return
        await displayPreview(anchor)
        anchor.click()
      }
    } else if (e.key === "ArrowUp" || (e.shiftKey && e.key === "Tab")) {
      e.preventDefault()
      if (results?.contains(document.activeElement)) {
        // If an element in results-container already has focus, focus previous one
        const currentResult = currentHover
          ? currentHover
          : (document.activeElement as HTMLInputElement | null)
        const prevResult = currentResult?.previousElementSibling as HTMLInputElement | null
        currentResult?.classList.remove("focus")
        prevResult?.focus()
        if (prevResult) currentHover = prevResult
        await displayPreview(prevResult)
      }
    } else if (e.key === "ArrowDown" || e.key === "Tab") {
      e.preventDefault()
      // The results should already been focused, so we need to find the next one.
      // The activeElement is the search bar, so we need to find the first result and focus it.
      if (document.activeElement === searchBar || currentHover !== null) {
        const firstResult = currentHover
          ? currentHover
          : (document.getElementsByClassName("result-card")[0] as HTMLInputElement | null)
        const secondResult = firstResult?.nextElementSibling as HTMLInputElement | null
        firstResult?.classList.remove("focus")
        secondResult?.focus()
        if (secondResult) currentHover = secondResult
        await displayPreview(secondResult)
      }
    }
  }

  const formatForDisplay = (term: string, id: number) => {
    const slug = idDataMap[id]
    return {
      id,
      slug,
      title: searchType === "tags" ? data[slug].title : highlight(term, data[slug].title ?? ""),
      content: highlight(term, data[slug].content ?? "", true),
      tags: highlightTags(term.substring(1), data[slug].tags),
    }
  }

  function highlightTags(term: string, tags: string[]) {
    if (!tags || searchType !== "tags") {
      return []
    }

    return tags
      .map((tag) => {
        if (tag.toLowerCase().includes(term.toLowerCase())) {
          return `<li><p class="match-tag">#${tag}</p></li>`
        } else {
          return `<li><p>#${tag}</p></li>`
        }
      })
      .slice(0, numTagResults)
  }

  function resolveUrl(slug: FullSlug): URL {
    return new URL(resolveRelative(currentSlug, slug), location.toString())
  }

  const resultToHTML = ({ slug, title, content, tags }: Item) => {
    const htmlTags = tags.length > 0 ? `<ul class="tags">${tags.join("")}</ul>` : ``
    const itemTile = document.createElement("a")
    itemTile.classList.add("result-card")
    itemTile.id = slug
    itemTile.href = resolveUrl(slug).toString()
    itemTile.innerHTML = `<h3>${title}</h3>${htmlTags}${
      enablePreview && window.innerWidth > 600 ? "" : `<p>${content}</p>`
    }`
    itemTile.addEventListener("click", (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      hideSearch()
    })

    const handler = (event: MouseEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      hideSearch()
    }

    async function onMouseEnter(ev: MouseEvent) {
      if (!ev.target) return
      const target = ev.target as HTMLInputElement
      await displayPreview(target)
    }

    itemTile.addEventListener("mouseenter", onMouseEnter)
    window.addCleanup(() => itemTile.removeEventListener("mouseenter", onMouseEnter))
    itemTile.addEventListener("click", handler)
    window.addCleanup(() => itemTile.removeEventListener("click", handler))

    return itemTile
  }

  async function displayResults(finalResults: Item[]) {
    if (!results) return

    removeAllChildren(results)
    if (finalResults.length === 0) {
      results.innerHTML = `<a class="result-card no-match">
          <h3>No results.</h3>
          <p>Try another search term?</p>
      </a>`
    } else {
      results.append(...finalResults.map(resultToHTML))
    }

    if (finalResults.length === 0 && preview) {
      // no results, clear previous preview
      removeAllChildren(preview)
    } else {
      // focus on first result, then also dispatch preview immediately
      const firstChild = results.firstElementChild as HTMLElement
      firstChild.classList.add("focus")
      currentHover = firstChild as HTMLInputElement
      await displayPreview(firstChild)
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
    if (!searchLayout || !enablePreview || !el || !preview) return
    const slug = el.id as FullSlug
    const innerDiv = await fetchContent(slug).then((contents) =>
      contents.flatMap((el) => [...highlightHTML(currentSearchTerm, el as HTMLElement).children]),
    )
    previewInner = document.createElement("div")
    previewInner.classList.add("preview-inner")
    previewInner.append(...innerDiv)
    preview.replaceChildren(previewInner)

    // scroll to longest
    const highlights = [...preview.querySelectorAll(".highlight")].sort(
      (a, b) => b.innerHTML.length - a.innerHTML.length,
    )
    highlights[0]?.scrollIntoView({ block: "start" })
  }

  async function onType(e: HTMLElementEventMap["input"]) {
    if (!searchLayout || !index) return
    currentSearchTerm = (e.target as HTMLInputElement).value
    searchLayout.classList.toggle("display-results", currentSearchTerm !== "")
    searchType = currentSearchTerm.startsWith("#") ? "tags" : "basic"

    let searchResults: FlexSearch.SimpleDocumentSearchResultSetUnit[]
    if (searchType === "tags") {
      searchResults = await index.searchAsync({
        query: currentSearchTerm.substring(1),
        limit: numSearchResults,
        index: ["tags"],
      })
    } else if (searchType === "basic") {
      searchResults = await index.searchAsync({
        query: currentSearchTerm,
        limit: numSearchResults,
        index: ["title", "content"],
      })
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
    const finalResults = [...allIds].map((id) => formatForDisplay(currentSearchTerm, id))
    await displayResults(finalResults)
  }

  document.addEventListener("keydown", shortcutHandler)
  window.addCleanup(() => document.removeEventListener("keydown", shortcutHandler))
  searchIcon?.addEventListener("click", () => showSearch("basic"))
  window.addCleanup(() => searchIcon?.removeEventListener("click", () => showSearch("basic")))
  searchBar?.addEventListener("input", onType)
  window.addCleanup(() => searchBar?.removeEventListener("input", onType))

  registerEscapeHandler(container, hideSearch)
  await fillDocument(data)
})

/**
 * Fills flexsearch document with data
 * @param index index to fill
 * @param data data to fill index with
 */
async function fillDocument(data: { [key: FullSlug]: ContentDetails }) {
  let id = 0
  const promises: Array<Promise<unknown>> = []
  for (const [slug, fileData] of Object.entries<ContentDetails>(data)) {
    promises.push(
      index.addAsync(id++, {
        id,
        slug: slug as FullSlug,
        title: fileData.title,
        content: fileData.content,
        tags: fileData.tags,
      }),
    )
  }

  return await Promise.all(promises)
}
