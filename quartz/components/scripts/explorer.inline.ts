function toggleExplorer(this: HTMLElement) {
  // Toggle collapsed state of entire explorer
  this.classList.toggle("collapsed")
  const content = this.nextElementSibling as HTMLElement
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function toggleFolder(evt: any) {
  evt.stopPropagation()
  // Toggle button
  const target = evt.target as HTMLElement
  target.classList.toggle("collapsed-folder")

  // Get folder div and collapse
  const folderContainer = target.parentElement?.nextSibling as HTMLElement
  if (!folderContainer) return
  const isCollapsed = folderContainer.style.maxHeight === "0px"
  folderContainer.style.opacity = isCollapsed ? "1" : "0"
  folderContainer.style.maxHeight = isCollapsed ? folderContainer.scrollHeight + "px" : "0px"
}

function setupExplorer() {
  // Set click handler for collapsing entire explorer
  const explorer = document.getElementById("explorer")
  if (explorer) {
    explorer.removeEventListener("click", toggleExplorer)
    explorer.addEventListener("click", toggleExplorer)
  }

  // Set up click handlers for each folder
  Array.prototype.forEach.call(document.getElementsByClassName("folder-button"), function (item) {
    item.removeEventListener("click", toggleFolder)
    item.addEventListener("click", toggleFolder)
  })
}

window.addEventListener("resize", setupExplorer)
document.addEventListener("nav", () => {
  setupExplorer()
})
