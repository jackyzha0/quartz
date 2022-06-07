# L1 Math Preview

1.  Spiritual thought: like Joseph in Egypt, your time at BYU is 7 years of plenty (spiritual abundance). Likely less so when you go to graduate school or workforce. Store up all you can now (e.g. devotionals, religion classes, student ward, ministering), like wise virgins with oil lamps, to sustain you as you "go forth to serve"

2.  In a similar (but temporal) way, this lecture and HW 1 seek to fill your "math lamps" in preparation for the rest of the semester.

3.  Factorials

    -  $5! = 5\cdot 4\cdot 3\cdot 2\cdot 1$

    -  $0! = 1$

4.  Exponents

    -  $e\approx 2.7$ denotes growth
		1.\$1 invested at 100% interest, compound annually, equals\$2 a year later
		2.\$1 invested at 100% interest, compound continuously, equals\$2.72 a year later

| Expression                 | Simplified / Rewritten |
|----------------------------|------------------------|
| $x^{- 1}$                  | $1/x$                  |
| $x^{1/2}$                  | $\sqrt(x)$                     |
| $x^{0}$                    | $1$                    |
| $x^{2}x^{3}$               | $x^{5}$                |
| $(x^{2})^{3}$ | $x^{6}$                |
| $e^{x}e^{y}$               | $e^{x + y}$            |
| $e^{x}/e^{y}$              | $e^{x - y}$            |
| $e^{x + y}$                | $e^{x}e^{y}$           |
| $e^{x - y}$                | $e^{x}/e^{y}$          |

5.  Logarithms

    -  $100 = 2$ (How many powers of\$10$ give you\$100?)
		1.  $\log(.01)= - 2$

    -  $\ln(100)\approx 4.6$ (How many powers of $e\approx 2.7$ give you $100$?)
		1.  $\ln(.01)= - 4.6$

    -  Logs makes huge numbers smaller, miniscule numbers (e.g. probabilities) bigger

    -  Inverse of exponents
		1.  $\ln(e^{5})= 5$ (How many powers of $e$ does it take to reach $e^{5}$?)
		2. $e^{\ln(5)} = 5$ (It takes $\ln(5)$ powers of $e$ to make $5$; what if we take $e$ to that many powers?)

| Expression                                                | Simplified / Rewritten                                                                                                                             |
|-----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| $\ln(\text{xy})$                           | $\ln(x)+\ln(y)$                                                                                          |
| $\ln(\frac{x}{y})$                    | $\ln(x)-\ln(y)$                                                                                          |
| $\ln(2x)$                                    | $\neq 2\ln(x)$;$\neq\ln(2)\ln(x)$;$=\ln(2)+\ln(x)$ |
| $\ln(x^{2})$                          | $2ln(x)$                                                                                                                                           |
| $\ln(x + y)$                                               | Can't simplify                                                                                                                                     |
| $\ln(x)+\ln(y)$ | $\ln(\text{xy})$                                                                                                               |
| $\ln(x)-\ln(y)$ | $\ln(\frac{x}{y})$                                                                                                             |
| $2ln(x)$                                                  | $\ln(x^{2})$                                                                                                                   |

6.  Summation

    -  $\sum_{k=1}^5k^{2} = 1^{2} + 2^{2} + 3^{2} + 4^{2} + 5^{2} = 55$

    -  Column of $n = 500$ observations can be denoted by $x_{i}$, with $i = 1,\ldots,n$

    -  $\frac{1}{n}\sum_{i=1}^nx_{i}$ denotes the average

    -  $\sum_{i=1}^n3x_{i} = 3\sum_{i=1}^nx_{i}$

    -  $\sum_{i=1}^n(x_{i} + y_{i}) = \sum_{i=1}^nx_{i} + \sum_{i=1}^ny_{i}$

    -  $\sum_{i=1}^n(x_{i} + 3) = \sum_{i=1}^nx_{i} + \sum_{i=1}^n3 = \sum_{i=1}^nx_{i} + 3n$

    -  Does $\sum_{i=1}^n(x_{i}y_{i}) = \sum_{i=1}^nx_{i}\sum_{i=1}^ny_{i}$? No!
		1.  e.g. $2\cdot 3 + 5\cdot 4\neq (2 + 5)(3 + 4)$

