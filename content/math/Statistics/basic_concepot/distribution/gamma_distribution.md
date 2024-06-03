---
title: Gamma Distribution
tags:
  - basic
  - math
  - statistics
date: 2024-06-03
---

# Background

## Gamma Function

Factorial:

$$
n! = \prod_{i=1}^{n} i = 1\times2\times3\times\cdots\times n
$$
那如何计算$\frac{3}{2}!$呢？通过对阶乘函数的插值将阶乘函数托展到non-integer value。但是插值的方法有很多，要如何选择合适的插值的方法？

最重要的条件是，插值后的函数要满足阶乘最重要的条件，

$$
n! = n\times(n-1)!
$$
这个插值后的广义阶乘，就是**Gamma Function**：

$$
\Gamma(z) =  \int_{0}^{\infty} x^{z-1}e^{-x}dx
$$
可以验算，阶乘最重要的性质并没有变，不过形式有所偏移，性质如下：

$$
\Gamma(z+1)=z \times \Gamma(z)
$$
证明如下：

![](math/Statistics/basic_concepot/distribution/attachments/prove.jpg)

同时，在integer节点，Gamma function也和阶乘对应起来，即：

$$
\Gamma(n+1) = n!
$$

证明如下：

![](math/Statistics/basic_concepot/distribution/attachments/df15541df80b6065fb8296d80ffceac5_720.jpg)



## Exponential Distribution

Exponential Distribution指的是，probability of the waiting time between events in a Poisson Process

Here's the exponential distribution explain: [Exponential Distribution](math/Statistics/basic_concepot/distribution/exponential_distribution_and_poisson_distribution.md)


# Introduction

终于来到我们的主题，Gamma Distribution。

在概率论和统计学中，Gamma Distribution是一种用途广泛的**双参数**连续概率分布。Exponential Distribution， Erlang Distribution和Chi Distribution是Gamma Distribution的特殊情况。

Gamma Distribution可以被认为是*Exponential Distribution的extension*，相比较于Exponential Distribution only infers the probability of the waiting time for the first event, **the Gamma Distribution gives us the probability of the waiting time util the $n_{th}$ event**.

## Deduction

因为T时间后，时间第n次发生了，也就意味着，在时间t内，发生了n-1次事件。

$$
P(T\leq t) = 1 - P(T>t) = 1 - P(\text{0 or 1 or } \cdots \text{n-1 events in t})
$$

so,

$$
P(T\leq t) = 1 - P(T>t) = 1 - \sum_{i=0}^{n-1} \frac{(\lambda t)^{i}e^{-\lambda t}}{i!}
$$
means,

$$
\text{CDF}(t) = 1 - \sum_{i=0}^{n-1} \frac{(\lambda t)^{i}e^{-\lambda t}}{i!}
$$
so,

$$
\text{PDF}(t) = \frac{d}{dt}(1 - \sum_{i=0}^{n-1} \frac{(\lambda t)^{i}e^{-\lambda t}}{i!})
$$
The result:

$$
\text{PDF}(t) = \frac{\lambda e^{-\lambda t}(\lambda t)^{n-1}}{(n-1)!} = \frac{\lambda e^{-\lambda t}(\lambda t)^{n-1}}{\Gamma(n)}
$$
推广到一般形式

$$
\text{Gamma Distribution, } \text{PDF}(x) = \frac{\beta^{\alpha}}{\Gamma(\alpha)}x^{\alpha-1}e^{-\beta x}
$$

$\alpha$相当于之前的第个事件，再在分布中控制着分布的形状；$\beta$相当于之前的$\lambda$, 为速率参数，也是事件发生的到达率和强度；

同时Gamma Distribution也有另一套等效参数$(k, \theta)$，表现为：

$$
\text{Gamma Distribution, } \text{PDF}(x) = \frac{1}{\Gamma(k)\theta^{k}}x^{k-1}e^{-\frac{x}{\theta}}
$$
其中，$k=\alpha$, 控制着分布形状，$\beta = \frac{1}{\theta}$，控制着尺度

# Reference

* https://www.youtube.com/watch?v=c7_F4P71E2E
* https://www.youtube.com/watch?v=GJoZWPocAm0