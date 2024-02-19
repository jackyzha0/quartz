---
title: Authoring Content
tags:
  - plugin/transformer
---

All of the content in your Quartz should go in the `/content` folder. The content for the home page of your Quartz lives in `content/index.md`. If you've [[index#🪴 Get Started|setup Quartz]] already, this folder should already be initialized. Any Markdown in this folder will get processed by Quartz.

It is recommended that you use [Obsidian](https://obsidian.md/) as a way to edit and maintain your Quartz. It comes with a nice editor and graphical interface to preview, edit, and link your local files and attachments.

Got everything setup? Let's [[build]] and preview your Quartz locally!

## Syntax

As Quartz uses Markdown files as the main way of writing content, it fully supports Markdown syntax. By default, Quartz also ships with a few syntax extensions like [Github Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) (footnotes, strikethrough, tables, tasklists) and [Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown) ([[callouts]], [[wikilinks]]).

Additionally, Quartz also allows you to specify additional metadata in your notes called **frontmatter**.

```md title="content/note.md"
---
title: Example Title
draft: false
tags:
  - example-tag
---

The rest of your content lives here. You can use **Markdown** here :)
```

Some common frontmatter fields that are natively supported by Quartz:

- `title`: Title of the page. If it isn't provided, Quartz will use the name of the file as the title.
- `description`: Description of the page used for link previews.
- `aliases`: Other names for this note. This is a list of strings.
- `tags`: Tags for this note.
- `draft`: Whether to publish the page or not. This is one way to make [[private pages|pages private]] in Quartz.
- `date`: A string representing the day the note was published. Normally uses `YYYY-MM-DD` format.

The frontmatter is parsed using the [gray-matter](https://github.com/jonschlinkert/gray-matter) library.
## Syncing your Content

When your Quartz is at a point you're happy with, you can save your changes to GitHub.
First, make sure you've [[setting up your GitHub repository|already setup your GitHub repository]] and then do `npx quartz sync`.

## Customization

Frontmatter parsing for `title`, `tags`, `aliases` and `cssclasses` is a functionality of the `FrontMatter` plugin. The plugin is defined in `quartz/plugins/transformers/frontmatter.ts`.

- This plugin (`Plugin.SyntaxHighlighting()`) should not be removed from `quartz.config.ts`, otherwise Quartz will break.
- To customize frontmatter parsing, use the configuration options of the plugin:
	- `delimiters`: the delimiters to use for the frontmatter. Can have one value (e.g. `"---"`) or separate values for opening and closing delimiters (e.g. `["---", "~~~"]`). Defaults to `"---"`.
	- `language`: the language to use for parsing the frontmatter. Can be `yaml` (default) or `toml`.

Frontmatter parsing for `date` is a functionality of the `CreatedModifiedDate` plugin. The plugin is defined in `quartz/plugins/transformers/lastmod.ts`.

- To remove dates from all pages, delete all usages of `Plugin.CreatedModifiedDate()` from `quartz.config.ts`.
- To customize date parsing, use the configuration options of the plugin:
	- `priority`: the data sources to consult for date information. Highest priority first. Possible values are `"frontmatter"`, `"git"`, and `"filesystem"`. Defaults to `"frontmatter", "git", "filesystem"]`.