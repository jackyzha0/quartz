Lies! Deceptions! - YouTuben 378 Lecture Notes\
  Joseph McMurray
---

[[L0 Introduction]]
[[L1 Math Preview]]
[[L2 Statistics preview]]
[[L3 Excel]]
[[L4 Stata Basics]]
[[L5 Stata Advanced]]
[[L6 Probability Combinatorics]]
[[L7 Conditional Probability]]
[[L? Research Design]]
[[L9 Probability Distributions]]
[[L10 Correlation]]
[[L11 Continuous Distributions]]
[[L12 Continuous Joint Distributions]]
[[L13 Conditional Distributions]]
[[L14 Regressions]]
[[Exam 1 Review]]
[[L15 Bernoulli, Uniform, Standard Normal]]
[[L16 Normal, Chi Square, t Distributions]]

# L17 Confidence Intervals (WMS 7.2-3,8.5-9)

Project note

1.  If you didn't turn the project in on time, get it in ASAP! Items from part 2 of the project will show up on homework; if you do them with your homework, your project will be finished by the end of the semester.

2.  From now on, must start on project as part of homework

3.  Keep results, to submit as project

4.  Note: If you have a population instead of a sample from a population (e.g. all 50 states), just pretend this is a sample from a larger population (i.e. 50 draws from a population of thousands of U.S. states).

Samples

