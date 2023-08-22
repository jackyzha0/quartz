---
author: [[Chip Huyen]]
title: "Building LLM Applications for Production"
tags: 
- articles
- literature-note
---
# Building LLM Applications for Production

![rw-book-cover](https://huyenchip.com/assets/pics/llmops/llama_taming.png)

## Metadata
- Author: [[Chip Huyen]]
- Full Title: Building LLM Applications for Production
- Category: #articles
- URL: https://huyenchip.com/2023/04/11/llm-engineering.html

## Highlights
- • It’s easy to make something cool with LLMs, but very hard to make something production-ready with them.
  • LLM limitations are exacerbated by a lack of engineering rigor in prompt engineering, partially due to the ambiguous nature of natural languages, and partially due to the nascent nature of the field. ([View Highlight](https://read.readwise.io/read/01gythgw1g0rztbyerhndvrrkp))
## New highlights added April 25, 2023 at 11:50 AM
- • It’s easy to make something cool with LLMs, but very hard to make something production-ready with them.
  • LLM limitations are exacerbated by a lack of engineering rigor in prompt engineering, partially due to the ambiguous nature of natural languages, and partially due to the nascent nature of the field. ([View Highlight](https://read.readwise.io/read/01gyvq5zj74e2jyaa4jg0ghc6q))
- Challenges of productionizing prompt engineering ([View Highlight](https://read.readwise.io/read/01gyvq6bgnjnf7fscb92rhyc3y))
- In prompt engineering, instructions are written in natural languages, which are a lot more flexible than programming languages. This can make for a great user experience, but can lead to a pretty bad developer experience. ([View Highlight](https://read.readwise.io/read/01gyvq6ncjd2ms67myexrvbmqw))
- if someone accidentally changes a prompt, it will still run but give very different outputs. ([View Highlight](https://read.readwise.io/read/01gyvq75m9v7pqafv9t66ykps1))
- We can craft our prompts to be explicit about the output format, but there’s no guarantee that the outputs will *always* follow this format. ([View Highlight](https://read.readwise.io/read/01gyvq83nx5356mhec9k501fmd))
- **Inconsistency in user experience**: when using an application, users expect certain consistency ([View Highlight](https://read.readwise.io/read/01gyvq8b6wvhr5jy70p40xare1))
- You can force an LLM to give the same response by setting **[temperature = 0](https://platform.openai.com/docs/api-reference/completions/create#completions/create-temperature)**, which is, in general, a good practice. While it [mostly solves the consistency problem](https://community.openai.com/t/observing-discrepancy-in-completions-with-temperature-0/73380), it doesn’t inspire trust in the system ([View Highlight](https://read.readwise.io/read/01gyvq8mm0c3z5w08av2ge4f4h))
- This seems to be a problem that OpenAI is actively trying to mitigate. They have a notebook with tips on how to increase their models’ reliability. ([View Highlight](https://read.readwise.io/read/01gyvqay8vwe3jw51w9n4tp2fe))
- A couple of people who’ve worked with LLMs for years told me that they just accepted this ambiguity and built their workflows around that. It’s a different mindset compared to developing deterministic programs, but not something impossible to get used to. ([View Highlight](https://read.readwise.io/read/01gyvqbq053fdeqjwg6hss91he))
- A common technique for prompt engineering is to provide in the prompt a few examples and hope that the LLM will generalize from these examples (fewshot learners). ([View Highlight](https://read.readwise.io/read/01gyvqc8pv68jsrkr3vzw0jbxj))
- **Whether the LLM understands the examples given in the prompt**. One way to evaluate this is to input the same examples and see if the model outputs the expected scores. If the model doesn’t perform well on the same examples given in the prompt, it is likely because the prompt isn’t clear ([View Highlight](https://read.readwise.io/read/01gyvqd6m7kwtc4z99qz9dj895))
- **Whether the LLM overfits to these fewshot examples.** You can evaluate your model on separate examples. ([View Highlight](https://read.readwise.io/read/01gyvqdb8vkj6wkmcfc1vr0tdc))
- Small changes to a prompt can lead to very different results. It’s essential to version and track the performance of each prompt. You can use git to version each prompt and its performance, but I wouldn’t be surprised if there will be tools like MLflow or Weights & Biases for prompt experiments. ([View Highlight](https://read.readwise.io/read/01gyvqmqw8b71dfz957wzsvqrk))
- • Prompt the model to explain or explain step-by-step how it arrives at an answer, a technique known as [Chain-of-Thought](https://arxiv.org/abs/2201.11903) or COT (Wei et al., 2022). **Tradeoff**: COT can increase both latency and cost due to the increased number of output tokens [see **Cost and latency** section]
  • Generate many outputs for the same input. Pick the final output by either the majority vote (also known as [self-consistency technique](https://arxiv.org/abs/2203.11171) by Wang et al., 2023) or you can ask your LLM to pick the best one. In OpenAI API, you can generate multiple responses for the same input by passing in the argument [n](https://platform.openai.com/docs/api-reference/completions/create) (not an ideal API design if you ask me).
  • Break one big prompt into smaller, simpler prompts. ([View Highlight](https://read.readwise.io/read/01gyvqnzcsz0mypcpk1jzq5g4n))
- The more explicit detail and examples you put into the prompt, the better the model performance (hopefully), and the more expensive your inference will cost. ([View Highlight](https://read.readwise.io/read/01gyvqph3p05sphrwv3ex6q6tj))
- Depending on the task, a simple prompt might be anything between 300 - 1000 tokens. If you want to include more context, e.g. adding your own documents or info retrieved from the Internet to the prompt, it can easily go up to 10k tokens for the prompt alone. ([View Highlight](https://read.readwise.io/read/01gyvqptg5rqhb2n649dteg45v))
- **prompt engineering is a cheap and fast way get something up and running**. For example, even if you use GPT-4 with the following setting, your experimentation cost will still be just over $300. The traditional ML cost of collecting data and training models is usually much higher and takes much longer. ([View Highlight](https://read.readwise.io/read/01gyvqqgcpdb0h0m0bx5qtmghv))
- **The cost of LLMOps is in inference.** ([View Highlight](https://read.readwise.io/read/01gyvqqz8ch9pwsfjtpe52rbs1))
- Input tokens can be processed in parallel, which means that input length shouldn’t affect the latency that much.
  However, output length significantly affects latency, which is likely due to output tokens being generated sequentially. ([View Highlight](https://read.readwise.io/read/01gyvqrzh4tbr598ycab0s3dat))
- The most successful one seemed to be *randaller* who was able to get the [30B parameter model work on 128 GB of RAM](https://github.com/randaller/llama-chat), which takes a few seconds just to generate one token. ([View Highlight](https://read.readwise.io/read/01gyvqtch7czjdrqrhskt6xzka))
- many teams have told me they feel like they have to redo the feasibility estimation and buy (using paid APIs) vs. build (using open source models) decision every week. ([View Highlight](https://read.readwise.io/read/01gyvqvsms1r8zyamgp7nb0jn1))
- There are 3 main factors when considering prompting vs. finetuning: data availability, performance, and cost. ([View Highlight](https://read.readwise.io/read/01gyvqwbwvvvtpjn3v1tsvw9wz))
- f you have only a few examples, prompting is quick and easy to get started. **There’s a limit to how many examples you can include in your prompt due to the maximum input token length.** ([View Highlight](https://read.readwise.io/read/01gyvqwes8m3jv7xxvzzb0grcg))
- . In my experience, however, you can expect a noticeable change in your model performance if you finetune on 100s examples. However, the result might not be much better than prompting. ([View Highlight](https://read.readwise.io/read/01gyvqwqsx9xez5gr72htyrh5e))
- The general trend is that **as you increase the number of examples, finetuning will give better model performance than prompting**. ([View Highlight](https://read.readwise.io/read/01gyvqx95qx0zttke2g8wkd4j1))
- • You can get better model performance: can use more examples, examples becoming part of the model’s internal knowledge.
  • You can reduce the cost of prediction. The more instruction you can bake into your model, the less instruction you have to put into your prompt. ([View Highlight](https://read.readwise.io/read/01gyvqxktgcshyys6brkrh2hp6))
- tarting with a prompt, instead of changing this prompt, you programmatically change the embedding of this prompt. For prompt tuning to work, you need to be able to input prompts’ embeddings into your LLM model and generate tokens from these embeddings, which currently, can only be done with open-source LLMs and not in OpenAI API. On T5, prompt tuning appears to perform much better than prompt engineering and can catch up with model tuning ([View Highlight](https://read.readwise.io/read/01gyvqy9cdhpj3rzgrgve95vea))
- finetune a smaller open-source language model (LLaMA-7B, the 7 billion parameter version of LLaMA) on examples generated by a larger language model (*text-davinci-003* – 175 billion parameters). This technique of training a small model to imitate the behavior of a larger model is called distillation ([View Highlight](https://read.readwise.io/read/01gyvqz7kjzwsyzdrvnztxmvvr))
- For finetuning, they used 52k instructions, which they inputted into *text-davinci-003* to obtain outputs, which are then used to finetune LLaMa-7B. This costs under $500 to generate. The training process for finetuning costs under $100. ([View Highlight](https://read.readwise.io/read/01gyvqzkpra8bj58mpeqzt633r))
- One direction that I find very promising is to use LLMs to generate embeddings and then build your ML applications on top of these embeddings, e.g. for search and recsys. ([View Highlight](https://read.readwise.io/read/01gyvr05cm6r425rt8kxntbxvm))
- The main cost of embedding models for real-time use cases is loading these embeddings into a vector database for low-latency retrieval. However, you’ll have this cost regardless of which embeddings you use. ([View Highlight](https://read.readwise.io/read/01gyvr33ekvjn90ej7t49m3wva))
- **2023 is the year of vector databases**. ([View Highlight](https://read.readwise.io/read/01gyvr34zwze5e5rtepnn3bjn9))
- One observation with [SituatedQA](https://situatedqa.github.io/) dataset for questions grounded in different dates is that despite LM (pretraining cutoff is year 2020) has access to latest information via Google Search, its performance on post-2020 questions are still a lot worse than on pre-2020 questions. This suggests the existence of some discrepencies or conflicting parametric between contextual information and model internal knowledge. ([View Highlight](https://read.readwise.io/read/01gyvrf52a9r372rjhppy6va8n))
- , with prompt engineering, if you want to use a newer model, there’s no way to guarantee that all your prompts will still work as intended with the newer model, so you’ll likely have to rewrite your prompts again. **If you expect the models you use to change at all, it’s important to unit-test all your prompts using evaluation examples.** ([View Highlight](https://read.readwise.io/read/01gyvrfhdbppat9epb81aje8qj))
- Newer models might, overall, be better, but there will be use cases for which newer models are worse. ([View Highlight](https://read.readwise.io/read/01gyvrfy01cgte8hh1k0295jwe))
- Experiments with prompts are fast and cheap, as we discussed in the section **Cost**. While I agree with this argument, a big challenge I see in MLOps today is that there’s a lack of centralized knowledge for model logic, feature logic, prompts, etc. ([View Highlight](https://read.readwise.io/read/01gyvrg7v527f4t5tfy9kz9p4h))
- The word agent is being thrown around a lot to refer to an application that can execute multiple tasks according to a given **control flow** (see Control flows section). A task can leverage one or more **tools**. ([View Highlight](https://read.readwise.io/read/01gyvrjj3y5k8ncm2hgw6tqjxe))
- In the example above, sequential is an example of a control flow in which one task is executed after another. ([View Highlight](https://read.readwise.io/read/01gyvrk55sbsvdhn3b1nykxwfs))
- ![LLM Engineering: control flows](https://huyenchip.com/assets/pics/llmops/8_control_flows.png) ([View Highlight](https://read.readwise.io/read/01gyvrmfe90rkwfnb76fxfxyer))
- In traditional software engineering, conditions for control flows are exact. With LLM applications (also known as agents), conditions might also be determined by prompting. ([View Highlight](https://read.readwise.io/read/01gyvrmv6c6dkbx682vdhej9ck))
- For agents to be reliable, we’d need to be able to build and test each task separately before combining them. There are two major types of failure modes:
  1. One or more tasks fail. Potential causes:
  1. Control flow is wrong: a non-optional action is chosen
  2. One or more tasks produce incorrect results
  2. All tasks produce correct results but the overall solution is incorrect. Press et al. (2022) call this “[composability gap](https://ofir.io/self-ask.pdf)”: the fraction of compositional questions that the model answers incorrectly out of all the compositional questions for which the model answers the sub-questions correctly. ([View Highlight](https://read.readwise.io/read/01gyvrnd7geqwwmqtnd05y167f))
- This is hands down the most popular consumer use case. There are AI assistants built for different tasks for different groups of users ([View Highlight](https://read.readwise.io/read/01gyvrs1h31qpn8v0kqpfe5240))
- Chatbots are similar to AI assistants in terms of APIs. If AI assistants’ goal is to fulfill tasks given by users, whereas chatbots’ goal is to be more of a companion ([View Highlight](https://read.readwise.io/read/01gyvrsqh65fwgdmsvh8cg156y))
- The most interesting company in the consuming-chatbot space is probably Character.ai. It’s a platform for people to create and share chatbots. The most popular types of chatbots on the platform, as writing, are anime and game characters, but you can also talk to a psychologist, a pair programming partner, or a language practice partner. ([View Highlight](https://read.readwise.io/read/01gyvrvmee0es94c3hk22942ng))
- how to incorporate ChatGPT to help students learn even faster. All EdTech companies I know are going full-speed on ChatGPT exploration. ([View Highlight](https://read.readwise.io/read/01gyvrw7n9qp9nbpxb4c0gcew0))
- Many, many startups are building tools to let enterprise users query their internal data and policies in natural languages or in the Q&A fashion. Some focus on verticals such as legal contracts, resumes, financial data, or customer support. Given a company’s all documentations, policies, and FAQs, you can build a chatbot that can respond your customer support requests. ([View Highlight](https://read.readwise.io/read/01gyvrwy5j9attngghrp2s39y1))
- • Organize your internal data into a database (SQL database, graph database, embedding/vector database, or just text database)
  • Given an input in natural language, convert it into the query language of the internal database. For example, if it’s a SQL or graph database, this process can return a SQL query. If it’s embedding database, it’s might be an ANN (approximate nearest neighbor) retrieval query. If it’s just purely text, this process can extract a search query.
  • Execute the query in the database to obtain the query result.
  • Translate this query result into natural language. ([View Highlight](https://read.readwise.io/read/01gyvrxaqc8gw747txafzdav2x))
- But what if searching for “things you need for camping in oregon in november” on Amazon actually returns you a list of things you need for your camping trip?
  It’s possible today with LLMs. For example, the application can be broken into the following steps:
  1. Task 1: convert the user query into a list of product names [LLM]
  2. Task 2: for each product name in the list, retrieve relevant products from your product catalog. ([View Highlight](https://read.readwise.io/read/01gyvsc4dv0z3m0269q084124m))
- If this works, I wonder if we’ll have LLM SEO: techniques to get your products recommended by LLMs. ([View Highlight](https://read.readwise.io/read/01gyvscfj2tjmqmb1wa3xz7y8x))
- many prompt engineering papers remind me of the early days of deep learning when there were thousands of papers describing different ways to initialize weights ([View Highlight](https://read.readwise.io/read/01gyvsd50bkdpbhm00wkqw1c53))
- Given that LLMs seem to be pretty good at writing prompts for themselves – see [Large Language Models Are Human-Level Prompt Engineers](https://arxiv.org/abs/2211.01910) (Zhou et al., 2022) – who knows that we’ll need humans to tune prompts? ([View Highlight](https://read.readwise.io/read/01gyvsdg7s5gjcfwrbx1hc47xv))
