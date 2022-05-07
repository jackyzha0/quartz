function htmlToElement(html) {
  const template = document.createElement("template")
  html = html.trim()
  template.innerHTML = html
  return template.content.firstChild
}

function initPopover(baseURL, useContextualBacklinks, renderLatex) {
  const basePath = baseURL.replace(window.location.origin, "")
  fetchData.then(({ content }) => {
    const links = [...document.getElementsByClassName("internal-link")]
    links
      .filter(li => li.dataset.src || (li.dataset.idx && useContextualBacklinks))
      .forEach(li => {
        var el
        if (li.dataset.ctx) {
          const linkDest = content[li.dataset.src]
          const popoverElement = `<div class="popover">
    <h3>${linkDest.title}</h3>
    <p>${highlight(removeMarkdown(linkDest.content), li.dataset.ctx)}...</p>
    <p class="meta">${new Date(linkDest.lastmodified).toLocaleDateString()}</p>
</div>`
          el = htmlToElement(popoverElement)
        } else {
          const linkDest = content[li.dataset.src.replace(/\/$/g, "").replace(basePath, "")]
          if (linkDest) {
            const popoverElement = `<div class="popover">
    <h3>${linkDest.title}</h3>
    <p>${removeMarkdown(linkDest.content).split(" ", 20).join(" ")}...</p>
    <p class="meta">${new Date(linkDest.lastmodified).toLocaleDateString()}</p>
</div>`
            el = htmlToElement(popoverElement)
          }
        }

        if (el) {
          li.appendChild(el)
          if (renderLatex) {
            renderMathInElement(el, {
              delimiters: [
                { left: '$$', right: '$$', display: false },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false },
                { left: '\\[', right: '\\]', display: false }
              ],
              throwOnError: false
            })
          }
          li.addEventListener("mouseover", () => {
            el.classList.add("visible")
          })
          li.addEventListener("mouseout", () => {
            el.classList.remove("visible")
          })
        }
      })
  })
}
