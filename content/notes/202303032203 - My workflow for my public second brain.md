

---
title:  "202303032203 - My workflow for my public second brain"
Date: 2023-03-03
tags: 
- permanent-note 
- setup
---

In this post, I'm going to share my workflow for sharing my notes on my personal website.

![Digital-Garden](notes/attachments/Digital-Garden.png)
My workflow relies on two key elements:
-   A personal vault where I write and store all my notes.
-   A public vault used for sharing the public view of my digital garden.

Here are the tools I use:

-   [Obsidian](https://obsidian.md/) for capturing ideas and taking notes on physical books, talks, and podcasts.
-   [Readwise Reader](https://readwise.io/read) for highlighting and processing literature notes.
-   [Syncthing](https://syncthing.net/) for synchronizing my notes across devices.
-   [Github](https://github.com/) for backups and publishing.
-   [rsync](https://en.wikipedia.org/wiki/Rsync) and [cron](https://en.wikipedia.org/wiki/Cron) for moving notes from the personal vault to the public one.
-   [🪴 Quartz 3.3](https://quartz.jzhao.xyz/) for hosting my public digital garden.
-   [Tinybird](https://www.tinybird.co/) for analytics.

Here's how my workflow works:
1. FIrst I capture information: 
	- On my laptop or smartphone, I write rough drafts of my ideas in [Obsidian](https://obsidian.md/) and save them to my personal vault. These notes usually reside in a staging folder, waiting to be processed into proper, permanent notes.
	- I use [Readwise Reader](https://readwise.io/read) to read content and highlight important passages. Sometimes I also write notes or use its integrated GPT-3 to summarize parts of the content. These highlights and notes are synced to my personal vault every hour using the [Official Readwise plugin for Obsidian](https://github.com/readwiseio/obsidian-readwise). The integration between Obsidian and Readwise works seamlessly.
2. My notes are synchronized between my laptop and smartphone using [Syncthing](https://syncthing.net/) and backed up on [Github](https://github.com/).
3. I publicly share my permanent notes, longer writings, and literature notes. These notes are copied from my personal vault to the folder that feeds the content to my public personal site built with [🪴 Quartz 3.3](https://quartz.jzhao.xyz/). For this purpose I use [cron](https://en.wikipedia.org/wiki/Cron) to trigger [rsync](https://en.wikipedia.org/wiki/Rsync) commands for the three folders containing those three types of notes. . Here's an example of the command I use:

``` 
0 * * * * rsync -av  --exclude '000*' /data/projects/obsidian/pelayoarbues/notes/ /data/projects/quartz/content/notes/
```

Explanation of the commands:
- `0 * * * *` Runs the script every hour at minute 0.
-   `rsync`: the command to sync files and directories
-   `-av`: the options to archive the files and directories (preserve permissions, timestamps, etc.) and to show verbose output
-   `--exclude '000*'`: the option to exclude files that start with "000". These are index files that I use in my personal obsidian but of no interest for the public.
-   `/data/projects/obsidian/pelayoarbues/notes/`: the source directory to sync, with a trailing slash to include its contents
-   `/data/projects/quartz/content/notes/`: the target directory to sync to, with a trailing slash to specify that it's a directory

Note that the trailing slashes are important to ensure that the contents of the directories are synced and not the directories themselves.

4. My personal website is pushed to a Github repo with an associated Github action that builds the Quartz site. For more information on this setup, check out: [Deploying Quartz to the Web](https://quartz.jzhao.xyz/notes/hosting/).
5. Finally, in order to track audiences I am testing [Tinybird](https://www.tinybird.co/). Supereasy setup with [Open Source Google Analytics Alternative・Tinybird Starter Kit](https://www.tinybird.co/starter-kits/web-analytics)






