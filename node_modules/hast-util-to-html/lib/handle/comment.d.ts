/**
 * Serialize a comment.
 *
 * @param {Comment} node
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
export function comment(
  node: Comment,
  _1: number | undefined,
  _2: Parent | undefined,
  state: State
): string
export type Comment = import('../types.js').Comment
export type Parent = import('../types.js').Parent
export type State = import('../types.js').State
