import { Document, SimpleDocumentSearchResultSetUnit } from "flexsearch"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, resolveRelative } from "../../util/path"

interface Item {
  id: number
  slug: FullSlug
  title: string
  content: string
  tags: string[]
}

let index: Document<Item> | undefined = undefined

// Can be expanded with things like "term" in the future
type SearchType = "basic" | "tags"

// Current searchType
let searchType: SearchType = "basic"

const contextWindowWords = 30
const numSearchResults = 5
const numTagResults = 3
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
    const occurencesIndices = tokenizedText.map(includesCheck)

    let bestSum = 0
    let bestIndex = 0
    for (let i = 0; i < Math.max(tokenizedText.length - contextWindowWords, 0); i++) {
      const window = occurencesIndices.slice(i, i + contextWindowWords)
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

const encoder = (str: string) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)
let prevShortcutHandler: ((e: HTMLElementEventMap["keydown"]) => void) | undefined = undefined
document.addEventListener("nav", async (e: unknown) => {
  const currentSlug = (e as CustomEventMap["nav"]).detail.url

  const data = await fetchData
  const container = document.getElementById("search-container")
  const sidebar = container?.closest(".sidebar") as HTMLElement
  const searchIcon = document.getElementById("search-icon")
  const searchBar = document.getElementById("search-bar") as HTMLInputElement | null
  const results = document.getElementById("results-container")
  const resultCards = document.getElementsByClassName("result-card")
  const idDataMap = Object.keys(data) as FullSlug[]

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

  function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
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
    } else if (e.key === "Enter") {
      // If result has focus, navigate to that one, otherwise pick first result
      if (results?.contains(document.activeElement)) {
        const active = document.activeElement as HTMLInputElement
        active.click()
      } else {
        const anchor = document.getElementsByClassName("result-card")[0] as HTMLInputElement | null
        anchor?.click()
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      // When first pressing ArrowDown, results wont contain the active element, so focus first element
      if (!results?.contains(document.activeElement)) {
        const firstResult = resultCards[0] as HTMLInputElement | null
        firstResult?.focus()
      } else {
        // If an element in results-container already has focus, focus next one
        const nextResult = document.activeElement?.nextElementSibling as HTMLInputElement | null
        nextResult?.focus()
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (results?.contains(document.activeElement)) {
        // If an element in results-container already has focus, focus previous one
        const prevResult = document.activeElement?.previousElementSibling as HTMLInputElement | null
        prevResult?.focus()
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

      // Substract matching from original tags, then push difference
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

  const resultToHTML = ({ slug, title, content, tags }: Item) => {
    const htmlTags = tags.length > 0 ? `<ul>${tags.join("")}</ul>` : ``
    const button = document.createElement("button")
    button.classList.add("result-card")
    button.id = slug
    button.innerHTML = `<h3>${title}</h3>${htmlTags}<p>${content}</p>`
    button.addEventListener("click", () => {
      const targ = resolveRelative(currentSlug, slug)
      window.spaNavigate(new URL(targ, window.location.toString()))
      hideSearch()
    })
    return button
  }

  function displayResults(finalResults: Item[]) {
    if (!results) return

    removeAllChildren(results)
    if (finalResults.length === 0) {
      results.innerHTML = `<button class="result-card">
                    <h3>No results.</h3>
                    <p>Try another search term?</p>
                </button>`
    } else {
      results.append(...finalResults.map(resultToHTML))
    }
  }

  async function onType(e: HTMLElementEventMap["input"]) {
    let term = (e.target as HTMLInputElement).value
    let searchResults: SimpleDocumentSearchResultSetUnit[]

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
    displayResults(finalResults)
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
    index = new Document({
      cache: true,
      charset: "latin:extra",
      optimize: true,
      encode: encoder,
      document: {
        id: "id",
        index: [
          {
            field: "title",
            tokenize: "reverse",
          },
          {
            field: "content",
            tokenize: "reverse",
          },
          {
            field: "tags",
            tokenize: "reverse",
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
async function fillDocument(index: Document<Item, false>, data: any) {
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
