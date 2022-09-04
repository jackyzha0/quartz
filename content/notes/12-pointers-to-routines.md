---
title: "12-pointers-to-routines"
aliases: 
tags: 
- cosc204
- lecture
sr-due: 2022-09-08
sr-interval: 3
sr-ease: 250
---

compiler ⇒ converts high level language description of program into assembly description of the program
assembler ⇒ converts assebly language description into machine code description
loader ⇒ loads program into memory, loaded at $4000

data has an address in memory, so does the application. Therefore functions must also have an address in memory which we can access

# pointers to routines

```
int (*method)(int param)
```

to assign a pointer to a routine

```
method = square;
```

to call the routine
```
result = method(6);
```


## basic example
![pointer to routine example|400](https://i.imgur.com/qLy2uh3.png)

## pointer as member of a struct;
pointers to routines can beused anyqhere variables can

- member of struct
![|200](https://i.imgur.com/03utoNr.png)

- parameter to other routine
![|200](https://i.imgur.com/cwjCgBg.png)

# modules

we can break programs into functional modules
- each modules excapsulates one behaviour
- give us a way of data hiding

add pointer to structs as parameters to methods in modules
- call this an abstract data type ADT
- we communicatre with an ADT via its public interface
	- so that the implementation details are hidden

![queue ADT|400](https://i.imgur.com/pk2kOE2.png)

method in this struct are "black box"

we gain
- abstraction
	- our queue has a print method, so could out stack, tree, and so on
	- we call ob->print() without needing to know (exactly) which print method is called

## constructor
creates object, initialises it and sets up function pointers
![constructor|400](https://i.imgur.com/HM6P3QI.png)

## destructor
good to use. help with closing things and freeing memory


# modules overview
c programs consist of .c and .h files
- put ADT declarations in the .h (header) files
	- we can `#include` these files if we want to use the ADT in a program
- put routine implementations in .c files

## queue header
pragma says include only once: prevent include loops
![queue.h|400](https://i.imgur.com/gpcNZG0.png)
