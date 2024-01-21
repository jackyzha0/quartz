import test, { describe } from "node:test"
import DepGraph from "./depgraph"
import assert from "node:assert"

describe("DepGraph", () => {
  test("getDownstreamLeafNodes", () => {
    const graph = new DepGraph()
    graph.addEdge("A", "B")
    graph.addEdge("B", "C")
    graph.addEdge("D", "C")
    assert.deepStrictEqual(graph.getDownstreamLeafNodes("A"), new Set(["C"]))
    assert.deepStrictEqual(graph.getDownstreamLeafNodes("B"), new Set(["C"]))
    assert.deepStrictEqual(graph.getDownstreamLeafNodes("C"), new Set(["C"]))
    assert.deepStrictEqual(graph.getDownstreamLeafNodes("D"), new Set(["C"]))
  })

  test("getUpstreamsOfDownstreamLeafNodes", () => {
    const graph = new DepGraph()
    graph.addEdge("A", "B")
    graph.addEdge("B", "C")
    graph.addEdge("D", "B")
    assert.deepStrictEqual(graph.getUpstreamsOfDownstreamLeafNodes("A"), new Set(["A", "B", "D"]))
    assert.deepStrictEqual(graph.getUpstreamsOfDownstreamLeafNodes("B"), new Set(["A", "B", "D"]))
    assert.deepStrictEqual(graph.getUpstreamsOfDownstreamLeafNodes("C"), new Set(["A", "B", "D"]))
    assert.deepStrictEqual(graph.getUpstreamsOfDownstreamLeafNodes("D"), new Set(["A", "B", "D"]))
  })

  describe("mergeEdgesForNode", () => {
    test("merges when node exists", () => {
      // A -> B -> C
      const graph = new DepGraph()
      graph.addEdge("A", "B")
      graph.addEdge("B", "C")

      // B -> D
      const other = new DepGraph()
      other.addEdge("B", "D")

      // B -> C removed, B -> D added
      // A -> B -> D
      graph.mergeEdgesForNode(other, "B")

      const expected = {
        options: { type: "directed", multi: false, allowSelfLoops: false },
        attributes: {},
        nodes: [{ key: "A" }, { key: "B" }, { key: "C" }, { key: "D" }],
        edges: [
          { key: "A -> B", source: "A", target: "B" },
          { key: "B -> D", source: "B", target: "D" },
        ],
      }

      assert.deepStrictEqual(graph.graph.toJSON(), expected)
    })

    test("adds node if it does not exist", () => {
      // A -> B
      const graph = new DepGraph()
      graph.addEdge("A", "B")

      // C -> D
      const other = new DepGraph()
      other.addEdge("C", "D")

      // A -> B, C -> D
      graph.mergeEdgesForNode(other, "C")

      const expected = {
        options: { type: "directed", multi: false, allowSelfLoops: false },
        attributes: {},
        nodes: [{ key: "A" }, { key: "B" }, { key: "C" }, { key: "D" }],
        edges: [
          { key: "A -> B", source: "A", target: "B" },
          { key: "C -> D", source: "C", target: "D" },
        ],
      }

      assert.deepStrictEqual(graph.graph.toJSON(), expected)
    })
  })
})
