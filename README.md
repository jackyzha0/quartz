# 🌱 Forgetful Notes

![code size](https://img.shields.io/github/languages/code-size/semanticdata/forgetful-notes) ![repository size](https://img.shields.io/github/repo-size/semanticdata/forgetful-notes) ![commits](https://img.shields.io/github/commit-activity/t/semanticdata/forgetful-notes) ![last commit](https://img.shields.io/github/last-commit/semanticdata/forgetful-notes) ![is website up?](https://img.shields.io/website/https/forgetfulnotes.com.svg)

[Forgetful Notes](https://forgetfulnotes.com) is my _digital garden_ of knowledge. It serves as a platform for my learning and creative endeavours. A space for thinking through, building upon, and coming back to.

[![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://forgetfulnotes.com/) [![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://forgetful-notes.vercel.app/)

## ✨ Features

- Fast Natural-Language Search
- Bidirectional Backlinks
- Floating Link Previews
- Admonition-style Callouts
- Markdown Links and Wikilinks Support
- Latex Support

## ⚡ Quick start

### 1. Clone repo

```sh
git clone https://github.com/semanticdata/forgetful-notes.git
```

### 2. Install dependencies

```sh
pnpm install
```

### 3. Run the project locally

```sh
pnpm start
```

## 👨🏼‍💻 Useful Commands

### Update Quartz

```sh
npm run update
```

### Sync changes

```sh
npm run sync
```

### Read about a command

```sh
npx quartz <command> --help
```

## 🎨 Customization

You can add custom CSS code within `/quartz/styles/custom.scss`. You will then need to uncomment line 4 of `/quartz/styles/base.scss` to have it take effect.

| Used in: | Font Family | Previous Font |
| --- | :-: | :-: |
| Headers | [Bitter](https://fonts.google.com/specimen/Bitter) | [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk) |
| Body | [Poppins](https://fonts.google.com/specimen/Poppins) | [Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+3) |
| Code | [Fira Mono](https://fonts.google.com/specimen/Fira+Mono) | [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) |

## 🛠️ Technology

The site uses various technologies cobbled together. Here's a few of them:

- [Quartz](https://github.com/jackyzha0/quartz): a fast, batteries-included static-site generator.
- [Prettier](https://github.com/prettier/prettier): an opinionated code formatter.
- [Sass](https://github.com/sass/sass): makes CSS fun!
- [TypeScript](https://github.com/microsoft/TypeScript): superset of JavaScript that compiles to clean JavaScript output.

All content for the site is written in _Markdown_ within [Obsidian](https://obsidian.md/)—an extensible, flexible note-taking app. To export the notes from Obsidian, I rely on the [GitHub Publisher](https://github.com/ObsidianPublisher) plugin.

## 🔀 Workflows

### 🔨 Build only

```yml
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Setup Node
    uses: actions/setup-node@v4
  - name: Install Dependencies
    run: npm i
  - name: Build Quartz
    run: npx quartz build
```

### 🚀 Build and Deploy

```yml
# Using npm
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Setup Node
    uses: actions/setup-node@v4
  - name: Install Dependencies
    run: npm i
  - name: Build Quartz
    run: npm run build
  - name: Upload artifact
    uses: actions/upload-pages-artifact@v3
    with:
      path: public
  - name: Deploy to GitHub Pages
    id: deployment
    uses: actions/deploy-pages@v4
```

```yml
# Using pnpm
steps:
  - name: Checkout
    uses: actions/checkout@v4
  - name: Setup PNPM
    uses: pnpm/action-setup@v3
  - name: Get pnpm store directory
    shell: bash
    run: |
      echo "STORE_PATH=$(pnpm store path --silent)" >> $GITHUB_ENV
  - name: Setup pnpm cache
    uses: actions/cache@v4
    with:
      path: ${{ env.STORE_PATH }}
      key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
      restore-keys: |
        ${{ runner.os }}-pnpm-store-
  - name: Install dependencies
    run: pnpm install
  - name: Build Quartz Site
    run: pnpm run build
  - name: Upload artifact
    uses: actions/upload-pages-artifact@v3
    with:
      path: public
  - name: Deploy to GitHub Pages
    uses: actions/deploy-pages@v4
    id: deployment
```

```yaml
# Using Bun (my preferred method)
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Bun
        uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest
      - name: Install Dependencies
        run: bun install
      - name: Build Quartz
        run: npx quartz build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## © License

Source code in this repository is available under the [MIT License](LICENSE).
