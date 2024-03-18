---
title: About Private and Public, Python as Example
tags:
  - python
  - coding-language
date: 2024-03-18
---

# A good answer

In Python, "privacy" depends on "consenting adults'" levels of agreement - you can't _force_ it. A single leading underscore means you're not **supposed** to access it "from the outside" -- **two** leading underscores (w/o trailing underscores) carry the message even more forcefully... but, in the end, it still depends on social convention and consensus: Python's introspection is forceful enough that you can't **handcuff** every other programmer in the world to respect your wishes.

((Btw, though it's a closely held secret, much the same holds for C++: with most compilers, a simple `#define private public` line before `#include`ing your `.h` file is all it takes for wily coders to make hash of your "privacy"...!-))

# Reference

* https://stackoverflow.com/questions/1547145/defining-private-module-functions-in-python