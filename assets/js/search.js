// code from https://github.com/danestves/markdown-to-text
const removeMarkdown = (
  markdown,
  options = {
    listUnicodeChar: false,
    stripListLeaders: true,
    gfm: true,
    useImgAltText: false,
    preserveLinks: false,
  }
) => {
  let output = markdown || ''
  output = output.replace(/^(-\s*?|\*\s*?|_\s*?){3,}\s*$/gm, '')

  try {
    if (options.stripListLeaders) {
      if (options.listUnicodeChar)
        output = output.replace(
          /^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm,
          options.listUnicodeChar + ' $1'
        )
      else output = output.replace(/^([\s\t]*)([\*\-\+]|\d+\.)\s+/gm, '$1')
    }
    if (options.gfm) {
      output = output
        .replace(/\n={2,}/g, '\n')
        .replace(/~{3}.*\n/g, '')
        .replace(/~~/g, '')
        .replace(/`{3}.*\n/g, '')
    }
    if (options.preserveLinks) {
      output = output.replace(/\[(.*?)\][\[\(](.*?)[\]\)]/g, '$1 ($2)')
    }
    output = output
      .replace(/<[^>]*>/g, '')
      .replace(/^[=\-]{2,}\s*$/g, '')
      .replace(/\[\^.+?\](\: .*?$)?/g, '')
      .replace(/(#{1,6})\s+(.+)\1?/g, '<b>$2</b>')
      .replace(/\s{0,2}\[.*?\]: .*?$/g, '')
      .replace(/\!\[(.*?)\][\[\(].*?[\]\)]/g, options.useImgAltText ? '$1' : '')
      .replace(/\[(.*?)\][\[\(].*?[\]\)]/g, '<a>$1</a>')
      .replace(/!?\[\[\S[^\[\]\|]*(?:\|([^\[\]]*))?\S\]\]/g, '<a>$1</a>')
      .replace(/^\s{0,3}>\s?/g, '')
      .replace(/(^|\n)\s{0,3}>\s?/g, '\n\n')
      .replace(/^\s{1,2}\[(.*?)\]: (\S+)( ".*?")?\s*$/g, '')
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
      .replace(/([\*_]{1,3})(\S.*?\S{0,1})\1/g, '$2')
      .replace(/(`{3,})(.*?)\1/gm, '$2')
      .replace(/`(.+?)`/g, '$1')
      .replace(/\n{2,}/g, '\n\n')
  } catch (e) {
    console.error(e)
    return markdown
  }
  return output
}
// -----

const highlight = (content, term) => {
  const highlightWindow = 20

  // try to find direct match first
  const directMatchIdx = content.indexOf(term)
  if (directMatchIdx !== -1) {
    const h = highlightWindow / 2
    const before = content.substring(0, directMatchIdx).split(" ").slice(-h)
    const after = content.substring(directMatchIdx + term.length, content.length - 1).split(" ").slice(0, h)
    return (before.length == h ? `...${before.join(" ")}` : before.join(" ")) + `<span class="search-highlight">${term}</span>` + after.join(" ")
  }

  const tokenizedTerm = term.split(/\s+/).filter((t) => t !== '')
  const splitText = content.split(/\s+/).filter((t) => t !== '')
  const includesCheck = (token) =>
    tokenizedTerm.some((term) =>
      token.toLowerCase().startsWith(term.toLowerCase())
    )

  const occurrencesIndices = splitText.map(includesCheck)

  // calculate best index
  let bestSum = 0
  let bestIndex = 0
  for (
    let i = 0;
    i < Math.max(occurrencesIndices.length - highlightWindow, 0);
    i++
  ) {
    const window = occurrencesIndices.slice(i, i + highlightWindow)
    const windowSum = window.reduce((total, cur) => total + cur, 0)
    if (windowSum >= bestSum) {
      bestSum = windowSum
      bestIndex = i
    }
  }

  const startIndex = Math.max(bestIndex - highlightWindow, 0)
  const endIndex = Math.min(
    startIndex + 2 * highlightWindow,
    splitText.length
  )
  const mappedText = splitText
    .slice(startIndex, endIndex)
    .map((token) => {
      if (includesCheck(token)) {
        return `<span class="search-highlight">${token}</span>`
      }
      return token
    })
    .join(' ')
    .replaceAll('</span> <span class="search-highlight">', ' ')
  return `${startIndex === 0 ? '' : '...'}${mappedText}${endIndex === splitText.length ? '' : '...'
    }`
};

