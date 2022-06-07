# L16 Normal, Chi Square, t Distributions (WMS 4.5-4.6)

1.  Standardization (for later reference)

    -  If $E(X) =\mu$ and $V(X) =\sigma^{2}$ then you can always change units to create a new random variable $Z =\frac{X -\mu}{\sigma}$ such that $E(Z) = 0$ and $V(Z) = 1$
		1.  $E(Z) = E\lbrack\frac{1}{\sigma}(X -\mu)\rbrack =\frac{1}{\sigma}\lbrack E(X) -\mu\rbrack = 0$
		2. $V(Z) = V\lbrack\frac{1}{\sigma}X -\frac{1}{\sigma}\mu\rbrack = V(\frac{1}{\sigma}X) =\frac{1}{\sigma^{2}}V(X) = 1$

2.  Normal (or Gaussian, after German mathematician Carl Friedrich Gauss, 1809) $N(\mu,\sigma^{2})$

    -  $f(x) =\frac{1}{\sigma}e^{-\frac{1}{2}(\frac{x -\mu}{\sigma})^{2}}$ (integrate using polar coordinates or trig substitutions)

    -  $E(X) = x\frac{1}{\sigma}e^{-\frac{1}{2}(\frac{x -\mu}{\sigma})^{2}}dx =\ldots =\mu$ (u substitution)

    -  $V(X) = x^{2}\frac{1}{\sigma}e^{-\frac{1}{2}(\frac{x -\mu}{\sigma})^{2}}dx -\mu^{2} =\ldots =\sigma^{2}$ (integration by parts)

    -  No analytical cdf; instead, approximate numerically
		  1.  Excel: NORM.DIST(x, mu, sd, cdf?)
		  2. Percentiles: NORM.INV(percentile, mu, sd)

    -  Special Properties
		  1.  $N + 7\sim N$
              In other words, adding a constant changes the precise distribution of $X$ but keeps it in the normal family

1.  Note: this is true of some other families of random variables (e.g. uniform) but not all (e.g. Bernoulli, binomial, exponential)


ii. $3N\sim N$
 In other words, multiplying by a constant keeps $X$ in the normal family

1.  Note: this is true of some other families of random variables (e.g. uniform, exponential) but not all (e.g. Bernoulli, binomial)


iii. $N + N\sim N$
 That is, if $X\sim N(\mu_{x},\sigma_{x}^{2})$ and $Y\sim N(\mu_{y},\sigma_{y}^{2})$ then $X + Y\sim N(\mu_{x} +\mu_{y},\sigma_{x}^{2} +\sigma_{y}^{2} + 2\sigma_{\text{xy}})$ In other words, the sum of two normally distributed random variables is a normally distributed random variable

1.  Note: this is true of some other families of random variables (e.g. independent binomials), but not all (e.g. Bernoulli, correlated binomials, uniform, exponential)


3.  Standard normal $N(0,1)$

    -  Practice reading Table A
		1.  Excel: NORM.S.DIST(x, cdf?) or NORM.S.INV(percentile)
		2. $P(- 1 < X < 1)\approx .68$
		3. $P(- 2 < X < 2)\approx .95$
		4. $P(- 3 < X < 3)\approx .997$

    -  Symmetric: $P(X < - 3) = P(X > 3)$

    -  Standardized normal $Z =\frac{X -\mu}{\sigma}$ is standard normal $\sim N(0,1)$ (because of special properties of normal $X$)

    -  Example 1: $X\sim N(75,25)$ to find $P(X > 80) = P(Z >\frac{80 - 75}{})$
 $= P(Z > 1) = 1 - P(Z\leq 1)$ $\approx 1 - .8413 = .1587$

-  Example 2: costs $C\sim N(120,100)$
	1.  Budget $b$ so that $P(C < b) = .9$
	2. $.90 = P(C < b) = P(Z <\frac{b - 120}{10})\approx P(Z < 1.28)$ (from Table A)
	3. If $\frac{b - 120}{10}\approx 1.28$ then $b\approx 132.8$

-  Example 3: costs $C\sim N(120,100)$) and revenue $R\sim N(150,400)$ are independent; how often are profits $Y = R - C$ positive?
	1.  $Y\sim N$
	2. $E(Y) = E(R) - E(C) = 150 - 120 = 30$
	3. $V(Y) = V(R - C) = V(R) +(- 1)^{2}V(C) + 2Cov(R,C) = 400 + 100 = 500$
	4. So $Y\sim N(30,500)$
	5.  $P(Y > 0) = P(Z >\frac{0 - 30}{})\approx P(Z > - 1.34) = P(Z < 1.34)\approx .9099$


