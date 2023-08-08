/**
 * Serialize a text node.
 *
 * @param {Text | Raw} node
 *   Node to handle.
 * @param {number | undefined} _
 *   Index of `node` in `parent.
 * @param {Parent | undefined} parent
 *   Parent of `node`.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized node.
 */
export function text(
  node: Text | Raw,
  _: number | undefined,
  parent: Parent | undefined,
  state: State
): string
export type State = import('../types.js').State
export type Parent = import('../types.js').Parent
export type Raw = import('../types.js').Raw
export type Text = import('../types.js').Text
