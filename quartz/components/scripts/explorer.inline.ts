import { FolderState } from "../ExplorerNode"

// Current state of folders
type MaybeHTMLElement = HTMLElement | undefined
let currentExplorerState: FolderState[]

const observer = new IntersectionObserver((entries) => {
  // If last element is observed, remove gradient of "overflow" class so element is visible
  const explorerUl = document.getElementById("explorer-ul")
  if (!explorerUl) return
  for (const entry of entries) {
    if (entry.isIntersecting) {
      explorerUl.classList.add("no-background")
    } else {
      explorerUl.classList.remove("no-background")
    }
  }
})

function toggleExplorer(this: HTMLElement) {
  // Toggle collapsed state of entire explorer
  this.classList.toggle("collapsed")

  // Toggle collapsed aria state of entire explorer
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )

  const content = (
    this.nextElementSibling?.nextElementSibling
      ? this.nextElementSibling.nextElementSibling
      : this.nextElementSibling
  ) as MaybeHTMLElement
  if (!content) return
  content.classList.toggle("collapsed")
  content.classList.toggle("explorer-viewmode")

  // Prevent scroll under
  if (document.querySelector("#mobile-explorer")) {
    // Disable scrolling one the page when the explorer is opened on mobile
    const bodySelector = document.querySelector("#quartz-body")
    if (bodySelector) bodySelector.classList.toggle("lock-scroll")
  }
}

function toggleFolder(evt: MouseEvent) {
  evt.stopPropagation()

  // Element that was clicked
  const target = evt.target as MaybeHTMLElement
  if (!target) return

  // Check if target was svg icon or button
  const isSvg = target.nodeName === "svg"

  // corresponding <ul> element relative to clicked button/folder
  const childFolderContainer = (
    isSvg
      ? target.parentElement?.nextSibling
      : target.parentElement?.parentElement?.nextElementSibling
  ) as MaybeHTMLElement
  const currentFolderParent = (
    isSvg ? target.nextElementSibling : target.parentElement
  ) as MaybeHTMLElement
  if (!(childFolderContainer && currentFolderParent)) return
  // <li> element of folder (stores folder-path dataset)
  childFolderContainer.classList.toggle("open")

  // Collapse folder container
  const isCollapsed = childFolderContainer.classList.contains("open")
  setFolderState(childFolderContainer, !isCollapsed)

  // Save folder state to localStorage
  const fullFolderPath = currentFolderParent.dataset.folderpath as string
  toggleCollapsedByPath(currentExplorerState, fullFolderPath)
  const stringifiedFileTree = JSON.stringify(currentExplorerState)
  localStorage.setItem("fileTree", stringifiedFileTree)
}

function setupExplorer() {
  // Set click handler for collapsing entire explorer
  const allExplorers = document.querySelectorAll(".explorer > button") as NodeListOf<HTMLElement>

  for (const explorer of allExplorers) {
    // Get folder state from local storage
    const storageTree = localStorage.getItem("fileTree")

    // Convert to bool
    const useSavedFolderState = explorer?.dataset.savestate === "true"

    if (explorer) {
      // Get config
      const collapseBehavior = explorer.dataset.behavior

      // Add click handlers for all folders (click handler on folder "label")
      if (collapseBehavior === "collapse") {
        for (const item of document.getElementsByClassName(
          "folder-button",
        ) as HTMLCollectionOf<HTMLElement>) {
          window.addCleanup(() => explorer.removeEventListener("click", toggleExplorer))
          item.addEventListener("click", toggleFolder)
        }
      }

      // Add click handler to main explorer
      window.addCleanup(() => explorer.removeEventListener("click", toggleExplorer))
      explorer.addEventListener("click", toggleExplorer)
    }

    // Set up click handlers for each folder (click handler on folder "icon")
    for (const item of document.getElementsByClassName(
      "folder-icon",
    ) as HTMLCollectionOf<HTMLElement>) {
      item.addEventListener("click", toggleFolder)
      window.addCleanup(() => item.removeEventListener("click", toggleFolder))
    }

    // Get folder state from local storage
    const oldExplorerState: FolderState[] =
      storageTree && useSavedFolderState ? JSON.parse(storageTree) : []
    const oldIndex = new Map(oldExplorerState.map((entry) => [entry.path, entry.collapsed]))
    const newExplorerState: FolderState[] = explorer.dataset.tree
      ? JSON.parse(explorer.dataset.tree)
      : []
    currentExplorerState = []

    for (const { path, collapsed } of newExplorerState) {
      currentExplorerState.push({
        path,
        collapsed: oldIndex.get(path) ?? collapsed,
      })
    }

    currentExplorerState.map((folderState) => {
      const folderLi = document.querySelector(
        `[data-folderpath='${folderState.path.replace("'", "-")}']`,
      ) as MaybeHTMLElement
      const folderUl = folderLi?.parentElement?.nextElementSibling as MaybeHTMLElement
      if (folderUl) {
        setFolderState(folderUl, folderState.collapsed)
      }
    })
  }
}

function toggleExplorerFolders() {
  const currentFile = (document.querySelector("body")?.getAttribute("data-slug") ?? "").replace(
    /\/index$/g,
    "",
  )
  const listToReplace = document.querySelectorAll(".folder-outer:has(> ul[data-folderul]")

  listToReplace.forEach((element) => {
    if (element.children.length > 0) {
      if (currentFile.includes(element.firstElementChild?.getAttribute("data-folderul") ?? "")) {
        if (!element.classList.contains("open")) {
          element.classList.add("open")
        }
      }
    }
  })
}

window.addEventListener("resize", setupExplorer)

document.addEventListener("nav", () => {
  const explorer = document.querySelector("#mobile-explorer")
  if (explorer) {
    explorer.classList.add("collapsed")
    const content = explorer.nextElementSibling?.nextElementSibling as HTMLElement
    if (content) {
      content.classList.add("collapsed")
      content.classList.toggle("explorer-viewmode")
    }
  }
  setupExplorer()

  observer.disconnect()

  // select pseudo element at end of list
  const lastItem = document.getElementById("explorer-end")
  if (lastItem) {
    observer.observe(lastItem)
  }

  toggleExplorerFolders()
})

/**
 * Toggles the state of a given folder
 * @param folderElement <div class="folder-outer"> Element of folder (parent)
 * @param collapsed if folder should be set to collapsed or not
 */
function setFolderState(folderElement: HTMLElement, collapsed: boolean) {
  return collapsed ? folderElement.classList.remove("open") : folderElement.classList.add("open")
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
