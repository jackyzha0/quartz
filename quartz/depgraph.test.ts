import test, { describe } from "node:test"
import DepGraph from "./depgraph"
import assert from "node:assert"

describe("DepGraph", () => {
  test("getLeafNodes", () => {
    const graph = new DepGraph<string>()
    graph.addEdge("A", "B")
    graph.addEdge("B", "C")
    graph.addEdge("D", "C")
    assert.deepStrictEqual(graph.getLeafNodes("A"), new Set(["C"]))
    assert.deepStrictEqual(graph.getLeafNodes("B"), new Set(["C"]))
    assert.deepStrictEqual(graph.getLeafNodes("C"), new Set(["C"]))
    assert.deepStrictEqual(graph.getLeafNodes("D"), new Set(["C"]))
  })

  test("getLeafNodeAncestors", () => {
    const graph = new DepGraph<string>()
    graph.addEdge("A", "B")
    graph.addEdge("B", "C")
    graph.addEdge("D", "B")
    assert.deepStrictEqual(graph.getLeafNodeAncestors("A"), new Set(["A", "B", "D"]))
    assert.deepStrictEqual(graph.getLeafNodeAncestors("B"), new Set(["A", "B", "D"]))
    assert.deepStrictEqual(graph.getLeafNodeAncestors("C"), new Set(["A", "B", "D"]))
    assert.deepStrictEqual(graph.getLeafNodeAncestors("D"), new Set(["A", "B", "D"]))
  })

  describe("mergeEdgesForNode", () => {
    test("merges when node exists", () => {
      // A -> B -> C
      const graph = new DepGraph<string>()
      graph.addEdge("A", "B")
      graph.addEdge("B", "C")

      // B -> D
      const other = new DepGraph<string>()
      other.addEdge("B", "D")

      // B -> C removed, B -> D added
      // A -> B -> D
      graph.mergeEdgesForNode(other, "B")

      const expected = {
        nodes: ["A", "B", "C", "D"],
        edges: [
          ["A", "B"],
          ["B", "D"],
        ],
      }

      console.log(graph.export())

      assert.deepStrictEqual(graph.export(), expected)
    })

    test("adds node if it does not exist", () => {
      // A -> B
      const graph = new DepGraph<string>()
      graph.addEdge("A", "B")

      // C -> D
      const other = new DepGraph<string>()
      other.addEdge("C", "D")

      // A -> B, C -> D
      graph.mergeEdgesForNode(other, "C")

      const expected = {
        nodes: ["A", "B", "C", "D"],
        edges: [
          ["A", "B"],
          ["C", "D"],
        ],
      }

      assert.deepStrictEqual(graph.export(), expected)
    })
  })
})
