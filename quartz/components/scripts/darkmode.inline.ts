const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
const currentTheme = localStorage.getItem('theme') ?? userPref
document.documentElement.setAttribute('saved-theme', currentTheme)

document.addEventListener("nav", () => {
  const switchTheme = (e: any) => {
    if (e.target.checked) {
      document.documentElement.setAttribute('saved-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    }
    else {
      document.documentElement.setAttribute('saved-theme', 'light')
      localStorage.setItem('theme', 'light')
    }
  }

  // Darkmode toggle
  const toggleSwitch = document.querySelector('#darkmode-toggle') as HTMLInputElement
  toggleSwitch.removeEventListener('change', switchTheme)
  toggleSwitch.addEventListener('change', switchTheme)
  if (currentTheme === 'dark') {
    toggleSwitch.checked = true
  }
})
