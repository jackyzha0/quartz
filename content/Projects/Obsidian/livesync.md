---
title: LiveSync
tags:
  - cloud
  - difficulty-advanced
  - seedling
date: 9-08-23
---
> [!hint]
> This page discloses some instructions that I thought would have been helpful when I was setting up this project.

Setting up LiveSync was pretty tumultuous. Obsidian has a paid feature called [Obsidian Sync](https://obsidian.md/sync), which accomplishes the same thing, but I have a webserver and determination!

Repo is [here](https://github.com/vrtmrz/obsidian-livesync) for those interested.

Once I had the database the guide specified up and running (simple because docker), I routed it through nginx and tried to set up the editor plugin. However, the docs fail to mention that **you have to create an empty table inside CouchDB** and point the plugin to that, so I was causing all sorts of issues and getting errors I didn't know how to fix until I tried that on a whim. Now it works perfectly and will handle my documents without issue!

I also recommend setting up a keyboard shortcut for the `Replicate Now` command in Obsidian. I use `ctrl+shift+S`.