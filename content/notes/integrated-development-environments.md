---
title: "integrated-development-environments"
tags: 
- cosc202
---

## 1 Source code editors
- editor applications to help software development
- provide features that help editing code
	- auto indent, bracket matching, syntax hl, auto completion, rapid navigation
	- run/test code

## 2 Integrated dev env
- allow you to remain within one application when carrying out software development work
	- can edit source files
	- can compile source files
	- can run debugger
	- integrates version management
- some attach tools to running applications

### 2.1 LSP - syntax highlighting
- allows IDE's to communicate with a "language enging"
- ides dont need 

- shift from syntac to semantics
- e.g.,
	- vs code chck file on opening
		- lsp reports type mismatches
	- rich editor functionality
		- autocompletion with appropriate context
		- information displayed on mouse hover
		- jumping to definitions on mouse hover
		- safe refactoring -> better than blind search and replace
		- diagnosticso -> e.g., display results of unit tests within editor

### 2.2 Navigation
- within files
	- bracket matching
	- block folding
- multi file
	- multiple files at the same time
	- rapidly jump between files
	- search across all files
- collaboration e.g., live sharing 

### 2.3 Modern IDEs
- microsoft
	- vscode -> free open source, highly popular
	- visual studio -> integrates mobile and cloud development
- java enivronments
	- eclipse - early leader in java, supports other languages
	- netbeans -> also includes web dev tooling
- jetbrains -> IntelliJ IDEA, pycharm, phpstorm
- google's android studio -> official android IDE
- apple's Xcode -> free, macOS/iOS focus

## 3 Early programming
- dedicated machines
	- punched card programmer: separate machine from computer than reads cards
- punched cards recore code and or data in binary
	- grid of positions, each representing a binary digit (bit)
	- each position in punches out, or not
- analgogue electronic devices where you phsyicall wire things up
	- gaining interest now for use in machine learning

### 3.1 Bootstrapping
- already built tools can be used to builder better tools for building better tools etc.
- e.g., first assembler was made in maching code. But after that they could use the assember to make a better assembler

### 3.2 Early dev environments
- command line based
	- text based terminals
	- command shell is the running application
- Can use terminal to drive interactive languages
	- can edit, store software code
	- can compile cose and run resulting executables
- it is still practical to do software development this way
	- vim etc
