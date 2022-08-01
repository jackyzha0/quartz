const apiKey = "{{$.Site.Data.config.operandApiKey}}"

async function searchContents(query) {
  const response = await fetch('https://prod.operand.ai/v3/search/objects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    body: JSON.stringify({
      query,
      max: 10
    }),
  });
  return (await response.json());
}

function debounce(func, timeout = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args); }, timeout)
  };
}

registerHandlers(debounce((e) => {
  term = e.target.value
  if (term !== "") {
    searchContents(term)
      .then((res) => res.results.map(entry => ({
        url: entry.object.properties.url,
        content: entry.snippet,
        title: entry.object.metadata.title
      })
      ))
      .then(results => displayResults(results))
  }
}))
