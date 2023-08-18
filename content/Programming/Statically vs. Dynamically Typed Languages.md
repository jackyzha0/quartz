---
title: "Statically vs. Dynamically Typed Languages"
tag: cs
date: 2023-08-09
draft:
---

**Static Typing:** Type checking at compile time
- C, C++, Java

**Dynamic Typing:** Type checking at run time
- Python, JavaScript, Perl, Ruby

A dynamically-typed language can compile even if they contain errors that will prevent the script from running properly. However, if a script written in a statically-typed language contains errors, it will fail to compile until the errors have been fixed.

Statically-typed require you to declare data types of variables before you use them:
```java | Java (Static)
int num;
num = 5;
```

Dynamically-typed do not:
```python
num = 5
```

See also: [Strongly vs. Weakly Typed Languages](Programming/Strongly%20vs.%20Weakly%20Typed%20Languages.md)
