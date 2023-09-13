import { FolderState } from "../ExplorerNode"

// Current state of folders
let folderState: FolderState[]

function toggleExplorer(this: HTMLElement) {
  // Toggle collapsed state of entire explorer
  this.classList.toggle("collapsed")
  const content = this.nextElementSibling as HTMLElement
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function toggleFolder(evt: MouseEvent) {
  evt.stopPropagation()

  const target = evt.target as HTMLElement
  // Check if target was svg icon or button
  const isSvg = target.nodeName === "svg"

  // TODO: merge all if (svg) paths
  if (isSvg) {
    // If icon was pressed, rotate icon
    target.classList.toggle("collapsed-folder")
  } else {
    target.parentElement?.previousElementSibling?.classList.toggle("collapsed-folder")
  }

  let childFolderContainer: HTMLElement

  // Get correct relative container
  if (isSvg) {
    childFolderContainer = target.parentElement?.nextSibling as HTMLElement
  } else {
    childFolderContainer = target.parentElement?.parentElement?.nextElementSibling as HTMLElement
  }
  if (!childFolderContainer) return

  // Collapse folder container
  const isCollapsed = childFolderContainer.style.maxHeight === "0px"
  setFolderState(childFolderContainer, !isCollapsed)

  // Save folder state to localStorage
  let currentFolderParent: HTMLElement
  if (isSvg) {
    currentFolderParent = target.nextElementSibling as HTMLElement
  } else {
    currentFolderParent = target.parentElement as HTMLElement
  }
  const clickFolderPath = currentFolderParent.dataset.folderpath as string

  // Remove leading "/"
  const fullFolderPath = clickFolderPath.substring(1)
  toggleCollapsedByPath(folderState, fullFolderPath)

  const stringifiedFileTree = JSON.stringify(folderState)
  localStorage.setItem("fileTree", stringifiedFileTree)
}

function setupExplorer() {
  // Set click handler for collapsing entire explorer
  const explorer = document.getElementById("explorer")

  // Get folder state from local storage
  const storageTree = localStorage.getItem("fileTree")

  // Convert to bool
  const useSavedFolderState = explorer?.dataset.savestate === "true"

  if (explorer) {
    // Get config
    const collapseBehavior = explorer.dataset.behavior

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

  if (storageTree && useSavedFolderState) {
    folderState = JSON.parse(storageTree)
    console.log("tree storage: ", folderState)

    // console.log("First entry: ", fileTree[0])
    folderState.map((folder) => {
      // grab <li> element for matching folder path
      const folderLI = document.querySelector(`[data-folderpath='/${folder.path}']`) as HTMLElement
      const folderIcon = folderLI.previousElementSibling as HTMLElement
      if (folder.collapsed) {
        folderIcon.classList.add("collapsed-folder")
      } else {
        folderIcon.classList.remove("collapsed-folder")
      }

      // Get corresponding content <ul> tag and set state
      const folderUL = folderLI.parentElement?.nextElementSibling as HTMLElement
      console.log("Folder path: ", folder.path)
      console.log("Folder <ul>: ", folderUL.dataset.folderul)
      console.log("===")
      setFolderState(folderUL, folder.collapsed)
    })
  } else {
    folderState = JSON.parse(explorer?.dataset.tree as string)
    console.log("tree raw: ", folderState)
  }
}

window.addEventListener("resize", setupExplorer)
document.addEventListener("nav", () => {
  setupExplorer()
})

function setFolderState(folderUL: HTMLElement, collapsed: boolean) {
  // Grab corresponding <ul> content element of folder

  // Calculate total height (height of content managed by event + height of all children)
  let totalHeight = folderUL.scrollHeight
  Array.prototype.forEach.call(folderUL.getElementsByClassName("content"), function (item) {
    totalHeight += item.scrollHeight
  })

  // FolderContainer: <ul>
  folderUL.style.opacity = collapsed ? "0" : "1"
  folderUL.style.maxHeight = collapsed ? "0px" : totalHeight + "px"
  folderUL.classList.toggle("no-pointer")

  // Set no-pointer for all child items recursively
  Array.prototype.forEach.call(folderUL.getElementsByClassName("clickable"), function (item) {
    if (collapsed) {
      item.classList.add("no-pointer")
    } else {
      item.classList.remove("no-pointer")
    }
  })
}

/**
 * Toggles visibility of a folder
 * @param array array of FolderState (`fileTree`, either get from local storage or data attribute)
 * @param path path to folder (e.g. 'advanced/more/more2')
 */
function toggleCollapsedByPath(array: FolderState[], path: string) {
  const entry = array.find((item) => item.path === path)
  if (entry) {
    entry.collapsed = !entry.collapsed
  }
}
