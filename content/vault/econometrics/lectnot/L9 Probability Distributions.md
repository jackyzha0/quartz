# L9 Probability Distributions (WMS 3.1-3)

1.  Events are useful for describing binary/categorical information. Next, we'll consider random variables, which are useful for describing quantitative information.

2.  Random variables

    -  Distribution Function: Number of cars $X$ owned by a family $P(x) = P(X = x) =\begin{cases}.10\ \ if\ x = 0\\.30\ \ if\ x = 1\\.40\ \ if\ x = 2\\.20\ \ if\ x = 3\\0\ \ \text{else}\end{cases}$

    -  Mean (i.e. average) "mu" $\mu$
	 1.  We don't know total population size. If we knew there were $100$ families, $\mu =\frac{1}{100}(0\cdot 10 + 1\cdot 30 + 2\cdot 40 + 3\cdot 20) = 1.7$. If population size $n$ is unknown then $\mu =\frac{1}{n}\lbrack 0(.10n) + 1(.30n) + 2(.40n) + 3(.20n)\rbrack$ but this reduces to ...
	 2. Expected value (or "expectation") $\mu = E(X) = xP(x) = 0(.10) + 1(.30) + 2(.40) + 3(.20) = 1.7$
            1.  Note: if all realizations of $X$ are equally likely then $P(x) =\frac{1}{n}$ for all $x$ so $E(X) = x\frac{1}{n} =\frac{1}{n}x$ reduces to familiar formula\begin{cases}P(A|B)P(B)\\ P(B|A)P(A)\end{cases}

    -  Expected value of functions of $X$
	  1.  Example: expected utility $E\lbrack u(X)\rbrack = E()$)
	  2. Formula: $E\lbrack f(x)\rbrack = f(x)P(x)$
	  3. Example: $E(X^{2}) = 0^{2}(.1) + 1^{2}(.3) + 2^{2}(.4) + 3^{2}(.2) = 3.7$
	  4. Algebra shortcuts
     	  1.  Linear functions, e.g. car maintenance cost $C = 200 + 100X$; average maintenance cost $E(C) = 200(.1) + 300(.3) + 400(.4) + 500(.2) = 370$
     	  
     	  3.    Shortcuts: $E(200 + 100X) = E(200) + E(100X)$
 				$= 200 + 100E(X) = 200 + 100(1.7) = 370$
		     -  Summations: $E(X_{i}) = E(X_{i})$
			 -  Pull out coefficients
			 -  For constant $c$, $E(c) = c$


-  Variance, standard deviation
	1.  Variance $\sigma^{2} = V(X) = E\lbrack(X -\mu)^{2}\rbrack =\lbrack(0 - 1.7)^{2}\rbrack(.1) +\lbrack(1 - 1.7)^{2}\rbrack(.3) +\lbrack(2 - 1.7)^{2}\rbrack(.4) +\lbrack(3 - 1.7)^{2}\rbrack(.2) = .81$
	2. Standard deviation $\sigma=\sqrt{\sigma^2} = \sqrt{.81} = .9$
        1.  Interpretation: by rule of thumb, "most" families own between -.1 and 3.5 cars

        2.  Note: variance, by itself, is difficult to interpret (e.g. units is "cars squared"), but is easier to work with algebraically, because it's technically and average of something, whereas standard deviation is the square root of an average of something.
	3. Simpler formula: $V(X) = E(X^{2}) -\mu^{2} = 3.7 -(1.7)^{2} = .81$
         1.  Show equivalent, as homework problem

         2.  Remember this formula, as we'll use it repeatedly
	4. Algebra shortcuts
        1.  $E(C^{2}) = 200^{2}(.1) + 300^{2}(.3) + 400^{2}(.4) + 500^{2}(.2) = 145,000$ doesn't have any easy algebra shortcut; $V(C) = E(C^{2}) - 370^{2} = 8,100$

        2.  Shortcut: $V(C) = V(200 + 100X) = V(100X) = 100^{2}V(X) = 8,100$

            -  $200$ gets added and subtracted: $V(C) = E\{\lbrack(200 + 100X) - E(200 + 100X)\rbrack^{2}\}$

            -  For constant $c$, $V(c) = 0$

            -  Pull out coefficients,\... but square them! (because Variance is a quadratic function of a random variable)


3.  Practice example: number $Y$ of car accidents $P(Y = y) =\begin{cases}.7\ if\ y = 0\\.2\ if\ y = 1\\.1\ if\ y = 2\\0\ \text{else}\end{cases}$

    -  $\mu = 0(.7) + 1(.2) + 2(.1) = .4$

    -  $E(Y^{2}) = 0^{2}(.7) + 1^{2}(.2) + 2^{2}(.1) = .6$

    -  $V(Y) = E(Y^{2}) -\mu^{2} = .6 -(.4)^{2} = .44$

    -  $\sigma =\approx .663$

    -  Insurance profit $\Pi =\$ 1200 -\$ 2000\cdot Y$
		1.  $E(\Pi) = E(1200 - 2000\cdot Y) = 1200 - 2000E(Y) = 1200 - 2000(.4) =\$ 400$
		2. $V(\Pi) = V(1200 - 2000Y) = 0 +(- 2000)^{2}V(Y) = 4,000,000(.44) = 1,760,000$
		3. $\sigma_{\Pi} = \sqrt{1,760,000} =\$ 1,326$

    -  Review this one more time before attempting your homework!