---
title: Oscilloscope basic knowledge
tags:
  - signal-processing
  - devices
date: 2024-11-04
---
# Classification

* Analog Oscilloscope
* Digital Oscilloscope

# Analog Oscilloscope

## Principle

An oscilloscope is a testing and measurement instrument that can display the dynamic waveform of voltage signals. Convert the time-varying voltage signal into a curve in the time domain, so that the invisible electrical signal transformed into an intuitive visible light signal in the two-dimensional plane. By inputting the signal to be tested into the input terminal, the variation of the electrical signal over time (amplitude, frequency, phase*) can be analyzed. More advanced oscilloscopes can even analyze the frequency spectrum of the input time signal, reflecting the frequency domain characteristics of the input signal.

In analog oscilloscopes, the CRT is the main component. Like the figure:

![](signal_processing/device_and_components/oscilloscope/attachments/Pasted%20image%2020240412115407.png)

The vertical system is responsible for sending the main image to the vertical deflection plate of the CRT. Vertical systems amplify or attenuate input signals. The horizontal system is responsible for the movement of the electron beam from left to right. Trigger the system determines when to draw the waveform on the CRT.

The Z-axis circuit below is in charge of brightness control of the electron beam.

Let's see the vertical subsystem of the oscilloscope. The basic form of an analog oscillsocpe consists of an attenuator, preamplifier, delay line, and main amplifier. Like the figure:

![](signal_processing/device_and_components/oscilloscope/attachments/Pasted%20image%2020240412115836.png)

* **Attenuator**: attenuating the input signal and allows for AC or DC coupling.
	* 直接输入的信号可能超过示波器屏幕显示范围，因此通过衰减器降低信号幅度；衰减器通过**Partial Attenuation(部分衰竭)** 来保持信号的细节和波形特征
	* AC/DC coupling
		* 耦合是指信号从输入到示波器内部电路的传输方式
		* AC耦合（交流耦合）意味着只有信号的交流部分（即变化的部分）被传递到示波器的输入，而直流部分（DC成分）则被阻断。这样做的目的是为了观察信号的交流变化，特别是在不需要观察信号的直流偏置时。
		* DC耦合（直流耦合）则允许信号的直流部分和交流部分都通过示波器的输入。这在需要观察信号的绝对电压水平或直流偏置时非常有用。
* **Pre-Amp**: 初步放大微弱信号，提高示波器对于小信号的灵敏度
* **Delay Line**: 延迟线将输入信号的高频分量延迟一段时间，以改善示波器的**频率响应**和**带宽**。
	* 示波器在处理高频信号时，由于电路的物理特性和设计限制，可能会出现频率响应不均匀的情况，即对不同频率的信号放大程度不同。
	* 延时线通过对高频信号分量进行延时，可以补偿这些高频信号在示波器内部电路中传播时的相位延迟，从而使得示波器对整个频率范围内的信号都能提供均匀的放大，改善频率响应。

* **Horizontal subsystem** as figure:
	* The horizontal signal system provides a **deflection voltage** to the horizontal plate to move the electron beam horizontally. For this purpose, the scanning generator circuit generates sawtooth (or ramp) signals to control the scanning rate of the beam. The sawtooth or ramp signal rises linearly and can measure the time between two events. The scanning generator is calibrated in a timely manner, hence it is also known as a **time base**.

![](signal_processing/device_and_components/oscilloscope/attachments/Pasted%20image%2020240412153613.png)

* **Trigger system** as figure:
	* The trigger system determines the time when the oscilloscope draws the waveform on the screen.

![](signal_processing/device_and_components/oscilloscope/attachments/Pasted%20image%2020240412154021.png)

显像管屏幕内部涂有磷，因此当电子与之碰撞时，屏幕就会发光。水平系统负责将光束从左向右移动。当光束到达屏幕的最右侧时，它会迅速返回左侧，重新开始这个过程。这个过程称为扫描（或跟踪或扫描）。

垂直系统负责垂直移动光束。示波器的触发系统确保波形跟踪始终从屏幕上的同一点开始。


# Digital Storage Oscilloscope 

## Principle

![](signal_processing/device_and_components/oscilloscope/attachments/Pasted%20image%2020240412154704.png)



# Reference

* https://www.linkedin.com/pulse/working-principle-indicators-oscilloscope-1-na-wang-6pkmc/
* https://zhuanlan.zhihu.com/p/672667254
* https://zhuanlan.zhihu.com/p/393063086