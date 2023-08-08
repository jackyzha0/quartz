/**
 * @typedef {import('../../types.js').Parent} Parent
 * @typedef {import('../../types.js').Content} Content
 */

import {whitespace} from 'hast-util-whitespace'

export const siblingAfter = siblings(1)
export const siblingBefore = siblings(-1)

/**
 * Factory to check siblings in a direction.
 *
 * @param {number} increment
 */
function siblings(increment) {
  return sibling

  /**
   * Find applicable siblings in a direction.
   *
   * @param {Parent | null | undefined} parent
   * @param {number | null | undefined} index
   * @param {boolean | null | undefined} [includeWhitespace=false]
   * @returns {Content}
   */
  function sibling(parent, index, includeWhitespace) {
    const siblings = parent ? parent.children : []
    let offset = (index || 0) + increment
    let next = siblings && siblings[offset]

    if (!includeWhitespace) {
      while (next && whitespace(next)) {
        offset += increment
        next = siblings[offset]
      }
    }

    return next
  }
}
