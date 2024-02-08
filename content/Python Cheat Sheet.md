---
title: Python Cheat Sheet
updated: 2024-02-08
compartir: true
---

# Python Cheat Sheet

- Python terminal: `python3` in cmd.
- Comments: `#` at the start of any line.
- Print: `print("Stay Safe…)`
- Indentation: must be followed.

## Examples

### Example 1

```python
num = 5
print(num)
returns 5
type(num)
<class 'int'>
```

### Example 2

```python
num = 5.0
print(num)
returns 5
type(num)
<class 'float'>
```

### Example 3

```python
  greet = "Hello user"
  print(greet)
  returns: 'Hello user'
  type(greet)
  <class 'str'>
```

### Example 4

```python
is_available = True
print(is_available)
returns: True
type(is_available)
returns: <class 'bool'>
```

### Example 5

```python
num = None
print(num)
returns: None
type(num)
returns: <class 'NoType'>
```

## Operators

`+ - * / % ** // = += -= *= /= == != > < >= <= and or not`

### Example 1

```python
a = 6
b = 2
a + b
returns: 8
a - b
returns = 4
a / b
returns: 3
a * b
returns: 12
a ** b
returns: 36
```

### Example 2

```python
a = 7
b = 3
a % b
returns: 1
a // b
returns: 2
```

### Example 3

```python
a =- 5
b = 2
a > b
returns: True
a < b
returns: False
a == b
returns: False
a >= 5
returns: True
b <= 1
returns: False
```

### Example 4

```python
a = 10
b = 2
a == 2 and b == 10
returns: False
a == 10 or b == 20
returns: True
not(a == 10)
returns: False
not(a == 2)
returns: True
```

## Conditional Statements

### Example 1

```python
number = 5
if number == 10:
print("Number is 10")
elif number < 10:
print("Number is less than 10")
else:
print("Number is more than 10")
```

**Returns**: `Number is less than 10`

### Example 2

```python
is_available = True
f is_available:
  print("Yes it is available")
else:
  print("Not available")
```

**Returns**: `Yes it is available`

### Example 3

```python
is_available = True
if not is_available:
  print("Not available")
else:
  print("Yes it is available")
```

**Returns**: `Yes it is available`
