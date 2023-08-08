/**
 * @typedef {import('../types.js').State} State
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').Element} Element
 * @typedef {import('../types.js').Properties} Properties
 * @typedef {import('../types.js').PropertyValue} PropertyValue
 */

import {ccount} from 'ccount'
import {stringify as commas} from 'comma-separated-tokens'
import {svg, find} from 'property-information'
import {stringify as spaces} from 'space-separated-tokens'
import {stringifyEntities} from 'stringify-entities'
import {opening} from '../omission/opening.js'
import {closing} from '../omission/closing.js'

/**
 * Maps of subsets.
 *
 * Each value is a matrix of tuples.
 * The value at `0` causes parse errors, the value at `1` is valid.
 * Of both, the value at `0` is unsafe, and the value at `1` is safe.
 *
 * @type {Record<'name' | 'unquoted' | 'single' | 'double', Array<[Array<string>, Array<string>]>>}
 */
const constants = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ['\t\n\f\r &/=>'.split(''), '\t\n\f\r "&\'/=>`'.split('')],
    ['\0\t\n\f\r "&\'/<=>'.split(''), '\0\t\n\f\r "&\'/<=>`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ['\t\n\f\r &>'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')],
    ['\0\t\n\f\r "&\'<=>`'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(''), '"&\'`'.split('')],
    ["\0&'".split(''), '\0"&\'`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(''), '"&\'`'.split('')],
    ['\0"&'.split(''), '\0"&\'`'.split('')]
  ]
}

/**
 * Serialize an element node.
 *
 * @param {Element} node
 *   Node to handle.
 * @param {number | undefined} index
 *   Index of `node` in `parent.
 * @param {Parent | undefined} parent
 *   Parent of `node`.
 * @param {State} state
 *   Info passed around about the current state.
 * @returns {string}
 *   Serialized node.
 */
// eslint-disable-next-line complexity
export function element(node, index, parent, state) {
  const schema = state.schema
  const omit = schema.space === 'svg' ? false : state.settings.omitOptionalTags
  let selfClosing =
    schema.space === 'svg'
      ? state.settings.closeEmptyElements
      : state.settings.voids.includes(node.tagName.toLowerCase())
  /** @type {Array<string>} */
  const parts = []
  /** @type {string} */
  let last

  if (schema.space === 'html' && node.tagName === 'svg') {
    state.schema = svg
  }

  const attrs = serializeAttributes(state, node.properties)

  const content = state.all(
    schema.space === 'html' && node.tagName === 'template' ? node.content : node
  )

  state.schema = schema

  // If the node is categorised as void, but it has children, remove the
  // categorisation.
  // This enables for example `menuitem`s, which are void in W3C HTML but not
  // void in WHATWG HTML, to be stringified properly.
  if (content) selfClosing = false

  if (attrs || !omit || !opening(node, index, parent)) {
    parts.push('<', node.tagName, attrs ? ' ' + attrs : '')

    if (
      selfClosing &&
      (schema.space === 'svg' || state.settings.closeSelfClosing)
    ) {
      last = attrs.charAt(attrs.length - 1)
      if (
        !state.settings.tightSelfClosing ||
        last === '/' ||
        (last && last !== '"' && last !== "'")
      ) {
        parts.push(' ')
      }

      parts.push('/')
    }

    parts.push('>')
  }

  parts.push(content)

  if (!selfClosing && (!omit || !closing(node, index, parent))) {
    parts.push('</' + node.tagName + '>')
  }

  return parts.join('')
}

/**
 * @param {State} state
 * @param {Properties | null | undefined} props
 * @returns {string}
 */
function serializeAttributes(state, props) {
  /** @type {Array<string>} */
  const values = []
  let index = -1
  /** @type {string} */
  let key

  if (props) {
    for (key in props) {
      if (props[key] !== undefined && props[key] !== null) {
        const value = serializeAttribute(state, key, props[key])
        if (value) values.push(value)
      }
    }
  }

  while (++index < values.length) {
    const last = state.settings.tightAttributes
      ? values[index].charAt(values[index].length - 1)
      : null

    // In tight mode, don’t add a space after quoted attributes.
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += ' '
    }
  }

  return values.join('')
}

/**
 * @param {State} state
 * @param {string} key
 * @param {PropertyValue} value
 * @returns {string}
 */
// eslint-disable-next-line complexity
function serializeAttribute(state, key, value) {
  const info = find(state.schema, key)
  const x =
    state.settings.allowParseErrors && state.schema.space === 'html' ? 0 : 1
  const y = state.settings.allowDangerousCharacters ? 0 : 1
  let quote = state.quote
  /** @type {string | undefined} */
  let result

  if (info.overloadedBoolean && (value === info.attribute || value === '')) {
    value = true
  } else if (
    info.boolean ||
    (info.overloadedBoolean && typeof value !== 'string')
  ) {
    value = Boolean(value)
  }

  if (
    value === undefined ||
    value === null ||
    value === false ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return ''
  }

  const name = stringifyEntities(
    info.attribute,
    Object.assign({}, state.settings.characterReferences, {
      // Always encode without parse errors in non-HTML.
      subset: constants.name[x][y]
    })
  )

  // No value.
  // There is currently only one boolean property in SVG: `[download]` on
  // `<a>`.
  // This property does not seem to work in browsers (Firefox, Safari, Chrome),
  // so I can’t test if dropping the value works.
  // But I assume that it should:
  //
  // ```html
  // <!doctype html>
  // <svg viewBox="0 0 100 100">
  //   <a href=https://example.com download>
  //     <circle cx=50 cy=40 r=35 />
  //   </a>
  // </svg>
  // ```
  //
  // See: <https://github.com/wooorm/property-information/blob/main/lib/svg.js>
  if (value === true) return name

  // `spaces` doesn’t accept a second argument, but it’s given here just to
  // keep the code cleaner.
  value = Array.isArray(value)
    ? (info.commaSeparated ? commas : spaces)(value, {
        padLeft: !state.settings.tightCommaSeparatedLists
      })
    : String(value)

  if (state.settings.collapseEmptyAttributes && !value) return name

  // Check unquoted value.
  if (state.settings.preferUnquoted) {
    result = stringifyEntities(
      value,
      Object.assign({}, state.settings.characterReferences, {
        subset: constants.unquoted[x][y],
        attribute: true
      })
    )
  }

  // If we don’t want unquoted, or if `value` contains character references when
  // unquoted…
  if (result !== value) {
    // If the alternative is less common than `quote`, switch.
    if (
      state.settings.quoteSmart &&
      ccount(value, quote) > ccount(value, state.alternative)
    ) {
      quote = state.alternative
    }

    result =
      quote +
      stringifyEntities(
        value,
        Object.assign({}, state.settings.characterReferences, {
          // Always encode without parse errors in non-HTML.
          subset: (quote === "'" ? constants.single : constants.double)[x][y],
          attribute: true
        })
      ) +
      quote
  }

  // Don’t add a `=` for unquoted empties.
  return name + (result ? '=' + result : result)
}
