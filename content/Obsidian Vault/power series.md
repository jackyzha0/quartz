#math/calculus 



# what it is
[Power series - Wikipedia](https://en.wikipedia.org/wiki/Power_series)

## power series
#card/reverse
it's actually a type of (simpler) [[taylor]] series. weird but true
$\sum_{n=0}^{\infty} a_{n}(x-c)^{n}=a_{0}+a_{1}(x-c)+a_{2}(x-c)^{2}+\ldots$



## mclaurin
$\sum_{n=0}^{\infty} a_{n} x^{n}=a_{0}+a_{1} x+a_{2} x^{2}+\ldots$


# 3 possibilities for the value of x
1. $x=a$ [[Ratio test]] gives $\infty$
2. $(-\infty,\infty)$, [[Ratio test]] $= 0$
3. find $R>0$ (radius of convergence) where $|x-a|<R$ converges. [[Ratio test]] gives R where $-R+a<x<R+a$

# intervals and derivatives
$f'(x)= c_{1}+2c_{2}(x-a)+3c_{3}(x-a)^2...=\sum\limits_{n=1}^{\infty}nc_n(x-a)^{n-1}=\sum\limits_{n=0}^{\infty}(n+1)c_{n}(x-a)^{n}$
$\int f(x)dx=C + c_{o}(x-a)+c_1\frac{(x-a)^2}{2}+c_2\frac{(x-a)^3}{3}...=C+\sum\limits_{n=0}^{\infty}c_n\frac{(x-a)^{n+1}}{n+1}$


# use to solve integrals
- any part of the integral that might be approximated by a power series can just be swapped out by its power series
- integrate and sum operations can be swapped around
- power series of a function is a geometric series, so its sum can be swapped in. $\sum\limits_{n=0}^{\infty}a_{n}(x-a_{n})^{n}=a\frac{1-r^{n}}{1-r}$ 