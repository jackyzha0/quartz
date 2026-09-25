---
title: Getting Started
---

This guide walks you through setting up Quartz from scratch. If you already ran the [[index#🪴 Get Started|quickstart]] on the home page, you can skip ahead to whichever step you're on.

## Prerequisites

You need these tools installed before continuing:

- **[Node.js](https://nodejs.org/) v26 or later** (run `node -v` to check)
- **npm v12 or later** (bundled with Node — run `npm -v` to check)
- **[Git](https://git-scm.com/)** (run `git -v` to check)

> [!warning] Common issues
>
> - **Linux**: System packages (`apt install nodejs`) often ship much older versions. Use [nvm](https://github.com/nvm-sh/nvm) or the [NodeSource](https://github.com/nodesource/distributions) repository to get Node.js v26.
> - **Windows**: When installing Git, make sure **"Git from the command line and also from 3rd-party software"** is selected so that `git` is available in your terminal. If `node -v` or `git -v` shows "command not found", restart your terminal or check your PATH.
> - **macOS**: The Xcode command-line tools include Git (`xcode-select --install`). For Node.js, [nvm](https://github.com/nvm-sh/nvm) or the [official installer](https://nodejs.org/) both work.

## Setup Steps

Follow these in order:

1. **[[installation|Installation]]** — Get Quartz (via GitHub template or clone), install dependencies, run the setup wizard (`npx quartz create`), install plugins, and preview your site locally
2. **[[authoring-content|Authoring Content]]** — Write and organize your Markdown notes in the `content/` folder
3. **[[installation#Setting Up Your GitHub Repository|Push to GitHub]]** — Create a repository and push your site with `npx quartz sync`
4. **[[hosting|Deploy]]** — Host your site for free on GitHub Pages, Cloudflare, Netlify, or Vercel

## Upgrading & Migrating

- **[[whats-new|What's New in Quartz 5]]** — Overview of new features and changes
- **[[upgrading|Upgrading Quartz]]** — Keep your Quartz installation up to date
- **[[migrating|Migrating to Quartz 5]]** — Migrate from Quartz 4 or Quartz 3
