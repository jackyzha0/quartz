---
title: "build-tools"
aliases: build tools
tags: 
- cosc202
---

# Build tools
Tools that automate the construction of software,.

## C
if you recompile C you get an object file which can be linked. Automation tools will do the linking for you. 

what they do:
- run [compiler](notes/compiler.md)
- run [linker](notes/linker.md)
- automatically download depencies ([libraries](notes/13-code-librarires.md))
	- this can also be done using [containers](notes/containers.md) e.g., a docker container
- possibly some form of [testing](notes/testing.md)

# History of build tools

## Make
> check whether targets are older than sources

Has:
- set of targets
- set of source files
- A list of commands that build the target from the source
- internal variables
	- \$@ - the rules source(s)
	- \$< - the rules tartet
- 

Build things in the correct order (*topologically*. e.g., will run compiler before linker if needed. 

Limitations
- doesn't handle subprojects
- doesn't handle directories
	- when make look for changes, it usually only looks in the current dir
	- big projects will have call make is sub projects, this can get complicated quick
- Internal variables do not match with typical shell variables
	- use \$\$ to use make shell variables
- no real constraints or conventions: can \betaused for a lot of things 

## Java programs
dont really need the linking step: java can load class files on the fly. The java compiler is more flexible. 

Still needs some automation:
- cleaing uneeded .class files
- bulding Java archive files (JAR)

## Ant
Written to handle build tasks, e.g., build a JAR, clean up files. Uses an XML file: build.xml. (XML sucks)

improves upon make by
- better at scanning sub dirs
- calls javac on many files at once not one at a time

## Maven
maven has conventions:
- e.g., file structure:
	- main app as src/main/java
	- support resources at src/main/resources
	- test sources at src/test/java
- Support non java languages

Still XML files: pom.xml

Colour in output. 

## Gradle
speed and flexibility
- does not use xml
- has its own domain specific language
- more complex than maven
- faster than maven
	- particularly in incremental build
		- i.e. not re-building when it doesn't need to
- Support non java languages

## Others
- rake - ruby's version of Make
- SCons - builds database about build state
- CMake - cross platorm building; uses existing tools/IDEs
- SBT scala
- languge built in tools
	- go - Go build
	- rust - Cargo
