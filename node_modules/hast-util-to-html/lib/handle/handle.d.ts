/**
 * @type {(node: Node, index: number | undefined, parent: Parent | undefined, state: State) => string}
 */
export const handle: (
  node: Node,
  index: number | undefined,
  parent: Parent | undefined,
  state: State
) => string
export type Handle = import('./types.js').Handle
export type State = import('./types.js').State
export type Node = import('./types.js').Node
export type Parent = import('./types.js').Parent
