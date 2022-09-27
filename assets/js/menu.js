;(() => {
  // main
  const body = document.getElementsByTagName("body")[0]
  const singlePage = document.getElementsByClassName("singlePage")[0]
  const blurElement = document.getElementsByClassName("blur-element")[0]
  // nav
  const titles = document.getElementsByClassName("title")
  const aside = document.getElementsByClassName("main-aside")[0]
  const nav_button = document.getElementsByClassName("nav-btn")[0]
  const arrows_wrappers = document.getElementsByClassName("a-wrapper")
  const folders = document.getElementsByClassName("folder")
  const nav_mobile_close_button = document.getElementsByClassName("close-nav-mobile")[0]

  let index = 0
  for (const el of arrows_wrappers) {
    const folder = folders[index]

    el.addEventListener("click", () => {
      const arrow = el.getElementsByClassName("arrow")[0]
      arrow.classList.toggle("down")
      folder.classList.toggle("active")
    })
    index++
  }

  index = 0
  for (const el of titles) {
    const folder = folders[index]
    const arrow = document.getElementsByClassName("arrow")[index]

    el.addEventListener("click", () => {
      arrow.classList.add("down")
      folder.classList.add("active")
      body.classList.remove("fixed-position")
      blurElement.classList.remove("enabled")
      aside.classList.add("disabled")
      singlePage.classList.remove("blur")
    })
    index++
  }

  const pagesLink = document.getElementsByClassName("page-link")
  for (const el of pagesLink) {
    el.addEventListener("click", () => {
      aside.classList.add("disabled")
      body.classList.remove("fixed-position")
      blurElement.classList.remove("enabled")
      singlePage.classList.remove("blur")
    })
  }

  blurElement.addEventListener("click", () => {
    aside.classList.add("disabled")
    singlePage.classList.remove("blur")
    body.classList.remove("fixed-position")
    blurElement.classList.remove("enabled")
  })

  nav_button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    singlePage.classList.add("blur")
    aside.classList.remove("disabled")
    blurElement.classList.add("enabled")
    // TO-IMPLEMENT - scroll detection to 0
    setTimeout(() => {
      body.classList.add("fixed-position")
    }, 500)
  })

  nav_mobile_close_button.addEventListener("click", () => {
    aside.classList.add("disabled")
    body.classList.remove("fixed-position")
    blurElement.classList.remove("enabled")
    singlePage.classList.remove("blur")
  })
})()
