---
title: "How to build a website using Hugo and Netlify"
date: "2022-01-11"
tags:
- "notes"
- "seedlings"
sr-due: 2023-01-06
sr-interval: 3
sr-ease: 250
---

# Why use a static site generator?

All websites were originally static.

All pages were written by hand.

Cons in the beginning

- Updating required completely updating by hand.
- No interactivity

Dynamic websites

- Solved the inadequacies of a static site
- Uses themes, databases, file systems
- User could provide input, which goes to the database, does something with it and returns it to the user.
- HTTP(S) REQUESTS → SERVER → PHP → EXTENSIONS → DATABASE + FILE SYSTEM (then back)
- Cons
   - Speed
   - Lots of breaking points (more points of exchanges = more points of breakage)
   - All breaking points are also security breakage points
- How did we solve these cons?
   - Javascript: Things that were once done in the server were not done in the client’s device
   - Javascript frameworks: jQuery, Angular, React, and thousands more
   - Through javascript, static sites could be dynamic.
- How did dynamic site users come back to using static sites?
   - Static site generators

What is the workflow of a creator using a static site?

1. Build your content (Markup).
2. Build your theme (HTML, CSS, and Javascript).
3. Use a static site generator to bring your content and them together and push it out into a website through HTML, CSS, and Javascript.

Why is this great?

- If you want to change your content or theme, just change those files, not each page.

What is the access workflow (or how people are accessing your website?)

Computer → ← Server

No point of breakage.

What are the most popular static site generators?

- Hugo
- Hexo
- Jekyll
- Grava
- Wintersmith
- Gatsby
- Pelican
- Middleman
- Hubpress

# Steps

1. Install a theme.
2. Copy the config.toml of the sample site for theme.
3. Modify the config.toml file.
4. Check localhost:1313 to preview the theme.

# How to install a theme

1. Open terminal.
2. Go to the desktop.
3. Go to your site’s folder.
4. Go to your site’s themes folder.
5. Run a command that takes a github repository of the theme into your site folder.
6. Go to config.toml and modify it

Some notes about themes

- If there is an update on a particular theme, they will run it through github. You run a git command to download that.
- You can modify the theme’s components as long as it is within what is allowed in the license file.

# How to modify config.toml

Go to [params]

Change title to site’s title

# How to keep your configuration to avoid it from breaking when there is an update in the them

Copy any configuration in the themes folder into their equivalent in the root directory of your site

# What are archetypes?

They are the format that your site follows whenever it creates a new post

# Netlify CMS

