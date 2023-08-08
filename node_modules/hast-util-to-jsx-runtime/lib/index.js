/**
 * @typedef {import('property-information').Schema} Schema
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Root} Root
 * @typedef {import('./components.js').Components} Components
 */

/**
 * @typedef {Content | Root} Node
 * @typedef {Extract<Node, import('unist').Parent>} Parent
 */

/**
 * @typedef {unknown} Fragment
 *   Represent the children, typically a symbol.
 *
 * @callback Jsx
 *   Create a production element.
 * @param {unknown} type
 *   Element type: `Fragment` symbol, tag name (`string`), component.
 * @param {Props} props
 *   Element props, `children`, and maybe `node`.
 * @param {string | undefined} [key]
 *   Dynamicly generated key to use.
 * @returns {JSX.Element}
 *   An element from your framework.
 *
 * @callback JsxDev
 *   Create a development element.
 * @param {unknown} type
 *   Element type: `Fragment` symbol, tag name (`string`), component.
 * @param {Props} props
 *   Element props, `children`, and maybe `node`.
 * @param {string | undefined} key
 *   Dynamicly generated key to use.
 * @param {boolean} isStaticChildren
 *   Whether two or more children are passed (in an array), which is whether
 *   `jsxs` or `jsx` would be used.
 * @param {Source} source
 *   Info about source.
 * @param {undefined} self
 *   Nothing (this is used by frameworks that have components, we don’t).
 * @returns {JSX.Element}
 *   An element from your framework.
 *
 * @typedef {'html' | 'svg'} Space
 *   Namespace.
 *
 *   > 👉 **Note**: hast is not XML.
 *   > It supports SVG as embedded in HTML.
 *   > It does not support the features available in XML.
 *   > Passing SVG might break but fragments of modern SVG should be fine.
 *   > Use `xast` if you need to support SVG as XML.
 *
 * @typedef {'html' | 'react'} ElementAttributeNameCase
 *   Casing to use for attribute names.
 *
 *   HTML casing is for example `class`, `stroke-linecap`, `xml:lang`.
 *   React casing is for example `className`, `strokeLinecap`, `xmlLang`.
 *
 * @typedef {'css' | 'dom'} StylePropertyNameCase
 *   Casing to use for property names in `style` objects.
 *
 *   CSS casing is for example `background-color` and `-webkit-line-clamp`.
 *   DOM casing is for example `backgroundColor` and `WebkitLineClamp`.
 *
 * @typedef Source
 *   Info about source.
 * @property {string | undefined} fileName
 *   Name of source file.
 * @property {number | undefined} lineNumber
 *   Line where thing starts (1-indexed).
 * @property {number | undefined} columnNumber
 *   Column where thing starts (0-indexed).
 *
 * @typedef {Record<string, string>} Style
 *   Style map.
 *
 * @typedef {Style | string | number | boolean} Value
 *   Primitive property value and `Style` map.
 *
 * @typedef {[string, Value]} Field
 *   Property field.
 *
 * @typedef {JSX.Element | string | null | undefined} Child
 *   Child.
 *
 * @typedef {{children?: Array<Child> | Child, node?: Element | undefined, [prop: string]: Value | Element | undefined | Child | Array<Child>}} Props
 *   Properties and children.
 *
 * @callback Create
 *   Create something in development or production.
 * @param {Node} node
 *   hast node.
 * @param {unknown} type
 *   Fragment symbol or tag name.
 * @param {Props} props
 *   Properties and children.
 * @param {string | undefined} key
 *   Key.
 * @returns {JSX.Element}
 *   Result.
 *
 * @typedef State
 *   Info passed around.
 * @property {string | undefined} filePath
 *   File path.
 * @property {Partial<Components>} components
 *   Components to swap.
 * @property {boolean} passKeys
 *   Generate keys to optimize frameworks that support them.
 * @property {boolean} passNode
 *   Pass `node` to components.
 * @property {ElementAttributeNameCase} elementAttributeNameCase
 *   Casing to use for attribute names.
 * @property {StylePropertyNameCase} stylePropertyNameCase
 *   Casing to use for property names in `style` objects.
 * @property {Schema} schema
 *   Current schema.
 * @property {unknown} Fragment
 *   Fragment symbol.
 * @property {Create} create
 *   Create something in development or production.
 *
 * @typedef RegularFields
 *   Configuration.
 * @property {Partial<Components> | null | undefined} [components]
 *   Components to use.
 * @property {string | null | undefined} [filePath]
 *   File path to the original source file.
 *
 *   Passed in source info to `jsxDEV` when using the automatic runtime with
 *   `development: true`.
 * @property {boolean | null | undefined} [passKeys=true]
 *   Generate keys to optimize frameworks that support them.
 *
 *   > 👉 **Note**: Solid currently fails if keys are passed.
 * @property {boolean | null | undefined} [passNode=false]
 *   Pass the hast element node to components.
 * @property {ElementAttributeNameCase | null | undefined} [elementAttributeNameCase='react']
 *   Specify casing to use for attribute names.
 * @property {StylePropertyNameCase | null | undefined} [stylePropertyNameCase='dom']
 *   Specify casing to use for property names in `style` objects.
 * @property {Space | null | undefined} [space='html']
 *   Whether `tree` is in the `'html'` or `'svg'` space.
 *
 *   When an `<svg>` element is found in the HTML space, this package already
 *   automatically switches to and from the SVG space when entering and exiting
 *   it.
 *
 * @typedef RuntimeUnknown
 *   Runtime fields when development might be on or off.
 * @property {Fragment} Fragment
 *   Fragment.
 * @property {Jsx | null | undefined} [jsx]
 *   Dynamic JSX.
 * @property {Jsx | null | undefined} [jsxs]
 *   Static JSX.
 * @property {JsxDev | null | undefined} [jsxDEV]
 *   Development JSX.
 * @property {boolean} development
 *   Whether to use `jsxDEV` (when on) or `jsx` and `jsxs` (when off).
 *
 * @typedef RuntimeProduction
 *   Runtime fields when development is off.
 * @property {Fragment} Fragment
 *   Fragment.
 * @property {Jsx} jsx
 *   Dynamic JSX.
 * @property {Jsx} jsxs
 *   Static JSX.
 * @property {JsxDev | null | undefined} [jsxDEV]
 *   Development JSX.
 * @property {false | null | undefined} [development]
 *   Whether to use `jsxDEV` (when on) or `jsx` and `jsxs` (when off).
 *
 * @typedef RuntimeDevelopment
 *   Runtime fields when development is on.
 * @property {Fragment} Fragment
 *   Fragment.
 * @property {Jsx | null | undefined} [jsx]
 *   Dynamic JSX.
 * @property {Jsx | null | undefined} [jsxs]
 *   Static JSX.
 * @property {JsxDev} jsxDEV
 *   Development JSX.
 * @property {true} development
 *   Whether to use `jsxDEV` (when on) or `jsx` and `jsxs` (when off).
 *
 * @typedef {RuntimeProduction & RegularFields} Production
 *   Configuration (production).
 * @typedef {RuntimeDevelopment & RegularFields} Development
 *   Configuration (development).
 * @typedef {RuntimeUnknown & RegularFields} Unknown
 *   Configuration (production or development).
 *
 * @typedef {Unknown | Production | Development} Options
 *   Configuration.
 */

