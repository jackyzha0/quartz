---
title: Private Pages
tags:
  - plugin/filter
---

There may be some notes you want to avoid publishing as a website. Quartz supports this through two mechanisms which can be used in conjunction:

## Filter Plugins

[[making plugins#Filters|Filter plugins]] are plugins that filter out content based off of certain criteria. By default, Quartz uses the `Plugin.RemoveDrafts` plugin which filters out any note that has `drafts: true` in the frontmatter.

If you'd like to only publish a select number of notes, you can instead use `Plugin.ExplicitPublish` which will filter out all notes except for any that have `publish: true` in the frontmatter.

## `ignoreFiles`

This is a field in `quartz.config.ts` under the main [[configuration]] which allows you to specify a list of patterns to effectively exclude from parsing all together. Any valid [glob](https://github.com/mrmlnc/fast-glob#pattern-syntax) pattern works here.

Common examples include:

- `some/folder`: exclude the entire of `some/folder`
- `*.md`: exclude all files with a `.md` extension
- `!*.md` exclude all files that _don't_ have a `.md` extension
- `**/private`: exclude any files or folders named `private` at any level of nesting

> [!warning]
> Marking something as private via either a plugin or through the `ignoreFiles` pattern will only prevent a page from being included in the final built site. If your GitHub repository is public, also be sure to include an ignore for those in the `.gitignore` of your Quartz. See the `git` [documentation](https://git-scm.com/docs/gitignore#_pattern_format) for more information.
