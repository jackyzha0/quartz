---
title: Chebyshev Filter
tags:
  - signal-processing
  - filter
date: 2024-01-12
---

# History

## Chebyshev polynomials

### Objective


切比雪夫多项式（Chebyshev Polynomials）是19世纪俄国数学家彼得·切比雪夫（Pafnuty Chebyshev）在19世纪中期引入的，这些多项式具有广泛的应用，并在数学和工程领域中发挥着重要的作用。

切比雪夫多项式的发明主要有以下几个意义和目的：

1. **逼近论和插值：** 切比雪夫多项式在逼近论和插值中具有重要作用。它们是一组正交多项式，可以用来逼近和插值函数。在逼近论中，人们可以使用切比雪夫逼近将复杂的函数用一组切比雪夫多项式的有限和来表示，这对于数值计算和数据分析非常有用。使用第一类chebyshev多项式的根，也被叫做chebyshev节点来进行多项式插值，可以降低[龙格现象](https://zh.wikipedia.org/wiki/%E9%BE%99%E6%A0%BC%E7%8E%B0%E8%B1%A1)，并且提供多项式在连续函数的最佳一致逼近
    
2. **最小二乘法：** 切比雪夫多项式在最小二乘法中有广泛的应用。由于它们的正交性质，它们能够提供最小二乘逼近的有效工具。在拟合实验数据或解决非线性最小二乘问题时，切比雪夫多项式可以作为基函数。
    
3. **数值分析：** 切比雪夫多项式在数值分析中用于构建有效的数值方法，特别是在数值积分和微分方程的数值解法中。它们的性质使得在数值计算中可以更精确地处理一些数学问题。
    
4. **波动现象：** 切比雪夫多项式在研究振动和波动现象中也发挥了重要的作用。它们出现在许多物理学和工程学的问题中，特别是在描述周期性运动和振动的情况下。


### Definition

Chebyshev多项式来自于以下两个[Chebyshev微分方程](https://zh.wikipedia.org/wiki/%E5%88%87%E6%AF%94%E9%9B%AA%E5%A4%AB%E6%96%B9%E7%A8%8B)的解，

$$
(1-x^2)y'' - xy' + n^2 y = 0
$$
$$
(1-x^2)y'' -3xy'+n(n+2)y = 0
$$


这类方程的解为幂级数，$y=\sum_{n=0}^{\infty}a_nx^n$，且系数据有递推关系，$a_{n+2} = \frac{(n-p)(n+p)}{(n+1)(n+2)}a_n$

因此我们得到**第一类切比雪夫多项式**和**第二类切比雪夫多项式**

#### 第一类切比雪夫多项式


$$
\begin{equation}
\begin{split}
T_0(x) & = 1 \\
T_1(x) & = x \\
T_{n+1}(x) & = 2xT_n(x)-T_{n-1}(x)
\end{split}
\end{equation}
$$
![](signal_processing/algorithm/filter/attachments/Pasted%20image%2020240108161455.png)
#### 第二类切比雪夫多项式

$$
\begin{equation}
\begin{split}
U_0(x) & = 1 \\
U_1(x) & = 2x \\
U_{n+1}(x) & = 2xU_n(x) - U_{n-1}(x)
\end{split}
\end{equation}
$$

![](signal_processing/algorithm/filter/attachments/Pasted%20image%2020240108161800.png)

### 正交性

$$
\int_{-1}^1 T_n(x)T_m(x)\frac{dx}{\sqrt{1-x^2}} = 
\begin{cases}
0 &:n \not = m \\
\pi &: n=m=0 \\
\frac{\pi}{2} & : n=m \not = 0
\end{cases}
$$

$$
\int_{-1}^1 U_n(x)U_m(x)\sqrt{1-x^2}dx = 
\begin{cases}
0 &:n \not = m \\
\frac{\pi}{2} & : n=m
\end{cases}
$$

### Chebyshev Root

两类的_n_次切比雪夫多项式在区间[−1,1]上都有_n_ 个不同的根, 称为**切比雪夫根**, 有时亦称做切比雪夫节点 ，因为是多项式插值时的 _插值点_ 。

$T_n$的$n$个根为：

$$
x_i = \cos{(\frac{2i-1}{2n}\pi)}
$$

$U_n$的$n$个根分别是：
$$
x_i = \cos{(\frac{i}{n+1}\pi)}
$$




# Chebyshev Filter

## Type I Chebyshev Filter

The gain response:

$$
G_n(\omega) = |H_n(j\omega)| = \frac{1}{\sqrt{1+\varepsilon^2T_n^2(\omega/\omega_0)}}
$$

* $\varepsilon$ - ripple factor
* $\omega_0$ - cutoff frequency
* $T_n$ - Chebyshev polynomial
