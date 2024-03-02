---
title: Support Vector Machine
tags:
  - machine-learning
date: 2024-02-28
---

# Overview

![](computer_sci/deep_learning_and_machine_learning/machine_learning/attachments/Pasted%20image%2020230904225904.png)

# Hyper Parameters

## Kernel Function

* Linear
* Polynomial
* RBF
	* $\gamma$: The gamma parameter **defines the influence of each training example on the decision boundary**. A higher gamma value gives more weight to the closer points, while a lower value allows points further away to have a significant impact. Higher values of gamma can lead to overfitting, especially in datasets with noise.
## C Parameter

The C parameter, also known as the regularization parameter, controls the trade-off between maximizing the margin and minimizing the classification error. **A smaller C value allows for a larger margin but may lead to misclassification of some training examples, while a larger C value focuses on classifying all training examples correctly but might result in a narrower margin**
## [Training Method](https://wadhwatanya1234.medium.com/multi-class-classification-one-vs-all-one-vs-one-993dd23ae7ca)

* One-vs-All
* One-vs-One
# Detail

## Score Function

$$
f(x) = \sum_i \alpha_i y_i G(x, x_i) + bias
$$
* $\alpha_i$ is corresponding support vector weight
* $y_i$ is corresponding support vector tags
* $G(x,x_i)$ is kernel function about input sample $x$ and support vector $x_i$
* $bias$ is bias
## Decision Function 

$$
Decision \ Function = sign(f(x))
$$
We determine the sample's category by checking its decision function's sign.
# Reference

* [“华为开发者论坛.” _Huawei_, https://developer.huawei.com/consumer/cn/forum/topic/41598169. Accessed 4 Sept. 2023.](https://developer.huawei.com/consumer/cn/forum/topic/41598169)
* [Multi-class Classification — One-vs-All & One-vs-One](https://wadhwatanya1234.medium.com/multi-class-classification-one-vs-all-one-vs-one-993dd23ae7ca)
* [Saini, Anshul. “Guide on Support Vector Machine (SVM) Algorithm.” _Analytics Vidhya_, 12 Oct. 2021, https://www.analyticsvidhya.com/blog/2021/10/support-vector-machinessvm-a-complete-guide-for-beginners/.](https://www.analyticsvidhya.com/blog/2021/10/support-vector-machinessvm-a-complete-guide-for-beginners/)