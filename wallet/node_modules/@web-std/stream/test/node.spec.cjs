const { test: libTest } = require("./lib.spec.cjs")

/**
 * @typedef {uvu.Test} Test
 */

const test = async () => {
  const { test } = await import("./test.js")
  await libTest(test)
  test.run()
}

test()
