import test, { describe } from "node:test"
import assert from "node:assert"
import {
  OrderItem,
  PluginOrderError,
  constraintList,
  normalizePluginName,
  orderPlugins,
} from "./plugin-order"

const item = (
  name: string,
  order: number,
  c: { before?: string[]; after?: string[] } = {},
): OrderItem<string> => ({ instance: name, order, label: name, names: [name], ...c })
const known = (...names: string[]) => new Set(names.map(normalizePluginName))

describe("orderPlugins", () => {
  test("numeric order, then list position, as before", () => {
    const items = [item("c", 50), item("a", 10), item("b", 50)]
    assert.deepStrictEqual(orderPlugins(items, known("a", "b", "c")), ["a", "c", "b"])
  })

  test("before/after decide between plugins with the same order", () => {
    const items = [item("x", 50, { after: ["y"] }), item("y", 50), item("z", 50, { before: ["y"] })]
    assert.deepStrictEqual(orderPlugins(items, known("x", "y", "z")), ["z", "y", "x"])
  })

  test("one plugin before several others", () => {
    const items = [item("b", 50), item("c", 50), item("a", 50, { before: ["b", "c"] })]
    assert.deepStrictEqual(orderPlugins(items, known("a", "b", "c")), ["a", "b", "c"])
  })

  test("one plugin after several others, and several targets in both directions", () => {
    const items = [item("x", 50, { after: ["z", "y"] }), item("y", 50), item("z", 50)]
    assert.deepStrictEqual(orderPlugins(items, known("x", "y", "z")), ["y", "z", "x"])
    const mixed = [
      item("p", 50),
      item("q", 50, { after: ["r", "s"], before: ["p", "t"] }),
      item("r", 50),
      item("s", 50),
      item("t", 50),
    ]
    assert.deepStrictEqual(orderPlugins(mixed, known("p", "q", "r", "s", "t")), [
      "r",
      "s",
      "q",
      "p",
      "t",
    ])
  })

  test("constraints that agree with order are fine and change nothing", () => {
    const items = [item("late", 70, { after: ["early"] }), item("early", 40, { before: ["late"] })]
    assert.deepStrictEqual(orderPlugins(items, known("late", "early")), ["early", "late"])
  })

  test("a contradiction with order is an error naming both orders", () => {
    assert.throws(
      () => orderPlugins([item("a", 30, { after: ["b"] }), item("b", 60)], known("a", "b")),
      (err: Error) =>
        err instanceof PluginOrderError &&
        /"a" \(order 30\) must run after "b", but "b" has order 60/.test(err.message),
    )
    assert.throws(
      () => orderPlugins([item("a", 60, { before: ["b"] }), item("b", 30)], known("a", "b")),
      /"a" \(order 60\) must run before "b", but "b" has order 30/,
    )
  })

  test("a cycle among equal orders is an error", () => {
    assert.throws(
      () =>
        orderPlugins(
          [item("a", 50, { after: ["b"] }), item("b", 50, { after: ["a"] })],
          known("a", "b"),
        ),
      /cycle among plugins with order 50: a, b/,
    )
  })

  test("names match loosely: package name, kebab-case, instance name", () => {
    const ofm: OrderItem<string> = {
      instance: "ofm",
      order: 40,
      label: "obsidian-flavored-markdown",
      names: ["obsidian-flavored-markdown", "ObsidianFlavoredMarkdown"],
    }
    for (const ref of [
      "ObsidianFlavoredMarkdown",
      "obsidian-flavored-markdown",
      "@quartz-community/obsidian-flavored-markdown",
    ]) {
      const mine = item("mine", 40, { after: [ref] })
      assert.deepStrictEqual(orderPlugins([mine, ofm], known("obsidian-flavored-markdown")), [
        "ofm",
        "mine",
      ])
    }
  })

  test("unknown names are errors; disabled or other-category plugins are skipped", () => {
    assert.throws(
      () => orderPlugins([item("a", 50, { after: ["typo"] })], known("a")),
      /"a": after: "typo" is not a plugin in this config/,
    )
    assert.deepStrictEqual(
      orderPlugins([item("a", 50, { after: ["disabled"] })], known("a", "disabled")),
      ["a"],
    )
  })

  test("a plugin cannot be ordered against itself", () => {
    assert.throws(() => orderPlugins([item("a", 50, { after: ["a"] })], known("a")), /itself/)
  })
})

describe("constraintList", () => {
  test("accepts a name or a list", () => {
    assert.deepStrictEqual(constraintList("x", "after", "p"), ["x"])
    assert.deepStrictEqual(constraintList(["x", "y"], "after", "p"), ["x", "y"])
    assert.deepStrictEqual(constraintList(undefined, "after", "p"), [])
  })
  test("rejects other values", () => {
    assert.throws(() => constraintList(3, "after", "p"), PluginOrderError)
    assert.throws(() => constraintList([""], "before", "p"), /"before" must be/)
  })
})
