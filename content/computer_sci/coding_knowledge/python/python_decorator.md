---
title: Decorators in Python
tags:
  - python
  - coding-language
date: 2024-03-09
---
在 **Python** 中，**@** 符号通常用作**装饰器**

# abstract

**装饰器**：**@** 符号用于修饰函数，为现有函数增加额外的功能。常见的用途包括插入日志、性能测试、事务处理等。装饰器的创建规则如下：
    - 装饰器是一个函数。
    - 装饰器接受被修饰函数作为参数。
    - 装饰器返回一个新函数。
    - 被修饰函数的签名保持不变。


# example


```python
def uppercase_decorator(func):
    def wrapper():
        result = func().upper()
        return result
    return wrapper

def emphasis_decorator(func):
    def wrapper():
        result = func()
        return f"**{result}**"
    return wrapper

@uppercase_decorator
@emphasis_decorator
def greet():
    return "hello"

print(greet())
```

在上面的示例中，`@funcB` 修饰了函数 `funA`，使得 `funA` 在执行时会先调用 `funcB`，然后再执行自身的逻辑。


# detail

detail见下方的reference，还是蛮复杂的，要仔细看看

# Reference

* https://medium.com/citycoddee/python%E9%80%B2%E9%9A%8E%E6%8A%80%E5%B7%A7-3-%E7%A5%9E%E5%A5%87%E5%8F%88%E7%BE%8E%E5%A5%BD%E7%9A%84-decorator-%E5%97%B7%E5%97%9A-6559edc87bc0