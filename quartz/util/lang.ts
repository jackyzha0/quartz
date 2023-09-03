export function pluralize(count: number, s: string): string {
  if (count === 1) {
    return `1 ${s}`
  } else {
    return `${count} ${s}s`
  }
}
