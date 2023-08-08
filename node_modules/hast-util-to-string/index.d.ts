/**
 * @fileoverview
 *   Get the plain-text value of a hast node.
 * @longdescription
 *   ## Use
 *
 *   ```js
 *   import {h} from 'hastscript'
 *   import {toString} from 'hast-util-to-string'
 *
 *   toString(h('p', 'Alpha'))
 *   //=> 'Alpha'
 *   toString(h('div', [h('b', 'Bold'), ' and ', h('i', 'italic'), '.']))
 *   //=> 'Bold and italic.'
 *   ```
 *
 *   ## API
 *
 *   ### `toString(node)`
 *
 *   Transform a node to a string.
 */
/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Element} Element
 * @typedef {Root|Root['children'][number]} Node
 */
/**
 * Get the plain-text value of a hast node.
 *
 * @param {Node} node
 * @returns {string}
 */
export function toString(node: Node): string
export type Root = import('hast').Root
export type Element = import('hast').Element
export type Node = Root | Root['children'][number]
