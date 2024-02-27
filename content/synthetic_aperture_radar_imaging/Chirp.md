---
title: Chirp - 啁啾
tags:
- basic
- signal
---

啁啾（Chirp）是指频率随时间而改变（增加或减少）的信号。其名称来源于这种信号听起来类似鸟鸣的啾声。

![](synthetic_aperture_radar_imaging/attachments/Linear-chirp.svg)

Chirp常常被用在sonar, radar, laser systems里。其中，为了能够测量长距离又保留时间的分辨率，雷达需要短时间的派冲波但是又要持续的发射信号，啁啾信号可以同时保留连续信号和脉冲的特性，因此被应用在雷达和声纳探测上。

# Definition

## 瞬时频率 (instantaneous angular frequency)


有一信号，$x(t)=A\sin{(\phi(t))}$，其瞬时角频率为
$$
\omega(t)=\frac{d\phi(t)}{dt}
$$
经适当归一化后得到瞬时频率
$$
f(t)=\frac{1}{2\pi}\frac{d\phi(t)}{dt}
$$

## 啁啾度

对前两式再求导，得到瞬时角频率的变化速率为**瞬时角啁啾度**(instantaneous angular chirpyness)

$$
\gamma(t)=\frac{d^2\phi(t)}{dt^2}
$$
类似有**瞬时（普通）啁啾度**(instantaneous ordinary chirpyness)

$$
c(t)=\frac{1}{2\pi}\gamma(t)=\frac{1}{2\pi}\frac{d^2\phi(t)}{dt^2}
$$
# Types

## Linear

![](synthetic_aperture_radar_imaging/attachments/Pasted%20image%2020230418110700.png)

啁啾的瞬时频率$f(t)$呈线性变化

$$f(t)=f_0 + ct$$
$$
c = \frac{f_1-f_0}{T}
$$

c是一个常值

Also，

$$
\phi(t)=\phi_0 + 2\pi \int_{0}^t f(\tau)d\tau =\phi_0 = 2\pi(\frac{c}{2}t^2 + f_0 t)
$$

相位为t的二次函数，从而可以继续推导出信号在time domain：

$$
x(t)=A \cos{(\phi_0 + 2\pi (\frac{c}{2}t^2 + f_0 t))}
$$

这种Linear Chirp信号也被称为二次相位讯号(**quadratic-phase signal**)

## Exponential

![](synthetic_aperture_radar_imaging/attachments/Pasted%20image%2020230418111708.png)

Exponential chirp，也叫geometric chirp，瞬时频率以指数变化，即$f(t_2)/f(t_1)$会是常数

signal frequency:

$$
f(t)=f_0 k^t
$$

$$
k = (\frac{f(T)}{f_0})^{\frac{1}{T}} = \text{constant}
$$

相位:

$$
\phi(t)=\phi_0 + 2\pi\int_0^t f(\tau)d\tau = \phi_0 + 2\pi f_0 (\frac{k^t - 1}{\ln(k)})
$$

time-domain:

$$
x(t) = \sin{[\phi_0 + 2\pi f_0(\frac{k^t - 1}{\ln(k)})]}
$$

## Hyperbolic

双曲线线性调频用于雷达应用，因为它们在被多普勒效应([Doppler Effect](Physics/Wave/Doppler_Effect.md))扭曲后显示出最大的匹配滤波器([Matched filter](https://en.wikipedia.org/wiki/Matched_filter))响应。

signal frequency:

$$
f(t) = \frac{f_0 f_1 T}{(f_0 - f_1)t + f_1T}
$$

Phase:

$$
\phi(t) = \phi_0 + 2\pi \int_0^t f(\tau)d\tau = \phi_0 + 2\pi \frac{-f_0f_1 T}{f_1 - f_0}\ln(1 - \frac{f_1-f_0}{f_1 T}t)
$$


time-domain:

$$
x(t) = \sin{[\phi_0 + 2\pi \frac{-f_0f_1 T}{f_1 - f_0}\ln(1 - \frac{f_1-f_0}{f_1 T}t)]}
$$

