---
title: LaTeX
tags:
  - feature/transformer
---

Quartz uses [Katex](https://katex.org/) by default to typeset both inline and block math expressions at build time.
Quartz默认情况下支持[Katex](https://katex.org/)，在构建时对内联和块数学表达式进行类型设置。

## 语法

### 数学表达式块


块数学可以通过用 `$$`分隔数学表达式来呈现。

```
$$
f(x) = \int_{-\infty}^\infty
    f\hat(\xi),e^{2 \pi i \xi x}
    \,d\xi
$$
```

$$
f(x) = \int_{-\infty}^\infty
    f\hat(\xi),e^{2 \pi i \xi x}
    \,d\xi
$$

$$
\begin{aligned}
a &= b + c \\ &= e + f \\
\end{aligned}
$$

$$
\begin{bmatrix}
1 & 2 & 3 \\
a & b & c
\end{bmatrix}
$$

$$
\begin{array}{rll}
E \psi &= H\psi & \text{Expanding the Hamiltonian Operator} \\
&= -\frac{\hbar^2}{2m}\frac{\partial^2}{\partial x^2} \psi + \frac{1}{2}m\omega x^2 \psi & \text{Using the ansatz $\psi(x) = e^{-kx^2}f(x)$, hoping to cancel the $x^2$ term} \\
&= -\frac{\hbar^2}{2m} [4k^2x^2f(x)+2(-2kx)f'(x) + f''(x)]e^{-kx^2} + \frac{1}{2}m\omega x^2 f(x)e^{-kx^2} &\text{Removing the $e^{-kx^2}$ term from both sides} \\
& \Downarrow \\
Ef(x) &= -\frac{\hbar^2}{2m} [4k^2x^2f(x)-4kxf'(x) + f''(x)] + \frac{1}{2}m\omega x^2 f(x) & \text{Choosing $k=\frac{im}{2}\sqrt{\frac{\omega}{\hbar}}$ to cancel the $x^2$ term, via $-\frac{\hbar^2}{2m}4k^2=\frac{1}{2}m \omega$} \\
&= -\frac{\hbar^2}{2m} [-4kxf'(x) + f''(x)] \\
\end{array}
$$

> [!warn]
> 由于[基础解析库](https://github.com/remarkjs/remark-math)的限制，Quartz中的块数学要求`$$` 分隔符位于换行符上，如上所述。

### 行内数学表达式

类似地，可以通过用单个`$`分隔数学表达式来呈现内联数学。例如，`$e^{i\pi} = -1$` 生成 $e^{i\pi} = -1$

### 转义字符

在某些情况下，一个段落中可能同时包含多个`$`，这可能会意外触发MathJax/Katex。

为了避免这种情况，你可以通过做`\$` 来避开美元符号。

例如：

- 不正确： `I have $1 and you have $2`产生 I have $1 and you have $2
- 正确: `I have \$1 and you have \$2` 产生 I have \$1 and you have \$2

### 使用 mhchem

将以下导入添加到`quartz/plugins/transformers/latex.ts` 的顶部（在所有其他导入之前）：

```ts title="quartz/plugins/transformers/latex.ts"
import "katex/contrib/mhchem"
```

## 自定义

Latex解析是[[plugins/Latex|Late]]插件的一个功能。有关自定义选项，请参阅插件页面。
