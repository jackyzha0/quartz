function toggleCallout(this: HTMLElement) {
  const outerBlock = this.parentElement!
  outerBlock.classList.toggle("is-collapsed")
  const collapsed = outerBlock.classList.contains("is-collapsed")
  
  // Check if the block is not collapsed
  if (!collapsed) {
    outerBlock.style.maxHeight = outerBlock.scrollHeight + "px";
    setTimeout(() => {
        outerBlock.style.maxHeight = "";
    }, 150); 
  } else {
    // If the block is already collapsed, reset the maxHeight based on current scroll height
    outerBlock.style.maxHeight = outerBlock.scrollHeight + "px";
    outerBlock.style.maxHeight = this.scrollHeight + "px";
  }

}

function setupCallout() {
  const collapsible = document.getElementsByClassName(
    `callout is-collapsible`,
  ) as HTMLCollectionOf<HTMLElement>
  for (const div of collapsible) {
    const title = div.firstElementChild

    if (title) {
      title.addEventListener("click", toggleCallout)
      window.addCleanup(() => title.removeEventListener("click", toggleCallout))

      const collapsed = div.classList.contains("is-collapsed")
      const height = collapsed ? title.scrollHeight : div.scrollHeight
      div.style.maxHeight = height + "px"
    }
  }
}

document.addEventListener("nav", setupCallout)
window.addEventListener("resize", setupCallout)
