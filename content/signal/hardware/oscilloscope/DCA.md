---
title: Digital Sampling Oscilloscope or Digital Communication Analyzer
tags:
  - advanced
  - hardware
  - devices
date: 2024-05-14
---
# Overview for DCA


![](signal/hardware/attachments/Pasted%20image%2020240514162309.png)

这是一个很好的例子，用记录自行车车轮旋转来理解Real-time示波器和采样示波器的区别。

我们想来记录自行车车轮的旋转，以每旋转一度为单位捕捉车轮的全部旋转过程。

方法一是使用帧率非超高的录像机，其速度足以在单次旋转的时间内捕捉 360 幅图像。使用这种方法，您可以在看到车轮转动一次后捕捉到所有独特的角度位置。

方法二是使用一台相机，它一次只能拍一张照片，不过这台相机可以进行编程，使其在发出信号后的特定时间内拍摄图像。因此又能力去编程每转360°后去拍摄一张照片，这样就可以每转一圈拍摄 1°、2°、3°... 的照片。再拍摄360张照片后，可以将它们按顺序排列在一起，制作出整个旋转过程的动画。


# Key Differences for DCA

## Viewing Waveforms

![](signal/hardware/attachments/Pasted%20image%2020240514164651.png)
*A real-time oscilloscope uses an internal sample clock and stores the data sampled before and after the trigger signal.*

对于Real-Time示波器，有一个独立于采集信号的内部采样时钟。其采样速度比采集信号更快，根据采样定理可以有效地捕捉到input signal的各种细节，同时可以决定何时开始采集。同时，因为触发可以基于任意标准，如voltage level或者其他什么模式，可以为调试带来更大的灵活性。同时还允许collect pre-trigger samples，为我们了解事件前后的信号行为。



# Reference

* https://www.keysight.com/blogs/en/tech/bench/2022/05/09/real-time-vs-sampling-oscilloscopes-what-are-the-differences
* https://www.youtube.com/watch?v=j2vch6wAddc