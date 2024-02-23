export default class DepGraph<T> {
  // node: incoming and outgoing edges
  _graph = new Map<T, { incoming: Set<T>; outgoing: Set<T> }>()

  constructor() {
    this._graph = new Map()
  }

  export(): Object {
    return {
      nodes: this.nodes,
      edges: this.edges,
    }
  }

  toString(): string {
    return JSON.stringify(this.export(), null, 2)
  }

  // BASIC GRAPH OPERATIONS

  get nodes(): T[] {
    return Array.from(this._graph.keys())
  }

  get edges(): [T, T][] {
    let edges: [T, T][] = []
    this.forEachEdge((edge) => edges.push(edge))
    return edges
  }

  hasNode(node: T): boolean {
    return this._graph.has(node)
  }

  addNode(node: T): void {
    if (!this._graph.has(node)) {
      this._graph.set(node, { incoming: new Set(), outgoing: new Set() })
    }
  }

  removeNode(node: T): void {
    if (this._graph.has(node)) {
      this._graph.delete(node)
    }
  }

  hasEdge(from: T, to: T): boolean {
    return Boolean(this._graph.get(from)?.outgoing.has(to))
  }

  addEdge(from: T, to: T): void {
    this.addNode(from)
    this.addNode(to)

    this._graph.get(from)!.outgoing.add(to)
    this._graph.get(to)!.incoming.add(from)
  }

  removeEdge(from: T, to: T): void {
    if (this._graph.has(from) && this._graph.has(to)) {
      this._graph.get(from)!.outgoing.delete(to)
      this._graph.get(to)!.incoming.delete(from)
    }
  }

  // returns -1 if node does not exist
  outDegree(node: T): number {
    return this.hasNode(node) ? this._graph.get(node)!.outgoing.size : -1
  }

  // returns -1 if node does not exist
  inDegree(node: T): number {
    return this.hasNode(node) ? this._graph.get(node)!.incoming.size : -1
  }

  forEachOutNeighbor(node: T, callback: (neighbor: T) => void): void {
    this._graph.get(node)?.outgoing.forEach(callback)
  }

  forEachInNeighbor(node: T, callback: (neighbor: T) => void): void {
    this._graph.get(node)?.incoming.forEach(callback)
  }

  forEachEdge(callback: (edge: [T, T]) => void): void {
    for (const [source, { outgoing }] of this._graph.entries()) {
      for (const target of outgoing) {
        callback([source, target])
      }
    }
  }

  // DEPENDENCY ALGORITHMS

  // For the node provided:
  // If node does not exist, add it
  // If an incoming edge was added in other, it is added in this graph
  // If an incoming edge was deleted in other, it is deleted in this graph
  updateIncomingEdgesForNode(other: DepGraph<T>, node: T): void {
    this.addNode(node)

    // Add edge if it is present in other
    other.forEachInNeighbor(node, (neighbor) => {
      this.addEdge(neighbor, node)
    })

    // For node provided, remove incoming edge if it is absent in other
    this.forEachEdge(([source, target]) => {
      if (target === node && !other.hasEdge(source, target)) {
        this.removeEdge(source, target)
      }
    })
  }

  // Get all leaf nodes (i.e. destination paths) reachable from the node provided
  // Eg. if the graph is A -> B -> C
  //                     D ---^
  // and the node is B, this function returns [C]
  getLeafNodes(node: T): Set<T> {
    let stack: T[] = [node]
    let visited = new Set<T>()
    let leafNodes = new Set<T>()

    // DFS
    while (stack.length > 0) {
      let node = stack.pop()!

      // If the node is already visited, skip it
      if (visited.has(node)) {
        continue
      }
      visited.add(node)

      // Check if the node is a leaf node (i.e. destination path)
      if (this.outDegree(node) === 0) {
        leafNodes.add(node)
      }

      // Add all unvisited neighbors to the stack
      this.forEachOutNeighbor(node, (neighbor) => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor)
        }
      })
    }

    return leafNodes
  }

  // Get all ancestors of the leaf nodes reachable from the node provided
  // Eg. if the graph is A -> B -> C
  //                     D ---^
  // and the node is B, this function returns [A, B, D]
  getLeafNodeAncestors(node: T): Set<T> {
    const leafNodes = this.getLeafNodes(node)
    let visited = new Set<T>()
    let upstreamNodes = new Set<T>()

    // Backwards DFS for each leaf node
    leafNodes.forEach((leafNode) => {
      let stack: T[] = [leafNode]

      while (stack.length > 0) {
        let node = stack.pop()!

        if (visited.has(node)) {
          continue
        }
        visited.add(node)
        // Add node if it's not a leaf node (i.e. destination path)
        // Assumes destination file cannot depend on another destination file
        if (this.outDegree(node) !== 0) {
          upstreamNodes.add(node)
        }

        // Add all unvisited parents to the stack
        this.forEachInNeighbor(node, (parentNode) => {
          if (!visited.has(parentNode)) {
            stack.push(parentNode)
          }
        })
      }
    })

    return upstreamNodes
  }
}
