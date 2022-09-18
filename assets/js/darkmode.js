const userPref = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
const currentTheme = 'dark';
const syntaxTheme = document.querySelector("#theme-link");


{{ $darkSyntax := resources.Get "styles/_dark_syntax.scss" | resources.ToCSS (dict "outputStyle" "compressed") | resources.Fingerprint "md5" | resources.Minify  }}
{{ $lightSyntax := resources.Get "styles/_light_syntax.scss" | resources.ToCSS (dict "outputStyle" "compressed") | resources.Fingerprint "md5" | resources.Minify  }}

if (currentTheme) {
  document.documentElement.setAttribute('saved-theme', currentTheme);
  syntaxTheme.href = currentTheme === 'dark' ?  '{{ $darkSyntax.Permalink }}' :  '{{ $lightSyntax.Permalink }}';
}

const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('saved-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    syntaxTheme.href = '{{ $darkSyntax.Permalink }}';
  }
  else {
    document.documentElement.setAttribute('saved-theme', 'light')
    localStorage.setItem('theme', 'light')
    syntaxTheme.href = '{{ $lightSyntax.Permalink }}';
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
