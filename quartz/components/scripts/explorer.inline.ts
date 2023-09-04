function toggleExplorer(this: HTMLElement) {
  this.classList.toggle("collapsed")
  const content = this.nextElementSibling as HTMLElement
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function setupExplorer() {
  const explorer = document.getElementById("explorer")
  if (explorer) {
    const content = explorer.nextElementSibling as HTMLElement
    content.style.maxHeight = content.scrollHeight + "px"
    explorer.removeEventListener("click", toggleExplorer)
    explorer.addEventListener("click", toggleExplorer)
  }
}

window.addEventListener("resize", setupExplorer)
document.addEventListener("nav", () => {
  setupExplorer()
})
