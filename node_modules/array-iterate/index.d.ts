/**
 * Function called for each element in an array.
 *
 * @typeParam Value
 *   Element in array.
 * @typeParam ThisArg
 *   Context object passed as `this`.
 * @param value
 *   Element in array.
 * @param index
 *   Index of `value` in `values`.
 * @param values
 *   List.
 * @param [thisArg]
 *   Context object
 * @returns {number|void}
 *   The `index` to move to next.
 */
export type CallbackFn<Value, ThisArg = undefined> = (
  this: ThisArg,
  value: Value,
  index: number,
  array: Value[]
) => number | void

/**
 * Perform the specified action for each element in an array.
 * When `callbackFn` returns a `number`, moves to the element at that index
 * next.
 *
 * @typeParam Value
 *   Type in `values`.
 * @typeParam ThisArg
 *   Context passed as `this` to callback.
 * @param values
 *   Values to iterate over.
 * @param callbackFn
 *   Function called for each element.
 *   Can return the `index` to move to next.
 * @param [thisArg]
 *   Optional object assigned as `this` in `callbackFn`.
 * @returns {void}
 */
export function arrayIterate<Value, ThisArg = undefined>(
  values: Value[],
  callbackFn: CallbackFn<Value, ThisArg>,
  thisArg?: ThisArg
): void
