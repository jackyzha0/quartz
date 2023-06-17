const bufferPx = 150
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const slug = entry.target.id
    const tocEntryElement = document.querySelector(`a[data-for="${slug}"]`)
    const windowHeight = entry.rootBounds?.height
    if (windowHeight && tocEntryElement) {
      if (entry.boundingClientRect.y < windowHeight) {
        tocEntryElement.classList.add("in-view")
      } else {
        tocEntryElement.classList.remove("in-view")
      }
    }
  }
})

function toggleToc(this: HTMLElement) {
  this.classList.toggle("collapsed")
  const content = this.nextElementSibling as HTMLElement
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function setupToc() {
  const toc = document.getElementById("toc")
  if (toc) {
    const content = toc.nextElementSibling as HTMLElement
    content.style.maxHeight = content.scrollHeight + "px"
    toc.removeEventListener("click", toggleToc)
    toc.addEventListener("click", toggleToc)
  }
}

window.addEventListener("resize", setupToc)
document.addEventListener("nav", () => {
  setupToc()

  // update toc entry highlighting
  observer.disconnect()
  const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]")
  headers.forEach(header => observer.observe(header))
})
