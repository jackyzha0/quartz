---
title: "22-virtual-memory"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-11-20
sr-interval: 12
sr-ease: 250
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
- "trap" occurs when trying to access an invalid page
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
- ![example](https://i.imgur.com/EM09dtl.png)
- pro
	- simple to understand/implement
- con
	- maybe first page to be ref'd is often being referenced
	- belady's anomaly: possible to increase numbe of page faults when increasing the number of frames in memory

Optimal page replacement
- replace the page that will not be used for the longest time
- ![example](https://i.imgur.com/RiNi1JI.png)
- pro: optimal
- con: can predict future

LRU (least recently used)
- replace page than has not been used for the longest time
- ![example](https://i.imgur.com/VpMGeXY.png)
- pro: optimal if you look back in time
- con: time consuming to keep record of LRU
- future memory references resemble past ones

# frame allocation
how many frames to allocate to a process?

how to distribute frames among n processes in a multitasking scenario
- equal allocation: all created equal: so each get equal number of frames
- proportional allocation: allocate depending on size of process
- local vs global replacement: 
	- local: steal from your own frames
	- global: can steal from "victim" processes

# thrashing
when a proces has too lttle frames it will have a lot of page faults.

a thrashing process spending more time paging than executing

the working set of a process is the number of pages a process needs in order to execute without causing too many page faults

this is how much memory we allocate to a process to avoid thrashing