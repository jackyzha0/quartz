;(() => {
  const arrowWrappers = document.getElementsByClassName("a-wrapper")
  const titles = document.getElementsByClassName("title")

  let index = 0
  for (const el of arrowWrappers) {
    const folders = document.getElementsByClassName("folder")
    const folder = folders[index]

    el.addEventListener("click", () => {
      const arrow = el.getElementsByClassName("arrow")[0]
      arrow.classList.toggle("down")
      folder.classList.toggle("active")
    })
    index++
  }

  const singlePage = document.getElementsByClassName("singlePage")[0]
  const body = document.getElementsByTagName("body")[0]
  const blurElement = document.getElementsByClassName("blur-element")[0]
  const aside = document.getElementsByClassName("main-aside")[0]
  const nav_button = document.getElementsByClassName("nav-btn")[0]

  index = 0
  for (const el of titles) {
    const folders = document.getElementsByClassName("folder")
    const folder = folders[index]

    const arrow = document.getElementsByClassName("arrow")[index]
    el.addEventListener("click", () => {
      arrow.classList.add("down")
      folder.classList.add("active")
      body.classList.remove("fixed-position")
      blurElement.classList.remove("enabled")
      aside.classList.add("disabled")
      // nav_button.classList.add("disabled")
      singlePage.classList.remove("blur")
    })
    index++
  }

  blurElement.addEventListener("click", () => {
    blurElement.classList.remove("enabled")
    aside.classList.add("disabled")
    // nav_button.classList.add("disabled")
    body.classList.remove("fixed-position")
    singlePage.classList.remove("blur")
  })

  const pagesLink = document.getElementsByClassName("page-link")
  for (const el of pagesLink) {
    el.addEventListener("click", () => {
      aside.classList.add("disabled")
      // nav_button.classList.add("disabled")
      body.classList.remove("fixed-position")
      blurElement.classList.remove("enabled")
      singlePage.classList.remove("blur")
    })
  }

  nav_button.addEventListener("click", () => {
    singlePage.classList.toggle("blur")
    body.classList.toggle("fixed-position")
    aside.classList.toggle("disabled")
    blurElement.classList.toggle("enabled")
    // nav_button.classList.toggle("disabled")
  })

  document.getElementsByClassName("close-nav-mobile")[0].addEventListener("click", () => {
    aside.classList.add("disabled")
    // nav_button.classList.add("disabled")
    body.classList.remove("fixed-position")
    blurElement.classList.remove("enabled")
    singlePage.classList.remove("blur")
  })
})()
