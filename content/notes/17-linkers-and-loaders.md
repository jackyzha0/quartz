---
title: "17-linkers-and-loaders"
aliases: 
tags: 
- lecture
- cosc202
sr-due: 2022-05-08
sr-interval: 3
sr-ease: 250
---

- Appreciate kernel / userspace distinction 
- Sketch what OS loaders need to achieve 
- Contrast running Java versus C code 
- Outline abstractions that hide OS from developers 
- Describe what linkers achieve 
- Contrast static and dynamic linking of libraries

# Operating Systems
## Userspace
This is where applications run. Computer resources are isolated in compute and data
- cannot access memory belonging to another process
- cannot directly access hardware
- cannot occupy all of the CPUs time on one application

## Kernal
"all seeing and all powerful" The kernel sits below the userspace and manages resource allocation and directly controls harware. Usuallly you dont directly interact with the kernel when developing software. You do interact indirectly with the kernel, it permits your interactions with the environment (input/output from/to files, network, and terminals). The standard library usually insulates you from the OS kernel, may abstract over different OSs, and do operations in an OS-agnostic way.

## C program example
[400](https://i.imgur.com/1PlLlQ5.png) [400](https://i.imgur.com/bBQp3TH.png)

## OS Program loaders
There identify the types of file that is being executed. E.g., a  #! at the beginning of a file tells the OS which interpreter to run that file through. Otherwise it will look into the binary file, loads any dynamic libraries, and adjusts the executable code to point to shared libraries in RAM. Eventaully the OS will point the CPU at the binary machine code, first creating an OS process to contain code execution so it cannot overwrite memory belonging to another process

## Java Program "loader"
Java was designed to be portable, and minimose effort to port to another OS. Java "hides" the OS from you. It can dynamically load classes at runtime, thus avoiding an explicit linking stage. Java class loaders can read .class files. The Top-level ClassLoader is written in native code. It loads internal classes like HashMap. Then ClassLoader subclasses written in java can be loaded.

## Even higher level computing abstractions
- Java Enterprise edition
	- run code is exisintg application server
	- most of the time the app framework is running
	- your code injects key classes with custom business logic
- .NET is similar
- Web application programming
	- stacks offer page templating, business rules, databases
- Cloud native application

# Linkers
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