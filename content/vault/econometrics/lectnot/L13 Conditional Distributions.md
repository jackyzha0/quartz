# L13 Conditional Distributions (WMS 5.3, 11)

1.  Recall distribution of cell phone use and car accidents:

|         | $Y = 0$ | $Y = 1$ | $Y = 2$ |
|---------|---------|---------|---------|
| $X = 0$ | .60     | .08     | .02     |
| $X = 1$ | .10     | .12     | .08     |

-  Recall $\mu_{x} = .3,\sigma_{x}\approx .458,\mu_{y} = .4,\sigma_{y}\approx .663,\rho\approx .527$


2.  Conditional probability

    -  Cell phone use among those with two accidents $P(X=1|Y = 2) =\frac{.08}{.10} = .80$ versus those with no accidents $P(X=1|Y = 0) =\frac{.10}{.70}\approx 0.14$

    -  Practice: find $P_{y}(0|X = 0) =\frac{.60}{.7}\approx .86$, $P_{y}(1|X = 0) =\frac{.08}{.7} = .11$,$P_{y}(2|X = 0) =\frac{.02}{.7}\approx .03$, $P_{y}(0|X = 1) =\frac{.10}{.3}\approx .33$, $P_{y}(1|X = 1) =\frac{.12}{.3} = .40$, $P_{y}(2|X = 1) =\frac{.08}{.3}\approx .27$

3.  Conditional distribution

    -  $P(y|X = 0)$ and $P(y|X = 1)$ are legitimate distribution functions (numerators sum to denominator)

    -  Plot, and compare with $P(y)$

    -  Conditional mean
	  1.  $E(Y|X = 1) =\sum\text{yP}(X = 1)$ $\approx 0(.33) + 1(.40) + 2(.27) = .94$
	  2. Practice $E(X = 0)\approx 0(.86) + 1(.11) + 2(.03) = .17$
    -  Average number of car accidents is higher for cell phone users than for non-users. This still doesn't imply causation!
    -  Conditional standard deviation
	      1.  Just like $V(Y) = E(Y^{2}) -\lbrack E(Y)\rbrack^{2}$,
 			   $V(Y|X = x) = E(Y^2|X = x) -\lbrack E(Y|X = x)\rbrack^{2}$
		    1. (If time) Example : $E(Y^2|X = 1)$ $\approx 0^{2}(.33) + 1^{2}(.40) + 2^{2}(.27) = 1.21$, so
 In this case, $V(Y|X = 1)\approx 1.21 - {.94}^{2}\approx \sqrt{0.326}$, and $\sigma_{y|X = 1}\approx\approx 0.57$ By a similar derivation, $\sigma_{y|X = 0}\approx 0.41$; cell phone use increases variance.

4.  In an effort to establish causation, could find $P(x,y|Z = z) =\frac{P(x,y,z)}{P_{z}(z)}$ or $f(Z = z) =\frac{f(x,y,z)}{f_{z}(z)}$, and then $\rho_{xy|z} = Corr(X,Y|Z = z)$. For example, find correlation between cell phone use and car accidents *among teenagers*.

5.  Continuous densities

    -  Recall joint density of cereal inventory, $f(x,y) =\frac{1}{4}x +\frac{1}{2}y;x\in\lbrack 0,2\rbrack,y\in\lbrack 0,1\rbrack$

    -  Recall marginal densities $f_{x}(x) =\frac{1}{4}x +\frac{1}{4};x\in\lbrack 0,2\rbrack$ and $f_{y}(y) =\frac{1}{2} + y;y\in\lbrack 0,1\rbrack$, means $\mu_{x} =\frac{7}{6}$, $\mu_{y} =\frac{7}{12}$, standard deviations $\sigma_{x}\approx .55$, $\sigma_{y}\approx 0.28$

    -  Conditional density $f_{x}(x|Y = y) =\frac{f(x,y)}{f_{y}(y)} =\frac{\frac{1}{4}x +\frac{1}{2}y}{\frac{1}{2} + y} =\frac{x + 2y}{2 + 4y};x\in\lbrack 0,2\rbrack$. For example, $f_{x}(x|Y = 0) =\frac{x}{2};x\in\lbrack 0,2\rbrack$

    -  Conditional mean and standard deviation
 $E(X|Y = 0) = x(\frac{x}{2})dx =\lbrack\frac{1}{6}x^{3}\rbrack_{0}^{2} =\frac{8}{6} =\frac{4}{3}$ $E(X^2|Y = 0) = x^{2}f_{x}(0)dx = x^{2}(\frac{x}{2})dx =\lbrack\frac{1}{8}x^{4}\rbrack_{0}^{2} = 2$ $V(X|Y = 0) = E(Y = 0) -\lbrack E(Y = 0)\rbrack^{2} = 2 -(\frac{4}{3})^{2} =\frac{2}{9}$. $\sigma_{x|Y = 0} =$ Thus, when $Y = 0$: density of $X$ is steeper, mean of $X$ is higher, variance is lower.

-  More generically, for arbitrary $y$ value,
 $E(X|Y = y) = \int xf_{x}(x|y)dx = \int_0^2x(\frac{x + 2y}{2 + 4y})\text{dx}$ 
 $=\frac{1}{2 + 4y}\int_0^2(x^{2} + 2xy)dx =\frac{1}{2 + 4y}\lbrack\frac{1}{3}x^{3} + x^{2}y\rbrack_{0}^{2} =\frac{1}{2 + 4y}(\frac{8}{3} + 4y) =\frac{4 + 6y}{3 + 6y}$
 For example, $E(X|y = 0) =\frac{4}{3}$ as before 
 Practice: $E(X|y = 1) =\frac{10}{9}$ 
 $E(X^2|Y = y) = \int x^{2}f_{x}(x|y)\text{dx}$ 
 $= \int_0^2x^{2}(\frac{x + 2y}{2 + 4y})dx =\ldots =\frac{6 + 8y}{3 + 6y}$ 
 $V(X|Y = y) = E(X^2|Y = y) -\lbrack E(X|Y = y)\rbrack^{2}$ 
 $=(\frac{6 + 8y}{3 + 6y}) -(\frac{4 + 6y}{3 + 6y})^{2}$ 
 $\sigma_{x|Y = y} =\sqrt{(\frac{6 + 8y}{3 + 6y}) -(\frac{4 + 6y}{3 + 6y})^{2}}$. For example, $\sigma_{x|Y = 0} = \sqrt{\frac{6}{3}-(\frac{4}{3})^2}=\sqrt{\frac{2}{9}}$ as before, 
 $\sigma_{x|Y = 1} =\sqrt{(\frac{14}{9})-(\frac{10}{9})^2}=\sqrt{\frac{26}{81}}\approx\frac{5}{9}$ Thus, when $Y = 1$, density of $X$ is less steep, mean is lower, variance is higher.

6.  With three variables, can derive joint distribution of $X$ and $Y$ conditional on $Z$

    -  Israel covid data
		1.  When covid Delta variant hit, Israeli hospitals filled up with covid patients. 60% of these patients had already been vaccinated.
		2. Natural (but erroneous) conclusion: vaccines make things worse, not better!
		3. Nearly 80% of Israelis over age 12 were vaccinated against covid, so if "random draw," 80% of hospital patients should have been vaccinated; lower rate means treatment helped.