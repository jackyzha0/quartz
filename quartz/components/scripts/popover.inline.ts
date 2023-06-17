import { computePosition, inline, shift, autoPlacement } from "@floating-ui/dom"

document.addEventListener("nav", () => {
  const links = [...document.getElementsByClassName("internal")] as HTMLLinkElement[]
  const p = new DOMParser()
  for (const link of links) {
    link.addEventListener("mouseenter", async ({ clientX, clientY }) => {
      if (link.dataset.fetchedPopover === "true") return
      const url = link.href
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
      elts.forEach(elt => popoverElement.appendChild(elt))

      const { x, y } = await computePosition(link, popoverElement, {
        middleware: [inline({
          x: clientX,
          y: clientY
        }), shift(), autoPlacement()]
      })

      Object.assign(popoverElement.style, {
        left: `${x}px`,
        top: `${y}px`,
      })

      link.appendChild(popoverElement)
      link.dataset.fetchedPopover = "true"
    })
  }
})
