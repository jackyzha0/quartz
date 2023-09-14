import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import explorerStyle from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { ExplorerNode, FileNode, Options } from "./ExplorerNode"

// Options interface defined in `ExplorerNode` to avoid circular dependency
const defaultOptions = (): Options => ({
  title: "Explorer",
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
  useSavedState: true,
})
export default ((userOpts?: Partial<Options>) => {
  function Explorer({ allFiles, displayClass, fileData }: QuartzComponentProps) {
    // Parse config
    const opts: Options = { ...defaultOptions(), ...userOpts }

    // Construct tree from allFiles
    const fileTree = new FileNode("")
    allFiles.forEach((file) => fileTree.add(file, 1))

    // Sort tree (folders first, then files (alphabetic))
    fileTree.sort()

    // Get all folders of tree. Initialize with collapsed state
    const folders = fileTree.getFolderPaths(opts.folderDefaultState === "collapsed")

    // Stringify to pass json tree as data attribute ([data-tree])
    const jsonTree = JSON.stringify(folders)

    return (
      <div class={`explorer ${displayClass}`}>
        <button
          type="button"
          id="explorer"
          data-behavior={opts.folderClickBehavior}
          data-collapsed={opts.folderDefaultState}
          data-savestate={opts.useSavedState}
          data-tree={jsonTree}
        >
          <h3>{opts.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="5 8 14 8"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div id="explorer-content">
          <ul class="overflow">
            <ExplorerNode node={fileTree} opts={opts} fileData={fileData} />
          </ul>
        </div>
      </div>
    )
  }
  Explorer.css = explorerStyle
  Explorer.afterDOMLoaded = script
  return Explorer
}) satisfies QuartzComponentConstructor
