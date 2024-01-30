export function pluralize(count: number, s: string): string {
  if (count === 1) {
    return `1 ${s}`
  } else {
    return `${count} ${s}s`
  }
}

export function capitalize(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1)
}

export function classNames(
  displayClass?: "mobile-only" | "desktop-only",
  ...classes: string[]
): string {
  if (displayClass) {
    classes.push(displayClass)
  }
  return classes.join(" ")
}
