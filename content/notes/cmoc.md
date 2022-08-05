---
title: "cmoc"
aliases: 
tags: 
- cosc204
---

CMOC is a 6809 c compiler.

it compiles c code into 6809 assembly

callling conventions
- A routine must preserve Y, U, S and DP 
- A routine may change A, B, X and CC 

- Parameters are pushed on the stack in the reverse order 
- The caller pops them off the stack after the call 

- char parameters are promoted to int 
- unsigned char are promoted to unsigned int 

- Return 8-but values in B 
- Return 16-bit values in D 

# examples
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
