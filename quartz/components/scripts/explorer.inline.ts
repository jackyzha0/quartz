function toggleExplorer(this: HTMLElement) {
  // Toggle collapsed state of entire explorer
  this.classList.toggle("collapsed")
  const content = this.nextElementSibling as HTMLElement
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function toggleFolder(evt: any) {
  evt.stopPropagation()

  const target = evt.target as HTMLElement
  // Check if target was svg icon or button
  const isSvg = target.nodeName === "svg"

  if (isSvg) {
    // If icon was pressed, rotate icon
    target.classList.toggle("collapsed-folder")
  } else {
    target.parentElement?.previousElementSibling?.classList.toggle("collapsed-folder")
  }

  let folderContainer: HTMLElement

  // Get correct relative container
  if (isSvg) {
    folderContainer = target.parentElement?.nextSibling as HTMLElement
  } else {
    folderContainer = target.parentElement?.parentElement?.nextElementSibling as HTMLElement
  }
  if (!folderContainer) return

  // Collapse folder container
  const isCollapsed = folderContainer.style.maxHeight === "0px"
  console.log(isCollapsed)
  folderContainer.style.opacity = isCollapsed ? "1" : "0"
  folderContainer.style.maxHeight = isCollapsed ? folderContainer.scrollHeight + "px" : "0px"
}

function setupExplorer() {
  // Set click handler for collapsing entire explorer
  const explorer = document.getElementById("explorer")

  if (explorer) {
    // Get config
    const collapseBehavior = explorer.dataset.behavior
    // If behavior is collapse, set up click handlers on folder
    if (collapseBehavior === "collapse") {
      Array.prototype.forEach.call(
        document.getElementsByClassName("folder-button"),
        function (item) {
          item.removeEventListener("click", toggleFolder)
          item.addEventListener("click", toggleFolder)
        },
      )
    }
    explorer.removeEventListener("click", toggleExplorer)
    explorer.addEventListener("click", toggleExplorer)
  }

  // Set up click handlers for each folder
  Array.prototype.forEach.call(document.getElementsByClassName("folder-icon"), function (item) {
    item.removeEventListener("click", toggleFolder)
    item.addEventListener("click", toggleFolder)
  })
}

window.addEventListener("resize", setupExplorer)
document.addEventListener("nav", () => {
  setupExplorer()
})
