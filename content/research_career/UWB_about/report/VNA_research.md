---
title: Vector Network Analysis - Review
tags:
  - UWB
---
# Brief Introduction

矢量网络分析仪（VNA）是一款用于高频通信设备性能测试和故障排除的矢量仪器。
# Working Theorem

*VNA通过向待测试设备（被测器件）发送射频信号，并测量信号在回传时的反射和传输特性来评估被测设备的性能*。VNA的核心部件是一对**方向耦合器**，分别连接信号源、接收器和待测设备。方向耦合器的作用是将发送信号和接收信号分开，确保信号不会直接从发送器到达接收器，以准确地测量信号的反射和传输特性。

![](research_career/attachments/Pasted%20image%2020230924222536.png)

![](research_career/attachments/Pasted%20image%2020230924223332.png)
## 反射参数和传输特性
$$
Γ = \frac{V_{reflected}}{V_{incident}} = \frac{Z_L - Z_0}{Z_L + Z_0}
$$

$$
T = \frac{V_{transmitted}}{V_{incident}}
$$

![](research_career/attachments/Pasted%20image%2020230924223700.png)


## Demo picture

![](research_career/attachments/Pasted%20image%2020230924223212.png)
# Key Parameters

1. 频率范围：VNA的频率范围决定了其能够测量的信号频率范围。不同的VNA具有不同的频率范围，用户需要根据需求选择适合的设备。
    
2. 功率范围：VNA的功率范围表示其可以测量的信号功率范围。不同的应用可能需要不同的功率范围，因此在选择VNA时需要考虑功率要求。
    
3. 分辨率带宽：VNA的分辨率带宽是指在频率域中每个测量点之间的频率间隔。较小的分辨率带宽可以提供更精确的测量结果，但需要更长的测量时间。
    
4. 动态范围：VNA的动态范围是指在测量过程中可以测量到的最大和最小信号功率之间的差值。较高的动态范围表示VNA可以测量较小的信号功率和较大的信号功率，这对于测量弱信号和强信号场景非常重要。
    
5. **S参数**：S参数是VNA最常用的一种测量参数，用于描述设备在不同端口之间的散射特性。S参数包括幅度和相位信息，可用于评估设备的匹配性、反射损耗、传输损耗等。
    
6. 噪声系数：VNA的噪声系数是指其在测量过程中引入的噪声对测量结果的影响程度。较低的噪声系数意味着VNA可以提供更准确和可靠的测量结果。


# What We need

* 有着ultra wide band的VNA
* UWB天线
* 可能需要的阻抗匹配的适配器

# Reference

* https://www.electronics-notes.com/articles/test-methods/rf-vector-network-analyzer-vna/what-is-a-vna.php
* https://zhuanlan.zhihu.com/p/509811532
* https://download.tek.com/document/85T_60918_0_Tek_VNA_PR_05.pdf