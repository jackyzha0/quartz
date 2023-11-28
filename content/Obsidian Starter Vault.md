---
title: 🔮 Obsidian Starter Vault
date: 2023-08-26
updated: 2023-11-24
source: https://github.com/semanticdata/obsidian-starter-vault
compartir: true
category: Projects
---

## Introduction

An opinionated [Obsidian](https://obsidian.md/) starter. It holds a compilation of extensions and settings to help you learn and start exploring Obsidian.

[Source](https://github.com/semanticdata/obsidian-starter-vault)

## Getting Started

1. Clone or download this repo.
2. Open the repo in Obsidian.
3. Use it and customize it.
4. Have fun!

## Appearance

* Obsidian [Minimal Theme](https://github.com/kepano/obsidian-minimal)

### CSS Snippets

* Compact Tab Header - Arranges items in Tab header into groups.
* Default Style Settings - Adds the option to customize Obsidian further.
* Frontmatter Tweaks - Improves the legibility of Frontmatter elements.
* MySnippets Tweaks - Essential UI setting while using [MySnippets](https://github.com/chetachiezikeuzor/MySnippets-Plugin) Plugin.
* Normalize Links - Removes decoration from external links.
* Status bar Tweaks - Improves legibility of the Status bar.
* Table Tweaks - Improves legibility of Tables.
* Typography Fixes - Normalizes styling and typography.

## Community Plugins

* [Advance Tables](https://github.com/tgrosinger/advanced-tables-obsidian) - Improved navigation, formatting, and manipulation to markdown tables.
* [Calendar](https://github.com/liamcain/obsidian-calendar-plugin) - Integrates Daily Notes. Let's you visit any Daily Notes with ease.
* [Doubleshift](https://github.com/Qwyntex/doubleshift) - Press `shift` or `ctrl` twice and activate custom actions.
* [Editor Shortcuts](https://github.com/timhor/obsidian-editor-shortcuts) - Adds Hotkeys commonly found in other common code editors.
* [Home Tab](https://github.com/olrenso/obsidian-home-tab) - Integrates recent notes and Omnisearch.
* [Linter](https://github.com/platers/obsidian-linter) - Format and style notes. Akin to something like Prettier.
* [Minimal Settings](https://github.com/kepano/obsidian-minimal-settings) - Allows you to customize the minimal theme settings panel.
* [Mononote](https://github.com/czottmann/obsidian-mononote) - Ensures each note occupies only one tab.
* [MySnippets](https://github.com/chetachiezikeuzor/MySnippets-Plugin) - Adds a status bar menu allowing the user to quickly manage their snippets.
* [Natural Language Dates](https://github.com/argenos/nldates-obsidian) - Allows `@today` style shortcuts.
* [Omnisearch](https://github.com/scambier/obsidian-omnisearch) - Better search. Period.
* [Settings Search](https://github.com/javalent/settings-search) - Adds a search bar to Obsidian settings.
* [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) - Allows snippet, theme, and plugin CSS files define as a set of config options.
* [YAOS - Yet Another Obsidian Synchronizer](https://github.com/mahyarmirrashed/yaos) - Sync your vault to GitHub.

## File Structure

```
root
├── assets/
├── journals/
│   └── first-journal.md
├── templates
│   └── daily-journal.md
└── README.md
```

## Workflows

### Formatting Text

The _Markdown Linter_ plugin is configured to <ins>lint on save</ins> for a smoother typing experience. This means everytime you press `Ctrl + S`, it will **format the note** as well as save it.

### Hotkeys

#### Search

* You may open the _Command Palette_ by pressing `Ctrl` `Ctrl` in rapid succession.
* You may start _Omnisearch: Search Vault_ by pressing `Shift` `Shift` in rapid succession.
* Reassigned `Ctrl + F` to _Omnisearch: In File Search_.
* Reassigned `Ctrl + Shift + F` to _Omnisearch: Search Vault_.

#### Editor Shortcuts

| Action                   | Keybinding           |
| ------------------------ | -------------------- |
| Move line up             | `Alt + Up`           |
| Move line down           | `Alt + Down`         |
| Copy line above          | `Alt + Shift + Up`   |
| Copy line below          | `Alt + shift + Down` |
| Select word / selection  | `Ctrl + D`           |
| Select line (repeatable) | `Ctrl + L`           |

### Natural Language Dates

Autocomplete and link natural language expressions to daily notes.

Examples:
* `@today`
* `@tomorrow`
* `@next week`

### Tables

Start a Markdown table by typing `|` followed by a `<space>` and `Tab`.

## License

Source code in this repository is available under the [MIT](LICENSE) license. You are free to use this code however you see fit. That said, some acknowledgement would be well received.
