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

  describe("getLeafNodeAncestors", () => {
    test("gets correct ancestors in a graph without cycles", () => {
      const graph = new DepGraph<string>()
      graph.addEdge("A", "B")
      graph.addEdge("B", "C")
      graph.addEdge("D", "B")
      assert.deepStrictEqual(graph.getLeafNodeAncestors("A"), new Set(["A", "B", "D"]))
      assert.deepStrictEqual(graph.getLeafNodeAncestors("B"), new Set(["A", "B", "D"]))
      assert.deepStrictEqual(graph.getLeafNodeAncestors("C"), new Set(["A", "B", "D"]))
      assert.deepStrictEqual(graph.getLeafNodeAncestors("D"), new Set(["A", "B", "D"]))
    })

    test("gets correct ancestors in a graph with cycles", () => {
      const graph = new DepGraph<string>()
      graph.addEdge("A", "B")
      graph.addEdge("B", "C")
      graph.addEdge("C", "A")
      graph.addEdge("C", "D")
      assert.deepStrictEqual(graph.getLeafNodeAncestors("A"), new Set(["A", "B", "C"]))
      assert.deepStrictEqual(graph.getLeafNodeAncestors("B"), new Set(["A", "B", "C"]))
      assert.deepStrictEqual(graph.getLeafNodeAncestors("C"), new Set(["A", "B", "C"]))
      assert.deepStrictEqual(graph.getLeafNodeAncestors("D"), new Set(["A", "B", "C"]))
    })
  })

  describe("mergeGraph", () => {
    test("merges two graphs", () => {
      const graph = new DepGraph<string>()
      graph.addEdge("A.md", "A.html")

      const other = new DepGraph<string>()
      other.addEdge("B.md", "B.html")

      graph.mergeGraph(other)

      const expected = {
        nodes: ["A.md", "A.html", "B.md", "B.html"],
        edges: [
          ["A.md", "A.html"],
          ["B.md", "B.html"],
        ],
      }

      assert.deepStrictEqual(graph.export(), expected)
    })
  })

  describe("updateIncomingEdgesForNode", () => {
    test("merges when node exists", () => {
      // A.md -> B.md -> B.html
      const graph = new DepGraph<string>()
      graph.addEdge("A.md", "B.md")
      graph.addEdge("B.md", "B.html")

      // B.md is edited so it removes the A.md transclusion
      // and adds C.md transclusion
      // C.md -> B.md
      const other = new DepGraph<string>()
      other.addEdge("C.md", "B.md")
      other.addEdge("B.md", "B.html")

      // A.md -> B.md removed, C.md -> B.md added
      // C.md -> B.md -> B.html
      graph.updateIncomingEdgesForNode(other, "B.md")

      const expected = {
        nodes: ["A.md", "B.md", "B.html", "C.md"],
        edges: [
          ["B.md", "B.html"],
          ["C.md", "B.md"],
        ],
      }

      assert.deepStrictEqual(graph.export(), expected)
    })

    test("adds node if it does not exist", () => {
      // A.md -> B.md
      const graph = new DepGraph<string>()
      graph.addEdge("A.md", "B.md")

      // Add a new file C.md that transcludes B.md
      // B.md -> C.md
      const other = new DepGraph<string>()
      other.addEdge("B.md", "C.md")

      // B.md -> C.md added
      // A.md -> B.md -> C.md
      graph.updateIncomingEdgesForNode(other, "C.md")

      const expected = {
        nodes: ["A.md", "B.md", "C.md"],
        edges: [
          ["A.md", "B.md"],
          ["B.md", "C.md"],
        ],
      }

      assert.deepStrictEqual(graph.export(), expected)
    })
  })
})
