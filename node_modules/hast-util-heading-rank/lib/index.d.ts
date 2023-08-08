/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 */
/**
 * @typedef {Root | Content} Node
 */
/**
 * Get the rank (`1` to `6`) of headings (`h1` to `h6`).
 *
 * @param {Node} node
 *   Node to check.
 * @returns {number | null}
 *   Rank of the heading or `null` if not a heading.
 */
export function headingRank(node: Node): number | null
export type Root = import('hast').Root
export type Content = import('hast').Content
export type Node = Root | Content
