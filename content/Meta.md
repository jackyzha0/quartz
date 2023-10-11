---
title: Meta (how this site was made)
description: How the site was made.
compartir: true
updated: 2023-10-11
tags: [meta]
---

> [!summary]
> 
> **Forgetful Notes** is created using [Quartz](https://github.com/jackyzha0/quartz), hosted on [GitHub](https://github.com/), deployed with [GitHub Pages](https://pages.github.com/), and facilitated by the GitHub [Publisher](https://github.com/ObsidianPublisher) plugin for [Obsidian](https://obsidian.md/). If interested, you can browse the [source](https://github.com/semanticdata/forgetful-notes) code.

## Background

Forgetful Notes has gone through many changes. I have not been shy about moving from technology to technology as I learn new things. Coming across the world of [[./Seedlings/Static Site Generators|Static Site Generators]] was a game changer. I have ran my notes through [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), [MkDocs](https://squidfunk.github.io/mkdocs-material/), and most recently [Zola](https://www.getzola.org/).

However, this site is specifically not built with any of the aforementioned. Instead I have opted to follow in the footsteps of [Jacky Zhao](https://github.com/jackyzha0) and created my [[./Digital Garden|Digital Garden]] using the new fully rewritten version of [Quartz](https://github.com/jackyzha0/quartz)—a set of tools that helps you publish your digital garden and notes as a website for free. Quartz v4 features a from-the-ground rewrite focusing on end-user extensibility and ease-of-use.

### Technology

All content for the site is written in [[./Seedlings/Markdown|Markdown]] within [Obsidian](https://obsidian.md/)—an extensible, flexible note-taking app. To export the notes from Obsidian, I rely on the [GitHub Publisher](https://github.com/ObsidianPublisher) plugin.

The [source code](https://github.com/semanticdata/forgetful-dev) is hosted in [GitHub](https://github.com/). From here we use GitHub [Actions](https://github.com/features/actions) to build and deploy the site to GitHub [Pages](https://pages.github.com/).

### Features

* Fast Natural-Language Search
* Bidirectional Backlinks
* Floating Link Previews
* Admonition-style Callouts
* Markdown Links and Wikilinks Support
* Latex Support

### File Structure

```
root/
├── .github/
│   └── workflows/
├── content/
|   └── notes
├── docs/
|   └── documentation
└── quartz/
|   ├── components/
|   ├── plugins/
|   └── styles/
└── quartz.config.ts
└── quartz.layout.ts
└── package.json
```
