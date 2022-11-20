import {
  operandClient,
  indexIDHeaderKey,
} from "https://unpkg.com/@operandinc/sdk@4.1.3/dist/esm/index.js"

const apiKey = "{{$.Site.Data.config.search.operandApiKey}}"
const indexId = "{{$.Site.Data.config.search.operandIndexId}}"
const operand = operandClient(
  ObjectService,
  apiKey,
  "https://api.operand.ai",
  {
    [indexIDHeaderKey]: indexId,
  }
);

async function searchContents(query) {
  const results = await operand.searchWithin({
    query,
    limit: 10,
  })
  console.log(results.matches)
  return results.matches.flat()
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
