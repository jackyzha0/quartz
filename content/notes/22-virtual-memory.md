---
title: "22-virtual-memory"
aliases: 
tags: 
- cosc204
- lecture
---

# Swapping and virtual memory
swapping
- if there is not enough physical memory we need to sawp processes out of the main ememory to the secondary storage e.g., disk
- ![slide](https://i.imgur.com/ImjjXkb.png)
- when a process is ready, it is swapped into the main memory
- allows more processes to multitask

partially loaded proceses
- dynamic loading
	- load a potion of code when it is called as some code may not need to be executed, e.g., code for handling errors
	- pros
		- process not limited by amount of avilable memory
		- more processes multitasking
		- quicker to swap than entire process

virtual memory
-  idea that processes dont need to be fully in memory to run

extends main memory to secondary storage, and allows dynamic loading of processes while they execute
- programmer deals with vmem just like paging scheme
- mem manager in OS kernel controls loading pages of the process into main mem from secondary storage

# Demand paging
dont load a page into mem until it is referenced by CPU

implementing
- in paging scheme there are extra bits in the table to provide more information
	- valid/invlid bit
	- protection bits
- in demand paging the mem manager uses valid/invalid bit to tell if a page is loaded

![example|400](https://i.imgur.com/JeQxF4H.png)

note: each page can be stored twice: loaded in main memory and in the backing store - these two copies need to remain consistent. i.e.., changes to one must be reflected in the other

page faults
- "trap" occurs when trying to access and invalid page
- what the os does:
	- check if caused by invalid memory access or unavailable page frame
	- if nvalid mem access
		- terminate process
	- else
		- find a free frame
		- read the page from the disk to the free frame
		- modify the page table
		- restart the instruction
	- VMAs are searched to find valid areas or memory access

# page replacement algorithms
If main memory is full when a page fault is generated, one of the pages currently being held needs to be replaced.

This means an extra step in the operating system’s page-servicing routine. 
- Find the desired page on the backing store (secondary storage). 
- Find a free frame of memory
	- If there’s a free frame in memory, use it
	- Otherwise: Select a frame to swap out
	- Save it to the backing store (in case it’s changed) 
	- Proceed as before.

FIFO
- replace the oldest page
- pro
	- simple to understand/implement
- con
	- maybe first page to be ref'd is often being referenced
	- belady's anomaly

# frame allocation

# thrashing
