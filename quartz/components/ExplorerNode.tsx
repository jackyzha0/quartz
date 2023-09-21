// @ts-ignore
import { QuartzPluginData } from "../plugins/vfile"
import { resolveRelative } from "../util/path"

type OrderEntries = "sort" | "filter" | "map"

export interface Options {
  title: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
  sortFn: (a: FileNode, b: FileNode) => number
  filterFn?: (node: FileNode) => boolean
  mapFn?: (node: FileNode) => void
  order?: OrderEntries[]
}

type DataWrapper = {
  file: QuartzPluginData
  path: string[]
}

export type FolderState = {
  path: string
  collapsed: boolean
}

// Structure to add all files into a tree
export class FileNode {
  children: FileNode[]
  name: string
  displayName: string
  file: QuartzPluginData | null
  depth: number

  constructor(name: string, file?: QuartzPluginData, depth?: number) {
    this.children = []
    this.name = name
    this.displayName = name
    this.file = file ? structuredClone(file) : null
    this.depth = depth ?? 0
  }

  private insert(file: DataWrapper) {
    if (file.path.length === 1) {
      if (file.path[0] !== "index.md") {
        this.children.push(new FileNode(file.file.frontmatter!.title, file.file, this.depth + 1))
      } else {
        const title = file.file.frontmatter?.title
        if (title && title !== "index" && file.path[0] === "index.md") {
          this.displayName = title
        }
      }
    } else {
      const next = file.path[0]
      file.path = file.path.splice(1)
      for (const child of this.children) {
        if (child.name === next) {
          child.insert(file)
          return
        }
      }

      const newChild = new FileNode(next, undefined, this.depth + 1)
      newChild.insert(file)
      this.children.push(newChild)
    }
  }

  // Add new file to tree
  add(file: QuartzPluginData, splice: number = 0) {
    this.insert({ file, path: file.filePath!.split("/").splice(splice) })
  }

  // Print tree structure (for debugging)
  print(depth: number = 0) {
    let folderChar = ""
    if (!this.file) folderChar = "|"
    console.log("-".repeat(depth), folderChar, this.name, this.depth)
    this.children.forEach((e) => e.print(depth + 1))
  }

  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.filter()`, but modifies tree in place
   * @param filterFn function to filter tree with
   */
  filter(filterFn: (node: FileNode) => boolean) {
    this.children = this.children.filter(filterFn)
    this.children.forEach((child) => child.filter(filterFn))
  }

  /**
   * Filter FileNode tree. Behaves similar to `Array.prototype.map()`, but modifies tree in place
   * @param mapFn function to use for mapping over tree
   */
  map(mapFn: (node: FileNode) => void) {
    mapFn(this)

    this.children.forEach((child) => child.map(mapFn))
  }

  /**
   * Get folder representation with state of tree.
   * Intended to only be called on root node before changes to the tree are made
   * @param collapsed default state of folders (collapsed by default or not)
   * @returns array containing folder state for tree
   */
  getFolderPaths(collapsed: boolean): FolderState[] {
    const folderPaths: FolderState[] = []

    const traverse = (node: FileNode, currentPath: string) => {
      if (!node.file) {
        const folderPath = currentPath + (currentPath ? "/" : "") + node.name
        if (folderPath !== "") {
          folderPaths.push({ path: folderPath, collapsed })
        }
        node.children.forEach((child) => traverse(child, folderPath))
      }
    }

    traverse(this, "")

    return folderPaths
  }

  // Sort order: folders first, then files. Sort folders and files alphabetically
  /**
   * Sorts tree according to sort/compare function
   * @param sortFn compare function used for `.sort()`, also used recursively for children
   */
  sort(sortFn: (a: FileNode, b: FileNode) => number) {
    this.children = this.children.sort(sortFn)
    this.children.forEach((e) => e.sort(sortFn))
  }
}

type ExplorerNodeProps = {
  node: FileNode
  opts: Options
  fileData: QuartzPluginData
  fullPath?: string
}

export function ExplorerNode({ node, opts, fullPath, fileData }: ExplorerNodeProps) {
  // Get options
  const folderBehavior = opts.folderClickBehavior
  const isDefaultOpen = opts.folderDefaultState === "open"

  // Calculate current folderPath
  let pathOld = fullPath ? fullPath : ""
  let folderPath = ""
  if (node.name !== "") {
    folderPath = `${pathOld}/${node.name}`
  }

  return (
    <li>
      {node.file ? (
        // Single file node
        <li key={node.file.slug}>
          <a href={resolveRelative(fileData.slug!, node.file.slug!)} data-for={node.file.slug}>
            {node.displayName}
          </a>
        </li>
      ) : (
        <div>
          {node.name !== "" && (
            // Node with entire folder
            // Render svg button + folder name, then children
            <div class="folder-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="5 8 14 8"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="folder-icon"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              {/* render <a> tag if folderBehavior is "link", otherwise render <button> with collapse click event */}
              <div key={node.name} data-folderpath={folderPath}>
                {folderBehavior === "link" ? (
                  <a href={`${folderPath}`} data-for={node.name} class="folder-title">
                    {node.displayName}
                  </a>
                ) : (
                  <button class="folder-button">
                    <p class="folder-title">{node.displayName}</p>
                  </button>
                )}
              </div>
            </div>
          )}
          {/* Recursively render children of folder */}
          <div class={`folder-outer ${node.depth === 0 || isDefaultOpen ? "open" : ""}`}>
            <ul
              // Inline style for left folder paddings
              style={{
                paddingLeft: node.name !== "" ? "1.4rem" : "0",
              }}
              class="content"
              data-folderul={folderPath}
            >
              {node.children.map((childNode, i) => (
                <ExplorerNode
                  node={childNode}
                  key={i}
                  opts={opts}
                  fullPath={folderPath}
                  fileData={fileData}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}
