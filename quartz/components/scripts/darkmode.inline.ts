export default "Darkmode"

const currentTheme = localStorage.getItem("theme")
const theme =
  currentTheme ??
  (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")

document.documentElement.setAttribute("saved-theme", theme)

window.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.querySelector("#darkmode-toggle") as HTMLInputElement
  toggleSwitch.addEventListener("change", (e: any) => {
    if (e.target.checked) {
      document.documentElement.setAttribute("saved-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.setAttribute("saved-theme", "light")
      localStorage.setItem("theme", "light")
    }
  })

  if (theme === "dark") {
    toggleSwitch.checked = true
  }
})
