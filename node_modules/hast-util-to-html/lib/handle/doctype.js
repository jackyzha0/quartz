/**
 * @typedef {import('../types.js').DocType} DocType
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').State} State
 */

/**
 * Serialize a doctype.
 *
 * @param {DocType} _1
 *   Node to handle.
 * @param {number | undefined} _2
 *   Index of `node` in `parent.
 * @param {Parent | undefined} _3
 *   Parent of `node`.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized node.
 */
export function doctype(_1, _2, _3, state) {
  return (
    '<!' +
    (state.settings.upperDoctype ? 'DOCTYPE' : 'doctype') +
    (state.settings.tightDoctype ? '' : ' ') +
    'html>'
  )
}
