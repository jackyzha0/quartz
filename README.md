# 🌱 Forgetful Notes

<p align="">
  <img alt="code size" src="https://img.shields.io/github/languages/code-size/semanticdata/forgetful-notes" />
  <img alt="repository size" src="https://img.shields.io/github/repo-size/semanticdata/forgetful-notes" />
  <img alt="commits" src="https://img.shields.io/github/commit-activity/t/semanticdata/forgetful-notes" />
  <img alt="last commit" src="https://img.shields.io/github/last-commit/semanticdata/forgetful-notes" />
  <img alt="is website up?" src="https://img.shields.io/website/https/forgetfulnotes.com.svg" />
</p>

This repository holds the source code for [Forgetful Notes](https://forgetfulnotes.com)—my digital garden of knowledge. It serves as a platform for my learning and creative endeavours. A space for thinking through, building upon, and coming back to.

It is powered by [Quartz](https://github.com/jackyzha0/quartz/) and [Obsidian](https://obsidian.md). You can read the [Documentation](https://quartz.jzhao.xyz/), and join the [Discord Community](https://discord.gg/cRFFHYye7t).

## Contents

<details open>
<summary>Show/Hide</summary>

- [🌱 Forgetful Notes](#-forgetful-notes)
  - [Contents](#contents)
  - [Screenshots](#screenshots)
    - [Full Width](#full-width)
    - [Slim (light)](#slim-light)
    - [Slim (dark)](#slim-dark)
  - [Features](#features)
  - [Useful Commands](#useful-commands)
  - [Customization](#customization)
    - [Stylesheets](#stylesheets)
    - [Fonts](#fonts)
  - [From Obsidian](#from-obsidian)
  - [Background](#background)
  - [Technology](#technology)
  - [Folder Structure](#folder-structure)
  - [Attributions](#attributions)
  - [License](#license)

</details>

## Screenshots

<details>
<summary>Show/Hide</summary>

### Full Width

<img alt="Website Screenshot" src="screenshot-full.png" width="720px" />

### Slim (light)

<img alt="Website Screenshot" src="screenshot-light.png" width="360px" />

### Slim (dark)

<img alt="Website Screenshot" src="screenshot-dark.png" width="360px" />

</details>

## Features

- Fast Natural-Language Search
- Bidirectional Backlinks
- Floating Link Previews
- Admonition-style Callouts
- Markdown Links and Wikilinks Support
- Latex Support

## Useful Commands

```sh
# Install Dependencies
npm install

# Update Dependencies
npm update

# Start Local Server
npm start

# Update Quartz
npm run update

# Sync the Repo
npm run sync

# Build Only
npm run build

# Find Help
npx quartz <command> --help
```

## Customization

### Stylesheets

You can add custom CSS code within `/quartz/styles/custom.scss`. You will then need to uncomment line 4 of `/quartz/styles/base.scss` to have it take effect.

### Fonts

| Used in: |                       Font Family                        |                              Previous Font                               |
| -------- | :------------------------------------------------------: | :----------------------------------------------------------------------: |
| Headers  |    [Bitter](https://fonts.google.com/specimen/Bitter)    | [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) |
| Body     |    [Bitter](https://fonts.google.com/specimen/Bitter)    |    [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+3)    |
| Code     | [Fira Mono](https://fonts.google.com/specimen/Fira+Mono) |     [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)     |

## From Obsidian

**Forgetful Notes** is created using [Quartz](https://github.com/jackyzha0/quartz), hosted on [GitHub](https://github.com/), deployed with [GitHub Pages](https://pages.github.com/), and facilitated by the GitHub [Publisher](https://github.com/ObsidianPublisher) plugin for [Obsidian](https://obsidian.md/). If interested, you can browse the [source](https://github.com/semanticdata/forgetful-notes) code.

## Background

Forgetful Notes has gone through many changes. I have not been shy about moving from technology to technology as I learn new things. Coming across the world of [[Static Site Generators]] was a game changer. I have ran my notes through [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), [MkDocs](https://squidfunk.github.io/mkdocs-material/), and most recently [Zola](https://www.getzola.org/).

However, this site is not specifically built with any of the aforementioned. Instead I have opted to follow in the footsteps of [Jacky Zhao](https://github.com/jackyzha0) and created my [[Digital Garden]] using the new fully rewritten [Quartz](https://github.com/jackyzha0/quartz)—a set of tools that helps you publish your digital garden and notes as a website for free.

## Technology

All content for the site is written in [[Markdown]] within [Obsidian](https://obsidian.md/)—an extensible, flexible note-taking app. To export the notes from Obsidian, I rely on the [GitHub Publisher](https://github.com/ObsidianPublisher) plugin.

The [source code](https://github.com/semanticdata/forgetful-notes) is hosted in [GitHub](https://github.com/). From here we use [GitHub Actions](https://github.com/features/actions) to build and deploy the site to [GitHub Pages](https://pages.github.com/).

## Folder Structure

<details>
<summary>Show/Hide</summary>

```plaintext
.
├── .github/
│   └── workflows/
│       ├── build.yml
│       └── deploy.yml
├── content/
│   ├── notes.md
│   ├── pages.md
│   └── ...
├── docs/
│   ├── documentation.md
│   └── ...
├── quartz/
│   ├── cli/
│   │   ├── args.js
│   │   ├── constants.js
│   │   ├── handlers.js
│   │   └── helpers.js
│   ├── components/
│   │   ├── pages/
│   │   ├── scripts/
│   │   ├── styles/
│   │   ├── Backlinks.tsx
│   │   ├── Explorer.tsx
│   │   └── ...
│   ├── plugins/
│   │   ├── emitters/
│   │   ├── filters/
│   │   ├── transformers/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   └── vfile.ts
│   ├── processors/
│   │   ├── emit.ts
│   │   ├── filter.ts
│   │   └── parse.ts
│   ├── static/
│   │   ├── favicon.ico
│   │   ├── site.manifest
│   │   └── ...
│   ├── styles/
│   │   ├── base.scss
│   │   ├── callouts.scss
│   │   ├── custom.scss
│   │   ├── syntax.scss
│   │   └── variables.scss
│   ├── util/
│   │   ├── theme.ts
│   │   ├── jsx.tsx
│   │   └── ...
│   ├── bootstrp.cli.mjs
│   ├── bootstrap-worker.njs
│   ├── build.ts
│   ├── cfg.ts
│   └── worker.ts
├── .gitattributes
├── .gitignore
├── .npmrc
├── .prettierignore
├── .prettierrc
├── Dockerfile
├── LICENSE
├── README.md
├── globals.d.ts
├── index.d.ts
├── package-lock.json
├── package.json
├── quartz.config.ts
├── quartz.layout.ts
├── screenshot.png
└── tsconfig.json
```

</details>

## Attributions

Forgetful Notes is based on [Quartz](https://github.com/jackyzha0/quartz).

## License

Source code in this repository is available under the [MIT License](LICENSE).
