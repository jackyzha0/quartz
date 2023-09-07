import { FolderState } from "../ExplorerNode"

// Current filetree
// TODO: fix type (should be folder structure)
let fileTree: FolderState[]

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

  // const after = getDeepValue(fileTree, clickFolderPath.substring(1))
  // console.log("After: ", after)

  // Collapse folder container
  const isCollapsed = childFolderContainer.style.maxHeight === "0px"

  // Calculate total height (height of content managed by event + height of all children)
  // TODO: figure out max height issue for outer
  let totalHeight = childFolderContainer.scrollHeight
  Array.prototype.forEach.call(
    childFolderContainer.getElementsByClassName("content"),
    function (item) {
      totalHeight += item.scrollHeight
    },
  )

  // FolderContainer: <ul>
  childFolderContainer.style.opacity = isCollapsed ? "1" : "0"
  childFolderContainer.style.maxHeight = isCollapsed ? totalHeight + "px" : "0px"
  childFolderContainer.classList.toggle("no-pointer")

  // Set no-pointer for all child items recursively
  Array.prototype.forEach.call(
    childFolderContainer.getElementsByClassName("clickable"),
    function (item) {
      if (isCollapsed) {
        item.classList.remove("no-pointer")
      } else {
        item.classList.add("no-pointer")
      }
    },
  )

  // Extract folderName by going to parent and grabbing first with class "folder-title" (if you dont go to parent, you only target sub folders)
  // const folderName =
  //   childFolderContainer.parentElement?.getElementsByClassName("folder-title")[0].textContent
  // console.log("Folder container: ", folderName)
  let currentFolderParent: HTMLElement
  if (isSvg) {
    currentFolderParent = target.nextElementSibling as HTMLElement
  } else {
    currentFolderParent = target.parentElement as HTMLElement
  }
  const clickFolderPath = currentFolderParent.dataset.folderpath as string

  // Remove leading "/"
  const fullFolderPath = clickFolderPath.substring(1)
  toggleCollapsedByPath(fileTree, fullFolderPath)

  const stringifiedFileTree = JSON.stringify(fileTree)
  localStorage.setItem("fileTree", stringifiedFileTree)
}

function setupExplorer() {
  // Set click handler for collapsing entire explorer
  const explorer = document.getElementById("explorer")

  // Get folder state from local storage
  const storageTree = localStorage.getItem("fileTree")

  if (explorer) {
    // Get config
    const collapseBehavior = explorer.dataset.behavior
    if (storageTree) {
      fileTree = JSON.parse(storageTree)
      console.log("tree storage: ", fileTree)

      // console.log("First entry: ", fileTree[0])
      const el = document.querySelector(`[data-folderpath='/${fileTree[0].path}']`)
      console.log("Got elemenet: ", el)

      // TODO: set appropriate state for each folder from storage
    } else {
      fileTree = JSON.parse(explorer.dataset.tree as string)
      console.log("tree raw: ", fileTree)
    }

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

const getDeepValue = (obj: any, path: string) => path.split("/").reduce((a, v) => a[v], obj)

function setFolderState(folder: HTMLElement, collapsed: boolean) {}

/**
 * Toggles visibility of a folder
 * @param obj tree of folders (generated from `FileNode.getFolders()`)
 * @param path path to folder (e.g. 'advanced/more/more2')
 */
const toggleVisibility = (obj: any, path: string) => {
  const keys = path.split("/")
  const lastKey = keys.pop() as string

  let currentObj = obj
  for (const key of keys) {
    if (!currentObj[key]) {
      currentObj[key] = {}
    }
    currentObj = currentObj[key]
  }

  currentObj[lastKey].collapsed = !currentObj[lastKey].collapsed
}

// TODO: optimize getFolders to include leading "/"
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
