---
title: Electric Units
tags:
- ciruit
- basic
- physics
- electric
date: 2024-02-28
---
# Electrical impedance

$$
Z = \sqrt{R^2 + {(X_L-X_C)}^2}
$$


* $Z$ = impedance
* $R$ = resistance
* $X_L$  = inductive reactance
* $X_C$  = capacitive reactance

![](physics/electromagnetism/Basic/attachments/Pasted%20image%2020230330163734.png)

**阻抗**是电路中电阻、电感、电容对交流电的阻碍作用的统称。阻抗是一个复数，实部称为**电阻**，虚部称为**电抗**；其中电容在电路中对交流电所起的阻碍作用称为**容抗**，电感在电路中对交流电所起的阻碍作用称为**感抗**，容抗和感抗合称为**电抗**。

阻抗将电阻的概念加以延伸至交流电路领域，不仅描述*电压与电流的相对振幅*，也描述其*相对相位*。当通过电路的电流是直流电时，电阻与阻抗相等，电阻可以视为相位为零的阻抗。

## 形式

1. $R+jX$
2. $Z_m\angle\theta$
3. $Z_m e^{j\theta}$

阻抗定义为电压与电流的频域比率。阻抗的大小$Z_{m}$ 是电压振幅与电流振幅的绝对值比率，阻抗的相位 $\theta$是电压与电流的相位差。

## 欧姆定律

$$
v = iZ = iZ_m e^{j\theta}
$$

阻抗大小$Z_m$的作用恰巧就像电阻，设定电流$i$，就可以计算出阻抗$Z$两端的电压降$v$。相位因子$e^{j\theta}$则是电流滞后于电压的相位差$\theta$ 

> [!tip] 
> 在时域中，电流信号会比电压信号慢$\theta T/2\pi$秒

## 理想的阻抗
$$
Z_R = R
$$

$$
Z_C = \frac{1}{j\omega C}
$$

$$
Z_L = j \omega L
$$

* 对于电容，交流电压滞后90°于交流电流；
* 对于电感，交流电压超前90°于交流电流

### 容抗

$$
X_C = -j/\omega C
$$
随着$\omega$趋向于0，电源趋向于直流电源，容抗的绝对值趋向于无穷；*因此，在低频率运作时，电容器貌似断路。假设电源的频率越高，则容抗越低，对于电流通过的阻碍也越低。在高频率运作时，电容器貌似短路。*

### 阻抗

$$
X_L = j\omega L
$$
从这方程可以观察到，当交流电源的角频率趋向于零时，电源会趋向于直流电源，感抗会趋向于零，对于电流的通过阻碍越低。*所以，在低频率运作时，电感器貌似短路。假设电源角频率越高，则感抗越高，假设给定电压源振幅，则电流会趋向于零。所以，在高频率运作时，电感器貌似断路。*


# Reference

[电气单位（V，A，Ω，W，...） (rapidtables.org)](https://www.rapidtables.org/zh-CN/electric/Electric_units.html)
