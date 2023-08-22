---
author: [[Cameron R. Wolfe]]
title: "Chain of Thought Prompting for LLMs"
tags: 
- articles
- literature-note
---
# Chain of Thought Prompting for LLMs

![rw-book-cover](https://substack-post-media.s3.amazonaws.com/public/images/045c8b4e-c626-4974-86b8-a9a9d5820f7c_2546x1426.png)

## Metadata
- Author: [[Cameron R. Wolfe]]
- Full Title: Chain of Thought Prompting for LLMs
- Category: #articles
- URL: https://cameronrwolfe.substack.com/p/chain-of-thought-prompting-for-llms

## Highlights
- The success of large language models (LLMs) stems from our ability to pre-train (using a [language modeling objective](https://cameronrwolfe.substack.com/i/85568430/language-modeling)) [decoder-only transformer](https://twitter.com/cwolferesearch/status/1640446111348555776?s=20) models across massive textual corpora ([View Highlight](https://read.readwise.io/read/01gyt8rk0b4t11sr4gdfk6k0yv))
- Given that we pre-train sufficiently large models, LLMs are incredibly capable [few-shot learners](https://cameronrwolfe.substack.com/i/88082618/language-models-are-few-shot-learners). ([View Highlight](https://read.readwise.io/read/01gyt8rvqzfyzem4dhnm5hn3j2))
- reasoning) are notoriously difficult. Initial attempts to solve this issue explored fine-tuning LLMs and task-specific verification modules over a supervised dataset of solutions and explanations of various reasoning problems ([View Highlight](https://read.readwise.io/read/01gyt8skve0pt1qwmvzeyy5m6y))
- *The goal of this paper is to endow language models with the ability to generate a chain of thought—a coherent series of intermediate reasoning steps that lead to the final answer for a problem.”* - from [1] ([View Highlight](https://read.readwise.io/read/01gyt8srtqm7nka32gs713pvfh))
- chain-of-thought (CoT) prompting [1] is a recently-proposed technique that improves LLM performance on reasoning-based tasks via few-shot learning. Similar to standard prompting techniques, CoT prompting inserts several example solutions to reasoning problems into the LLM’s prompt. Then, each example is paired with a chain of thought, or a series of intermediate reasoning steps for solving the problem. The LLM then learns (in a few-shot manner) to generate similar chains of thought when solving reasoning problems. ([View Highlight](https://read.readwise.io/read/01gyt8tn1ktsm1z76tz3896vcm))
- LLMs within this section. Rather, we will focus upon developing a better understanding of prompting and few-shot learning for LLMs, as well as explore how such techniques may be leveraged to solve a core limitation of these models: *their inability to solve reasoning tasks.* ([View Highlight](https://read.readwise.io/read/01gyt8w10351fx0cqpw091d4y1))
- After the proposal of [GPT-3](https://cameronrwolfe.substack.com/i/88082618/language-models-are-few-shot-learners) [2], we saw that LLMs of sufficient scale can perform few-shot learning quite well ([View Highlight](https://read.readwise.io/read/01gyt8wve9ewcgfj1f40d92c8j))
- These task-solving “prompts” enable zero-shot (i.e., without seeing examples of correct output; see above) or few-shot ([View Highlight](https://read.readwise.io/read/01gyt8xb2b79yyc6xmb80b8pky))
- But, *sensitivity is a huge consideration in this developing field*. LLM performance may change massively given small perturbations to the input prompt (e.g., permuting few-shot exemplars decreases GPT-3 accuracy from 93.4% to 54.3% on [SST-2](https://huggingface.co/datasets/sst2) [13]). Thus, in our study of prompting approaches, we aim to find techniques that *i)* perform well and *ii)* are not subject to sensitivity. ([View Highlight](https://read.readwise.io/read/01gyt8y8e17gaqnn0jargkrz3p))
- LLM few-shot learning performance improves with scale, but large models are not all that we need. Powerful LLMs require a [combination](https://twitter.com/cwolferesearch/status/1603837192346165248?s=20) of large models with massive pre-training datasets [14]. ([View Highlight](https://read.readwise.io/read/01gyt8ymfd3mj6hsey9vh37a5a))
- we tend to see that using larger models and pre-training datasets does not improve LLM reasoning abilities ([View Highlight](https://read.readwise.io/read/01gyt8z3d5xt6cxbwwvtn5n7md))
- many researchers claim that LLMs are simply [regurgitating training data](https://twitter.com/cwolferesearch/status/1643388671456886788?s=20) rather than performing any complex reasoning or analysis. ([View Highlight](https://read.readwise.io/read/01gyt8zcvada764bs6hdxcnmy9))
- With these limitations in mind, it becomes clear that using a prompting-only approach (e.g., CoT prompting) to solving reasoning tasks would be much simpler ([View Highlight](https://read.readwise.io/read/01gyt90bwxy42rj2mmj9khq7hz))
- Instead of [fine-tuning](https://cameronrwolfe.substack.com/i/85568430/improving-language-understanding-by-generative-pre-training-gpt) an LLM to perform a task, we just “prompt” a generic model with a few examples of the correct output before generating a final answer. Such an approach is [incredibly successful](https://cameronrwolfe.substack.com/i/88082618/language-models-are-few-shot-learners) for a range of tasks. ([View Highlight](https://read.readwise.io/read/01gyt92j6cgvccj36ev1r621a0))
- *prompting only approach is important because it does not require a large training dataset and a single model can perform many tasks without loss of generality.”* - ([View Highlight](https://read.readwise.io/read/01gyt933hyjfchq3fm7p3jpvsq))
- Although this example is simple, the idea extends to a variety of mental reasoning tasks that we solve as humans. We generate a chain of thought (defined as “a coherent series of intermediate reasoning steps that lead to the final answer for a problem” ([View Highlight](https://read.readwise.io/read/01gyt9e9jrj16fd6bxgqb64b7k))
- Authors in [1] find that such a prompting approach leads LLMs to generate similar chains of thought when solving problems, which aids reasoning capabilities and has several notable benefits: ([View Highlight](https://read.readwise.io/read/01gyt9et35p5za9st90artx8yf))
- • *Interpretability*: the LLM’s generated chain of thought can be used to better understand the model’s final answer.
  • *Applicability*: CoT prompting can be used for any task that can be solved by humans via language.
  • *Prompting*: no training or fine-tuning is required of any LLMs. We can just insert a few CoT examples into the prompt! ([View Highlight](https://read.readwise.io/read/01gyt9f42khsbkdn39sf5arhm1))
- ![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F6487d8fa-0fe8-46d0-9a75-e441c912c9cc_1110x852.png) ([View Highlight](https://read.readwise.io/read/01gyt9ffnvhw4yehdk0rrnzbk7))
- ![](https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F303b4687-7860-4d71-864d-aec0b090c6f2_1846x1210.png) ([View Highlight](https://read.readwise.io/read/01gyt9fzmhgg38zrz8sz175t06))
- From these experiments, we discover a few notable properties of CoT prompting. First, CoT prompting seems to work much better for larger LLMs ([View Highlight](https://read.readwise.io/read/01gyt9gdhb5tqy8jv8hbhx5dd4))
- problems (e.g., GSM8K) see a greater benefit from CoT prompting. Compared to prior state-of-the-art methods (which perform task-specific fine-tuning), CoT prompting with GPT-3 and PaLM-540B achieves comparable or improved performance in all cases. ([View Highlight](https://read.readwise.io/read/01gyt9gtcxe40kw1pw08yw5z6r))
- **commonsense reasoning.** [Commonsense reasoning](https://huggingface.co/datasets/commonsense_qa) problems assume a grasp of general background knowledge and require reasoning over physical and human interactions ([View Highlight](https://read.readwise.io/read/01gyt9h9c49fb27vg7xrm0frdm))
- After the proposal of CoT prompting in [1], several variants were proposed that can improve the reasoning capabilities of LLMs ([View Highlight](https://read.readwise.io/read/01gyt9j2rjhw2142g5dhra3y2g))
- **prompt engineering.** As demonstrated by the examples above (and the idea of CoT prompting in general), curating a useful prompt for an LLM is an art ([View Highlight](https://read.readwise.io/read/01gyt9jt9met5ffns3d2jre0vf))
- , we have seen that standard prompting is not enough to get the most out of LLMs. Rather, it seems to provide a sort of “lower bound” for LLM performance, especially on more difficult, reasoning-based tasks. CoT prompting goes beyond standard prompting techniques by leveraging few-shot learning capabilities of LLMs to elicit the generation of coherent, multi-step reasoning processes while solving reasoning-based problems. ([View Highlight](https://read.readwise.io/read/01gyt9kfbffakcwycgmfb0t2x5))
