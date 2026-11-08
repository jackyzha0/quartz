Quartz emits an RSS feed for all the content on your site by generating an `index.xml` file that RSS readers can subscribe to. Because of the RSS spec, this requires the `baseUrl` property in your [[configuration]] to be set properly for RSS readers to pick it up properly.

> [!info]
> After deploying, the generated RSS link will be available at `https://${baseUrl}/index.xml` by default.
>
> The `index.xml` path can be customized with `configuration.contentIndex.rssSlug` (see [[ContentIndex]]).

## Configuration

This functionality is [[built-in processing|built into Quartz]]. See [[ContentIndex]] for customization options.
