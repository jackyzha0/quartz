import type { PluggableList, Pluggable } from "unified"
import type { VFile } from "vfile"
import { PluginOrigin, getPluginOrigin } from "./diagnostics"

/**
 * Attribute errors to the plugin that threw them.
 *
 * Without this, an exception inside a plugin's remark/rehype transformer, filter or component
 * surfaces as "Failed to process markdown `x.md`: Cannot read properties of undefined" with a
 * stack trace whose plugin frames are hidden (they live in node_modules) — nothing tells the user
 * *which* plugin broke. Wrapped hooks rethrow a {@link PluginError} carrying the plugin's origin,
 * the pipeline stage and the file/page; `trace()` prints those details plus known problems with the
 * plugin and where to report it.
 */

export type PluginStage =
  "textTransform" | "markdown" | "html" | "filter" | "emit" | "render" | "config"

export interface PluginErrorInfo {
  origin: PluginOrigin
  stage: PluginStage
  /** Source file or page slug being processed. */
  file?: string
  /** Component export name, for render errors. */
  component?: string
}

/** Error thrown by (or attributed to) a plugin. `quartzPlugin` survives module copies (duck-typed). */
export class PluginError extends Error {
  readonly quartzPlugin: PluginErrorInfo
  constructor(cause: unknown, info: PluginErrorInfo) {
    const base = cause instanceof Error ? cause : new Error(String(cause))
    super(base.message, { cause: base })
    this.name = base.name
    this.quartzPlugin = info
    // keep the original stack: its frames point into the plugin
    this.stack = base.stack
  }
}

/**
 * An error in a file's content (e.g. invalid frontmatter), not in Quartz or a plugin: `trace()` tells
 * the user to fix the file instead of reporting a bug. `quartzContent` survives module copies.
 */
export class ContentError extends Error {
  readonly quartzContent = true
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options)
    this.name = "ContentError"
  }
}

const fileErrorReasons: Record<string, string> = {
  EACCES: "permission denied",
  EPERM: "permission denied",
  EISDIR: "it is a directory",
  ENOENT: "it no longer exists",
}

/**
 * A {@link ContentError} for a content file that can't be read (`err` from `fs`), or `undefined`
 * when `err` is not a file-system error.
 */
export function unreadableFileError(err: unknown, file: string): ContentError | undefined {
  const code = (err as NodeJS.ErrnoException | null)?.code
  if (typeof code !== "string") return undefined
  const reason = fileErrorReasons[code] ?? (err as Error).message
  return new ContentError(`Cannot read \`${file}\`: ${reason} (${code})`, { cause: err })
}

/** Whether `err` or one of its causes (e.g. inside a {@link PluginError}) is a {@link ContentError}. */
export function isContentError(err: unknown): boolean {
  let e = err
  for (let depth = 0; depth < 10 && e && typeof e === "object"; depth++) {
    if ((e as { quartzContent?: unknown }).quartzContent === true) return true
    e = (e as { cause?: unknown }).cause
  }
  return false
}

export function pluginErrorInfo(err: unknown): PluginErrorInfo | undefined {
  const info = (err as { quartzPlugin?: PluginErrorInfo } | null)?.quartzPlugin
  return info && typeof info === "object" && info.origin ? info : undefined
}

/** Wrap `err` with plugin info unless it already carries some (innermost attribution wins). */
export function attributeError(err: unknown, info: PluginErrorInfo): unknown {
  if (pluginErrorInfo(err)) return err
  return new PluginError(err, info)
}

function fileLabel(file: VFile | undefined): string | undefined {
  if (!file) return undefined
  const data = file.data as { relativePath?: string; slug?: string } | undefined
  return data?.relativePath ?? file.path ?? data?.slug
}

type Transformer = (...args: unknown[]) => unknown
type Attacher = (this: unknown, ...args: unknown[]) => Transformer | void

function wrapTransformer(fn: Transformer, origin: PluginOrigin, stage: PluginStage): Transformer {
  const fail = (err: unknown, file: VFile | undefined) =>
    attributeError(err, { origin, stage, file: fileLabel(file) })
  // unified (trough) passes a `next` callback only to transformers declaring 3+ parameters
  if (fn.length >= 3) {
    return function (this: unknown, tree: unknown, file: unknown, next: unknown) {
      const done = next as (err?: unknown, ...rest: unknown[]) => void
      try {
        return fn.call(this, tree, file, (err?: unknown, ...rest: unknown[]) =>
          done(err ? fail(err, file as VFile) : err, ...rest),
        )
      } catch (err) {
        throw fail(err, file as VFile)
      }
    }
  }
  return function (this: unknown, tree: unknown, file: unknown) {
    try {
      const result = fn.call(this, tree, file)
      if (result && typeof (result as Promise<unknown>).then === "function") {
        return (result as Promise<unknown>).then(undefined, (err: unknown) => {
          throw fail(err, file as VFile)
        })
      }
      return result
    } catch (err) {
      throw fail(err, file as VFile)
    }
  }
}

// One wrapper per attacher: unified de-duplicates plugins by identity (using the same remark
// plugin twice merges its options), and that must keep working. Shared attachers are attributed
// to the first plugin that uses them.
const wrappedAttachers = new WeakMap<Attacher, Attacher>()

function wrapAttacher(attacher: Attacher, origin: PluginOrigin, stage: PluginStage): Attacher {
  const cached = wrappedAttachers.get(attacher)
  if (cached) return cached
  const wrapped = function (this: unknown, ...args: unknown[]) {
    let transformer: Transformer | void
    try {
      transformer = attacher.apply(this, args)
    } catch (err) {
      throw attributeError(err, { origin, stage })
    }
    return typeof transformer === "function"
      ? wrapTransformer(transformer, origin, stage)
      : transformer
  } as Attacher
  Object.defineProperty(wrapped, "name", { value: attacher.name })
  wrappedAttachers.set(attacher, wrapped)
  return wrapped
}

/** Wrap every attacher of a plugin's `markdownPlugins` / `htmlPlugins` list. */
export function attributePluggables(
  list: PluggableList,
  origin: PluginOrigin | undefined,
  stage: PluginStage,
): PluggableList {
  if (!origin) return list
  return list.map((item): Pluggable => {
    if (typeof item === "function")
      return wrapAttacher(item as Attacher, origin, stage) as Pluggable
    if (Array.isArray(item) && typeof item[0] === "function") {
      const [attacher, ...settings] = item
      return [wrapAttacher(attacher as Attacher, origin, stage), ...settings] as Pluggable
    }
    return item // presets: left as is
  })
}

/** Origin for a plugin instance, falling back to its name (third-party code paths, tests). */
export function originOf(instance: { name?: string } & object): PluginOrigin {
  return (
    getPluginOrigin(instance) ?? {
      name: instance.name ?? "unknown",
      displayName: instance.name ?? "unknown",
      source: instance.name ?? "unknown",
    }
  )
}
