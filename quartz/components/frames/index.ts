import { PageFrame } from "./types"
import { DefaultFrame } from "./DefaultFrame"
import { FullWidthFrame } from "./FullWidthFrame"
import { MinimalFrame } from "./MinimalFrame"
import { frameRegistry } from "./registry"

export type { PageFrame, PageFrameProps } from "./types"
export { DefaultFrame } from "./DefaultFrame"
export { FullWidthFrame } from "./FullWidthFrame"
export { MinimalFrame } from "./MinimalFrame"
export { frameRegistry } from "./registry"
export type { RegisteredFrame } from "./registry"

/**
 * Registry of built-in page frames. Page types can reference these by name
 * via their `frame` property, and YAML config can override via
 * `layout.byPageType.<name>.template`.
 *
 * The "default" frame reproduces the original three-column Quartz layout.
 */
const builtinFrames: Record<string, PageFrame> = {
  default: DefaultFrame,
  "full-width": FullWidthFrame,
  minimal: MinimalFrame,
}

const warnedUnknownFrames = new Set<string>()

/**
 * Resolve a frame by name. Checks plugin-registered frames first,
 * then built-in frames, then falls back to DefaultFrame.
 */
export function resolveFrame(name: string | undefined): PageFrame {
  if (!name || name === "default") {
    return DefaultFrame
  }

  // Check plugin-registered frames first
  const registered = frameRegistry.get(name)
  if (registered) {
    return registered.frame
  }

  // Fall back to built-in frames
  const frame = builtinFrames[name]
  if (!frame) {
    // Called once per rendered page: warn once per unknown name, not per page
    if (warnedUnknownFrames.has(name)) return DefaultFrame
    warnedUnknownFrames.add(name)
    const allFrameNames = [...Object.keys(builtinFrames), ...[...frameRegistry.getAll().keys()]]
    console.warn(
      `Unknown page frame "${name}", falling back to "default". Available frames: ${allFrameNames.join(", ")}`,
    )
    return DefaultFrame
  }
  return frame
}
