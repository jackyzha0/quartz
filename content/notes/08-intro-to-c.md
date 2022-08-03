---
title: "08-intro-to-c"
aliases: 
tags: 
- lecture
- cosc204
---

Developed 1972 for Unix

- widely used
	- compilers esxist for most OSs and architectiures
- diverse use
	- OSs, device drivers, protocol stacks
	- less so for application software
- low level
	- language features map to CPU features 
- not Object Oriented
	- no classes etc

> “C is an imperative procedural language supporting structured programming, lexical variable scope, and recursion, with a static type system. It was designed to be compiled to provide low-level access to memory and language constructs that map efficiently to machine instructions, all with minimal runtime support. Despite its low-level capabilities, the language was designed to encourage cross-platform programming. A standards-compliant C program written with portability in mind can be compiled for a wide variety of computer platforms and operating systems with few changes to its source code.” - wikipedia

```
#include <stdio.h>

int main(int argc, const char *argv[])
{
	puts("Hello World");
	return 0;
}
```

# \#include
java uses .class files, C uses .c and .h
- .c for implementation
- .h for extern declarations (similar to `public`)

java uses `import`, C uses `#include`

```
#include <stdio.h>
#include "myfile.h"
```

- `#include` literally includes the file with the given name right there into the file eing compiled
- in `hello_world.c` we include `stdio.h` so we can call `puts()`

# Routines
```
int main(int argc, const char *argv[])
{

}
```

routines can be scoped to just the source code file
- `statis int eleven(void`

routines must be declared bfore being used
- `extern int eleven(void)`

# If statements

