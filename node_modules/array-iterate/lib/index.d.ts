/**
 * Perform the specified action for each element in an array.
 * When `callbackFn` returns a `number`, moves to the element at that index
 * next.
 *
 * @param {unknown[]} values
 *   Values to iterate over.
 * @param {(this: unknown, value: unknown, index: number, array: unknown[]) => number | void} callbackFn
 *   Function called for each element.
 *   Can return the `index` to move to next.
 * @param {unknown} [thisArg]
 *   Optional object assigned as `this` in `callbackFn`.
 * @returns {void}
 */
export function arrayIterate(
  values: unknown[],
  callbackFn: (
    this: unknown,
    value: unknown,
    index: number,
    array: unknown[]
  ) => number | void,
  thisArg?: unknown
): void
