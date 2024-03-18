---
title: Python import 异级目录
tags:
  - python
date: 2024-03-18
---

# Learn by Example

## 主程序和模块程序在同一目录下

```python
'''
-- src
	|-- mod1.py
	|-- main.py
'''

import mod1
from mod1 import *
```

## 模块程序在父辈目录

```python
 '''
 -- src
	|-- mod1
		 |-- __init__.py
		 |-- mod1.py
	|-- main.py
 '''

import mod1.mod1
from mod1 import mod1
```


## 其他目录下的模块

```python
'''
-- src
	|-- mod1
		|-- __init__.py
		|-- mod1.py
	|-- sub
		|-- main.py
'''

import sys
sys.path.append("..")
import mod1.mod1
```


# Reference

* https://blog.csdn.net/vitaminc4/article/details/78134508