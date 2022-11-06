---
title: "204-exam"
aliases: 
tags: 		
---

Will be examined
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
		-  