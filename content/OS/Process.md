---
title: "Process"
tag: os
date: 
alias:
---

**Definition of a process:** Running a program.

- Can be viewed as an abstraction of a running program provided by the [[Operating Systems |OS]].
- Can be summarized by taking inventory of the system it accesses or affects during the course of its execution

To understand a process, we have to understand its *machine state:* what can the program read or update when it is running? What parts of the machine are important to the execution of this program?
- Memory: Instructions and data sit in memory
	- Address space – memory that the process can address
- Registers: Many instructions read/update registers, making them important to process execution
- Persistent storage devices – I/O information such as list of files the process has open

[[Process API]]
[[Process Creation]]
[[Process States]]