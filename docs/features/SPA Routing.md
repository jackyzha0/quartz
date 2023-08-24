Single-page-app style rendering. This prevents flashes of unstyled content and improves the smoothness of Quartz.

Under the hood, this is done by hijacking page navigations and instead fetching the HTML via a `GET` request and then diffing and selectively replacing parts of the page using [micromorph](https://github.com/natemoo-re/micromorph). This allows us to change the content of the page without fully refreshing the page, reducing the amount of content that the browser needs to load.

## Configuration

- Disable SPA Routing: set the `enableSPA` field of the [[configuration]] in `quartz.config.ts` to be `false`.
