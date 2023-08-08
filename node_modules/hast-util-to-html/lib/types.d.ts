export type UnistParent = import('unist').Parent
export type UnistLiteral = import('unist').Literal
export type Root = import('hast').Root
export type Comment = import('hast').Comment
export type DocType = import('hast').DocType
export type Element = import('hast').Element
export type Text = import('hast').Text
export type Content = import('hast').Content
export type Properties = import('hast').Properties
export type Raw = import('hast-util-raw/complex-types.js').Raw
export type StringifyEntitiesOptions = import('stringify-entities').Options
export type Schema = import('property-information').Schema
export type Node = Content | Root
export type Parent = Extract<Node, UnistParent>
export type PropertyValue = Properties[keyof Properties]
/**
 * Check if a tag can be omitted.
 */
export type OmitHandle = (
  element: Element,
  index: number | undefined,
  parent: Parent | undefined
) => boolean
/**
 * Namespace.
 */
export type Space = 'html' | 'svg'
export type CharacterReferences = Omit<
  StringifyEntitiesOptions,
  'escapeOnly' | 'attribute' | 'subset'
>
/**
 * HTML quotes for attribute values.
 */
export type Quote = '"' | "'"
/**
 * Configuration.
 */
export type Options = {
  /**
   * Do not encode some characters which cause XSS vulnerabilities in older
   * browsers.
   *
   * > ⚠️ **Danger**: only set this if you completely trust the content.
   */
  allowDangerousCharacters?: boolean | null | undefined
  /**
   * Allow `raw` nodes and insert them as raw HTML.
   *
   * When `false`, `Raw` nodes are encoded.
   *
   * > ⚠️ **Danger**: only set this if you completely trust the content.
   */
  allowDangerousHtml?: boolean | null | undefined
  /**
   * Do not encode characters which cause parse errors (even though they work),
   * to save bytes.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  allowParseErrors?: boolean | null | undefined
  /**
   * Use “bogus comments” instead of comments to save byes: `<?charlie>`
   * instead of `<!--charlie-->`.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  bogusComments?: boolean | null | undefined
  /**
   * Configure how to serialize character references.
   */
  characterReferences?: CharacterReferences | null | undefined
  /**
   * Close SVG elements without any content with slash (`/`) on the opening tag
   * instead of an end tag: `<circle />` instead of `<circle></circle>`.
   *
   * See `tightSelfClosing` to control whether a space is used before the
   * slash.
   *
   * Not used in the HTML space.
   */
  closeEmptyElements?: boolean | null | undefined
  /**
   * Close self-closing nodes with an extra slash (`/`): `<img />` instead of
   * `<img>`.
   *
   * See `tightSelfClosing` to control whether a space is used before the
   * slash.
   *
   * Not used in the SVG space.
   */
  closeSelfClosing?: boolean | null | undefined
  /**
   * Collapse empty attributes: get `class` instead of `class=""`.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: boolean attributes (such as `hidden`) are always collapsed.
   */
  collapseEmptyAttributes?: boolean | null | undefined
  /**
   * Deprecated: please use `characterReferences`.
   */
  entities?: CharacterReferences | null | undefined
  /**
   * Omit optional opening and closing tags.
   *
   * For example, in `<ol><li>one</li><li>two</li></ol>`, both `</li>` closing
   * tags can be omitted.
   * The first because it’s followed by another `li`, the last because it’s
   * followed by nothing.
   *
   * Not used in the SVG space.
   */
  omitOptionalTags?: boolean | null | undefined
  /**
   * Leave attributes unquoted if that results in less bytes.
   *
   * Not used in the SVG space.
   */
  preferUnquoted?: boolean | null | undefined
  /**
   * Preferred quote to use.
   */
  quote?: Quote | null | undefined
  /**
   * Use the other quote if that results in less bytes.
   */
  quoteSmart?: boolean | null | undefined
  /**
   * When an `<svg>` element is found in the HTML space, this package already
   * automatically switches to and from the SVG space when entering and exiting
   * it.
   *
   * > 👉 **Note**: hast is not XML.
   * > It supports SVG as embedded in HTML.
   * > It does not support the features available in XML.
   * > Passing SVG might break but fragments of modern SVG should be fine.
   * > Use [`xast`][xast] if you need to support SVG as XML.
   */
  space?: Space | null | undefined
  /**
   * Join attributes together, without whitespace, if possible: get
   * `class="a b"title="c d"` instead of `class="a b" title="c d"` to save
   * bytes.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  tightAttributes?: boolean | null | undefined
  /**
   * Join known comma-separated attribute values with just a comma (`,`),
   * instead of padding them on the right as well (`,␠`, where `␠` represents a
   * space).
   */
  tightCommaSeparatedLists?: boolean | null | undefined
  /**
   * Drop unneeded spaces in doctypes: `<!doctypehtml>` instead of
   * `<!doctype html>` to save bytes.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  tightDoctype?: boolean | null | undefined
  /**
   * Do not use an extra space when closing self-closing elements: `<img/>`
   * instead of `<img />`.
   *
   * > 👉 **Note**: only used if `closeSelfClosing: true` or
   * > `closeEmptyElements: true`.
   */
  tightSelfClosing?: boolean | null | undefined
  /**
   * Use a `<!DOCTYPE…` instead of `<!doctype…`.
   *
   * Useless except for XHTML.
   */
  upperDoctype?: boolean | null | undefined
  /**
   * Tag names of elements to serialize without closing tag.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: It’s highly unlikely that you want to pass this, because
   * > hast is not for XML, and HTML will not add more void elements.
   */
  voids?: ReadonlyArray<string> | null | undefined
}
export type Settings = {
  /**
   * Do not encode some characters which cause XSS vulnerabilities in older
   * browsers.
   *
   * > ⚠️ **Danger**: only set this if you completely trust the content.
   */
  allowDangerousCharacters: boolean
  /**
   * Allow `raw` nodes and insert them as raw HTML.
   *
   * When `false`, `Raw` nodes are encoded.
   *
   * > ⚠️ **Danger**: only set this if you completely trust the content.
   */
  allowDangerousHtml: boolean
  /**
   * Do not encode characters which cause parse errors (even though they work),
   * to save bytes.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  allowParseErrors: boolean
  /**
   * Use “bogus comments” instead of comments to save byes: `<?charlie>`
   * instead of `<!--charlie-->`.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  bogusComments: boolean
  /**
   * Configure how to serialize character references.
   */
  characterReferences: CharacterReferences
  /**
   * Close SVG elements without any content with slash (`/`) on the opening tag
   * instead of an end tag: `<circle />` instead of `<circle></circle>`.
   *
   * See `tightSelfClosing` to control whether a space is used before the
   * slash.
   *
   * Not used in the HTML space.
   */
  closeEmptyElements: boolean
  /**
   * Close self-closing nodes with an extra slash (`/`): `<img />` instead of
   * `<img>`.
   *
   * See `tightSelfClosing` to control whether a space is used before the
   * slash.
   *
   * Not used in the SVG space.
   */
  closeSelfClosing: boolean
  /**
   * Collapse empty attributes: get `class` instead of `class=""`.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: boolean attributes (such as `hidden`) are always collapsed.
   */
  collapseEmptyAttributes: boolean
  /**
   * Omit optional opening and closing tags.
   *
   * For example, in `<ol><li>one</li><li>two</li></ol>`, both `</li>` closing
   * tags can be omitted.
   * The first because it’s followed by another `li`, the last because it’s
   * followed by nothing.
   *
   * Not used in the SVG space.
   */
  omitOptionalTags: boolean
  /**
   * Leave attributes unquoted if that results in less bytes.
   *
   * Not used in the SVG space.
   */
  preferUnquoted: boolean
  /**
   * Use the other quote if that results in less bytes.
   */
  quoteSmart: boolean
  /**
   * Join attributes together, without whitespace, if possible: get
   * `class="a b"title="c d"` instead of `class="a b" title="c d"` to save
   * bytes.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  tightAttributes: boolean
  /**
   * Join known comma-separated attribute values with just a comma (`,`),
   * instead of padding them on the right as well (`,␠`, where `␠` represents a
   * space).
   */
  tightCommaSeparatedLists: boolean
  /**
   * Drop unneeded spaces in doctypes: `<!doctypehtml>` instead of
   * `<!doctype html>` to save bytes.
   *
   * > 👉 **Note**: intentionally creates parse errors in markup (how parse
   * > errors are handled is well defined, so this works but isn’t pretty).
   */
  tightDoctype: boolean
  /**
   * Do not use an extra space when closing self-closing elements: `<img/>`
   * instead of `<img />`.
   *
   * > 👉 **Note**: only used if `closeSelfClosing: true` or
   * > `closeEmptyElements: true`.
   */
  tightSelfClosing: boolean
  /**
   * Use a `<!DOCTYPE…` instead of `<!doctype…`.
   *
   * Useless except for XHTML.
   */
  upperDoctype: boolean
  /**
   * Tag names of elements to serialize without closing tag.
   *
   * Not used in the SVG space.
   *
   * > 👉 **Note**: It’s highly unlikely that you want to pass this, because
   * > hast is not for XML, and HTML will not add more void elements.
   */
  voids: readonly string[]
}
/**
 * Info passed around about the current state.
 */
export type State = {
  /**
   * Serialize one node.
   */
  one: (
    node: Node,
    index: number | undefined,
    parent: Parent | undefined
  ) => string
  /**
   * Serialize the children of a parent node.
   */
  all: (node: Parent | undefined) => string
  /**
   * User configuration.
   */
  settings: Settings
  /**
   * Current schema.
   */
  schema: Schema
  /**
   * Preferred quote.
   */
  quote: Quote
  /**
   * Alternative quote.
   */
  alternative: Quote
}
