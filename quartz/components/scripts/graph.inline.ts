import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import * as d3 from "d3"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { CanonicalSlug, getCanonicalSlug, getClientSlug, resolveRelative } from "../../path"

type NodeData = {
  id: CanonicalSlug
  text: string
  tags: string[]
} & d3.SimulationNodeDatum

type LinkData = {
  source: CanonicalSlug
  target: CanonicalSlug
}

const localStorageKey = "graph-visited"
function getVisited(): Set<CanonicalSlug> {
  return new Set(JSON.parse(localStorage.getItem(localStorageKey) ?? "[]"))
}

function addToVisited(slug: CanonicalSlug) {
  const visited = getVisited()
  visited.add(slug)
  localStorage.setItem(localStorageKey, JSON.stringify([...visited]))
}

async function renderGraph(container: string, slug: CanonicalSlug) {
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
  } = JSON.parse(graph.dataset["cfg"]!)

  const data = await fetchData

  const links: LinkData[] = []
  for (const [src, details] of Object.entries<ContentDetails>(data)) {
    const outgoing = details.links ?? []
    for (const dest of outgoing) {
      if (src in data && dest in data) {
        links.push({ source: src as CanonicalSlug, target: dest })
      }
    }
  }

  const neighbourhood = new Set<CanonicalSlug>()
  const wl: (CanonicalSlug | "__SENTINEL")[] = [slug, "__SENTINEL"]
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
    Object.keys(data).forEach((id) => neighbourhood.add(id as CanonicalSlug))
  }

  const graphData: { nodes: NodeData[]; links: LinkData[] } = {
    nodes: [...neighbourhood].map((url) => ({
      id: url,
      text: data[url]?.title ?? url,
      tags: data[url]?.tags ?? [],
    })),
    links: links.filter((l) => neighbourhood.has(l.source) && neighbourhood.has(l.target)),
  }

  const simulation: d3.Simulation<NodeData, LinkData> = d3
    .forceSimulation(graphData.nodes)
    .force("charge", d3.forceManyBody().strength(-100 * repelForce))
    .force(
      "link",
      d3
        .forceLink(graphData.links)
        .id((d: any) => d.id)
        .distance(linkDistance),
    )
    .force("center", d3.forceCenter().strength(centerForce))

  const height = Math.max(graph.offsetHeight, 250)
  const width = graph.offsetWidth

  const svg = d3
    .select<HTMLElement, NodeData>("#" + container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2 / scale, -height / 2 / scale, width / scale, height / scale])

  // draw links between nodes
  const link = svg
    .append("g")
    .selectAll("line")
    .data(graphData.links)
    .join("line")
    .attr("class", "link")
    .attr("stroke", "var(--lightgray)")
    .attr("stroke-width", 1)

  // svg groups
  const graphNode = svg.append("g").selectAll("g").data(graphData.nodes).enter().append("g")

  // calculate color
  const color = (d: NodeData) => {
    const isCurrent = d.id === slug
    if (isCurrent) {
      return "var(--secondary)"
    } else if (visited.has(d.id)) {
      return "var(--tertiary)"
    } else {
      return "var(--gray)"
    }
  }

  const drag = (simulation: d3.Simulation<NodeData, LinkData>) => {
    function dragstarted(event: any, d: NodeData) {
      if (!event.active) simulation.alphaTarget(1).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: NodeData) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    const noop = () => {}
    return d3
      .drag<Element, NodeData>()
      .on("start", enableDrag ? dragstarted : noop)
      .on("drag", enableDrag ? dragged : noop)
      .on("end", enableDrag ? dragended : noop)
  }

  function nodeRadius(d: NodeData) {
    const numLinks = links.filter((l: any) => l.source.id === d.id || l.target.id === d.id).length
    return 2 + Math.sqrt(numLinks)
  }

  // draw individual nodes
  const node = graphNode
    .append("circle")
    .attr("class", "node")
    .attr("id", (d) => d.id)
    .attr("r", nodeRadius)
    .attr("fill", color)
    .style("cursor", "pointer")
    .on("click", (_, d) => {
      const targ = resolveRelative(slug, d.id)
      window.spaNavigate(new URL(targ, getClientSlug(window)))
    })
    .on("mouseover", function (_, d) {
      const neighbours: CanonicalSlug[] = data[slug].links ?? []
      const neighbourNodes = d3
        .selectAll<HTMLElement, NodeData>(".node")
        .filter((d) => neighbours.includes(d.id))
      console.log(neighbourNodes)
      const currentId = d.id
      const linkNodes = d3
        .selectAll(".link")
        .filter((d: any) => d.source.id === currentId || d.target.id === currentId)

      // highlight neighbour nodes
      neighbourNodes.transition().duration(200).attr("fill", color)

      // highlight links
      linkNodes.transition().duration(200).attr("stroke", "var(--gray)").attr("stroke-width", 1)

      const bigFont = fontSize * 1.5

      // show text for self
      const parent = this.parentNode as HTMLElement
      d3.select<HTMLElement, NodeData>(parent)
        .raise()
        .select("text")
        .transition()
        .duration(200)
        .attr("opacityOld", d3.select(parent).select("text").style("opacity"))
        .style("opacity", 1)
        .style("font-size", bigFont + "em")
    })
    .on("mouseleave", function (_, d) {
      const currentId = d.id
      const linkNodes = d3
        .selectAll(".link")
        .filter((d: any) => d.source.id === currentId || d.target.id === currentId)

      linkNodes.transition().duration(200).attr("stroke", "var(--lightgray)")

      const parent = this.parentNode as HTMLElement
      d3.select<HTMLElement, NodeData>(parent)
        .select("text")
        .transition()
        .duration(200)
        .style("opacity", d3.select(parent).select("text").attr("opacityOld"))
        .style("font-size", fontSize + "em")
    })
    // @ts-ignore
    .call(drag(simulation))

  // draw labels
  const labels = graphNode
    .append("text")
    .attr("dx", 0)
    .attr("dy", (d) => -nodeRadius(d) + "px")
    .attr("text-anchor", "middle")
    .text(
      (d) => data[d.id]?.title || (d.id.charAt(1).toUpperCase() + d.id.slice(2)).replace("-", " "),
    )
    .style("opacity", (opacityScale - 1) / 3.75)
    .style("pointer-events", "none")
    .style("font-size", fontSize + "em")
    .raise()
    // @ts-ignore
    .call(drag(simulation))

  // set panning
  if (enableZoom) {
    svg.call(
      d3
        .zoom<SVGSVGElement, NodeData>()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.25, 4])
        .on("zoom", ({ transform }) => {
          link.attr("transform", transform)
          node.attr("transform", transform)
          const scale = transform.k * opacityScale
          const scaledOpacity = Math.max((scale - 1) / 3.75, 0)
          labels.attr("transform", transform).style("opacity", scaledOpacity)
        }),
    )
  }

  // progress the simulation
  simulation.on("tick", () => {
    link
      .attr("x1", (d: any) => d.source.x)
      .attr("y1", (d: any) => d.source.y)
      .attr("x2", (d: any) => d.target.x)
      .attr("y2", (d: any) => d.target.y)
    node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)
    labels.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y)
  })
}

function renderGlobalGraph() {
  const slug = getCanonicalSlug(window)
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

document.addEventListener("nav", async (e: unknown) => {
  const slug = (e as CustomEventMap["nav"]).detail.url
  addToVisited(slug)
  await renderGraph("graph-container", slug)

  const containerIcon = document.getElementById("global-graph-icon")
  containerIcon?.removeEventListener("click", renderGlobalGraph)
  containerIcon?.addEventListener("click", renderGlobalGraph)
})
