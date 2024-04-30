---
title: Learn VNA in practical way
tags:
  - devices
  - signal-processing
date: 2023-11-30
---

# Background

About what is VNA: [VNA Research](research_career/UWB_about/report/VNA_research.md)

# Step by Step Learn VNA using LiteVNA

## Calibration

### Type of Calibration

1. Reference Calibration

	基准校准是通过标准的开路、短路和负载器（Load）标准件来进行校准；因为这些标准件已经知道它们的[S参数](signal/signal_processing/basic_knowledge/concept/scattering_parameters.md)响应，因此可以用来校准

	在LiteVNA产品中，
	* 中间没有内针的为开路校准件  
	* 中间有内针但是内针周边为黄色金属填充的为短路校准件  
	* 中间有内针但是内针周边为白色填充的为标准50欧姆校准件

2. Insertion Loss Calibration

	这个步骤涉及使用已知的插入损耗标准件，通常是一段特定长度的电缆。NanoVNA测量这个标准件的响应，并使用它来校准插入损耗。这有助于确保NanoVNA在测量传输系数（S21）时考虑到了电缆等元件的损耗。

3. **Short-Open-Load-Thru Calibration**
	SOLT校准是一种综合的校准方法，结合了基准校准和插入损耗校准。在这种校准中，短路（Short）、开路（Open）、负载（Load）以及参考标准件（Thru）都用于校准系统。NanoVNA测量这些标准件，并使用它们来校准系统以消除误差。

	我们所使用的LiteVNA就是通过这种方法进行校准的
	
4.  Return Loss Calibration
	这个校准步骤用于测量端口的回传损耗（Return Loss）。通常，你需要连接一个回传损耗标准负载到NanoVNA的端口，然后测量其回传损耗。NanoVNA可以使用这个信息来校准测量反射系数（S11）。

### Procedures

使用SOLT Calibration校准法

1. 链接开路校准件至PORT1，点击`开路`项
2. 链接短路校准件至PORT1，点击`短路`项
3. 链接50欧姆校准件至PORT1，点击`负载`项
4. 链接50欧姆校准件至PORT1，点击`隔离`项
5. 对接线链接PORT1与PORT2，点击`直通`项

### Verify Calibration

可以使用[Smith Graph](signal/signal_processing/basic_knowledge/concept/smith_graph.md)来验证我们的Calibration

开路状态下，Smith Graph的标记点应该在电阻线的最右端，表明阻抗无限大，且表现出纯电阻性

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231007162754.png)

PORT1链接短路校准件，查看史密斯图标记点应该在史密斯图上电阻线的最左端(阻抗为0，并且表现纯电阻性)。

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231007162817.png)

PORT1链接50欧姆校准件，查看史密斯图标记点应该在史密斯图上电阻线的中心(阻抗为50欧姆，并且表现纯电阻性)。

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231007162826.png)


链接一根可以确认阻抗与谐振都正常的天线（可以把一根天线定位对照组并妥善保管），可以通过拨轮移动标记点至[驻波比](signal/signal_processing/basic_knowledge/concept/SWR.md)最低点，并同步观察该频率在史密斯图上的点是否在正中心（或者无限接近中心）。同时可以看屏幕最上面的参数，如图显示，我的这条对照天线最好的驻波比为1.021，此时对应的频率2.455GHz，史密斯图中阻抗为50.72Ω+j748mΩ

![](signal/signal_processing/device_and_components/attachments/Pasted%20image%2020231007162914.png)

### 

# Reference

* [_【RF专题研习】LiteVNA(网络分析仪)的初次使用与校准 - 野驴实验室_. https://blog.yelvlab.cn/archives/667/. Accessed 7 Oct. 2023.](https://blog.yelvlab.cn/archives/667/)


