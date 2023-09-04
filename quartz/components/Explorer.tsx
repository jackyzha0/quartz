import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import explorerStyle from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { ExplorerNode, FileNode } from "./ExplorerNode"

function Explorer({ allFiles, displayClass }: QuartzComponentProps) {
  // Construct tree from allFiles
  const fileTree = new FileNode("")
  allFiles.forEach((file) => fileTree.add(file, 1))

  // Sort tree (folders first, then files (alphabetic))
  fileTree.sort()

  return (
    <div class={`explorer ${displayClass}`}>
      <button type="button" id="explorer">
        <h3>Explorer</h3>
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
          <ExplorerNode node={fileTree} />
        </ul>
      </div>
    </div>
  )
}
Explorer.css = explorerStyle
Explorer.afterDOMLoaded = script

export default (() => Explorer) satisfies QuartzComponentConstructor
