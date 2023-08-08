/**
 * @typedef {import('unist').Parent} UnistParent
 * @typedef {import('unist').Literal} UnistLiteral
 * @typedef {import('hast').Root} Root
 * @typedef {import('hast').Comment} Comment
 * @typedef {import('hast').DocType} DocType
 * @typedef {import('hast').Element} Element
 * @typedef {import('hast').Text} Text
 * @typedef {import('hast').Content} Content
 * @typedef {import('hast').Properties} Properties
 * @typedef {import('hast-util-raw/complex-types.js').Raw} Raw
 * @typedef {import('stringify-entities').Options} StringifyEntitiesOptions
 * @typedef {import('property-information').Schema} Schema
 */

/**
 * @typedef {Content | Root} Node
 * @typedef {Extract<Node, UnistParent>} Parent
 * @typedef {Properties[keyof Properties]} PropertyValue
 *
 * @callback OmitHandle
 *   Check if a tag can be omitted.
 * @param {Element} element
 *   Element to check.
 * @param {number | undefined} index
 *   Index of element in parent.
 * @param {Parent | undefined} parent
 *   Parent of element.
 * @returns {boolean}
 *   Whether to omit a tag.
 *
 * @typedef {'html' | 'svg'} Space
 *   Namespace.
 *
 * @typedef {Omit<StringifyEntitiesOptions, 'escapeOnly' | 'attribute' | 'subset'>} CharacterReferences
 *
 * @typedef {'"' | "'"} Quote
 *   HTML quotes for attribute values.
 *
 * @typedef Options
 *   Configuration.
 * @property {boolean | null | undefined} [allowDangerousCharacters=false]
 *   Do not encode some characters which cause XSS vulnerabilities in older
 *   browsers.
 *
 *   > ⚠️ **Danger**: only set this if you completely trust the content.
 * @property {boolean | null | undefined} [allowDangerousHtml=false]
 *   Allow `raw` nodes and insert them as raw HTML.
 *
 *   When `false`, `Raw` nodes are encoded.
 *
 *   > ⚠️ **Danger**: only set this if you completely trust the content.
 * @property {boolean | null | undefined} [allowParseErrors=false]
 *   Do not encode characters which cause parse errors (even though they work),
 *   to save bytes.
 *
 *   Not used in the SVG space.
 *
 *   > 👉 **Note**: intentionally creates parse errors in markup (how parse
 *   > errors are handled is well defined, so this works but isn’t pretty).
 * @property {boolean | null | undefined} [bogusComments=false]
 *   Use “bogus comments” instead of comments to save byes: `<?charlie>`
 *   instead of `<!--charlie-->`.
 *
 *   > 👉 **Note**: intentionally creates parse errors in markup (how parse
 *   > errors are handled is well defined, so this works but isn’t pretty).
 * @property {CharacterReferences | null | undefined} [characterReferences]
 *   Configure how to serialize character references.
 * @property {boolean | null | undefined} [closeEmptyElements=false]
 *   Close SVG elements without any content with slash (`/`) on the opening tag
 *   instead of an end tag: `<circle />` instead of `<circle></circle>`.
 *
 *   See `tightSelfClosing` to control whether a space is used before the
 *   slash.
 *
 *   Not used in the HTML space.
 * @property {boolean | null | undefined} [closeSelfClosing=false]
 *   Close self-closing nodes with an extra slash (`/`): `<img />` instead of
 *   `<img>`.
 *
 *   See `tightSelfClosing` to control whether a space is used before the
 *   slash.
 *
 *   Not used in the SVG space.
 * @property {boolean | null | undefined} [collapseEmptyAttributes=false]
 *   Collapse empty attributes: get `class` instead of `class=""`.
 *
 *   Not used in the SVG space.
 *
 *   > 👉 **Note**: boolean attributes (such as `hidden`) are always collapsed.
 * @property {CharacterReferences | null | undefined} [entities]
 *   Deprecated: please use `characterReferences`.
 * @property {boolean | null | undefined} [omitOptionalTags=false]
 *   Omit optional opening and closing tags.
 *
 *   For example, in `<ol><li>one</li><li>two</li></ol>`, both `</li>` closing
 *   tags can be omitted.
 *   The first because it’s followed by another `li`, the last because it’s
 *   followed by nothing.
 *
 *   Not used in the SVG space.
 * @property {boolean | null | undefined} [preferUnquoted=false]
 *   Leave attributes unquoted if that results in less bytes.
 *
 *   Not used in the SVG space.
 * @property {Quote | null | undefined} [quote='"']
 *   Preferred quote to use.
 * @property {boolean | null | undefined} [quoteSmart=false]
 *   Use the other quote if that results in less bytes.
 * @property {Space | null | undefined} [space='html']
 *   When an `<svg>` element is found in the HTML space, this package already
 *   automatically switches to and from the SVG space when entering and exiting
 *   it.
 *
 *   > 👉 **Note**: hast is not XML.
 *   > It supports SVG as embedded in HTML.
 *   > It does not support the features available in XML.
 *   > Passing SVG might break but fragments of modern SVG should be fine.
 *   > Use [`xast`][xast] if you need to support SVG as XML.
 * @property {boolean | null | undefined} [tightAttributes=false]
 *   Join attributes together, without whitespace, if possible: get
 *   `class="a b"title="c d"` instead of `class="a b" title="c d"` to save
 *   bytes.
 *
 *   Not used in the SVG space.
 *
 *   > 👉 **Note**: intentionally creates parse errors in markup (how parse
 *   > errors are handled is well defined, so this works but isn’t pretty).
 * @property {boolean | null | undefined} [tightCommaSeparatedLists=false]
 *   Join known comma-separated attribute values with just a comma (`,`),
 *   instead of padding them on the right as well (`,␠`, where `␠` represents a
 *   space).
 * @property {boolean | null | undefined} [tightDoctype=false]
 *   Drop unneeded spaces in doctypes: `<!doctypehtml>` instead of
 *   `<!doctype html>` to save bytes.
 *
 *   > 👉 **Note**: intentionally creates parse errors in markup (how parse
 *   > errors are handled is well defined, so this works but isn’t pretty).
 * @property {boolean | null | undefined} [tightSelfClosing=false]
 *   Do not use an extra space when closing self-closing elements: `<img/>`
 *   instead of `<img />`.
 *
 *   > 👉 **Note**: only used if `closeSelfClosing: true` or
 *   > `closeEmptyElements: true`.
 * @property {boolean | null | undefined} [upperDoctype=false]
 *   Use a `<!DOCTYPE…` instead of `<!doctype…`.
 *
 *   Useless except for XHTML.
 * @property {ReadonlyArray<string> | null | undefined} [voids]
 *   Tag names of elements to serialize without closing tag.
 *
 *   Not used in the SVG space.
 *
 *   > 👉 **Note**: It’s highly unlikely that you want to pass this, because
 *   > hast is not for XML, and HTML will not add more void elements.
 *
 * @typedef {Omit<Required<{[key in keyof Options]: Exclude<Options[key], null | undefined>}>, 'quote' | 'entities' | 'space'>} Settings
 *
 * @typedef State
 *   Info passed around about the current state.
 * @property {(node: Node, index: number | undefined, parent: Parent | undefined) => string} one
 *   Serialize one node.
 * @property {(node: Parent | undefined) => string} all
 *   Serialize the children of a parent node.
 * @property {Settings} settings
 *   User configuration.
 * @property {Schema} schema
 *   Current schema.
 * @property {Quote} quote
 *   Preferred quote.
 * @property {Quote} alternative
 *   Alternative quote.
 */

export {}
