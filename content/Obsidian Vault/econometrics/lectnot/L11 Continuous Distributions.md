# L11 Continuous Distributions (WMS 4.1-3)

1.  Continuous random variables

    -  Infinite domain, e.g. sleep hours $x\in\lbrack 6,9\rbrack$

    -  Philosophical view: continuous functions conveniently approximate discrete world, or world is truly infinite but measurement is imprecise

2.  Probability density function (pdf) $f(x)$

    -  Measures relative likelihood of individual $x$ values

    -  Individual $x$ values occur with zero probability (and $\int_7^8f(x) > 1$ is possible); to find probabilities, must take definite integral $P(7 < X < 8) = f(x)\text{dx}$

    -  Density must be non-negative and integrate to one over domain (just like probabilities sum to one)

    -  Example $f(x) = k(- x^{2} + 16x - 60)$; $6\leq x\leq 9$
		1.  Not directly from (finite) data; maybe from calibrated theory
		2. Find $k$
            1.  $1 = \int_6^9f(x)dx = k\lbrack -\frac{1}{3}x^{3} + 8x^{2} - 60x\rbrack_{6}^{9} = k\lbrack (- 243 + 648 - 540) -(- 72 + 288 - 360)\rbrack = 9k$ requires that $k =\frac{1}{9}$

            2.  That is, $f(x) = -\frac{1}{9}x^{2} +\frac{16}{9}x -\frac{60}{9}$; $6\leq x\leq 9$
		3. Mode solves $f^{'}(x) = -\frac{2}{9}kx +\frac{16}{9}k = 0$; solution at $x = 8$
             1.  Note: if $f^{'}(x)$ everywhere positive/negative then maximum is at highest/lowest $x$ in range

             2.  Note: second-order condition $f^{''}(x) = -\frac{2}{9}k\leq 0$ satisfied as long as $k\geq 0$
		4. Probabilities: $P(7\leq x\leq 8) =\frac{1}{9}(- x^{2} + 16x - 60)dx =\ldots =\frac{11}{27}\approx 0.4$

3.  Cumulative distribution function (cdf) $F(x)$

    -  $F(x) = P(X\leq x) =\frac{1}{9}(- {\widetilde{x}}^{2} + 16\widetilde{x} - 60)d\widetilde{x}$
 	$=\lbrack -\frac{1}{27}{\widetilde{x}}^{3} +\frac{8}{9}{\widetilde{x}}^{2} -\frac{20}{3}\widetilde{x}\rbrack_{\widetilde{x} = 6}^{\widetilde{x} = x} = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16$ (This assumes $6\leq x\leq 9$; if $x < 6$ then $F(x) = 0$ and if $x > 9$then $F(x) = 1$)
	-  Percentiles
 Median $F(x) = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16 =\frac{1}{2}$; solving by computer, $x\approx 7.8$ $75^{th}$ percentile $F(x) = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16 = .75\Rightarrow x\approx 8.4$ $95^{th}$ percentile $F(x) = -\frac{1}{27}x^{3} +\frac{8}{9}x^{2} -\frac{20}{3}x + 16 = .90\Rightarrow x\approx 8.7$

	-  Easier probabilities $P(7\leq X\leq 8) = F(8) - F(7)$
 	$=(-\frac{1}{27}8^{3} +\frac{8}{9}8^{2} -\frac{20}{3}8 + 16) -(-\frac{1}{27}7^{3} +\frac{8}{9}7^{2} -\frac{20}{3}7 + 16) =\frac{11}{27}\approx 0.4$

	-  From cdf, get pdf $f(x) = F^{'}(x) = -\frac{1}{9}x^{2} +\frac{16}{9}x -\frac{60}{9}$; $6\leq x\leq 9$, else $f(x) = 0$


4.  Moments

    -  Mean
 $\mu = E(X) =\int\text{xf}(x)\text{dx}$ (just like $E(X) =\sum xP(x)$) $= \int_6^9x\frac{1}{9}(- x^{2} + 16x - 60)\text{dx}$ $=\int_6^9\frac{1}{9}(- x^{3} + 16x^{2} - 60x)dx =\ldots =\frac{31}{4}\approx 7.75$

-  Standard deviation
	1.  $E(X^{2}) = \int_6^9x^{2}f(x)\text{dx}$
 $= \int_6^9x^{2}\frac{1}{9}(- x^{2} + 16x - 60)dx =\int_6^9\frac{1}{9}(- x^{4} + 16x^{3} - 60x^{2})dx =\ldots =\frac{303}{5}$

ii. $V(X) = E(X^{2}) -\mu^{2} =\frac{303}{5} -(\frac{31}{4})^{2} =\frac{43}{80}$

iii. $\sigma_{X} =\sqrt{\frac{43}{80}}\approx 0.73$


-  Note: algebra tricks still work (e.g. lost wages while sleeping)
	1.  $E(\$ 20X) =\$ 20E(X) =\$ 20\cdot 7.75 =\$ 155$
	2. $V(20X) = 20^{2}V(X)$


5.  Practice describing steps to classmate: Warehouse stock (as fraction of capacity) $f(x) = - 2x^{2} + kx +\frac{1}{6};0\leq x\leq 1$

    -  Find $k = 3$

    -  mode $=\frac{3}{4}$

    -  Draw and interpret pdf (upside-down parabola; warehouse full more often than empty)

    -  Find cdf $F(x) = -\frac{2}{3}x^{3} +\frac{3}{2}x^{2} +\frac{1}{6}x;0\leq x\leq 1$

    -  Find $f(x)$ from $F(x)$

    -  $P(\frac{1}{2}\leq X\leq\frac{3}{4}) =\frac{5}{16}$

    -  median $\approx .6$, 75^th^ percentile $\approx .8$

    -  mean $\mu\approx 0.58$
	-  standard deviation $\sigma\approx 0.26$

    -  Insurance payout $\pi =\$ 1,000,000X +\$ 100,000$
		1.  $E(\pi) =\$ 1,000,000\mu +\$ 100,000 =\$ 680,000$ $\sigma_{\pi} = \sqrt{V(\$1,000,000X+\$100,000)} =\$ 1,000,000\sigma_{x} =\$ 260,000$