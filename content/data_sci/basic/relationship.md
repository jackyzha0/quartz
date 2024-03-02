---
title: Independence & Correlation
tags:
  - math
  - statistics
date: 2024-02-28
---

# Independent


直白来说，独立（independence）指的是两个或多个变量之间的关系是否相互独立。如果两个变量是独立的，那么它们的取值不会相互影响。换句话说，一个变量的发生与其他变量的状态无关。例如，考虑一个骰子和一枚硬币，它们的投掷结果是独立的，因为你投掷硬币的结果不会影响骰子的结果。

In mathematics，联合概率密度相当于分别的概率密度相乘

$$
p_{X,Y}(x,y) = p_X(x) * p_Y(y)
$$

$$
\begin{equation} 
\begin{split} \rightarrow E[XY]
& = \int\int xy p_{X,Y}(x,y)dxdy \\
& =\int x p_X(x) \int y p_Y(y) \\
& = E[X]E[Y]
\end{split}
\end{equation}
$$

# Correlation

相关（correlation）指的是两个变量之间的关系是否存在关联。如果两个变量是相关的，那么它们的取值会彼此影响。当一个变量增加或减少时，另一个变量可能会相应地增加或减少。例如，考虑身高和体重之间的关系，一般来说，身高较高的人往往体重也较重。


In mathematics, 一般使用correlation coefficient来判断二者的相关性，其表达式为：

$$
\rho(X, Y) = \frac{Cov[X,Y]}{\sqrt{Var[X] Var[Y]}}
$$

其中$Cov$ means Covariance，协方差:

$$
Cov[X, Y] = E[XY] - E[X]E[Y]
$$
所以不相关的表达为$\rho(X,Y) = 0$, 既$Cov[X,Y] = 0$, 也就是$E[XY] = E[X]E[Y]$

# Conclusion

* If $X$ and $Y$ are independent, they are also uncorrelated. **Independent -> Uncorrelated**, 既独立是强于不相关的束缚
* 但是un-correlation无法推出independent

## Math conclusion

$$
E[XY] = E[X]E[Y]
$$
-> un-correlation

$$
p_{X,Y}(x,y) = p_X(x) * p_Y(y)
$$

-> independent
# Reference

* [Uncorrelated-vs-independent.pdf](https://pinktalk.online/data_sci/basic/attachments/uncorrelated-vs-independent.pdf)
