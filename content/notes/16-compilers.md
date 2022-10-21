---
title: "16-compilers"
aliases: 
tags: 
- cosc202
- lecture
sr-due: 2023-06-12
sr-interval: 233
sr-ease: 250
---

- describe what it is and what is does
- compilers vs interpreters
- compile stages
- why java is atypical of compiled languages
- compiler front vs back end
- why producing precise compiler errors is hard


- [compiler](notes/compiler.md)
- [interpreter](notes/interpreter.md)

# What is a compiler?
A [compiler](notes/compiler.md) is used to build stored programs. Things that are stored on the disk that  you can run. They use source code in a **high level** language, and output machine code in a binary file which is then linked with a [linker](notes/linker.md). This file can be loaded and run by hardware. Example langauges include C, C++, Java (sorf of)

An [interpreter](notes/interpreter.md) is more of an interactive tool. The interpreter program (e.g., python) runs of the CPU and execute your program. Interpreted laguages include (python, ruby, shell, R, js, PHP).

Usually compiled program are smaller and run faster, but interpreted languages are more convienient

The line between compiled and interpreted is becoming less clear with things like the JVM, Scala, and python .pyc files.