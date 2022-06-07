---
title: "taylor"
---
#math/calculus 

# formula
#card/reverse 
$\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n !}(x-a)^{n}$
$n ! \quad=$ factorial of $\mathrm{n}$
$a \quad=$ real or complex number
$f^{(n)}(a)=$ nth derivative of $f$ evaluated at the point a

 

![[Pasted image 20220603201244.png]]


mclaurin series is the same, except a is 0

# When it's a power series
if $\sum\limits_{n=0}^{\infty}c_{n}(x-a)^{n}= f(x)$,
so
if $f(x)=\lim_{x->\infty}T(x)$ and $T(x)=\sum\limits_{i=0}^{n}f^{i}\frac{a}{i!}(x-a)^i$, and remainder $Rn(x)=f(x)-T(x)$ its a power series if $lim_{x->0}Rn(x)=0$

$|R_{n}(x)|\leq \frac{M}{(n+1)!}|x-a|^{n+1}$
if $|f^{n+1}(x)|\leq M|x-2|\leq d$ 
for example, in the case of a taylor series for $e^{x}$ centered at 2: $|e^{x}|\leq e^{d+2}= M$ thus $|Rn(x)|\leq \frac{e^{d+2}}{(n+1)!}d^{n+1}$ lim both approach zero, so $e^{x}= \sum\limits_{n=0}^{\infty} \frac{e^{2}}{n!}(x-2)^n$

# nice power series

$e^n=$ ::: $\sum\limits \frac{x^{n}}{n!}$
$\frac{1}{1-x}=$ ::: $\sum\limits x^{n}$
$sin(x)$ ::: $\sum\limits \frac{(-1)^{n}x^{2n+1}}{(2n+1)!}$
$arctan(x)$ ::: $\sum\limits \frac{(-1)^{n}x^{2n}}{2n!}$


[[binomial series]]