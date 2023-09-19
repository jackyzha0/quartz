---
tags:
  - plugin/emitter
---

This allows your Website to be accesible offline and be installed as an app. You can use it by adding `Plugin.Offline(),` to the `emitters` in `quartz.config.ts`

## Offline Capability

Whenever you visit a page it gets cached for offline use. Depending on the kind of content, the process for caching is diffent:

- **Pages** (HTML, your converted Markdown files): Quartz first tries to get them over the Network. If that fails is goes back to the Cache
- **Static Resources** (Fonts, CSS Styling, JavaScript): Quartz gets them from cache and updates the cache over the Network in the background. Next time the page loads this new cache is being used
- **Images**: Those are getting saved once and then served from Cache. The amount of images is limited to 60 Images and are valid for 30 Days

You can edit the fallback page by changing the `offline.md` file in the root of your `content` directory

## App

Progressive Web Apps can have [many properties](https://developer.mozilla.org/en-US/docs/Web/Manifest). We're only going to mention the ones Quartz supports by default, however you can edit the offline plugins file to add more in case required.

### Properties taken from configuration

- **icons**: the `icon.svg` file in the `quartz/static` directory is used for all the icons. This makes it easier to scale the image since you don't need to provide an png for every size
- **name** and **short_name**: For this we use the `pageTitle` you configured in `quartz.config.ts`
- **description**: For this we use the `description` you configured in `quartz.config.ts`
- **background_color** and **theme_color**: For this we use the `lightMode.light` color you configured in `quartz.config.ts`. However many browsers don't use that functionality
- **start_url**: Uses the `baseUrl` configured in `quartz.config.ts`

### Default values

- **display**: this is set to `minimal-ui`
