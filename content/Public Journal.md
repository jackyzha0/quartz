---
title: Public Journal
description: This new section will explore the concept of maintaining a Public Journal.
compartir: true
enableToc: true
updated: 2023-10-19
---
## 2023-10-18

### Notes

* Created new CSS snippets for Obsidian. Changes appearance of list items in menus, and reduces font size for the [BMO Chabot](https://github.com/longy2k/obsidian-bmo-chatbot).

### Digital Garden

* Fixed stylesheet loop. Quartz changed how to address stylesheet order in sass. This broke my previous implementation adding custom and explorer stylesheets. It's all good now. The website looks as it should again.
* Removed categories from all notes eliminating the folders that were created for Budding, Evergreen, and Seedlings. The Archive remains.

> [Link Of The Day](https://en.wikipedia.org/wiki/Lake_Chad)

## 2023-10-16

### Notes

* Attended a Boys Like Girls concert at The Fillmore in Minneapolis. Had a blast! The line-up was very good. LØLØ opened the night, followed by The Summer Set, continued by State Champs and of course, ended with Boys Like Girls. We arrived at 5:20PM, doors opened at 5:30PM, show started at 6:30PM, We were out by 10:45PM.

> [Link Of The Day](https://en.m.wikipedia.org/wiki/Mirabal_sisters)

## 2023-10-06

### GitHub

* Renamed [Zola Test] to [Zola Dinkleberg](https://github.com/semanticdata/zola-dinkleberg). Makes it easy not find now that I'm done testing workflows with it.
* Updated GitHub workflows for [Mabuya].
* Created new repo [Zola TailwindCSS](https://github.com/semanticdata/zola-tailwindcss). Trying / Learning [TailwindCSS](https://tailwindcss.com/).
* Created new repo [Zola Minima](https://github.com/semanticdata/zola-minima). Reviving a long abandoned project.

### Blog

* Changed certain colors to improve accessibility of the site.
* New dark mode matches closer to what the Digital Garden looks like.

### Digital Garden

* Fixed a dependencies problem I created earlier by performing `npm i --force`.

### Firefox

* Updated the description on my Firefox extensions. Fixed a link to the tutorial for unlocking Firefox sidebar's width.
* Took the opportunity and updated missing logos with UXWing's collection.
* Added an Acknowledgements section to the description attributing the icons to UXWing.

> [Link Of The Day](https://en.m.wikipedia.org/wiki/Pareto_principle)

## 2023-10-02

### GitHub

* I applied and was accepted into the [GitHub Sponsors](https://github.com/sponsors) program. Added my info and added FUNDING.yml to a few projects.
* After some testing, I have put together a GitHub Action to build and/or deploy Zola sites without the need of a second branch.

### Digital Garden

* Introducing the concept of _Seedlings_, _Budding_, and _Evergreen_ notes.
	* 🌱 _Seedlings_ for very rough and early ideas
	* 🌿 _Budding_ for work I've cleaned up and clarified
	* 🌳 _Evergreen_ for work that is reasonably complete (though I still tend these over time).

### Zola Docs

* Ran the site via Lighthouse. Identified and applied a few small improvements. Raised the performance and SEO scores.
* Fixed heading anchor icons. Previously broken icon.
* Refactored styles slightly. Working on code accessibility.
* Introduced new container, and container classes to style the site with a maximum width, instead of allowing it to overflow the entire browser width. It is currently working for Desktop, but it needs work to make it fit in the Mobile layout.
* Replaced copyrighted icons the original theme used. Introduced icons from [UX Wing](https://uxwing.com/).

> [Link Of The Day](https://en.wikipedia.org/wiki/Rubber_duck_debugging?useskin=vector)

## 2023-09-29

### Notes

* It's my birthday! 🎉
* Released version 1.1.0 of my Obsidian starter vault.
* Found an amazing CSS Layout Hack. Added to both Brave and Firefox bookmarks, and to [[../Bookmarklets|Bookmarklets]].  
[Source](https://gist.github.com/growthboot/5c189cf854c6609d3113355c75527c1c)

### GitHub

* Backed up all my current active repositories.
* Renamed [Zola Tale] to [Mabuya](https://github.com/semanticdata/mabuya).
* Created new repository [Zola Docs](https://github.com/semanticdata/zola-docs). It will be used to create my own zola Documentation theme I can use.

### Digital Garden

* Trying out color schemes from the [Quartz](https://github.com/jackyzha0/quartz/) [Discord Community](https://discord.gg/cRFFHYye7t).
* Extended README to include information about fonts and colors used.

### Blog

* Emptying [miguel-pimentel-do] to upload new blog.
* Deployed the new blog using [Mabuya] to [miguel-pimentel-do].

### Zola Docs

* Configured the site with my information.
* Formatted all documents.
* Converted all TOML frontmatter to YAML. (personal preference)
* Added netlify.toml to make it easier to deploy the site.
* Added theme package including: gitignore, gitattributes, code of conduct, contributing, github workflow, and issue, pr, feature-request templates.

### Zola Tale

* Preparing for rename and redeployment as [MiguelPimentel.do](https://miguelpimentel.do). Finally replacing my old Hugo blog that was really hard to modify.
* Decided to go for [Mabuya](https://en.wikipedia.org/wiki/Mabuya_hispaniolae?useskin=vector) as the name. References the Hispaniolan two-lined skink (Mabuya hispaniolae). A species of _skink_ _endemic_ to the Dominican Republic.

### Mabuya

* Renamed from Zola Tale. Prepared as Zola theme.
* Added navigation items to the footer. Styled it for both small width screen and full width screens.

> [Link Of The Day](https://en.wikipedia.org/wiki/Pheasant_Island)

---

## 2023-09-28

### Notes

* Made massive changes to [Zola-Tale]. Namely the README.
* Implemented and deployed a new [dark mode] switch. This was only possible after refactoring all styles.

### GitHub

* Renamed [Obsidian Sample Theme] to [Anodyne](https://github.com/semanticdata/anodyne).

> [Link Of The Day](https://en.wikipedia.org/wiki/Karen_Silkwood?useskin=vector)

---

## 2023-09-27

### Notes

* Revisited a few text editors I have been watching for a bit. Looked at [Lapce](https://github.com/lapce/lapce), [Lite XL](https://github.com/lite-xl/lite-xl), and [ecode](https://github.com/SpartanJ/ecode). They are looking good, but they are not a point in where I want to dig deeper into using them.

### Zola Tale

* Continue testing. Implemented a new, from the grounds up, dark mode.
* Fully refactored all stylesheets.

### GitHub

* Created a new repo [Obsidian Sample Theme] with the aim to contain my newest project, a Obsidian theme. I have put together some basic CSS properties I'm playing around with.

### Digital Garden

* Synchronized the forked repo with it's base.
* Updated dependencies and _package-lock_.
* Updated the [[Explore the Garden|Garden Exploration Guide]]. Added additional links.

> [Link Of The Day](https://en.wikipedia.org/wiki/Aaron_Swartz?useskin=vector)

---

## 2023-09-22

### Notes

* Many days worth of changes reported on this entry.
* Started looking at modal editors more seriously. I intend to slowly learn Vim key bindings.
	* I have been reading and watching videos about [Vim](https://www.vim.org/), [NeoVim](https://neovim.io/), [Emacs](https://www.gnu.org/software/emacs/), and [Helix](https://github.com/helix-editor/helix).

### Blog

* Testing [Zola Tale] as possible replacement for the blog. It emphasises the writing, only providing an About page for the curious. This has become a more popular idea in my mind. In the past, I have tried to merge my Blog and my digital garden without success. I'm leaning on that. Only articles and an 'About' page will be enough to accomplish the goal I have with the blog. On the other hand, this encourages more people to visit my digital garden, as I plan to write about it on the blog.
* Many changes made to the [Obsidian Starter Vault]. Added two new plugins, and updated the README.
* Contributed [PR #8](https://github.com/zbrox/anpu-zola-theme/pull/8) to add dark mode toggle to the [Anpu](https://github.com/semanticdata/anpu-zola-theme) Zola theme.
* Placed the following projects in _"stand-by"_:
	* [Stressed-dev](https://github.com/semanticdata/stressed-dev)
	* [PurpleWasTaken](https://github.com/semanticdata/purple-was-taken)
	* [Zola Quartz](https://github.com/semanticdata/zola-quartz)
	* [Silicon Dioxide](https://github.com/semanticdata/silicon-dioxide)

### Digital Garden

* It has changed domains. Currently being hosted on [forgetfulnotes.com](https://forgetfulnotes.com/).
* After experimenting with the idea of keeping my code base in Quartz v3.3, using Hugo as the base, I felt the amount of effort was unjustified. For now, I have settled on using the latest version of [Quartz](https://github.com/jackyzha0/quartz) as the base for my [[./Digital Garden|digital garden]].
* You can find its source code in [Forgetful Notes](https://github.com/semanticdata/forgetful-notes).

> [Link Of The Day](https://en.wikipedia.org/wiki/Cornfield_Bomber?useskin=vector)

---

## 2023-09-12

### Notes

* Added configuration for [Alacritty](https://github.com/alacritty/alacritty) to my [dotfiles](https://github.com/semanticdata/dotfiles) repo.
* I have been trying out Brave's vertical tabs. Initially, I didn't like them, and as I continue to review, I keep finding myself liking them less and less. I am not quite sure why the vertical tabs implementation in the Firefox sidebar feels much better to me. I am done trying the feature out. They did not fit my current workflow. The implementation left a lot to be desired.
* Trying out Brave's vertical tabs. Initially, I do not like it.
* Created a new repo to hold my [dotfiles](https://github.com/semanticdata/dotfiles) and configurations.

### Silicon Dioxide

* Expanded adjustments and changes made to [Silicon Dioxide](https://github.com/semanticdata/silicon-dioxide) repo.
* Fully rebranded from Quartz (port) to Silicon Dioxide.
* Deployed the site using GitHub Pages.
* Consolidated changes previously made to **Forgetful Notes** into **Silicon Dioxide**.

> [Link Of The Day](https://en.wikipedia.org/wiki/Illegal_number?useskin=vector)

---

## 2023-09-01

### Notes

* Renamed multiple GitHub repos. Namely, `hugo-lowkey` was renamed to [miguel-pimentel-do](https://github.com/semanticdata/miguel-pimentel-do), `hugo-quartz` was renamed to [stressed-dev](https://github.com/semanticdata/stressed-dev). Both, together with [forgetful-dev](https://github.com/semanticdata/forgetful-dev), are now named based on their domains.
* Created new repos [test-hugo-lowkey](https://github.com/semanticdata/test-hugo-lowkey), and [test-hugo-quartz](https://github.com/semanticdata/test-hugo-quartz) to test GitHub Actions. This proved fruitful as I was able to understand, simplify builds, and deployments. Mainly, eliminated the need to deploy Quartz v3.3 from the `gh-pages` branch.

### Digital Garden

* _"Downgraded"_ from [Quartz v4.0.7](https://github.com/semanticdata/forgetful-dev) to [Quartz v3.3](https://github.com/jackyzha0/quartz/tree/hugo) in an effort to retain control of fewer moving parts.
* It is no longer hosted in [forgetful-dev](https://github.com/semanticdata/forgetful-dev). It can now be found in newly created [purple-was-taken](https://github.com/semanticdata/purple-was-taken); which also follows the domain naming convention mentioned in the first bullet point.

> [Link Of The Day](https://en.m.wikipedia.org/wiki/Espalier)

---

## 2023-08-30

### Notes

* Started work on a new repo, [obsidian-starter-vault](https://github.com/semanticdata/obsidian-starter-vault). Aiming to release an Obsidian start-up setup I like.

### Blog

* Published (again) the guide to [[Unlock Firefox Sidebar]] after reading a comment in [Hacker News](https://news.ycombinator.com/) asking for exactly that. I responded with a link to the article on [Dev.to](https://dev.to/semanticdata/unlock-the-sidebar-width-in-firefox-22p0). Originally, I removed the guide from my [blog](https://miguelpimentel.do) because I didn't think it fit with the content at the time.
* Overhauled Taxonomies (Categories and Tags) within the [blog](https://miguelpimentel.do). Created specific pages to format the titles, and define how the taxonomy pages are displayed/organized.

### Digital Garden

* Compiled, and published a collection of [[../Bookmarklets|Bookmarklets]].
* Cleaned up and published [[../Inspirations|Inspirations]].
* Making the Garden more explorable by adding direct links to the [tags] page from the [Homepage].
* Playing with the Garden's desktop layout. Temporarily moved right sidebar components to the left sidebar. Undone shortly after, as it messed with the total calculated width of the page and its two sidebar widths.

> [Link Of The Day](https://en.wikipedia.org/wiki/Iceland_v_Iceland_Foods_Ltd)

---

## 2023-08-25

### Notes

* Reformatted blog posts from [Prose Poetry](https://github.com/semanticdata/prose-poetry). Cleaned it up a bit.
* Updated MiguelPimentel.do entry in the [512KB Club](https://512kb.club/).
* Submitted Forgetful.dev into the [512KB Club](https://512kb.club/).

### Digital Garden

* Started my new **Public Journal**.
* About a week ago I upgraded my [[./Digital Garden|digital garden]] from [Quartz v3.3] to [Quartz v4-Alpha].
* Today I upgraded the Garden backend from [Quartz v4-Alpha] to the official [Quartz v4] release.

> [Link Of The Day](https://en.m.wikipedia.org/wiki/Bus_factor)

## Acknowledgements

> [!info] Acknowledgements
> 
> This page takes inspiration from the [Journal of an Enigmatic Mind](https://speyllsite.pages.dev/journal/). It explores the concept of keeping a public journal, something I haven't done before.