1.  Population vs. sample

    -  So far, our discussion of distributions has presumed an entire population. Often, information is only available from a sample.
		1.  Surveys are costly, populations are often huge
		2. Some of you might have whole populations (e.g. all 50 states, all teams, every week of a company's sales data); for projects, pretend sample even if you actually have population. But be careful:
            1.  Sometimes population of interest includes future generations (e.g. NBA rookies, stock returns).

            2.  Similarly, population of things that actually happened can in some cases be viewed as a sample from the larger set of things that potentially could have occurred instead.

    -  Unless entire population is observed, can't know what is true, only what is *probably* true

2.  Random sample

    -  i.i.d. (Independently and Identically Distributed): survey answers are independent from each other, and identical to population of interest

    -  Convenience survey (e.g. urban survey of wages): expand sample or limit scope of inference

    -  Selection bias (e.g. survey participation, program participation): administrative records, measurements before participation decided, interpret results narrowly (e.g. benefit of college for those who chose to attend)

    -  Time trends (e.g. daily/weekly sales) -- rare "spot check" observations, econometric corrections

3.  Estimation

    -  Example: Suppose we wish to estimate the average family size $\mu$ of BYU students, along with the standard deviation $\sigma$ and the correlation $\rho$ between family size and GPA. What pieces of data should be used, and how should they be combined?

    -  Population parameter $\theta$ (i.e. generic proxy for $\mu,\sigma,a,b,\rho,\beta,p$, etc.), seek "estimator" function $\widehat{\theta}(x_{1},x_{2},\ldots,x_{n})$ (commonly denoted by "hat" variable)
		1.  Evaluating this "estimator" function with our data provides *point estimates*; next two lectures we'll talk about interval estimates, or margin of error

    -  An estimator is a tool for producing estimates. We'll spend most of the semester talking about a variety of such tools (i.e. estimators for different parameters) but first we need some tool-building tools (i.e. techniques for developing estimators in new settings of interest).

Estimators vs. estimates

1.  Example: suppose distribution of income among last year's $8,500$ BYU graduates has mean $E(X_{i}) =\mu =\$ 48k$ and standard deviation $\sqrt{V(X_i)}=\sigma =\$ 13k$
 But we can't observe this, so we survey $n = 25$ graduates and estimate $\widehat{\mu} =\frac{1}{n}\sum{_{i=1}^{n}}x_{i} = \hat{x}$ and $\widehat{\sigma^{2}} =\frac{1}{n}\int_{i=1}^{n}(x_{i} - \hat{x})^{2}$

2.  Sampling distribution

    -  Every survey of $25$ students yields different estimates $(\widehat{\mu},\widehat{\sigma^{2}})$. Sampling with replacement, there are ${8,500}^{25}\approx 10^{98}$ such samples.
 (Sampling without replacement is more common in practice, and violates i.i.d. but only slightly, as long as population size is large.)

-  Before we conduct interviews, survey responses $X_{1},X_{2},\ldots,X_{n}$ can be viewed as random variables, each drawn from the population of BYU grads


3.  Estimates and estimators

    -  Once we conduct survey, $\widehat{\theta}(x_{1},x_{2},\ldots,x_{n})$ provides *estimate* of parameter $\theta$. Before we conduct survey, *estimator* $\widehat{\theta}(X_{1},X_{2},\ldots,X_{n})$ is random.

    -  To evaluate estimation procedure, we must think about entire *distribution* of estimates (in other words, evaluate estimator), not individual estimate.

    -  Therefore, $\widehat{\mu} =\frac{1}{n}\sum_{i=1}^{n}X_{i} =\hat X$ is random variable with mean $\mu_{\widehat{\mu}}$ and variance $\sigma_{\widehat{\mu}}^{2}$

    -  Similarly, $\widehat{\sigma^{2}} =\frac{1}{n}\int_{i=1}^{n}(X_{i} -\hat X)^{2}$ is random variable with mean $\mu_{\widehat{\sigma^{2}}}$ and variance $\sigma_{\widehat{\sigma^{2}}}^{2}$

Margin of error

1.  Recall that
 $\mu_{\hat x} = E(\frac{1}{n}\sum_{i=1}^{n}X_{i}) =\ldots =\mu$  
 $\sigma_{\hat x}^{2} = V(\frac{1}{n}\sum_{i=1}^{n}X_{i}) =\ldots =\frac{\sigma^{2}}{n}$

2.  Previous estimates are *point* estimates; *margin of error* (e.g. $\pm\$ 20k$) measures precision, gives *interval* estimate

3.  Example

    -  Income $X_{i}$ of 8,500 BYU graduates has unknown mean $\mu$ and known standard deviation $\sigma =\$ 13k$.

    -  If $n = 25$ then $\hat X$ has same mean $\mu$, and standard error $\sigma_{} = \sqrt{\frac{(\$13k)^2}{25}} =\$ 2.6k$

    -  Rule of thumb: $X_{i}$ typically within $\mu\pm 2\sigma$, $\hat X$ typically within $\mu\pm 2\sigma_{\hat X} =\mu\pm\$ 5.2k$; thus, $\$ 5.2k$ is "margin of error"

    -  Dog and leash principle: 3 ft. leash keeps dog within 3 ft. of owner; symmetrically keeps owner within 3 ft. of dog

    -  Observe $=\$ 47.1k$
 Maybe $\mu$ as low as $\$ 41.9k$ and we overestimated  
 Maybe $\mu$ as high as $\$ 52.3k$ and we underestimated.

4.  If $\sigma$ unknown, can estimate margin of error using $\sqrt{\frac{s^2}{100}}$
	1.  in this case, s is sample standard deviation and the 100 is n samples taken to get it.
	2.  $\sqrt{\frac{\sigma_\hat{X}^2}{n}}$

Confidence Intervals

1.  How often is $\hat X$ in interval $\mu\pm 2\sigma$? To compute probability, we need the cdf of $\hat X$.

2.  Normality of $\hat X$

    -  If population distribution of $X_{i}$ is normal then $\hat X=\frac{1}{n}\sum^n_{i=1}X_{i}$ is normal too. Specifically, $\hat X\sim N(\mu,\frac{\sigma^{2}}{n})$.

    -  Standardizing, $\frac{\hat X-\mu}{\sqrt{\frac{\sigma^2}{n}}}\sim N(0,1)$.

Confidence interval for $\mu$

1.  Construction

    -  We *want* $P(\# <\mu <\#)= .90$ and from Table A we *know* $\sim N(\mu,\frac{\sigma^{2}}{n}) = N(\mu,\$ 2.6k^{2})$(still assuming $\sigma =\$ 13k$ and $n = 25$)
 $.90 = P(- 1.64 <\frac{\hat X-\mu}{\$ 2.6k} < 1.64)$
 $= P(- 1.64\cdot\$ 2.6k < \hat X-\mu < 1.64\cdot\$ 2.6k)$ 
 $\approx P(-\hat X -\$ 4.3k < -\mu < -\hat X +\$ 4.3k)$ 
 $= P(\hat X+\$ 4.3k >\mu >\hat X -\$ 4.3k)$

-  (Can also construct one-sided confidence intervals)

-  Example: $=\$ 47.1k$ (still assume $\sigma =\$ 13k$; later we'll estimate)
	1.  90% confidence interval $\hat x\pm 1.64\sigma_{} =\$ 47.1k\pm\$ 4.3k$
	2. 95% confidence interval $\hat x\pm 1.96\sigma_{} =\$ 47.1k\pm\$ 5.1k$
	3. 99% confidence interval $\hat x\pm 2.58\sigma_{} =\$ 47.1k\pm\$ 6.7k$


2.  Distribution of $S^{2}$

    -  If $X_{i}\sim N(\mu,\sigma^{2})$ and $\hat X\sim N(\mu,\frac{\sigma^{2}}{n})$ then $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$.

    -  Intuitively, expectation of $\chi^{2}(n - 1)$ is $n - 1$, expectation of $\frac{S^{2}}{\sigma^{2}}$ is $1$.

3.  Confidence interval for $\mu$ when $\sigma$ unknown

    -  If we replace $\sigma^{2}$with $s^{2}$ then $\frac{-\mu}{}\sim t(n - 1)$.
		1.  This is because $\frac{-\mu}{} =\frac{-\mu}{}\cdot\frac{1}{}$, which is $N(0,1)$ divided by $\frac{\chi^{2}(n - 1)}{n - 1}$
		2. Note: if $n$ large then $t(n - 1)\approx N(0,1)$.

    -  Example: average weekly income $n = 25$, $=\$ 47.1k$, $s =\$ 13k$, ${\widehat{\sigma}}_{} = =\$ 2.6k$
		1.  90% confidence interval $\pm 1.726{\widehat{\sigma}}_{} =\$ 47.1k\pm\$ 4.5k$
		2. 95% confidence interval $\pm 2.093{\widehat{\sigma}}_{} =\$ 47.1k\pm\$ 5.4k$
		3. 99% confidence interval $\pm 2.861{\widehat{\sigma}}_{} =\$ 47.1k\pm\$ 7.4k$

Central Limit Theorem (de Moivre 1733, Laplace 1812, Lyapunov 1901)

4.  $X_{i}arrow N$ (and therefore $\rightarrow N$) no matter what the distribution of $X_{i}$

5.  Dice example

    -  Distribution of $X_{1} + X_{2}$ is bell-shaped, even though $X_{i}$ is (discrete) uniform

    -  Intuition: centrist values frequent (e.g. moderate $X_{1}$ and $X_{2}$, or $X_{1}$ low $X_{2}$ high, or vice versa), but extreme values rare (e.g. $X_{1}$ and $X_{2}$ both low)

    -  $P({}_{100} = 1) =(\frac{1}{6})^{100}\approx 10^{- 78}$; tails become *exponentially* less likely (key feature of normal distribution) as $n$ increases

6.  Skewed example

    -  Bernoulli unemployment $P(0,1) =(.7,.3)$

    -  Average of two: $P(0,.5,1)\approx(.5,.4,.1)$

    -  Average of four: $P(0,.25,.5,.75,1)\approx (.2$`<!-- -->`{=html}5,$.4,.25,.1,0)$

7.  CLT explains why normal distribution is so prevalent in nature: one attribute is sum total of many, smaller, independent attributes

# L18 Hypothesis Tests (WMS 10.2-8)

1.  Hypothesis test: old profit $X\sim N({\$ 400,\$ 100}^{2})$, new management; keep or fire?

    -  Null hypothesis (benefit of doubt) $H_{0}:\mu = 400$

    -  Alternative hypothesis (burden of proof) $H_{a}:\mu < 400$

    -  Level $\alpha =P(H_{0}\text{true})= .10$

    -  Test statistic $\frac{-\mu}{}\sim N(0,1)$

    -  Critical value $- 1.28$, rejection region to left

    -  Data: $=\$ 350$ over 8 weeks

    -  If $H_{0}$ true, $\frac{-\mu}{} =\frac{350 - 400}{}\approx - 1.41\in RR$; reject $H_{0}$

    -  "Significantly less than 400" (statistical vs. practical significance)
	1.  Type 1 error: convict innocent (probability $\alpha$)

    -  Type 2 error: acquit guilty (probability $\beta$)

    -  Repeat for $\alpha = .01$; critical value $- 2.33$, fail to reject

    -  P-value = smallest $\alpha$ such that (for this data) reject $H_{0}$; $0.0793$ in this case

    -  Practice: Reject if $\alpha = .05$?

2.  Variations

    -  $H_{a}:\mu < 380$ (expect and tolerate adjustment cost\$20 for new); test statistic increases to $- .85$, p-value increases to $0.20$. (At $\alpha = .10$ level,\$350 is *significantly* less than\$400, but not significantly less than\$380)

    -  $H_{a}:\mu > 450$; if still $\alpha = .10$ then critical value $+ 1.28$; test statistic negative, so (really) fail to reject

    -  What if $\sigma^{2}$ unknown, and $s^{2} = 100^{2}$ instead? Use t-distribution with 7 degrees of freedom; critical value if $\alpha = .10$ is $1.415$; reject null hypothesis. (p-value not on chart, but by computer is $0.1007$)

    -  $H_{a}:\mu\neq 400$; critical values at $\pm 1.645$, now fail to reject; p-value $2(.079) = 0.158$

3.  Relationship to confidence intervals

    -  In two-sided $\alpha = .05$ level hypothesis test, reject if $|\frac{- 400}{\sigma_{}}| > 1.645$. In other words, if $$ more than $1.645\sigma_{}$ units from 400.

    -  Two-sided 95% confidence interval consists of $\pm 1.645\sigma_{}$

    -  In other words, $.05$ level hypothesis test merely asks whether $400$ lies inside the 95% confidence interval.

# L19 Bias and Consistency (WMS 7.2-7.4, 9.1-9.3)

\[What if you used median to estimate mean, say in income distribution?
Biased.\]

Properties of estimators

1.  Evaluating $\widehat{\theta}$ amounts to evaluating distribution of $\widehat{\theta}(X_{1},X_{2},\ldots,X_{n})$ relative to true unknown value $\theta$

2.  Though $\theta$ is unknown, we know how $\widehat{\theta}$ relates to $X_{i}$ and how $X_{i}$ relates to $\theta$, so can know (probabilistically) how $\widehat{\theta}$ relates to $\theta$

3.  We'll use this to evaluate estimator goodness and to define *margin of error*/*interval estimates*, and do *hypothesis test*

4.  Moments of $\widehat{\mu} =$

    -  $\mu_{\widehat{\mu}} = E(\widehat{\mu}) = E() = E(\frac{1}{n}X_{i}) =\frac{1}{n}E(X_{i}) =\frac{1}{n}\text{nE}(X_{i}) = E(X_{i}) =\mu$
 Thus, thought we don't know what $\mu$ is, we know that average realization of $$ and average realization of $X_{i}$ are same

-  $\sigma_{\widehat{\mu}}^{2} = V(\widehat{\mu}) = V() = V(\frac{1}{n}X_{i}) =\frac{1}{n^{2}}V(X_{i}) =\frac{1}{n^{2}}\text{nV}(X_{i}) =\frac{\sigma^{2}}{n}$
 Variance of $$ is much smaller than variance of $X_{i}$

-  Standard error (i.e. standard deviation of estimator) $\sigma_{} = =\frac{\sigma}{}$
	1.  In population ($n = 1$), incomes typically between $\$ 48k\pm\$ 26k$ $\lbrack\$ 22k,\$ 74k$\]
	2. For $n = 25$, sample average $$ typically between $\$ 48k\pm\$ 5.2k$ $\lbrack\$ 43k,\$ 53k\rbrack$
	3. For $n = 100$, sample average $$ typically between $\$ 48k\pm\$ 2.6k$ $\lbrack\$ 44k,\$ 51k\rbrack$
	4. For $n = 10,000$, $$ typically between $\$ 48k\pm\$ 0.26k$ $\lbrack\$ 47.7,\$ 48.3k\rbrack$

Consistency

1.  Best imaginable case: $\widehat{\theta}$ degenerate with $E(\widehat{\theta}) =\theta$ and $V(\widehat{\theta}) = 0$

2.  As $narrow\infty$, $\widehat{\theta}$ approaches ideal distribution

    -  That is, $E(\widehat{\theta})arrow\theta$ and $V(\widehat{\theta})arrow 0$
 Put differently, ${\widehat{\theta}}_{n}arrow\theta$ ("in probability")

3.  Example: $\widehat{\mu} =$ is consistent estimator of $\mu$

    -  $E(\widehat{\mu}) =\mu$ for all $n$

    -  $V(\widehat{\mu}) =\frac{\sigma^{2}}{n}arrow 0$

4.  Law of large numbers (Jacob Bernoulli, 1713)

    -  Sample means converge to population means

    -  Higher order moments
		1.  $E(\frac{1}{n}X_{i}^{3}) = E(X_{i}^{3})$
		2. $V(\frac{1}{n}X_{i}^{3}) =\frac{V(X_{i}^{3})}{n}arrow 0$
		3. Sample moments converge to population moments (justification for MOM)

5.  Fact: continuous functions of consistent estimators are consistent

6.  Fact: MLE are always consistent

Bias

1.  Bias $B(\widehat{\theta}) = E(\widehat{\theta} -\theta) = E(\widehat{\theta}) -\theta$

2.  On average, does $\widehat{\theta}$ produces estimates that are higher or lower than $\theta$?

3.  Unbiased estimator: $E(\widehat{\theta}) =\theta$

4.  $$ is *unbiased* estimator of $\mu$ because $E() =\mu$

5.  Example of biased estimation procedure: sample max from uniform distribution

6.  When bias can be measured, can sometimes correct (target analogy)

(Relative) Efficiency

5.  Given two estimators, the one with lower variance is more efficient.

6.  An estimator cannot be efficient, per se, but only more efficient than another estimator. In some cases in Econ 388, however, it is possible to prove categorically that a particular unbiased estimator is more efficient than any other unbiased estimator.

7.  Example: consider throwing out one observation, computing sample average of $n - 1$ observations

    -  $E(\widetilde{\mu}) =\mu$ still

    -  $V(\widetilde{\mu}) =\ldots =\frac{\sigma^{2}}{n - 1}$

    -  Still unbiased, still consistent, but less efficient than using all available data

Sample Variance

1.  ${\widehat{\sigma}}_{\text{MOM}}^{2}$ is biased

    -  ${\widehat{\sigma}}_{\text{MOM}}^{2} =\frac{1}{n}(X_{i} -)^{2} =\ldots =\frac{1}{n}X_{i}^{2} - {}^{2}$

    -  $E({\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{1}{n}E(X_{i}^{2}) - E({}^{2})$
 $=\frac{1}{n}(\mu^{2} +\sigma^{2}) -(\mu^{2} +\frac{\sigma^{2}}{n})$ (since $\sigma^{2} = V(X_{i}) = E(X_{i}^{2}) -\mu^{2}$ and $\frac{\sigma^{2}}{n} = V() = E({}^{2}) -\mu^{2}$) $=\mu^{2} +\sigma^{2} -\mu^{2} -\frac{\sigma^{2}}{n} =\sigma^{2} -\frac{\sigma^{2}}{n} =\frac{n - 1}{n}\sigma^{2}$

-  $B({\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{n - 1}{n}\sigma^{2} -\sigma^{2} = -\frac{1}{n}\sigma^{2}$

-  Still consistent: $B({\widehat{\sigma}}_{\text{MOM}}^{2})arrow 0$ (and can show that $V({\widehat{\sigma}}_{\text{MOM}}^{2})arrow 0$)


2.  "Sample variance" $S^{2} =\frac{1}{n - 1}(X_{i} -)^{2}$

    -  To eliminates bias: $E(\frac{n}{n - 1}{\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{n}{n - 1}E({\widehat{\sigma}}_{\text{MOM}}^{2}) =\frac{n}{n - 1}\frac{n - 1}{n}\sigma^{2} =\sigma^{2}$

    -  So if $S^{2} =\frac{n}{n - 1}{\widehat{\sigma}}_{\text{MOM}}^{2} =\frac{1}{n - 1}(X_{i} -)^{2}$then $B(S^{2}) = 0$
		1.  Example: sample of $n = 4$ student wages, $x_{i} =\$ 11,\$ 10,\$ 14,\$ 15$, $=\$ 13.50$, ${\widehat{\sigma}}_{\text{MOM}} = =\approx\$ 2.29$
 $s = =\approx\$ 2.65$

ii. Excel: use VAR.S or STDEV.S, not =VAR.P or =STDEV.P


-  Correcting bias actually sacrifices some efficiency

# L20 Difference in Means, Proportions (WMS 8.3-8,10.3)

1.\[Long lecture; use time efficiently.\]

2.  Difference in means

    -  Relating quantitative and binary variables: conditional distributions, conditional means $E(X = 0)$, $E(X = 1)$

    -  Wages gap between men and women:
 $n_{w} = 40$, ${q_{w} =\$ 32,\sigma_{w} =\$ 13,n}_{m} = 45$, ${}_{m} =\$ 35$, $\sigma_{m} =\$ 15$.

-  95% confidence intervals for men $\lbrack\$ 30.62,\$ 39.38\rbrack$ and women $\lbrack\$ 27.97,\$ 36.03\rbrack$ overlap, making it difficult to tell true size of wage gap (if any)

-  Trick (used a lot in more advanced settings): combine into single parameter
 $\theta =(\mu_{m} -\mu_{w})$; MOM estimator $\widehat{\theta} =({}_{m} - {}_{w})$

-  $E(\widehat{\theta}) = E({}_{m} - {}_{w}) = E({}_{m}) - E({}_{w}) =\mu_{m} -\mu_{w} =\theta$; unbiased!

ii. $V(\widehat{\theta}) = V({}_{m} - {}_{w}) =\frac{\sigma_{m}^{2}}{n_{m}} +(- 1)^{2}\frac{\sigma_{w}^{2}}{n_{w}}arrow 0$; consistent (as long as both sample sizes grow large)!

iii. ${}_{m}\sim N(\mu_{m},\frac{\sigma_{m}^{2}}{n_{m}})$ and ${}_{w}\sim N(\mu_{w},\frac{\sigma_{w}^{2}}{n_{w}})$, so...

iv. ${}_{m} - {}_{w}\sim N(\mu_{m} -\mu_{w},\frac{\sigma_{m}^{2}}{n_{m}} +\frac{\sigma_{w}^{2}}{n_{w}})$
 Standardizing, $\frac{\widehat{\theta} -\mu_{\widehat{\theta}}}{\sigma_{\widehat{\theta}}} =\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{}\sim N(0,1)$

v.  Note: if estimate $s_{A}^{2}$ and $s_{B}^{2}$ then $\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{}\sim t(df =\frac{(\frac{s_{m}^{2}}{n_{m}} +\frac{s_{w}^{2}}{n_{w}})^{2}}{\frac{(\frac{s_{m}^{2}}{n_{m}})^{2}}{n_{m} - 1} +\frac{(\frac{s_{w}^{2}}{n_{w}})^{2}}{n_{w} - 1}})$
    1.  (e.g. If $s_{m} =\$ 12$ and $s_{w} =\$ 10$ then $df\approx 83$)

    2.  For this class, just use $t(\text{df})\approx N(0,1)$, which is appropriate when $n_{m}$ and $n_{w}$ are both large

    3.  (df between minimum and sum of $(n_{m} - 1)$ and $(n_{w} - 1)$)


-  Margin of error: $\pm 2 = 2(\$ 1.98) =\$ 3.96$

-  95% confidence interval for $(\mu_{m} -\mu_{w})$: $({}_{m} - {}_{w})\pm 1.96 =\lbrack\$ 0.11,\$ 7.89\rbrack$

-  Test $\mu_{m} -\mu_{w} > 0$: test statistic $\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{} =\frac{4 - 0}{} = 2.02$; p-value 0.0217

-  Test $\mu_{m} -\mu_{w}\neq 0$: p-value $2\cdot 0.0217 = 0.0434$

-  Test $\mu_{m} -\mu_{w} >\$ 2$: test statistic $\frac{({}_{m} - {}_{w}) -(\mu_{m} -\mu_{w})}{} =\frac{4 - 2}{} = 1.01$; p-value 0.1562

-  Note: if we estimated $\mu_{w} -\mu_{m}$ instead of $\mu_{m} -\mu_{w}$, rejection region would be on left instead of right, and test statistics would be negative instead of positive, but produce same p-values


3.  Binary data (i.e. Bernoulli($p$))

    -  Intuitive estimator: proportion $\widehat{p} =\frac{Y}{n}$, where $Y$ =\# of 1's in data
		1.  Example: election survey, $n = 100$, $\widehat{p} =\frac{52}{100} = .52$

    -  MOM estimator: ${\widehat{p}}_{\text{MOM}} =$; actually same, since $Y = X_{i}$ (for zeros and ones, adding is the same as counting)

    -  Since $Y\sim Bin(n,p)$,
 $E(\widehat{p}) = E(\frac{Y}{n}) =\frac{1}{n}E(Y) =\frac{\text{np}}{n} = p$; unbiased! $V(\widehat{p}) =\frac{1}{n^{2}}V(Y) =\frac{\text{np}(1 - p)}{n^{2}} =\frac{p(1 - p)}{n}arrow 0$; consistent!

-  By Central Limit Theorem, $\widehat{p} =arrow N(p,\frac{p(1 - p)}{n})\Rightarrow\frac{\widehat{p} - p}{}arrow N(0,1)$
 Note: this is not actually different from $\frac{-\mu}{}$; just special case with $=\widehat{p}$, $\mu = p$, and $\sigma^{2} = p(1 - p)$ Note: does not follow $t$ distribution for small $n$, because $X_{i}$ not normal

-  Example: election survey, $n = 100$, $\widehat{p} =\frac{52}{100} = .52$
	1.  Margin of error: $2\approx 2 = 2\approx 2(.05) = 0.1$
	2. 95% Confidence interval $\approx\widehat{p}\pm 1.96 = .52\pm 1.96(.05) =\lbrack.422,.618\rbrack$
	3. Test $H_{0}:p = 5$ against $H_{a}:p > 5$: test statistic $\frac{\widehat{p} - p}{} =\frac{.52 - .5}{} = 0.40$; p-value 0.3446


4.  Difference in proportions: unemployment in U.S. and France (2% difference?)

    -  $n_{F} = 1000$, $\widehat{p} =\frac{109}{1000} = .109$; $n_{\text{US}} = 500$, ${\widehat{p}}_{\text{US}} =\frac{38}{500} = .076$

    -  95% confidence intervals $\lbrack .090,.128\rbrack\lbrack.053,.099$\]

    -  Estimate $(p_{F} - p_{\text{US}})$ with MOM estimator $({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}})$
		1.  $E({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) = E({\widehat{p}}_{F}) - E({\widehat{p}}_{\text{US}}) = p_{F} - p_{\text{US}}$; unbiased!
		2. $V({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) = V({\widehat{p}}_{F}) + V({\widehat{p}}_{\text{US}}) =\frac{p_{F}(1 - p_{F})}{n_{F}} +\frac{p_{\text{US}}(1 - p_{\text{US}})}{n_{\text{US}}}arrow 0$; consistent!
		3. $\frac{({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) -(p_{F} - p_{\text{US}})}{}\sim N(0,1)$

    -  95% Confidence interval $({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}})\pm 1.96 =\lbrack.003,.063\rbrack$

    -  Test $(p_{F} - p_{\text{US}}) > 0$, test statistic $\frac{({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) - 0}{}\approx 2.14$; p-value .0162

    -  Test $(p_{F} - p_{\text{US}}) > .02$, test statistic $\frac{({\widehat{p}}_{F} - {\widehat{p}}_{\text{US}}) - .02}{}\approx 0.84$; p-value .2005

# L21 Variance Estimation (WMS 8.9,10.9)

Review

1.  ${\widehat{\sigma}}_{\text{MOM}}^{2} =\frac{1}{n}(x_{i} -)^{2}$

2.  $S^{2} =\frac{1}{n - 1}(x_{i} -)^{2}$

Variance estimation

1.  Applications: inequality/heterogeneity, quality control, estimation error

2.  $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$

3.  Sample variance: $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$

    -  Intuition 1: $X_{i}\sim N(\mu,\sigma^{2})$, so $(\frac{X_{i} -\mu}{\sigma})^{2}\sim\chi^{2}(1)$; $(\frac{X_{i} -\mu}{\sigma})^{2}\sim\chi^{2}(n)$; we lose one degree of freedom because we're measuring deviations from $$ rather than deviations from $\mu$

    -  Intuition 2: a single observation conveys information about $\mu$ but not $\sigma^{2}$, so if $n = 100$ then we have 100 pieces of information about $\mu$ but only 99 pieces of information about $\sigma^{2}$

    -  Intuition 3: $E(S^{2}) =\sigma^{2}$, so $E\lbrack(n - 1)\frac{S^{2}}{\sigma^{2}}\rbrack = n - 1$

    -\[Skip\] Formal derivation: $(\frac{X_{i} -\mu}{\sigma})^{2} =(\frac{(X_{i} -) +(-\mu)}{\sigma})^{2}$
 $=(\frac{X_{i} -}{\sigma})^{2} +(\frac{-\mu}{\sigma})^{2} + 2\frac{(X_{i} -)(-\mu)}{\sigma^{2}}$

$=(n - 1)\frac{S^{2}}{\sigma^{2}} +\frac{n(-\mu)^{2}}{\sigma^{2}} + 2\frac{(-\mu)}{\sigma^{2}}(X_{i} -)$

$=(n - 1)\frac{S^{2}}{\sigma^{2}} +\frac{-\mu}{} + 2\frac{(-\mu)}{\sigma^{2}}(n - n)$

$\sim\chi^{2}(n - 1) +\chi^{2}(1) + 0$

-  Recall that, in estimating $\mu$, using $\frac{-\mu}{}$ instead of $\frac{-\mu}{}$ required the use of a t distribution instead of a normal. This is because it can be shown that $Z =\frac{-\mu}{}\sim N(0,1)$ and $W =(n - 1)\frac{S^{2}}{\sigma^{2}}\text{igmaheuseofatdistributioninsteadofanormal.ThisisbecausecouldpotentiallyhaveressionsthatIhavereceived}\sim\chi^{2}(n - 1)$ are independent, implying that $\frac{-\mu}{} =\frac{-\mu}{}\frac{1}{} =\frac{Z}{}\sim t(n - 1)$.


4.  Example: variance among $n = 71$ sales representatives is $s^{2} = {5.3}^{2}$

    -  Confidence interval
		1.  Seek $.95 = Pr(\# <\sigma <\#)$ and know $(n - 1)\frac{S^{2}}{\sigma^{2}}\sim\chi^{2}(70)$, so from Table 6,
		2. $P(48.76 <(n - 1)\frac{S^{2}}{\sigma^{2}} < 95.02)=P(\frac{1}{48.76} >\frac{\sigma^{2}}{(n - 1)s^{2}} >\frac{1}{95.02})$
 $=P(\frac{(n - 1)s^{2}}{48.76} >\sigma^{2} >\frac{(n - 1)s^{2}}{95.02})=P(>\sigma >)$ $=P(6.35 >\sigma > 4.55)$

-  Hypothesis test
	1.  $H_{a}:\sigma^{2} > 4^{2}$, $\alpha = .05$
	2. Critical value $90.53$
	3. Test statistic $(n - 1)\frac{S^{2}}{\sigma^{2}} = 70(\frac{5.3^{2}}{4^{2}}) = 122.9$, reject $H_{0}$ (from Excel, p-value is $10^{- 5}$)

# L22 Regression Estimation (WMS 11.1-3)

1.  Recall from Lecture 9

    -  Relationship between $X$ and $Y$ can be represented by $\rho = corr(X,Y)$ or by regression line $Y =\beta_{0} +\beta_{1}X +\varepsilon$

    -  $E(\varepsilon) = 0$ can be guaranteed by choosing intercept to solve $\mu_{y} =\beta_{0} +\beta_{1}\mu_{x}$

    -  Crystal ball: can predict $Y^{*} =\beta_{0} +\beta_{1}x^{*}$ for any $x^{*}$ value (even out of sample)

    -  $\sigma_{\varepsilon}^{2}$ can be minimized by choosing slope coefficient $\beta_{1} =\frac{\sigma_{\text{xy}}}{\sigma_{x}^{2}} =\rho\frac{\sigma_{y}}{\sigma_{x}}$

    -  Fraction of variation in $Y$ associated with $X$ is $\frac{V(\beta_{0} +\beta_{1}X)}{V(Y)} =\frac{\beta_{1}^{2}\sigma_{x}^{2}}{\sigma_{y}^{2}} =\frac{(\rho^{2}\frac{\sigma_{y}^{2}}{\sigma_{x}^{2}})\sigma_{x}^{2}}{\sigma_{y}^{2}} =\rho^{2}$

2.  Estimation

    -  $s_{x}^{2} =\frac{1}{n - 1}(x_{i} -)^{2}$

    -  $s_{\text{xy}} =\frac{1}{n - 1}(x_{i} -)(y_{i} -)$

    -  $r =\frac{s_{\text{xy}}}{s_{x}s_{y}}$

    -  $\widehat{\rho^{2}} = r^{2}$

    -  ${\widehat{\beta}}_{1} =\frac{s_{\text{xy}}}{s_{x}^{2}} = r\frac{s_{y}}{s_{x}} =\frac{(x_{i} -)(y_{i} -)}{(x_{i} -)^{2}}$

    -  ${\widehat{\beta}}_{0} = - b_{1}$

    -  Income predictions ${\widehat{y}}_{i} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$

    -  Individual errors ${\widehat{\varepsilon}}_{i} = y_{i} - {\widehat{y}}_{i}$
	1.  $s_{\varepsilon}^{2} =\frac{1}{n - 2}{\widehat{\varepsilon}}_{i}^{2}$

3.  Can also use "sums of squares", rather than variance (i.e. "total" not "average" deviations)

    -  Let $S_{\text{xx}} =(x_{i} -)^{2}$

    -  Let $S_{\text{xy}} =(x_{i} -)(y_{i} -)$

    -  With this notation, ${\widehat{\beta}}_{1} =\frac{s_{\text{xy}}}{s_{x}^{2}} =\frac{S_{\text{xy}}}{S_{\text{xx}}}$

    -  Let $S_{\text{εε}} = {\widehat{\varepsilon}}_{i}^{2}$

4.  Example : Regress Income $y$ (in\$ thousands) on Education $x$ (in years)

| $x_{i}$ | $x_{i} -$            | $y_{i}$ | $y_{i} -$              | $(x_{i} -)(y_{i} -)$ | ${\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$ | ${\widehat{\varepsilon}}_{i}$ |
|---------|----------------------|---------|------------------------|------------------------------------------------|------------------------------------------------------|-------------------------------|
| $11$    | $- 4$                | $40$    | $- 30$                 | 120                                            | 37.2                                                 | 2.8                           |
| $16$    | $1$                  | $80$    | $10$                   | 10                                             | 78.2                                                 | 1.8                           |
| $16$    | $1$                  | $70$    | $0$                    | 0                                              | 78.2                                                 | -8.2                          |
| $14$    | $- 1$                | $60$    | $- 10$                 | 10                                             | 61.8                                                 | -1.8                          |
| $18$    | $3$                  | $100$   | $30$                   | 90                                             | 94.6                                                 | 5.4                           |
| $= 15$  | $S_{\text{xx}} = 28$ | $= 70$  | $S_{\text{yy}} = 2000$ | $S_{\text{xy}} = 230$                          |                                                      | $= 0$                         |
|         | $s_{x}^{2} = 7$      |         | $s_{y}^{2} = 500$      | $s_{\text{xy}} = 57.5$                         |                                                      | $S_{\text{εε}} = 111$         |
|         | $s_{x}\approx 2.6$  |         | $s_{y}\approx 22.4$   | $r\approx 0.97$                               |                                                      | $s_{\varepsilon}^{2} = 37$    |
|         |                      |         |                        | $r^{2}\approx 0.94$                           |                                                      | $s_{\varepsilon} = 6.1$       |
|         |                      |         |                        | ${\widehat{\beta}}_{1}\approx 8.2$            |                                                      |                               |
|         |                      |         |                        | ${\widehat{\beta}}_{0}\approx - 53$           |                                                      |                               |

-  We'll use this example again in subsequent lecture

-  Predictions
	1.  High school graduate ${\widehat{y}}_{x^{*} = 12}^{*} = - 53 + 8.2(12) = 45.4$
	2. College graduate ${\widehat{y}}_{x^{*} = 16}^{*} = - 53 + 8.2(16) = 78.2$
	3. PhD graduate ${\widehat{y}}_{x^{*} = 20}^{*} = - 53 + 8.2(20) = 111$

-  Estimated errors
	1.  Predict income ${\widehat{y}}_{i}$ for each individual in sample
	2. ${\widehat{\varepsilon}}_{i} = y_{i} - {\widehat{y}}_{i}$
        1.  Individual
	3. $S_{\text{εε}} = {\widehat{\varepsilon}}_{i}^{2} = 111$
         1.  Alternatively, $\sigma_{\varepsilon}^{2} =(1 -\rho^{2})\sigma_{y}^{2}$, so $SSE =(1 - r^{2})S_{\text{yy}}\approx(1 - .9446)(2000) = 111$ (useful if only know summary statistics for $X$ and $Y$).
	4. $s_{\varepsilon}^{2} =\frac{1}{n - 2}SSE = 37$, $s_{\varepsilon} =\approx 6.1$

-  Illustrate with Excel: Data\>Data Analysis\>Regression, using education & income data above


5.  Preliminaries

    -  Algebra trick 1: It can be shown that $(x_{i} -) = 0$
 $= x_{i} - = n - n = 0$ Similarly, $(Y_{i} -) = 0$

-  Algebra trick 2: It can be shown that
 $S_{\text{xx}} =(x_{i} -)^{2} =(x_{i} -)(x_{i} -) =(x_{i} -)x_{i}$ $=(x_{i} -)x_{i} -(x_{i} -)$ $=(x_{i} -)x_{i} -(x_{i} -)$ $=(x_{i} -)x_{i}$ Similarly, $S_{\text{xy}} =(x_{i} -)Y_{i}$ and ${\widehat{\beta}}_{1} =\frac{S_{\text{xy}}}{S_{\text{xx}}} =\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}$

-  Deterministic $x_{i}$
	1.  You can think of $X_{i}$ and $Y_{i}$ as being random (i.e. they depend on who you interview), and this is what we did when we derived the population regression parameters. But for simplicity, assume in the estimation that $X_{i} = x_{i}$ are known. That is, we are only considering various samples of $n$ individuals who have the same education levels as the people we sampled today (and incomes that potentially differ from the people we interviewed).
	2. If an estimator is unbiased conditional on these $x_{i}$'s, it is also unbiased unconditionally. For example, if $E(X_{1} = x_{1},X_{2} = x_{2},\ldots,X_{n} = x_{n}) =\beta_{1}$ for every sample of $x$'s then, averaging across all such samples, $E({\widehat{\beta}}_{1}) =\beta_{1}$ as well.
	3. $Y_{i}$ is still random because $Y_{i} =\beta_{0} +\beta_{1}x_{i} +\varepsilon_{i}$ and $\varepsilon_{i}$ is random.

# L23 Regression Inference (WMS 11.4-9)

Introduction

1.  Long lecture (use time efficiently)

2.  We've derived estimators ${\widehat{\beta}}_{1}$, ${\widehat{\beta}}_{0}$, ${\widehat{Y}}^{*}$, but so far all we have are point estimates. Are these good estimators (i.e. unbiased and consistent)? What are the margins of errors? To get confidence intervals or do hypothesis tests, we need to know their distributions.

3.  Estimator distributions: if $\varepsilon_{i}\sim N(0,\sigma_{\varepsilon}^{2})$ (which is plausible, by Central Limit Theorem, if each error term is viewed as the sum total of a lot of smaller, independent factors) then

    -  $Y_{i} =\beta_{0} +\beta_{1}x_{i} +\varepsilon_{i}\sim N$

    -  $=\frac{1}{n}Y_{i}\sim N$

    -  ${\widehat{\beta}}_{1} =\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}\sim N$

    -  ${\widehat{\beta}}_{0} = - {\widehat{\beta}}_{1}\sim N$

    -  ${\widehat{Y}}^{*} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x^{*}\sim N$

    -  $Y - {\widehat{Y}}^{*}\sim N$

    -  Estimation error ${\widehat{\varepsilon}}_{i} = Y_{i} - {\widehat{Y}}_{i}\sim N$

    -  $\frac{(n - 2)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}}\sim\chi^{2}(n - 2)$ (essentially because estimating ${\widehat{\varepsilon}}_{i}$ requires estimating two parameters ${\widehat{\beta}}_{0}$ and ${\widehat{\beta}}_{1}$, leaving only $n - 2$ pieces of information)
	1.  Could compare $s_{\varepsilon}^{2}$ from two regressions to see which better explains $Y$, using $F$ distribution

Slope estimator

1.  It can be shown that $E({\widehat{\beta}}_{1}) =\beta_{1};unbiased!$
 $E({\widehat{\beta}}_{1}) = E\lbrack\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}\rbrack =\frac{1}{S_{\text{xx}}}(x_{i} -)\lbrack\beta_{0} +\beta_{1}x_{i} + E(\varepsilon_{i})\rbrack$ $=\frac{1}{S_{\text{xx}}}\lbrack 0\beta_{0} +\beta_{1}(x_{i} -)x_{i}\rbrack =\frac{S_{\text{xx}}}{S_{\text{xx}}}\beta_{1} =\beta_{1}$

2.  $V({\widehat{\beta}}_{1}) = V\lbrack\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{i}\rbrack =\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} =\frac{\sigma_{\varepsilon}^{2}}{(n - 1)s_{x}^{2}}arrow 0$; consistent ☺!
 $=\frac{1}{{S_{\text{xx}}}^{2}}V\lbrack(x_{i} -)Y_{i}\rbrack =\frac{1}{{S_{\text{xx}}}^{2}}\lbrack(x_{i} -)^{2}V(Y_{i}) + 0\rbrack$ $=\frac{1}{{S_{\text{xx}}}^{2}}(x_{i} -)^{2}(0 + 0 +\sigma_{\varepsilon}^{2}) =\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} =\frac{\sigma_{\varepsilon}^{2}}{(n - 1)s_{x}^{2}}$ Note: most noisy when incomes more varied (conditional on education); least noisy when education more varied ($s_{x}^{2}$ in denominator)

3.  $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim N(0,1)$; therefore, $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim t(n - 2)$

4.  Example

    -  From previous lecture, $n = 5$, $s_{\varepsilon}^{2} = 37$, $S_{\text{xx}} = 28$

    -  95% Confidence interval: $\$ 8.2k\pm 3.182 =\lbrack\$ 4.5k,\$ 11.9k\rbrack$

    -  Hypothesis Test $H_{a}:\beta_{1} >\$ 5k$ at $\alpha = .05$ level
		1.  Critical value 2.353
		2. Test statistic $\frac{8.2 - 5}{}\approx 2.78$; reject $H_{0}$

Intercept estimator

1.  It can be shown that $E({\widehat{\beta}}_{0}) =\ldots =\beta_{0}$; unbiased ☺!
 It can be shown that $V({\widehat{\beta}}_{0}) =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{q^{2}}{(n - 1)s_{x}^{2}})arrow 0$; consistent ☺!

-\[For those curious,
 $E({\widehat{\beta}}_{0}) = E(\frac{1}{n}Y_{i} - {\widehat{\beta}}_{1}) =\frac{1}{n}\lbrack\beta_{0} +\beta_{1}x_{i} + E(\varepsilon_{i})\rbrack - E({\widehat{\beta}}_{1})$ $=\frac{n\beta_{0}}{n} +\beta_{1}\frac{1}{n}x_{i} -\beta_{1} =\beta_{0}$ $V({\widehat{\beta}}_{0}) = V(- {\widehat{\beta}}_{1})$ $= V() + {}^{2}V({\widehat{\beta}}_{1}) - 2\text{Cov}(,{\widehat{\beta}}_{1})$ $=\frac{\sigma_{\varepsilon}^{2}}{n} + {}^{2}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} - 0 =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{q^{2}}{(n - 1)s_{x}^{2}})arrow 0$ Note: $C(,{\widehat{\beta}}_{1}) = 0$ because... $C(\frac{1}{n}Y_{i},\frac{1}{S_{\text{xx}}}(x_{i} -)Y_{j}) =\frac{1}{nS_{\text{xx}}}C(Y_{i},(x_{i} -)Y_{j})$ $=\frac{1}{nS_{\text{xx}}}\lbrack(x_{i} -)C(Y_{i},Y_{i}) +(x_{i} -)C(Y_{i},Y_{j})\rbrack$ $=\frac{1}{nS_{\text{xx}}}\lbrack(x_{i} -)V(Y_{i}) +(x_{i} -)0\rbrack$ $=\frac{1}{nS_{\text{xx}}}\lbrack\sigma_{y}^{2}(x_{i} -)\rbrack$ $=\frac{\sigma_{y}^{2}}{nS_{\text{xx}}}\lbrack 0\rbrack$\]

2.  Note two pieces: small error in identifying $(\mu_{x},\mu_{y})$ and larger error in identifying slope (which matters more when ${}^{2}$ high).

3.  $\frac{{\widehat{\beta}}_{0} -\beta_{0}}{}\sim N(0,1)$; therefore, $\frac{{\widehat{\beta}}_{0} -\beta_{0}}{}\sim t(n - 2)$

Prediction estimator

1.  $\widehat{(\beta_{0} +\beta_{1}x_{i})} = {\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}$

2.  $E(\widehat{\beta_{0} +\beta_{1}x_{i}}) = E({\widehat{\beta}}_{0} + {\widehat{\beta}}_{1}x_{i}) =\beta_{0} +\beta_{1}x_{i}$; unbiased ☺!

3.  $V(\widehat{\beta_{0} +\beta_{1}x_{i}}) =\ldots =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{(x_{i} -)^{2}}{S_{\text{xx}}})arrow 0$; consistent ☺!
\[$V(\widehat{\beta_{0} +\beta_{1}x_{i}}) = V({\widehat{\beta}}_{0}) + x_{i}^{2}V({\widehat{\beta}}_{1}) + 2Cov({\widehat{\beta}}_{0},{\widehat{\beta}}_{1}x_{i})$ $=\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{q^{2}}{S_{\text{xx}}}) + {(x_{i})}^{2}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}} - 2x_{i}\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$ (since $\text{Cov}({\widehat{\beta}}_{0},{\widehat{\beta}}_{1}) = Cov(- {\widehat{\beta}}_{1},{\widehat{\beta}}_{1}) = 0 -\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$) $=\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{(x_{i} -)^{2}}{S_{\text{xx}}}) =\sigma_{\varepsilon}^{2}(\frac{1}{n} +\frac{(x_{i} -)^{2}}{S_{\text{xx}}})$\] Note: most precise close to $$; can still make predictions far away from $$, but more noisy

