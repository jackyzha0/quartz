const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
const currentTheme = localStorage.getItem('theme') ?? userPref

if (currentTheme) {
  document.documentElement.setAttribute('saved-theme', currentTheme);
}

const switchTheme = (e) => {
  if (e.checked) {
    document.documentElement.setAttribute('saved-theme', 'dark')
    localStorage.setItem('theme', 'dark')
    document.querySelector('#darkmode-icon').setAttribute('class', 'fa fa-moon-o')
  }
  else {
    document.documentElement.setAttribute('saved-theme', 'light')
    localStorage.setItem('theme', 'light')
    document.querySelector('#darkmode-icon').setAttribute('class', 'fa fa-sun-o')
  }
}

window.addEventListener('DOMContentLoaded', () => {
  // Darkmode toggle
  const toggleSwitch = document.querySelector('#darkmode-toggle')
  const dmSwitch = document.querySelector('#darkmode-switch')

  // listen for toggle
  dmSwitch.addEventListener('click', (e) => {
    toggleSwitch.checked = !toggleSwitch.checked;
    switchTheme(toggleSwitch);
  }, false);


  if (currentTheme === 'dark') {
    toggleSwitch.checked = true
    document.querySelector('#darkmode-icon').setAttribute('class', 'fa fa-moon-o')
  }
})
