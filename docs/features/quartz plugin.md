---
title: 📦 quartz-plugin
---

> [!info]
>
> `quartz-plugin` allows you to manage plugins built by Quartz community members.

On this page, "shorthand" refers to the syntax `author/plugin_name`, which will expand to `https://github.com/author/plugin_name.git`.

"name" would simply be `plugin_name`.

## Command reference

| Command   | Arguments               | Effect                                                                      | Shorthand?   |
| --------- | ----------------------- | --------------------------------------------------------------------------- | ------------ |
| `add`     | `url`: required         | Adds the supplied plugin to `quartz.plugins.ts` with default configuration. | Yes          |
| `remove`  | `url` \| name: required | Removes a plugin's files and configuration                                  | Yes          |
| `enable`  | $\downarrow$            | $\downarrow$                                                                | $\downarrow$ |
| `disable` | $\downarrow$            | $\downarrow$                                                                | $\downarrow$ |
| `toggle`  | `url` \| name: required | Sets `enable:` to `true`, `false`, or `!enabled`, respectively.             | Yes          |
| `update`  | `url`: optional         | Fetches & pulls the selected plugin or all downloaded plugins.              | Yes          |

## Configuration reference

You can also add Quartz plugins to this folder manually. For a transformer plugin:

1. Add the plugin's file to `<repo dir>/quartz/plugins/transformers` (**NOT** `<repo dir>/plugins`)
2. Export that plugin type from `<repo dir>/quartz/plugins/transformers/index.ts`
3. Add an entry to `communityPlugins.available` in `quartz.plugins.ts` following the below scheme:

| Key       | Value                                                                                    |
| --------- | ---------------------------------------------------------------------------------------- |
| `url`     | The location of the repository the plugin is hosted in. Shorthand OK.                    |
| `enabled` | True/false, if false the plugin will not have any effect on your site.                   |
| `cfg`     | The actual plugin object just like those for system plugins found in `quartz.config.ts`. |

## For Plugin Developers

Learn how to [[making plugins#quartz-plugin|author your plugin for quartz-plugin]]
