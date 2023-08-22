
---
title:  "Langchain Document QA Webinar"
Date: 2023-03-30
tags: 
- literature-note 
---

```

```

***
**Author**: Harrison Chase
**Source**: [LangChain Document Question-Answering Webinar - crowdcast](https://www.crowdcast.io/c/rh66hcwivly0)
**Tags**: 
***


[Andrew White (@andrewwhite01) / Twitter](https://twitter.com/andrewwhite01)

Yasser


Andrew White [paper-qa/docs.py at main · whitead/paper-qa · GitHub](https://github.com/whitead/paper-qa/blob/main/paperqa/docs.py) He presents an interesting approximation to review literature. Instead of regularly chunking the texts to create the context with top k relevant documents, he summarise the papers first. They do the summarisation based on the context.

Question > goes to vector store > retrieves relevant chunks > for each chunk it says, we want to answer the question X, check if the chunk is relevant, if no say it is not relevant, if relevant turn into a 75 words summary of evidence > build answer

Yasser, [Chatbase | Train ChatGPT on your data and add it to your website](https://www.chatbase.co/)

You want to build your context smartly. You don't want your context to be poisoned. Besides semantic search, they use max marginal relevance search, they also talk about tree based search. They also talk about semantic search + keyword search. 

[Caleb Jackson](https://twitter.com/CalebPeffer) talks about [Mendable](https://www.mendable.ai/)
It avoids allucinations by asking the chat not to engage in a conversation if has not found any relevant information. It allows vector search + keyword. 
Vector search pulls lots of document, you need to set a high threshold (0.7). Setting the threshold difficult. They also combine it with keyword search. The hardest is to pull an evaluation set. 