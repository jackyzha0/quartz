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


# Reference

* https://www.youtube.com/watch?v=c7_F4P71E2E
* https://www.youtube.com/watch?v=GJoZWPocAm0