import {stringify as commas} from 'comma-separated-tokens'
import {html, svg, find, hastToReact} from 'property-information'
import {stringify as spaces} from 'space-separated-tokens'
import styleToObject from 'style-to-object'
import {pointStart} from 'unist-util-position'
import {VFileMessage} from 'vfile-message'
import {whitespace} from 'hast-util-whitespace'

const own = {}.hasOwnProperty

/** @type {Map<string, number>} */
const emptyMap = new Map()

const cap = /[A-Z]/g
const dashSomething = /-([a-z])/g

// `react-dom` triggers a warning for *any* white space in tables.
// To follow GFM, `mdast-util-to-hast` injects line endings between elements.
// Other tools might do so too, but they don’t do here, so we remove all of
// that.

// See: <https://github.com/facebook/react/pull/7081>.
// See: <https://github.com/facebook/react/pull/7515>.
// See: <https://github.com/remarkjs/remark-react/issues/64>.
// See: <https://github.com/rehypejs/rehype-react/pull/29>.
// See: <https://github.com/rehypejs/rehype-react/pull/32>.
// See: <https://github.com/rehypejs/rehype-react/pull/45>.
const tableElements = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr'])

/**
 * Transform a hast tree to preact, react, solid, svelte, vue, etc.,
 * with an automatic JSX runtime.
 *
 * @param {Node} tree
 *   Tree to transform.
 * @param {Options} options
 *   Configuration (required).
 * @returns {JSX.Element}
 *   JSX element.
 */

