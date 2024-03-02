---
title: Q factor
tags:
- physics
- electric
- electromagnetism
- basic
date: 2023-04-04
---

# Explanation

In physics and engineering, the quality factor or Q factor is a **dimensionless** parameter that describes how **underdamped** an oscillator or *resonator* is. It is defined as the ratio of the initial energy stored in the resonator to the *energy lost* in one radian of the cycle of oscillation. Q factor is alternatively defined as the ratio of a *resonator's center frequency to its bandwidth* when subject to an oscillating driving force. These two definitions give *numerically similar*, but not identical, results. 

> [!tip] 
>  高Q因子表示振子能量损失的速率较慢，振动可持续较长的时间; 单摆在空气中Q因子较高而在油中较低



![](physics/electromagnetism/attachments/Pasted%20image%2020230404144801.png)<font size=1>Fig. A damped oscillation. A low Q factor – about 5 here – means the oscillation dies out rapidly.</font>


Q因子较高的振子在共振时，在共振频率附近的**振幅较大**，但会产生的共振的**频率范围比较小**，此频率范围可以称为频宽。

例如一台无线电接收器内的调谐电路Q因子较高，要调整接收器对准一特定频率会比较困难，但其选择性较好，在过滤频谱上邻近电台的讯号上也有较佳的效果。

系统的Q因子可能会随著应用场合及需求的不同而有大幅的差异。*强调阻尼特性的系统*（例如[防止门突然关闭的阻尼器](warehouse/dampers_keeping_a_door_from_slamming%20shut.md)）*其Q因子为1⁄2*，而时钟、雷射或是其他需要强烈共振或是要求频率稳定性的系统其Q因子也较高。音叉的Q因子大约为1000，原子钟、加速器中的超导射频或是光学共振腔的Q因子可以到$10^{11}$

> [!help] 
>  There are many *alternative quantities* used by physicists and engineers to describe how damped an oscillator is. Important examples include: the [damping ratio](https://en.wikipedia.org/wiki/Damping_ratio "Damping ratio"), [relative bandwidth](https://en.wikipedia.org/wiki/Bandwidth_(signal_processing) "Bandwidth (signal processing)"), [linewidth](https://en.wikipedia.org/wiki/Oscillator_linewidth "Oscillator linewidth") and bandwidth measured in [octaves](https://en.wikipedia.org/wiki/Octave_(electronics) "Octave (electronics)").


# Definition

![](physics/electromagnetism/attachments/Pasted%20image%2020230404151254.png)

<font size=1>Fig. 一阻尼谐振子的频宽, $\Delta f$可以用频率和能量的图来表示。阻尼谐振子（或滤波器）的Q因子为$f_{0}/\Delta f$。Q因子越大，其波峰高度会越高，而其宽度会越窄</font>

In the context of resonators, there are two common definitions for Q, which aren't exactly equivalent. They become approximately equivalent *as Q becomes larger*, meaning the resonator becomes less damped.

## Bandwidth definition

$$Q\stackrel{def}{=}\frac{f_r}{\Delta f}=\frac{\omega_r}{\Delta \omega}$$

$f_r$为共振频率，$\Delta f$为频宽，一般是 [full width at half maximum](https://en.wikipedia.org/wiki/Full_width_at_half_maximum "Full width at half maximum") (FWHM)

## Stored energy definition

Q因子可定义为在一系统的共振频率下，当信号振幅不随时间变化时，**系统储存能量和每个周期外界所提供能量的比例**（此时系统储存能量也不随时间变化）

$$Q = 2\pi \times \frac{\text{Energy Stored}}{\text{Energy dissipated per cycle}}=2\pi f_r \times \frac{\text{Energy Stored}}{\text{Power Loss}}$$

同时在像电感等储能元件的规格中，会用到和频率有关的Q因子，其定义如下

$$Q(\omega) = \omega \times \frac{\text{Maximum Energy Stored}}{\text{Power Loss}}$$

其中$\omega$是计算储存能量和功率损失时的角频率


# Reference

* [Q factor in  wiki](https://en.wikipedia.org/wiki/Q_factor)
* [品质因子](https://zh.wikipedia.org/zh-hans/%E5%93%81%E8%B3%AA%E5%9B%A0%E5%AD%90#:~:text=%E5%93%81%E8%B4%A8%E5%9B%A0%E5%AD%90%E6%88%96Q%E5%9B%A0%E5%AD%90,%E6%91%86Q%E5%9B%A0%E5%AD%90%E8%BE%83%E4%BD%8E%E3%80%82)