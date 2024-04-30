---
title: Instantaneous Frequency
tags:
  - advanced
  - basic
  - signal
  - signal-processing
  - Hilbert
date: 2024-04-17
---
在1998年EMD提出的时候，信号的瞬时能量或瞬时包络的概念已被广泛接受。另一方面，瞬时频率的概念一直备受争议。

接受瞬时频率的概念有两个基本困难，如下所示。第一个源于**傅里叶谱分析**根深蒂固的影响。在传统的傅里叶分析中，**频率被定义为跨越整个数据长度且幅度恒定的正弦或余弦函数**。作为该定义的扩展，瞬时频率还必须与正弦或余弦函数相关。因此，我们需要至少一次正弦波或余弦波的完整振荡来定义本地频率值。根据这个逻辑，没有比全波更短的了。**对于频率必须不时改变值的非平稳数据，这样的定义没有意义**。第二个困难源于定义瞬时频率的非唯一方法。

当时使用HilBert Transform来定义瞬时频率的方法，当时仍然被Cohen (1995)等人认为存在矛盾；

这里就不对瞬时频率做过多的展开讨论，直接给出定义：

$$
Y(t) = \frac{1}{\pi} \text{p.v.} \int_{-\infty}^{\infty} \frac{X(t')}{t - t'}dt' \quad or \quad Y(t) = X(t) \ \ \text{conv} \ \ \frac{1}{t}
$$
$$
Z(t) = X(t) + iY(t) = \alpha(t)e^{i\theta(t)}
$$
$$
\alpha(t) = [X^2(t) + Y^2(t)]^{\frac{1}{2}}, \quad \theta(t) = \arctan(\frac{Y(t)}{X(t)})
$$

这里$\theta(t)$即为瞬时角度，瞬时频率则为，

$$
\omega = \frac{d\theta(t)}{dt}
$$



# Reference

