---
title: Remark42 Comments
tags:
  - cloud
  - difficulty-advanced
  - webdev
  - seedling
date: 9-08-23
---
I recently added [Remark42](https://remark42.com/) for comments. It's still a work in progress, and I plan to update quite a few things about it in future.
## Backend
I run the service from Docker on [[Projects/my-cloud|my cloud]], exposed at a subdirectory of this domain. Fun fact, the exact reason that I proxy through my cloud to the GH Pages hosting for this site is so that I can do stuff like this and throw related services on subdirectories. 

I really enjoy how easy it is to bring-up my backend nowadays because everything is a docker container.
## Frontend
I've created a [Transformer Plugin](https://quartz.jzhao.xyz/advanced/making-plugins#transformers) for Quartz that adds the necessary scripts to the page, and put the comment element on the footer of the page. Make sure to disable [SPA Mode](https://quartz.jzhao.xyz/features/SPA-Routing) to get it to work.
- Sidebar: R42 apparently does have a method of working with SPAs, but I don't know near enough about webdev to mess with how Quartz handles its routes and enable that functionality.

At present, you can choose to leave an anonymous comment or link it to your GitHub account.
## Todo
- Configure [email](https://remark42.com/docs/configuration/email/) features like sign-in and notifications
	- Requires setting up an SMTP server. Ugh...
	- Yet another service on my poor cloud VM. And this isn't even one I can selfhost.
- Style the comment box to align with the styles on the site.