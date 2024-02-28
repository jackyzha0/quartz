---
title: "⭐Attenion"
tags:
- deep-learning
- attention
---
# Self-Attention

讲述self-attention我们以*sequence labeling*任务作为任务来讲解，sequence labeling的任务是输入N个vector并且输出N个label。

典型的例子有输入一个句子，分析每个词汇的词性是什么，比如句子“I saw a saw”，这个句子里saw和saw的词性分别是verb和nonu，如果我们用fully-connected（FC）层来做的话，那么面对同样的输入saw，我们无法得出不同的结果。

![Pasted image 20230315195403](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/1.png)

我们的做法可以是对输入加窗，考虑周边邻近的词汇信息，这与信号处理常用的方法类似，但是窗的长度是有限且固定的，而seq的长度是变化的，因此我们在面对这种任务的时候，我们可以借助**self-attention**层。

## Detail

![Pasted image 20230315195603](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315195603.png)

对于Self-attention层，生成的$b^i$向量是考虑到所有输入$\sum_i\alpha^i$向量

### Vector Relevance

![250](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315200009.png)


* *Step 1.* 使用Dot-product 去计算 vector relevance

![400](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315201906.png)

* *Step 2.* Normalizing计算出来的vector relevance
![400](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315202047.png)

* *Step 3.*  根据vector relevance，也就是attention scores计算最后的输出。这是一个Reweighting Process，一个extract information based on attention scores

![400](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315202314.png)

> [!hint] 
>  从上面的过程中，可以看出，$b^i$互相之间的计算没有关系，具有很好的并行性

### Matrix Detail

$$
q^i = W^q \alpha^i
$$


$$
Q = [q^1 \quad q^2 \quad \cdots \quad q^N],\ \  I = [\alpha^1 \quad \alpha^2 \quad \cdots \quad \alpha^N]
$$



So,

$$
Q = W^q I
$$

As same,
$$
K = W^k I,\quad V = W^v I
$$
Calculate attention score $\alpha$,
$$
\begin{bmatrix}
\alpha_{1,1} \\
\alpha_{1,2} \\
\cdots \\
\alpha_{1,N}
\end{bmatrix} =
\begin{bmatrix}
k^1 \\
k^2 \\
\cdots \\
k_N
\end{bmatrix} q^1
$$

So,
$$
A=\begin{bmatrix}
\alpha_{1,1} & \alpha_{2,1} & \cdots & \alpha_{N,1} \\
\alpha_{1,2} & \alpha_{2,2} & \cdots & \alpha_{N,2} \\
\vdots & \vdots & \ddots & \vdots\\
\alpha_{1,N} & \alpha_{2,N} & \cdots & \alpha_{N,N}
\end{bmatrix} =
\begin{bmatrix}
k^1 \\
k^2 \\
\cdots \\
k_N
\end{bmatrix} [q^1 \quad q^2 \quad \cdots \quad q^N] = K^TQ
$$

$$
A' = \text{Softmax}(A)
$$

Finally, calculate output $b$

$$
O = [b^1 \quad b^2 \quad \cdots \quad b^N] = [v^1 \quad v^2 \quad \cdots \quad v^N] = VA'
$$

![600](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315205148.png)

### Positional Encoding
![250](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315205727.png)
* Each position has a unique positional vector $e^i$
	* hand-crafted
	* learned from data

## Fun Facts

### Self-attention vs. CNN

![Pasted image 20230315205918](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315205918.png)

因为transformer有着更大的function set，所以需求更多的数据; ![Pasted image 20230315210032](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315210032.png)

### Self-attention vs. RNN

目前，RNN的角色正在被self-attention替代，RNN在long seq的情况下，前面的信息会被逐渐遗忘；同时**RNN没有并行性**
同样，Self attention有着比RNN更大的function set，在某些情况下，self-attention可以变成RNN

# Multi-head Self-attention
Multi-head self attention就是由不同的self attention layer在一起，有不同的$W^q$,$W^k$来负责不同种类的relevance

![600](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315210631.png)
![300](computer_sci/deep_learning_and_machine_learning/deep_learning/attachments/Pasted%20image%2020230315210704.png) 