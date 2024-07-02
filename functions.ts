import { Options } from "./quartz/components/ExplorerNode"

export const mapFn: Options["mapFn"] = (node) => {
  node.displayName = node.displayName.toLowerCase()

  if (node.depth > 0) {
    if (node.file) {
      if (node.file.relativePath?.includes("daily/")) {
        node.displayName = "🗓️ " + node.displayName
      } else {
        node.displayName = "📄 " + node.displayName
      }
    } else {
      node.displayName = "📁 " + node.displayName
    }
  }
}

export const sortFn: Options["sortFn"] = (a, b, order = "ASC") => {
  const isDateFormatted = (name: string): boolean => /^\d{4}-\d{2}-\d{2}/.test(name)

  const getDate = (name: string): Date | null => {
    const match = name.match(/^(\d{4})-(\d{2})-(\d{2})/)
    return match ? new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3])) : null
  }

  // Determine sort multiplier for ascending/descending
  const multiplier = order === "DESC" ? -1 : 1

  if (isDateFormatted(a.name) && isDateFormatted(b.name)) {
    const dateA = getDate(a.name)
    const dateB = getDate(b.name)
    if (dateA && dateB) {
      return (dateB.getTime() - dateA.getTime()) * multiplier
    }
  }

  if (!a.file && !b.file) {
    if (/\d+/.test(a.name) && /\d+/.test(b.name)) {
      return (parseInt(b.name) - parseInt(a.name)) * multiplier
    }
    return (
      a.name.localeCompare(b.name, undefined, {
        numeric: true,
        sensitivity: "base",
      }) * multiplier
    )
  }

  if (a.file && !b.file) return 1
  if (!a.file && b.file) return -1

  return (
    a.name.localeCompare(b.name, undefined, {
      numeric: true,
      sensitivity: "base",
    }) * multiplier
  )
}
