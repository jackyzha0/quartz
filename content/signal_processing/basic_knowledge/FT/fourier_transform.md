---
title: Fourier Transform
tags:
  - math
  - signal-processing
date: 2024-02-28
---
# Almost Fourier Transform

![](signal_processing/attachments/Pasted%20image%2020230919152200.png)

It is important to see there are 2 different frequencies here:
1. The frequency of the original signal
2. The frequency with which the **little rotating vector winds around the circle**

![](signal_processing/attachments/Pasted%20image%2020230919152234.png)

Different patterns appear as we wind up this graph, but it is clear that the x-coordinate for the center of mass is important when the winding frequency is 3; The same number as the original signal

这个发现就是Fourier transform的基础

而如何将一维信息拉到平面中，很容易想到设计complex plane，如何describe rotating at a rate of $f$, 用：

$$
e^{2\pi i ft}
$$

因为在Fourier transform中，convention way是顺时针旋转，所以使用$e^{-2\pi ift}$，那如何衡量center of mass呢，如下图：


![](signal_processing/attachments/Pasted%20image%2020230919152357.png)


$$
\frac{1}{N}\sum_{k=1}^N g(t_k)e^{-2\pi i ft_k}
$$

然后more points → continuous：

$$
\frac{1}{t_2-t_1}\int_{t_1}^{t_2}g(t)e^{-2\pi ift} dt
$$

这个就是Almost Fourier Transform, 但是实际情况上，Fourier transform倾向于得到scaled center mass，越长的time，旋转越多圈，其Fourier transform也会成倍放大

![](signal_processing/attachments/Pasted%20image%2020230919152720.png)


# Fourier Transform (FT)

$$
\hat{g}(f)=\int_{t_1}^{t_2}g(t)e^{-2\pi ift}dt
$$

一般来说，Fourier transform的bounds在$-\infty \rightarrow \infty$

$$
\hat{g}(f)=\int_{t_1}^{t_2}g(t)e^{-2\pi ift}dt
$$

**Inverse Fourier Transform**

$$
g(t)=\int_{-\infty}^{\infty}\hat{g}(f)e^{2\pi ift}df
$$

# **Discrete-time Fourier Transform(DTFT)**

$$
x[n]\xrightleftharpoons[\text{IDTFT}]{\text{DTFT}} X(\omega)\ or\ X(e^{j\omega})
$$

$$
X(\omega)=\sum_{n=-\infty}^{\infty}x[n]e^{-j\omega n}
$$


> [!hint] 
> Z transform: 
$X(z)=\sum_{n=-\infty}^{\infty}x(n)z^{-n}$ 

After DTFT, the signal $X(\omega)$ will have period $2\pi$

$$
X(\omega+2\pi)=\sum_{n=-\infty}^\infty x[n]e^{-j(\omega+2\pi)n}=\sum_{n=-\infty}^{\infty}x[n]e^{-j\omega n}=X(\omega)
$$

IDTFT:

$$
x(n)=\frac{1}{2\pi}\int_{-\pi}^\pi X(\omega)e^{j\omega n}d\omega
$$

Also, for $X(\omega)$, it have **polar form and rectangular form**

- Polar form:

$$
X(\omega)=|X(\omega)|\angle X(\omega)
$$

- Rectangular form:

$$
X(\omega)=X_r(\omega)+jX_i(\omega)
$$

so, **magnitude and angle**

$$
|X(\omega)|=\sqrt{{X_r(\omega)}^2 + {X_i(\omega)}^2} \\
\angle X(\omega)=\tan^{-1}[\frac{X_i(\omega)}{X_r(\omega)}]
$$

# Complex Fouerier Series

为了解决热方程和弦振动，因此有了傅里叶级数；

## 复数形式推导

![](signal_processing/attachments/Pasted%20image%2020230919153109.png)


## 三角函数推导

见这个知乎：

