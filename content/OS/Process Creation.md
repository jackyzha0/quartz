---
title: "Process Creation"
tag: os
date: 
alias:
---

> [!faq] How are programs transformed into processes?

High level idea:
1. **Loading**: Program code and any static data (e.g. initialized variables) must first be loaded into memory
	- Load into address space of the process
	- Programs initially reside on disk in some executable format, so the loading process needs the OS to read those bytes from disk and place them into memory elsewhere
	- Eager loading – loading process is done all at once before running the program (early OS)
	- Lazy loading – load data or code only as they are needed during program execution
	
		 ![[Pasted image 20230708141500.png|300]]

2. **Stack allocation**: Some memory has to be allocated for the program’s run-time stack
	- C programs use the stack for local vars, function params, return addresses
		- OS allocates this memory and gives it to the process
	- OS will also initialize stack with arguments such as parameters for  `main()`
	
3. **Heap allocation:** OS may also create some initial memory for the program’s heap
	- In C, heap is used for explicitly requested dynamically-allocated data
		- `malloc()` is used for requesting, `free()` is used to freeing
		- Heap is needed for data structures (linked list, hash tables, trees, etc)

4. **Other initialization tasks:** I/O initialization is particularly important
	- In Unix, each process by default has three open file descriptors for standard input, output, and error.

After these steps, the OS can get to program execution.
Program is started running at the entrypoint, namely `main()`
By jumping to the `main()` routine, OS transfers control to the CPU

Process creation in UNIX systems is done with the `fork(), exec(), wait()`system calls: [[UNIX System Calls]]
