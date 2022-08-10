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
double balance[5] = {1000.0, 2.0, 3.4} //last two elementes will be initalised to zero
double balance[] = {1000.0, 2.0, 3.4} //size is calculated automatically
```

- do not have methods
	- array.size etc
- not bounds checked
	- can write past the end
- to know must keep trach yourself or use sentinel value
	- 'H' 'e' 'l' 'l' 'o' '\0' <- sentinel value

``` c
//find the length of an array
size_t strlen(const char *of){
	char *check = of;
	
	while(*check != '\0')
		check++;
	
	return check - of;
}
```

# quoted strings
- "Hello World"
- must be const - not allowed to change them
	- `const char *hello_world = "hello world"`
- can use then in place of char arrays

# Memory
when we decalre an array we are saying "choose somewhere in memory to put this number of that and call it thing"

```c
that thing[this];

uint_t byte_array[1024];
```

- compiler chooses somewhere in memory
- the name of the array maps to the location

## segments
- ![diagram](https://i.imgur.com/owQcqhJ.png)
- translation between virtual and physical pages
- compiler knows
	- where in memory program is stored
	- how much global data you use
	- where the stack is

## malloc
- "memory allocate"
- 


