import chalk from "chalk"
import process from "process"
import { isMainThread } from "workerpool"

const rootFile = /.*at file:/
export function trace(msg: string, err: Error) {
  let stack = err.stack ?? ""

  const lines: string[] = []

  lines.push("")
  lines.push(
    "\n" +
      chalk.bgRed.black.bold(" ERROR ") +
      "\n\n" +
      chalk.red(` ${msg}`) +
      (err.message.length > 0 ? `: ${err.message}` : ""),
  )

  let reachedEndOfLegibleTrace = false
  for (const line of stack.split("\n").slice(1)) {
    if (reachedEndOfLegibleTrace) {
      break
    }

    if (!line.includes("node_modules")) {
      lines.push(` ${line}`)
      if (rootFile.test(line)) {
        reachedEndOfLegibleTrace = true
      }
    }
  }

  const traceMsg = lines.join("\n")
  if (!isMainThread) {
    // gather lines and throw
    throw new Error(traceMsg)
  } else {
    // print and exit
    console.error(traceMsg)
    process.exit(1)
  }
}
