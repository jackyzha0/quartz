function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!
  outerBlock.classList.toggle(`is-collapsed`)
  const collapsed = outerBlock.classList.contains(`is-collapsed`)
  const height = collapsed ? this.scrollHeight : outerBlock.scrollHeight
  outerBlock.style.maxHeight = height + `px`
}

function setupCallout() {
  const collapsible = document.getElementsByClassName(`callout is-collapsible`) as HTMLCollectionOf<HTMLElement>
  for (const div of collapsible) {
    const title = div.firstElementChild

    if (title) {
      title.removeEventListener(`click`, toggleCallout)
      title.addEventListener(`click`, toggleCallout)

      const collapsed = div.classList.contains(`is-collapsed`)
      const height = collapsed ? title.scrollHeight : div.scrollHeight
      div.style.maxHeight = height + `px`
    }
  }
}

document.addEventListener(`nav`, setupCallout)
window.addEventListener(`resize`, setupCallout)