(async function() {
  const encoder = (str) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])+/)
  const contentIndex = new FlexSearch.Document({
    cache: true,
    charset: 'latin:extra',
    optimize: true,
    index: [
      {
        field: 'content',
        tokenize: 'reverse',
        encode: encoder,
      },
      {
        field: 'title',
        tokenize: 'forward',
        encode: encoder,
      },
    ],
  })

  const { content } = await fetchData
  for (const [key, value] of Object.entries(content)) {
    contentIndex.add({
      id: key,
      title: value.title,
      content: removeMarkdown(value.content),
    })
  }

  const resultToHTML = ({ url, title, content, term }) => {
    const text = removeMarkdown(content)
    const resultTitle = highlight(title, term)
    const resultText = highlight(text, term)
    return `<button class="result-card" id="${url}">
        <h3>${resultTitle}</h3>
        <p>${resultText}</p>
    </button>`
  }

  const redir = (id, term) => {
    // SPA navigation
    window.navigate(
      new URL(
        `${BASE_URL.replace(/\/$/g, "")}${id}#:~:text=${encodeURIComponent(term)}/`
      ),
      '.singlePage'
    )
    closeSearch()
  }

  const formatForDisplay = (id) => ({
    id,
    url: id,
    title: content[id].title,
    content: content[id].content,
  })

  const source = document.getElementById('search-bar')
  const results = document.getElementById('results-container')
  let term
  source.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const anchor = document.getElementsByClassName('result-card')[0]
      redir(anchor.id, term)
    }
  })
  source.addEventListener('input', (e) => {
    term = e.target.value
    const searchResults = contentIndex.search(term, [
      {
        field: 'content',
        limit: 10,
      },
      {
        field: 'title',
        limit: 5,
      },
    ])
    const getByField = (field) => {
      const results = searchResults.filter((x) => x.field === field)
      if (results.length === 0) {
        return []
      } else {
        return [...results[0].result]
      }
    }
    const allIds = new Set([...getByField('title'), ...getByField('content')])
    const finalResults = [...allIds].map(formatForDisplay)

    // display
    if (finalResults.length === 0) {
      results.innerHTML = `<button class="result-card">
                    <h3>No results.</h3>
                    <p>Try another search term?</p>
                </button>`
    } else {
      results.innerHTML = finalResults
        .map((result) =>
          resultToHTML({
            ...result,
            term,
          })
        )
        .join('\n')
      const anchors = [...document.getElementsByClassName('result-card')]
      anchors.forEach((anchor) => {
        anchor.onclick = () => redir(anchor.id, term)
      })
    }
  })

  const searchContainer = document.getElementById('search-container')

  function openSearch() {
    if (
      searchContainer.style.display === 'none' ||
      searchContainer.style.display === ''
    ) {
      source.value = ''
      results.innerHTML = ''
      searchContainer.style.display = 'block'
      source.focus()
    } else {
      searchContainer.style.display = 'none'
    }
  }

  function closeSearch() {
    searchContainer.style.display = 'none'
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault()
      openSearch()
    }
    if (event.key === 'Escape') {
      event.preventDefault()
      closeSearch()
    }
  })

  const searchButton = document.getElementById('search-icon')
  searchButton.addEventListener('click', (evt) => {
    openSearch()
  })
  searchButton.addEventListener('keydown', (evt) => {
    openSearch()
  })
  searchContainer.addEventListener('click', (evt) => {
    closeSearch()
  })
  document.getElementById('search-space').addEventListener('click', (evt) => {
    evt.stopPropagation()
  })
})()
