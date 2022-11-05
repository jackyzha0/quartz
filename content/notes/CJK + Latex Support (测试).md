---
title: "CJK + Latex Support (测试)"
---

## Chinese, Japanese, Korean Support
几乎在我们意识到之前，我们已经离开了地面。

우리가 그것을 알기도 전에 우리는 땅을 떠났습니다.

私たちがそれを知るほぼ前に、私たちは地面を離れていました。

## Latex

Block math works with two dollar signs `$$...$$`

$$f(x) = \int_{-\infty}^\infty
    f\hat(\xi),e^{2 \pi i \xi x}
    \,d\xi$$
	
Inline math also works with single dollar signs `$...$`. For example, Euler's identity but inline: $e^{i\pi} = -1$

Aligned equations work quite well:

$$
\begin{aligned}
a &= b + c \\ &= e + f \\
\end{aligned}
$$

And matrices

$$
\begin{bmatrix}
1 & 2 & 3 \\
a & b & c
\end{bmatrix}
$$

## RTL
More information on configuring RTL languages like Arabic in the [config](notes/config.md) page.