7.  Derivatives

    -  Intuition: limit of slope

    -  Finding maximum/minimum
		1.  First-order condition: $f^{'}(x) = 0$
		2. Second-order condition: $f^{''}(x)$ negative for max (slope is decreasing, function makes a frown), positive for min (slope is increasing, function makes a smile)

    -  Simple derivatives

| $f(x)$ | $f^{'}(x)$                      |
|---------------------|----------------------------------------------|
| $x^{3}$             | $3x^{2}$                                     |
| $4x$                | $4$                                          |
| $4$                 | $0$                                          |
| $\frac{1}{x}$       | $-\frac{1}{x^{2}}$                          |
| $\sqrt{x}$          | $\frac{1}{2}x^{-\frac{1}{2}} =\frac{1}{2\sqrt{x}}$ |
| $e^{x}$             | $e^{x}$                                      |
| $ln(x)$             | $\frac{1}{x}$                                |

-  Product rule: $\frac{d}{\text{dx}}\lbrack f(x)g(x)\rbrack = f^{'}(x)g(x) + f(x)g'(x)$
	1.  $\frac{d}{\text{dx}}x^{2}\ln(x)= 2x\ln(x)+ x^{2}(\frac{1}{x})$
	2. Same pattern for products of 100 terms

-  Chain rule: $\frac{d}{\text{dx}}f(g(x)) = f^{'}(g(x))g^{'}(x) =\frac{\text{df}}{\text{dg}}\frac{\text{dg}}{\text{dx}}$
	1.  Example: $\frac{d}{\text{dx}}\ln(x^{2} - 3x + 1)=\frac{1}{x^{2} - 3x + 1}\cdot (2x - 3)$
	2. Example: $\frac{d}{\text{dx}}e^{- 3x^{2}} = e^{- 3x^{2}}(- 6x)$
	3. Same pattern for longer chains

-\[The Quotient rule is useful as well, but I won't require it here.\]


8.  Integrals

    -  Intuition
		1.  "sum"/area under $f$ (negative if $f < 0$)
		2. Anti-derivative: add up $\int_a^b f'(x)dx$ to get $f(b) - f(a)$

| $f(x)$            | Anti-derivative of $f(x)$ |
|-------------------|----------------------------------------|
| $x^{2}$           | $\frac{1}{3}x^{3}$                     |
| $4$               | $4x$                                   |
| $\frac{1}{x^{2}}$ | $-\frac{1}{x}$                        |
| $\sqrt{x}$                | $\frac{2}{3}x^{\frac{3}{2}}$           |
| $e^{x}$           | $e^{x}$                                |
| $x(x - 1)$        | $\frac{1}{3}x^{3} -\frac{1}{2}x^{2}$  |

-  Definite integral $\int_4^7 x^{2}dx =\lbrack\frac{1}{3}x^{3}\rbrack_{x = 4}^{7}$
 $=\frac{1}{3}(7)^{3} -\frac{1}{3}(4)^{3} =\frac{343}{3} -\frac{64}{3} = 93$
	1.  $\int_7^4 x^{2}dx =\frac{64}{3} -\frac{343}{3} = - 93$


-  Useful techniques that I won't cover (or expect you to know)
	1.  $u$-substitution (chain rule in reverse)
	2. Integration by Parts (product rule in reverse)

-  Double Integrals
	1.  Simple: inside integral then outside integral

$\int_{y=1}^3\int_{x=0}^2x^{2}ydxdy =\int_{y=1}^3\lbrack\frac{y}{3}x^{3}\rbrack_{x = 0}^{x = 2}dy =\int_{y=1}^3\frac{8}{3}ydy =\ldots =\frac{32}{3}$

ii. Note: for rectangular bounds (i.e. bounds of $x$ don't depend on $y$, and vice versa), can integrate in reverse order

$\int_{y=1}^2\int_{x=0}^3x^{2}ydydx =\int_{y=1}^3\lbrack\frac{1}{2}x^{2}y^{2}\rbrack_{y = 1}^{y = 3}dx =\int_{x=0}^2 4x^{2}dx =\ldots =\frac{32}{3}$

iii. Practice $\int_{y=1}^3\int_{x=0}^2e\frac{x}{y}\text{dxdy}$