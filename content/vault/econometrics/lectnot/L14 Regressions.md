# L14 Regressions (WMS 5.3, 11)

1.  Regressions

    -  Sir Francis Galton 1886 (cousin of Darwin)

    -  Use data to determine (average) linear relationship $Y =\beta_{0} +\beta_{1}X$. Once relationship is known, we can predict $Y$ for any $X$ value (even out of sample), as if through a crystal ball!

    -  Examples:
		1.  Income $Y$ as function of education $X$
		2. Unemployment $Y$ next year as function of (e.g. fiscal or monetary) policy $X$
		3. Stock price tomorrow $Y$ as function of today's earnings/price $X$
		4. Consultant's "secret formula" predicting sales, etc.

    -  Puts units on correlation ("education and income are strongly correlated" vs. "each year of education is associated with an additional\$4k of income")

    -  Working example: education $\mu_{x} = 15$ years; $\sigma_{x} = 3$ years; income $\mu_{y} =\$ 70,000$; $\sigma_{y} =\$ 20,000$; correlation $\rho = .6$

    -  Any $\beta_{0}$ and $\beta_{1}$ determine line $Y =\beta_{0} +\beta_{1}X$, implying an error term $\varepsilon = Y -\beta_{0} -\beta_{1}X$ such that the data satisfies $Y =\beta_{0} +\beta_{1}X +\varepsilon$. We can choose $\beta_{0}$ and $\beta_{1}$ so that the resulting line is as useful as possible.

    -  "Least squares" regression: choose $\beta_{0}$ and $\beta_{1}$ to minimize $E(\varepsilon^{2})$
		1.  Equivalently, choose $\beta_{0}$ so that $E(\varepsilon) = 0$ and $\beta_{1}$ to minimize $V(\varepsilon)$
		2. Can use other criteria (e.g. least absolute deviation $E(|\varepsilon|)$), but less common

2.  Intercept

    -  If $\beta_{0}$ is high, most $\varepsilon_{i}$ will be negative; if $\beta_{0}$ is low, most $\varepsilon_{i}$ will be positive

    -  $E(\varepsilon) =\mu_{y} -\beta_{0} -\beta_{1}\mu_{x} = 0$ implies that $\beta_{0} =\mu_{y} -\beta_{1}\mu_{x}$.
 Easier: $\mu_{y} =\beta_{0} +\beta_{1}\mu_{x}$, so regression line passes through $(\mu_{x},\mu_{y})$

-  Example: $\beta_{0} =\$ 70,000 -\$ 4,000\cdot 15 =\$ 10,000$


3.  Slope

    -  $V(\varepsilon) = V(Y) + V(-\beta_{1}X) + 2Cov(Y, -\beta_{1}X) =\sigma_{y}^{2} +\beta_{1}^{2}\sigma_{x}^{2} - 2\beta_{1}\sigma_{\text{xy}}$

    -  To minimize, $0 =\frac{\text{dV}(\varepsilon)}{d\beta_{1}} = 2\beta_{1}\sigma_{x}^{2} - 2\sigma_{\text{xy}}$

    -  Solution $\beta_{1} =\frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}}\frac{\sigma_{y}}{\sigma_{x}} =\rho\frac{\sigma_{y}}{\sigma_{x}}$

    -  Slope is simply (normalized) correlation coefficient

    -  Example: $\beta_{1} = .6\frac{\$ 20,000}{3yr.} =\$ 4,000$/yr. (e.g. four-year degree provides extra \$16,000/yr)

    -  Equivalently, $\beta_{1}$ solves $\text{Cov}(X,\varepsilon) = 0$ (see homework)