export function toJsxRuntime(tree, options) {
  if (!options || typeof options.Fragment === 'undefined') {
    throw new TypeError('Expected `Fragment` in options')
  }

  const filePath = options.filePath || undefined
  /** @type {Create} */
  let create

  if (options.development) {
    if (typeof options.jsxDEV !== 'function') {
      throw new TypeError(
        'Expected `jsxDEV` in options when `development: true`'
      )
    }

    create = developmentCreate(filePath, options.jsxDEV)
  } else {
    if (typeof options.jsx !== 'function') {
      throw new TypeError('Expected `jsx` in production options')
    }

    if (typeof options.jsxs !== 'function') {
      throw new TypeError('Expected `jsxs` in production options')
    }

    create = productionCreate(filePath, options.jsx, options.jsxs)
  }

  /** @type {State} */
  const state = {
    Fragment: options.Fragment,
    schema: options.space === 'svg' ? svg : html,
    passKeys: options.passKeys !== false,
    passNode: options.passNode || false,
    elementAttributeNameCase: options.elementAttributeNameCase || 'react',
    stylePropertyNameCase: options.stylePropertyNameCase || 'dom',
    components: options.components || {},
    filePath,
    create
  }

  const result = one(state, tree, undefined)

  // JSX element.
  if (result && typeof result !== 'string') {
    return result
  }

  // Text node or something that turned into nothing.
  return state.create(
    tree,
    state.Fragment,
    {children: result || undefined},
    undefined
  )
}

/**
 * Transform a node.
 *
 * @param {State} state
 *   Info passed around.
 * @param {Node} node
 *   Current node.
 * @param {string | undefined} key
 *   Key.
 * @returns {Child | void}
 *   Child, optional.
 */
function one(state, node, key) {
  if (node.type === 'element' || node.type === 'root') {
    const parentSchema = state.schema
    let schema = parentSchema

    if (
      node.type === 'element' &&
      node.tagName.toLowerCase() === 'svg' &&
      parentSchema.space === 'html'
    ) {
      schema = svg
      state.schema = schema
    }

    let children = createChildren(state, node)
    const props = createProperties(state, node)
    let type = state.Fragment

    if (node.type === 'element') {
      if (children && tableElements.has(node.tagName)) {
        children = children.filter((child) => !whitespace(child))
      }

      if (own.call(state.components, node.tagName)) {
        const key = /** @type {keyof JSX.IntrinsicElements} */ (node.tagName)
        type = state.components[key]

        // If this is swapped out for a component:
        if (type !== 'string' && state.passNode) {
          props.node = node
        }
      } else {
        type = node.tagName
      }
    }

    if (children.length > 0) {
      const value = children.length > 1 ? children : children[0]

      if (value) {
        props.children = value
      }
    }

    // Restore parent schema.
    state.schema = parentSchema

    return state.create(node, type, props, key)
  }

  if (node.type === 'text') {
    return node.value
  }
}

/**
 * @param {string | undefined} _
 *   Path to file.
 * @param {Jsx} jsx
 *   Dynamic.
 * @param {Jsx} jsxs
 *   Static.
 * @returns {Create}
 *   Create a production element.
 */
function productionCreate(_, jsx, jsxs) {
  return create
  /** @type {Create} */
  function create(_, type, props, key) {
    // Only an array when there are 2 or more children.
    const isStaticChildren = Array.isArray(props.children)
    const fn = isStaticChildren ? jsxs : jsx
    return key ? fn(type, props, key) : fn(type, props)
  }
}

/**
 * @param {string | undefined} filePath
 *   Path to file.
 * @param {JsxDev} jsxDEV
 *   Development.
 * @returns {Create}
 *   Create a development element.
 */
function developmentCreate(filePath, jsxDEV) {
  return create
  /** @type {Create} */
  function create(node, type, props, key) {
    // Only an array when there are 2 or more children.
    const isStaticChildren = Array.isArray(props.children)
    const point = pointStart(node)
    return jsxDEV(
      type,
      props,
      key,
      isStaticChildren,
      {
        fileName: filePath,
        lineNumber: point.line === null ? undefined : point.line,
        columnNumber: point.column === null ? undefined : point.column - 1
      },
      undefined
    )
  }
}

/**
 * Create children.
 *
 * @param {State} state
 *   Info passed around.
 * @param {Parent} node
 *   Current element.
 * @returns {Array<Child>}
 *   Children.
 */
function createChildren(state, node) {
  /** @type {Array<Child>} */
  const children = []
  let index = -1
  /** @type {Map<string, number>} */
  // Note: test this when Solid doesn’t want to merge my upcoming PR.
  /* c8 ignore next */
  const countsByTagName = state.passKeys ? new Map() : emptyMap

  while (++index < node.children.length) {
    const child = node.children[index]
    /** @type {string | undefined} */
    let key

    if (state.passKeys && child.type === 'element') {
      const count = countsByTagName.get(child.tagName) || 0
      key = child.tagName + '-' + count
      countsByTagName.set(child.tagName, count + 1)
    }

    const result = one(state, child, key)
    if (result !== undefined) children.push(result)
  }

  return children
}

