import type { ContentDetails } from "../../plugins/emitters/contentIndex"
import * as d3 from "d3"
import * as PIXI from "pixi.js"
import * as TWEEN from "@tweenjs/tween.js"
import { registerEscapeHandler, removeAllChildren } from "./util"
import { FullSlug, SimpleSlug, getFullSlug, resolveRelative, simplifySlug } from "../../util/path"

type NodeData = {
  id: SimpleSlug
  text: string
  tags: string[]

  label?: PIXI.Text

  gfx?: PIXI.Graphics
  alpha?: number

  r?: number
  active?: boolean
} & d3.SimulationNodeDatum

type LinkData = {
  source: SimpleSlug
  target: SimpleSlug

  gfx?: PIXI.Graphics
  alpha?: number
  color?: string

  active?: boolean
}

type LinkNodes = Omit<LinkData, "source" | "target"> & {
  source: NodeData
  target: NodeData
} & d3.SimulationLinkDatum<NodeData>

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

let tweens = new Map<string, TweenNode>()
function animate(time: number) {
  tweens.forEach((t) => t.update(time))
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

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

  const graphData: { nodes: NodeData[]; links: LinkNodes[] } = {
    nodes: [...neighbourhood].map((url) => {
      const text = url.startsWith("tags/") ? "#" + url.substring(5) : (data.get(url)?.title ?? url)
      return {
        id: url,
        text: text,
        tags: data.get(url)?.tags ?? [],
      }
    }),
    links: links.filter(
      (l) => neighbourhood.has(l.source) && neighbourhood.has(l.target),
    ) as unknown as LinkNodes[],
  }

  const simulation: d3.Simulation<NodeData, LinkNodes> = d3
    .forceSimulation(graphData.nodes)
    .force("charge", d3.forceManyBody().strength(-100 * repelForce))
    .force("center", d3.forceCenter().strength(centerForce))
    .force(
      "link",
      d3
        .forceLink(graphData.links)
        .id((d: any) => d.id)
        .distance(linkDistance),
    )
    .force(
      "collide",
      d3.forceCollide((n) => nodeRadius(n)),
    )

  const width = graph.offsetWidth
  const height = Math.max(graph.offsetHeight, 250)
  const computedStyleMap = new Map<string, string>()
  for (let i of [
    "--secondary",
    "--tertiary",
    "--gray",
    "--light",
    "--lightgray",
    "--dark",
    "--darkgray",
    "--bodyFont",
  ]) {
    computedStyleMap.set(i, getComputedStyle(graph).getPropertyValue(i))
  }

  // calculate color
  const color = (d: NodeData) => {
    const isCurrent = d.id === slug
    if (isCurrent) {
      return computedStyleMap.get("--secondary")
    } else if (visited.has(d.id) || d.id.startsWith("tags/")) {
      return computedStyleMap.get("--tertiary")
    } else {
      return computedStyleMap.get("--gray")
    }
  }

  function nodeRadius(d: NodeData) {
    const numLinks = links.filter((l: any) => l.source.id === d.id || l.target.id === d.id).length
    return 2 + Math.sqrt(numLinks)
  }

  function renderLinks(data: LinkNodes[], currentNodeId?: string | null) {
    tweens.get("link")?.stop()
    const Group = new TWEEN.Group()

    data.forEach((l) => {
      let alpha = 1
      if (currentNodeId) {
        alpha = l.active ? 1 : 0.3
      }
      l.color = l.active ? computedStyleMap.get("--gray") : computedStyleMap.get("--lightgray")
      Group.add(new TWEEN.Tween<LinkNodes>(l).to({ alpha }, 200))
    })

    Group.getAll().forEach((tw) => tw.start())
    tweens.set("link", {
      update: Group.update.bind(Group),
      stop() {
        Group.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderLabels(data: NodeData[], currentNodeId?: string | null) {
    tweens.get("label")?.stop()
    const Group = new TWEEN.Group()

    data.forEach((n) => {
      if (!n.label) return
      if (currentNodeId === n.id) {
        Group.add(
          new TWEEN.Tween<PIXI.Text>(n.label).to(
            { alpha: 1, scale: { x: (1 / scale) * 1.5, y: (1 / scale) * 1.5 } },
            200,
          ),
        )
      } else {
        let alpha = n.active ? 0.8 : 0
        Group.add(
          new TWEEN.Tween<PIXI.Text>(n.label).to(
            { alpha, scale: { x: 1 / scale, y: 1 / scale } },
            200,
          ),
        )
      }
    })

    Group.getAll().forEach((tw) => tw.start())
    tweens.set("label", {
      update: Group.update.bind(Group),
      stop() {
        Group.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  function renderCurrentNode(props: { nodeId: string | null; focusOnHover: boolean }) {
    const { nodeId, focusOnHover } = props

    tweens.get("hover")?.stop()

    // NOTE: we need to create a new copy here
    const connectedNodes: Set<SimpleSlug> = new Set()

    graphData.links.forEach((l) => {
      l.active = l.source.id === nodeId || l.target.id === nodeId
      if (l.source.id === nodeId || l.target.id === nodeId) {
        connectedNodes.add(l.source.id)
        connectedNodes.add(l.target.id)
      }
    })

    const Group = new TWEEN.Group()

    graphData.nodes.forEach((n) => {
      if (!n.gfx) return
      let alpha = 1
      if (nodeId !== null) {
        n.active = connectedNodes.has(n.id)
        if (focusOnHover) alpha = connectedNodes.has(n.id) ? 1 : 0.2
        if (n.id !== nodeId) {
          Group.add(new TWEEN.Tween<PIXI.Graphics>(n.gfx, Group).to({ alpha }, 200))
        }
      } else {
        n.active = false
        Group.add(new TWEEN.Tween<PIXI.Graphics>(n.gfx, Group).to({ alpha }, 200))
      }
    })

    renderLabels(graphData.nodes, nodeId)
    renderLinks(graphData.links, nodeId)

    Group.getAll().forEach((tw) => tw.start())
    tweens.set("hover", {
      update: Group.update.bind(Group),
      stop() {
        Group.getAll().forEach((tw) => tw.stop())
      },
    })
  }

  tweens.forEach((tween) => tween.stop())
  tweens.clear()
  const app = new PIXI.Application()
  await app.init({
    width,
    height,
    antialias: true,
    autoStart: false,
    autoDensity: true,
    backgroundAlpha: 0,
    preference: "webgpu",
    resolution: window.devicePixelRatio,
    eventMode: "static",
  })
  graph.appendChild(app.canvas)

  const stage = app.stage
  stage.interactive = false

  const nodesContainer = new PIXI.Container<PIXI.Graphics>({ zIndex: 1 })
  const labelsContainer = new PIXI.Container<PIXI.Text>({ zIndex: 2 })
  const linkGraphic = new PIXI.Graphics()

  stage.addChild(nodesContainer, labelsContainer)
  nodesContainer.addChild(linkGraphic)

  let currentHoverNodeId: string | undefined
  let dragStartTime = 0
  let dragging = false

  graphData.nodes.forEach((n) => {
    const nodeId = n.id

    const label = new PIXI.Text({
      text: n.text,
      alpha: 0,
      anchor: { x: 0.5, y: -0.5 },
      style: {
        fontSize,
        fill: computedStyleMap.get("--dark"),
        fontFamily: computedStyleMap.get("--bodyFont"),
      },
      resolution: window.devicePixelRatio,
    })
    label.scale.set(scale)
    n.label = label

    const gfx = new PIXI.Graphics({
      interactive: true,
      label: nodeId,
      eventMode: "static",
      hitArea: new PIXI.Circle(0, 0, nodeRadius(n)),
      cursor: "pointer",
    })
      .circle(0, 0, nodeRadius(n))
      .on("pointerover", () => {
        if (!dragging) {
          tweens.get(nodeId)?.stop()
          const tweenScale = { x: 1, y: 1 }
          const tween = new TWEEN.Tween(tweenScale)
            .to({ x: 1.5, y: 1.5 }, 100)
            .onUpdate(() => {
              gfx.scale.set(tweenScale.x, tweenScale.y)
            })
            .onStop(() => {
              tweens.delete(nodeId)
            })
            .start()
          tweens.set(nodeId, tween)
          renderCurrentNode({ nodeId, focusOnHover })
        }
      })
      .on("pointerdown", (e) => {
        currentHoverNodeId = e.target.label
      })
      .on("pointerup", () => {
        currentHoverNodeId = undefined
      })
      .on("pointerupoutside", () => {
        currentHoverNodeId = undefined
      })
      .on("pointerleave", () => {
        if (!dragging) {
          tweens.get(nodeId)?.stop()
          const tweenScale = {
            x: gfx.scale.x,
            y: gfx.scale.y,
          }
          const tween = new TWEEN.Tween(tweenScale)
            .to({ x: 1, y: 1 }, 100)
            .onUpdate(() => {
              gfx.scale.set(tweenScale.x, tweenScale.y)
            })
            .onStop(() => {
              tweens.delete(nodeId)
            })
            .start()
          tweens.set(nodeId, tween)
          renderCurrentNode({ nodeId: null, focusOnHover })
        }
      })
    n.gfx = gfx

    if (n.id.startsWith("tags/")) {
      gfx.fill({ color: computedStyleMap.get("--light") }).stroke({ width: 0.5, color: color(n) })
    } else {
      gfx.fill(color(n)).stroke({ color: color(n) })
    }

    nodesContainer.addChild(gfx)
    labelsContainer.addChild(label)
  })

  graphData.links.forEach((l) => {
    l.alpha = 1
    l.color = computedStyleMap.get("--lightgray")
  })

  let currentTransform = d3.zoomIdentity
  if (enableDrag) {
    d3.select<HTMLCanvasElement, NodeData | undefined>(app.canvas).call(
      d3
        .drag<HTMLCanvasElement, NodeData | undefined>()
        .container(() => app.canvas)
        .subject(() => graphData.nodes.find((n) => n.id === currentHoverNodeId))
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
          // Check for node click event here.
          if (Date.now() - dragStartTime < 100) {
            const node = graphData.nodes.find((n) => n.id === event.subject.id) as NodeData
            const targ = resolveRelative(fullSlug, node.id)
            window.spaNavigate(new URL(targ, window.location.toString()))
          }
        }),
    )
  } else {
    graphData.nodes.forEach((node) => {
      if (!node.gfx) return
      node.gfx.on("click", () => {
        const targ = resolveRelative(fullSlug, node.id)
        window.spaNavigate(new URL(targ, window.location.toString()))
      })
    })
  }

  if (enableZoom) {
    d3.select<HTMLCanvasElement, NodeData>(app.canvas).call(
      d3
        .zoom<HTMLCanvasElement, NodeData>()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.25, 4])
        .on("zoom", ({ transform }) => {
          currentTransform = transform
          stage.scale.set(transform.k, transform.k)
          stage.position.set(transform.x, transform.y)

          const scale = transform.k * opacityScale
          let scaleOpacity = Math.max((scale - 1) / 3.75, 0)
          const activeNodes = graphData.nodes
            .filter((n) => n.active)
            .flatMap((n) => n.label) as PIXI.Text[]
          labelsContainer.children.forEach((label) => {
            if (!activeNodes.includes(label)) {
              label.alpha = scaleOpacity
            }
          })
        }),
    )
  }

  function animate() {
    graphData.nodes.forEach((n) => {
      let { x, y, gfx, label, active } = n
      if (!gfx || !x || !y || !label) return
      gfx.position.set(x + width / 2, y + height / 2)
      label.position.set(x + width / 2, y + height / 2)
      gfx.zIndex = active ? 2 : 1
    })

    linkGraphic.clear()
    graphData.links.forEach((l) => {
      linkGraphic
        .moveTo(l.source.x! + width / 2, l.source.y! + height / 2)
        .lineTo(l.target.x! + width / 2, l.target.y! + height / 2)
        .stroke({ alpha: l.alpha, width: 1, color: l.color })
    })
    app.renderer.render(stage)
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const slug = e.detail.url
  addToVisited(simplifySlug(slug))
  await renderGraph("graph-container", slug)

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
  window.addCleanup(() => containerIcon?.removeEventListener("click", renderGlobalGraph))

  document.addEventListener("keydown", shortcutHandler)
  window.addCleanup(() => document.removeEventListener("keydown", shortcutHandler))
})
