---
title: "09-intro-to-c-2"
aliases: 
tags: 
- cosc204
---

# Variables and Pointers

```
va memory[3]
*va memory[memory[3]]
**va memory[memory[memory[3]]]
```

`*` is known as **dereferncing**
`**` is known as **double-dereferncing**

## Names and places
names are allocated to emmory locations of declaration

`&b;` wherever in memory b is stored

## Why Pointers
- abstractions
	- dont need to know which "object" to manipulate
- ability to change a parameter
- multiple return values from a routine
- efficiency
	- dont need to copy anything to pass a pointer

## Call by value
- The value of the variable is passed to the called routine.
- changes to the parameter do not propogate to the caller

## Call by address
- address of parameter is passed to the rountine