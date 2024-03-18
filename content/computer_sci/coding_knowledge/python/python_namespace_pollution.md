---
title: Python Namespace Pollution
tags:
  - python
  - coding-language
date: 2024-03-18
---
在Python中，命名空间污染指的是当从不同的模块导入变量或函数时，如果不小心，可能会覆盖掉已有的变量或函数。这通常发生在使用`from module import *`这样的语句时，因为它会将所有公开的变量和函数导入当前的命名空间。如果两个模块有重名的函数或变量，最后导入的会覆盖之前的，这就是所谓的“污染”。

为了避免这种情况，推荐的做法是只导入需要的特定函数或变量，或者**使用别名来保持命名空间的清晰**。

```python
import module as mod
from module import function as func_alias
```