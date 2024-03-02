---
title: Stability of Discrete System
tags:
  - signal-processing
  - basic
  - system
date: 2024-02-28
---
# 离散系统稳定性判别（因果系统）

## 时域充要条件

$$
\sum_{k=-\infty}^{\infty} |h(k)| < \infty
$$

**绝对可和**


## Z域充要条件

**$H(z)$收敛域包含单位圆** $\leftrightarrow$ $|P_j| < 1$ **极点都在单位圆内**


> [!tip] 
> Z域的充要条件表明了在时域上，随着时间，时域信号是衰减的，因此绝对可和 


# 收敛域 ROC, Region of convergence


$$
ROC = \{z:|\sum_{n=-\infty}^{\infty}x[n]z^{-n}| < \infty\}
$$

ROC是指Z变换的求和收敛的复平面上的点集。

## 因果的收敛域

### Example

$x[n]={0.5}^n\mu[n]$, 则

$$
\mathcal{Z}\{x[n]\} = \sum_{n=-\infty}^{\infty}x[n]z^{-n}=\sum_{n=0}^{\infty} (\frac{0.5}{z})^n = \frac{1}{1-0.5z^{-1}}
$$

最后一个等式来自无穷几何级数，而等式仅在 $|0.5z^{−1}| < 1$ 时成立，可以以 z 为变量写成 $|z| > 0.5$。因此，收敛域为 $|z| > 0.5$。在这种情况下，收敛域为复平面“挖掉”原点为中心的半径为 0.5 的圆盘。

![](signal_processing/basic_knowledge/attachments/Pasted%20image%2020240115112204.png)



# Reference

[_VK2.14-离散系统稳定性判据.Mp4 - Vk2.14-Discrete System Stability Is Judged .Mp4_. _www.youtube.com_, https://www.youtube.com/watch?v=1yM_Szmprtc. Accessed 15 Jan. 2024.](https://www.youtube.com/watch?v=1yM_Szmprtc)