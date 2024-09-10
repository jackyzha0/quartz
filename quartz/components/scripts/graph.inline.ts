import type {ContentDetails} from "../../plugins/emitters/contentIndex"
import * as d3 from "d3"
import {registerEscapeHandler, removeAllChildren} from "./util"
import {
  FullSlug,
  SimpleSlug,
  getFullSlug,
  resolveRelative,
  simplifySlug,
} from "../../util/path"

type NodeData = {
  id: SimpleSlug
  text: string
  tags: string[]
} & SimulationNodeDatum

type SimpleLinkData = {
  source: SimpleSlug
  target: SimpleSlug
}

type LinkData = {
  source: NodeData
  target: NodeData
} & SimulationLinkDatum<NodeData>

type LinkRenderData = GraphicsInfo & {
  simulationData: LinkData
}

type NodeRenderData = GraphicsInfo & {
  simulationData: NodeData
  label: Text
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

type TweenNode = {
  update: (time: number) => void
  stop: () => void
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
  } = JSON.parse(graph.dataset["cfg"]!) as D3Config

  const data: Map<SimpleSlug, ContentDetails> = new Map(
    Object.entries<ContentDetails>(await fetchData).map(([k, v]) => [
      simplifySlug(k as FullSlug),
      v,
    ]),
  )
  const links: SimpleLinkData[] = []
  const tags: SimpleSlug[] = []
  const validLinks = new Set(data.keys())

  const tweens = new Map<string, TweenNode>()
  for (const [source, details] of data.entries()) {
    const outgoing = details.links ?? []

    for (const dest of outgoing) {
      if (validLinks.has(dest)) {
        links.push({source: source, target: dest})
      }
    }

    if (showTags) {
      const localTags = details.tags
        .filter((tag) => !removeTags.includes(tag))
        .map((tag) => simplifySlug(("tags/" + tag) as FullSlug))

      tags.push(...localTags.filter((tag) => !tags.includes(tag)))

      for (const tag of localTags) {
        links.push({source: source, target: tag})
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
        wl.push(
          ...outgoing.map((l) => l.target),
          ...incoming.map((l) => l.source),
        )
      }
    }
  } else {
    validLinks.forEach((id) => neighbourhood.add(id))
    if (showTags) tags.forEach((tag) => neighbourhood.add(tag))
  }

  const graphData: {nodes: NodeData[]; links: LinkData[]} = {
    nodes: [...neighbourhood].map((url) => {
      const text = url.startsWith("tags/")
        ? "#" + url.substring(5)
        : data.get(url)?.title ?? url
      return {
        id: url,
        text: text,
        tags: data.get(url)?.tags ?? [],
      }
    }),
    links: links.filter(
      (l) => neighbourhood.has(l.source) && neighbourhood.has(l.target),
    ),
  }

  // we virtualize the simulation and use pixi to actually render it
  const simulation: Simulation<NodeData, LinkData> = forceSimulation<NodeData>(graphData.nodes)
    .force("charge", forceManyBody().strength(-100 * repelForce))
    .force("center", forceCenter().strength(centerForce))
    .force("link", forceLink(graphData.links).distance(linkDistance))
    .force("collide", forceCollide<NodeData>((n) => nodeRadius(n)).iterations(3))

  const width = graph.offsetWidth
  const height = Math.max(graph.offsetHeight, 250)

  const svg = d3
    .select<HTMLElement, NodeData>("#" + container)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [
      -width / 2 / scale,
      -height / 2 / scale,
      width / scale,
      height / scale,
    ])

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
  const graphNode = svg
    .append("g")
    .selectAll("g")
    .data(graphData.nodes)
    .enter()
    .append("g")

  // calculate color
  const color = (d: NodeData) => {
    const isCurrent = d.id === slug
    if (isCurrent) {
      return computedStyleMap["--secondary"]
    } else if (visited.has(d.id) || d.id.startsWith("tags/")) {
      return computedStyleMap["--tertiary"]
    } else {
      return computedStyleMap["--gray"]
    }
  }

  function nodeRadius(d: NodeData) {
    const numLinks = graphData.links.filter(
      (l) => l.source.id === d.id || l.target.id === d.id,
    ).length
    return 2 + Math.sqrt(numLinks)
  }

  let hoveredNodeId: string | null = null
  let hoveredNeighbours: Set<string> = new Set()
  const linkRenderData: LinkRenderData[] = []
  const nodeRenderData: NodeRenderData[] = []
  function updateHoverInfo(newHoveredId: string | null) {
    hoveredNodeId = newHoveredId

    if (newHoveredId === null) {
      hoveredNeighbours = new Set()
      for (const n of nodeRenderData) {
        n.active = false
      }

      for (const l of linkRenderData) {
        l.active = false
      }
    } else {
      hoveredNeighbours = new Set()
      for (const l of linkRenderData) {
        const linkData = l.simulationData
        if (linkData.source.id === newHoveredId || linkData.target.id === newHoveredId) {
          hoveredNeighbours.add(linkData.source.id)
          hoveredNeighbours.add(linkData.target.id)
        }

        l.active = linkData.source.id === newHoveredId || linkData.target.id === newHoveredId
      }

      for (const n of nodeRenderData) {
        n.active = hoveredNeighbours.has(n.simulationData.id)
      }
    }
  }

  let dragStartTime = 0
  let dragging = false

  function renderLinks() {
    tweens.get("link")?.stop()
    const tweenGroup = new TweenGroup()

    for (const l of linkRenderData) {
      let alpha = 1

      // if we are hovering over a node, we want to highlight the immediate neighbours
      // with full alpha and the rest with default alpha
      if (hoveredNodeId) {
        alpha = l.active ? 1 : 0.2
      }

      l.color = l.active ? computedStyleMap["--gray"] : computedStyleMap["--lightgray"]
      tweenGroup.add(new Tweened<LinkRenderData>(l).to({ alpha }, 200))
    }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("link", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function nodeRadius(d: NodeData) {
    const numLinks = links.filter(
      (l: any) => l.source.id === d.id || l.target.id === d.id,
    ).length
    return 2 + Math.sqrt(numLinks)
  }

    tweenGroup.getAll().forEach((tw) => tw.start())
    tweens.set("label", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tw) => tw.stop())
      },
    })
    .on("mouseover", function (_, d) {
      const currentId = d.id
      const linkNodes = d3
        .selectAll(".link")
        .filter(
          (d: any) => d.source.id === currentId || d.target.id === currentId,
        )

      if (focusOnHover) {
        // fade out non-neighbour nodes
        connectedNodes = linkNodes
          .data()
          .flatMap((d: any) => [d.source.id, d.target.id])

        d3.selectAll<HTMLElement, NodeData>(".link")
          .transition()
          .duration(200)
          .style("opacity", 0.2)
        d3.selectAll<HTMLElement, NodeData>(".node")
          .filter((d) => !connectedNodes.includes(d.id))
          .transition()
          .duration(200)
          .style("opacity", 0.2)

        d3.selectAll<HTMLElement, NodeData>(".node")
          .filter((d) => !connectedNodes.includes(d.id))
          .nodes()
          .map((it) => d3.select(it.parentNode as HTMLElement).select("text"))
          .forEach((it) => {
            let opacity = parseFloat(it.style("opacity"))
            it.transition()
              .duration(200)
              .attr("opacityOld", opacity)
              .style("opacity", Math.min(opacity, 0.2))
          })
      }

      // highlight links
      linkNodes
        .transition()
        .duration(200)
        .attr("stroke", "var(--gray)")
        .attr("stroke-width", 1)

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
      if (focusOnHover) {
        d3.selectAll<HTMLElement, NodeData>(".link")
          .transition()
          .duration(200)
          .style("opacity", 1)
        d3.selectAll<HTMLElement, NodeData>(".node")
          .transition()
          .duration(200)
          .style("opacity", 1)

        d3.selectAll<HTMLElement, NodeData>(".node")
          .filter((d) => !connectedNodes.includes(d.id))
          .nodes()
          .map((it) => d3.select(it.parentNode as HTMLElement).select("text"))
          .forEach((it) =>
            it
              .transition()
              .duration(200)
              .style("opacity", it.attr("opacityOld")),
          )
      }
      const currentId = d.id
      const linkNodes = d3
        .selectAll(".link")
        .filter(
          (d: any) => d.source.id === currentId || d.target.id === currentId,
        )

      linkNodes.transition().duration(200).attr("stroke", "var(--lightgray)")

      const parent = this.parentNode as HTMLElement
      d3.select<HTMLElement, NodeData>(parent)
        .select("text")
        .transition()
        .duration(200)
        .style("opacity", d3.select(parent).select("text").attr("opacityOld"))
        .style("font-size", fontSize + "em")
    })
      .circle(0, 0, nodeRadius(n))
      .fill({ color: isTagNode ? computedStyleMap["--light"] : color(n) })
      .stroke({ width: isTagNode ? 2 : 0, color: color(n) })
      .on("pointerover", (e) => {
        updateHoverInfo(e.target.label)
        oldLabelOpacity = label.alpha
        if (!dragging) {
          renderPixiFromD3()
        }
      })
      .on("pointerleave", () => {
        updateHoverInfo(null)
        label.alpha = oldLabelOpacity
        if (!dragging) {
          renderPixiFromD3()
        }
      })

    nodesContainer.addChild(gfx)
    labelsContainer.addChild(label)

    const nodeRenderDatum: NodeRenderData = {
      simulationData: n,
      gfx,
      label,
      color: color(n),
      alpha: 1,
      active: false,
    }

    nodeRenderData.push(nodeRenderDatum)
  }

  for (const l of graphData.links) {
    const gfx = new Graphics({ interactive: false, eventMode: "none" })
    linkContainer.addChild(gfx)

    const linkRenderDatum: LinkRenderData = {
      simulationData: l,
      gfx,
      color: computedStyleMap["--lightgray"],
      alpha: 1,
      active: false,
    }

    linkRenderData.push(linkRenderDatum)
  }

  let currentTransform = zoomIdentity
  if (enableDrag) {
    select<HTMLCanvasElement, NodeData | undefined>(app.canvas).call(
      drag<HTMLCanvasElement, NodeData | undefined>()
        .container(() => app.canvas)
        .subject(() => graphData.nodes.find((n) => n.id === hoveredNodeId))
        .on("start", function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(1).restart()
          event.subject.fx = event.subject.x
          event.subject.fy = event.subject.y
          event.subject.__initialDragPos = {
            x: event.subject.x,
            y: event.subject.y,
            fx: event.subject.fx,
            fy: event.subject.fy,
          }
          dragStartTime = Date.now()
          dragging = true
        })
        .on("drag", function dragged(event) {
          const initPos = event.subject.__initialDragPos
          event.subject.fx = initPos.x + (event.x - initPos.x) / currentTransform.k
          event.subject.fy = initPos.y + (event.y - initPos.y) / currentTransform.k
        })
        .on("end", function dragended(event) {
          if (!event.active) simulation.alphaTarget(0)
          event.subject.fx = null
          event.subject.fy = null
          dragging = false

          // if the time between mousedown and mouseup is short, we consider it a click
          if (Date.now() - dragStartTime < 500) {
            const node = graphData.nodes.find((n) => n.id === event.subject.id) as NodeData
            const targ = resolveRelative(fullSlug, node.id)
            window.spaNavigate(new URL(targ, window.location.toString()))
          }
        }),
    )
  } else {
    for (const node of nodeRenderData) {
      node.gfx.on("click", () => {
        const targ = resolveRelative(fullSlug, node.simulationData.id)
        window.spaNavigate(new URL(targ, window.location.toString()))
      })
    }
  }

  if (enableZoom) {
    select<HTMLCanvasElement, NodeData>(app.canvas).call(
      zoom<HTMLCanvasElement, NodeData>()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.25, 4])
        .on("zoom", ({transform}) => {
          link.attr("transform", transform)
          node.attr("transform", transform)
          const scale = transform.k * opacityScale
          let scaleOpacity = Math.max((scale - 1) / 3.75, 0)
          const activeNodes = nodeRenderData.filter((n) => n.active).flatMap((n) => n.label)

          for (const label of labelsContainer.children) {
            if (!activeNodes.includes(label)) {
              label.alpha = scaleOpacity
            }
          }
        }),
    )
  }

  function animate(time: number) {
    for (const n of nodeRenderData) {
      const { x, y } = n.simulationData
      if (!x || !y) continue
      n.gfx.position.set(x + width / 2, y + height / 2)
      if (n.label) {
        n.label.position.set(x + width / 2, y + height / 2)
      }
    }

    for (const l of linkRenderData) {
      const linkData = l.simulationData
      l.gfx.clear()
      l.gfx.moveTo(linkData.source.x! + width / 2, linkData.source.y! + height / 2)
      l.gfx
        .lineTo(linkData.target.x! + width / 2, linkData.target.y! + height / 2)
        .stroke({ alpha: l.alpha, width: 1, color: l.color })
    }

    tweens.forEach((t) => t.update(time))
    app.renderer.render(stage)
    requestAnimationFrame(animate)
  // }

  const graphAnimationFrameHandle = requestAnimationFrame(animate)
  window.addCleanup(() => cancelAnimationFrame(graphAnimationFrameHandle))
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  addToVisited(simplifySlug(slug))
  await renderGraph("graph-container", slug)

  // Function to re-render the graph when the theme changes
  const handleThemeChange = () => {
    renderGraph("graph-container", slug)
  }

  // event listener for theme change
  document.addEventListener("themechange", handleThemeChange)

  // cleanup for the event listener
  window.addCleanup(() => {
    document.removeEventListener("themechange", handleThemeChange)
  })

  const container = document.getElementById("global-graph-outer")
  const sidebar = container?.closest(".sidebar") as HTMLElement

  function renderGlobalGraph() {
    const slug = getFullSlug(window)
    container?.classList.add("active")
    if (sidebar) {
      sidebar.style.zIndex = "1"
    }

    renderGraph("global-graph-container", slug)
    registerEscapeHandler(container, hideGlobalGraph)
  }

  function hideGlobalGraph() {
    container?.classList.remove("active")
    if (sidebar) {
      sidebar.style.zIndex = "unset"
    }
  }

  async function shortcutHandler(e: HTMLElementEventMap["keydown"]) {
    if (e.key === "g" && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
      e.preventDefault()
      const globalGraphOpen = container?.classList.contains("active")
      globalGraphOpen ? hideGlobalGraph() : renderGlobalGraph()
    }
  }

  const containerIcon = document.getElementById("global-graph-icon")
  containerIcon?.addEventListener("click", renderGlobalGraph)
  window.addCleanup(() =>
    containerIcon?.removeEventListener("click", renderGlobalGraph),
  )
})
