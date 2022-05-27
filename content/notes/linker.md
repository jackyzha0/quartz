---
title: "linker"
aliases: Linker, linking
tags: 
- cosc202
---


- Linkers facilitate use of code in multiple languages, e.g. 
	- use C for programming speed of developer; 
	- use Assembly language for running speed of code 
	- But these days: often hard to beat optimising compilers! 
- Linkers effect interaction with libraries in two ways: 
	- Static linking: build libraries’ code into your application 
	- Dynamic linking: library connected in at load or run-time 
- Linkers facilitate interaction with OS

## Static linking 
- Statically linked libraries are built into executable 
	- We’ve previously discussed the dependency problems: 
		- Every executable carries the weight of the library code 
		- Also, bug fixing requires rebuilding the whole program 
- However, static linking is straightforward 
	- e.g., nothing much OS-specific about static linking 
		- Library calls are just function calls within userspace 
- Alternative is for linking not to finish at compile-time 
	- Linker could add code to link at runtime 
	- More commonly, linker tells OS more linking needed later 

## Dynamic linking 
- Dynamic linking is common on modern OSs, e.g., 
	- DLLs on Windows: Dynamic Link Libraries 
	- SOs on Linux, Solaris: Shared Objects 
	- DyLibs on macOS: Dynamically loaded modules 
- One copy of dynamic library shared by all executables 
	- efficiently uses memory: load into RAM once; share to all 
- Fixing bugs / security flaws is streamlined: 
	- just upgrade the single copy of the library 
	- all processes will adopt fixed library (when they next start) 

## Managing dynamic libraries 
- Dynamic libraries may have different ownership 
	- Some dynamic libraries will be part of the OS distribution 
	- Others installed along with apps that need those libraries 
- Can track installable library use with reference counters 
	- Software installer checks whether library is already present: 
		- if not, install library, set reference count to one 
		- if so, increase reference count by one 
	- Uninstaller decreases reference count: deletes if at zero 
	- But your reference counting needs to be reliable 
		- ... unlike early Windows OSs: so called ‘DLL hell’
