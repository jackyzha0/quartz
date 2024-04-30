---
title: Autocorrelation in Signal Processing
tags:
  - advanced
  - signal
  - statistics
  - signal-processing
date: 2024-04-15
---
# Background
## Covariance


Covariance can classify three types of relationships between two random variables.

1. **Relationships with positive trends**
2. **Relationships with negative trends**
3. **Times when there is no relationship because there is no trend**

Also very importantly, covariance is a **computational stepping stone** to more interesting thing, like **correlation.**


Here's the equation to calculate the covariance:

$$
\begin{equation}
\begin{split} 
cov(X, Y) & = E[(X-E[X])(Y - E[Y])] \\ 
& = E[XY] - E[X]E[Y] \\
cov(X, Y) & = \frac{\sum(x-\overline{x})(y-\overline{y})}{n-1} \\
\end{split}
\end{equation}
$$
![](signal/signal_processing/algorithm/advanced_statistic/autocorrelation/attachments/Pasted%20image%2020240415171344.png)

![](signal/signal_processing/algorithm/advanced_statistic/autocorrelation/attachments/Pasted%20image%2020240415171351.png)


Covariance is hard to **interpret** because it is sensitive to the **scale**


To solve the scale effect, here's the correlation:

## Correlation

![](signal/signal_processing/algorithm/advanced_statistic/autocorrelation/attachments/Pasted%20image%2020240415171510.png)


We can quantify the strength of the relationship with correlation (**Pearson’s correlation**)

$$
r= corr(X, Y) = \frac{cov(X, Y)}{\sqrt{var(X)}\sqrt{var(Y)}}
$$

$corr(X, Y)$ is between -1 to 1


> [!tip] 
>  Correlation can still be 1 even we have so little data, even only 2 random dots In general, more data, **the more confidence we believe the correlation** 
>  
>  NOTE: When we’re talking about correlation, we’re only talking about using **straight line**


![](signal/signal_processing/algorithm/advanced_statistic/autocorrelation/attachments/Pasted%20image%2020240415171736.png)

For correlation, we usually use **p-value** to **quantify the confidence** of the straight line relationship. **The more samll p-value, the more confident we say they are straight line relationship**; Like the figure:

![](signal/signal_processing/algorithm/advanced_statistic/autocorrelation/attachments/Pasted%20image%2020240415171834.png)

![](signal/signal_processing/algorithm/advanced_statistic/autocorrelation/attachments/Pasted%20image%2020240415171855.png)


About P-value, you have better know what's [significance test](math/Statistics/significance_test/whats_the_significance_test.md)


## Random Signal

- 随机信号(Random Signals)在任何时间的取值都是不能先验确定的随机变量
- 虽然随机信号的取值不能先验确定，但这些取值却服从某种统计规律，换言之，随机信号或过程可以用概率分布特性统计地描述
- 随机变量 $X=x(t)$，离散状态为随机序列 $x(n)$,$x_k(n)$是随机序列$x(n)$的一个样本序列

### Statistics for Random Signal

$$
\mu_x(n)=E\{x(n)\}=\lim_{N\rightarrow\infty}\frac{1}{N}\sum_{k=1}^N x_k(n)
$$
$$
E\{x^2(n)\}=\lim_{N\rightarrow\infty}\frac{1}{N}\sum_{k=1}^N x^2_k(n)
$$
$$
\sigma^2_x(n)=E\{[x(n)-\mu_x(n)]^2\}=\lim_{N\rightarrow\infty}\frac{1}{N}\sum_{k=1}^N[x_k(n)-\mu_x(n)]^2
$$
$$
\sigma^2_x(n)=E\{x^2(n)\}-\mu^2_x(n)
$$
$$
R_x(n_1,n_2)=E\{x(n_1)x(n_2)\}=\lim_{N\rightarrow\infty}\frac{1}{N}\sum_{k=1}^N x_k(n_1)x_k(n_2)
$$

# Autocorrelation

## Equation


$$
R_x(n_1,n_2) = E\{x(n_1)x(n_2)\}=\lim_{N\rightarrow\infty}\frac{1}{N}\sum_{k=1}^{N}x_k(n_1)x_k(n_2)
$$
若令时移m=n_2-n_1，有：

$$
R_x(n,n+m) = E\{x(n)x(n+m)\}=\lim_{N\rightarrow\infty}\frac{1}{N}\sum_{k=1}^{N}x_k(n)x_k(n+m)
$$


## Properties

1. **Symmetry**

$$
R_x(m)=R_x(-m)
$$

2. **Maximum at zero**

$$
R_x(0) \geq |R_x(m)|
$$

$$
R_x(0)=E\{x(n)x(n)\}=E\{x^2(n)\} \geq 0
$$

$$
E\{[x(n)\pm x(n+m)]^2\} \geq 0
$$

So,

$$
E\{x^2(n)\} \pm 2E\{x(n)x(m+n)\} + E\{x^2(m+n)\} \geq 0
$$

Depending on stable signal,

$$
E\{x^2(n)\} = E\{x^2(m+n)\} = R_x(0)
$$

So,

$$
2R_x(0)\pm2R_x(m) \geq 0
$$

$$
R_x(0) \geq |R_x(m)|
$$

3. **Relation between Autocovariance and Autocorrelation**

$$
C_x(m)=R_x(m)-\mu_x^2
$$

$$
C_x(0)=R_x(0)-\mu_x^2=E\{x^2(n)\}-\mu_x^2 = \sigma_x^2
$$

4. 在**非周期平稳序列**上，随机变量在时间越来越远后，相关性变得越来越弱，$m \rightarrow \infty$，可以认为不相关

$$
R_x(\infty)=\lim_{m\rightarrow\infty}R_x(m)=\lim_{m\rightarrow\infty}E\{x(n)x(m+n)\} = E\{x(n)\}E\{x(n+m)\}=\mu_x^2
$$

5. 平稳信号**不含相位信息**

$$
y(n)=x(n-l)
$$

$$
R_y(m)=R_x(m),C_y(m)=C_x(m)
$$

6. 本质性质，**正定性(Positive Definiteness)**

**Positive Definiteness Matrix**

$$
A\in R^{n\times n},\text{ so, it have any vector } \alpha\in R^n:  \\
\alpha^T A \alpha \geq 0
$$

将正定性推广到相关函数，有随机变量$X=[x(1),x(2),\cdots,x(n)]^T,$ 则存在相关矩阵$R$,

$$
R=\begin{bmatrix}
R(0) & \cdots & R(-n) \\
\vdots & \ddots & \vdots \\
R(n) & \cdots & R(0)
\end{bmatrix}
$$

存在任意向量$\alpha \in R^n$

$$
\alpha^T R \alpha \geq0
$$

从频域角度来看，Bochner：

若$f(x)$正定，则等价于：

$$
\mathcal{F}(f(x)) = \int_{-\infty}^{\infty}f(x)e^{-j\omega x}dx \geq 0
$$

其傅里叶变换始终大于0


# Application


* [Period Detection by Autocorrelation](signal/signal_processing/algorithm/advanced_statistic/autocorrelation/period_detection.md)
# Reference

* https://pinkr1ver.notion.site/Autocorrelation-Analysis-Power-Spectral-Density-330755770347472989062c6b31f18a21?pvs=4
* https://www.youtube.com/watch?v=qtaqvPAeEJY&t=24s