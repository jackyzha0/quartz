---
author: [[huggingface.co]]
title: "StackLlama: A Hands-on Guide to Train LlaMa With RLHF"
tags: 
- articles
- literature-note
---
# StackLlama: A Hands-on Guide to Train LlaMa With RLHF

![rw-book-cover](https://huggingface.co/blog/assets/138_stackllama/thumbnail.png)

## Metadata
- Author: [[huggingface.co]]
- Full Title: StackLlama: A Hands-on Guide to Train LlaMa With RLHF
- Category: #articles
- URL: https://huggingface.co/blog/stackllama

## Highlights
- Reinforcement Learning from Human Feedback (RLHF) to be better aligned with how we expect them to behave and would like to use them. ([View Highlight](https://read.readwise.io/read/01gy72ermqjjknbfskegxe24ac))
## New highlights added April 24, 2023 at 8:50 PM
- By combining these approaches, we are releasing the StackLlama model. The model is available on the [🤗 Hub](https://huggingface.co/trl-lib/llama-se-rl-peft) and [the entire training pipeline](https://huggingface.co/docs/trl/index) is available as part of the TRL library ([View Highlight](https://read.readwise.io/read/01gyt84nb87zkq2tfbgww5wgcy))
- When doing RLHF, it is important to start with a capable model: the RLHF step is only a fine-tuning step to align the model with how we want to interact with it and how we expect it to respond ([View Highlight](https://read.readwise.io/read/01gyt851xsnqs2xa5w2m4msajy))
- Gathering human feedback is a complex and expensive endeavor. In order to bootstrap the process for this example while still building a useful model, we make use of the [StackExchange dataset](https://huggingface.co/datasets/HuggingFaceH4/stack-exchange-preferences). The dataset includes questions and their corresponding answers from the StackExchange platform (including StackOverflow for code and many other topics). It is attractive for this use case because the answers come together with the number of upvotes and a label for the accepted answer ([View Highlight](https://read.readwise.io/read/01gyt85zykvrqyq8bsx99g9j3s))
- For the reward model, we will always need two answers per question to compare, as we’ll see later. Some questions have dozens of answers, leading to many possible pairs. We sample at most ten answer pairs per question to limit the number of data points per question ([View Highlight](https://read.readwise.io/read/01gyt8722yg1dbqcfkkp4vk4xe))
- Loading the model in 8bit reduces the memory footprint drastically since you only need one byte per parameter for the weights (e.g. 7B LlaMa is 7GB in memory). Instead of training the original weights directly, LoRA adds small adapter layers on top of some specific layers (usually the attention layers); thus, the number of trainable parameters is drastically reduced. ([View Highlight](https://read.readwise.io/read/01gyt88qyz71sjq81c4rnwf0rr))
- In this scenario, a rule of thumb is to allocate ~1.2-1.4GB per billion parameters (depending on the batch size and sequence length) to fit the entire fine-tuning setup. As detailed in the attached blog post above, this enables fine-tuning larger models (up to 50-60B scale models on a NVIDIA A100 80GB) at low cost ([View Highlight](https://read.readwise.io/read/01gyt894cbqaqw3w1strjdr3aj))
- Now we can fit very large models into a single GPU, but the training might still be very slow. The simplest strategy in this scenario is data parallelism: we replicate the same training setup into separate GPUs and pass different batches to each GPU. With this, you can parallelize the forward/backward passes of the model and scale with the number of GPUs. ([View Highlight](https://read.readwise.io/read/01gyt8a0as7rtr4qakdn6x38gg))
- We use either the `transformers.Trainer` or `accelerate`, which both support data parallelism without any code changes, by simply passing arguments when calling the scripts with `torchrun` or `accelerate launch`. The following runs a training script with 8 GPUs on a single machine with `accelerate` and `torchrun`, respectively. ([View Highlight](https://read.readwise.io/read/01gyt8ac2nepzpe3sv0a5fzzb2))
- Before we start training reward models and tuning our model with RL, it helps if the model is already good in the domain we are interested in. In ([View Highlight](https://read.readwise.io/read/01gyt8an9wkb44sdtsv0dnr3v2))
- There is nothing special about fine-tuning the model before doing RLHF - it’s just the causal language modeling objective from pretraining that we apply here ([View Highlight](https://read.readwise.io/read/01gyt8b9cawvhg8pmx3x3f4cs8))
- With this approach the training is much more efficient as each token that is passed through the model is also trained in contrast to padding tokens which are usually masked from the loss ([View Highlight](https://read.readwise.io/read/01gyt8bwtnkpssnchbd4169q9b))
- We train the model for a few thousand steps with the causal language modeling objective and save the model. Since we will tune the model again with different objectives, we merge the adapter weights with the original model weights. ([View Highlight](https://read.readwise.io/read/01gyt8cg8n90zp7gpfw2drfyyv))
- In principle, we could fine-tune the model using RLHF directly with the human annotations. However, this would require us to send some samples to humans for rating after each optimization iteration. This is expensive and slow due to the number of training samples needed for convergence and the inherent latency of human reading and annotator speed. ([View Highlight](https://read.readwise.io/read/01gyt8dcmvyq3gmn3rq9xj7nvf))
- A trick that works well instead of direct feedback is training a reward model on human annotations collected before the RL loop. The goal of the reward model is to imitate how a human would rate a text. There are several possible strategies to build a reward model: the most straightforward way would be to predict the annotation ([View Highlight](https://read.readwise.io/read/01gyt8dvmwppen9e6wy0kynvt0))
- . In practice, what works better is to predict the ranking of two examples, where the reward model is presented with two candidates (y_k, y_j) (yk​,yj​) for a given prompt x x and has to predict which one would be rated higher by a human annotator. ([View Highlight](https://read.readwise.io/read/01gyt8e2r31abt08xrtm7j9py7))
- With the fine-tuned language model and the reward model at hand, we are now ready to run the RL loop. It ([View Highlight](https://read.readwise.io/read/01gyt8f3zkqftgeew5mtxzp3rg))
- 1. Generate responses from prompts
  2. Rate the responses with the reward model
  3. Run a reinforcement learning policy-optimization step with the ratings
  ![](https://huggingface.co/datasets/trl-internal-testing/example-images/resolve/main/blog/stackllama/trl_loop.png) ([View Highlight](https://read.readwise.io/read/01gyt8f838bj5gsbtxxdeg787g))
- A common issue with training the language model with RL is that the model can learn to exploit the reward model by generating complete gibberish, which causes the reward model to assign high rewards. To balance this, we add a penalty to the reward: we keep a reference of the model that we don’t train and compare the new model’s generation to the reference one by computing the KL-divergence: ([View Highlight](https://read.readwise.io/read/01gyt8ga0x0q7tm6qkacmsc9bm))
- Training LLMs with RL is not always plain sailing. The model we demo today is the result of many experiments, failed runs and hyper-parameter sweeps ([View Highlight](https://read.readwise.io/read/01gyt8j75xh8b2174s9a53hsw9))
- In general in RL, you want to achieve the highest reward. In RLHF we use a Reward Model, which is imperfect and given the chance, the PPO algorithm will exploit these imperfections. This can manifest itself as sudden increases in reward, however when we look at the text generations from the policy, they mostly contain repetitions of the string ```, as the reward model found the stack exchange answers containing blocks of code usually rank higher than ones without it. Fortunately we this issue was observed fairly rarely and in general the KL penalty should counteract such exploits ([View Highlight](https://read.readwise.io/read/01gyt8jxpwgqg3tva600sd3c1v))
- In this post, we went through the entire training cycle for RLHF, starting with preparing a dataset with human annotations, adapting the language model to the domain, training a reward model, and finally training a model with RL ([View Highlight](https://read.readwise.io/read/01gyt8kt0pj9jmb61n90antd12))
- For a real use case, this is just the first step! Once you have a trained model, you must evaluate it and compare it against other models to see how good it is. This can be done by ranking generations of different model versions, similar to how we built the reward dataset. ([View Highlight](https://read.readwise.io/read/01gyt8m78xqyf9xkhvk2fj5v3z))
- Once you add the evaluation step, the fun begins: you can start iterating on your dataset and model training setup to see if there are ways to improve the model. You could add other datasets to the mix or apply better filters to the existing one ([View Highlight](https://read.readwise.io/read/01gyt8mkxdmxfrvhgcpkz2d1rn))
