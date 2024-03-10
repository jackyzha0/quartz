---
title: Assert in Python
tags:
  - python
  - coding-language
date: 2024-03-10
---
在 **Python** 中，`assert` 是一个用于判断表达式的关键字。当表达式条件为 **false** 时，它会触发异常。使用 `assert` 可以在条件不满足程序运行的情况下直接返回错误，而不必等待程序运行后出现崩溃的情况。

`assert` 的语法格式如下：

```python
assert expression
```

等价于：

```python
if not expression:
    raise AssertionError
```

你也可以在 `assert` 后面紧跟参数：

```python
assert expression, '错误信息'
```

等价于：

```python
if not expression:
    raise AssertionError('错误信息')
```

# Example


```python
import sys
assert ('linux' in sys.platform), "该代码只能在 Linux 下执行"
```