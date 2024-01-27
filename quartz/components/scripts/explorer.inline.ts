import { FolderState } from "../ExplorerNode"

// Current state of folders
let explorerState: FolderState[]

const observer = new IntersectionObserver((entries) => {
  // If last element is observed, remove gradient of "overflow" class so element is visible
  const explorer = document.getElementById("explorer-ul")
  for (const entry of entries) {
    if (entry.isIntersecting) {
      explorer?.classList.add("no-background")
    } else {
      explorer?.classList.remove("no-background")
    }
  }
})

function toggleExplorer(this: HTMLElement) {
  // Toggle collapsed state of entire explorer
  this.classList.toggle("collapsed")
  const content = this.nextElementSibling as HTMLElement
  content.classList.toggle("collapsed")
  content.style.maxHeight = content.style.maxHeight === "0px" ? content.scrollHeight + "px" : "0px"
}

function toggleFolder(evt: MouseEvent) {
  evt.stopPropagation()

  // Element that was clicked
  const target = evt.target as HTMLElement

  // Check if target was svg icon or button
  const isSvg = target.nodeName === "svg"

  // corresponding <ul> element relative to clicked button/folder
  let childFolderContainer: HTMLElement

  // <li> element of folder (stores folder-path dataset)
  let currentFolderParent: HTMLElement

  // Get correct relative container and toggle collapsed class
  if (isSvg) {
    childFolderContainer = target.parentElement?.nextSibling as HTMLElement
    currentFolderParent = target.nextElementSibling as HTMLElement

    childFolderContainer.classList.toggle("open")
  } else {
    childFolderContainer = target.parentElement?.parentElement?.nextElementSibling as HTMLElement
    currentFolderParent = target.parentElement as HTMLElement

    childFolderContainer.classList.toggle("open")
  }
  if (!childFolderContainer) return

  // Collapse folder container
  const isCollapsed = childFolderContainer.classList.contains("open")
  setFolderState(childFolderContainer, !isCollapsed)

  // Save folder state to localStorage
  const clickFolderPath = currentFolderParent.dataset.folderpath as string

  const fullFolderPath = clickFolderPath
  toggleCollapsedByPath(explorerState, fullFolderPath)

  const stringifiedFileTree = JSON.stringify(explorerState)
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

    // Add click handlers for all folders (click handler on folder "label")
    if (collapseBehavior === "collapse") {
      Array.prototype.forEach.call(
        document.getElementsByClassName("folder-button"),
        function (item) {
          item.removeEventListener("click", toggleFolder)
          item.addEventListener("click", toggleFolder)
        },
      )
    }

    // Add click handler to main explorer
    explorer.removeEventListener("click", toggleExplorer)
    explorer.addEventListener("click", toggleExplorer)
  }

  // Set up click handlers for each folder (click handler on folder "icon")
  Array.prototype.forEach.call(document.getElementsByClassName("folder-icon"), function (item) {
    item.removeEventListener("click", toggleFolder)
    item.addEventListener("click", toggleFolder)
  })

  if (storageTree && useSavedFolderState) {
    // Get state from localStorage and set folder state
    explorerState = JSON.parse(storageTree)
    explorerState.map((folderUl) => {
      // grab <li> element for matching folder path
      const folderLi = document.querySelector(`[data-folderpath='${folderUl.path}']`) as HTMLElement

      // Get corresponding content <ul> tag and set state
      if (folderLi) {
        const folderUL = folderLi.parentElement?.nextElementSibling
        if (folderUL) {
          setFolderState(folderUL as HTMLElement, folderUl.collapsed)
        }
      }
    })
  } else if (explorer?.dataset.tree) {
    // If tree is not in localStorage or config is disabled, use tree passed from Explorer as dataset
    explorerState = JSON.parse(explorer.dataset.tree)
  }
}

window.addEventListener("resize", setupExplorer)
document.addEventListener("nav", () => {
  setupExplorer()

  observer.disconnect()

  // select pseudo element at end of list
  const lastItem = document.getElementById("explorer-end")
  if (lastItem) {
    observer.observe(lastItem)
  }
})

/**
 * Toggles the state of a given folder
 * @param folderElement <div class="folder-outer"> Element of folder (parent)
 * @param collapsed if folder should be set to collapsed or not
 */
function setFolderState(folderElement: HTMLElement, collapsed: boolean) {
  if (collapsed) {
    folderElement?.classList.remove("open")
  } else {
    folderElement?.classList.add("open")
  }
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
