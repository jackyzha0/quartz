import { computePosition, flip, inline, shift } from "@floating-ui/dom"

document.addEventListener("nav", () => {
  const links = [...document.getElementsByClassName("internal")] as HTMLLinkElement[]
  const p = new DOMParser()
  for (const link of links) {
    link.addEventListener("mouseenter", async ({ clientX, clientY }) => {
      async function setPosition(popoverElement: HTMLElement) {
        const { x, y } = await computePosition(link, popoverElement, {
          middleware: [inline({
            x: clientX,
            y: clientY
          }), shift(), flip()]
        })
        Object.assign(popoverElement.style, {
          left: `${x}px`,
          top: `${y}px`,
        })
      }

      if (link.dataset.fetchedPopover === "true") {
        return setPosition(link.lastChild as HTMLElement)
      }

      const url = link.href
      const anchor = new URL(url).hash
      if (anchor.startsWith("#")) return

      const contents = await fetch(`${url}`)
        .then((res) => res.text())
        .catch((err) => {
          console.error(err)
        })

      if (!contents) return
      const html = p.parseFromString(contents, "text/html")
      const elts = [...html.getElementsByClassName("popover-hint")]
      if (elts.length === 0) return

      const popoverElement = document.createElement("div")
      popoverElement.classList.add("popover")
      const popoverInner = document.createElement("div")
      popoverInner.classList.add("popover-inner")
      popoverElement.appendChild(popoverInner)
      elts.forEach(elt => popoverInner.appendChild(elt))

      setPosition(popoverElement)
      link.appendChild(popoverElement)
      link.dataset.fetchedPopover = "true"
    })
  }
})
