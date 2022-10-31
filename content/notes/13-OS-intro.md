---
title: "13-OS-intro"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-11-23
sr-interval: 22
sr-ease: 230
---

# why learn OS
- security
- optimisation
- wierd bugs
- "crown of programming"
- understand hardware better
- embedded sys and IoT
- co-design of hardware and software

# what is an OS
![big picture diagram|400](https://i.imgur.com/9O1YR0p.png)
-  a program (also called OS kernel) loaded onto RAM first when pc is turned on
- OS kernel (in kernel space) has highest privilege and can access any hardware directly
- user programs (in user space) cannot acces hardware unless permitted otherwise by the OS kernel via service request (sys call)

> a program (OS kernel) that manages the different aspects of the opereration of the machine and runs with the highest privilege in a protected domain

manages:
	- processes
	- data storage
		- ram, file systems
	- io devices
		- network
		- ui
	- security and protection

## kernel vs user space
- cpu can check space of software via  flag in status word
- when interrupt or sys call occurs, the flag is ser to kernel space
- kernel
	- protected space where software can access hardware
	- OS kernel is run in kernel space
- user
	- other software is run in user space
	- non privilege space where softwar cannot access hardware
	- unless permitted by kernel

## process management
a process is a program in execution
- a program is not a process

process management involves
- creating and deleting processes 
- scheduling processes 
- suspending and resuming processes 
- process synchronisation 
- process communication 
- deadlock handling

## storage manangement
storage: 
- primary (RAM)
- secondary (hard drive)
- tertiary (floppy disks, tapes, cd, etc)

storage manangement involves:
- Allocating and deallocating storage 
- Keeping track of storage in use and free storage 
- Transferring data between primary and secondary storage

Defn: the file system is the mechanism by which the user accesses/manipulates sotred data in secndary storage like hard disk

## io device managment
- A computer system can include a very wide range of I/O devices: keyboards, mice, printers, hard disks, CD-roms, etc etc etc. 

I/O device management includes tasks like: 
- tracking the status of each device 
- allocating devices to particular processes 
- deallocating devices 
- scheduling tasks for individual devices (e.g. disk scheduling) 
- these functions are built into modules called device drivers; each device needs one device driver to manage the hardware and serve the requests from user applications via the OS kernel.

### UI
Defn: the shell is the program through which the user interactins with the operating system

two types:
- icon based point and click
- keyboard commands e.g., UNIX
	- harder to learn but more powerful and flexible

# history
- No OS
- batch systems
- spooling
- time sharing
- real time
- 