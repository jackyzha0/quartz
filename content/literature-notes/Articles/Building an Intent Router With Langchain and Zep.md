---
author: [[Daniel Chalef]]
title: "Building an Intent Router With Langchain and Zep"
tags: 
- articles
- literature-note
---
# Building an Intent Router With Langchain and Zep

![rw-book-cover](https://www.getzep.com/content/images/2023/06/sunny_in_the_hills_a_cute_robot_standing_at_a_junction_in_a_roa_7a7cf9de-ce82-40e5-a56c-32c3870c7dc8.png)

## Metadata
- Author: [[Daniel Chalef]]
- Full Title: Building an Intent Router With Langchain and Zep
- Category: #articles
- URL: https://www.getzep.com/building-an-intent-router-with-langchain-and-zep/

## Highlights
- Ensuring your LLM app understands user intent is crucial in offering a great experience. We build an intent router using Langchain, which automatically selects the prompt best suited to a task. ([View Highlight](https://read.readwise.io/read/01h44a9knzey5thpzvw9gc7thy))
- One user’s intention for using a chatbot agent may not be the same as another's. A useful framework for thinking about intent is to consider *task specificity* and *task specialization*: ([View Highlight](https://read.readwise.io/read/01h44a9xyhyvgfy678zstytv5c))
- **Task specificity:** What task is the user hoping to accomplish by engaging with the agent? ([View Highlight](https://read.readwise.io/read/01h44aaqf43dwd92ectw6qs3kc))
- **Task specialization:** Beyond the specific task, are there attributes to the user’s intent that might inform how the agent should interact with the user? ([View Highlight](https://read.readwise.io/read/01h44ab39cxwp4q2j9ewq0gj80))
- Task specificity and specialization dictate which prompts our agents should use and how we construct those prompts: ([View Highlight](https://read.readwise.io/read/01h44abgr5f127c4nmb183qd5q))
- Conceptually, we want to develop specific “routes” for a user to take through their journey with the LLM, with these routes being composed of different prompts. ([View Highlight](https://read.readwise.io/read/01h44abtbqd0p3mcw38y50hbqs))
- The extractor uses an LLM to identify a user’s intent and persists this intent to the Zep Memory Store. [We have seen unpredictable latencies](https://www.getzep.com/text-embedding-latency-a-semi-scientific-look/) with calls to LLM endpoints, such as those offered by OpenAI, sometimes requiring multiple retries. Zep runs extractors asynchronous to the chat loop to ensure this doesn’t impact the user experience, but it hard to rely on an LLM for routing prompts in the critical path of applications. ([View Highlight](https://read.readwise.io/read/01h44ac16a457m8pgspagdk3x3))
- An “Intent Router” selects a prompt from a collection of prompts based on the context of the conversation. Using an LLM to decide which prompt to use is entirely feasible. Still, as mentioned above, LLM API access and completion latency can leave a user waiting and result in a poor user experience. ([View Highlight](https://read.readwise.io/read/01h44acdg0v0f32xdzcxt2amne))
- Semantic Similarity offers a very useful alternative to LLMs. Rather than waiting to identify the user’s intent before we can determine which prompt to use, we define a set of expected intents for an application and use vector search to determine which of these intents is closest to the user’s chat message. ([View Highlight](https://read.readwise.io/read/01h44acfpvjgj0hntn6e096dmt))
- We can build a fast and effective intent router using a simple in-memory vector store, OpenAI Embeddings, and Langchain’s `EmbeddingRouterChain` class. ([View Highlight](https://read.readwise.io/read/01h44acmnke5gwbr8fqrs5hhgc))
- • Identify the potential user intents for our application (in the example below, we have a sales intention and a customer support intention).
  • Create separate task-specific prompts for each intention.
  • Create chains using the above prompts for each intent, and associate them with the intent text.
  • Embed the set of intents we identified, adding these to our vector store.
  • When a user sends the agent a message, we embed the message and run a simple Nearest Neighbors or similar algorithm to find the embedded intent that is nearest in the vector space to the user’s message. That is, the intent is most semantically similar to the user’s message.
  • With this intent, we can select the correct chain and prompts. ([View Highlight](https://read.readwise.io/read/01h44ad5ft8pmecd6ytpkzs8d1))
