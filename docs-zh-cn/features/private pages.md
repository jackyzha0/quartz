---
title: Private Pages
tags:
  - feature/filter
---

There may be some notes you want to avoid publishing as a website. Quartz supports this through two mechanisms which can be used in conjunction:

## Filter Plugins

[[making plugins#Filters|Filter plugins]] are plugins that filter out content based off of certain criteria. By default, Quartz uses the [[RemoveDrafts]] plugin which filters out any note that has `draft: true` in the frontmatter.

If you'd like to only publish a select number of notes, you can instead use [[ExplicitPublish]] which will filter out all notes except for any that have `publish: true` in the frontmatter.

> [!warning]
> Regardless of the filter plugin used, **all non-markdown files will be emitted and available publically in the final build.** This includes files such as images, voice recordings, PDFs, etc. One way to prevent this and still be able to embed local images is to create a folder specifically for public media and add the following two patterns to the ignorePatterns array.
>
> `"!(PublicMedia)**/!(*.md)", "!(*.md)"`

## `ignorePatterns`

This is a field in `quartz.config.ts` under the main [[configuration]] which allows you to specify a list of patterns to effectively exclude from parsing all together. Any valid [fast-glob](https://github.com/mrmlnc/fast-glob#pattern-syntax) pattern works here.

> [!note]
> Bash's glob syntax is slightly different from fast-glob's and using bash's syntax may lead to unexpected results.

Common examples include:

- `some/folder`: exclude the entire of `some/folder`
- `*.md`: exclude all files with a `.md` extension
- `!*.md` exclude all files that _don't_ have a `.md` extension
- `**/private`: exclude any files or folders named `private` at any level of nesting

> [!warning]
> Marking something as private via either a plugin or through the `ignorePatterns` pattern will only prevent a page from being included in the final built site. If your GitHub repository is public, also be sure to include an ignore for those in the `.gitignore` of your Quartz. See the `git` [documentation](https://git-scm.com/docs/gitignore#_pattern_format) for more information.
