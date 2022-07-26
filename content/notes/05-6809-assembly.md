---
title: "05-6809-assembly"
aliases: 
tags: 
- lecture
- cosc204
---


# Warnings
- different CPU architectures have their own machine codes and their own assembly languages
- assembly language programs are **not** portable across CPU architectures (e.g., 6809 to x86 ARM) but are often backwards compatible (e.g., x86_64 family)

# Working up
- High level languages
	- ↓ Compiler ↓
- Assembly language
	- ↓ Assembler ↓
- Machine code
	- ↓ Instruction Set ↓
- Hardware

# Motorola MC6809 CPU
- 6809 (1978) 9000 transistors
- Apple M1 Ultra (2022) 114,000,000,000 transistors

![Image of 6809 CPU chip](https://i.imgur.com/DuKNuX1.png)

# Machine Code
- Computers are controlled by bit-patterns. 
- These patterns determine what the CPU does and to which memory location
	- Assign values to registers
	- load registers from memory
	- add numbers to registers
	- store registers in memory
	- and so on
- This is called machine code

It is not very easy to programm this way
- slow
- not human readable
- difficult to debug
- etc

To make the process easier, we assign names to the numbers. This allows us to program symbolically. We call this assembly language programming

## Programmer's Model

The programmer's model of a computer is not the same as the hardware model. The hardware makes the computer look a par

## 6502 Fibonacci in Machine Code

Example program:

- 4C 13 00 00 00 00 00 00 
- 00 00 00 00 00 00 00 00 
- 00 00 00 A2 10 A9 01 8D 
- 10 00 8D 11 00 8D 12 00 
- A9 31 8D 0F 00 8D 0F 00 
- AD 10 00 6D 11 00 8D 12 
- 00 69 30 8D 0F 00 AD 11 
- 00 8D 10 00 AD 12 00 8D 
- 11 00 CA D0 E3

[visualisation of comuter](http://www.visual6502.org/JSSim/expert.html?loglevel=0&a=0000&d=4C130000000000000000000000000000000000A210A9018D10008D11008D1200A9318D0F008D0F00AD10006D11008D120069308D0F00AD11008D1000AD12008D1100CAD0E3)


