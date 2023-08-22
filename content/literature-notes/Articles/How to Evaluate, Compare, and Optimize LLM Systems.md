---
author: [[W&B]]
title: "How to Evaluate, Compare, and Optimize LLM Systems"
tags: 
- articles
- literature-note
---
# How to Evaluate, Compare, and Optimize LLM Systems

![rw-book-cover](https://wandb.ai/logo.png)

## Metadata
- Author: [[W&B]]
- Full Title: How to Evaluate, Compare, and Optimize LLM Systems
- Category: #articles
- URL: https://wandb.ai/ayush-thakur/llm-eval-sweep/reports/How-to-Evaluate-Compare-and-Optimize-LLM-Systems--Vmlldzo0NzgyMTQz

## Highlights
- • We might have to fine-tune the LLM on our "private" dataset for our particular use case. In this case, evaluation is usually straightforward - we have a ground truth dataset against which we evaluate our fine-tuned model, mostly using standard metrics. However, fine-tuning should not be the first thing we should consider, given it's expensive and takes time. To continue our example above, our medical system might be fine-tuned on patient data or medical research not available to out-of-the-box LLM architects.
  • LLMs are powerful, but with well-thought pre/post-engineering, we can build LLM-based systems that, in many cases, might perform well enough. Building such a system has gotten easier thanks to the tools like Langchain, LlamaIndex, and others. However, it is still tricky to find the right components (more on this later) and to evaluate the system properly. ([View Highlight](https://read.readwise.io/read/01h55ap2z3drts4qpwqnfabtct))
- The best and most reliable way to evaluate an LLM system is to create an evaluation dataset for each component of the LLM-based system. The biggest downside of this approach is the cost to create such a dataset and the time it will take to make one. Depending on the LLM-based system, the design of the evaluation dataset can be challenging. ([View Highlight](https://read.readwise.io/read/01h55aqt7vynyf9fx2evyfnrdm))
- The idea of building an LLM-based system is to bring private data to the LLM without actually fine-tuning it. Ideally, we'd want to evaluate the system on our private data, a.k.a. our "domain." ([View Highlight](https://read.readwise.io/read/01h55ar5cvzd4dmcdmnfe2xzrr))
- . GPT4 is great, but you need to prompt it correctly. Prompt template 3 yielded ~90% accuracy, while prompt template 1 yielded 60-70%. That's more than a 20% improvement in the system performance. In our case here, being more instructive to the LLM produced better outcomes. ([View Highlight](https://read.readwise.io/read/01h55avvtjgmxd77p2537arygb))
- f one can spend time/money to build an evaluation dataset, it will give the most confidence when deploying LLM-based systems evaluated on such a dataset. This is the most methodologically sound way of evaluating your LLM-based system. ([View Highlight](https://read.readwise.io/read/01h55awpfn3eept1qs1tm864kt))
- LLMs are versatile and show interesting characteristics. They are particularly good at extracting information from the provided text and they're only getting better. This has led to the evolving practice of using LLMs to evaluate LLMs. The core idea is to use an LLM to generate test cases and then evaluate the LLM-based system on them. ([View Highlight](https://read.readwise.io/read/01h55ax3qzzkbanzah4n3czrc5))
- Our LLM-based system will be a Retrieval Augmented QA bot in this section. Such a system has a few components: an embedding model, a retrieval system, and an LLM-powered QA chain. ([View Highlight](https://read.readwise.io/read/01h55axdgx1jmqsm2bxb3fdx3t))
- We need pairs of questions and answers in our evaluation set to actually evaluate a QA bot. Since our bot uses an information retrieval (IR) system, we must also consider evaluating it (more on it later). ([View Highlight](https://read.readwise.io/read/01h55azygrpa6xwa3e5yeaj7kr))
- n hire human annotators to create gold standard pairs of questions and answers manually. This is a great method overall but it is costly and time-consuming. After all, building an evaluation set for a QA bot over medical data needs trained people. For many such niche use cases—ones where simple crowd sourcing doesn't work well and you're far better off with experts—it's hard to find the right talent, leading to higher costs, making it infeasible for individuals and small businesses. One feasible way of creating such a dataset is to leverage an LLM. This approach has obvious benefits and limitations:
  • It's scalable. We can generate a vast number of test cases on demand.
  • It's flexible. The test cases can be generated for special edge cases and adapted to multiple domains, ensuring relevance and applicability.
  • It's cheap and fast. LLMs can quickly collate information from multiple documents at a far lower price.
  As for limitations, we covered the biggest above: use cases where you need expert labelers are the sorts of use cases you most often want them (i.e. in the medical domain). ([View Highlight](https://read.readwise.io/read/01h55b0w7d87ehhrzts0nttx1k))
- Now that we have an eval set of QA pairs, we can let our LLM-based QA bot generate predictions for the questions. We can then use a metric to evaluate the predicted and "true" answers. ([View Highlight](https://read.readwise.io/read/01h55b3dm2y2q05erz3n7r6e3q))
- Given a predicted and a "true" answer, we can literally use an LLM to find how well the prediction is compared to the true answer! Continuing: LLMs are powerful because they now have a good understanding of the semantics of the text. Given two texts (true and predicted answers), an LLM can, in theory, find whether they are semantically identical. If identical, we can give that prediction a "CORRECT" label; otherwise, an "INCORRECT" label. ([View Highlight](https://read.readwise.io/read/01h55b3qcdfmv33j6ewmhwnk7e))
- As an NLP task, question-answering has rich literature with few dominant metrics. Two dominant metrics used in various QA benchmarking datasets, including [SQuAD](https://rajpurkar.github.io/SQuAD-explorer/), are:
  • Exact Match: For each question-answer pair, if the tokens of the model's prediction exactly match the tokens of the true answer, exact_match is 100; otherwise, exact_match is 0. One can imagine that each token matching is a rare occurrence for a stochastic system. This metric should be taken with a grain of salt for our use case.
  • F1 Score: This is a well-known metric that cares equally about the precision and recall of the system. Precision is the ratio of shared tokens to the total number of tokens in the prediction. Recall is the ratio of shared tokens to the total number of tokens in the ground truth.
  We can use [HuggingFace's Evaluate](https://github.com/huggingface/evaluate) library to load the squad metric and compute the exact_match and f1. For the same evaluation job above, check out the exact_match and the f1 scores on a per-sample basis below. ([View Highlight](https://read.readwise.io/read/01h55b575xbdgwkm0mytk3wm3w))
- The TFIDFRetriever works surprisingly well compared to embedding-based Chroma and FAISS. The TFIDFRetriever doesn't use any embedding model; thus, using this retriever can cut costs without reducing performance. ([View Highlight](https://read.readwise.io/read/01h55b7wwy62eyp455z7vgbgs8))
- gpt-3.5-turbo seems to be performing better than gpt4 in general. Is it because the eval set was generated using gpt-3.5-turbo? This begs further investigation into the evaluation strategy but also shows how powerful gpt-4 is. ([View Highlight](https://read.readwise.io/read/01h55b8715snrqavw4ksn3d8pc))
- one can think of ways to improve the evaluation strategy.
  • Maybe use a better metric than the F1 score. Maybe using some semantic similarity metric like the one proposed in "[Semantic Answer Similarity for Evaluating Question Answering Models](https://arxiv.org/abs/2108.06130)" (arXiv:2108.06130).
  • Since gpt-3.5-turbo is performing better on average, it would be good to update the evaluation set to include the following:
  • More QA pairs generated using Cohere family of models (command and command-light).
  • QA pairs generated using all the LLMs that are further scrutinized. ([View Highlight](https://read.readwise.io/read/01h55b94h23frxvqbh302rzx7w))
- Information retrieval (IR) is a crucial step in a QA pipeline. The evaluation strategy suggested above evaluates the pipeline as a whole. We need ways to evaluate individual systems.
  While generating pairs of questions and answers using chunks of the documents, the chunks (source truth) should be saved alongside the pairs. The IR system will select the top k chunks for a given question during evaluation. A score for that retriever will be determined if the source truth is in the selected chunk. The score will also depend on the source truth's rank in the selected chunks. ([View Highlight](https://read.readwise.io/read/01h55b9kf20g13khjn1m4axdzx))
