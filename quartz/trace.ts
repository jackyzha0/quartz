import chalk from "chalk"

const rootFile = /.*at file:/
export function trace(msg: string, err: Error) {
  const stack = err.stack
  console.log()
  console.log(
    "\n" +
      chalk.bgRed.black.bold(" ERROR ") +
      "\n" +
      chalk.red(` ${msg}`) +
      (err.message.length > 0 ? `: ${err.message}` : ""),
  )
  if (!stack) {
    return
  }

  let reachedEndOfLegibleTrace = false
  for (const line of stack.split("\n").slice(1)) {
    if (reachedEndOfLegibleTrace) {
      break
    }

    if (!line.includes("node_modules")) {
      console.log(` ${line}`)
      if (rootFile.test(line)) {
        reachedEndOfLegibleTrace = true
      }
    }
  }
}
