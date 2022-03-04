import { test as libTest } from "./lib.spec.js"

import { test } from "./test.js"

libTest(test)
test.run()
