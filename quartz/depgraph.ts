import Graph from "graphology"

export default class DepGraph {
  graph: Graph

  constructor() {
    this.graph = new Graph({ allowSelfLoops: false, multi: false, type: "directed" })
  }

  toString(): string {
    return JSON.stringify(
      this.graph.toJSON()["edges"].map((obj) => obj["key"]),
      null,
      2,
    )
  }

  // For the node provided:
  // If node does not exist, add it
  // If an edge was added in other, it is added in this graph
  // If an edge was deleted in other, it is deleted in this graph
  mergeEdgesForNode(other: DepGraph, node: string): void {
    if (this.graph.hasNode(node)) {
      this.graph.mergeNode(node)
    }

    // Add edge if it is present in other
    other.graph.forEachEdge((_edge, _attr, source, target) => {
      this.addEdge(source, target)
    })

    // For node provided, remove edge if it is absent in other
    this.graph.forEachEdge((_edge, _attr, source, target) => {
      if (source === node && !other.graph.hasEdge(source, target)) {
        this.graph.dropEdge(source, target)
      }
    })
  }

  hasNode(node: string): boolean {
    return this.graph.hasNode(node)
  }

  addEdge(from: string, to: string): void {
    this.graph.mergeNode(from)
    this.graph.mergeNode(to)
    this.graph.mergeDirectedEdgeWithKey(`${from} -> ${to}`, from, to)
  }

  removeNode(node: string): void {
    if (this.graph.hasNode(node)) {
      this.graph.dropNode(node)
    }
  }

  getDownstreamLeafNodes(node: string): Set<string> {
    let stack: string[] = [node]
    let visited = new Set<string>()
    let leafNodes = new Set<string>()

    // DFS
    while (stack.length > 0) {
      let node = stack.pop()!

      // If the node is already visited, skip it
      if (visited.has(node)) {
        continue
      }
      visited.add(node)

      // Check if the node is a leaf node (i.e. destination path)
      if (this.graph.outDegree(node) === 0) {
        leafNodes.add(node)
      }

      // Add all unvisited neighbors to the stack
      this.graph.forEachOutNeighbor(node, (neighbor) => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor)
        }
      })
    }

    return leafNodes
  }

  // Eg. if the graph is A -> B -> C
  //                     D ---^
  // and the node is B, this function returns [A, B, D]
  getUpstreamsOfDownstreamLeafNodes(node: string): Set<string> {
    const leafNodes = this.getDownstreamLeafNodes(node)
    let visited = new Set<string>()
    let upstreamNodes = new Set<string>()

    // Backwards DFS for each leaf node
    leafNodes.forEach((leafNode) => {
      let stack: string[] = [leafNode]

      while (stack.length > 0) {
        let node = stack.pop()!

        if (visited.has(node)) {
          continue
        }
        visited.add(node)
        // Add node if it's not a leaf node (i.e. destination path)
        // Assumes destination file cannot depend on another destination file
        if (this.graph.outDegree(node) !== 0) {
          upstreamNodes.add(node)
        }

        // Add all unvisited parents to the stack
        this.graph.forEachInNeighbor(node, (parentNode) => {
          if (!visited.has(parentNode)) {
            stack.push(parentNode)
          }
        })
      }
    })

    return upstreamNodes
  }
}
