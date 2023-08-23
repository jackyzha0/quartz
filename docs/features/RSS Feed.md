Quartz creates an RSS feed for all the content on your site by generating an `index.xml` file that RSS readers can subscribe to. Because of the RSS spec, this requires the `baseUrl` property in your [[configuration]] to be set properly for RSS readers to pick it up properly.

## Configuration

- Remove RSS feed: set the `enableRSS` field of `Plugin.ContentIndex` in `quartz.config.ts` to be `false`.
