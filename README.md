# DND Four Keeps

Publish obsidian vault using a combination of two projects:
- [Enveloppe Obsidian Plugin](https://github.com/Enveloppe/obsidian-enveloppe)
- [Quartz](https://quartz.jzhao.xyz/) ([github](https://github.com/jackyzha0/quartz))

Enveloppe handles rendering `dataview` which can't be done by quartz directly.
This repository stores only the published notes, syncing the edited notes is a separate concern handled by another repository.

## Enveloppe Plugin Setup

1. Install and enable Obsidian Enveloppe plugin
2. Configure github access
3. Create [fine-grained token](https://github.com/settings/tokens?type=beta) with read/write access to `Contents` in the repository
4. If syncing repository to git, add `/.obsidian/plugins/obsidian-mkdocs-publisher/env` which stores the secret to `.gitignore`
5. In `File paths`, set:
   - File Tree in repository: `Obsidian Path`
   - Root folder: `content`
   - Folder note: `index.md`
6. In `Content`, set:
   - Dataview: `on`

## Quartz Local Setup

### Install pnpm

[Install `pnpm`][install-pnpm] to manage node versions and packages.

[install-pnpm]: https://pnpm.io/installation

### Install node

```sh
pnpm env use --global 20
```

### Install dependencies

```sh
pnpm install
```

### Configure

```sh
npx quartz create
```

Answered questions:
- Choose how to initialize the content?
  Empty Quartz
- Choose how Quartz should resolve links in your content.
  Treat links as relative paths

### Run

```sh
npx quartz build --serve
```

### Configure deployment

Followed https://quartz.jzhao.xyz/hosting#github-pages

# Quartz v4

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.” — Richard Hamming

Quartz is a set of tools that helps you publish your [digital garden](https://jzhao.xyz/posts/networked-thought) and notes as a website for free.
Quartz v4 features a from-the-ground rewrite focusing on end-user extensibility and ease-of-use.

🔗 Read the documentation and get started: https://quartz.jzhao.xyz/

[Join the Discord Community](https://discord.gg/cRFFHYye7t)

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/jackyzha0">
    <img src="https://cdn.jsdelivr.net/gh/jackyzha0/jackyzha0/sponsorkit/sponsors.svg" />
  </a>
</p>
