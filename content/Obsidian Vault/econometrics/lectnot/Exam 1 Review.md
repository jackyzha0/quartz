# Exam 1 Review

1.  Spiritual thought: prayer through life's trials, faith without works is dead, obedience gives confidence

2.  Exam info

# Exam 1 Review

1.  Spiritual thought: prayer through life's trials, faith without works is dead, obedience gives confidence

2.  Exam info

    -  Any calculator

    -  No time limit, predict 2-3 hours

    -  Handout provided

    -  Hard: typically C average

3.  Study tips

    -  Take it seriously: equal weight with final exam

    -  Start with study guide

    -  Practice exams (first without solutions, then with)

    -  Extra homework problems (or repeat homework problems)

    -  Time saver: talk through steps, don't work out algebra

4.  Exam strategies

    -  Don't forget to pray!

    -  Extend familiar material to unfamiliar settings (good practice for real world)

    -  Difficulty is similar to homework, but no TAs or books, so fewer A's than homework

    -  Average score is typically C, which averaged with A- homework gives B- overall.

    -  Show work and list what you know for partial credit (e.g. $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}}$, even if you can't figure out $\sigma_{\text{xy}}$)

5.  Key formulas

    -  Binary events
		  1.  $P(E) =\frac{\# E}{\# S}$
		  2. $C_{k}^{n} =\frac{n!}{k!(n - k)!}$
		  3. $P(A\cup B) = P(A) + P(B) - P(A\cap B)$
		  4. Independent events: $P(A\cap B) = P(A)P(B)$ (or $P(B) = P(A)$)
		  5.  $P(B) =\frac{P(A\cap B)}{P(B)}$
		  6. $P(A\cap B) = P(B|A)P(A)$

    -  Random variables
	      1.  Legitimate distribution? $\sum P(x) =\int f(x)dx = 1$
	      2. Mode maximizes $P(x)$ or $f(x)$ (i.e. $f^{'}(x) = 0$ and $f^{''}(x) < 0$)
	      3. $\mu = E(X) =\sum xP(x) =\int xf(x)\text{dx}$
	      4. $E(X^{3}) =\sum x^{3}P(x) =\int x^{3}f(x)\text{dx}$
	      5.  $\sigma^{2} = V(X) = E\lbrack(X -\mu)^{2}\rbrack = E(X^{2}) -\mu^{2}$; $\sigma =\sqrt{V(X)}$
	      6. $F(x) = \int_{-\infty}^xf(\widetilde{x})d\widetilde{x}$, $f(x) = F'(x)$
	      7. $P(a < X < b) = F(b) - F(a)$
	      8. Percentile: solve $F(\phi_{.5}) = .5$
	      9. $f(x) = F'(x)$

    -  Joint distributions
	      1.  Legitimate joint distribution? $\sum\sum P(x,y) =\iint_{}^{}f(x,y)dxdy = 1$
	      2. Marginal distribution
              $P_{x}(x) = P(x,y)$ $f_{x}(x) =\int f(x,y)\text{dy}$
          3. Independent variables
              $P(x,y) = P_{x}(x)P_{y}(y)$ $f(x,y) = f_{x}(x)f_{y}(y)$
		  4. $E(\frac{X}{Y}) =\sum\sum(\frac{x}{y})P(x,y) =\iint_{}^{}(\frac{x}{y})f(x,y)\text{dxdy}$
          5.  $\text{Cov}(X,Y) = E\lbrack(X -\mu_{x})(Y -\mu_{y})\rbrack = E(\text{XY}) -\mu_{x}\mu_{y}$
          6. $\rho =\frac{\text{Cov}(X,Y)}{\sigma_{x}\sigma_{y}}$
          7. Conditional distribution
              $P(X=x|Y = 3) =\frac{P(x,3)}{P_{y}(3)}$ 
			  $f_{x}(x|Y = 3) =\frac{f(x,3)}{f_{y}(3)}$
          8. $E(X|Y = 3) =\sum xP(x|Y = 3) =\int xf(x|Y = 3)\text{dx}$
          9. $V(X|Y = 3) = E(X^2|Y = 3) -\lbrack E(X|Y = 3)\rbrack^{2}$
    -  Regressions
	      1.  $\beta_{1} =\frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} =\rho\frac{\sigma_{y}}{\sigma_{x}}$
	      2. $\beta_{0} =\mu_{y} - b\mu_{x}$
	      3. $\frac{V(a + bX)}{V(Y)} =\rho^{2}$
	      4. $\varepsilon_{i} = Y_{i} -(\beta_{0} +\beta_{1}X_{i})$


6.  Algebra tricks

    -  $E(\$ 100 -\$ 5X) =\$ 100 -\$ 5E(X)$

    -  $V(\$ 100 -\$ 5X +\$ 3Y) = V(\$ 100) + V(-\$ 5X) + V(\$ 3Y) + 2Cov(-\$ 5X,\$ 3Y) = 0 +(\$ 5)^{2}V(X) +(\$ 3)^{2}V(Y) -\$ 30Cov(X,Y)$

    -  $\text{Cov}(\$ 100 -\$ 5X,Y) = Cov(\$ 100,Y) + Cov(-\$ 5,Y) = 0 -\$ 5Cov(X,Y)$

    -  $\text{Corr}(\$ 100 -\$ 5X,Y) = Corr(- X,Y) = - Corr(X,Y)$

7.  Distributional relationships

    -  If $X\sim N$ then $3X\sim N$ and $X + 7\sim N$

    -  If $X_{1},X_{2}\sim N$ then $X_{1} + X_{2}\sim N$

    -  If $Z\sim N(0,1)$ then $Z^{2}\sim\chi^{2}(1)$

    -  If $W_{1}\sim\chi^{2}(3),W_{2}\sim\chi^{2}(5)$ independent then $W_{1} + W_{2}\sim\chi^{2}(8)$ and $\frac{W_{1}/3}{W2/5}\sim F(3,5)$

    -  If $Z\sim N(0,1)$ and $W\sim\chi^{2}(\nu)$ independent then $\frac{Z}{}\sim t(\nu)$

8.  Rejoice in how much we've learned!