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

# Control unit
![](https://i.imgur.com/bQ4eA94.png)

- coordinates the operation of the computer
- generates control signals
	- connect registers to the bus
	- control the function of the ALU
	- provides timing signals to the system

allso associated with the decoding and executuion of instructions in a pipelined system

# Registers
![](https://i.imgur.com/32rVBFW.png)

- memory cells with names
- hold data, instructions, or CPU status
- various sizes, (8, 16, 32, or 64, or larger (512))
- hold data typically the same width as memory words
- registers for accessing memory typically the same with as the address bus

Special purpose registers
- program counter
	- stores address of current instruction
- accumulator
	- source of one of the operands
	- destination of the result
- status flags
	- individaul bits store information about results of operations
		- result of last instruction was negative, zero, or postive
		- carry from most recent arithmetic operation
		- overflow occurred during the last instruction

# CPU
![](https://i.imgur.com/NxDLkuN.png)

# Computer
![](https://i.imgur.com/DSa47Jy.png)

# Instructions
- bit patterns
- can be split into a number of fields
	- operation to be executed
	- the address in memory
	- which registers (or memory cells) to use as operands
	- where to place the result (registers or memory)

# Stored program computer
![](https://i.imgur.com/wxSfxiO.png)

# Von Neumann Architecture
- three key concepts
	- data and instructions are stored in a single read-write memory
	- contents of memory are addressable by location, without regard to the type of data contained
	- execution occurs in a sequential fashion, unless explicitly altered, from one instuction to the next
	- 