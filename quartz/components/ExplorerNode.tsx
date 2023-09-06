// @ts-ignore
import { Data } from "vfile"

export interface Options {
  title: string
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
}

type DataWrapper = {
  file: Data
  path: string[]
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
}

export function ExplorerNode({ node, opts }: ExplorerNodeProps) {
  const folderBehavior = opts.folderClickBehavior
  const collapseFolders = opts.folderDefaultState !== "collapsed"
  return (
    <div class={`${node.depth > 0 ? "no-pointer" : ""}`}>
      {node.file ? (
        <li key={node.file.slug} class="no-pointer">
          <a
            href={`/${node.file.slug}`}
            data-for={node.file.slug}
            class={`clickable ${node.depth > 1 ? "no-pointer" : ""}`}
          >
            {node.file.frontmatter?.title}
          </a>
        </li>
      ) : (
        <div>
          {node.name !== "" && (
            <div class={`folder-container ${node.depth > 1 ? "no-pointer" : ""}`}>
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
                  node.depth > 1 ? "no-pointer" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <li key={node.name} class="no-pointer">
                {folderBehavior === "link" ? (
                  <a href={`/${node.name}`} data-for={node.name}>
                    {node.name}
                  </a>
                ) : (
                  <button class={`folder-button clickable ${node.depth > 1 ? "no-pointer" : ""}`}>
                    <h3>{node.name}</h3>
                  </button>
                )}
              </li>
            </div>
          )}
          <ul
            style={{
              paddingLeft: node.name !== "" ? "1.4rem" : "0",
              opacity: node.depth > 0 && !collapseFolders ? "0" : "1",
              maxHeight: node.depth > 0 && !collapseFolders ? "0" : "inherit",
            }}
            class="content"
          >
            {node.children.map((childNode, i) => (
              <ExplorerNode node={childNode} key={i} opts={opts} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
