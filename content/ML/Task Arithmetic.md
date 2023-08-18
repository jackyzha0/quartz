---
title: "Task Arithmetic"
tag:
date: 2023-08-09
draft:
---

Paper: [Editing Models with Task Arithmetic](https://arxiv.org/abs/2212.04089)
- From UWashington, Microsoft, and AI2

Altering model behavior — improving performance on downstream tasks or mitigating biases learned during pre-training. This is obviously important and may have significant implications for [[Alignment]].

Revolves around the idea of a task vector.

>[!info] Task Vector
>Specifies a direction in the weight space of a pre-trained model, such that movement in that direction improves performance on the task.
>To obtain a task vector, subtract the weights of a pre-trained model from the weights of the same model after fine-tuning: $$\tau = \theta_{\text{ft}} - \theta_{\text{pr}}$$

## Capabilities & Applications
