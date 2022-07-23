---
title: "04-computer-architecture"
aliases: 
tags: 
- cosc204
---


- tristate buffer [slide](https://i.imgur.com/2Kb419g.png)
- ![memory write](https://i.imgur.com/PExnbFm.png) [circuit simulator](https://tinyurl.com/2bmqovqz)
- ![memory read](https://i.imgur.com/GZwxuaA.png)

# Bus
- data bus
- address bus
- control bus

- conmmunicate between parts of the computer
- only one transmitter at a time
- only addressed device can respond
- 2 levels
	- internal
	- external

# Memory
- memory size is dependent on bus size
	- 2n bytes for n-lines on the address bus
		- 2^8=256B, 2^16=64KB, 2^32=4GB, 2^64=16EB

- flip flops are grouped into bytes (or larger)
	- each byte has an address
	- to write
		- present the address and the data
		- tell chip to write
	- to read
		- present the address
		- tell the chip to read
		- look at the data

## Static RAM (SRAM)
- memory made from flip flops is called static RAM
	- used mostly in CPU cache
	- or anywhere where only a small amount is needed
	- expensive

## Dynamic RAM (DRAM)
- made from capacitors
- used where large amount of RAM is needed
- slower than SRAM
- inexpensive

## Non-Volatile Memory
- often called ROM (read only memory)
	- can also be called PROM, EPROM, EEPROM, FLASH
- flash
	- uses floating-gate flash cells, not quite a transistor

# ALU
![](https://i.imgur.com/wLJhTSG.png)

- performs arithmetic
	- add, subtract, etc.
- logical operations
	- and, or, shift, etc
- subunits
	- lofical operations
	- addition
	- multiplication and dividion
	- shifting
	- comparison
	- logical tests (if, >0, <0, =0, <=0, etc)
	- 