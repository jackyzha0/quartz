/**
 * @typedef {import('../types.js').Element} Element
 * @typedef {import('../types.js').Parent} Parent
 * @typedef {import('../types.js').Content} Content
 */

import {whitespace} from 'hast-util-whitespace'
import {siblingBefore, siblingAfter} from './util/siblings.js'
import {closing} from './closing.js'
import {omission} from './omission.js'

export const opening = omission({
  html,
  head,
  body,
  colgroup,
  tbody
})

/**
 * Whether to omit `<html>`.
 *
 * @param {Element} node
 *   Element.
 * @returns {boolean}
 *   Whether the opening tag can be omitted.
 */
function html(node) {
  const head = siblingAfter(node, -1)
  return !head || head.type !== 'comment'
}

/**
 * Whether to omit `<head>`.
 *
 * @param {Element} node
 *   Element.
 * @returns {boolean}
 *   Whether the opening tag can be omitted.
 */
function head(node) {
  const children = node.children
  /** @type {Array<string>} */
  const seen = []
  let index = -1

  while (++index < children.length) {
    const child = children[index]
    if (
      child.type === 'element' &&
      (child.tagName === 'title' || child.tagName === 'base')
    ) {
      if (seen.includes(child.tagName)) return false
      seen.push(child.tagName)
    }
  }

  return children.length > 0
}

/**
 * Whether to omit `<body>`.
 *
 * @param {Element} node
 *   Element.
 * @returns {boolean}
 *   Whether the opening tag can be omitted.
 */
function body(node) {
  const head = siblingAfter(node, -1, true)

  return (
    !head ||
    (head.type !== 'comment' &&
      !(head.type === 'text' && whitespace(head.value.charAt(0))) &&
      !(
        head.type === 'element' &&
        (head.tagName === 'meta' ||
          head.tagName === 'link' ||
          head.tagName === 'script' ||
          head.tagName === 'style' ||
          head.tagName === 'template')
      ))
  )
}

/**
 * Whether to omit `<colgroup>`.
 * The spec describes some logic for the opening tag, but it’s easier to
 * implement in the closing tag, to the same effect, so we handle it there
 * instead.
 *
 * @param {Element} node
 *   Element.
 * @param {number | undefined} index
 *   Index of element in parent.
 * @param {Parent | undefined} parent
 *   Parent of element.
 * @returns {boolean}
 *   Whether the opening tag can be omitted.
 */
function colgroup(node, index, parent) {
  const previous = siblingBefore(parent, index)
  const head = siblingAfter(node, -1, true)

  // Previous colgroup was already omitted.
  if (
    parent &&
    previous &&
    previous.type === 'element' &&
    previous.tagName === 'colgroup' &&
    closing(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && head.type === 'element' && head.tagName === 'col'
}

/**
 * Whether to omit `<tbody>`.
 *
 * @param {Element} node
 *   Element.
 * @param {number | undefined} index
 *   Index of element in parent.
 * @param {Parent | undefined} parent
 *   Parent of element.
 * @returns {boolean}
 *   Whether the opening tag can be omitted.
 */
function tbody(node, index, parent) {
  const previous = siblingBefore(parent, index)
  const head = siblingAfter(node, -1)

  // Previous table section was already omitted.
  if (
    parent &&
    previous &&
    previous.type === 'element' &&
    (previous.tagName === 'thead' || previous.tagName === 'tbody') &&
    closing(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && head.type === 'element' && head.tagName === 'tr'
}
