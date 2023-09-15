// @ts-ignore
import { QuartzPluginData } from "vfile"
import { resolveRelative } from "../util/path"

export interface Options {
  title: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
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
  file: QuartzPluginData | null
  depth: number

  constructor(name: string, file?: QuartzPluginData, depth?: number) {
    this.children = []
    this.name = name
    this.file = file ?? null
    this.depth = depth ?? 0
  }

  private insert(file: DataWrapper) {
    if (file.path.length === 1) {
      this.children.push(new FileNode(file.file.frontmatter!.title, file.file, this.depth + 1))
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
    <div>
      {node.file ? (
        // Single file node
        <li key={node.file.slug}>
          <a href={resolveRelative(fileData.slug!, node.file.slug!)} data-for={node.file.slug}>
            {node.file.frontmatter?.title}
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
              <li key={node.name} data-folderpath={folderPath}>
                {folderBehavior === "link" ? (
                  <a href={`${folderPath}`} data-for={node.name} class="folder-title">
                    {node.name}
                  </a>
                ) : (
                  <button class="folder-button">
                    <h3 class="folder-title">{node.name}</h3>
                  </button>
                )}
              </li>
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
    </div>
  )
}