4.  $W\sim\chi^{2}(\nu)$ (German statistican Friedrich Robert Helmert, 1875)

    -  Domain is $\lbrack 0,\infty)$, roughly bell-shaped (but asymmetric, unlike Normal distribution)

    -  $\nu$ is often called "degrees of freedom", because in the most common application, it corresponds to how many

    -  $E(W) =\nu$ and $V(W) = 2\nu$

    -  $f(w) = ugly$ (I won't expect you to know or use)

    -  CDF $F(w)$ approximated on Table 6
		1.  $\chi_{\alpha}^{2}$ represents a realization of the random variable, where $\alpha$ is the probability to the right of that value (i.e., $1 - F(w)$)
		2. Example: suppose sales follow Chi-square distribution, with average of 30 units
            1.  Degrees of freedom $\nu = 30$

            2.  10^th^ percentile is $\chi_{.90}^{2}\approx 20.6$, 90^th^ percentile is $\chi_{.10}^{2}\approx 40.3$

            3.  Putting these together, $P(20.6 < W < 40.3)\approx .8$
		3. Note: Table 6 only gives 10 points on the cdf. With a computer, you can get the rest. Excel: CHISQ.DIST(x,df, cdf?), CHISQ.INV(percentile, df)

    -  Facts
		1.  If $Z\sim N(0,1)$ then $Z^{2}\sim\chi^{2}(1)$
		2. If $W_{1}\sim\chi^{2}(4)$ and $W_{2}\sim\chi^{2}(7)$ independent then $W_{1} + W_{2}\sim\chi^{2}(11)$
		3. Variance is a quadratic function of a random variable, so when we estimate the variance of a random variable that has a normal distribution (in lecture L19), our estimates will follow a $\chi^{2}$ distribution.

5.  $t$ distribution (Friedrich Robert Helmert 1876, Karl Pearson 1900)

    -  $T\sim t(\nu)$; as in Chi-square distribution, $\nu$ is called "degrees of freedom"

    -  Similar to standard normal, but with higher variance (i.e. thicker tails)

    -  Approaches $N(0,1)$ as $\nuarrow\infty$

    -  $f(t) = ugly$ (I won't expect you to know or use)

    -  $E(T) = 0$, $V(T) =\frac{\nu}{\nu - 2}arrow 1$

    -  CDF $F(t)$ approximated on Table C
		1.  Table is oriented so that probability $C$ lies between $- t^{*}$ and $t^{*}$.
		2. Example: if $T\sim t(20)$ find 90^th^ percentile
            1.  Following $C = 80\%$ (fifth column) for $df = 20$ leads to $t^{*} = 1.325$.

            2.  In other words, $10\%$ of the distribution is left of $- 1.325$, $80\%$ is between $- 1.325$ and $1.325$, and $10\%$ is above $1.325$.

            3.  Since $10\% + 80\% = 90\%$ of the distribution is below $1.325$ and $10\%$ is above, $1.325$ is the 90^th^ percentile of the distribution.

            4.  Alternatively, can come up from a one-sided p-value of $.10$ or a two-sided p-value of $.20$ (bottom of the table) to reach the same conclusion.
		3. For degrees of freedom greater than $1000$, can read $z^{*}$ row of the table, which corresponds to a standard normal distribution (i.e., $\infty$ degrees of freedom).
		4. Note: Table C only gives 12 points on CDF. With a computer, you can get the rest. Excel: T.DIST(x, df, cdf?) and T.INV(percentile, df)

    -  Fact
		1.  If $Z\sim N(0,1)$ and $W\sim\chi^{2}(\nu)$ independent then $\frac{Z}{}\sim t(\nu)$
		2. If we knew the population variance, then estimates of the mean would follow a normal distribution. Since we have to estimate the population variance, and estimates follow a $\chi^{2}$ distribution, our estimates of the mean follow a $t$ distribution

6.  Other distributions

    -  The distributions we've gone over are some of the most common; there are many others, with various shapes, properties, and uses.

    -  Illustrated: https://www.itl.nist.gov/div898/handbook/eda/section3/eda366.htm

    -  Discrete
		1.  Uniform
		2. Binomial
		3. Geometric
		4. Poisson
		5.  Hypergeometric

    -  Continuous
		1.  Exponential
		2. F
		3. Beta
		4. Gamma
		5.  Log-normal
		6. Pareto
		7. Weibull