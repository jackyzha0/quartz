---
title: "C main() function"
tag: os, cs-arch 
date: 
alias:
---

What does `int main(int argc, char *argv[]) `mean?

`argv` and `argc` are how command-line arguments are passed to main.

- `argc` (argument count)
	- The number of argument strings pointed to by `argv`
	- Should just be $1 + \text{number of arguments}$

- `argv` (argument vector)
	- List of arguments

These are only called `argc` and `argv` by convention, could just as well be `int main(int num_of_args, char **arg_strings)` or something.

`int main()` with no arguments can be used if you don’t intend to pass process command line arguments. 

Example:
```cpp
#include <iostream>

int main(int argc, char** argv) {
    std::cout << "Have " << argc << " arguments:" << std::endl;
    for (int i = 0; i < argc; ++i) {
        std::cout << argv[i] << std::endl;
    }
}
```
```bash
prompt> ./test a1 b2 c3
Have 4 arguments
./test
a1
b2
c3
```