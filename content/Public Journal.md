---
title: Public Journal
description: This new section will explore the concept of maintaining a Public Journal. It takes inspiration from The Journal of an Enigmatic Mind.
compartir: true
enableToc: true
lastmod: 2023-09-18
---

> This section explores the concept of maintaining a Public Journal.
> It takes inspiration from the [Journal of an Enigmatic Mind](https://speyllsite.pages.dev/journal/).

## 2023-09-12

**Notes**
* Added configuration for [Alacritty](https://github.com/alacritty/alacritty) to my [dotfiles](https://github.com/semanticdata/dotfiles) repo.
* I am done trying out Brave's vertical tabs. They did not fit my current workflow. The implementation left a lot to be desired.
**Silicon Dioxide**
* Expanded adjustments and changes made to [Silicon Dioxide](https://github.com/semanticdata/silicon-dioxide) repo.
* Fully rebranded from Quartz to Silicon Dioxide.
* Deployed the site using GitHub Pages.
* Consolidated changes previously made to **Purple Garden** into **Silicon Dioxide**.

> [Link Of The Day](https://en.wikipedia.org/wiki/Illegal_number?useskin=vector)

## 2023-09-06

**Notes**
* As I continue to test Brave vertical tabs, I keep finding myself liking them less and less. I am not quite sure why the vertical tabs implementation in the Firefox sidebar feels much better to me.

**Digital Garden**
* Rewrote [[Meta]].
* Changed `markup -> tableOfContents -> ordered` to false within `hugo.yaml`.
* Added default options for: `noH1`, `tabWidth`, `hl_inline`, `canonifyURLs`.
* Added `enableEmoji: true` to `config.yaml`.
* Modified `img.center` to use `display: flex` instead of `display: block`.
* Commented out `background-color: var(--lightgray);` from `#search-icon`.
* Commented out `<p>{{ i18n "search" }}</p>` from `header.html`.
* Reduced `{{ i18n "recent_notes" }}` from `h2` to `h3` in `recent.html` to match the Interactive Graph header.
* Bumped `npm: d3` from `@6.7.0` to `@7.8.5` in `graph.html`. Updated integrity check from sha256 to sha384.
* Bumped `npm: floating-ui/core` in `head.html` from `1.2.1` to `1.4.1`. Added sha384 integrity check.
* Bumped `npm: floating-ui/dom` in `head.html` from `1.4.1` to `1.5.1`. Added sha384 integrity check.
* Bumped `npm: katex` from `@0.15.1` to `@0.16.8` within `katex.html`. Updated its multiple sha384 checks.
* Bumped `npm: mermaid` from `@9` to `@10.4.0` within `head.html` and `mermaid.html`.
* Bumped `npm: flexsearch` from `@0.7.21` to `@0.7.31`. Updated integrity check from sha256 to sha384.
* Moved `<style>` from within [[Digital Garden Colors]]. Added `.block` styling to `custom.scss`. Introduced `margin: auto;` to center the color blocks.

> [Link Of The Day](https://en.wikipedia.org/wiki/Karen_Silkwood?useskin=vector)

## 2023-09-05

**Notes**
* Trying out Brave's vertical tabs. Initially, I do not like it.
* Created a new repo to hold my [dotfiles](https://github.com/semanticdata/dotfiles) and configurations.

**Digital Garden**
* Removed `text-align: justify;` from `body`. Applied to `article p` within `base.scss` instead. Much better implementation.
* Added `text-align: left` to `p .meta`.
* Removed `font-size: large;` from `.section-li & h3`.
* Commented out `margin-top: 2em` from `.section-ul`.
* Enable `Recent Notes` in `config.yaml`.
* Added `height: 36px` to new `.content-list .section` to standardise the height of the list items within `Recent Notes`.
* Removed `font-size: large` from `.section-li & h3`.

> [Link Of The Day](https://en.wikipedia.org/wiki/Aaron_Swartz?useskin=vector)

## 2023-09-01

**Notes**
* Renamed multiple GitHub repos. Namely, `hugo-lowkey` was renamed to [miguel-pimentel-do](https://github.com/semanticdata/miguel-pimentel-do), `hugo-quartz` was renamed to [stressed-dev](https://github.com/semanticdata/stressed-dev). Both, together with [forgetful-dev](https://github.com/semanticdata/forgetful-dev), are now named based on their domains.
* Created new repos [test-hugo-lowkey](https://github.com/semanticdata/test-hugo-lowkey), and [test-hugo-quartz](https://github.com/semanticdata/test-hugo-quartz) to test GitHub Actions. This proved fruitful as I was able to understand, simplify builds, and deployments. Mainly, eliminated the need to deploy Quartz v3.3 from the `gh-pages` branch.

**Digital Garden**
* _"Downgraded"_ from [Quartz v4.0.7](https://github.com/semanticdata/forgetful-dev) to [Quartz v3.3](https://github.com/jackyzha0/quartz/tree/hugo) in an effort to retain control of fewer moving parts.
* It is no longer hosted in [forgetful-dev](https://github.com/semanticdata/forgetful-dev). It can now be found in newly created [purple-was-taken](https://github.com/semanticdata/purple-was-taken); which also follows the domain naming convention mentioned in the first bullet point.
* Added `text-align: justify;` to the `body`. Good results so far.
* Reduced `margin-top: 2em;` to `margin-top: 1em;` in `.section-ul`.
* Reduced `margin-bottom: 1em;` to `margin-bottom: 0.5em;` in `.section-li`.
* Added `font-size: large;` to `.section-li & h3`.
* Reduced `flex-basis: 6em;` to `flex-basis: 5em;` in `.section-li & p`.

> [Link Of The Day](https://en.m.wikipedia.org/wiki/Espalier)

## 2023-08-30

**Blog**
* Published (again) the guide to [[Unlock Firefox Sidebar]] after reading a comment in [Hacker News](https://news.ycombinator.com/) asking for exactly that. I responded with a link to the article on [Dev.to](https://dev.to/semanticdata/unlock-the-sidebar-width-in-firefox-22p0). Originally, I removed the guide from my [blog](https://miguelpimentel.do) because I didn't think it fit with the content at the time.
* Overhauled Taxonomies (Categories and Tags) within the [blog](https://miguelpimentel.do). Created specific pages to format the titles, and define how the taxonomy pages are displayed/organized.

> [Link Of The Day](https://en.wikipedia.org/wiki/Pheasant_Island)

## 2023-08-28

**Notes**
* Started work on a new repo, [obsidian-test-vault](https://github.com/semanticdata/obsidian-test-vault). Aiming to release an Obsidian start-up setup I like.

**Digital Garden**
* Compiled, and published a collection of [[Bookmarklets]].
* Cleaned up and published [[Inspirations]].
* Making the Garden more explorable by adding direct links to the [tags](tags/) page from the [_index](/).
* Playing with the Garden's desktop layout. Temporarily moved right sidebar components to the left sidebar. Undone shortly after, as it messed with the total calculated width of the page and its two sidebar widths.

> [Link Of The Day](https://en.wikipedia.org/wiki/Iceland_v_Iceland_Foods_Ltd)

## 2023-08-25

**Notes**
* Reformatted blog posts from [Prose Poetry](https://github.com/semanticdata/prose-poetry). Cleaned it up a bit.
* Updated MiguelPimentel.do entry in the [512KB Club](https://512kb.club/).
* Submitted Forgetful.dev into the [512KB Club](https://512kb.club/).

**Digital Garden**
* Started this new **Public Journal**.
* Upgraded the Garden backend from `Quartz v4-Alpha` to the official `Quartz v4` release.

> [Link Of The Day](https://en.m.wikipedia.org/wiki/Bus_factor)
