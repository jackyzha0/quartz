/**
 * @typedef {import('../types.js').DocType} DocType
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').State} State
 */
/**
 * Serialize a doctype.
 *
 * @param {DocType} _1
 *   Node to handle.
 * @param {number | undefined} _2
 *   Index of `node` in `parent.
 * @param {Parent | undefined} _3
 *   Parent of `node`.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized node.
 */
export function doctype(
  _1: DocType,
  _2: number | undefined,
  _3: Parent | undefined,
  state: State
): string
export type DocType = import('../types.js').DocType
export type Parent = import('../types.js').Parent
export type State = import('../types.js').State
