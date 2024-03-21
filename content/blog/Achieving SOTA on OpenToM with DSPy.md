---
title: Achieving SOTA on OpenToM with DSPy
date: 03.21.24
tags:
  - "#ml"
  - blog
  - research
---
![[robot_cafe.png]]

## TL;DR

We used [DSPy](https://dspy-docs.vercel.app/) to achieve SOTA results on the [OpenToM](https://github.com/seacowx/OpenToM) benchmark using `gpt-3.5-turbo`. The benchmark's creators suggest language models fall short when modeling mental states and psychology, but we find using DSPy to learn few-shot examples leads to significantly outperforming all the models tested (`gpt-4-turbo` included) along this precise axis. 

The fact you can learn few-shot examples to make a small, fast model perform just as well on a task as a large, slow one is significant. This signals to us a need to broaden the scope of methods for evaluating Theory of Mind capabilities in LLMs, because the social cognition needed to [[Humans like personalization |build great products]] goes far beyond just answering questions about stories.

## The OpenToM Dataset

On February 14th, 2024 a paper dropped on ArXiv introducing the OpenToM benchmark: a new dataset to use for evaluating Theory of Mind (ToM) in Large Language Models. ToM evals are typically borrowed from developmental psychology and consist of character-driven scenarios. The language model is asked to answer questions about various aspects of the characters' mental states. This ability has traditionally been thought of to be uniquely human (or limited to a very few species), but language models are starting to exhibit some level of proficiency in this task as well.

The authors of this paper point out how the characters in existing datasets lack personality traits or preferences, along with motivations for their actions. To remedy this, they devised a generation pipeline that does the following:

1. Endows characters with preferences and personality traits
2. Generates intentions and the corresponding actions
3. Uses an LLM to produce the narratives/stories
4. Revises and refines those stories using human annotators

The questions in the dataset seek to cover characters' mental states of both the physical world (e.g., the location of an object) and their psychological states (e.g., character's attitude towards a particular action). They test some of the most popular LLMs on these questions and find that they perform well on the questions that ask about the physical world but "fall short" when asked about characters' mental states.

There are three different "genres" of questions with different levels of "granularity". 

- **Attitude**: questions about the characters' attitude

- **Location**: questions regarding the location of an entity

- **MultiHop**: questions composed by adding an additional reasoning hop on top of the Location questions

Within Location there are *coarse* and *fine* questions and within both Location and MultiHop there are *first order* and *second order* questions.

- **Coarse**: asks about the characters' perception of whether an entity is at its initial location  
- **Fine**: inquires about the entity's explicit location  
- **First Order**: directly asks about a character's perception of the world  
- **Second Order**: inquires about a character's belief of another character's mental state  

