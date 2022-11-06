---
title: "204-exam"
aliases: 
tags: 		
---

Will be examined

hardware
- what is a computer
- combinatorial logic
- sequetial
	- sr latch
	- D, t, jk flip flop, state transition diagrama
- archtecture
	- memory, busses, alu, control unit, registers, instructions

assembly
- machine code
- registers, stack, instruction set
- syntac, routines, iteration, comparisons, local vars, parameters

C
- why C, syntac
- memory, variables, call by value/address, pointer arithmetic
- arrays, malloc, free, sentinels, length of array
- struct and union, declaration, initialization, shallow/deep copy, queues
- pointers to routines, ADTs, contructors, destructors

Operating systems
- process scheduling algorithms (smiliar to labs)
- memory management and replacement algorithms FIFO LRU
- Layout of process. mapping details
- page table - logical vs physical memory MMU
-  process communication - parent child relationship - fork, exec - child return status to parent
	-  zombie/orphan process
	-  shared memory - mmap
	-  pipes
	-  signals - sigsegv (null pointer) and more
	- PCB process control block (in linux - tast_struct)
	- lifecycle of process - start from fork, suspended for io, terminated by signal or naturally using exit(), interrupts
	- sync
		- data race
		- mutex, lock, semaphore
		- CAS
		- conditions for deadlock
	- system call - interaction betwen user and kernel space
	- threads
		- special process
		-  what is shared what is not
-  file system
	-  sys calls read, write, open
	-  linked allocation, FAT, inode
-  device driver
	-  classification of io devices
	-  io models
	-  io scheduling
	-  io buffering - use memroy buffer to keep copy of IO data
	-  controller, device driver
- 	io systems
	- 	ports, buses, controllers
	- 	io memory
	- 	polling vs interrupt
	- 	DMA
	- 	IO performance
	- 	zero copy
- 	file system protection
	- 	linux protection model
	- 	setuid, setgid, sticky
	- 	MAC, DAC, ACL, RBAC

