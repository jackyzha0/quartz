---
title: "18-build-tools"
aliases: 
tags: 
- cosc202
- lecture
sr-due: 2022-11-03
sr-interval: 116
sr-ease: 272
---

- understnad the purpose of build tools
	- automate the construction of software
- sketch how make's rules (re)build software
	- has a set of taget and a set of sources
	- checks whether targets are older than sources
	- a MakeFile contains a list of commands that build the tager from the source
	- builds in the correct order (*topologically*) e.g., will run compiler before linker
- explain why ant better suits java projects
	- written to handle build tasks 
	- better at scanning sub dirs
	- call javac on many files at once, instead of one at a time
- sketch how maven seeks to improve on ant
	- adds color
	- add more conventions
		- e.g., file structure
- appreciated that there are many build tools
	- rake - ruby's version of Make
- SCons - builds database about build state
- CMake - cross platorm building; uses existing tools/IDEs
- SBT scala
- languge built in tools
	- go - Go build
	- rust - Cargo

[build-tools](notes/build-tools.md)

