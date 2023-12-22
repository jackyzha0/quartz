---
title: Philosophy of Quartz
---

## A garden should be a true hypertext

> The garden is the web as topology. Every walk through the garden creates new paths, new meanings, and when we add things to the garden we add them in a way that allows many future, unpredicted relationships.
>
> _(The Garden and the Stream)_

The problem with the file cabinet is that it focuses on efficiency of access and interoperability rather than generativity and creativity. Thinking is not linear, nor is it hierarchical. In fact, not many things are linear or hierarchical at all. Then why is it that most tools and thinking strategies assume a nice chronological or hierarchical order for my thought processes?

The ideal tool for thought for me would embrace the messiness of my mind, and organically help insights emerge from chaos instead of forcing an artificial order. A rhizomatic, not arboresecent, form of note taking.

My goal with a digital garden is not purely as an organizing system and information store (though it works nicely for that). I want my digital garden to be a playground for new ways ideas can connect together. As a result, existing formal organizing systems like Zettelkasten or the hierarchical folder structures of Notion don’t work well for me. There is way too much upfront friction that by the time I’ve thought about how to organize my thought into folders categories, I’ve lost it.

Quartz embraces the inherent rhizomatic and web-like nature of our thinking and tries to encourage note-taking in a similar form.

---

## A garden should be shared

The goal of digital gardening should be to tap into your network’s collective intelligence to create constructive feedback loops. If done well, I have a shareable representation of my thoughts that I can send out into the world and people can respond. Even for my most half-baked thoughts, this helps me create a feedback cycle to strengthen and fully flesh out that idea.

Quartz is designed first and foremost as a tool for publishing [digital gardens](https://jzhao.xyz/posts/networked-thought) to the web. To me, digital gardening is not just passive knowledge collection. It’s a form of expression and sharing.

> “[One] who works with the door open gets all kinds of interruptions, but [they] also occasionally gets clues as to what the world is and what might be important.”
> — Richard Hamming

**The goal of Quartz is to make sharing your digital garden free and simple.**

---

## A garden should be your own

At its core, Quartz is designed to be easy to use enough for non-technical people to get going but also powerful enough that senior developers can tweak it to work how they'd like it to work.

1. If you like the default configuration of Quartz and just want to change the content, the only thing that you need to change is the contents of the `content` folder.
2. If you'd like to make basic configuration tweaks but don't want to edit source code, one can tweak the plugins and components in `quartz.config.ts` and `quartz.layout.ts` in a guided manner to their liking.
3. If you'd like to tweak the actual source code of the underlying plugins, components, or even build process, Quartz purposefully ships its full source code to the end user to allow customization at this level too.

Most software either confines you to either

1. Makes it easy to tweak content but not the presentation
2. Gives you too many knobs to tune the presentation without good opinionated defaults

**Quartz should feel powerful but ultimately be an intuitive tool fully within your control.** It should be a piece of [agentic software](https://jzhao.xyz/posts/agentic-computing). Ultimately, it should have the right affordances to nudge users towards good defaults but never dictate what the 'correct' way of using it is.
