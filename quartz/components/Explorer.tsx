import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import explorerStyle from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { ExplorerNode, FileNode, Options } from "./ExplorerNode"
import { GlobalConfiguration } from "../cfg"

// Options interface defined in `ExplorerNode` to avoid circular dependency
const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  title: "Explorer",
  folderClickBehavior: "collapse",
  folderDefaultState: "collapsed",
})
export default ((userOpts?: Partial<Options>) => {
  function Explorer({ allFiles, displayClass, cfg }: QuartzComponentProps) {
    // Parse config
    const opts: Options = { ...defaultOptions(cfg), ...userOpts }

    // Construct tree from allFiles
    const fileTree = new FileNode("")
    allFiles.forEach((file) => fileTree.add(file, 1))

    // Sort tree (folders first, then files (alphabetic))
    fileTree.sort()

    // Get all folders of tree. Initialize with collapsed state
    const folders = fileTree.getFolderPaths(opts.folderDefaultState === "collapsed")
    // console.log("=====")
    // console.log("Folders: ", folders)

    // Stringify to pass json tree as data attribute ([data-tree])
    const jsonTree = JSON.stringify(folders)

    return (
      <div class={`explorer ${displayClass}`}>
        <button
          type="button"
          id="explorer"
          data-behavior={opts.folderClickBehavior}
          data-collapsed={opts.folderDefaultState}
          data-tree={jsonTree}
        >
          <h3>{opts.title}</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        </button>
        <div id="explorer-content">
          <ul class="overflow">
            <ExplorerNode node={fileTree} opts={opts} />
          </ul>
        </div>
      </div>
    )
  }
  Explorer.css = explorerStyle
  Explorer.afterDOMLoaded = script
  return Explorer
}) satisfies QuartzComponentConstructor
