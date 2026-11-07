---
title: quartz create
---

The `create` command initializes a new Quartz project. It helps you set up your content folder, choose a configuration template, set your site's base URL, and configure how Quartz should handle your Markdown files.

## Flags

| Flag          | Shorthand | Description                                                                |
| ------------- | --------- | -------------------------------------------------------------------------- |
| `--template`  | `-t`      | Configuration template (`default`, `obsidian`, `ttrpg`, `blog`, or `docs`) |
| `--directory` | `-d`      | The directory where Quartz will be initialized                             |
| `--source`    | `-s`      | The source directory of your Markdown files                                |
| `--strategy`  | `-X`      | How to handle the source files (`new`, `copy`, or `symlink`)               |
| `--links`     | `-l`      | How to resolve internal links (`absolute`, `shortest`, or `relative`)      |
| `--baseUrl`   | `-b`      | Base URL for your site (e.g. `mysite.github.io/quartz`)                    |
| `--verbose`   | `-v`      | Enable detailed logging                                                    |

## Templates

When you run `quartz create`, you can choose a configuration template that pre-configures Quartz for your use case. The selected template always overwrites `quartz.config.yaml`, even if one already exists. After applying the template, Quartz automatically runs plugin resolution to install any plugins the template requires and remove any that are no longer referenced.

- **Default**: A clean Quartz setup with sensible defaults. Best for starting from scratch.
- **Obsidian**: Optimized for Obsidian vaults with full Obsidian Flavored Markdown support (wikilinks, callouts, mermaid diagrams, etc.). Automatically sets link resolution to `shortest` and skips the link resolution prompt.
- **TTRPG**: Builds on the Obsidian template with the addition of the [Leaflet bases plugin](https://github.com/Requiae/quartz-leaflet-bases-plugin) and [ITS Theme](https://github.com/saberzero1/quartz-themes) (`its-theme.ttrpg-dnd`). Great for D&D and TTRPG wikis. Also skips the link resolution prompt.
- **Blog**: A blog-focused setup with [recent notes](https://github.com/quartz-community/recent-notes) enabled (showing the 5 most recent posts with tags) and [comments](https://github.com/quartz-community/comments) enabled via giscus. You'll need to fill in the `TODO:` placeholder values in `quartz.config.yaml` with your own giscus repository details.
- **Documentation**: The default setup with both sidebars set to scroll away with the page ([[layout#Sidebar modes|`layout.sidebars`]]: `static`), so long navigation and tables of contents are never cut off.

## Base URL

During setup, Quartz will ask for the base URL of your site. This is the URL where your site will be deployed (e.g. `mysite.github.io/quartz`).

- Do **not** include the protocol (`https://`) — if you do, it will be automatically stripped.
- Trailing slashes are also removed automatically.
- See [[configuration]] for more details on how `baseUrl` is used.

## Strategies

When you run `quartz create`, you must choose a strategy for your content:

- **new**: Creates a fresh, empty content folder. Use this if you are starting a new project from scratch.
- **copy**: Copies all files from your source directory into the Quartz content folder. This is the safest option for existing vaults as it doesn't touch your original files.
- **symlink**: Creates a symbolic link from the Quartz content folder to your source directory. Any changes you make in your source directory (e.g. in Obsidian) will be immediately reflected in Quartz.

## Link Resolution

Quartz needs to know how to interpret the internal links in your Markdown files:

- **shortest**: Resolves links to the closest matching file name. This is the default for Obsidian.
- **absolute**: Resolves links relative to the root of your content folder.
- **relative**: Resolves links relative to the current file's location.

> [!note]
> When using the **Obsidian** or **TTRPG** templates, link resolution is automatically set to `shortest` and the prompt is skipped.

## Interactive Walkthrough

If you run `npx quartz create` without any arguments, it will guide you through an interactive setup:

1. **Choose a template**: Select a configuration template (`Default`, `Obsidian`, `TTRPG`, `Blog`, or `Documentation`).
2. **Select a strategy**: Choose between `new`, `copy`, or `symlink`.
3. **Enter base URL**: Provide the URL where your site will be hosted.
4. **Select link resolution**: Choose how your links are formatted (skipped for Obsidian and TTRPG templates).
5. **Finish**: Quartz will set up the directory structure, create your configuration, and automatically install any plugins referenced in the template.

## Example: Importing an Obsidian Vault

To create a Quartz project that links directly to an existing Obsidian vault:

```shell
npx quartz create --template obsidian --strategy symlink --source ~/Documents/MyVault
```

This command tells Quartz to use the Obsidian template (with full OFM support and shortest link resolution), look at your vault in `~/Documents/MyVault`, and use symbolic links so changes are synced.

## Example: Setting Up a Blog

To quickly set up a blog with recent notes and comments:

```shell
npx quartz create --template blog --strategy new --baseUrl myblog.github.io
```

After setup, edit `quartz.config.yaml` to fill in your giscus repository details in the comments plugin section.
