/**
 * Layout diagnostics: records where each layout component ended up and why,
 * plus configuration problems found while building the layout (unknown
 * positions, conditions, display modes, unregistered components, ...).
 *
 * Collected while `loadQuartzLayout()` runs. Warnings are printed once (main
 * thread only); the full per-slot report is printed by `quartz build --verbose`.
 */
import { isMainThread } from "node:worker_threads"
import { recordDiagnostic } from "../../util/diagnostics"
import { styleText } from "util"
import type { LayoutPosition } from "./types"

export const LAYOUT_SLOTS: readonly LayoutPosition[] = [
  "header",
  "beforeBody",
  "afterBody",
  "left",
  "right",
  "footer",
]

export function isLayoutSlot(value: unknown): value is LayoutPosition {
  return typeof value === "string" && (LAYOUT_SLOTS as readonly string[]).includes(value)
}

export interface LayoutPlacement {
  /** Plugin name as written in quartz.config.yaml (derived from `source`) */
  plugin: string
  /** Component display name, when known */
  component?: string
  slot: LayoutPosition
  priority: number
  /** "config" = explicit `layout:` block, "manifest" = plugin's defaultPosition */
  origin: "config" | "manifest"
  display?: "mobile-only" | "desktop-only"
  condition?: string
  /** true when `condition` is not a registered condition (component always renders) */
  conditionUnknown?: boolean
  group?: string
}

export interface PageTypeLayoutInfo {
  exclude: string[]
  /** Slots cleared via `positions: { <slot>: [] }` */
  cleared: LayoutPosition[]
  template?: string
  /** Slots whose content differs from the defaults (exclude / positions) */
  customizedSlots: LayoutPosition[]
  placements: LayoutPlacement[]
}

export interface LayoutReport {
  defaults: LayoutPlacement[]
  byPageType: Record<string, PageTypeLayoutInfo>
  /** true when quartz.ts passed overrides to loadQuartzLayout() */
  tsOverrides: { defaults: string[]; byPageType: Record<string, string[]> }
  warnings: string[]
}

export function emptyLayoutReport(): LayoutReport {
  return {
    defaults: [],
    byPageType: {},
    tsOverrides: { defaults: [], byPageType: {} },
    warnings: [],
  }
}

/** Collector passed through the layout builders. */
export class LayoutDiagnostics {
  readonly placements: LayoutPlacement[] = []
  readonly warnings: string[] = []

  warn(message: string): void {
    if (!this.warnings.includes(message)) this.warnings.push(message)
  }

  place(p: LayoutPlacement): void {
    this.placements.push(p)
  }
}

/** Closest candidate by edit distance (case-insensitive), or undefined if nothing is close. */
export function suggest(value: string, candidates: readonly string[]): string | undefined {
  const v = value.toLowerCase()
  let best: string | undefined
  let bestDist = Infinity
  for (const c of candidates) {
    const d = levenshtein(v, c.toLowerCase())
    if (d < bestDist) {
      bestDist = d
      best = c
    }
  }
  return bestDist <= Math.max(2, Math.floor(value.length / 3)) ? best : undefined
}

function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0]
    dp[0] = i
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j]
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1))
      prev = tmp
    }
  }
  return dp[b.length]
}

let lastReport: LayoutReport = emptyLayoutReport()
const printedWarnings = new Set<string>()

/** @internal Called by loadQuartzLayout(). */
export function setLayoutReport(report: LayoutReport): void {
  lastReport = report
}

/** The report from the most recent loadQuartzLayout() call. */
export function getLayoutReport(): LayoutReport {
  return lastReport
}

/** Print layout warnings once per process (main thread only; workers re-load the config). */
export function printLayoutWarnings(warnings: string[]): void {
  for (const w of warnings) {
    recordDiagnostic({ severity: "warning", area: "layout", message: w.replace(/^Layout:\s*/, "") })
  }
  if (!isMainThread || process.env.QUARTZ_CONFIG_QUIET === "1") return
  for (const w of warnings) {
    if (printedWarnings.has(w)) continue
    printedWarnings.add(w)
    console.warn(styleText("yellow", "⚠") + ` Layout: ${w}`)
  }
}

