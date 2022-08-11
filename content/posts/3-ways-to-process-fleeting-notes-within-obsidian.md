---
title: 3 Ways to Process Fleeting Notes within Obsidian
date: 2022-08-10
lastmod: 2022-08-11
---
A big pain point with taking [[notes/Fleeting Notes|Fleeting Notes]] is the ability to integrate these raw unprocessed notes into your Obsidian vault. I know people have different requirements so I will be walking through three different workflows for processing Fleeting Notes. That being said, if you have another workflow or like a particular workflow, I'd love to hear more about it in the comment section!

## 1. Don't Process Them! (My Recommendation)
My number one recommendation is to **NOT process Fleeting Notes within Obsidian**. Within the Fleeting Notes app, there is already support for building connections between notes (through link autocompletion). Once connected, notes are considered "processed" as they are resurfaceable through backlinks. Combine this with [[posts/how-ai-powered-links-supercharge-notetaking|AI powered link suggestions]], building a network of notes has never been faster.

Additionally, there is a way to [[notes/How to copy Obsidian links to Fleeting Notes|copy Obsidian links to Fleeting Notes]] for more relevant link suggestions. 

![Link suggestions in Fleeting Notes](posts/img/link-suggestion-fn.png)

## 2. Using the "Insert Unprocessed Notes" Command
The "[[posts/how-to-process-fleeting-notes-in-obsidian|Insert Unprocessed Notes]]" command is built into the Fleeting Notes Sync plugin and it creates a checklist of notes that are "unprocessed". Unprocessed notes are fleeting notes that aren't "checked" within a checklist. Using this command takes advantage of the links to reference notes created within Fleeting Notes.

This command is intended to be used alongside the Daily Notes plugin. At the end of every day, I'd run the "Insert Unprocessed Notes" command within the daily notes and go through each item in the checklist to process my fleeting notes.

Here's a video that shows you this process: https://youtu.be/sFQaDeFNecc

## 3. Deleting notes to "process" them
Another workflow is to delete the processed notes directly from the folder where the Fleeting Notes are synced. Prior to deleting the note, the note will be somehow (depending on the person) integrated into the Obsidian vault.

If you're using this process ensure to set the "Sync Type" in the settings to "One-way sync + Delete from FN" (This will delete all notes within Fleeting Notes once synced to Obsidian). Otherwise, deleted notes will be repopulated on sync.

![Sync types in Fleeting Notes Sync plugin](posts/img/sync-types.png)

To selectively delete notes from Obsidian, go to the settings and set the "Sync Type" to "Two-way sync" and add the  `deleted: true`  to the metadata of the note. Once this flag is added, the next time the sync command is run the note will be deleted from the Fleeting Notes app.

Example metadata of deleted note:
```
---
# Metadata used for sync
id: "58252210-1975-11ed-b1e8-bdd157d4987c"
title: ""
created: "2022-08-11T12:58:49.905Z"
source: ""
deleted: true
---
```
