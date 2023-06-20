export function registerEscapeHandler(outsideContainer: HTMLElement | null, cb: () => void) {
  if (!outsideContainer) return
  function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
    if (e.target !== this) return
    e.preventDefault()
    cb()
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return
    e.preventDefault()
    cb()
  }

  outsideContainer?.removeEventListener("click", click)
  outsideContainer?.addEventListener("click", click)
  document.removeEventListener("keydown", esc)
  document.addEventListener('keydown', esc)
}

export function stripIndex(s: string): string {
  return s.endsWith("index") ? s.slice(0, -"index".length) : s
}

export function relative(from: string, to: string) {
  from = encodeURI(stripIndex(from))
  to = encodeURI(stripIndex(to))
  const start = [location.protocol, '//', location.host, location.pathname].join('')
  const trimEnd = from.length === 0 ? start.length : -from.length
  const url = start.slice(0, trimEnd) + to
  return url
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild)
  }
}
