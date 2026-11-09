---
title: CNAME
description: Emits a CNAME file for custom domain deployment.
tags:
  - plugin/emitter
image:
repository: "[quartz-community/cname](https://github.com/quartz-community/cname)"
enabled: true
required: false
---

This plugin writes a `CNAME` file to the root of the output folder containing the hostname of `configuration.baseUrl` (for `baseUrl: quartz.example.com/docs` that is `quartz.example.com`). Hosts such as GitHub Pages read this file to serve the site on a custom domain. If `baseUrl` is not set, the plugin warns and writes nothing.

If you want to use a custom domain name like `quartz.example.com` for the site, then this is needed.

See [[hosting|Hosting]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Emitter
- Function name: `ExternalPlugin.CNAME()`.
- Source: [`quartz-community/cname`](https://github.com/quartz-community/cname)
- Install: `npx quartz plugin add @quartz-community/cname`
