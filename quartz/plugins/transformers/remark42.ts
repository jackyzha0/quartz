import { QuartzTransformerPlugin } from "../types"

// Configuration documented at https://remark42.com/docs/configuration/frontend/
interface Options {
  host: string
  site_id: string
  components?: Array<String>
  max_shown_comments?: number
  max_last_comments?: number
  theme?: 'light' | 'dark'
  page_title?: string // Don't use this, it'll break your comment database. It's included for the sake of completeness.
  locale?: string // Technically an enum, full list at https://remark42.com/docs/configuration/frontend/#locales
  show_email_subscription?: boolean
  show_rss_subscription?: boolean
  simple_view?: boolean
  no_footer?: boolean
}

export const Remark42: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  var scripts = new Array<any>()

  // Put the config into window scope
  var configAsString : string = "var remark_config={"
  for(const key in opts)
  {
    let value = opts[key as keyof Options] // Fucked
    configAsString += key + ":" + "'" + value + "'," // Turbo fucked
  }
  configAsString += "}"
  scripts.push({script:configAsString, loadTime: "afterDOMReady", contentType: "inline"})
  
  // Modify the config based on the client sided theme
  const dynamicTheme : string = `remark_config.theme = document.documentElement.getAttribute('saved-theme')`
  scripts.push({script:dynamicTheme, loadTime: "afterDOMReady", contentType: "inline"})

  // Put the embeddable components into window scope
  function getComment(e : Array<String>) {
    for (var o = 0; o < e.length; o++)
    {
      var src = opts?.host + '/web/' + e[o] + '.js'
      scripts.push({src: src, loadTime: "afterDOMReady", contentType: "external",})
    }
  }
  getComment(opts?.components || ["embed"])
  
  // Allow SPA mode
  const spaRouting : string = `
document.addEventListener("nav", () => {
    ;(function () {
  var host = // Your remark42 host
  var components = ['embed'] // Your choice of remark42 components

  ;(function(c) {
    for (let i = 0; i < c.length; i++) {
      const d = document
      const s = d.createElement('script')
      s.src = remark_config.host + '/web/' + c[i] + '.js'
      s.defer = true
      ;(d.head || d.body).appendChild(s)
    }
  })(components)
})
  })`

  return {
    name: "Remark42",
    options: opts,
    externalResources() {
      return {
        css: [
          // base css
        ],
        js: scripts
      }
    },
  }
}

