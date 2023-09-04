import { Data } from "vfile"

type DataWrapper = {
  file: Data
  path: string[]
}

export class FileNode {
  children: FileNode[]
  name: string
  file: Data | null

  constructor(name: string, file?: Data) {
    this.children = []
    this.name = name
    this.file = file ?? null
  }

  private insert(file: DataWrapper) {
    if (file.path.length === 1) {
      this.children.push(new FileNode(file.file.frontmatter!.title, file.file))
    } else {
      const next = file.path[0]
      file.path = file.path.splice(1)
      for (const child of this.children) {
        if (child.name === next) {
          child.insert(file)
          return
        }
      }

      const newChild = new FileNode(next)
      newChild.insert(file)
      this.children.push(newChild)
    }
  }

  add(file: Data, splice: number = 0) {
    this.insert({ file, path: file.filePath!.split("/").splice(splice) })
  }

  print(depth: number = 0) {
    let folderChar = ""
    if (!this.file) folderChar = "|"
    console.log("-".repeat(depth), folderChar, this.name)
    this.children.forEach((e) => e.print(depth + 1))
  }

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
}

export function ExplorerNode({ node }: ExplorerNodeProps) {
  return (
    <>
      {node.file ? (
        <li key={node.file.slug}>
          <a href={`/${node.file.slug}`} data-for={node.file.slug}>
            {node.file.frontmatter?.title}
          </a>
        </li>
      ) : (
        <div style={{ flexDirection: "column", display: "flex", alignItems: "left" }}>
          {node.name !== "" && (
            <div style={{ flexDirection: "row", display: "flex", alignItems: "center" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="fold"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              <li key={node.name}>
                <a href={`/${node.name}`} data-for={node.name}>
                  {node.name}
                </a>
              </li>
            </div>
          )}
          <ul style={{ paddingLeft: node.name !== "" ? "1.4rem" : "0" }}>
            {node.children.map((childNode, i) => (
              <ExplorerNode node={childNode} key={i} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