4.  Predictions

    -  High school grad ($X^{*} = 12$) expects $Y^{*} =\$ 10k +\$ 4k(12) =\$ 58k$

    -  College grad ($X^{*} = 16$) expects $Y^{*} =\$ 10k +\$ 4k(16) =\$ 74k$

    -  Three PhDs ($X^{*} = 31$) expects $Y^{*} =\$ 10k +\$ 4k(31) =\$ 134k$
		1.  This assumes linear trend holds up, constant returns to scale (which may not be reasonable); in econometrics (Econ 388), learn nonlinear regressions

    -  Standardized
		1.  $\frac{Y^{*} -\mu_{y}}{\sigma_{y}} =\rho\frac{X^{*} -\mu_{x}}{\sigma_{x}}$ (since $\beta_{1} =\rho\frac{\sigma_{y}}{\sigma_{x}}$, $\mu_{y} =\beta_{0} +\beta_{1}\mu_{x}$, and $Y^{*} =\beta_{0} +\beta_{1}X^{*}$).
		2. If $X^{*}$ is $1$ or $2$ or $k$ standard deviation above $\mu_{x}$ then $Y^{*}$ is $\rho$ or $2\rho$ or $\text{kρ}$ standard deviations above $\mu_{y}$

    -  Stay in school to get rich?
		1.  Caveat 1: I made these numbers up. Before making important financial decisions, you should collect the true numbers.
		2. Caveat 2: We've modeled this as straight line, implying constant marginal returns to education; if decreasing marginal returns, might be better to use parabola (take Econometrics first).
		3. Caveat 3: Regressions just express correlation, still not causation (despite popular terminology of "dependent" and "independent" variables).
             1.  Maybe causation: school teaches useful skills that generate income.

             2.  Maybe reverse causation: schooling is pure consumption, and wealthy individuals can afford more.

             3.  Maybe spurious correlation: smart kids enjoy school (just as athletes enjoy sports) but would earn high incomes with or without school.
		4. Either way, predict higher incomes for those who do stay in school: going to school increases my prediction of your income, even if it doesn't increase your income.

    -  Reverse predictions
		1.  What if worker makes \$100k income and asks for you to guess education?
		2. Could read regression backward, but it was designed to minimize errors in income not errors in education
		3. Better to start over, with income as $X$ and education as $Y$

5.  Errors

    -  $\varepsilon_{i} = y_{i} -(\beta_{0} +\beta_{1}x_{i})$

    -  De-trend data (e.g. "skill" or "luck", above and beyond education)

    -  Example: who is more genius (or luckier): $(x,y) = (12,\$ 80k)$ or $(x,y) =(16,\$ 100k)$?
		   1.  $\$ 80k -(10 + 4\cdot 12) =\$ 22k$
		   2. $\$ 100k -(10 + 4\cdot 16) =\$ 26k$

    -  Variance $\sigma_{\varepsilon}^{2}$ of error distribution tells us how far people are off the regression line
 $\sigma_{\varepsilon}^{2} = V(Y -\beta_{0} -\beta_{1}X) =\sigma_{y}^{2} +\beta_{1}^{2}\sigma_{x}^{2} - 2\beta_{1}\text{cov}(X,Y)$ $= {20k}^{2} + {4k}^{2}3^{2} - 2(4k)(.6\times 20k\times 3) =(\$ 16k)^{2}$

6.  Explanatory power (%)

    -  Partition $V(Y) =\beta_{1}^{2}V(X) + V(\varepsilon) = 144 + 256$
		1.  Note: $2\beta_{1}\text{Cov}(X,\varepsilon) = 0$ (see homework) because optimal slope extracts all correlation
		2. This decomposes $V(Y)$ into "explained" 144 plus "unexplained" 256 (e.g. talent, luck, or some other mystery). (Warning: terminology sounds like causation, but isn't; more accurately, variation is "related to education" and "unrelated to education".)

    -  "Explained" portion is $\rho^{2}$ fraction of $\sigma_{y}^{2}$
		1.  "Explained" portion is $\frac{144}{400} = .36$
		2. Generically, $\beta_{1}^{2}\sigma_{x}^{2} =(\frac{\sigma_{y}}{\sigma_{x}}\rho)^{2}\sigma_{x}^{2} =\rho^{2}\sigma_{y}^{2}$; thus, "explained" variation is always $\rho^{2}$ (sometimes called "coefficient of determination") fraction of $\sigma_{y}^{2}$. In this case ${.6}^{2} = 36\%$

    -  "Unexplained" portion is $1 -\rho^{2}$
		1.  In this case, $1 - {.6}^{2} = 64\%$, so $\sigma_{\varepsilon}^{2} = .64(\$ 20k)^{2}$

    -  Implicit linearity of $\rho$
		1.  Fundamentally, what does $\rho$ measure?
		2. $X^{2}$ is perfectly predictable from $X$, but linear regression produces $\rho^{2} < 1$
		3. Thus, $\text{corr}(X,X^{2})\neq 1$
		4. $\rho$ fundamentally measures *linear* relationship (see homework)