4.  $\frac{\widehat{(\beta_{0} +\beta_{1}x_{i})} -(\beta_{0} +\beta_{1}x_{i})}{}\sim N(0,1)$
 $\frac{\widehat{(\beta_{0} +\beta_{1}x_{i})} -(\beta_{0} +\beta_{1}x_{i})}{}\sim t(n - 2)$

Error variance

1.  $\frac{(4)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}}\sim\chi^{2}(4)$, $s_{\varepsilon} = 6.1$

2.  95% confidence interval for $\sigma_{\varepsilon}$

    -  $.95 = P(.48 <\frac{(4)s_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}} < 11.14) = P(>\sigma_{\varepsilon} >) = P(17.6 >\sigma_{\varepsilon} > 3.6)$

3.  Test $H_{a}:\sigma_{\varepsilon}^{2} > 4^{2}$ at $\alpha = .05$ level

    -  Critical value 9.49 (from Table 6)

    -  Test statistic $\frac{4\cdot 37}{4^{2}} = 9.25$; not significant

4.  If you had two regressions and wanted to know which has better predictive power (i.e. lower residual error variance) you could compare $\sigma_{\text{εA}}^{2}$ and $\sigma_{\text{εB}}^{2}$ using F distribution

# Review

1.  Thanks for a great semester!

