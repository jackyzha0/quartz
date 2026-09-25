---
title: Welcome to Quartz 5
---

Quartz is a fast, batteries-included static-site generator that transforms Markdown content into fully functional websites. Thousands of students, developers, and teachers are [[showcase|already using Quartz]] to publish personal notes, websites, and [digital gardens](https://jzhao.xyz/posts/networked-thought) to the web.

## 🪴 Get Started

Quartz requires **at least [Node](https://nodejs.org/) v26** and `npm` v12 to function correctly. Ensure you have these installed on your machine before continuing. See the [[getting-started/index#Prerequisites|prerequisites]] for help installing them.

> [!tip] GitHub users
> You can also use the **[GitHub template](https://github.com/jackyzha0/quartz/generate)** to create your repository in one click, then clone that instead. See [[installation#Option A Use the GitHub Template Recommended|Option A]] in the installation guide.

```shell
# 1. Clone the Quartz repository
git clone https://github.com/jackyzha0/quartz.git
cd quartz

# 2. Install dependencies
npm i

# 3. Initialize your site (choose a template, set your base URL, import content)
npx quartz create

# 4. Install plugins referenced by your chosen template
npx quartz plugin install --from-config

# 5. Preview your site locally
npx quartz build --serve
```

Your site is now running at `http://localhost:8080`. From here:

- **[[authoring-content|Write content]]** in the `content/` folder
- **[[installation|Push to GitHub]]** with `npx quartz sync`
- **[[hosting|Deploy]]** to GitHub Pages, Cloudflare, Netlify, or Vercel

For the full walkthrough, see the [[getting-started/index|Getting Started]] guide.

### Returning User?

Already have a Quartz repository and cloning it on a new machine?

```shell
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm ci
npx quartz plugin install
npx quartz build --serve
```

> [!tip]
> If you hit build errors on a fresh clone, try `npx quartz plugin install --latest` to refresh plugins to their latest versions. See [[troubleshooting#Plugins fail to build on a fresh clone]] for details.

## 🔧 Features

- [[Obsidian compatibility]], [[full-text search]], [[graph view]], [[wikilinks|wikilinks, transclusions]], [[plugins/Backlinks]], [[features/Latex|Latex]], [[syntax highlighting]], [[popover previews]], [[Docker Support]], [[i18n|internationalization]], [[features/comments|comments]] and [many more](./features/) right out of the box
- Hot-reload on configuration edits and incremental rebuilds for content edits
- Simple JSX layouts and [[creating components|page components]]
- [[SPA Routing|Ridiculously fast page loads]] and tiny bundle sizes
- Fully-customizable parsing, filtering, and page generation through [[making plugins|plugins]]

For a comprehensive list of features, visit the [features page](./features/). You can read more about the _why_ behind these features on the [[philosophy]] page and a technical overview on the [[architecture]] page.

### 🚧 Troubleshooting + Updating

Having trouble with Quartz? Try searching for your issue using the search feature or check the [[troubleshooting]] page. If you haven't already, [[upgrading|upgrade]] to the newest version of Quartz to see if this fixes your issue.

If you're still having trouble, feel free to [submit an issue](https://github.com/jackyzha0/quartz/issues) if you feel you found a bug or ask for help in our [Discord Community](https://discord.gg/cRFFHYye7t). You can also browse the [[community]] page for third-party plugins and resources.
