---
title: Authoring Content
aliases:
  - "authoring content"
---

All of the content in your Quartz should go in the `/content` folder. The content for the home page of your Quartz lives in `content/index.md`. If you've followed the [[installation|installation guide]], this folder should already be initialized. Any Markdown in this folder will get processed by Quartz.

It is recommended that you use [Obsidian](https://obsidian.md/) as a way to edit and maintain your Quartz. It comes with a nice editor and graphical interface to preview, edit, and link your local files and attachments.

Got everything set up? Preview your site locally with `npx quartz build --serve`, or see the [[build|build reference]] for more options.

## Syntax

As Quartz uses Markdown files as the main way of writing content, it fully supports Markdown syntax. By default, Quartz also ships with a few syntax extensions like [Github Flavored Markdown](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) (strikethrough, tables, tasklists) and [Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown) ([[callouts]], [[wikilinks]], footnotes including inline `^[…]` footnotes).

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
- `permalink`: The page's address on the site, as in Obsidian Publish: `note.md` with `permalink: page` is published at `/page`, whatever its folder or file name. Links to the note (`[[note]]`) point there, and its file path redirects to it. A permalink that is already another page's address is ignored with a warning.
- `aliases`: Other addresses for this note that redirect to it (with the [[AliasRedirects]] plugin), so old links and links from other sites keep working after a note is renamed or moved. This is a list of strings.
- `tags`: Tags for this note.
- `draft`: Whether to publish the page or not. This is one way to make [[private pages|pages private]] in Quartz.
- `date`: A string representing the day the note was published. Normally uses `YYYY-MM-DD` format.

See [[Frontmatter]] for a complete list of frontmatter.

> [!warning] Frontmatter must be valid
> Frontmatter is YAML (or TOML, if configured) made of `key: value` properties. If a file's frontmatter can't be parsed — broken YAML, or a single value or list instead of properties — the build stops with an error naming the file. JavaScript frontmatter (`---js`, `---javascript`) is refused: Quartz never runs code from your content.

## Syncing your Content

When your Quartz is at a point you're happy with, you can save your changes to GitHub.
First, make sure you've [[installation#Setting Up Your GitHub Repository|set up your GitHub repository]] and then run `npx quartz sync`.

## Customization

Frontmatter parsing for `title`, `tags`, `aliases` and `cssclasses` is built into Quartz (see [[Frontmatter]]), `date` is handled by the [[CreatedModifiedDate]] plugin and `description` by the [[Description]] plugin. See the plugin pages for customization options.
