import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import modernStyle from "./styles/explorer.scss"

// @ts-ignore
import script from "./scripts/explorer.inline"
import { Data } from "vfile"
import { ExplorerNode, FileNode } from "./ExplorerNode"

interface Options {
  layout: "modern" | "legacy"
}

const defaultOptions: Options = {
  layout: "modern",
}

function Explorer({ fileData, allFiles, tree }: QuartzComponentProps) {
  const fileTree = new FileNode("")
  console.time("Tree")
  allFiles.forEach(
    (p) => fileTree.add(p, 1),
    // p.filePath!.split("/").reduce((o: any, k: string) => (o[k] = o[k] || {}), result),
  )
  console.timeEnd("Tree")
  console.log("---")
  fileTree.sort()
  fileTree.print()

  return (
    <div class={`toc`}>
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
      <div id="toc-content">
        <ul class="overflow">
          <ExplorerNode node={fileTree} />
        </ul>
      </div>
    </div>
  )
}
Explorer.css = modernStyle
Explorer.afterDOMLoaded = script

export default ((opts?: Partial<Options>) => {
  return Explorer
}) satisfies QuartzComponentConstructor
