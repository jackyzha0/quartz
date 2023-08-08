/**
 * @typedef {import('../types.js').Root} Root
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').State} State
 */
/**
 * Serialize a root.
 *
 * @param {Root} node
 *   Node to handle.
 * @param {number | undefined} _1
 *   Index of `node` in `parent.
 * @param {Parent | undefined} _2
 *   Parent of `node`.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized node.
 */
export function root(
  node: Root,
  _1: number | undefined,
  _2: Parent | undefined,
  state: State
): string
export type Root = import('../types.js').Root
export type Parent = import('../types.js').Parent
export type State = import('../types.js').State
