#stats #econ 

review from earlier:
$\beta_0 = \mu_y-\beta_1\mu_x$
$\beta_1=p*\frac{\sigma_y}{\sigma_x}=\frac{\sigma_{xy}}{\sigma_x^2}$

$\hat \beta_0 = \bar Y-\hat \beta_1\bar X$
$\hat \beta_1=r*\frac{S_y}{S_x}=\frac{S_{xy}}{S_x^2}$
sample variance:
total variations squared divided by one minus the sample size:
$S_x^2=\frac{1}{n-1}\sum^n{(x_i-\bar x)^2}$
sample covariance:
$S_{xy}=\frac{1}{n-1}\sum^n{(X_i-\bar X)(Y_i-\bar Y)}$
sample r value:
$\rho = \frac{\sigma_{xy}}{\sigma_x\sigma_y}$ so the sample rho is $r = \frac{S{xy}}{S_x S_y}$
**The only difference between these equations and those we used earlier in class to find the population regression is the $\frac{1}{n-1}$ instead of $\frac{1}{n}$**
Average sample error term $\hat \varepsilon = 0$. That was kinda the whole point of *least* squared error (Least Squares Regression). 

since variance of the error term is $\sigma_\epsilon^2 = E[(\varepsilon_i-\mu_\varepsilon)^2]$ and $E(\mu_\varepsilon) = 0$ then the variance of the error term is $S\epsilon^2 = \frac{1}{n-2}\sum_{i=1}^n[\varepsilon_i^2]$ and that $= S_{\varepsilon\varepsilon}$ and that's a chi-square distribution.


- [ ] TODO: make flashcards based off of these notes.