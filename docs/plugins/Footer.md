---
title: Footer
description: Page footer with configurable links and text.
tags:
  - plugin/component
image:
repository: "[quartz-community/footer](https://github.com/quartz-community/footer)"
enabled: true
required: false
---

This plugin renders a footer at the bottom of the page with a "Created with Quartz" message, an optional message of your own and a set of configurable links.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Configuration

This plugin accepts the following configuration options:

- `links`: A map of link labels to their URLs to display in the footer. Defaults to `{}`.
- `message`: Extra text shown below the "Created with Quartz" line, e.g. a license notice or contact details. HTML is allowed: `'Licensed under <a href="/license">CC BY 4.0</a>'`. Not set by default.

To change the footer further (styles, different markup), see [[customizing components]].

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/footer
  enabled: true
  options:
    links:
      GitHub: https://github.com/jackyzha0/quartz
      Discord Community: https://discord.gg/cRFFHYye7t
```

## API

- Category: Component
- Function name: `ExternalPlugin.Footer()`.
- Source: [`quartz-community/footer`](https://github.com/quartz-community/footer)
- Install: `npx quartz plugin add github:quartz-community/footer`