2.  Thanks TAs!

3.  Recommend Econ 388: regression with multiple variables

    -  We're on the brink of knowledge explosion

    -  Also Econ 210 for exploring careers in Economics

    -  For advanced statistics/econometrics, recommend linear algebra (Math 213)

4.  Student project findings

    -  Wide variety of projects

    -  Value of statistics for consumers, not just producers

5.  Key concepts

    -  We've seen several trees, now let's notice the forest

    -  Pre-midterm, we discussed population distributions (discrete or continuous), including moments such as mean, variance, and covariance.

    -  From sample, we seek to estimate population parameter: $\mu$, $\sigma$, $p$, $\rho$, $\mu_{1} -\mu_{2}$, $p_{1} - p_{2}$, $\frac{\sigma_{1}^{2}}{\sigma_{2}^{2}}$, $\beta_{0}$, $\beta_{1}$, $y^{*} =\beta_{0} +\beta_{1}x^{*}$, or $\theta$ from another distribution function (e.g. $a$, $b$ from uniform, $\theta$ from exponential), including distributions we haven't encountered yet (e.g. $p$ from geometric, $\lambda$ from Poisson, $\beta_{2}$ from quadratic regression)

    -  Deriving estimators: MOM and ML

    -  Properties of estimators: bias, efficiency, consistency

    -  Margin of error, confidence intervals, hypothesis tests

    -  Matrix algebra
		1.  This class has focused on the correlation $\rho$ between two variables, which also underlies linear regression line: slope coefficient $\rho\frac{\sigma_{y}}{\sigma_{x}}$ and coefficient of determination $\rho^{2}$
		2. Matrix algebra allows us to generalize everything to multiple variables (e.g. $\beta =(X^{'}X)^{- 1}X^{'}y$ instead of $\beta =\frac{x_{i}y_{i}}{x_{i}^{2}}$
		3. Individual slope coefficient $\beta_{1}$ then reflects *partial* correlation between education and income, holding experience, age, race, gender, etc. fixed.
		4. Controlling for more variable makes stronger case for correlation as causation

6.  Deriving estimator distributions

    -  Estimators depend on $X_{1},X_{2},\ldots,X_{n}$, and so are random variables with distributions

    -  $E() = E(\frac{1}{n}X_{i}) =\frac{1}{n}E(X_{i}) =\frac{1}{n}(\text{nμ}) =\mu$

    -  $V() = V(\frac{1}{n}X_{i}) =\frac{1}{n^{2}}V(X_{i}) =\frac{1}{n}(n\sigma^{2}) =\frac{\sigma^{2}}{n}$

    -  Distribution $\sim N(\mu,\frac{\sigma^{2}}{n})$ or $\frac{-\mu}{}\sim N(0,1)$ (by normality of $X_{i}$ or Central Limit Theorem)

    -  CLT also implies that $\frac{\widehat{p} - p}{}\sim N(0,1)$

    -  Difference estimators $\frac{({}_{1} - {}_{2}) - (\mu_{1} -\mu_{2})}{}\sim N(0,1)$ and $\frac{\widehat{p} - p}{}\approx N(0,1)$

    -  $X_{i}$ normal implies $(n - 1)\frac{\text{S}^{2}}{\sigma^{2}}\sim\chi^{2}(n - 1)$
 and therefore $\frac{s_{A}^{2}/\sigma_{A}^{2}}{s_{B}^{2}/\sigma_{B}^{2}}\sim F(n_{A} - 1,n_{B} - 1)$ and $\frac{-\mu}{}\sim t(n - 1)$

-  Similarly, $E({\widehat{\beta}}_{1}) =\ldots =\beta_{1}$, $V({\widehat{\beta}}_{1}) =\ldots =\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}}$
 and $\varepsilon_{i}$ normal implies that ${\widehat{\beta}}_{1}\sim N(\beta_{1},\frac{\sigma_{\varepsilon}^{2}}{S_{\text{xx}}})$ or $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim N(0,1)$

-  $(n - 2)\frac{S_{\varepsilon}^{2}}{\sigma_{\varepsilon}^{2}}\sim\chi(n - 2)$, implying that $\frac{{\widehat{\beta}}_{1} -\beta_{1}}{}\sim t(n - 2)$


7.  Matrix algebra True/False question tip

    -  Check simple cases (e.g. $1\times 1$, $2\times 2$), but not special cases

    -  Example: "All symmetric matrices are idempotent"
		1.  Try simple example: not special matrix like identity matrix or $(1111)$, but something with no special properties other than symmetry, such as $(1332)$ (and show that $(1332)(1332) =(109913)\neq(1332)$)
		2. Can also try really simple examples, such as scalar matrices: $(5)(5)\neq(5)$.

    -  T/F questions are not "trick" questions, but be careful. In real world, much of statistics is simply a matter of careful attention to details, and knowing exactly which inferences are legitimate under exactly which circumstances.

8.  Example problems

    -  Confidence interval for ${\widehat{Y}}^{*}$

    -  Hypothesis test for ${\widehat{p}}_{1} - {\widehat{p}}_{2}$
