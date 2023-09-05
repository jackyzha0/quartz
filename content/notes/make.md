---
title: "make"
aliases: 
tags: seng 
---

inclusion, compilation, linking
![|300](https://i.imgur.com/XswqXWL.png)

make automates the build process. always use a make-like tool

example:
``` makefile
edit : main.o kbd.o 
	cc -o edit main.o kbd.o 
main.o : main.c defs.h 
	cc -c main.c 
kbd.o : kbd.c defs.h command.h 
	cc -c kbd.c 

clean : rm edit main.o kbd.o
```

## Commands
‘@’ are not echoed to the console (silent) 
‘-’ the return code is ignored (can’t produce an error)

## Macros
`objects = main.o kbd.o`

```
edit : $(objects) 
	cc -o edit $(objects)
```

## Inferences
knows that main and kbd is dependent on main.c and kbd.c so you don't need to specify
```
main.o : defs.h 
kbd.o : defs.h command.h
```

