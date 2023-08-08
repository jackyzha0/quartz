/**
 * Serialize hast as HTML.
 *
 * @param {Node | Array<Content>} tree
 *   Tree to serialize.
 * @param {Options | null | undefined} [options]
 *   Configuration.
 * @returns {string}
 *   Serialized HTML.
 */
export function toHtml(
  tree: Node | Array<Content>,
  options?: Options | null | undefined
): string
/**
 * Serialize all children of `parent`.
 *
 * @this {State}
 *   Info passed around about the current state.
 * @param {Parent | undefined} parent
 *   Parent whose children to serialize.
 * @returns {string}
 */
export function all(
  this: import('./types.js').State,
  parent: Parent | undefined
): string
export type Node = import('./types.js').Node
export type Parent = import('./types.js').Parent
export type Content = import('./types.js').Content
export type Options = import('./types.js').Options
export type State = import('./types.js').State
