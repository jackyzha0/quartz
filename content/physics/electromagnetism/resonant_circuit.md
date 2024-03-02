---
title: Resonant circuit
tags:
- physics
- electric
date: 2023-06-30
---

以RLC串联电路为例

# 什么是谐振

电路中电容器$L$、电感器$C$两组件之能量相等，当能量由电路中某一电抗组件释出时，且另一电抗组件必吸收相同之能量，即此两电抗组件间会产生一能量脉动。

# 两种简单的谐振电路
![](synthetic_aperture_radar_imaging/attachments/Pasted%20image%2020230330160535.png)


以串联谐振为例

## *Resonant Frequency*

电容，电阻的[电抗](physics/electromagnetism/Basic/Electric_units.md#Electrical%20impedance)相同时发生谐振

$$
|X_C| = |\frac{1}{j2\pi fC}| = |X_L| = |j2\pi fL|
$$
Rearranging,

$$
f^2 =  \frac{1}{(2\pi)^2 C L}
$$

$$
f = \frac{1}{2\pi \sqrt{LC}}
$$

## 串联谐振特性

* 阻抗最小，且为纯电阻，$Z = R+jXL-jXC = R$ 

## **品质因子** ([*Q factor*](physics/electromagnetism/q_factor.md))

* 电感器或电容器在谐振时产生的电抗功率与电阻器消耗的平均功率之比，称为谐振时之品质因子。

$$Q=\frac{Q_L}{P}=\frac{I^2X_L}{I^2R}=\frac{Q_C}{P}=\frac{I^2X_C}{I^2R}=\frac{1}{R}\sqrt{\frac{L}{C}}=\frac{\sqrt{X_LX_C}}{R}$$

#### 阻抗与频率的关系

$Z = R + j(X_L-X_C)$
* 当$f＝f_r$时，$Z＝R$为最小值，电路为电阻性；
* 当$f＞f_r$时，$X_L＞X_C$为最小值，电路为电感性；
* 当$f＜f_r$时，$X_L＜X_C$为最小值，电路为电容性。
