import { Document } from "flexsearch"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { registerEscapeHandler } from "./handler"

interface Item {
  slug: string,
  title: string,
  content: string,
}
let index: Document<Item> | undefined = undefined

function relative(from: string, to: string) {
  const pieces = [location.protocol, '//', location.host, location.pathname]
  const url = pieces.join('').slice(0, -from.length) + to
  return url
}

function removeAllChildren(node: HTMLElement) {
  node.innerHTML = ``
}

const contextWindowWords = 30
function highlight(searchTerm: string, text: string, trim?: boolean) {
  const tokenizedTerms = searchTerm.split(/\s+/).filter(t => t !== "")
  let tokenizedText = text
    .split(/\s+/)
    .filter(t => t !== "")

  let startIndex = 0
  let endIndex = tokenizedText.length - 1
  if (trim) {
    const includesCheck = (tok: string) => tokenizedTerms.some((term) => tok.toLowerCase().startsWith(term.toLowerCase()))
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

  const slice = tokenizedText.map(tok => {
    // see if this tok is prefixed by any search terms 
    for (const searchTok of tokenizedTerms) {
      if (tok.toLowerCase().includes(searchTok.toLowerCase())) {
        const regex = new RegExp(searchTok, "gi")
        return tok.replace(regex, `<span class="highlight">$&</span>`)
      }
    }
    return tok
  })
    .join(" ")

  return `${startIndex === 0 ? "" : "..."}${slice}${endIndex === tokenizedText.length - 1 ? "" : "..."}`
}

const encoder = (str: string) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)
document.addEventListener("nav", async (e: unknown) => {
  const currentSlug = (e as CustomEventMap["nav"]).detail.url

  // setup index if it hasn't been already
  const data = await fetchData
  if (!index) {
    index = new Document({
      cache: true,
      charset: 'latin:extra',
      optimize: true,
      encode: encoder,
      document: {
        id: "slug",
        index: [
          {
            field: "title",
            tokenize: "forward",
          },
          {
            field: "content",
            tokenize: "reverse",
          },
        ]
      },
    })

    for (const [slug, fileData] of Object.entries<ContentDetails>(data)) {
      index.add({
        slug,
        title: fileData.title,
        content: fileData.content
      })
    }
  }

  const container = document.getElementById("search-container")
  const searchIcon = document.getElementById("search-icon")
  const searchBar = document.getElementById("search-bar") as HTMLInputElement | null
  const results = document.getElementById("results-container")

  function hideSearch() {
    container?.classList.remove("active")
    if (searchBar) {
      searchBar.value = "" // clear the input when we dismiss the search
    }
    if (results) {
      removeAllChildren(results)
    }
  }

  function showSearch() {
    container?.classList.add("active")
    searchBar?.focus()
  }

  function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      const searchBarOpen = container?.classList.contains("active")
      searchBarOpen ? hideSearch() : showSearch()
    } else if (e.key === "Enter") {
      const anchor = document.getElementsByClassName("result-card")[0] as HTMLInputElement | null
      if (anchor) {
        anchor.click()
      }
    }
  }

  const formatForDisplay = (term: string, slug: string) => ({
    slug,
    title: highlight(term, data[slug].title ?? ""),
    content: highlight(term, data[slug].content ?? "", true),
  })

  const resultToHTML = ({ slug, title, content }: Item) => {
    const button = document.createElement("button")
    button.classList.add("result-card")
    button.id = slug
    button.innerHTML = `<h3>${title}</h3><p>${content}</p>`
    button.addEventListener('click', () => {
      const targ = relative(currentSlug, slug)
      window.spaNavigate(new URL(targ))
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

  function onType(e: HTMLElementEventMap["input"]) {
    const term = (e.target as HTMLInputElement).value
    const searchResults = index?.search(term, 5) ?? []
    const getByField = (field: string): string[] => {
      const results = searchResults.filter((x) => x.field === field)
      return results.length === 0 ? [] : [...results[0].result] as string[]
    }

    // order titles ahead of content
    const allIds: Set<string> = new Set([...getByField("title"), ...getByField("content")])
    const finalResults = [...allIds].map(id => formatForDisplay(term, id))
    displayResults(finalResults)
  }


  document.removeEventListener("keydown", shortcutHandler)
  document.addEventListener("keydown", shortcutHandler)
  searchIcon?.removeEventListener("click", showSearch)
  searchIcon?.addEventListener("click", showSearch)
  searchBar?.removeEventListener("input", onType)
  searchBar?.addEventListener("input", onType)

  // register handlers
  registerEscapeHandler(container, hideSearch)
})
