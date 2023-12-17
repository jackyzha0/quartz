Quartz creates an RSS feed for all the content on your site by generating an `index.xml` file that RSS readers can subscribe to. Because of the RSS spec, this requires the `baseUrl` property in your [[configuration]] to be set properly for RSS readers to pick it up properly.

## Configuration

- Remove RSS feed: set the `enableRSS` field of `Plugin.ContentIndex` in `quartz.config.ts` to be `false`.
- Change number of entries: set the `rssLimit` field of `Plugin.ContentIndex` to be the desired value. It defaults to latest 10 items.
- Use rich HTML output in RSS: set `rssFullHtml` field of `Plugin.ContentIndex` to be `true`.
