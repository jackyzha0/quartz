---
title: Synthetic Aperture Radar (SAR) Explained
tags:
- SAR
- basic
date: 2023-11-30
---

# Radar Basic Concepts

## Down Looking vs. Side Looking

![Pasted image 20230320150424](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230320150424.png)

Down Looking不能区分距离一样的a，b点，一般只用于monitoring of air and naval traffic

## Simplified explanation of Radar working & What is SAR
The radar consists fundamentally of *a transmitter*, *a receiver*, *an antenna* and *an electronic system* to process and record the data.

The transmitter generates successive short bursts or pulses of microwave at regular intervals which are focused by the antenna into a beam. Radar beam illuminates the surface **obliquely** at a right angle to the motion of the platform. The antenna receives a portion of the transmitted energy reflected or it's known as backscattered from various objects within the illuminated beam by  measuring this time delay between the transmission of a pulse and the reception of the backscattered echo from different  targets. Their distance from the radar and therefore their location can be determined as the sensor platform *moves forward* recording and processing of the backscattered signals builds up a 2-dimensional image of the surface.


> [!important] 
> Important<br>
> The along track **resolution** is determined by the beam width which is *inversely proportional to the antenna length*, also known as the **aperture**, which means that longer antenna or a longer aperture will produce a narrow beam and a finer resolution. <br>
> Long antenna $\leftrightarrow$ Small beam $\leftrightarrow$ Long aperture $\leftrightarrow$ Better image resolution



### Why SAR
介于实际情况下的物理空间中，雷达天线的大小是限的，可以通过雷达的移动去模拟长天线情况下的雷达，也就是活得更大的aperture，这项被叫做SAR。目的是在于使用*comparatively small physical antennas*去获得*high resolution images*

--- 

![660](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230320163240.png)

* Radar can measure *amplitude* and *phase*
* Radar can only measure part of echoes.
* The strength of the reflected echo is the backscattering coefficient ([sigma nought](electrical_electronics/RF/algrothim/SAR/radiometric_calibration.md)）and is expressed in [decibels(dB)](signal/signal_processing/basic_knowledge/concept/what_is_dB.md)

## Radar Resolution

### Detail geometry

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230330153450.png)
<font size=1>**Fig** *Geometry of a side-looking real aperture radar. (SLAR)*</font>

side-looking的雷达被分为two types —— real aperture radar(*SLAR or SLR*, SL for side-looking)和synthetic aperture radar(SAR)

如上图所示，雷达发出的pulse被[antenna聚焦](electrical_electronics/RF/antenna.md)在一个narrow的area里，然后scatter后在不同和的时间再被receiver接收

### Resolution

当我们谈SAR的分辨率时，我们要知道有四种operating modes对于SAR而言。

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230418103211.png)

* Stripmap SAR
* Spotlight SAR
* Circular SAR
* Scan SAR

其中Stripmap SAR, Spotlight SAR,  Circular SAR这三种最为常用

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230414105501.png)

Stripmap SAR是将antenna固定在platform，以straight line方式移动并连续接发pulse，它的优势是可以cover large area。

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230414105703.png)

Spotlight SAR天线不断移动以照射同一区域，它的特点是high-resolution image，因为它从不同的角度收集同一区域的data

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230414110025.png)

Circular SAR通过circular trajectory窥探同一片area，它跟spotlight SAR很像，区别在于Spotlight mode里antenna是不动的，只有平台在移动，而在circular mode里，antenna也在移动，来收集$360^\circ$信息，circular SAR的分辨率计算时，认为反射是$360^\circ$各向同性反射，所以是理论分辨率。

我在UWB radar探测烧伤的技术中将采用Spotlight SAR


#### Range Resolution & Azimuth Resolution

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230414111329.png)

这是一张可以快速check概念的图

Table. *Range and azimuth resolution*
|               | Range Resolution                             | Azimuth Resolution                                     |
| ------------- | -------------------------------------------- | ------------------------------------------------------ |
| Stripmap SAR  | $\Delta_r = \frac{c\pi}{2\omega_0}$          | $\Delta_a = \frac{D_y}{2}$                             |
| Spotlight SAR | $\Delta_r = \frac{c\pi}{2\omega_0}$          | $\Delta_a=\frac{r_n\lambda_c}{4L \cos \theta_n(0)}$    |
| Circular SAR  | $\Delta_r = \frac{\pi}{\rho_max - \rho_min}$ | $\Delta_a=\frac{\pi}{2k_c \cos{\theta_z}\sin{\phi_0}}$ |

* $\omega_0$ radar signal half-bandwidth in radians
* $D_y$ the diameter of the radar in azimuth domain
* $r_n$ the target radical distance from the center of aperture
* $\lambda_c = \frac{2c\pi}{\omega_c}$ the wavelength at carrier fast-time frequency
* $\omega_c$ the central frequency
* $L$ half-size of the aperture
* $\theta_n(0)$ the aspect angle of the $n$th target when radar is at (0, 0)
* $\rho_{max}$ and $\rho_{min}$ the maximum and minimum polar radius in spatial frequency domain for the support of a target at the center of the spotlight area
* $k_c$ the wavenumber at carrier frequency
* $\theta_z$ the average depression angle of the target area
* $\phi_0$ the polar angle in spatial frequency domain 

## Radar Image Format

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230509140819.png)

## Radar Key Parameters
* Wave Length
* Polarization
* Incidence Angle

### Wave Length

![](electrical_electronics/RF/algrothim/SAR/attachments/Pasted%20image%2020230330153007.png)

雷达数据的空间分辨率与传感器波长与传感器天线长度之比直接相关。 对于给定的波长，天线越长，空间分辨率越高。 对于以大约 5 cm 波长运行的太空卫星（C 波段雷达），为了获得 10 m 的空间分辨率，您需要一个大约 4,250 m 长的雷达天线。 （超过 47 个足球场！）



# Reference

* [Theory of Synthetic Aperture Radar (uzh.ch)](https://www.geo.uzh.ch/~fpaul/sar_theory.html)
* ***Sentinel-1** is a famous SAR, you can find almost every definitions* of SAR in this page:
[User Guides - Sentinel-1 SAR - Definitions - Sentinel Online - Sentinel Online (esa.int)](https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar/definitions)
* [SAR(Synthetic Aperture Radar)基础(一) - 知乎 (评论区说这个有错)](https://zhuanlan.zhihu.com/p/98053986)
* [A Review of Synthetic-Aperture Radar Image Formation Algorithms and Implementations: A Computational Perspective]([Remote Sensing | Free Full-Text | A Review of Synthetic-Aperture Radar Image Formation Algorithms and Implementations: A Computational Perspective (mdpi.com)](https://www.mdpi.com/2072-4292/14/5/1258))
