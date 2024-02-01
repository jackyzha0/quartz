---
title: Digital Gardening with Quartz
tags:
  - meta
  - webdev
  - difficulty-moderate
date: 2023-08-23
lastmod: 2024-01-20
---
...It's this website.

This isn’t my first web project. I’ve created homepages for open source projects, and I started hosting [[Projects/memos|Memos]] long before I found Obsidian. However, it’s the one I expect to have the longest life. 
## About Quartz
Quartz is a publishing system that allows you to take Markdown in a variety of different flavors and host it as a website! One of those flavors is Obsidian markdown, which means it's a choice for publishing your Obsidian notes. All of these webpages are edited right inside Obsidian (either on my laptop or my phone, thanks [[Projects/Obsidian/livesync|LiveSync]]), and then I can tell Quartz to throw my changes on GitHub for them to be deployed automatically.

As for why I chose Quartz over the conventional [Obsidian Publish](https://obsidian.md/publish) route, The primary reasons were convenience and cost at first: it was easy to edit right out of Obsidian, and I could run this for free on my own hosting. However, it turns out that the community around extending and improving Quartz is absolutely HUGE! New features are being merged almost every day, and I'm happy to say that I've contributed to a few features and bugfixes.

Many people will run Quartz out of the root of their Obsidian notes, but I run the site out of a subdirectory of my main [Obsidian Vault](https://help.obsidian.md/Getting+started/Create+a+vault). This is because I don't want to publicly expose all of my notes. This subdirectory is symlinked as the `content` folder in my repository that the site runs out of. 
- Sidebar: this makes link autocomplete weird. 
	- My subfolder is called Garden, and I can't autocomplete an internal reference such as `[[Essays/productivity|Increase your Productivity]]` because if I hit tab, it'll turn into `[[Garden/Essays/productivity|Increase your Productivity]]`. 
	- Since `Garden` doesn't exist as a folder in the install, and Quartz looks at links as shortest-path, that link will 404 until I catch that I made an error. 
	- Case in point, the link to Catppuccin from [[Projects/Obsidian/editor#Appearance#Theme|the editor project page]] was borked for like a month.
	- Not a big deal but it's worth mentioning.

I could have self-hosted the site, but I opted to use Quartz's built-in functionality for automatically deploying to GitHub Pages and just proxying through to it from my domain. It's simpler, even though it does result in Microsoft having their grubby mitts on my work.
### Hiccups
This was a time and a half to set up RSS for. It used some bastardized form of Atom but with RSS syntax and so neither spec could parse it.
- On the bright side, [one PR later](https://github.com/jackyzha0/quartz/pull/407) and Quartz is the only project in the Obsidian ecosystem with an RSS feed. 

**And important for any website:** 
## Block the bot traffic! 
You don't want bad spiders/crawlers poking around on your site to try to find vulnerabilities or archiving your content for training AI without your consent. I like the Nginx project [Ultimate Bad Bot Blocker](https://github.com/mitchellkrogza/nginx-ultimate-bad-bot-blocker): 
- Still lets sites like Google and Bing crawl your site for search results, but blocks infinitely many other agents, referrers, and the like. 
- Customizable with allowlists and denylists that you can use to override the defaults. 
- Did I mention it gets updated every hour? 
- Search for `444` in your nginx access logs after it's installed for a few laughs. It's mind blowing how many spiders are trying to find files that contain hosting access tokens (AWS, etc) for random sites.

[[Projects/Obsidian/quartz-comments|Adding comments to the site]] was enough of a hassle that I consider it a separate project. Work in progress.

## Using this Site
- [Explorer](https://quartz.jzhao.xyz/features/explorer) 
	- \[Desktop\] on your left: jump to any page on the site.
	- \[Mobile\] visit the [[sitemap|Sitemap]].
- [Graph View](https://help.obsidian.md/Plugins/Graph+view) 
	- An [[Programs I Like/obsidian|Obsidian]] feature which acts as a map of what pages link to each other. Click on it for a map of the entire site and how it interconnects. It doesn't use Obsidian's implementation directly, but since [[Projects/Obsidian/digital-garden|the site generator I use]] is heavily inspired by Obsidian and [Obsidian Publish]( https://obsidian.md/publish ), it remains.
	- \[Desktop\]: right pane
	- \[Mobile\]: below content and comments
- Backlinks
	- A list of all pages on the site that link to the current one.
	- \[Desktop\]: right pane
	- \[Mobile\]: below content and comments