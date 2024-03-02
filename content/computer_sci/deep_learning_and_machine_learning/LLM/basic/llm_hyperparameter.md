---
title: LLM hyperparameter
tags:
- hyperparameter
- LLM
- deep-learning
- basic
date: 2024-01-17
---

# LLM Temperature

Temperature definition come from the physical meaning of temperature. The more higher temperature, the atoms moving more faster, meaning more randomness.

![](computer_sci/deep_learning_and_machine_learning/LLM/basic/attachments/physic_temp.gif)

LLM temperature is a hyperparameter that regulates **the randomness, or creativity.** 

* Higher the LLM temperature, more diverse and creative, increasing likelihood of straying from context.
* Lower the LLM temperature, more focused and deterministic, sticking closely to the most likely prediction

![](computer_sci/deep_learning_and_machine_learning/LLM/basic/attachments/Pasted%20image%2020230627160125.png)

## More detail

The LLM model is to give a probability of next word, like this:

![](computer_sci/deep_learning_and_machine_learning/LLM/basic/attachments/Pasted%20image%2020230627162848.png)

"A cat is chasing a …", there are lots of words can be filled in that blank. Different words have different probabilities, in the model, we output the next word ratings.

Sure, we can always pick the highest rating word, but that would result in very standard predictable boring sentences, and the model wouldn't be equivalent to human language, because we don't always use the most common word either. 

So, we want to design a mechanism that **allows all words with a decent rating to occur with a reasonable probability**, that's why we need temperature in LLM model. 

Like real physic world,  we can do samples to describe the distribution, *we use SoftMax to describe the distribution  of the probability of the next word*. The temperature is the element $T$ in the formula:

$$
p_i = \frac{\exp{(\frac{R_i}{T})}}{\sum_i \exp{(\frac{R_i}{T})}}
$$

![](computer_sci/deep_learning_and_machine_learning/LLM/basic/attachments/Pasted%20image%2020230627163514.png)

More lower the $T$, the higher rating word's probability will goes to 100%, and more higher the $T$, the probability will be more smoother for very words.

*The gif below is important and intuitive.*

![](computer_sci/deep_learning_and_machine_learning/LLM/basic/attachments/rating_probabililty.gif)

So, set different $T$, the next word's probability will be changed, we will output next word depending on the probability.

![](computer_sci/deep_learning_and_machine_learning/LLM/basic/attachments/Pasted%20image%2020230627165311.png)

# Reference

* [LLM Temperature, dedpchecks](https://deepchecks.com/glossary/llm-parameters/#:~:text=One%20intriguing%20parameter%20within%20LLMs,of%20straying%20from%20the%20context.)
* [⭐⭐⭐https://www.youtube.com/watch?v=YjVuJjmgclU](https://www.youtube.com/watch?v=YjVuJjmgclU)