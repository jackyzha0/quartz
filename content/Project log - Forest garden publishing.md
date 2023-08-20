---
title: "Project log - Forest garden publishing"
date: "2022-09-02"
tags:
- "notes"
- "seedlings"
---

[[2022-08-10]]

I tried making Quartz work for me. The original plan was to follow this video: https://www.youtube.com/watch?v=ITiiuBNVue0&t=369s. I like it because it addressed privacy issues. But then, I went through all sorts of problem with implementing it. For example, I went through the trouble of setting my GOPATH, which is a basic for go programmers, but something I only learned now. Through this, I learned that the Mac terminal has different shells: bash, zshrc, and fish. Setting my GOPATH correctly relies on a knowledge of what amont these shells' profiles must be edited. I now know the answer, and I might be able to pull Quartz off, but while looking for alternatives, I think I have found a better option, which addresses privacy (using .gitignore) plus a bigger framework of doing this.

The alternatives I tried included Obsidian Zola (because of its alleged easy process of adding a single file in the obsidian vault) and the alternatives in this [article](https://beingpax.medium.com/7-obsidian-publish-alternatives-to-publish-your-notes-online-for-free-33db4fb06f5). Among these alternatives, I would have wanted to use Mathieu [Dutour's Gatsby Digital Garden](https://beingpax.medium.com/how-to-publish-your-obsidian-notes-online-for-free-851af90e797). However, I went through a lot of trouble installing Gatsby and its dependencies so I gave it up.

I discovered other interesting options like [blot.im](https://blot.im/), which is easy to use but doesn't really support the complexity I need for my site. [MkDocs](https://www.mkdocs.org/), which was claimed to be an easy and fast option, but well, not really. [Mindstone](https://mindstone.tuancao.me/) was an option, but it shows everything, impossible to support privacy, typography is bad and just looks a lot like obsidian publish, which looks bad (good idea I can't afford it anyway). 

Before walking, the last option I played with involved [11ty digital garden theme](https://github.com/binyamin/eleventy-garden). I would have used this if not for its too poor design, and because I discovered Maggie Appleton's wonderful [github repo](https://github.com/maggieappleton/digital-gardeners). I browsed the list of digital gardens there, and read one of her essays at her website about digital gardening for non-technical people.

I also encountered Sveltekit, Dendron, Innos Note, and Hyperdraft.

What really worked for me though was the Jekyll + Obsidian workflow of [Hiran Venugopalan](https://github.com/Jekyll-Garden/jekyll-garden.github.io). I decided to go with this direction after watching this [video](https://www.youtube.com/watch?v=m_oGnpe3g6g&list=PLfFmPgPyv2xfHPlETx4o0luhtOBBe2QfE&index=5) and pondering about the design of [Maggie's website](https://maggieappleton.com). In both sites, the site is the digital garden. The essays and blog posts are integrated with the notes and the notes with the essays and posts. Salman's process of using Obsidian makes a lot of sense. If I put the site folder and the notes folder in one vault, I could easily link them to each other. This gives Obsidian a more robust function (if only it could edit gitignore and other files, it might even be my choice of editor). But now, I could write my notes there and my essays at the same time.

[[2022-08-11]]

Tried deploying jekyll blog on cloudflare. It worked. But then I realized how limited its functionalities are so I committed to using quartz.

[[2022-08-12]]

- Read [A Brief History & Ethos of the Digital Garden](https://maggieappleton.com/garden-history) and wrote some links to check.
- Learned how to use .gitignore file.
- I used frontmatter for tags in Obsidian.
- Decided to put all notes under /content directly.
- I looked for Filipino and Pangasinan words to find a word to refer to my second brain.

[[2022-08-13]]

- Discovered forest garden as a useful metaphor for my second brain
- Continued modifying notes YAML.
- Played around with Operand.

[[2022-08-14]]

- I learned how to fork a repository correctly: fork all its branches, clone it to your local machine, and push to hugo when ready. This makes sure that updates are not synced automatically.
- Modified past blog posts to match Quartz.
- Tried modifying the font in Quartz template.

[[2022-08-14]]

- I tried setting up Operand, but to no avail.
- I tried exploring TinyLetter and why mind gardeners seem to love it. Along the way, I discovered that there are opensource newsletter software.
- I added my Goog Analytics to my site.
- I fixed problems with email forwarding in my custom email and reauthenticated it in Mailerlite.
- Discovered that MD names with apostrophes don't work well when publishing.
- Tried playing around the design of tinyletter embed signup form and copyin how Andy Matuschack and Tom Critchlow did it in their sites.
- Embedded a Mailerlite signup form in my site's footer.

[[2022-08-15]]

- Wrote copy for the homepage of my site.
- Wrote links to new terms of art I used in the homepage copy:
	- [[thoughts/forest garden of the mind]]
	- [[Seeds]]
	- [[Wilderness of the mind]]
	- [[Wilderness of geographic space]]
	- [[The Wilderness]]
	- [[The long walk]]
- Created a favicon using Canva.
- Used custom domain and pointed vinceimbat.com to the Github pages.
- Waited for security certificate to be awarded to site.
- Poked around gwer.net.

[[2022-08-16]]

- I read ["The Garden and the Stream"](https://hapgood.us/2015/10/17/the-garden-and-the-stream-a-technopastoral/), and took highlights using Instapaper.
- I tried setting up Operand, but to no avail.
- I tried exploring TinyLetter and why mind gardeners seem to love it. Along the way, I discovered that there are opensource newsletter software.
- I added my Goog Analytics to my site.
- I fixed problems with email forwarding in my custom email and reauthenticated it in Mailerlite.
- Discovered that MD names with apostrophes don't work well when publishing.
- Tried playing around the design of tinyletter embed signup form and copying how Andy Matuschack and Tom Critchlow did it in their sites.
- Embedded a Mailerlite signup form in my site's footer.

[[2022-08-17]]

I continued processing my Obsidian notes's front matter.

[[2022-08-18]]

Continued processing some more notes.