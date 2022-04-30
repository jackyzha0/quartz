---
title: "Configuration"
tags:
- setup
---

## Configuration
Quartz is designed to be extremely configurable. You can find the bulk of the configuration scattered throughout the repository depending on how in-depth you'd like to get.

The majority of configuration can be be found under `data/config.yaml`. An annotated example configuration is shown below.

```yaml
name: Your name here! # Shows in the footer
enableToc: true # Whether to show a Table of Contents
enableLinkPreview: true # whether to render card previews for links
description: Page description to show to search engines
page_title: Quartz Example Page # Default Page Title

links: # Links to show in footer
  - link_name: Twitter
    link: https://twitter.com/_jzhao
  - link_name: Github
    link: https://github.com/jackyzha0
```

### Graph View
To customize the Interactive Graph view, you can poke around `data/graphConfig.yaml`.

```yaml
enableLegend: false # automatically generate a legend
enableDrag: true # allow dragging nodes in the graph
enableZoom: true # allow zooming and panning the graph
depth: -1 # how many neighbours of the current node to show (-1 is all nodes)
paths: # colour specific nodes path off of their path
  - /moc: "#4388cc"
```


## Styling
Want to go even more in-depth? You can add custom CSS styling and change existing colours through editing `assets/styles/custom.scss`. If you'd like to target specific parts of the site, you can add ids and classes to the HTML partials in `/layouts/partials`. 

### Partials
Partials are what dictate what actually gets rendered to the page. Want to change how pages are styled and structured? You can edit the appropriate layout in `/layouts`.

For example, the structure of the home page can be edited through `/layouts/index.html`. To customize the footer, you can edit `/layouts/partials/footer.html`

More info about partials on [Hugo's website.](https://gohugo.io/templates/partials/)

Still having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).

## Multilingual
[CJK + Latex Support (测试)](notes/CJK%20+%20Latex%20Support%20(测试).md) comes out of the box with Quartz.

Want to support languages that read from right-to-left (like Arabic)? Hugo (and by proxy, Quartz) supports this natively.

Follow the steps [Hugo provides here](https://gohugo.io/content-management/multilingual/#configure-languages) and modify your `config.toml`

For example:

```toml
defaultContentLanguage = 'ar'
[languages]
  [languages.ar]
    languagedirection = 'rtl'
    title = 'مدونتي'
    weight = 1
```
