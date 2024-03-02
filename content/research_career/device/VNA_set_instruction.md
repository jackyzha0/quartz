---
title: VNA simulate UWB echo signal setup
tags:
  - devices
  - hardware
  - VNA
  - UWB
date: 2024-01-27
---

# Step by Step (Simple Overview)

1. 连接天线到Port1, Port2
2. VNA背部连接电源，前面开机键开机
3. 点开桌面VNA应用
4. 设置以下参数:
	1. Sweep Setup:
		1. 扫描点数由201 -> 10001
	2. Simulation:
		1. Start Freq调节为100kHz
	3. Average:
		1. Factor从16调节成128
		2. Average Trigger —— off -> on
		3. Averaging —— off -> on
	4. Display
		1. Num of Trace从1调成2
		2. 返回root目录，点击蓝色的Trace2, 将S11调成S21
5. 准备开始测量，进入Trigger
	1. 模式选择continuous预热
	2. 选择single，等待指示灯熄灭
6. 点击save
	1. save Snp -> save S2P
