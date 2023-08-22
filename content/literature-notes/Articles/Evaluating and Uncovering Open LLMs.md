---
author: [[Nathan Lambert]]
title: "Evaluating and Uncovering Open LLMs"
tags: 
- articles
- literature-note
---
# Evaluating and Uncovering Open LLMs

![rw-book-cover](https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F760d54a4-e21f-4f6c-94b3-4fdc1dbe7ebf_1024x1024.png)

## Metadata
- Author: [[Nathan Lambert]]
- Full Title: Evaluating and Uncovering Open LLMs
- Category: #articles
- URL: https://www.interconnects.ai/p/evaluating-open-llms?utm_source=post-email-title&publication_id=48206&post_id=124670054&isFreemail=true&utm_medium=email

## Highlights
- The hypothesis I put the most weight in is that **open source wins by offering a smaller, better model for each use-case/area**. The giant models are the best horizontal project, but there are very few technology solutions where you need your model to be able to solve many tasks *and they are inherently in lower margin applications* like chat. ([View Highlight](https://read.readwise.io/read/01h1sk6b6fj4hvv5y83awknxd2))
- you'll want a model to cover at max two or three tasks above (some tasks will synergize well). To do so, it will likely be a model fine-tuned on a curated dataset of examples, nothing crazy. I'm sure people have started doing this. ([View Highlight](https://read.readwise.io/read/01h1sk7prmex1m6578tvxm82d6))
- Model tracking and searching are very likely to grow out of the environment where people realize there are models out there that likely can do their task very well, but they don't have a method to find it. The model you're looking for is probably on HuggingFace, but it will have no model card describing its training process or capabilities. ([View Highlight](https://read.readwise.io/read/01h1sk8xmv6maq145j8f2hp2wx))
- The Open LLM Leaderboard largely serves as the leaderboard for base model performance / simple instruction following performance ([View Highlight](https://read.readwise.io/read/01h1sk9yw85pynzpj6kse1hbee))
- the leaderboard will also add human and GPT4 ratings across a secret validation set of tasks ([View Highlight](https://read.readwise.io/read/01h1skad9t07n830he2e9ckh90))
- Getting a set of crowd-workers to label responses in the style that you want is extremely hard (take a look at the thoroughness of [InstructGPT's training document](https://docs.google.com/document/d/1MJCqDNjzD04UbcnVZ-LmeXJ04-TKEICDAepXyMCBUb8/edit)), so relying on the results of doing this should come with contextualization. ([View Highlight](https://read.readwise.io/read/01h1skb5sqs925mp7szs9y7ggz))
- A very common line in the announcement of new open-source models replicating ChatGPT is that *our model beats ChatGPT in binary comparisons N% of the time* ([View Highlight](https://read.readwise.io/read/01h1skfbdex0y5hm9tbz12aqs8))
- It's all deeply related to the idea that you cannot easily imitate proprietary LLMs because you only have access to inference data and not the human preference or raw red-teaming data needed to fully extract information from the mode ([View Highlight](https://read.readwise.io/read/01h1skg93zv1z9rr4tq8fqa9nv))
