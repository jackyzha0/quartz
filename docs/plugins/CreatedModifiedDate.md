---
title: CreatedModifiedDate
description: Determines creation and modification dates from frontmatter, git, or filesystem.
tags:
  - plugin/transformer
image:
repository: "[quartz-community/created-modified-date](https://github.com/quartz-community/created-modified-date)"
enabled: true
required: false
---

This plugin determines the created, modified, and published dates for a document using three potential data sources: frontmatter metadata, Git history, and the filesystem. See [[authoring content#Syntax]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `priority`: The data sources to consult for date information. Highest priority first. Possible values are `"frontmatter"`, `"git"`, and `"filesystem"`. Defaults to `["frontmatter", "git", "filesystem"]`.
- `defaultDateType`: Which date type to use when displaying dates (for example in [[ContentMeta]], [[RecentNotes]] and folder/tag listings). Can be `"created"`, `"modified"`, or `"published"`. Defaults to `"modified"`.

When loading the frontmatter, the `created`, `modified` and `published` fields (and their aliases such as `date`, `lastmod` and `updated`, see [[Frontmatter#Supported frontmatter]]) are used. Git only provides the modified date; the filesystem provides created and modified dates. A source only fills dates that a higher-priority source has not set. Date-only values such as `2024-03-05` are read as local midnight.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/created-modified-date"
  enabled: true
  options:
    defaultDateType: modified
    priority:
      - frontmatter
      - git
      - filesystem
  order: 10
```

> [!warning]
> If you rely on `git` for dates, make sure `defaultDateType` is set to `modified` in the plugin's options.
>
> Depending on how you [[hosting|host]] your Quartz, the `filesystem` dates of your local files may not match the final dates. In these cases, it may be better to use `git` or `frontmatter` to guarantee correct dates.

## API

- Category: Transformer
- Function name: `ExternalPlugin.CreatedModifiedDate()`.
- Source: [`quartz-community/created-modified-date`](https://github.com/quartz-community/created-modified-date)
- Install: `npx quartz plugin add @quartz-community/created-modified-date`
