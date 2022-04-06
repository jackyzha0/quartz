---
title: "debugging"
tags: 
- cosc202
---

# debugging

removing technical faults
isolaing and remove technical faults
a human process
- requires creativity/disipline/knowledge
- deepr understanding of code

debuggers are tools to help debugging

## 1 common approaches
temporarily add output of diagnostic info
- "printf" debugging
permanently include calls to logging system
- route to terminal, log files etc

## 2 debugging machine code
- cpu runs code instruction by instruction
	- thus debugger can intervene between instructions
	- most cpus help debugger interrupt and resume programs
- cpu reached current code via a sequence on callers
	- called **stack trace** , aka back frame, stack frame etc
- may reach point where it cannot continue
	- e.g., integer division by zero, program execution must stop
	- stack trace of stopped program can be analysed

## 3 Imperative languages
These are language that are executed in a step-wise, sequentail manner.

- debug symbols
	- e.g., method named, variable named
- source code context
	- line numbers
	- variable name
	- function method names

## 4 doing debugging
### 4.1 stepping skipping running
- step into --> steps one statement and steps into function calls
- step over --> a step that treats function calls as statement
- step out --> return to the instruction after the function call you're in
- continue  --> go back to running code continuously

### 4.2 controlling debugger execution

Can run normally --> debugger wil run when program crashes

Set Breakpoint --> debugger will stop program when/if that line is reached
- conditional breakpoints only suspend if a condition is true

Watch point --> program is suspended when some data changes (e.g., variables)

## 5 debugging non imperative languages

e.g, spreadsheet (Dataflow programming)
- no breakpoints
- must step through _iterations of computations_

e.g., Equation
- break into smaller parts
- try 'compile' it in multiple ways

e.g., Data base query (declarative programming)
- -reexpressign the query and comaring can be useful
