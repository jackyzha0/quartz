---
title: Obsidian
creation_date: 2023年03月02日
modification_date: NaN
banner: "![[daily-note-banner.gif]]"
banner_y: 0.4637
banner_lock: false
week: 2023-09
tags: "#笔记"
---
# Obsidian

## Plugins and Scripts
- https://www.reddit.com/r/ObsidianMD/comments/11e3jpx/autohotkey_script_for_controlling_youtube_media/
- Dataview.js and Tasks https://gist.github.com/TfTHacker/4e019abd25c58de57376add6e3aa4173

## Cool Homepage Designs
- https://github.com/Rainbell129/Obsidian-Homepage

## Editing/Formmatting

>[!info] 

>[!question] 

>[!tip]

>[!todo]

> [!example]

> [!note] 

> [!abstract]

> [!success]

> [!warning] 

> [!failure]

>[!danger]

>[!bug]

>[!quote]


## Snippets
Getting list of tasks with `[YYYY-MM-DD]` string, uses regex

```dataviewjs
dv.taskList(dv.pages().file.tasks
	.where(t => !t.completed)
	.where(t => t.text.match(/\[\[([12]\d{3}年(0[1-9]|1[0-2])月(0[1-9]|[12]\d|3[01]))日\]\]/)))
```
---





