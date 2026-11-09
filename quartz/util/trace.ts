import { styleText } from "util"
import process from "process"
import esbuild from "esbuild"
import { isMainThread } from "workerpool"
import { isContentError, pluginErrorInfo, PluginErrorInfo } from "./pluginErrors"
import { knownProblemsFor } from "./diagnostics"

const rootFile = /.*at file:/
// Stack frames inside plugins are the interesting ones, even though plugins live in node_modules.
const pluginFrame = /node_modules[\\/]@quartz-community[\\/]|[\\/]\.quartz[\\/]plugins[\\/]/

const STAGE_LABEL: Record<PluginErrorInfo["stage"], string> = {
  textTransform: "transforming the raw text of",
  markdown: "transforming the Markdown of",
  html: "transforming the HTML of",
  filter: "deciding whether to publish",
  emit: "emitting files",
  render: "rendering",
  config: "loading the configuration",
}

/**
 * The most useful stack frame of an error thrown while loading a plugin: the first frame inside a
 * plugin package, else the first frame outside node_modules. Returns e.g. "…/graph/dist/index.js:12:5".
 */
export function firstPluginFrame(err: unknown): string | undefined {
  if (!(err instanceof Error) || !err.stack) return undefined
  const frames = err.stack
    .split("\n")
    .slice(1)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("at "))
  const frame =
    frames.find((l) => pluginFrame.test(l)) ?? frames.find((l) => !l.includes("node_modules"))
  if (!frame) return undefined
  const location = frame.match(/\(([^)]+)\)$/)?.[1] ?? frame.slice(3)
  return location.replace(/^file:\/\//, "")
}

/** Lines explaining which plugin failed, why it might have, and where to report it. */
export function describePluginError(info: PluginErrorInfo): string[] {
  const { origin } = info
  const lines: string[] = []
  const what = origin.builtin
    ? `Quartz built-in ${styleText("bold", origin.displayName)}`
    : `plugin ${styleText("bold", origin.displayName)}${origin.version ? `@${origin.version}` : ""}`
  const component = info.component ? ` (component ${info.component})` : ""
  const target = info.file ? ` ${styleText("cyan", info.file)}` : ""
  lines.push(` The error came from ${what}${component} while ${STAGE_LABEL[info.stage]}${target}.`)
  if (!origin.builtin && origin.source !== origin.displayName) {
    lines.push(styleText("gray", `   source: ${origin.source}`))
  }

  const problems = knownProblemsFor(origin)
  if (problems.length > 0) {
    lines.push("")
    lines.push(` Known problems with ${origin.displayName} (reported before the build started):`)
    for (const p of problems.slice(0, 5)) lines.push(styleText("yellow", `   • ${p}`))
  }

  lines.push("")
  if (origin.builtin) {
    lines.push(
      styleText(
        "gray",
        ` This is likely a Quartz bug: https://github.com/jackyzha0/quartz/issues — include the output of \`npx quartz info\`.`,
      ),
    )
  } else {
    lines.push(
      styleText(
        "gray",
        ` To check whether it's the plugin: disable it (\`npx quartz plugin disable ${origin.displayName}\`) and build again.`,
      ),
    )
    lines.push(
      styleText(
        "gray",
        ` Report it${origin.issues ? ` at ${origin.issues}` : " to the plugin's author"} — include the output of \`npx quartz info\`.`,
      ),
    )
  }
  return lines
}

export function trace(msg: string, err: Error) {
  let stack = err.stack ?? ""
  const info = pluginErrorInfo(err)

  const lines: string[] = []

  lines.push("")
  lines.push(
    "\n" +
      styleText(["bgRed", "black", "bold"], " ERROR ") +
      "\n\n" +
      styleText("red", ` ${msg}`) +
      (err.message.length > 0 ? `: ${err.message}` : ""),
  )
  const contentError = isContentError(err)
  if (contentError) {
    // the file needs fixing, not Quartz or a plugin: no plugin details or stack trace
    lines.push("")
    lines.push(
      styleText("gray", " This is a problem in the file's content: fix it and build again."),
    )
  } else if (info) {
    lines.push("")
    lines.push(...describePluginError(info))
  }
  lines.push("")

  let reachedEndOfLegibleTrace = contentError
  for (const line of stack.split("\n").slice(1)) {
    if (reachedEndOfLegibleTrace) {
      break
    }

    if (!line.includes("node_modules") || pluginFrame.test(line)) {
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
    exitBuild(1)
  }
}

/**
 * Exit the build process. esbuild's service is a child process that shares our stderr; exiting
 * while it has requests in flight (bundling component scripts, the CLI's build context) left it
 * running without its parent, and it printed "fatal error: all goroutines are asleep - deadlock!"
 * and a goroutine dump after Quartz's error. Stop it first.
 */
export function exitBuild(code: number): never {
  void esbuild.stop()
  process.exit(code)
}
