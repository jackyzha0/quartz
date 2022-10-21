---
title: "07-6809-advanced"
aliases: 
tags: 
- lecture
- cosc204
sr-due: 2022-11-13
sr-interval: 22
sr-ease: 230
---

# addressing modes
- implied `inca`
- immediate `lda #$00`
- extended `LDA $31FE` 
- extended indirect `LDA [$31FE]` or `LDA [HERE]` points to a memory location which specifies another memory location
- direct `LDA $ff` or `lda <HERE`
- register `trf X,Y`
- indexed `LDA $311E, X` use memory location that is the sum of the operands
	- `LDA ,X`
	- `LDA $23,X`
	- etc
- indexed indirect `LDA [$10, X]`
- relative `BEQ HERE`
	- BEQ does a short branch
	- LBEQ does a long branch
	- the value is relative to HERE
- program counter relative `LDA TABLE,PCR ; A = the value stored at TABLE`
	- if all memory references are relative, then the program cna be loaded anywhere is memory, and will still work. It is said to be **relocatable**

![operand cheat sheet](https://i.imgur.com/mA7Y8bE.png)

# Calling conventions
all global vars. this is discouraged in high level languages

The calling convention is the set of rules that describe 
- How to pass parameters 
- How to return a result 
- Which registers a routine may alter

## CMOC
a 6809 C compiler

callling conventions
- A routine must preserve Y, U, S and DP 
- A routine may change A, B, X and CC 

- Parameters are pushed on the stack in the reverse order 
- The caller pops them off the stack after the call 

- char parameters are promoted to int 
- unsigned char are promoted to unsigned int 

- Return 8-but values in B 
- Return 16-bit values in D 

- We’re not going to talk about passing a struct by value

### example in C
parameters
``` c
uint16_t two_params(uint8_t first, uint16_t second) { 
	return first + second; 
} 

uint16_t call_one(void) { 
	return two_params(204, 431); 
}
```

```
```

local variables

``` c
uint16_t one_param(uint16_t xyzzy) { 
	uint16_t val = xyzzy; 
	return val; 
}
```

```
_one_param 
	PSHS U 
	LEAU ,S 
	LEAS -2,S 
	* Formal parameter(s): 
	* 4,U: 2 bytes: xyzzy 
	* Local non-static variable(s): 
	* -2,U: 2 bytes: val 
	LDD 4,U 
	STD -2,U 
	LEAS ,U 
	PULS U,PC
```
