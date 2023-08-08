---
title: Welcome to Quartz 4
---

Quartz is a fast, batteries-included static-site generator that transforms Markdown content into fully functional websites. Thousands of students, developers, and teachers are [[showcase|already using Quartz]] to publish personal notes, wikis, and [digital gardens](https://jzhao.xyz/posts/networked-thought/) to the web.

## 🪴 Get Started

Quartz requires **at least [Node](https://nodejs.org/) v18.14** to function correctly. Ensure you have this installed on your machine before continuing.

Then, in your terminal of choice, enter the following commands line by line:

```shell
git clone https://github.com/jackyzha0/quartz.git
cd quartz
git checkout v4-alpha
npm i
npx quartz create
```

This will guide you through initializing your Quartz with content. Once you've done so, see how to [[build]] and [[hosting|host]] Quartz.

> [!info]
> Coming from Quartz 3? See the [[migrating from Quartz 3|migration guide]] for the differences between Quartz 3 and Quartz 4 and how to migrate.

## 🔧 Features

- [[full-text search|Full-text search]], [[graph view]], [[wikilinks]], [[backlinks]], [[Latex]], [[syntax highlighting]], [[popover previews]], and many more right out of the box
- Hot-reload for both configuration and content
- Simple JSX [[creating components|layouts and page components]]
- [[SPA Routing|Ridiculously fast page loads]] and tiny bundle sizes
- Fully-customizable parsing, filtering, and page generation through [[making plugins|plugins]]

For a comprehensive list of features, visit the [features page](/features). You can read more the _why_ behind these features on the [[philosophy]] page and a technical overview on the [[architecture]] page.

### 🚧 Troubleshooting

Having trouble with Quartz? Try searching for your issue using the search feature. If you're still having trouble, feel free to [submit an issue](https://github.com/jackyzha0/quartz/issues) if you feel you found a bug or ask for help in our [Discord Community](https://discord.gg/cRFFHYye7t).
