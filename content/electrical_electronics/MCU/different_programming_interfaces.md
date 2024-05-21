---
title: Different Programming Interfaces
tags:
  - hardware
date: 2024-02-28
---
# What is programming interfaces in MCU

A **programming interface** is a device that allows a programmer to connect to a microcontroller (MCU) and program it. The programming interface is used to load the program into the MCU’s memory and debug it.

# Different types of programming interfaces in MCU
Chipmakers have different names for programming interfaces that all basically do the same thing:
-   ISP - programming interface for Atmel (now Microchip) AVRs. SPI-like (MISO, MOSI, SCK, reset). It can be used for flash programming and debugging.
-   PDI - newer programming interface for Atmel AVRs (eg. Xmega). Uses two wires (data and clock). Can do the same as ISP.
-   DebugWire - yet another interface from Atmel (this one uses only a single wire)
-   ICSP - programming interface for Microchip PIC line of MCUs
-   SWD - Serial Wire Debug - programming interface for MCUs with ARM Cortex-M cores (uses two wires - data and clock)
-   JTAG - very generic term, SPI-like interface used for [boundary scan](https://en.wikipedia.org/wiki/Boundary_scan), can also be used for programming/debugging MCUs (almost every vendor has its own protocol, so Cortex-M JTAG is not the same as AVR JTAG or Blackfin JTAG)
-   Spy-Bi-Wire - yet another two wire programming interface, this one is for TI's MSP430 MCUs

## SWD 和 JTAG的区别

目前在使用的st link可以使用SWD和JTAG这两种debugger去调试stm32，所以这两种方式的区别令人比较在意；
* JTAG（Joint Test Action Group，联合测试行动小组）是一种国际标准测试协议，主要用于芯片内部测试。现在多数的高级器件都支持JTAG协议，如ARM、DSP、FPGA器件等。JTAG调试接口必须使用VCC、GND电源信号，以及TMS、TCK、TDI、TDO四根调试信号，可选TRST、RESET复位信号和RTCK（同步时钟）信号。
	* TMS(Test Mode Select)：模式选择，TMS用来设置JTAG接口处于某种特定的测试模式；
	* TCK(Test Clock)：时钟输入；
	* TDI(Test Data Input)：数据输入，数据通过TDI引脚输入JTAG接口；
	* TDO(Test Data Output)：数据输出，数据通过TDO引脚从JTAG接口输出；
* 串行调试（Serial Wire Debug），是一种和JTAG不同的调试模式，使用的调试协议也不一样，所以最直接的体现在调试接口上，与JTAG的20个引脚相比，SWD只需要4个（或者5个）引脚，结构简单，但是使用范围没有JTAG广泛，主流调试器上也是后来才加的SWD调试模式。
	* SWDIO：串行数据输入输出，作为仿真信号的双向数据信号线，建议上拉；
	* SWCLK：串行时钟输入，作为仿真信号的时钟信号线，建议下拉；
	* SWO：串行数据输出引脚，CPU调试接口可通过SWO引脚输出一些调试信息。该引脚是可选的；
	* RESET：仿真器输出至目标CPU的系统复位信号，该引脚也为可选

* SWD模式比JTAG在高速模式下面更加可靠。在大数据量的情况下面JTAG下载程序会失败，但是SWD发生的几率会小很多。*基本使用JTAG仿真模式的情况下是可以直接使用SWD模式的，只要你的仿真器支持。*
* 在GPIO刚好缺一个的时候，可以使用SWD仿真，这种模式支持更少的引脚。


* 同时JTAG调试版本不同的情况下：
	* JTAGV6 需要的硬件接口为: GND, RST, SWDIO, SWDCLK；
	* JTAGV7 需要的硬件接口为: GND, RST, SWDIO, SWDCLK，相对V6， 其速度有了明显的提高，速度是 JTAGV6 的 6 倍。 
	* JTAGV8 需要的硬件接口为: VCC, GND, RST, SWDIO, SWDCLK，速度可以到 10M。



# Reference

[JTAG, SWD, EDBG, ICSP, ISP terms - Electrical Engineering Stack Exchange](https://electronics.stackexchange.com/questions/412029/jtag-swd-edbg-icsp-isp-terms)

[jtag和swd的区别_jtag和swd区别_耶稣赞我萌的博客-CSDN博客](https://blog.csdn.net/yym6789/article/details/88721409)

[STM32的JTAG和SWD模式_学术马的博客-CSDN博客](https://blog.csdn.net/w1050321758/article/details/108663603)
