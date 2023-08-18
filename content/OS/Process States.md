---
title: "Process States"
tag: os
date: 
alias:
---

Different states a process can be in any given time.
Simplified view:
- **Running:** Process is running on processor – it is executing instructions
- **Ready:** Process is ready to run but for some reason the OS has chosen not to run it right now
- **Blocked:** In the blocked state, a process has performed some kind of operation that makes it not ready to run until some other event takes place.
	- Ex: When a process initiates an I/O request to a disk, it becomes blocked and thus some other process can use the processor.
	
	 ![[Pasted image 20230708144114.png|400]]

A process can can be moved between the ready and running states at the discretion of the OS. 
- Being moved from ready to running means the process has been scheduled
- Being moved from running to ready means the process has been descheduled
- Once a process has become blocked (e.g., by initiating an I/O operation), the OS will keep it as such until some event occurs (e.g., I/O completion)
	- At that point, the process moves to the ready state again (and potentially immediately to running again, if the OS so decides).