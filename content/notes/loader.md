---
title: "loader"
aliases: Loader, Program Loader, Loaders, loaders, program loaders
tags: 
- cosc202
---

An executable file e.g., greet has to be **loaded and run** by your [OS](notes/operating-system.md). Depending on your OS and your harwdare this might need to be done differently

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