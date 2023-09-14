// @ts-ignore
import { Data } from "vfile"

export interface Options {
  title: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
}

type DataWrapper = {
  file: Data
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
  file: Data | null
  depth: number

  constructor(name: string, file?: Data, depth?: number) {
    this.children = []
    this.name = name
    this.file = file ?? null
    this.depth = depth ?? 0
  }

  private insert(file: DataWrapper, depth: number) {
    this.depth = ++depth
    if (file.path.length === 1) {
      this.children.push(new FileNode(file.file.frontmatter!.title, file.file, this.depth + 1))
    } else {
      const next = file.path[0]
      file.path = file.path.splice(1)
      for (const child of this.children) {
        if (child.name === next) {
          child.insert(file, this.depth)
          return
        }
      }

      const newChild = new FileNode(next)
      newChild.insert(file, this.depth)
      this.children.push(newChild)
    }
  }

  // Add new file to tree
  add(file: Data, splice: number = 0) {
    this.insert({ file, path: file.filePath!.split("/").splice(splice) }, -1)
  }

  // Print tree structure (for debugging)
  print(depth: number = 0) {
    let folderChar = ""
    if (!this.file) folderChar = "|"
    console.log("-".repeat(depth), folderChar, this.name, this.depth)
    this.children.forEach((e) => e.print(depth + 1))
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
  sort() {
    this.children = this.children.sort((a, b) => {
      if ((!a.file && !b.file) || (a.file && b.file)) {
        return a.name.localeCompare(b.name)
      }
      if (a.file && !b.file) {
        return 1
      } else {
        return -1
      }
    })

    this.children.forEach((e) => e.sort())
  }
}

type ExplorerNodeProps = {
  node: FileNode
  opts: Options
  fullPath?: string
}

export function ExplorerNode({ node, opts, fullPath }: ExplorerNodeProps) {
  // Get options
  const folderBehavior = opts.folderClickBehavior
  const collapseFolders = opts.folderDefaultState === "collapsed"

  // Calculate current folderPath
  let pathOld = fullPath ? fullPath : ""
  let folderPath = ""
  if (node.name !== "") {
    folderPath = `${pathOld}/${node.name}`
  }

  // Helpers to disable pointer-events and opacity for all appropriate elements
  const isInvisInner = node.depth > 1 && collapseFolders
  const isInvisOuter = node.depth > 0 && collapseFolders

  return (
    <div class={`${isInvisOuter ? "no-pointer" : ""}`}>
      {node.file ? (
        // Single file node
        <li key={node.file.slug} class="no-pointer">
          <a
            href={`/${node.file.slug}`}
            data-for={node.file.slug}
            class={`clickable ${isInvisInner ? "no-pointer" : ""}`}
          >
            {node.file.frontmatter?.title}
          </a>
        </li>
      ) : (
        <div>
          {node.name !== "" && (
            // Node with entire folder
            // Render svg button + folder name, then children
            <div class={`folder-container ${isInvisInner ? "no-pointer" : ""}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class={`${collapseFolders && "collapsed-folder"} folder-icon clickable ${
                  isInvisInner ? "no-pointer" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              {/* render <a> tag if folderBehavior is "link", otherwise render <button> with collapse click event */}
              <li key={node.name} class="no-pointer" data-folderpath={folderPath}>
                {folderBehavior === "link" ? (
                  <a
                    href={`${folderPath}`}
                    data-for={node.name}
                    class={`clickable folder-title ${isInvisInner ? "no-pointer" : ""}`}
                  >
                    {node.name}
                  </a>
                ) : (
                  <button class={`folder-button clickable ${isInvisInner ? "no-pointer" : ""}`}>
                    <h3 class="folder-title">{node.name}</h3>
                  </button>
                )}
              </li>
            </div>
          )}
          {/* Recursively render children of folder */}
          <div class={`folder-outer ${node.depth === 0 ? "open" : ""}`}>
            <ul
              // Needs inline styling for options
              // padding: only add padding if node is not root node
              // opacity + maxHeight: set to 0 if folders should be collapsed by default
              style={{
                paddingLeft: node.name !== "" ? "1.4rem" : "0",
                // opacity: isInvisOuter ? "0" : "1",
                // maxHeight: node.name !== "" && isInvisOuter ? "0" : "none",
              }}
              class="content"
              data-folderul={folderPath}
            >
              {node.children.map((childNode, i) => (
                <ExplorerNode node={childNode} key={i} opts={opts} fullPath={folderPath} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
