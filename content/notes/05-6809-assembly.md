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

The programmer's model of a computer is not the same as the hardware model. The hardware makes the computer look a particular way to the programmer
- e.g., your computer could have several memory chips in it, but it looks like one continuous block of memory

## 6809 Memory
- 64KB memory
	- called *memory space* or *address space*
- each byte in numbered from $0000 to $FFFF
	- $ means hex (base 16)
	- for our purposes, all memory locations exist
	- so the computer memory is just an array
		- `unsigned char memory[65536]`
	- the 6809 memory is conceptually broken into **pages** of 256 bytes each
	- the first page is called zero page ( all address are of the form $00xx)
	- the second page is called page 1 ($01xx)
	- and so on

## 6809 Registers

![6809 registers table](https://i.imgur.com/Icvj7BJ.png)

- Registers are like global variables
- some are general purpose (X, Y)
- some are broken down like a `struct` or `union`
	- D is made u of A and B
	- Write to A or B and D changes
	- Write a 16 bit value to D
		- Read each byte usinig A or B
- some have special meaning
	- DP - direct page register, can beused to make instuctons that refer to the same memory page faster
	- PC - the program counter, stores the location of the instruction that is currently being executed
	- S - system stack pointer is just an index into the byte array we call memory [diagram](https://i.imgur.com/vImSjAJ.png)
		- e.g., we can say `lds #$BCD7` - `S=0xBCD7`
		- it's more useful to say `pshs a` - `memory[--S]=A`
		- or `puls a` - `A = memory[S==]`
		- this is why we call it a stack pointer
	- U - user stack pointer, like S but used for in routine (function) calls to 
	- CC - condition codes, hold information about the result of previous operations
		- E - Entire
		- F - FIRQ mask (on 1)
		- H - half carry
		- I - IRQ mask (on 1)
		- N - negative
		- Z - zero
		- V - overflow
		- C - carry (ripple carry adder pushes and pulls carry from here)

## Instruction Set
- Determined by the CPU designers
- instructions consist of one or more fields
	- the mnemonic **opcode**
		- e.g., return from subroutine (`rts`)
	- and (optionally) parameters called **operands**
		- e.g., GOTO (`bra more`)
	- instuctionsare often of different lengths
		- `rts` one byte on the 6809
		- `bra more` is two bytes on the 6809
		- On ARM32 they are all 32-bits (4 bytes)

### Syntax
- normally case sensitive
- syntax
	- `<label:><opcode><operands>;<comment>`
- labels
	- Start with a letter and ends with a colon (can be alphanumberic)
- Operands
	- \# immediate (if no # is given then it's an address)
	- $ hex value
	- % binary value
- Examples
	- Load A with the value $0F
		- this is like A = 0x0F
		- `lda #$0F`
	- Load A with the value stored at memory location $000F
		- This is like: `A = memory[0x0F]`
		- `lda $0F$`
	- Transfer the value stored in B into A
		- This is like `A = B`
		- `tfr b,a`

### Opcodes


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


