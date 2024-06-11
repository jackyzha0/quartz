import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import type { SimulationNodeDatum } from "d3"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, SimpleSlug, getFullSlug, resolveRelative, simplifySlug } from "../../util/path"
import { renderCanvasGraph } from "./graphCanvasRender.inline"
import { renderSvgGraph } from "./graphSvgRender.inline"
type NodeData = {
  id: SimpleSlug
  text: string
  tags: string[]
} & SimulationNodeDatum

type LinkData = {
  source: SimpleSlug
  target: SimpleSlug
}

const localStorageKey = "graph-visited"
function getVisited(): Set<SimpleSlug> {
  return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? "[]"))
}

function addToVisited(slug: SimpleSlug) {
  const visited = getVisited()
  visited.add(slug)
  localStorage.setItem(localStorageKey, JSON.stringify([...visited]))
}

async function renderGraph(container: string, fullSlug: FullSlug) {
  const slug = simplifySlug(fullSlug)
  const visited = getVisited()
  const graph = document.getElementById(container)
  if (!graph) return
  removeAllChildren(graph)

  let {
    drag: enableDrag,
    zoom: enableZoom,
    depth,
    scale,
    repelForce,
    centerForce,
    linkDistance,
    fontSize,
    opacityScale,
    removeTags,
    showTags,
    focusOnHover,
    useCanvas,
  } = JSON.parse(graph.dataset["cfg"]!)

  const data: Map<SimpleSlug, ContentDetails> = new Map(
    Object.entries<ContentDetails>(await fetchData).map(([k, v]) => [
      simplifySlug(k as FullSlug),
      v,
    ]),
  )
  const links: LinkData[] = []
  const tags: SimpleSlug[] = []

  const validLinks = new Set(data.keys())
  for (const [source, details] of data.entries()) {
    const outgoing = details.links ?? []

    for (const dest of outgoing) {
      if (validLinks.has(dest)) {
        links.push({ source: source, target: dest })
      }
    }

    if (showTags) {
      const localTags = details.tags
        .filter((tag) => !removeTags.includes(tag))
        .map((tag) => simplifySlug(("tags/" + tag) as FullSlug))

      tags.push(...localTags.filter((tag) => !tags.includes(tag)))

      for (const tag of localTags) {
        links.push({ source: source, target: tag })
      }
    }
  }

  const neighbourhood = new Set<SimpleSlug>()
  const wl: (SimpleSlug | "__SENTINEL")[] = [slug, "__SENTINEL"]
  if (depth >= 0) {
    while (depth >= 0 && wl.length > 0) {
      // compute neighbours
      const cur = wl.shift()!
      if (cur === "__SENTINEL") {
        depth--
        wl.push("__SENTINEL")
      } else {
        neighbourhood.add(cur)
        const outgoing = links.filter((l) => l.source === cur)
        const incoming = links.filter((l) => l.target === cur)
        wl.push(...outgoing.map((l) => l.target), ...incoming.map((l) => l.source))
      }
    }
  } else {
    validLinks.forEach((id) => neighbourhood.add(id))
    if (showTags) tags.forEach((tag) => neighbourhood.add(tag))
  }

  const graphData: { nodes: NodeData[]; links: LinkData[] } = {
    nodes: [...neighbourhood].map((url) => {
      const text = url.startsWith("tags/") ? "#" + url.substring(5) : data.get(url)?.title ?? url
      return {
        id: url,
        text: text,
        tags: data.get(url)?.tags ?? [],
      }
    }),
    links: links.filter((l) => neighbourhood.has(l.source) && neighbourhood.has(l.target)),
  }
  ;(useCanvas ? renderCanvasGraph : renderSvgGraph)(graph, {
    onNodeClick: (node) => {
      const targ = resolveRelative(fullSlug, node.id as FullSlug)
      window.spaNavigate(new URL(targ, window.location.toString()))
    },
    graphData,
    slug,
    visited,
    enableDrag: enableDrag,
    enableZoom: enableZoom,
    depth,
    scale,
    repelForce,
    centerForce,
    linkDistance,
    fontSize,
    opacityScale,
    focusOnHover,
  })
}

function renderGlobalGraph() {
  const slug = getFullSlug(window)
  const container = document.getElementById("global-graph-outer")
  const sidebar = container?.closest(".sidebar") as HTMLElement
  container?.classList.add("active")
  if (sidebar) {
    sidebar.style.zIndex = "1"
  }

  renderGraph("global-graph-container", slug)

  function hideGlobalGraph() {
    container?.classList.remove("active")
    const graph = document.getElementById("global-graph-container")
    if (sidebar) {
      sidebar.style.zIndex = "unset"
    }
    if (!graph) return
    removeAllChildren(graph)
  }

  registerEscapeHandler(container, hideGlobalGraph)
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  addToVisited(simplifySlug(slug))
  await renderGraph("graph-container", slug)

  const containerIcon = document.getElementById("global-graph-icon")
  containerIcon?.addEventListener("click", renderGlobalGraph)
  window.addCleanup(() => containerIcon?.removeEventListener("click", renderGlobalGraph))
})
