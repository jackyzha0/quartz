---
title: "Offline Access (PWA)"
tags:
  - plugin/emitter
---

This plugin allows your website to be accessible offline and be installed as an app. You can enable it by adding `Plugin.Offline(),` to the `emitters` in `quartz.config.ts`

## Offline Capability

Whenever you visit a page it gets cached for offline use. Depending on the kind of content, the process for caching is diffent:

- **Pages** (HTML, your converted Markdown files): Quartz first tries to get them over the Network. If that fails, your browser attempts to fetch it from the cache.
- **Static Resources** (Fonts, CSS Styling, JavaScript): Quartz uses cached resources by default and updates the cache over the network in the background.
- **Images**: Images are saved once and then served from cache. Quartz uses a limited cache of 60 images and images remain in the cache for 30 days

You can edit the fallback page by changing the `offline.md` file in the root of your `content` directory

## Progressive Web App (PWA)

Progressive Web Apps can have [many properties](https://developer.mozilla.org/en-US/docs/Web/Manifest). We're only going to mention the ones Quartz supports by default, however you can edit the offline plugins file to add more in case required.

- **icons**: the `icon.svg` file in the `quartz/static` directory is used for all the icons. This makes it easier to scale the image since you don't need to provide an png for every size
- **name**, **short_name**: Uses the `pageTitle` configured in `quartz.config.ts`
- **description**: Uses the `description` configured in `quartz.config.ts`
- **background_color**, **theme_color**: Uses the `lightMode.light` color configured in `quartz.config.ts`.
- **start_url**: Uses the `baseUrl` configured in `quartz.config.ts`

### Default values

- **display**: this is set to `minimal-ui`
