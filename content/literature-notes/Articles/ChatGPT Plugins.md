---
author: [[openai.com]]
title: "ChatGPT Plugins"
tags: 
- articles
- literature-note
---
# ChatGPT Plugins

![rw-book-cover](https://openai.com/favicon.png)

## Metadata
- Author: [[openai.com]]
- Full Title: ChatGPT Plugins
- Category: #articles
- URL: https://openai.com/blog/chatgpt-plugins

## Highlights
- Though not a perfect analogy, plugins can be “eyes and ears” for language models, giving them access to information that is too recent, too personal, or too specific to be included in the training data. In response to a user’s explicit request, plugins can also enable language models to perform safe, constrained actions on their behalf, increasing the usefulness of the system overall.
  We expect that open standards will emerge to unify the ways in which applications expose an AI-facing interface. We are working on an early attempt at what such a standard might look like, and we’re looking for feedback from developers interested in building with us. ([View Highlight](https://read.readwise.io/read/01gwh4vdsf51fynwd7zmg1j25g))
- Plugins offer the potential to tackle various challenges associated with large language models, including “hallucinations,” keeping up with recent events, and accessing (with permission) proprietary information sources. By integrating explicit access to external data—such as up-to-date information online, code-based calculations, or custom plugin-retrieved information—language models can strengthen their responses with evidence-based references. ([View Highlight](https://read.readwise.io/read/01gwh4x99f6jsbz9vq99xxabfd))
- our red teamers discovered ways for plugins—if released without safeguards—to perform sophisticated prompt injection, send fraudulent and spam emails, bypass safety restrictions, or misuse information sent to the plugin. We’re using these findings to inform safety-by-design mitigations that restrict risky plugin behaviors and improve transparency of how and when they're operating as part of the user experience. We're also using these findings to inform our decision to gradually deploy access to plugins. ([View Highlight](https://read.readwise.io/read/01gwh4y8nsxzr9qbqph300qke2))
- we recently released a [working paper](https://arxiv.org/abs/2303.10130) which found that language models with access to tools will likely have much greater economic impacts than those without, and more generally, in line with [other](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4350925) [researchers’](https://arxiv.org/abs/2302.06590) findings, we expect the current wave of AI technologies to have a big effect on the pace of job transformation, displacement, and creation. ([View Highlight](https://read.readwise.io/read/01gwh4ysj41wtf9a121q73d1vk))
- We’ve created a web browsing plugin which gives a language model access to a web browser, with its design prioritizing both safety and operating as a good citizen of the web. The plugin’s text-based web browser is limited to making GET requests, which reduces (but does not eliminate) certain classes of safety risks. This scopes the browsing plugin to be useful for retrieving information, but excludes “transactional” operations such as form submission which have more surface area for security and safety issues ([View Highlight](https://read.readwise.io/read/01gwh52w9df6teqgpx2gnm70c4))
- Browsing retrieves content from the web using the Bing search API. As a result, we inherit substantial work from Microsoft on (1) source reliability and truthfulness of information and (2) “safe-mode” to prevent the retrieval of problematic content. The plugin operates within an isolated service, so ChatGPT’s browsing activities are separated from the rest of our infrastructure. ([View Highlight](https://read.readwise.io/read/01gwh53b95v255w0mtc9nd3t0r))
- We would like our models to be able to use their [programming](https://arxiv.org/abs/2107.03374) [skills](https://arxiv.org/abs/2303.08774) to provide a much more natural interface to most fundamental capabilities of our computers. Having access to a very eager junior programmer working at the speed of your fingertips can make completely new workflows effortless and efficient, as well as open the benefits of programming to new audiences. ([View Highlight](https://read.readwise.io/read/01gwh5s6frp3grctt85t2ypx5p))
- As an open-source and self-hosted solution, developers can deploy their own version of the plugin and register it with ChatGPT. The plugin leverages [OpenAI embeddings](https://platform.openai.com/docs/guides/embeddings) and allows developers to choose a vector database ([Milvus](https://milvus.io/), [Pinecone](https://www.pinecone.io/), [Qdrant](https://qdrant.tech/), [Redis](https://redis.io/docs/stack/search/reference/vectors/), [Weaviate](https://weaviate.io/) or [Zilliz](https://zilliz.com/)) for indexing and searching documents. Information sources can be synchronized with the database using webhooks. ([View Highlight](https://read.readwise.io/read/01gwh5stsezqdaym4m1rdjr4j3))
