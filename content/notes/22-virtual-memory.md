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

# page replacement algorithms

# frame allocation

# thrashing
