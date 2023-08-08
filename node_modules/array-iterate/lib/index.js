const own = {}.hasOwnProperty

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
export function arrayIterate(values, callbackFn, thisArg) {
  let index = -1

  if (!values) {
    throw new Error('Iterate requires that |this| not be ' + values)
  }

  if (!own.call(values, 'length')) {
    throw new Error('Iterate requires that |this| has a `length`')
  }

  if (typeof callbackFn !== 'function') {
    throw new TypeError('`callback` must be a function')
  }

  // The length might change, so we do not cache it.
  while (++index < values.length) {
    // Skip missing values.
    if (!(index in values)) {
      continue
    }

    const result = callbackFn.call(thisArg, values[index], index, values)

    // If `callback` returns a `number`, move `index` over to `number`.
    if (typeof result === 'number') {
      // Make sure that negative numbers do not break the loop.
      if (result < 0) {
        index = 0
      }

      index = result - 1
    }
  }
}
