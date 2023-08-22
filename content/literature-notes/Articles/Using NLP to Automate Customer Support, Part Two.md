---
author: [[FloydHub Blog]]
title: "Using NLP to Automate Customer Support, Part Two"
tags: 
- articles
- literature-note
---
# Using NLP to Automate Customer Support, Part Two

![rw-book-cover](https://images.unsplash.com/photo-1525422847952-7f91db09a364?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

## Metadata
- Author: [[FloydHub Blog]]
- Full Title: Using NLP to Automate Customer Support, Part Two
- Category: #articles
- URL: https://blog.floydhub.com/automate-customer-support-part-two/

## Highlights
- **Universal Sentence Embeddings (USE)** promise to address all of the issues of word embeddings by capturing the semantic meaning of a sentence and identifying order. They're considered "universal" because they promise to encode general properties of sentences due to being trained on very large datasets. In theory, they can then be applied to any downstream NLP task without requiring domain specific knowledge. ([View Highlight](https://read.readwise.io/read/01gtc1xcthx1thb0xba3ryhh4b))
- Queries such as `How can I change my password`, `how can I setup an account`, or `Where do I setup my email` may represent common issues customers encounter and enquire about. There is no need for someone to come up with a new response here, there is probably documentation and a clear series of steps to take to resolve these issues. Instead of your customer support agent spending time looking for a previous similar query, or creating a new response, you would like them to be able to quickly retrieve the responses that were already provided. ([View Highlight](https://read.readwise.io/read/01gtc239fv82v52cyzwd771qsh))
- Sentence embeddings are interesting since they offer a number of ways in which you could potential use them in your business. They are versatile in how they can be deployed. For example, you could build a neural network to identify question and answer pairing. This is similar to the Amazon example we [mentioned earlier](https://arxiv.org/pdf/1703.09439.pdf) where questions and answers are encoded and the network learns, via a supervised approach, to match correct pairings. It can then automatically identify an answer for a new incoming query. ([View Highlight](https://read.readwise.io/read/01gtc23zz556sj4bd2my6f33rb))
- In this way, you use the embeddings to identify the best match between the new query and your saved  queries. The saved queries are linked to a known answer. **Your recommender would be a question-to-question recommender as opposed to a question-to-answer system.** ([View Highlight](https://read.readwise.io/read/01gtc24qthds5y5zb4pm59yy4n))
