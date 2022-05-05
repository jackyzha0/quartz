---
title: "16-compilers"
aliases: 
tags: 
- cosc202
- lecture
sr-due: 2022-05-05
sr-interval: 3
sr-ease: 250
---

- describe what it is and what is does
- compilers vs interpreters
- compile stages
- why java is atypical of compiled languages
- compiler front vs back end
- why producing precise compiler errors is hard

# What is a compiler?
Compilers are used to build stored programs. Things that are stored on the disk that  you can run. They use source code in a **high level** language, and output machine code in a binary file. This file can be loaded and run by hardware. Example langauges include C, C++, Java (sorf of)

An interpreter is more of an interactive tool. The interpreter program (e.g., python) runs of the CPU and execute your program. Interpretee laguages include (python, ruby, shell, R, js, PHP).

Usually compiled program are smaller and run faster, but interpreted languages are more convienient

The line between compiled and interpreted is becoming less clear with things like the JVM, Scala, and python .pyc files.

# Compiler stages (traditional)
- lexical analysis (lexing) - source code -> tokens
	- a token is a meaningful substring of source code 
	- e.g.,
		- input - "x=10+y"
		- ouput - [var(x), ASSIGN, int(10), PLUS, var(y)]
- parsing - convert token stream to abstract syntax tree (AST)
	- output given above input
		- assign(v(x), expression(add(10, v(y)))) 
	- defines the structure of the program
- optimising - rework AST, e.g., drop unreachable code
	- dead code removal 
	- e.g.,:
```java
if(false){
	//do stuff
}
```
- emitting - output machine code to e.g., binary file

# Compiler stages Modern
new langauge being released. Not really a common solution. Originally we would for example design a compiler for each language like C and Fortran. 

Now we split the front end and the back end.
## Front end
- language specific
- lexing and parsing
- output compiler-internal intermediate code
## Back end
- optimise intermediate code
- output machine code e.g., for target CPU hardware

## Compiler families
- GCC - Gnu compiler collection - old and messy code
- LLVM - low level virtual machine - cleaner code - open-source
- Microsoft and Intel compilers
	- ms compilers aim to support development for windows
	- mentioned before: Intel compilers optimise for Intel Hardware

# Compiler output
Typically compiler output object code. This contains machine code, but is not yet executable.

There is another linking stage, where the object code is linked together into executable programs. At this stage code from libraries and other languages can be joined. e.g., assembly and C.

Most compilers compile and link.

# Java Compilers
javac produces JVm bytecode. this bytecode was orginally interpreted by `java`. This extra layer was initally created to help with porting java on new hardware. Now `java` recompiles to java hardware CPU. This is done 'just-in-time' in RAM and doesn't ouput machine code. The JIT compiler is triggered when code is first (or repeatedly used). 

# Compiler errors
Producing good error messages is important and difficult as the compiler doesn't usually know exactly where/what the error was. Errors can occur within expanded macros

