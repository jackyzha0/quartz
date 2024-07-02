---
title: "quartz (software)"
author: ["Justin"]
date: 2024-06-30T05:14:00-04:00
lastmod: 2024-07-02T17:14:30-04:00
draft: false
---

[GitHub - jackyzha0/quartz: 🌱](https://github.com/jackyzha0/quartz) - What my note site is built in, essentially a SSG
(static site generator) meant to look similar to Obsidian's published sites
(which costs money, since they host it for you). Amusingly Obsidian seems to
sponsor it, which is their competition which confuses me. Commoditize your
complement?

Anyways I plan to use this for ideas / add-ons / goals wrt to my site too.


## Quartz {#quartz}

-   [X] Figure out how plugins work
    -   ezpz
-   [ ] Accomodate org-roam / org-mode more
    -   [ ] TIL tag (new idea)
    -   [ ] TODO/KILL/OK blah blah, etc. support - ox-hugo exports the CSS, it just
        doesn't exist on the quartz side
    -   [ ] Maybe some CSS header movement, make it look more org-like, bullets,
        etc. - give it my own vibe
-   [ ] The big issue with this is how do I stop remark from screwing with the html,
    it basically strips out half the stuff ox-hugo does.
-   [X] Figure out why sort / emojis don't work inside folders
    -   Okay, that was me being dumb and not noticing it used two explorers,
        extracted to function then reused.


### Already Done {#already-done}

-   In toc.ts I added a helper function to strip HTML, this is because if you add
    a subheader tag in ox-hugo, it'll add a &lt;span&gt; with the tag, and the toc would
    convert it ot something like:

<!--listend-->

```html
<a href="#index-span-classtagspan-classmoviesmoviesspanspan" data-for="index-span-classtagspan-classmoviesmoviesspanspan">Index &lt;span class="tag"&gt;&lt;span class="movies"&gt;movies&lt;/span&gt;&lt;/span&gt;</a>
```

-
