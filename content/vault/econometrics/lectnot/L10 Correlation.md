# L10 Correlation (WMS 3.1-8)
\[Long lecture; use time efficiently\]

1.  Correlation coefficient $\rho\in\lbrack - 1,1\rbrack$

    -  Positive correlation means variables $X$ and $Y$ tend to move in same direction (e.g. temperature $X$ and ice cream sales $Y$)

    -  Negative correlation means variables $X$ and $Y$ tend to move in opposite direction (e.g. frequency of exercise $X$ and body mass index $\text{Y}$)

    -  Magnitude indicates strength of relationship

    -  Independence implies $\rho = 0$

2.  Joint distribution function

    -  Employee hours per week $X$ and hourly wage $Y$

|          | $Y = 10$ | $Y = 15$ |
|----------|----------|----------|
| $X = 20$ | .2       | .1       |
| $X = 30$ | .1       | .2       |
| $X = 40$ | .1       | .3       |
 Illustrate: $P(x,y) = P(X = x\cap Y = y) =\begin{cases}.2\ if (x,y) =(20,10)\\.1\ if\ (x,y) =(20,15)\\.1\ if\ (x,y) =(30,10)\\.2\ if\ (x,y) =(30,15)\\.1\ if\ (x,y) =(40,10)\\.3\ if\ (x,y) =(40,15)\end{cases}$

3.  Marginal distributions

    -  Sum rows or columns: $P(x) =\begin{cases}.3\ if\ x = 20\\.3\ if\ x = 30\\.4\ if\ x = 40\end{cases}$ and $P(y) =\begin{cases}.4\ if\ y = 10\\.6\ if\ y = 15\end{cases}$

    -  Summary statistics (quick recap)
		1.  $\mu_{x} = 20(.3) + 30(.3) + 40(.4) = 31$
		2. $\sigma_{x}\approx 8.3$
            1.  $E(X^{2}) = 20^{2}(.3) + 30^{2}(.3) + 40^{2}(.4) = 1,030$
            2.  $\sigma_{x}^{2} = 1,030 - 31^{2} = 69$
            3.  $\sigma_{x} =\sqrt{69}\approx 8.3$
		3. $\mu_{y} = 10(.4) + 15(.6) = 13$
		4. $\sigma_{y}\approx 2.4$
            1.  $E(Y^{2}) = 10^{2}(.4) + 15^{2}(.6) = 175$

            2.  $\sigma_{y}^{2} = 175 - 13^{2} = 6$

            3.  $\sigma_{y} =\sqrt{6}\approx 2.4$

    -  Independence
		1.  Definition: $P(x,y) = P_{x}(x)P_{y}(y)$ for every $(x,y)$ pair
		2. Not independent here, since $P(20,10) = .20\neq P(20)P(10) = .3\times .4 = .12$

4.  Expectations of functions of $X$ and $Y$

    -  Average weekly payment $E(\text{XY}) =(20\cdot 10)(.20) +(20\cdot 15)(.10) +(30\cdot 10)(.10) +(30\cdot 15)(.20) +(40\cdot 10)(.10) +(40\cdot 15)(.30) = 40 + 30 + 30 + 90 + 40 + 180 = 410$

    -  Can do any function $E\lbrack f(X,Y)\rbrack = f(x,y)P(x,y)$

5.  Correlation

    -  Covariance
 $\sigma_{\text{xy}} = E\lbrack(X -\mu_{x})(Y -\mu_{y})\rbrack$ $=\lbrack(20 - 31)(10 - 13)\rbrack(.20)$ $+\lbrack(20 - 31)(15 - 13)\rbrack(.10)$ $+\lbrack(30 - 31)(10 - 13)\rbrack(.10)$ $+\lbrack(30 - 31)(10 - 15)\rbrack(.20)$ $+\lbrack(40 - 31)(10 - 13)\rbrack(.10)$ $+\lbrack(40 - 31)(15 - 13)\rbrack(.30) = 7$
    -  Simpler formula: $\sigma_{\text{xy}} = E(\text{XY}) -\mu_{x}\mu_{y} = 410 -(31)(13) = 7$

    -  Correlation $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{7}{(8.3)(2.4)}\approx 0.35$
	      1.  Positive, but fairly weak (again, not independent)
	      2. Later: $\rho^{2}\approx 0.12$ measures % of variation in $Y$ that covaries with $X$


6.  Algebra shortcuts

    -  Covariance of a sum
 $\text{Cov}(X,1200 - 2000Y) = Cov(X,1200) + Cov(X, - 2000Y) = 0 +(- 2000)\sigma_{\text{xy}}$

    -  Correlation of a sum
 $\text{Corr}(X,1200 - 2000Y) = -\rho$

    -  Variance of a sum
 $V(X + Y) = V(X) + V(Y) + 2Cov(X,Y)$

    -  Variance of a larger sum
 $V(X + Y + Z) = V(X) + V(Y) + V(Z) + 2Cov(X,Y) + 2Cov(X,Z) + 2Cov(Y,Z)$ (with 100 variables, $C_{2}^{100}\approx 5000$ $\text{Cov}$ terms)

    -  Importance of independent samples


7.  Application: financial diversification

    -  Assume two stocks have same average return $\mu_{x} =\mu_{y} =\mu$ and same standard deviation $\sigma_{x} =\sigma_{y} =\sigma$.

    -  You could buy two shares of $X$, or one share of $X$ and one share of $Y$. Since you are indifferent between $X$ and $Y$, it might seem that you should be indifferent between these two stock portfolios.

    -  However, on your homework, you will prove that $E(2X) = E(X + Y)$ but $V(2X) < V(X + Y)$, as long as $X$ and $Y$ are not perfectly correlated (i.e. $\rho < 1$). In fact, if they are perfectly *negatively* correlated then $V(X + Y) = 0$!

    -  Thus, the common financial advice to "Diversify your portfolio".

8.  Practice\[if time\]: Cell phone use $X$ and number $Y$ of car accidents

|         | $Y = 0$ | $Y = 1$ | $Y = 2$ |
|---------|---------|---------|---------|
| $X = 0$ | .60     | .08     | .02     |
| $X = 1$ | .10     | .12     | .08     |

-  Note: numerical values can be assigned to binary categorical variables, so that notion of correlation is still meaningful.

-  Marginal distribution $P(X = x) =\begin{cases}.70\ if\ x = 0\\.30\ if\ x = 1\end{cases}$, mean $E(X) = .3$, variance $\sigma_{x}^{2} = E(X^{2}) -\mu_{x}^{2} = .3 - {.3}^{2} = \sqrt{.21}$, standard deviation $\sigma_{x} =\approx 0.458$

-  Marginal distribution $P(Y = y) =\begin{cases}.70\ if\ y = 0\\.20\ if\ y = 1\\.10\ if\ y = 2\end{cases}$, mean $E(Y) = .4$, variance $\sigma_{y}^{2} = \sqrt{.44}$, standard deviation $\sigma_{y} =\approx 0.663$

-  Not independent since $P(0,0) = .6\neq P_{x}(0)P_{y}(0) =(.7)(.7) = .49$

-  $E(\text{XY}) =(0)(0)(.60) +(0)(1)(.08) +(0)(2)(.02) +(1)(0)(.10) +(1)(1)(.12) +(1)(2)(.08) = .28$

-  Covariance $\sigma_{\text{xy}} = E(\text{XY}) -\mu_{x}\mu_{y} = .28 -(.3)(.4) = .16$

-  Correlation $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{.16}{(.458)(.663)}\approx 0.527$ positive and moderately strong