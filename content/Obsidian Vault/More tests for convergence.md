#math/calculus 

# Direct Comparison Test
$\sum\limits \frac{1}{2^{n+1}} \textasciitilde \sum\limits \frac{1}{2^n}$

1. if $\sum b_{n}$ converges $\&\ a_{n}<b_{n} \forall n => \sum a_{n}$ converges
2. if $\sum b_{n}$ diverges $\&\ a_{n}>b_{n} \forall n \Rightarrow \sum\limits a_{n}$ diverges 

# Limit Comparison Test
it's actually just an addition to the principle of an upper bound. It evaluates limits directly.
for all $\sum\limits a_{n}, \sum\limits b_{n}$ positive,
$\lim_{n\Rightarrow \infty} \frac{a_{n}}{b_{n}}=c$ exists
if c>0 & is finite, then a follows b
$c=0 \Rightarrow$ both converge
$c=\infty \Rightarrow$ both diverge


# Error for estimated 
If the sum itself is hard to compute, bound it with a diverging series above and use that series' error function.
$R_{n}\leq T_{n} < \frac{1}{2n^{2}}$