function describePlacement(p: LayoutPlacement): string {
  const parts = [`${p.priority}`.padStart(4), ` ${p.plugin}`]
  if (p.component && p.component !== p.plugin) parts.push(` (${p.component})`)
  const tags: string[] = []
  tags.push(p.origin === "config" ? "config" : "plugin default")
  if (p.group) tags.push(`group: ${p.group}`)
  if (p.display) tags.push(p.display)
  if (p.condition)
    tags.push(`if ${p.condition}${p.conditionUnknown ? " (UNKNOWN, always shown)" : ""}`)
  parts.push(`  [${tags.join(", ")}]`)
  return parts.join("")
}

function formatSlots(placements: LayoutPlacement[], indent: string, onlySlots?: LayoutPosition[]) {
  const lines: string[] = []
  for (const slot of LAYOUT_SLOTS) {
    if (onlySlots && !onlySlots.includes(slot)) continue
    const items = placements.filter((p) => p.slot === slot)
    if (items.length === 0) {
      lines.push(`${indent}${slot}: (empty)`)
      continue
    }
    lines.push(`${indent}${slot}:`)
    for (const p of items) lines.push(`${indent}  ${describePlacement(p)}`)
  }
  return lines
}

/** Slots the built-in frames leave out (plugin frames are not known here). */
const BUILTIN_FRAME_IGNORED_SLOTS: Record<string, LayoutPosition[]> = {
  default: [],
  "full-width": ["left", "right"],
  minimal: ["header", "beforeBody", "afterBody", "left", "right"],
}

export interface PageTypeSummary {
  /** Page type plugin name (e.g. "ContentPage") */
  name: string
  /** Its `layout` key — what `layout.byPageType.<key>` matches */
  layout: string
  /** Frame declared by the page type plugin */
  frame?: string
}

/**
 * Human-readable report. When `pageTypes` is given, lists each page type with
 * its resolved frame and the slots it overrides; otherwise only YAML entries.
 */
export function formatLayoutReport(report: LayoutReport, pageTypes?: PageTypeSummary[]): string {
  const lines: string[] = ["Layout (quartz.config.yaml → slots, sorted by priority):"]
  lines.push("  defaults (all page types unless overridden):")
  lines.push(...formatSlots(report.defaults, "    "))
  if (report.tsOverrides.defaults.length) {
    lines.push(`    quartz.ts overrides slots: ${report.tsOverrides.defaults.join(", ")}`)
  }

  const known = new Set<string>()
  const pts: { key: string; label: string; frame?: string }[] = []
  for (const pt of pageTypes ?? []) {
    known.add(pt.layout)
    pts.push({ key: pt.layout, label: `${pt.layout} (${pt.name})`, frame: pt.frame })
  }
  for (const key of Object.keys(report.byPageType)) {
    if (!known.has(key)) pts.push({ key, label: key })
  }

  for (const pt of pts) {
    const info = report.byPageType[pt.key]
    const tsSlots = report.tsOverrides.byPageType[pt.key] ?? []
    const frame = info?.template ?? pt.frame ?? "default"
    const frameSource = info?.template ? "byPageType.template" : pt.frame ? "page type" : "fallback"
    lines.push(`  ${pt.label}: frame "${frame}" (${frameSource})`)
    const ignored = BUILTIN_FRAME_IGNORED_SLOTS[frame]
    if (ignored?.length) {
      lines.push(`    note: the "${frame}" frame does not render: ${ignored.join(", ")}`)
    }
    if (pageTypes && !known.has(pt.key)) {
      lines.push(
        `    ! no enabled page type uses layout key "${pt.key}" — this override has no effect`,
      )
    }
    if (!info || info.customizedSlots.length === 0) {
      lines.push(
        tsSlots.length
          ? `    quartz.ts overrides slots: ${tsSlots.join(", ")}`
          : "    same slots as defaults",
      )
      continue
    }
    if (info.exclude.length) lines.push(`    exclude: ${info.exclude.join(", ")}`)
    if (info.cleared.length) lines.push(`    cleared: ${info.cleared.join(", ")}`)
    lines.push(...formatSlots(info.placements, "    ", info.customizedSlots))
    if (tsSlots.length) lines.push(`    quartz.ts overrides slots: ${tsSlots.join(", ")}`)
  }

  if (report.warnings.length) {
    lines.push("  warnings:")
    for (const w of report.warnings) lines.push(`    - ${w}`)
  } else {
    lines.push("  no layout warnings")
  }
  return lines.join("\n")
}
