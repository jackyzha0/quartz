---
title: "10-intro-to-c-arrays-malloc-free"
aliases: 
tags: 
- cosc204
---

# Arrays
- must declare with size

``` c
uint32_t array[10];
float matrix[5][6];
```

- do not have methods
	- array.size etc
- not bounds checked
	- can write past the end
- to know must keep trach yourself or use sentinel value
	- 'H' 'e' 'l' 'l' 'o' '\0' <- sentinel value

``` c
char *check = thing;

while(*check != '\0')
	check++

length = check - thing
```