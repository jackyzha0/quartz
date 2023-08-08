/**
 * @typedef {import('../../types.js').Node} Node
 * @typedef {import('../../types.js').Comment} Comment
 */
/**
 * @param {Node} node
 * @returns {node is Comment}
 */
export function comment(node: Node): node is import('hast').Comment
export type Node = import('../../types.js').Node
export type Comment = import('../../types.js').Comment
