/**
 * Find applicable siblings in a direction.
 *
 * @param {Parent | null | undefined} parent
 * @param {number | null | undefined} index
 * @param {boolean | null | undefined} [includeWhitespace=false]
 * @returns {Content}
 */
export function siblingAfter(
  parent: Parent | null | undefined,
  index: number | null | undefined,
  includeWhitespace?: boolean | null | undefined
): Content
/**
 * Find applicable siblings in a direction.
 *
 * @param {Parent | null | undefined} parent
 * @param {number | null | undefined} index
 * @param {boolean | null | undefined} [includeWhitespace=false]
 * @returns {Content}
 */
export function siblingBefore(
  parent: Parent | null | undefined,
  index: number | null | undefined,
  includeWhitespace?: boolean | null | undefined
): Content
export type Parent = import('../../types.js').Parent
export type Content = import('../../types.js').Content
