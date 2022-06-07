# L12 Continuous Joint Distributions (WMS 5.1-8)

1.  Joint Density
    -  Compare discrete/continuous pdf and joint pdf
    -  Warehouse stocks up to two pallets of cereal $X$ and one pallet of cereal $Y$, with density $f(x,y) = c(x + 2y);x\in\lbrack 0,2\rbrack,y\in\lbrack 0,1\rbrack$.
    -  Height of joint pdf represents likelihood of particular $(x,y)$ pairs. Must integrate to one (double integral).
    	$1 = \int_{x=0}^{2}\int_{y=0}^1c(x + 2y)dydx = \int_{x=0}^{2}(cx + c)dx = 4c$ requires $c =\frac{1}{4}$,
 or $f(x,y) =\frac{1}{4}x +\frac{1}{2}y;x\in\lbrack 0,2\rbrack,y\in\lbrack 0,1\rbrack$.

-  Mode: since upward sloping in both dimensions, mode at $(x,y) = (2,1)$


2.  Marginal densities

    -  Analogous to margins of table in discrete joint distribution: total probability of particular realization of $x$ is the sum of all joint probabilities of $(x,y)$ pairs, with that particular $x$ value, but any $y$ value in domain.

    -  $f_{x}(x) =\int_{y=0}^{1}\frac{1}{4}(x + 2y)dy =\frac{1}{4}x +\frac{1}{4};x\in\lbrack 0,2\rbrack$

    -  $f_{y}(y) =\int_{x=0}^{2}\frac{1}{4}(x + 2y)dx =\frac{1}{2} + y;y\in\lbrack 0,1\rbrack$

    -  Subscript simply distinguishes $f_{x}(.5)$ from $f_{y}(.5)$

    -  Moments: means, standard deviations
	1.  $\mu_{x} = E(X) = \int_{x=0}^{2}xf_{x}(x)\text{dx}$
 			$= \int_{x=0}^{2}x(\frac{1}{4}x +\frac{1}{4})dx =\frac{2}{3} +\frac{1}{2} =\frac{7}{6}$
	2. $E(X^{2}) = \int_{x=0}^{2}x^{2}f_{x}(x)\text{dx}$
 			$= \int_{x=0}^{2}x^{2}(\frac{1}{4}x +\frac{1}{4})dx = 1 +\frac{2}{3} =\frac{5}{3}$
	3. $V(X) = E(X^{2}) -\mu_{x}^{2} =\frac{5}	{3} -(\frac{7}{6})^{2} =\frac{11}{36}$
	4. $\sigma_{x} = \sqrt{V(X)} =\sqrt{\frac{11}{36}}\approx .55$
	5.  $\mu_{y} = E(Y) = \int_{y=0}^{1}yf_{y}(y)\text{dy}$	
 			$= \int_{y=0}^{1}y(\frac{1}{2} + y)dy =\frac{1}{4} +\frac{1}{3} =\frac{7}{12}$
	6. $E(Y^{2}) = \int_{y=0}^{1}y^{2}f_{y}(y)\text{dy}$
 			$= \int_{y=0}^{1}y^{2}(\frac{1}{2} + y)dy =\frac{1}{6} +\frac{1}{4} =\frac{5}{12}$
	7. $V(Y) = E(Y^{2}) -\mu_{y}^{2} =\frac{5}{12} -(\frac{7}{12})^{2} =\frac{11}{144}$
	8. $\sigma_{y} = \sqrt{Y} =\sqrt{\frac{11}{144}}\approx 0.28$
	9. Could also derive mode, median, cdf, percentiles of $X$ or $Y$


-  Independence requires $f(x,y) = f_{x}(x)f_{y}(y)$ for all $(x,y)$ pairs.
	1.  $X$ and $Y$ not independent here, since $f(x,y) =\frac{1}{4}(x + 2y)\neq(\frac{1}{4}x +\frac{1}{4})(\frac{1}{2} + y)$ (e.g. when $(x,y) = (0,0)$)


3.  Correlation

    -  $E(\text{XY}) =\int_{x=0}^{2}\int_{y=0}^{1}\text{xyf}(x,y)\text{dydx}$
 $=\int_{x=0}^{2}\int_{y=0}^{1}\text{xy}\lbrack\frac{1}{4}(x + 2y)\rbrack dydx =\int_{x=0}^{2}(\frac{1}{8}x^{2} +\frac{1}{6}x)dx =\frac{1}{3} +\frac{1}{3} =\frac{2}{3}$

	-  $\sigma_{\text{xy}} = Cov(X,Y) = E(\text{XY}) -\mu_{x}\mu_{y}$
 $=\frac{2}{3} -(\frac{7}{6})(\frac{7}{12}) = -\frac{1}{72}$

	-  $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{-\frac{1}{72}}{(.55)(.28)}\approx - .09$


4.  Practice example: $f(x,y) = c(1 - xy)$ for $x,y\in\lbrack 0,1\rbrack$

    -  Find $c$: $\int_{x=0}^{1}\int_{y=0}^{1}c(1 - xy)dydx =\frac{3}{4}c$ implies $c =\frac{4}{3}$

    -  Find marginal densities $f_{x}$, $f_{y}$: $f_{x}(x) =\int_{y=0}^1\frac{4}{3}(1 - xy)dy =\ldots =\frac{4}{3} -\frac{2}{3}x$ for $x\in\lbrack 0,1\rbrack$; symmetrically, $f_{y}(y) =\frac{4}{3} -\frac{2}{3}y$ for $y\in\lbrack 0,1\rbrack$

    -  Find means $\mu_{x}$ and $\mu_{y}$ and standard deviations $\sigma_{x}$ and $\sigma_{y}$:
 $\mu_{x} = E(X) = \int_{x=0}^1x(\frac{4}{3} -\frac{2}{3}x)dx =\ldots =\frac{4}{9}$ 
 $E(X^{2}) = \int_{x=0}^1x^{2}(\frac{4}{3} -\frac{2}{3}x)dx =\ldots =\frac{5}{18}$ 
 $\sigma_{x}^{2} =\frac{5}{18} -(\frac{4}{9})^{2} =\frac{13}{162}$ 
 $\sigma_{x} =\sqrt{\frac{13}{162}}\approx .283$ 
 Symmetrically, $\mu_{y} =\frac{4}{9}$, $\sigma_{y}\approx .283$

-  Correlation $\rho$:
 	$E(\text{XY}) =\int_{x=0}^1\int_{y=0}^1\text{xy}\frac{4}{3}(1 - xy)dydx =\frac{5}{27}$ $\sigma_{\text{xy}} = E(\text{XY}) -\mu_{x}\mu_{y}\approx\frac{5}{27} -(\frac{4}{9})^{2} = -\frac{1}{81}\approx - .012$ $\rho =\frac{\sigma_{\text{xy}}}{\sigma_{x}\sigma_{y}} =\frac{-\frac{1}{81}}{\sqrt{\frac{13}{162}}\sqrt{\frac{13}{162}}} = -\frac{2}{13}\approx - 0.154$