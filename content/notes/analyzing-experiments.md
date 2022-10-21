---
title: "analyzing-experiments"
aliases: 
tags: 
- info203
- lecture
- scott-video
sr-due: 2023-05-10
sr-interval: 200
sr-ease: 250
---

# 3 questions
- what does my data look like
	- graphs, plots, differnent summary plots
- what are the overall numbers 
	- aggregate stats e.g., mean average std dev
- are the differences "real"?
	- significance p-value
	- likihood that results are due to chance

## p value
pearsons chi-squared test. comparing rate of expected value vs observed value

$$
\chi^{2}=\frac{(observed-expected)^2}{expected}
$$

"normal" outcome variance follow normal/gaussian distribution.

as chi squared gets bigger it is less likey that the coin is unbiased

e.g., 20 tosses, we got 13 heads. at p<0.05 can we reject the null that the coin is unbiased

![value = 1.8](https://i.imgur.com/SHKLk53.png)

![](https://i.imgur.com/rxaswEP.png)

degrees of freedom num possibilites n-1 = 2-1 = 1

we cannot reject the null

![example 2 chi2 5.4](https://i.imgur.com/UnX2WbG.png) reject the null

![click through rate example](https://i.imgur.com/JYFbgS2.png)\

formalieses: "were pretty sure". helps generalize from small samples

for normal continiuous data
- t-tests (compare 2)
- annova (compare more than 2)

data is not always normal.
- bi modal - 2 peaks
- skewed
	- e.g., time: can be infiniely slow, but not infinitely fast


non-normal data
- knowing is half tha battle
- run A/A tests
- use randomised testing