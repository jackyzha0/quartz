---
title: Deep Neural Decision Forests
tags:
- deep-learning
date: 2024-02-28
---

# Background

* [Decision Tree](computer_sci/deep_learning_and_machine_learning/deep_learning/decision_tree.md)
* [Random Forest](computer_sci/deep_learning_and_machine_learning/deep_learning/random_forest.md)

# What is Deep Neural Decision Forests

![](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230413112822.png)

Deep Neural Decision Forests(dNDFs)是Neural Networks和Random Forest的结合，但是它更倾向于Neural Networks。它本质上是Nerual Networks incorporate Random Forest来提高NN的效率和准确度，训练方法和NN一致。

dNDFs与NN的不同在output layer层发生变化，不单纯使用FC层输出，而是使用随机森林作为最后一层的分类器，相当于通过前面系统输出的data representation用随机森林作为分类器分类。**同时，通过将传统随机森林的local optimize改造成通过back propagation进行global optimize,随机森林的参数训练可以与前端的深度学习网络进行无缝衔接。**

> [!attention] 
>  The method is different from random forest in the sense that it uses a principled, joint and global optimization of split and leaf node parameters and from conventional deep networks because a decision forest provides the final predictions

# Math in Neural Decision Forests

Decision Tree model要是stochastic的，为了让它differentiable，让后面可以通过back-propagation训练。在传统的decision tree模型中，从node到leaf的路径是由decision function确定的，而在这个模型中，我们将用two sets of probabilities去决定final output。

1. Probability of an observation reaching to a leaf . These basically are associated with decision node/split node which decides whether an observation goes left or right
2. Once an observation reaches a leaf node, probability that it takes a specific class

 

# Reference

* [Deep Neural Decision Forests - YouTube Vedio by  Venkatesh Bingi](https://www.youtube.com/watch?v=Uaimgqv75dY)
* [Deep Neural Decision Forests - Medium by Gurparkash Singh Sohi](https://blog.goodaudience.com/deep-neural-decision-forests-b1dd39c4c6ce)
* [Deep neural decision forest in keras - Medium by Kushal Mukherjee](https://kushalmukherjee.medium.com/deep-neural-decision-forest-in-keras-60134d270bfe)

