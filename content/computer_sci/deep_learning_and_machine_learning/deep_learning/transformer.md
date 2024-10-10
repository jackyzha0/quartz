---
title: Transformer
tags:
  - deep-learning
  - attention
date: 2024-10-09
---

> [!info] 
> 在学习Transformer前，你需要学习 [attention](computer_sci/deep_learning_and_machine_learning/deep_learning/attention.md)



Transformer 是Seq2Seq model，由Encoder和Decoder组成
![300](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230316160103.png)

# Encoder
这里贴的是原文Encoder的架构
![Pasted image 20230316162635](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230316162635.png)

![Pasted image 20230316162642](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230316162642.png)


## Learn by Animation Demo

2024 VIS poster session 里有一个海报介绍的Transformer Explainer太清晰了，包含word embedding，QKV到attention的计算，dropout， layer normalization ... ... 

通过这个demo可以清晰地理解LLM中Transformer模块地应用

访问：[https://poloclub.github.io/transformer-explainer/](https://poloclub.github.io/transformer-explainer/)

![](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020241010112210.png)