---
title: "compiler"
aliases: Compiler, compilers, Compilers
tags: 
- cosc202
---

# What are they/what do they do
- used to build stored *programs*
	- usually program are written in a *high level*  *compiled*  language
		- C, C++, Java, C#, etc
- Output machine code in binary
	- This can be loaded and run by hardware

# Traditional Stages of Compilation
**lexing**: This is the step where the source code is converted into *tokens*. A token is a "meaningful substring of source code".

e.g.: `x = 10 + y` ⇒ `[var(x), ASSIGN, int(10), PLUS, var(y)]`

**parsing**:*Token Steam* is converted to *abstract syntax tree* *(AST)* . This defines the structure of the program

e.g.: above output ⇒ `assign(v(x), expression(add(10, v(y))))`

**optimising**: Unreachable (dead) code is removed, and other optimisations are made

e.g.:  `if(false){do stuff}` would be removed

**emitting**: machine code is ouput to e.g., a binary file

# Modern Stages of Compilation
Since there are many new languages being released, it is no longer practical to design a compiler for each language. So we now split compilation info a *front end* and a *back end*

**Front end**: Language specific, lexing and parsing. Outputs *compiler-internal intermediate* code

**Back end**: Language agnostic, optimisation. Outputs machine code to target CPU hardware

# Compiler families
- GCC - Gnu compiler collection - old and messy code
- LLVM - low level virtual machine - cleaner code - open-source
- Microsoft and Intel compilers
	- ms compilers aim to support development for windows
	- mentioned before: Intel compilers optimise for Intel Hardware

# Output
Compilers usually ouput *object code*. This contains machine code, but is not yet exectuable. There is another stage [linking](notes/linker.md), where the object code is *linked* with together with libraries and other languages, and made exececutable. 

# Java Compilers
javac produces JVm bytecode. this bytecode was orginally run on `java` [Interpreter](notes/interpreter.md). This extra layer was initally created to help with porting java on new hardware. Now `java` recompiles to java hardware CPU. This is done 'just-in-time' in RAM and doesn't ouput machine code. The JIT compiler is triggered when code is first (or repeatedly used). 

# Compiler errors
Producing good error messages is important and difficult as the compiler doesn't usually know exactly where/what the error was. Errors can occur within expanded macros