/**
 * Handle properties.
 *
 * @param {State} state
 *   Info passed around.
 * @param {Parent} node
 *   Current element.
 * @returns {Props}
 *   Props for runtime.
 */
function createProperties(state, node) {
  /** @type {Props} */
  const props = {}
  /** @type {string} */
  let prop

  if ('properties' in node && node.properties) {
    for (prop in node.properties) {
      if (prop !== 'children' && own.call(node.properties, prop)) {
        const result = createProperty(state, node, prop, node.properties[prop])

        if (result) {
          props[result[0]] = result[1]
        }
      }
    }
  }

  return props
}

/**
 * Handle a property.
 *
 * @param {State} state
 *   Info passed around.
 * @param {Element} node
 *   Current element.
 * @param {string} prop
 *   Key.
 * @param {Array<string | number> | string | number | boolean | null | undefined} value
 *   hast property value.
 * @returns {Field | void}
 *   Field for runtime, optional.
 */
function createProperty(state, node, prop, value) {
  const info = find(state.schema, prop)

  // Ignore nullish and `NaN` values.
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'number' && Number.isNaN(value))
  ) {
    return
  }

  if (Array.isArray(value)) {
    // Accept `array`.
    // Most props are space-separated.
    value = info.commaSeparated ? commas(value) : spaces(value)
  }

  // React only accepts `style` as object.
  if (info.property === 'style') {
    let styleObject =
      typeof value === 'object' ? value : parseStyle(state, node, String(value))

    if (state.stylePropertyNameCase === 'css') {
      styleObject = transformStyleToCssCasing(styleObject)
    }

    return ['style', styleObject]
  }

  return [
    state.elementAttributeNameCase === 'react' && info.space
      ? hastToReact[info.property] || info.property
      : info.attribute,
    value
  ]
}

/**
 * Parse a CSS declaration to an object.
 *
 * @param {State} state
 *   Info passed around.
 * @param {Element} node
 *   Current element.
 * @param {string} value
 *   CSS declarations.
 * @returns {Style}
 *   Properties.
 * @throws
 *   Throws `VFileMessage` when CSS cannot be parsed.
 */
function parseStyle(state, node, value) {
  /** @type {Style} */
  const result = {}

  try {
    styleToObject(value, replacer)
  } catch (error_) {
    const error = /** @type {Error} */ (error_)
    const cleanMessage = error.message.replace(/^undefined:\d+:\d+: /, '')

    const message = new VFileMessage(
      'Cannot parse style attribute: ' + cleanMessage,
      node,
      'hast-util-to-jsx-runtime:style'
    )
    message.file = state.filePath || null

    throw message
  }

  return result

  /**
   * Add a CSS property (normal, so with dashes) to `result` as a DOM CSS
   * property.
   *
   * @param {string} name
   *   Key.
   * @param {string} value
   *   Value
   * @returns {void}
   *   Nothing.
   */
  function replacer(name, value) {
    let key = name

    if (key.slice(0, 2) !== '--') {
      if (key.slice(0, 4) === '-ms-') key = 'ms-' + key.slice(4)
      key = key.replace(dashSomething, toCamel)
    }

    result[key] = value
  }
}

/**
 * Transform a DOM casing style object to a CSS casing style object.
 *
 * @param {Style} domCasing
 * @returns {Style}
 */
function transformStyleToCssCasing(domCasing) {
  /** @type {Style} */
  const cssCasing = {}
  /** @type {string} */
  let from

  for (from in domCasing) {
    if (own.call(domCasing, from)) {
      let to = from.replace(cap, toDash)
      // Handle `ms-xxx` -> `-ms-xxx`.
      if (to.slice(0, 3) === 'ms-') to = '-' + to
      cssCasing[to] = domCasing[from]
    }
  }

  return cssCasing
}

/**
 * Make `$1` capitalized.
 *
 * @param {string} _
 *   Whatever.
 * @param {string} $1
 *   Single ASCII alphabetical.
 * @returns {string}
 *   Capitalized `$1`.
 */
function toCamel(_, $1) {
  return $1.toUpperCase()
}

/**
 * Make `$0` dash cased.
 *
 * @param {string} $0
 *   Capitalized ASCII leter.
 * @returns {string}
 *   Dash and lower letter.
 */
function toDash($0) {
  return '-' + $0.toLowerCase()
}
