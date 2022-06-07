---
cards-deck: default_obsidian
---

#math/calculus 

# simpson's rule
Another way to [[Approximation|Approximate an Integral]], especially strong for approximating an especially curvy integral. 

to get the integral with interval from -h to h, approximate by:
#card
$$\frac{h}{3}(y_0+4y_1+y_2)$$
So that's basically like the midpoint or trapezoidal rule but curved in a primitive way. 
Simpson's rule is cut up into smaller pieces, like:
$\int_{1}^{2} \frac{1}{x}dx$
h is split up into 10, $h=1/10$
intervals are 1,1.1,1.2, etc
using simpsons looks like:
$$
[1,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2]
$$
$$
\frac{1}{3}* \frac{1}{10}*(1+4*1.1+1.2\ +\ 1.2+4*1.3+1.4\ +\ 1.4+4*1.5+1.6\ .....etc)
$$
or more simply:
$$\frac{1}{3}* \frac{1}{10}*(1+4*1.1+2*1.2+4*1.3+2*1.4\ ... \ 4*1.9+2)$$
^1652282160437

## error
#card 
$$|E_S|=\frac{k(b-a)^5}{180n^4}$$
k is the maximum (absolute) value fourth derivative ($f''''(x)=f^{(4)}$) of the function $|f^{(4)}(x)|\le k$
^1652381165392
