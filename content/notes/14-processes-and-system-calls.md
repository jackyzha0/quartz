---
title: "14-processes-and-system-calls"
aliases: 
tags: 
- cosc204
- lecture
---

- heirarchical structure in software systems
- system calls and interrupts
- representing process in OSs
- overview of process scheduling

# Heirarchical structure
software systems have modularity
- os kernel
- system programs
- applicatioin programs
![Heirarchical structure diagram|400](https://i.imgur.com/Tf7QDTy.png)

## application programs
Defn: a program that ordinary usrers interact with, running in user space

e.g.,
- word processor
- video player
- web browser
- games
- etc

## system programs/libraries
Defn: a program which provides general purpose power level function, packeages in a way which is convenient for a user (e.g., sys admin or programmer) to employ

system program types include.,
- file manipulation progarms
- status info programs
- network and device management programs
- compilers assemblers and interpreters
- various library code
- command shell programs (e.g., command interpreters)

also runs in user space

## system calls

