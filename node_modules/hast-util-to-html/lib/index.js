/**
 * @typedef {import('./types.js').Node} Node
 * @typedef {import('./types.js').Parent} Parent
 * @typedef {import('./types.js').Content} Content
 * @typedef {import('./types.js').Options} Options
 * @typedef {import('./types.js').State} State
 */

import {html, svg} from 'property-information'
import {htmlVoidElements} from 'html-void-elements'
import {handle} from './handle/index.js'

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
// eslint-disable-next-line complexity
export function toHtml(tree, options) {
  const options_ = options || {}
  const quote = options_.quote || '"'
  const alternative = quote === '"' ? "'" : '"'

  if (quote !== '"' && quote !== "'") {
    throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
  }

  /** @type {State} */
  const state = {
    one,
    all,
    settings: {
      omitOptionalTags: options_.omitOptionalTags || false,
      allowParseErrors: options_.allowParseErrors || false,
      allowDangerousCharacters: options_.allowDangerousCharacters || false,
      quoteSmart: options_.quoteSmart || false,
      preferUnquoted: options_.preferUnquoted || false,
      tightAttributes: options_.tightAttributes || false,
      upperDoctype: options_.upperDoctype || false,
      tightDoctype: options_.tightDoctype || false,
      bogusComments: options_.bogusComments || false,
      tightCommaSeparatedLists: options_.tightCommaSeparatedLists || false,
      tightSelfClosing: options_.tightSelfClosing || false,
      collapseEmptyAttributes: options_.collapseEmptyAttributes || false,
      allowDangerousHtml: options_.allowDangerousHtml || false,
      voids: options_.voids || htmlVoidElements,
      characterReferences:
        options_.characterReferences || options_.entities || {},
      closeSelfClosing: options_.closeSelfClosing || false,
      closeEmptyElements: options_.closeEmptyElements || false
    },
    schema: options_.space === 'svg' ? svg : html,
    quote,
    alternative
  }

  return state.one(
    Array.isArray(tree) ? {type: 'root', children: tree} : tree,
    undefined,
    undefined
  )
}

/**
 * Serialize a node.
 *
 * @this {State}
 *   Info passed around about the current state.
 * @param {Node} node
 *   Node to handle.
 * @param {number | undefined} index
 *   Index of `node` in `parent.
 * @param {Parent | undefined} parent
 *   Parent of `node`.
 * @returns {string}
 *   Serialized node.
 */
function one(node, index, parent) {
  return handle(node, index, parent, this)
}

/**
 * Serialize all children of `parent`.
 *
 * @this {State}
 *   Info passed around about the current state.
 * @param {Parent | undefined} parent
 *   Parent whose children to serialize.
 * @returns {string}
 */
export function all(parent) {
  /** @type {Array<string>} */
  const results = []
  const children = (parent && parent.children) || []
  let index = -1

  while (++index < children.length) {
    results[index] = this.one(children[index], index, parent)
  }

  return results.join('')
}