[傅里叶系列（一）傅里叶级数的推导](https://zhuanlan.zhihu.com/p/41455378)

$$
f(t)=\frac{1}{2}a_0 + \sum_{k=1}^\infty (a_k\cos 2\pi kt + b_k\sin 2\pi kt)
$$


# Discrete Fourier Transform(DFT)

$$
\{f_1,f_2,f_3,\cdots,f_n\}\xRightarrow{\text{DFT}}\{{\hat{f_1},\hat{f_2},\hat{f_3},\cdots,\hat{f_n}}\}
$$

$$
X[k]=\sum_{n=0}^{N-1}x[n]\cdot e^{-\frac{j2\pi kn}{N}}
$$

$$
\frac{k}{N}\hat{=} F, \quad n\hat{=}t
$$

Video: [Discrete Fourier Transform - Simple Step by Step](https://www.youtube.com/watch?v=mkGsMWi_j4Q)

Also, when we do DFT, we need to notice **Nyquist Limit**

Also,we can write DFT in matrix version:

$$
\text{make } \omega_N=e^{\frac{-2\pi i}{N}}
$$

it have:

$$
\begin{bmatrix}
X[0] \\
X[1] \\
X[2] \\
\vdots \\
X[N-1] \\
\end{bmatrix} =
\begin{bmatrix}
1 & 1 & 1 & \cdots & 1 \\
1 & \omega_N & \omega_N^2 & \cdots & \omega_N^{N-1} \\
1 & \omega_N^2 & \omega_N^4 & \cdots & \omega_N^{2(N-1)} \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
1 & \omega_N^{N-1} & \omega_N^{2(N-1)} & \cdots & \omega_N^{(N-1)^2} \\
\end{bmatrix} 
\begin{bmatrix}
x[0] \\
x[1] \\
x[2] \\
\vdots \\
x[N-1] \\
\end{bmatrix}
$$

**For $X[k]$, it means a $\cos$ wine like this:**

![](signal_processing/attachments/Pasted%20image%2020230919153401.png)

# Fast Fourier transform(FFT)

**FFT is a computationally efficient way of computing the DFT**

The time complexity of FFT is $O(n\log{n})$, and the time complexity of DFT is $O(n^2)$

for DFT:

$$
\hat{f}=\underbrace{F_{1024}}_{\text{DFT Matrix}} \cdot f
$$

# Z transform

The Z-transform (ZT) is a mathematical tool which is used to convert the **difference equations** in **time domain** into the **algebraic equations** in **z-domain**.

通常，Z变换有两种类型，**unilateral (or one-sided)** and **bilateral (or two-sided)**

**bilateral:**

$$
Z[x(n)]=X(z)=\sum_{n=-\infty}^\infty x(n)z^{-n}
$$

**unilateral:**

$$
Z[x(n)]=X(z)=\sum_{n=0}^{\infty} x(n)z^{-n}
$$

where, z is a complex variable and it is given by:

$$
z=re^{j \omega}
$$

The unilateral or one-sided z-transform is very useful because we mostly deal with **causal sequences**. Also, it is mainly suited for **solving difference equations with initial conditions**.


# Fourier Pairs

[fourier_pairs.pdf](https://pinktalk.online/signal_processing/attachments/fourier_pairs.pdf)
# Reference

* [But what is the Fourier Transform? A visual introduction.](https://www.youtube.com/watch?v=spUNpyF58BY&t=614s)
* [But what is a Fourier series? From heat flow to drawing with circles | DE4](https://www.youtube.com/watch?v=r6sGWTCMz2k&t=531s)
* [傅里叶系列（一）傅里叶级数的推导](https://zhuanlan.zhihu.com/p/41455378)
* [The Discrete Fourier Transform (DFT)](https://www.youtube.com/watch?v=nl9TZanwbBk)
* [The Fast Fourier Transform (FFT): Most Ingenious Algorithm Ever?](https://www.youtube.com/watch?v=h7apO7q16V0)
* [Euler’s formula](https://www.notion.so/Euler-s-formula-d8e4462d5cda4e09a4ca4fcda7cd1392?pvs=21)