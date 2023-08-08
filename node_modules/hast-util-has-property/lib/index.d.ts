/**
 * Check if `node`is an element and has a `field` property.
 *
 * @param {unknown} node
 *   Thing to check (typically `Element`).
 * @param {unknown} field
 *   Field name to check (typically `string`).
 * @returns {boolean}
 *   Whether `node` is an element that has a `field` property.
 */
export function hasProperty(node: unknown, field: unknown): boolean
export type Root = import('hast').Root
export type Content = import('hast').Content
export type Node = Root | Content
