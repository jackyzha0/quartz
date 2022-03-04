import * as uvu from "uvu"
import * as uvuassert from "uvu/assert"

const deepEqual = uvuassert.equal
const isEqual = uvuassert.equal
const isEquivalent = uvuassert.equal
export const assert = { ...uvuassert, deepEqual, isEqual, isEquivalent }
export const test = Object.assign(uvu.test, {
  test: uvu.test,
  assert,
})

/**
 * @typedef {test} Test
 */
