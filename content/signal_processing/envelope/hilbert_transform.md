---
title: Hilbert Transform Envelope
tags:
  - signal-processing
  - algorithm
  - envelope
---

# Introduction

![](signal_processing/envelope/attachments/Pasted%20image%2020240103160713.png)

# Envelope Explanation
## Envelope and Fine Structure

* Envelope:
	* The envelope of a signal represents the slowly varying amplitude or outline of the signal. It provides a smooth curve that encapsulates the main shape of the signal, ignoring the rapid oscillations or fluctuations. The envelope is typically associated with the low-frequency components of a signal.
* Fine Structure:
	* The fine structure of a signal refers to the detailed, high-frequency components or rapid oscillations present in the signal. It captures the fast variations that occur on a shorter time scale compared to the envelope.


# Algorithm Detail

## History

* 1905年---Hilbert在研究黎曼-希尔伯特问题时提出希尔伯特变换，而他关于离散希尔伯特变换的早期工作可追溯到他在哥根廷的讲课。
* Hermann Weyl在他的学位论文中发表了离散希尔伯特变换的结论。
* Schur改进了离散希尔伯特变换的结果，并将其扩展到了积分条件下。

**而将Hilbert变换运用到信号处理中还得追溯到解析信号表达的建立。**

> [!hint] 
>  "传统经典的信号研究方法主要概括为基于傅里叶变换的谱分析、基于概率分布的统计分析和其它随机信号表示方法，同时还有起源于很早的典型谱、相关和分布特征，而这些分析方法研究的**一个基本考虑是将随机信号表达为两个独立函数的乘积**”
>  

早期关于包络和瞬时相位的研究都是基于笛卡尔坐标系x-y

![](signal_processing/envelope/attachments/Pasted%20image%2020240102155308.png)

有关系：
$$
\begin{align}
A^2 & = x^2+y^2 \\
\varphi & = \arctan{\frac{y}{x}}
\end{align}
$$
这样的表达被引入傅里叶序列中，$x_k = \sum a_k\cos\varphi_k + b_k\sin\varphi_k$, 其幅度和相位均可由上面笛卡尔坐标系中的两个关系得到，此时坐标$(x,y)$就是$(a_k,b_k)$。 用这种方法研究调制信号的包络和瞬时相位依赖于一个伟大的公式：

$$
e^{i\varphi} = \cos{\varphi} + i\sin{\varphi}
$$

1946年， Gabor先生定义了复函数更一般化的欧拉公式

$$
Y(t) = u(t) + iv(t)
$$
这里的$v(t)$是$\mu(t)$的希尔伯特变换

1998年，Huang在现代希尔伯特变换研究领域做出了显著性工作 —— EMD、HHT，使得希尔伯特变换理论在现代信号分析中遍地开花


## Analytical Signal



## Mathematical description

The mathematical description of the Hilbert transform is to **rotate the Fourier components in complex area**.

$$
H(\mu)(t) = \frac{1}{\pi} \text{p.v.} \int_{\infty}^{\infty} \frac{\mu(t)}{t-\tau}d\tau
$$

![](signal_processing/envelope/attachments/Pasted%20image%2020240102150350.png)


The Hilbert transform is given by the [Cauchy principal value](math/real_analysis/cauchy_principal_value.md) of the convolution with the function $1/(\pi t)$.

## Geometrical meaning of HT







# Reference

* [Mathuranathan. “Extract Envelope, Phase Using Hilbert Transform: Demo.” _GaussianWaves_, 24 Apr. 2017, https://www.gaussianwaves.com/2017/04/extract-envelope-instantaneous-phase-frequency-hilbert-transform/.](https://www.gaussianwaves.com/2017/04/extract-envelope-instantaneous-phase-frequency-hilbert-transform/)
* [_CFC: What Does the Hilbert Transform Do? (V9)_. _www.youtube.com_, https://www.youtube.com/watch?v=-CjnFEOopfw. Accessed 2 Jan. 2024.](https://www.youtube.com/watch?v=-CjnFEOopfw)
* [_Extract Envelope and Fine Structure in Praat Using the Hilbert Transform_. _www.youtube.com_, https://www.youtube.com/watch?v=qp1G3a2g8r0. Accessed 2 Jan. 2024.](https://www.youtube.com/watch?v=qp1G3a2g8r0)
* [“希尔伯特变换与瞬时频率问题--连载（一）.” 知乎专栏, https://zhuanlan.zhihu.com/p/25213895. Accessed 2 Jan. 2024.](https://zhuanlan.zhihu.com/p/25213895)
* [_The Hilbert Transform_. _www.youtube.com_, https://www.youtube.com/watch?v=VyLU8hlhI-I. Accessed 3 Jan. 2024.](https://www.youtube.com/watch?v=VyLU8hlhI-I)

