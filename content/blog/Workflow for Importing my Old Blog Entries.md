---
tags:
  - on/blogging
  - productive-laziness
  - digital-gardening
date: 2022-10-16
aliases:
  - workflow-for-importing-my-old-blog-entries
---
Since discovering my old blog entries I’ve been developing a workflow to import them into my current Wordpress blog. Spanning 2002–2012 there is value in bringing it all together, even if it takes some time. There are a lot of ideas in there which were valuable at the time, and are still valuable now.

Workflows involve chaining tools together with the output of one feeding into the next. 10 years of posts across 600+ PDF pages is too much to do completely manually.

My workflow is:

1. ☑️ Convert PDF file to DOCX format using [Nitro PDF Pro](https://www.gonitro.com/). I tried a conversion to TXT but that put a new line into every paragraph which was unworkable.

3. ☑️ Convert DOCX to TXT by using Microsoft Word’s Save As feature. I needed to select UTF-8 for compatibility otherwise quote characters and the like came out wrong.

5. Load the TXT file into [Ulysses](https://ulysses.app) for splitting, review, correction and publishing. I was originally going to create a Python script for this and spent 1-2 hours on it. In the end, the Ulysses split function allows me to correctly split the single document into individual posts. I can review each in turn.

7. Publish from Ulysses direct into WordPress. Each post shows an icon once published.

9. Finally, grab the post into my [[Obsidian]]-based digital garden using an [RSS import plug-in](https://quantumgardener.blog/2022/08/28/success-process-flipped/).

This post has been written in Ulysses as a test and I’m confident it will replace the WordPress interface. You can only be _productivly lazy_ if you have the right tools in place.

Nitro PDF Pro and Ulysses are sourced through a [Setapp](https://setapp.com) subscription. Very handy when doing this type of work. Let’s me grab find suitable applications easily.
