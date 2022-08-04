; (async function() {
  const encoder = (str) => str.toLowerCase().split(/([^a-z]|[^\x00-\x7F])/)
  const contentIndex = new FlexSearch.Document({
    cache: true,
    charset: "latin:extra",
    optimize: true,
    index: [
      {
        field: "content",
        tokenize: "reverse",
        encode: encoder,
      },
      {
        field: "title",
        tokenize: "forward",
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

  const formatForDisplay = (id) => ({
    id,
    url: id,
    title: content[id].title,
    content: content[id].content,
  })

  registerHandlers((e) => {
    term = e.target.value
    const searchResults = contentIndex.search(term, [
      {
        field: "content",
        limit: 10,
      },
      {
        field: "title",
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
    const allIds = new Set([...getByField("title"), ...getByField("content")])
    const finalResults = [...allIds].map(formatForDisplay)
    displayResults(finalResults, true)
  })
})()
