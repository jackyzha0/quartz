---
title: Modulation transfer function(MTF) Curve
tags:
- photography
- basic
- lens
date: 2024-02-28
---

有很多因素影响lens performance：

* diffraction
* optical aberrations
* design criteria and philosophy
* manufacturing tolerances and errors

一般，可以用MTF Curve来作为一个标准来衡量lens performance

> [!abstract] 
> 本篇笔记会从摄影角度浅浅了解MTF曲线，而不从物理光学角度分析 

# What is MTF Curve


调制传递函数 (MTF) 曲线是一种信息密集型指标(information-dense metric)，反映了镜头如何*将对比度再现为空间频率（分辨率）的函数*。MTF Curve在一组设定好的基础参数下，提供一个composite view，关于光学像差([**optical aberrations**](physics/optical/optical_abberation.md))如何影响镜头性能。

通过MTF图，我们可以知道

1. 分辨率, (*代表着镜头对细节的表现能力*)
2. 对比度, (*代表着镜头表现光线亮和暗的能力*)
3. 色散和横向色差
4. 像场弯曲

不可以知道：

1. 镜头畸变
2. 径向色差
3. 晕影
4. 眩光

# How to measure MTF Curve

大家应该知道，一个镜头的中心比边缘成像能力要好很多，因此只测试镜头的中心或边缘，是不能代表镜头的好坏的，所以厂家会从中心到边缘，选取多个点进行测试。如下图，尼康的全画幅机器，选取了距离中心5毫米，10mm，15mm，20mm的点测试。如果是APS-C画幅，因为感光元件小，会选取3mm，6mm，9mm，12mm等，不同厂家可能不一样。

![](photography/basic/attachments/Pasted%20image%2020230424143258.png)

测试方法一般使用白色背景、黑色直线

![](photography/basic/attachments/Pasted%20image%2020230424143425.png)

* **粗线**用来测试**对比度**，粗度为 10 lines/mm
* **细线**用来测试**分辨率**，粗度为 30 lines/mm
* 粗细各有两组，一组与半径平行，叫做Sagittal，另一组与半径垂直，叫做Meridonial，这样做主要是为了测试**色散**和**色差**的。

下图的成像质量是越来越差：

![](photography/basic/attachments/Pasted%20image%2020230424143543.png)

# How to read MTF curve

![](photography/basic/attachments/Pasted%20image%2020230424143711.png)

横坐标代表了到镜头中心的距离，纵坐标代表了对比度和分辨率的值。

最完美的镜头的曲线应该是下面这样的，一条红线一条蓝线，

红线是通过**粗线**测试得到的，代表**对比度**；

蓝线是通过**细线**测试得到的，代表**分辨率**。

![](photography/basic/attachments/Pasted%20image%2020230424143940.png)

普通的镜头的曲线应该是下面这样的(红线代表对比度，蓝线代表分辨率)，在中心点，镜头的对比度和分辨率最好，越往边缘越差。

一般来讲，值大于0.9就代表镜头非常优秀，0.7-0.9是优秀，0.5-0.7就是普通，低于0.5就算差了。

注意到线的中级部位有呈波浪状，这表明了镜头的另一个参数素质：像场弯曲(curvature of field)\

有波浪就代表有像场弯曲，越大就越严重，实际情况一般问题不大。

![](photography/basic/attachments/Pasted%20image%2020230424144046.png)

最常见的MTF曲线如图：

![](photography/basic/attachments/Pasted%20image%2020230424144112.png)

1. 红线，10lines/mm，也就是上面测试时说的粗线，用来测对比度的，从镜头中心到边缘，数值逐渐降低，表明镜头的对比度从镜头到边缘，逐渐降低。
2. 分辨率，从中心到边缘逐渐降低
3. 色散和色差
	* 测试时粗细都有两组线吗，一组与半径平行，另一组垂直，用来测试色散和色差，这样就分别得到两条线，与半径平行的一组得到实线，与半径垂直的一组得到虚线。**虚线实线越接近，代表镜头的色散和色差控制的很好，越背离，表示越严重**。
4. 像场弯曲

# Reference

* [The Modulation Transfer Function (MTF), https://www.edmundoptics.com](https://www.edmundoptics.com/knowledge-center/application-notes/imaging/modulation-transfer-function-mtf-and-mtf-curves/)
* [MTF 曲线图应该怎么看？, 知乎](https://www.zhihu.com/question/19713211)