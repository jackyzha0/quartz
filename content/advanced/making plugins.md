---
title: Making your own plugins
---

This part of the documentation will assume you have some basic coding knowledge and will include code snippets that describe the interface of what Quartz plugins should look like.

## Transformers
```ts
export type QuartzTransformerPluginInstance = {
  name: string
  textTransform?: (src: string | Buffer) => string | Buffer
  markdownPlugins?: () => PluggableList
  htmlPlugins?: () => PluggableList
  externalResources?: () => Partial<StaticResources>
}
```

## Filters

## Emitters