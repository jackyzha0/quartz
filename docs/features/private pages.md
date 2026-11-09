---
title: Private Pages
tags:
  - feature/filter
---

There may be some notes you want to avoid publishing as a website. Quartz supports this through two mechanisms which can be used in conjunction:

## Filter Plugins

[[making plugins#Filters|Filter plugins]] are plugins that filter out content based off of certain criteria. By default, Quartz's built-in [[RemoveDrafts|draft handling]] filters out any note that has `draft: true` in the frontmatter. Set `configuration.drafts.publish: true` to publish drafts anyway (e.g. for a preview deployment).

If you'd like to only publish a select number of notes, you can instead use [[ExplicitPublish]] which will filter out all notes except for any that have `publish: true` in the frontmatter. It is in the default `quartz.config.yaml` but disabled; set `enabled: true` on its entry.

To publish a page but keep it out of listings (explorer, search, graph, backlinks, RSS, sitemap, folder and tag pages), add `unlisted: true` to its frontmatter. This is handled by [[UnlistedPages]], which is enabled by default. The page is still reachable by its URL.

Bases, canvases and Excalidraw drawings follow the same filters. A drawing stored as Markdown has frontmatter of its own. A `.base` or `.canvas` file has none: with [[ExplicitPublish]] it is published when a published note links to it, and with encrypted pages it is encrypted with the password of the encrypted note that links to it.

> [!warning]
> By default (`publishAssets: "all"`), **all non-markdown files are emitted and available publicly in the final build**, regardless of the filter plugin used. This includes files such as images, voice recordings, PDFs, etc.
>
> Set `publishAssets: "referenced"` in the [[configuration]] to copy only the files that published pages link to or embed, so that files only used by unpublished notes stay private.

## `ignorePatterns`

This is a field in `quartz.config.yaml` under the main [[configuration]] which allows you to specify a list of patterns to effectively exclude from parsing all together. Any valid [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax) pattern works here.

> [!note]
> Bash's glob syntax is slightly different from fast-glob's and using bash's syntax may lead to unexpected results.

Common examples include:

- `some/folder`: exclude the entire of `some/folder`
- `*.md`: exclude all files with a `.md` extension
- `!(*.md)` exclude all files that _don't_ have a `.md` extension. Note that negations _must_ parenthesize the rest of the pattern!
- `**/private`: exclude any files or folders named `private` at any level of nesting

> [!warning]
> Marking something as private via either a plugin or through the `ignorePatterns` pattern will only prevent a page from being included in the final built site. If your GitHub repository is public, also be sure to include an ignore for those in the `.gitignore` of your Quartz. See the `git` [documentation](https://git-scm.com/docs/gitignore#_pattern_format) for more information.
