---
title: LaTeX
tags:
  - feature/transformer
---

Quartz uses [Katex](https://katex.org/) by default to typeset both inline and block math expressions at build time.

## Syntax

### Block Math

Block math can be rendered by delimiting math expression with `$$`.

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
> Due to limitations in the [underlying parsing library](https://github.com/remarkjs/remark-math), block math in Quartz requires the `$$` delimiters to be on newlines like above.

### Inline Math

Similarly, inline math can be rendered by delimiting math expression with a single `$`. For example, `$e^{i\pi} = -1$` produces $e^{i\pi} = -1$

### Escaping symbols

With [[ObsidianFlavoredMarkdown]], dollar signs follow Obsidian's rules: a `$` followed by a space or a digit after the closing `$` doesn't start or end math, so prices like `I have $1 and you have $2` stay text, as in Obsidian.

If a pair of `$` would still be read as math where you don't want it (for example `$a and b$`), escape the dollar sign as `\$`: `\$a and b\$` produces \$a and b\$.

### Using mhchem

If you are using the community Latex plugin, you can add `mhchem` support by forking the plugin repository and adding the following import to the top of `src/index.ts` (before all the other imports):

```ts title="src/index.ts"
import "katex/contrib/mhchem"
```

## Customization

Latex parsing is a functionality of the [[plugins/Latex|Latex]] plugin. See the plugin page for customization options.
