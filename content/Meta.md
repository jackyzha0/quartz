---
title: Meta (how this site was made)
description: How the site was made.
compartir: true
lastmod: 2023-09-19
---

> [!summary]
> 
> **Purple Garden** is created using [Quartz](https://github.com/jackyzha0/quartz/tree/hugo), hosted on [GitHub](https://github.com/), deployed with [GitHub Pages](https://pages.github.com/), and facilitated by the GitHub [Publisher](https://github.com/ObsidianPublisher) plugin for [Obsidian](https://obsidian.md/). If interested, you can browse the [source](https://github.com/semanticdata/purple-was-taken) code.

## Technologies

**Purple Garden** is built with the help of [Quartz v3.3](https://github.com/jackyzha0/quartz/tree/hugo).

All content for the site is written in [[Markdown]] within [Obsidian](https://obsidian.md/)—an extensible, flexible note-taking app. To export the notes from Obsidian, I rely on the [GitHub Publisher](https://github.com/ObsidianPublisher) plugin.

The [source code](https://github.com/semanticdata/forgetful-dev) is hosted in [GitHub](https://github.com/). From here we use GitHub [Actions](https://github.com/features/actions) to build and deploy the site to GitHub [Pages](https://pages.github.com/).

### Quartz V3.3 Features

* Design based around [Hugo](https://gohugo.io/)
* Fast Natural-Language Search
* Bidirectional Backlinks
* Floating Link Previews
* Local and Page (specific) Graph
* Admonition-style Callouts
* Markdown Links and Wikilinks Support
* Latex Support

Proud member of the 512KB Club's Blue Team with a recorded total uncompressed size of only 406KB.

<a href="https://512kb.club"><img src="https://512kb.club/assets/images/blue-team.svg" alt="a proud member of the blue team of 512KB club" /></a>

## Appearance

### Font Families

* Default Sans Serif:  
	`-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`
* Default Monospace:  
	 `ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace`

### Illustrations

The website makes use of the beautiful illustrations by <a href="https://storyset.com/people">Storyset</a>.

## Site Structure

```
root/
├── .github/
│   └── workflows/
├── assets/
│   ├── indices/
│   ├── js/
│   └── styles/
├── content/
│   └── assets/
├── data/
├── i18n/
├── layouts/
│   └── default/
│       ├── markup/
│       └── partials/
└── static/
```