In the ToM space, there is really only one prompting technique that has shown improved results over Chain of Thought (CoT) called "SimToM" [(Wilf, et al)](https://arxiv.org/pdf/2311.10227.pdf), which is a two-stage prompting framework to re-phrase the narrative through the perspective of the subject in question. CoT and SimToM are the only two tested against the dataset in the paper.

## Experiments with DSPy

What makes the DSPy package interesting is the ability to abstract away the underlying prompts and examples if the task and metric are well defined. Anecdotally, we believe that LLMs are [[Theory of Mind Is All You Need|quite good]] at the psychological modeling the OpenToM authors suggest they "fall short" on. So we asked ourselves, "what if we could [[User State is State of the Art#^461ac9 |learn]] the prompts and examples to optimize performance on this benchmark?" 

This task is relatively easy to define in DSPy terms: `(context, question -> answer)`. This [guide](https://dspy-docs.vercel.app/docs/tutorials/simplified-baleen#optimizing-the-pipeline) was helpful in crafting our modules which can be found [here](https://github.com/plastic-labs/dspy-opentom/blob/main/cot.py). The authors of the OpenToM paper also released extensive [evaluation code](https://github.com/plastic-labs/dspy-opentom/blob/main/opentom_evaluator.py) which we leveraged heavily for parsing the LM's answers and assessing them.

We conducted the following experiments:

1. Learn few-shot examples with the `BootstrapFewShotWithRandomSearch` optimizer and `gpt-3.5-turbo` with CoT prompting
2. Do the same but use `gpt-4-turbo` as the "teacher" LM to learn the examples
3. Learn system prompts with the `SignatureOptimizer` and the `BayesianSignatureOptimizer`

Obviously there is much more we could have done, so if you're reading this and you have the time (and inferencing budget) to run more comprehensive experiments, [get in touch](https://discord.gg/plasticlabs) — we'd love to help!

## Results

The findings of our experiments were mixed but promising. We found that the only experiment that showed positive results was compiling a CoT-prompted `gpt-3.5-turbo` module with the `BootstrapFewShotWithRandomSearch` optimizer. Both of the signature optimizers and `gpt-4` as a teacher in  `BootstrapFewShotWithRandomSearch` didn't have much of an effect.  

Our full experiment amounted to roughly $300 in inference costs, running 50 training examples on 25 candidate programs. We evaluated performance the same way the paper did, by randomly sampling 50 examples from a hold out set in 5 batches and computing average F1 scores. You can view our forum discussion in the DSPy Discord [here](https://discord.com/channels/1161519468141355160/1214629969318252574).

The following table shows our results from experiment number one compared to the paper's CoT-prompted results (found in Table 3 in the [paper](https://arxiv.org/pdf/2402.06044.pdf)):

| question  | mixtral | gpt-3.5-turbo | gpt-4-turbo | ***compiled-BFSWRS-3.5-turbo*** |
| --------- | ------- | ------------- | ----------- | ------------------------------- |
| Loc$_{c}(F)$ | 0.784   | 0.587         | **0.942**   | 0.89                            |
| Loc$_{c}(S)$ | 0.539   | 0.457         | **0.828**   | 0.791                           |
| Loc$_{f}(F)$ | 0.301   | **0.469**     | 0.45        | 0.303                           |
| Loc$_{f}(S)$ | 0.18    | 0.24          | 0.187       | **0.476**                       |
| MHop$(F)$   | 0.61    | 0.547         | **0.835**   | 0.64                            |
| MHop$(S)$   | 0.551   | 0.414         | **0.755**   | 0.429                           |
| Att     | 0.519   | 0.446         | **0.58**    | 0.558                           |

On most of the question types, we see CoT-prompted `gpt-3.5-turbo` compiled with `BootstrapFewShotWithRandomSearch` examples outperforms both CoT-prompted base `gpt-3.5-turbo` as well as `mixtral`, and comes close to `gpt-4-turbo` performance — which is quite impressive! The exceptions here are fine, second-order location questions (which outperform `gpt-4-turbo` 🥳) and fine, first-order location questions (which underperform `gpt-4-turbo`). Due to budget constraints, we only tested `gpt-3.5-turbo`.

What's particularly interesting is the performance on the fine, second-order location questions (Loc$_{f}(S)$). As a reminder, second-order questions inquire about a character's belief of another character's mental state. This is the exact type of question the OpenToM authors claim that LMs perform poorly on, yet we saw that with our learned few-shot examples, it outperforms all of the other language models significantly.

## Analysis of Augmented Examples

The augmented examples from the compiled modules seem to mimic the format of the stories within each question type/granularity. You can see all of them on [GitHub](https://github.com/vintrocode/dspy-opentom/blob/main/cot_modules.pkl), but here are two examples:

**Attitude**:

> "Paxton and Anderson were two individuals with contrasting preferences when it came to socks. Paxton despised them, finding no use or appeal in these fabric foot coverings, while Anderson, on the other hand, had a deep affection for them. It was a peculiar disagreement that seemed to set them apart.\n\nOne day, destiny led them both into a confined space - the closet. Paxton entered first, followed closely by Anderson. As they looked around, their eyes landed upon a box placed on one of the shelves. To their surprise, the box contained an assortment of colorful socks. A display that delighted Anderson, but only fueled Paxton's annoyance further.\n\nAfter a brief moment, Anderson decided to leave the closet, unaware of Paxton's ulterior motive. Paxton, being a negativistic person, was determined to eradicate the presence of socks from Anderson's life. Seizing the opportunity, Paxton swiftly moved the socks from the box to the nearby trash can. The act was done discreetly, ensuring Anderson did not witness this secretive disposal.\n\nAnd just like that, the story came to an abrupt end. The socks lay in the trash can, while Anderson remained oblivious to Paxton's actions. The tale of clashing opinions had taken an unexpected turn, leaving a trail of unanswered questions about the fate of the socks and the impact it would have on their peculiar relationship."

**MultiHop**:

> "Connor and Ryker were two best friends who shared a common liking for raincoats. They loved the feeling of wrapping themselves up in the cozy, waterproof fabric whenever it rained. One day, as Connor entered the sunroom, he noticed that the raincoat they usually shared was neatly placed in a bucket. To his surprise, Ryker was already in the sunroom, his eyes fixed on the raincoat.\n\nConnor, being a considerate person, realized that they both liked the raincoat and should make sure they didn't forget it on rainy days. With that thought in mind, he quietly moved the raincoat from the bucket to the front door hook. This way, it would serve as a reminder for both of them to grab it before leaving the house. Ryker stood there, silently observing Connor's actions, his curiosity piqued.\n\nAnd that was the end of the story. The simple act of moving the raincoat held a deeper meaning between Connor and Ryker. It was a display of their shared understanding and consideration for one another. From that day forward, whenever they saw the raincoat hanging by the front door, they would remember the unspoken bond they shared, and it would bring a smile to their faces."

It's hard to parse out any specific patterns between the examples themselves. It's also not entirely clear how or why these examples improve performance on their respective tasks. This is one hell of a cliffhanger:

> Ryker stood there, silently observing Connor's actions, his curiosity piqued.\n\nAnd that was the end of the story.

That's it? What was it about Ryker's affinity for raincoats that piqued his curiosity when it was hung up? Why would the story end there? The same thing basically happened in the first story, with Paxton throwing away the socks and Anderson never knowing about it. 

In manually inspecting both the dataset and the augmented examples, it's clear that GPT-4 (the model used to generate the narratives) had a tendency to dramatize things. But it's still unclear as to why these examples (along with 16 others) were useful in increasing task performance. To borrow a quote from [Battle and Gollapudi](https://arxiv.org/pdf/2402.10949.pdf), "the only real trend may be no trend". Maybe counterintuitively, this is still an important result.

## Towards Better Theory of Mind Evals

The OpenToM authors were correct in identifying common pitfalls with existing ToM tests and their contributions with the dataset are a significant step forward. However, we still believe these tests are fundamentally flawed in an AI context. 

We know that any observed "reasoning" in language models is due to behaviors learned in training. These tests are assessing their abilities to answer correctly in a single inference, which is both impressive and completely unrealistic. Real AI products already have access to memory, tools, multiple inferences, and more. They're going to be interacting with humans in more and more social settings, not trying to answer questions about hypothetical stories. Humans and agents are much more complex than that.

There was a time when people were upset at the inability to interpret features learned by neural networks. People have mostly moved on from that limitation in favor of the improved performance, so maybe it's time to do the same here. It follows the design philosophy of DSPy to abstract away the need to manipulate explicit prompts and examples to improve performance on a task. The examples it settled on were learned — DSPy worked exactly how it's supposed to. Deep learning uses neurons in a network to learn latent, arbitrary features optimized against an objective. The abstraction has just moved up a layer to the space of prompts that can be used to optimize against an objective.

Thus, the ability to achieve near `gpt-4-turbo` performance (and sometimes exceed it) with a "less powerful" language model that just learns the right examples to seed its generations is incredibly significant. If it can be done in these narrow tasks, it follows that there exists a vast space of other tasks this can be done for. Humans have nearly [[User State is State of the Art |infinite "states"]] to make ToM predictions about, so we're going to have to be able to do this repeatedly in order to effectively learn and update our models over time.

Major thanks go to [Jacob Van Meter](https://www.linkedin.com/in/jacob-van-meter-nc/) for his significant contributions to this project, [Omar Khattab](https://twitter.com/lateinteraction) and the [DSPy](https://dspy-docs.vercel.app/) team, as well as the [OpenToM](https://github.com/seacowx/OpenToM) authors for moving the ToM space forward. You can see all of our code and data [here](https://github.com/plastic-labs/dspy-opentom/tree/main). 

This is just the beginning of our exploration into these topics. To stay up to date, sign up to receive our [release notes](https://plasticlabs.typeform.com/honchoupdates?typeform-source=blog.plasticlabs.ai). Or if you already know you're going to want ToM insights to personalize your AI application, join the waitlist for our [private beta](https://plasticlabs.typeform.com/honchobeta?typeform-source=honcho.dev).