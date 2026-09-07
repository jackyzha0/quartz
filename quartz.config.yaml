# yaml-language-server: $schema=./quartz/plugins/quartz-plugins.schema.json
configuration:
  pageTitle: Quartz 5
  pageTitleSuffix: ""
  enableSPA: true
  enablePopovers: true
  analytics:
    provider: plausible
  locale: en-US
  baseUrl: quartz.jzhao.xyz
  ignorePatterns:
    - private
    - templates
    - .obsidian
  theme:
    fontOrigin: googleFonts
    cdnCaching: true
    typography:
      header: Schibsted Grotesk
      body: Source Sans Pro
      code: IBM Plex Mono
    colors:
      lightMode:
        light: "#faf8f8"
        lightgray: "#e5e5e5"
        gray: "#b8b8b8"
        darkgray: "#4e4e4e"
        dark: "#2b2b2b"
        secondary: "#284b63"
        tertiary: "#84a59d"
        highlight: rgba(143, 159, 169, 0.15)
        textHighlight: "#fff23688"
      darkMode:
        light: "#161618"
        lightgray: "#393639"
        gray: "#646464"
        darkgray: "#d4d4d4"
        dark: "#ebebec"
        secondary: "#7b97aa"
        tertiary: "#84a59d"
        highlight: rgba(143, 159, 169, 0.15)
        textHighlight: "#b3aa0288"
plugins:
  - source: "@quartz-community/created-modified-date"
    enabled: true
    options:
      defaultDateType: modified
      priority:
        - frontmatter
        - git
        - filesystem
    order: 10
  - source: "@quartz-community/syntax-highlighting"
    enabled: true
    options:
      theme:
        light: github-light
        dark: github-dark
      keepBackground: false
    order: 20
  - source: "@quartz-community/obsidian-flavored-markdown"
    enabled: true
    options:
      enableInHtmlEmbed: false
      enableCheckbox: true
    order: 30
  - source: "@quartz-community/github-flavored-markdown"
    enabled: true
    order: 40
  - source: "@quartz-community/table-of-contents"
    enabled: true
    order: 50
    layout:
      position: right
      priority: 30
  - source: "@quartz-community/crawl-links"
    enabled: true
    options:
      markdownLinkResolution: shortest
    order: 60
  - source: "@quartz-community/description"
    enabled: true
    order: 70
  - source: "@quartz-community/latex"
    enabled: true
    options:
      renderEngine: katex
    order: 80
  - source: "@quartz-community/citations"
    enabled: false
    order: 85
  - source: "@quartz-community/hard-line-breaks"
    enabled: false
    order: 90
  - source: "@quartz-community/ox-hugo"
    enabled: false
    order: 91
  - source: "@quartz-community/roam"
    enabled: false
    order: 92
  - source: "@quartz-community/quartz-fonts"
    enabled: true
  - source: "@quartz-themes/core"
    enabled: false
    options:
      theme: tokyo-night
      mode: both
  - source: "@quartz-community/remove-draft"
    enabled: true
  - source: "@quartz-community/explicit-publish"
    enabled: false
  - source: "@quartz-community/alias-redirects"
    enabled: true
  - source: "@quartz-community/content-index"
    enabled: true
    options:
      enableSiteMap: true
      enableRSS: true
  - source: "@quartz-community/favicon"
    enabled: true
  - source: "@quartz-community/og-image"
    enabled: true
  - source: "@quartz-community/cname"
    enabled: true
  - source: "@quartz-community/canvas-page"
    enabled: true
  - source: "@quartz-community/content-page"
    enabled: true
  - source: "@quartz-community/folder-page"
    enabled: true
  - source: "@quartz-community/tag-page"
    enabled: true
  - source: "@quartz-community/explorer"
    enabled: true
    layout:
      position: left
      priority: 50
  - source: "@quartz-community/graph"
    enabled: true
    layout:
      position: right
      priority: 10
  - source: "@quartz-community/search"
    enabled: true
    layout:
      position: left
      priority: 20
      group: toolbar
      groupOptions:
        grow: true
  - source: "@quartz-community/backlinks"
    enabled: true
    layout:
      position: right
      priority: 50
  - source: "@quartz-community/article-title"
    enabled: true
    layout:
      position: beforeBody
      priority: 10
  - source: "@quartz-community/content-meta"
    enabled: true
    layout:
      position: beforeBody
      priority: 20
  - source: "@quartz-community/tag-list"
    enabled: false
    layout:
      position: beforeBody
      priority: 30
  - source: "@quartz-community/page-title"
    enabled: true
    layout:
      position: left
      priority: 10
  - source: "@quartz-community/darkmode"
    enabled: true
    layout:
      position: left
      priority: 30
      group: toolbar
  - source: "@quartz-community/reader-mode"
    enabled: true
    layout:
      position: left
      priority: 35
      group: toolbar
  - source: "@quartz-community/breadcrumbs"
    enabled: true
    layout:
      position: beforeBody
      priority: 5
      condition: not-index
  - source: "@quartz-community/comments"
    enabled: false
    options:
      provider: giscus
      options: {}
    layout:
      position: afterBody
      priority: 10
  - source: "@quartz-community/footer"
    enabled: true
    options:
      links:
        GitHub: https://github.com/jackyzha0/quartz
        Discord Community: https://discord.gg/cRFFHYye7t
    layout:
      position: footer
      priority: 50
  - source: "@quartz-community/recent-notes"
    enabled: false
  - source: "@quartz-community/spacer"
    enabled: true
    options: {}
    order: 25
    layout:
      position: left
      priority: 25
      display: mobile-only
  - source: "@quartz-community/bases-page"
    enabled: true
    options: {}
    order: 50
  - source: "@quartz-community/note-properties"
    enabled: true
    options:
      includeAll: false
      includedProperties:
        - description
        - tags
        - aliases
      excludedProperties: []
      hidePropertiesView: false
      delimiters: ---
      language: yaml
    order: 5
    layout:
      position: beforeBody
      priority: 15
      display: all
  - source: "@quartz-community/unlisted-pages"
    enabled: true
    options: {}
    order: 45
  - source: "@quartz-community/encrypted-pages"
    enabled: true
    options:
      iterations: 600000
      passwordField: password
      unlistWhenEncrypted: false
      outputPath: static/encryptedContentIndex.json
    order: 900
  - source: "@quartz-community/stacked-pages"
    enabled: false
    layout:
      position: afterBody
      priority: 50
      display: all
layout:
  groups:
    toolbar:
      priority: 35
      direction: row
      gap: 0.5rem
  byPageType:
    "404":
      positions:
        beforeBody: []
        left: []
        right: []
    content: {}
    folder:
      exclude:
        - reader-mode
      positions:
        right: []
    tag:
      exclude:
        - reader-mode
      positions:
        right: []
    canvas: {}
    bases: {}
