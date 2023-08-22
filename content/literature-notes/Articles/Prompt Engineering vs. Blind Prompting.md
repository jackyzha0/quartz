---
author: [[Mitchell Hashimoto]]
title: "Prompt Engineering vs. Blind Prompting"
tags: 
- articles
- literature-note
---
# Prompt Engineering vs. Blind Prompting

![rw-book-cover](https://mitchellh.com)

## Metadata
- Author: [[Mitchell Hashimoto]]
- Full Title: Prompt Engineering vs. Blind Prompting
- Category: #articles
- URL: https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting

## Highlights
- [About](https://mitchellh.com/)
  [Writing](https://mitchellh.com/writing)
  [Misc](https://mitchellh.com/misc)
  [Mitchell Hashimoto](https://mitchellh.com/)
  Prompt Engineering vs. Blind Prompting
  April 14, 2023
  "Prompt Engineering" emerged from the growth of language models to describe the process of applying prompting to effectively extract information from language models, typically for use in real-world applications.
  A lot of people who claim to be doing prompt engineering today are actually just *blind prompting.*[1](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#user-content-fn-1) "Blind Prompting" is a term I am using to describe the method of creating prompts with a crude trial-and-error approach paired with minimal or no testing and a very surface level knowedge of prompting. *Blind prompting is not prompt engineering.*
  There is also a lot of skepticism about whether prompt engineering can truly be described as "engineering" or if it's just ["witchcraft"](https://news.ycombinator.com/item?id=35524725) spouted by hype-chasers. I think in most cases the skepticism is rooted in the fact that a lot of tweets and blog posts I've seen claiming to be on prompt engineering are really at best a thin layer above blind prompting.
  In this blog post, I will make the argument that prompt engineering is a real skill that can be developed based on real experimental methodologies. I will use a realistic example to walk through the process of prompt engineering a solution to a problem that provides practical value to an application.
  This whole post will be biased towards expecting text output, since text output is the primary use case I've had with language models. Certain techniques -- such as the testing techniques -- don't translate 1:1 to other types of outputs such as images. Everything in this post does work well for multi-modal *inputs*, however.
  Table of Contents
  • [What is Prompting?](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#what-is-prompting)
  • [The Problem](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#the-problem)
  • [The Demonstration Set](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#the-demonstration-set)
  • [Prompt Candidates](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#prompt-candidates)
  • [Prompt Testing](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#prompt-testing)
  • [Choosing a Prompt](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#choosing-a-prompt)
  • [Trust But Verify and Continuous Improvement](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#trust-but-verify-and-continuous-improvement)
  • [And Onwards...](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#and-onwards)
  * * *
  [](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#what-is-prompting)What is Prompting?
  Feel free to skip this section if you're already very familiar with the term "prompting" or understand what a "prompt" is.
  For language models (imagine ChatGPT if this term is unfamiliar to you), the **"prompt"** is the user-generated input to the model. In ChatGPT, it can effectively be understood as the text box you type in. The language model then "infers" a "completion" to your prompt. For example, if I type "4 + 3 = " in ChatGPT, it will respond with "7" (probably). In this case, "4 + 3 = " is the prompt, and "7" is the completion.
  **"Prompting"** is the act of using prompts as a way to extract desired information from a model. It is an attractive approach to extracting information because you don't need a large offline training set, you don't need offline access to a model, and it feels intuitive even for non-engineers. Prompting is just [one method to tune a model](https://huyenchip.com/2023/04/11/llm-engineering.html#prompting_vs_finetuning_vs_alternatives).
  Finally, **"prompt engineering"** describes a more rigorous discipline (as will be shown in this post) that aims to utilize prompting as a way to build reliable functionality for real-world applications. It differs from ChatGPT-style prompting because the prompts generated through prompt engineering are usually meant to be used repeatedly in high-volume, diverse situations in order to solve a specific problem reliably for an application.
  * * *
  [](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#the-problem)The Problem
  To start, you must have a problem you're trying to build a solution for. The problem can be used to assess whether prompting is the best solution or if alternative approaches exist that may be better suited as a solution. Engineering starts with not using a method for the method's sake, but driven by the belief that it is the *right method*.
  For this example, we will pretend that we're a company that builds a calendar client. We'd like users to be able to enter events using natural language. For example:
  > Dinner with Alice next Tuesday at Taco Bell
  > CorpConf on 11/4
  > 1:1 with Bob tomorrow at 10 AM
  Language models might be a good solution to take this natural language input and extract structured output to describe the event that we can then use within our application.
  There are obviously other potential solutions. We can utilize a set of [regular expressions](https://en.wikipedia.org/wiki/Regular_expression) and string search to look for common phrases (`on <Day of Week>`, `tomorrow`, `today`, `next week`, etc.).
  Language models have their own benefits: they might provide an approach that handles other languages better, or might handle typos or grammatical errors better, or may at worst be a good backstop if regular expressions fail. In any case, there is enough promise to continue pursuing prompting as a potential solution.
  * * *
  [](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#the-demonstration-set)The Demonstration Set
  Next, we have to put together a demonstration set. The demonstration set contains an expected input along with an expected output. This set will serve multiple goals:
  1. It will be used to measure the accuracy of our prompt. By using the input of a single demonstration, we can assert that we receive the expected output.
  2. It specifies what we expect the prompt inputs and outputs to look like, allowing us as engineers to determine if it is the right shape for our problem.
  3. We can use a subset of this demonstration set as exemplars for a few-shot approach if we choose to use a few-shot prompt. For those unfamiliar with the term "few-shot", few-shot is a style of prompt where examples are given in addition to the prompt. See [here for a good overview of Few-Shot vs Zero-Shot prompting](https://www.promptingguide.ai/techniques/fewshot).
  Point (2) above is extremely important. We need to have some general understanding of what input we expect and what output we expect, because on both sides of this is [usually] software that needs to ensure the data is in a certain format and will expect a certain format back out. This is no different from typical software engineering where we decompose a problem into a set functions that have some input/output expectations.
  We can utilize our examples from before and expand them to be complete demonstrations:
  Q: Dinner with Alice next Tuesday at Taco Bell
  A: next Tuesday
  Q: CorpConf on 11/4
  A: 11/4
  Q: 1:1 with Bob tomorrow at 10 AM
  A: tomorrow
  **A note on demonstration set size:** For this blog post, we only have three demonstrations. In reality, you probably want at least a dozen. The more demonstrations you have the better testing you can do, but also the more expensive it becomes due to token usage. At a certain size, it is often more economical to [fine-tune a language model](https://huggingface.co/course/chapter7/3?fw=pt).
  There are two important decisions made for the above demonstrations. For any prompting problem, you'll have to make similar decisions.
  **First, we are only extracting one piece of information.** It may be tempting to try to get the model to extract our entire e ([View Highlight](https://read.readwise.io/read/01gyw5naj1b4w018yve0736d18))
- This table shows prompt candidates on the Y-axis, and prompt types using those prompts on the X-axis. The value is the accuracy as a percentage of correct answers. ([View Highlight](https://read.readwise.io/read/01gyw6dw0tt4pdzcrjp17aq1x9))
- **A note for experienced prompters:** the few-shot example doesn't say something like "mimic the examples below." Experimental research has shown this doesn't reliably increase accuracy, so I like to test without it first to limit tokens. Second, the few-shot example exemplars don't ever show the "MM/DD" extraction as an example, which is poor form. In a real few-shot setting, demonstrating all styles of extraction can be important ([View Highlight](https://read.readwise.io/read/01gyw6eh4kc3rmrfw5j6q4gyp4))
- Finally, you choose a one of the prompt candidates to integrate into your application. This isn't necessarily the most accurate prompt. This is a cost vs. accuracy analysis based on model used, tokens required, and accuracy presented. ([View Highlight](https://read.readwise.io/read/01gyw6esx5fg13hhy23a7jt3rk))
- decide to go back and test **other approaches to increase accuracy.** For ([View Highlight](https://read.readwise.io/read/01gyw6f3qx5f1kac4vcchrjk6q))
- lower cost model to see if that improves the accuracy enough. Sometimes, using more tokens on a lower cost model will save significant money vs. low-token usage on a higher cost model. For example, GPT-4 is ~15x more expensive than GPT-3.5 today. That means that you effectively have 15x more token budget to increase the GPT-3.5 prompt accuracy (caveats around rate limits noted). ([View Highlight](https://read.readwise.io/read/01gyw6fe4egy8hdyjjjde6r858))
- Due to the probabilistic nature of generative AI, your prompt likely has some issues. Even if your accuracy on your test set is 100%, there are probably unknown inputs that produce incorrect outputs. ([View Highlight](https://read.readwise.io/read/01gyw6fra6qmyd6hvx39gx5bwc))
- Verification is highly dependent on the problem. ([View Highlight](https://read.readwise.io/read/01gyw6fx698e1zft131qp3722f))
- This blog post demonstrates how developing a prompt can -- in my opinion -- be an engineering practice. It describes a systematic approach to identifying a problem, forming solutions, validating those solutions, and applying continuous improvement to refine those solutions. ([View Highlight](https://read.readwise.io/read/01gyw6gar6mcbwqjq6sws8hwas))
- Additionally, everyone is rapidly moving to higher-order LLM integrations: prompt chaining, agents, etc. Some people argue that future innovations such as these and more will make human prompting obsolete. ([View Highlight](https://read.readwise.io/read/01gyw6hgakxdhxmny7y4980bft))
## New highlights added May 8, 2023 at 10:03 AM
- A lot of people who claim to be doing prompt engineering today are actually just *blind prompting.*[1](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting#user-content-fn-1) "Blind Prompting" is a term I am using to describe the method of creating prompts with a crude trial-and-error approach paired with minimal or no testing and a very surface level knowedge of prompting. *Blind prompting is not prompt engineering.* ([View Highlight](https://read.readwise.io/read/01gzx64nmhq8yktg9x0f0n6fnk))
