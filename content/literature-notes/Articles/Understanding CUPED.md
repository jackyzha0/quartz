---
author: [[Matteo Courthoud]]
title: "Understanding CUPED"
tags: 
- articles
- literature-note
---
# Understanding CUPED

![rw-book-cover](https://miro.medium.com/v2/resize:fit:1200/1*yrXImqFDp6EdrNe8cWqujQ.png)

## Metadata
- Author: [[Matteo Courthoud]]
- Full Title: Understanding CUPED
- Category: #articles
- Document Note: CUPED (Controlled-Experiment using Pre-Experiment Data) is a technique used to increase the power of randomized controlled trials in A/B tests. It is essentially a residualized outcome regression and can be computed by regressing the post-treatment outcome on the treatment indicator, or by regressing the pre-treatment outcome and computing the residuals. It is closely related to autoregression and difference-in-differences, but is not equivalent, except in special cases. When randomization is imperfect, difference-in-differences is more efficient than the other methods.
- URL: https://towardsdatascience.com/understanding-cuped-a822523641af

## Highlights
- **CUPED** (Controlled-Experiment using Pre-Experiment Data), a technique to increase the power of randomized controlled trials in A/B tests. ([View Highlight](https://read.readwise.io/read/01gvp0wa3832tny7qtwwp5qaa6))
- noticed a similarity with some causal inference methods I was familiar with, such as [Difference-in-Differences](https://diff.healthpolicydatascience.org/) or regression with control variables. ([View Highlight](https://read.readwise.io/read/01gvp0xj0m8abtz36yeeq80h3a))
- CUPED is essentially a [residualized outcome regression](https://www.google.com/url?q=https%3A%2F%2Fwww.dropbox.com%2Fs%2Fq8033tqrmsi7cge%2FResOut.pdfhttps%3A%2F%2Fwww.dropbox.com%2Fs%2Fm6jt5dsqm5xvyml%2FisoLATE_022018.pdf%3Fraw%3D1&sa=D&sntz=1&usg=AOvVaw2Rek6lp6L41rw6Osbs4sAS) ([View Highlight](https://read.readwise.io/read/01gvp0xyekcg6qvprnc97zavqs))
- We randomly split a set of users into a treatment and control group and we show the ad campaign to the treatment group. Differently from the standard A/B test setting, assume we observe users also before the test. ([View Highlight](https://read.readwise.io/read/01gvp0yhbcw0xjqd4yyed8z8x8))
- This estimator is **unbiased**, which means it delivers the correct estimate, on average. However, it can still be improved: we could **decrease its variance**. Decreasing the variance of an estimator is extremely important since it allows us to
  • **detect smaller effects**
  • detect the same effect, but with a **smaller sample size** ([View Highlight](https://read.readwise.io/read/01gvp10recvywm3wwzb6j0tcxc))
- The **idea** of CUPED is the following. Suppose you are running an AB test and *Y* is the outcome of interest (`revenue` in our example) and the binary variable *D* indicates whether a single individual has been treated or not (`ad_campaign` in our example).
  Suppose you have access to another random variable *X* which is **not affected** by the treatment and has known expectation *𝔼[X]*. ([View Highlight](https://read.readwise.io/read/01gvp11tv345ar9k2h3emme5ye))
- the higher the correlation between *Y* and *X*, the higher the variance reduction of CUPED. ([View Highlight](https://read.readwise.io/read/01gvp1465m95ctrbgdf5ehbv3y))
- What is the **optimal choice** for the control variable *X*?
  We know that *X* should have the following **properties**:
  • not affected by the treatment
  • as correlated with *Y₁* as possible
  The authors of the paper suggest using the **pre-treatment outcome** *Y₀* since it gives the most variance reduction in practice. ([View Highlight](https://read.readwise.io/read/01gvp15gjkt7vqctvbjb26bqj5))
- we can compute the CUPED estimate of the average treatment effect as follows:
  1. Regress *Y₁* on *Y₀* and estimate *θ̂*
  2. Compute *Ŷ₁ᶜᵘᵖᵉᵈ* *= Y̅₁ − θ̂ Y̅₀*
  3. Compute the difference of *Ŷ₁ᶜᵘᵖᵉᵈ* between treatment and control group ([View Highlight](https://read.readwise.io/read/01gvp16327aw00h4kgsck2gm9n))
- The main advantage of diff-in-diff is that it allows to estimate the average treatment effect when randomization is not perfect and the treatment and control group are not comparable. The **key assumption** is that the difference between the treatment and control groups is constant over time. By taking a double difference, we cancel it out. ([View Highlight](https://read.readwise.io/read/01gvp187c4bcn53mrs609wv4jd))
- The most common way to compute the diff-in-diffs estimator is to first reshape the data in a **long format** or **panel format** (one observation is an individual *i* at time period *t*) and then regress the outcome *Y* on the full interaction between the post-treatment dummy *𝕀(t=1)* and the treatment dummy *D*. ([View Highlight](https://read.readwise.io/read/01gvp18yhg6h3p1rmabjp1vy33))
- With imperfect treatment assignment, both difference-in-differences and autoregression are **unbiased** for the true treatment effect, however, diff-in-diffs is **more efficient**. Both CUPED and simple difference are **biased** instead. ([View Highlight](https://read.readwise.io/read/01gvp1a6mpcypey2h1p7vkbt1a))
