---
title: "Strongly vs. Weakly Typed Languages"
tag: cs
date: 2023-08-09
draft:
---

**Weakly typed:** Make conversions between unrelated types implicitly
- C, JavaScript, Ruby, shell, PHP
- Example:
```python
var = 21
var = var + "dot"
print(var)
```
```output
Traceback (most recent call last): 
	File "main.py", line 2, in <module>
		var = var + "dot" #type-error, string and int cannot be concatenated.
TypeError: unsupported operand type(s) for +: 'int' and 'str'
```

**Strongly typed**: Make implicit conversions between types
- C, C++, C#, Java, Python, TypeScript
- Example:
```JavaScript
value = 21;
value = value + "dot";
console.log(value);
```
```output
21dot
```

See also: [Statically vs. Dynamically Typed Languages](Programming/Statically%20vs.%20Dynamically%20Typed%20Languages.md)