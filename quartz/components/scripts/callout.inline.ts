function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!
  this.classList.toggle(`is-collapsed`)
  const collapsed = this.classList.contains(`is-collapsed`)
  const height = collapsed ? this.scrollHeight : outerBlock.scrollHeight
  outerBlock.style.maxHeight = height + `px`
}

function setupCallout(div: HTMLElement) {
  const collapsed = div.classList.contains(`is-collapsed`)
  const title = div.firstElementChild!
  const height = collapsed ? title.scrollHeight : div.scrollHeight
  div.style.maxHeight = height + `px`
}

document.addEventListener(`nav`, () => {
  const collapsible = document.getElementsByClassName(`callout is-collapsible`) as HTMLCollectionOf<HTMLElement>
  for (const div of collapsible) {
    const title = div.firstElementChild
    setupCallout(div)
    title?.removeEventListener(`click`, toggleCallout)
    title?.addEventListener(`click`, toggleCallout)
  }
})
