---
title: Package, Module in Python
tags:
  - python
  - coding-language
date: 2024-03-18
---

# File Structure Example


```plaintext
sound/                          Top-level package
      __init__.py               Initialize the sound package
      formats/                  Subpackage for file format conversions
              __init__.py
              wavread.py
              wavwrite.py
              aiffread.py
              aiffwrite.py
              auread.py
              auwrite.py
              ...
      effects/                  Subpackage for sound effects
              __init__.py
              echo.py
              surround.py
              reverse.py
              ...
      filters/                  Subpackage for filters
              __init__.py
              equalizer.py
              vocoder.py
              karaoke.py
              ...
```


# How to use

## Example


```python
# Use Method 1
import sound.effects.echo

# Use Method 2
from sound.effects import echo

# Use Method 3
from sound.effects.echo import echofilter
```

> [!note] 
> 注意，使用 `from package import item` 时，item 可以是包的子模块（或子包），也可以是包中定义的函数、类或变量等其他名称。`import` 语句首先测试包中是否定义了 item；如果未在包中定义，则假定 item 是模块，并尝试加载。如果找不到 item，则触发 [`ImportError`]异常。 
## Notice

### import *

使用 `from sound.effects import *` 时会发生什么？你可能希望它会查找并导入包的所有子模块，但事实并非如此。因为这将花费很长的时间，**并且可能会产生你不想要的副作用**。

**解决办法是提供包的显式索引**

import语句使用如下惯例：如果包的 `__init__.py` 代码定义了列表 `__all__`，运行 `from package import *` 时，它就是被导入的模块名列表。发布包的新版本时，包的作者应更新此列表。如果包的作者认为没有必要在包中执行导入 * 操作，也可以不提供此列表。

Example:

```python
__all__ = [
    "echo",      # refers to the 'echo.py' file
    "surround",  # refers to the 'surround.py' file
    "reverse",   # !!! refers to the 'reverse' function now !!!
]

def reverse(msg: str):  # <-- this name shadows the 'reverse.py' submodule
    return msg[::-1]    #     in the case of a 'from sound.effects import *'
```


同时，有语法可以shadow submodule，如上述所示；**因为本地定义的reverse函数会遮挡子模块**。

> [!note] 
> 如果没有定义 `__all__`，`from sound.effects import *` 语句 _不会_ 把包 `sound.effects` 中的所有子模块都导入到当前命名空间；**它只是确保包 `sound.effects` 已被导入**（可能还会运行 `__init__.py` 中的任何初始化代码），然后再导入包中定义的任何名称。 这包括由 `__init__.py` 定义的任何名称（以及显式加载的子模块）。 它还包括先前import语句显式加载的包里的任何子模块。 请看以下代码: 


### 相对导入

```python
from . import echo
from .. import formats
from ..filters import equalizer
```

这些导入使用前导点号来表示相对导入所涉及的当前包和上级包

> [!abstract] 
> 相对导入基于当前模块名。因为主模块名永远是 `"__main__"` ，所以如果计划将一个模块用作 Python 应用程序的主模块，那么该模块内的导入语句必须始终使用绝对导入。 


# Template Example

## Complex one


```plaintext
package_name/
│
├── package_name/
│   ├── __init__.py
│   └── module_name.py
│
├── tests/
│   ├── __init__.py
│   └── test_module_name.py
│
├── .gitignore
├── LICENSE
├── README.md
├── requirements.txt
├── setup.py
└── pyproject.toml
```

- `package_name/`：包的顶层目录。
- `package_name/__init__.py`：空文件告诉Python这个目录应该被视为一个包。
- `package_name/module_name.py`：代码所在。
- `tests/`：测试代码。
- `.gitignore`：这个文件告诉git哪些文件不应该被版本控制系统跟踪。
- `LICENSE`：包的许可证文件。
- `README.md`：描述包的功能和使用方法。
- `requirements.txt`：列出包的依赖项。
- `setup.py`：这是一个构建和安装包的脚本。
- `pyproject.toml`：这是一个新的Python包配置文件，用于存储包的元数据和构建信息。

## Easy one

```plaintext
my_package/
│
├── __init__.py
└── module.py
```

### How to code `__init__`


1. 空的 `__init__.py` 文件：

```python
# 这个 __init__.py 文件是空的
```

2. 在 `__init__.py` 文件中导入包内模块，以便外部直接导入：

```python
from .module1 import *
from .module2 import some_function
```

3. 在 `__init__.py` 文件中设置 `__all__` 变量，控制使用 `from package import *` 时哪些符号会被导入：

```python
__all__ = ['module1', 'module2', 'some_function']
```

4. 在 `__init__.py` 文件中执行包的初始化代码，如配置日志等：

```python
import logging
logging.basicConfig(level=logging.INFO)
```


#### Notice

> [!hint] 
>  在Python包的结构中，`__init__.py` 文件起着一个重要的作用，它定义了包的属性和方法。当您从一个包中导入模块时，`__init__.py` 文件会被自动执行。因此，您可以在这个文件中指定需要导出的模块，这样外部就可以直接导入这些模块，而不需要知道它们具体在包的哪个位置。
>  
>  

```python
from .module1 import *
from .module2 import some_function
```

这里的 `.` 表示当前包目录。`from .module1 import *` 表示从当前包目录下的 `module1.py` 文件中导入所有函数和类。`from .module2 import some_function` 表示仅从 `module2.py` 文件中导入 `some_function` 函数。

这样做的好处是，当其他人使用这个包时，他们可以更方便地访问这些函数和类，而不需要知道具体的模块路径。例如，他们可以这样导入：


```python
from my_package import some_function
```

而不是：

```python
from my_package.module2 import some_function
```

这样可以使得包的结构对用户更加透明，用户只需要关注他们需要的功能，而不是包的内部结构。这也有助于在不影响用户的情况下重构包的内部结构。当然，这种方式也需要注意不要导出太多不必要的内部细节，以免造成[命名空间的污染](computer_sci/coding_knowledge/python/python_namespace_pollution.md)。
# Reference

* https://docs.python.org/zh-cn/3/tutorial/modules.html