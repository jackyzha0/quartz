/**
 * Maps of subsets.
 *
 * Each value is a matrix of tuples.
 * The first value causes parse errors, the second is valid.
 * Of both values, the first value is unsafe, and the second is safe.
 *
 * @type {Record<'name' | 'unquoted' | 'single' | 'double', Array<[Array<string>, Array<string>]>>}
 */
export const constants: Record<
  'name' | 'unquoted' | 'single' | 'double',
  Array<[Array<string>, Array<string>]>
>
