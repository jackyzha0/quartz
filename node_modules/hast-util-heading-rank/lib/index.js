/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Content} Content
 */

/**
 * @typedef {Root | Content} Node
 */

// To do next major: return `undefined`.
/**
 * Get the rank (`1` to `6`) of headings (`h1` to `h6`).
 *
 * @param {Node} node
 *   Node to check.
 * @returns {number | null}
 *   Rank of the heading or `null` if not a heading.
 */
export function headingRank(node) {
  const name =
    (node && node.type === 'element' && node.tagName.toLowerCase()) || ''
  const code =
    name.length === 2 && name.charCodeAt(0) === 104 /* `h` */
      ? name.charCodeAt(1)
      : 0
  return code > 48 /* `0` */ && code < 55 /* `7` */ ? code - 48 /* `0` */ : null
}
