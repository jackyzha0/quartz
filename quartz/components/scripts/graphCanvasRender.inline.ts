import * as d3 from "d3"
import type { Graphics, Text } from "pixi.js"

type NodeData = {
  id: string
  text: string
  tags: string[]
  r?: number
} & d3.SimulationNodeDatum

type LinkData = {
  source: string
  target: string
}
type D3NodeData = d3.SimulationNodeDatum &
  NodeData & {
    gfx?: Graphics
    label?: Text
    active?: boolean
  }
type D3LinkData = d3.SimulationLinkDatum<D3NodeData> & {
  active?: boolean
  alpha?: number
  color?: string
}

let tweens = new Map<
  string,
  {
    update: (time: number) => void
    stop: () => void
  }
>()
function animate(time: number) {
  tweens.forEach((tween) => tween.update(time))
  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)

export async function renderCanvasGraph(
  container: HTMLElement,
  cfg: {
    graphData: {
      nodes: NodeData[]
      links: LinkData[]
    }
    alwaysShowLabels?: boolean
    slug: string
    onNodeClick: (node: NodeData) => void
    visited: Set<string>
    enableDrag?: boolean
    enableZoom?: boolean
    /**
     * not implemented yet
     */
    depth: number
    /**
     * not implemented yet
     */
    scale?: number
    repelForce: number
    centerForce: number
    linkDistance: number
    /**
     * not implemented yet
     */
    fontSize: number
    /**
     * not implemented yet
     */
    opacityScale?: number
    focusOnHover: boolean
  },
) {
  const { Application, Container, Point, Graphics, Text } = await import(
    "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/8.1.6/pixi.min.mjs"
  )
  const TWEEN = await import(
    "https://cdnjs.cloudflare.com/ajax/libs/tween.js/23.1.2/tween.esm.min.js"
  )
  // clear all tweens when re-rendering
  tweens.forEach((tween) => tween.stop())
  tweens.clear()
  // test if the user is on a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  )
  // set the maximum scale based on the device
  const MAX_SCALE = isMobile ? 2 : 4
  const SIZE_BASE = MAX_SCALE
  let stage = new Container()
  stage.scale.set(1 / MAX_SCALE, 1 / MAX_SCALE)
  let nodeContainer = new Container()
  let labelContainer = new Container()

  function getColor(cssVar: string) {
    return getComputedStyle(container!).getPropertyValue(cssVar)
  }

  /**
   * pre-calculate colors, never call getComputedStyle in the render loop, it's slow
   * For svg render we can use css variables to get the color
   * When using canvas render, we need to pre-calculate the colors from css variables
   */
  const colorMap = new Map<string, string>()
  colorMap.set("--secondary", getColor("--secondary"))
  colorMap.set("--tertiary", getColor("--tertiary"))
  colorMap.set("--gray", getColor("--gray"))
  colorMap.set("--dark", getColor("--dark"))
  colorMap.set("--light", getColor("--light"))
  colorMap.set("--lightgray", getColor("--lightgray"))

  nodeContainer.zIndex = 1
  labelContainer.zIndex = 2

  stage.addChild(nodeContainer)
  stage.addChild(labelContainer)

  const height = Math.max(container.offsetHeight, 250)
  const width = container.offsetWidth
  const app = new Application()
  await app.init({
    width: width,
    height: height,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio,
    autoDensity: true,
    autoStart: false,
  })
  container.appendChild(app.canvas)

  let simulation = d3
    .forceSimulation<D3NodeData>()
    .force(
      "link",
      d3.forceLink<D3NodeData, D3LinkData>().id((d) => d.id),
    )
    .force("charge", d3.forceManyBody().strength(-100 * cfg.repelForce))
    .force("center", d3.forceCenter(width / 2, height / 2).strength(cfg.centerForce / 2))
    .force(
      "collide",
      d3.forceCollide(() => 20),
    )

  const colour = (d: D3NodeData) => {
    const isCurrent = d.id === cfg.slug
    if (isCurrent) {
      return colorMap.get("--secondary")
    } else if (cfg.visited.has(d.id) || d.id.startsWith("tags/")) {
      return colorMap.get("--tertiary")
    } else {
      return colorMap.get("--gray")
    }
  }
  let links = new Graphics()
  nodeContainer.addChild(links)

  function nodeRadius(d: NodeData) {
    const numLinks = (cfg.graphData.links as D3LinkData[]).filter(
      (l: any) => l.source === d.id || l.target === d.id,
    ).length
    return 2 + Math.sqrt(numLinks)
  }
  let currentHoverNodeId: string | null = null
  function setupLinkAnimation(links: D3LinkData[]) {
    tweens.get("link")?.stop()
    const tweenGroup = new TWEEN.Group()
    links.forEach((link) => {
      let alpha = 1
      if (currentHoverNodeId) {
        alpha = link.active ? 1 : 0.2
      }
      tweenGroup.add(
        new TWEEN.Tween(link).to(
          {
            alpha,
          },
          200,
        ),
      )
      link.color = link.active ? colorMap.get("--gray") : colorMap.get("--lightgray")
    })
    tweenGroup.getAll().forEach((tween) => {
      tween.start()
    })
    tweens.set("link", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tween) => {
          tween.stop()
        })
      },
    })
  }
  function setupLabelAnimation(nodes: D3NodeData[]) {
    const { connectedNodes } = getConnectedNodesAndLinks(currentHoverNodeId!)
    tweens.get("label")?.stop()
    const tweenGroup = new TWEEN.Group()
    nodes.forEach((node) => {
      if (!node.label) return
      if (currentHoverNodeId === node.id) {
        // highlight label and scale up
        tweenGroup.add(
          new TWEEN.Tween(node.label!).to(
            {
              alpha: 1,
              scale: {
                x: 1.25,
                y: 1.25,
              },
            },
            200,
          ),
        )
      } else {
        let alpha = node.active ? 0.3 : 0
        if (currentTransform.k > 0.5) {
          alpha = 0.3
        }
        if (currentHoverNodeId && connectedNodes.has(node.id)) {
          alpha = 0.7
        }
        if (!cfg.alwaysShowLabels) {
          alpha = 0
        }
        tweenGroup.add(
          new TWEEN.Tween(node.label!).to(
            {
              alpha,
              scale: {
                x: 1,
                y: 1,
              },
            },
            200,
          ),
        )
      }
    })
    tweenGroup.getAll().forEach((tween) => {
      tween.start()
    })
    tweens.set("label", {
      update: tweenGroup.update.bind(tweenGroup),
      stop() {
        tweenGroup.getAll().forEach((tween) => {
          tween.stop()
        })
      },
    })
  }
  function getConnectedNodesAndLinks(nodeId: string) {
    const connectedNodes = new Set<string>([])
    const links: D3LinkData[] = []
    ;(cfg.graphData.links as D3LinkData[]).forEach((link) => {
      const source = link.source as D3NodeData
      const target = link.target as D3NodeData
      if (source.id === nodeId || target.id === nodeId) {
        connectedNodes.add(source.id)
        connectedNodes.add(target.id)
      }
      links.push(link)
    })
    return {
      connectedNodes,
      links,
    }
  }
  function setCurrentHoverNodeId(nodeId: string | null) {
    currentHoverNodeId = nodeId
    if (tweens.get("hover")) tweens.get("hover")?.stop()
    // Find all nodes connected to the current node.
    const { connectedNodes, links } = getConnectedNodesAndLinks(nodeId!)
    if (nodeId) {
      connectedNodes.add(nodeId)
    }
    const groupTween = new TWEEN.Group()
    // Hide all non-connected nodes.
    ;(cfg.graphData.nodes as D3NodeData[]).forEach((node) => {
      if (nodeId) {
        node.active = connectedNodes.has(node.id)
        if (node.id !== nodeId) {
          // If a node is connected, set its alpha to 1; otherwise, set it to 0.2
          groupTween.add(
            new TWEEN.Tween(node.gfx!, groupTween).to(
              { alpha: connectedNodes.has(node.id) ? 1 : 0.2 },
              200,
            ),
          )
        }
      } else {
        // Restore all nodes
        node.active = false
        groupTween.add(new TWEEN.Tween(node.gfx!, groupTween).to({ alpha: 1 }, 200))
      }
    })
    // Set connection status.
    links.forEach((link) => {
      const source = link.source as D3NodeData
      const target = link.target as D3NodeData
      link.active = source.id === nodeId || target.id === nodeId
    })
    setupLabelAnimation(cfg.graphData.nodes as D3NodeData[])
    setupLinkAnimation(links)

    groupTween.getAll().forEach((tween) => {
      tween.start()
    })
    tweens.set("hover", {
      update: groupTween.update.bind(groupTween),
      stop() {
        groupTween.getAll().forEach((tween) => {
          tween.stop()
        })
      },
    })
  }
  let dragStartTime = 0
  ;(cfg.graphData.nodes as D3NodeData[]).forEach((node) => {
    const gfx = new Graphics()
    const nodeSize = nodeRadius(node)
    if (node.id.startsWith("tags/")) {
      gfx.circle(0, 0, nodeSize * SIZE_BASE)
      gfx.fill({
        color: colour(node),
      })
      gfx.circle(0, 0, (nodeSize - 2) * SIZE_BASE)
      gfx.fill({
        color: colorMap.get("--light"),
      })
      gfx.stroke()
    } else {
      gfx.circle(0, 0, nodeSize * SIZE_BASE)
      gfx.fill({
        color: colour(node),
      })
      gfx.stroke()
    }

    gfx.eventMode = "static"
    gfx.on("pointerover", () => {
      tweens.get(node.id)?.stop()
      const scale = {
        x: 1,
        y: 1,
      }
      const tween = new TWEEN.Tween(scale, false)
        .to({ x: 1.5, y: 1.5 }, 100)
        .onUpdate(() => {
          gfx.scale.set(scale.x, scale.y)
        })
        .onStop(() => {
          tweens.delete(node.id)
        })
        .start()
      tweens.set(node.id, tween)
      setCurrentHoverNodeId(node.id)
    })
    gfx.cursor = "pointer"
    gfx.on("pointerleave", () => {
      tweens.get(node.id)?.stop()
      const scale = {
        x: gfx.scale.x,
        y: gfx.scale.y,
      }
      const tween = new TWEEN.Tween(scale, false)
        .to({ x: 1, y: 1 }, 100)
        .onUpdate(() => {
          gfx.scale.set(scale.x, scale.y)
        })
        .onStop(() => {
          tweens.delete(node.id)
        })
        .start()
      tweens.set(node.id, tween)
      setCurrentHoverNodeId(null)
    })
    node.gfx = gfx
    node.r = nodeSize
    const label = new Text({
      // Display up to 9 characters of text; if it exceeds 9 characters, show "..." instead
      // in order to prevent the text from overflowing the node.
      // not good solution for english text
      text: node.text.length > 9 ? node.text.slice(0, 9) + "..." : node.text,
      style: {
        fontSize: 12 * SIZE_BASE,
        fill: colorMap.get("--dark"),
      },
    })
    label.scale.set(1, 1)
    label.anchor.set(0.5, 1)
    label.alpha = cfg.alwaysShowLabels ? 0.3 : 0
    node.label = label
    labelContainer.addChild(label)
    nodeContainer.addChild(gfx)
  })
  let currentTransform = d3.zoomIdentity
  let d3canvas = d3.select<HTMLCanvasElement, D3NodeData | undefined>(app.canvas)
  if (cfg.enableDrag) {
    d3canvas = d3canvas.call(
      d3
        .drag<HTMLCanvasElement, D3NodeData | undefined>()
        .container(() => app.canvas)
        .subject((e) => {
          const x = currentTransform.invertX(e.x)
          const y = currentTransform.invertY(e.y)
          for (let i = cfg.graphData.nodes.length - 1; i >= 0; --i) {
            const node = cfg.graphData.nodes[i]
            const dx = (x - node.x!) * SIZE_BASE
            const dy = (y - node.y!) * SIZE_BASE
            let r = (node.r! + 5) * SIZE_BASE
            if (dx * dx + dy * dy < r * r) {
              return node
            }
          }
        })
        .on("start", function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart()
          event.subject.fx = event.subject.x
          event.subject.fy = event.subject.y
          event.subject.__initialDragPos = {
            x: event.subject.x,
            y: event.subject.y,
            fx: event.subject.fx,
            fy: event.subject.fy,
          }
          dragStartTime = Date.now()
        })
        .on("drag", function dragged(event) {
          const k = currentTransform.k
          const initPos = event.subject.__initialDragPos
          const dragPos = event
          event.subject.fx = initPos.x + (dragPos.x - initPos.x) / k
          event.subject.fy = initPos.y + (dragPos.y - initPos.y) / k
        })
        .on("end", function dragended(event) {
          if (!event.active) simulation.alphaTarget(0)
          event.subject.fx = null
          event.subject.fy = null
          // If the drag time is less than 200ms, it is considered a click event, never use pixi event to handle click event
          if (Date.now() - dragStartTime < 200) {
            cfg.onNodeClick(
              cfg.graphData.nodes.find((node) => node.id === event.subject.id) as NodeData,
            )
          }
        }),
    )
  }

  if (cfg.enableZoom) {
    d3canvas.call(
      d3
        .zoom<HTMLCanvasElement, D3NodeData | undefined>()
        .extent([
          [0, 0],
          [width, height],
        ])
        .scaleExtent([0.25, MAX_SCALE])
        .on("zoom", ({ transform }) => {
          currentTransform = transform
          stage.scale.set(currentTransform.k / SIZE_BASE, currentTransform.k / SIZE_BASE)
          stage.position.set(currentTransform.x, currentTransform.y)
          setupLabelAnimation(cfg.graphData.nodes as D3NodeData[])
        }),
    )
  }

  simulation.nodes(cfg.graphData.nodes)
  simulation.force(
    "link",
    d3
      .forceLink<D3NodeData, D3LinkData>(cfg.graphData.links)
      .id((d) => d.id)
      .distance(cfg.linkDistance * 1.8),
  )
  ;(cfg.graphData.links as D3LinkData[]).forEach((link) => {
    link.alpha = 1
    link.color = colorMap.get("--lightgray")
  })
  function animate() {
    ;(cfg.graphData.nodes as D3NodeData[]).forEach((node) => {
      let { x, y, gfx, label, r } = node
      if (!gfx) return
      gfx.position = new Point((x || 0) * SIZE_BASE, (y || 0) * SIZE_BASE)
      if (label) {
        label.position.set(node.x! * SIZE_BASE, (node.y! - (r || 5)) * SIZE_BASE)
      }
      gfx.zIndex = node.active ? 2 : 1
    })

    links.clear()
    ;(cfg.graphData.links as D3LinkData[])
      .sort((a, b) => {
        // active links should be drawn on top of inactive links
        if (a.active && !b.active) return 1
        if (!a.active && b.active) return -1
        return 0
      })
      .forEach((link) => {
        const source = link.source as D3NodeData
        const target = link.target as D3NodeData
        const color = link.color
        links.moveTo(source.x! * SIZE_BASE, source.y! * SIZE_BASE)
        links.lineTo(target.x! * SIZE_BASE, target.y! * SIZE_BASE)
        links.stroke({
          width: 1 * SIZE_BASE,
          color,
          alpha: link.alpha,
        })
      })
    links.fill()
    app.renderer.render(stage)
    requestAnimationFrame(animate)
  }
  requestAnimationFrame(animate)
}
