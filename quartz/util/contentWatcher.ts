import type { FilePath } from "./path"

export function pollingEnabled(value: string | undefined): boolean {
  if (value === undefined) return false
  const normalized = value.trim().toLowerCase()
  if (normalized === "false" || normalized === "0") return false
  if (normalized === "true" || normalized === "1") return true
  return normalized.length > 0
}

export function diffContentFiles(known: Set<FilePath>, current: Set<FilePath>) {
  return {
    added: current.difference(known),
    deleted: known.difference(current),
  }
}
