---
title: "21-memory-management"
aliases: 
tags: 
- cosc204
- lecture
---

# storage heirachy
![slide|400](https://i.imgur.com/yls3Bun.png)
primary storage - cache and main memory
secondaryy - hard drive

as we move from secondary to primary:
- access speed increases
- access time decreases
- cost increases
- capacity decreases

# process memory image and logical and physical addresses
 - a program is compiled and linked into a process image before loading into memory for execution 
 - a process memory image consists of code section, data sections, lib sections, and stack sections 
 - each process has its own logical memory space starting from 0 and ending at a maximum address 
 - the logical address has to be translated into physical address before sending the memory request to the physical memory modules 
 - the memory management unit (MMU) translated between the logical addresse and the physical addresses. 
 
 - physical mode - progam refers directly to physical address
 - protected mode - dont allow program to use physical address directly - uses logical address
 - OS kernel creates a map from logical address to the physical address using a mapping table
 - CPUrefers to this table to map between physical and logical address



# paging for memory translation