---
title: Poisson Distribution & Exponential Distribution
tags:
  - basic
  - math
  - statistics
  - distribution
date: 2024-06-03
---
# Background

## Poisson Process

日常生活中，大量的事件是有固定频率的。

- 某医院平均每小时出生3个婴儿
- 某公司平均每10分钟接到1个电话
- 某超市平均每天销售4包xx牌奶粉
- 某网站平均每分钟有2次访问

$N(t)$等于t时间内发生事件的次数，在这个过程中，两个不重叠区间内所发生的事件数目是互相独立的随机变量，那么这个随机过程$N(t)$即是一维泊松过程。

# Poisson Distribution

这个过程中，在区$[t, t+\tau]$内发生的事件数目的概率分布满足Poisson Distribution,
$$
P[(N(t+\tau) - N(t)) = k] = \frac{e^{-\lambda\tau}(\lambda\tau)^k}{k!}, \quad k=0,1,\cdots
$$

$\lambda$是一个正数，为固定的参数，通常称为抵达率(arrival rate)或强度(intensity)。常常用事件在单位长度$\tau$内发生的平均频率表达。

Poisson Distribution可以将t代为0，简化为在接下来单位时间$\tau$内有k次时间发生的概率的分布：

$P(N(t) = k)  = \frac{e^{-\lambda t}(\lambda t)^k}{k!}$

# Exponential Distribution

这些事件之间的时间间隔，是属于指数分布。

指数分布的公式可以从泊松分布推断出来。如果下一个事件发生要有间隔时间 t ，就等同于 t 之内没有任何事件发生。

$$
P(X>t) = P(N(t)=0) = \frac{e^{-\lambda t}(\lambda t)^0}{0!} = e^{-\lambda t}
$$

so,

$$
P(X\leq t) = 1 - P(X>t) = 1 - e^{-\lambda t}
$$

那么指数分布的CDF即为$P(X\leq t)$，同时有：

$$
\text{CDF}(t) = \int_{-\infty}^{\infty} \text{PDF}(t) dt
$$
则，可以推导出：

$$
\text{PDF}(t) = (1-e^{-\lambda t})' = \lambda e^{-\lambda t}
$$


# Deduction

![](math/statistic/basic_concepot/distribution/attachments/2bbb645362366906ace3296d35612625_720.jpg)

# Reference

* https://www.ruanyifeng.com/blog/2015/06/poisson-distribution.html
* https://zh.wikipedia.org/wiki/%E6%B3%8A%E6%9D%BE%E8%BF%87%E7%A8%8B
* https://www.le.ac.uk/users/dsgp1/COURSES/LEISTATS/poisson.pdf