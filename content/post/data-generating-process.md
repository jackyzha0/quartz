---
title: "Data Generating Process"
date: 2026-01-14T05:00:00+00:00
slug: data-generating-process
description: "Understand the Data Generating Process (DGP) to explore mechanisms behind data, enabling better insight into uncertainty and statistical methods"
---
Data does not just appear. Something creates it. A coin flip. A measurement device. A biological process. A human decision. Understanding that something, the mechanism that generates observations, is the key to understanding uncertainty.

This mechanism has a name: the Data Generating Process, or DGP.

You can run this experiments in a free google colab environment [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1_DKAG4dXC66WrIPlCpKy6mfToCa9QxsO?usp=sharing)
## What Is a Data Generating Process?

A DGP is the real world system that produces the numbers you eventually analyze. It includes everything: the true underlying signal, the noise, the measurement error, the selection bias, the sampling method.

When you flip a coin 100 times and count heads, the DGP is the physics of the coin, the force of your thumb, the air resistance, and everything else that determines whether each flip lands heads or tails. In practice, we model this as a simple probability: each flip has some chance p of landing heads, independent of other flips.

When a hospital records patient outcomes, the DGP includes the disease biology, treatment effects, patient compliance, measurement protocols, and which patients showed up in the first place.

The data you see is just one possible output from the DGP. Run the process again and you get different numbers. This is where uncertainty comes from.

## An Example

Suppose I want to know whether a new drug lowers blood pressure. I run a trial with 50 patients. Half get the drug, half get placebo. I measure the difference in blood pressure between groups.

The traditional approach: calculate a t-statistic, look up a p-value, declare significance or not.

The DGP approach: first, write down what you think is generating the data.

```python
import numpy as np

def generate_trial_data(n_per_group, true_effect, noise_sd):
    # Placebo group: just noise around baseline
    placebo = np.random.normal(0, noise_sd, n_per_group)
    
    # Treatment group: true effect plus noise
    treatment = np.random.normal(true_effect, noise_sd, n_per_group)
    
    return placebo, treatment
```

This function is a DGP. It specifies exactly how the data comes into existence. The true effect is a parameter I control. The noise standard deviation is another parameter. When I call this function, I get one possible trial result.

Here is the insight: I can call it many times.

```python
def run_simulation(n_per_group, true_effect, noise_sd, n_simulations):
    observed_differences = []
    
    for _ in range(n_simulations):
        placebo, treatment = generate_trial_data(n_per_group, true_effect, noise_sd)
        diff = treatment.mean() - placebo.mean()
        observed_differences.append(diff)
    
    return np.array(observed_differences)
```

The figure below shows what happens when we do this. On the left is the DGP itself, just a box with parameters. In the middle, we run it five times and see five different trial results. On the right, we run it 10,000 times and see the full distribution of possible outcomes.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768864552874/fa00af11-0414-4b47-8e18-b1ab131d5594.png)

That distribution on the right is uncertainty made visible. The true effect is 5 mmHg, but any single trial might show anywhere from -5 to +15 just due to noise. This is why we need statistics: to separate signal from noise.

## The Null Distribution and P-values

If I set `true_effect=0` and run 10,000 simulations, I get the distribution of differences I would see if the drug does nothing. This is the null distribution. I built it by simulating the null world.

If my actual trial shows a difference of 8.5 mmHg, I can see where that falls in the null distribution.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768864582121/97f2c136-7617-41f4-a91e-afd5b092e4e0.png)

The red lines mark my observed value and its mirror. The p-value is just the fraction of the null distribution that falls beyond those lines. In this case, about 0.3% of the null simulations produced results as extreme as what I observed.

This is what "statistically significant" means. My result is unlikely to have come from the null world.

No formulas. No t-tables. Just direct simulation of what would happen if the drug did nothing.

## Why This Changes Everything

When you write the DGP, you confront your assumptions explicitly.

Look at my function again. I assumed both groups have the same noise level. I assumed the noise is normally distributed. I assumed each patient's outcome is independent of others. These assumptions are now visible in the code, not hidden in the derivation of a test statistic.

What if those assumptions are wrong?

```python
def generate_trial_data_realistic(n_per_group, true_effect, noise_sd):
    # Some patients respond strongly, others barely respond
    responder_fraction = 0.3
    
    placebo = np.random.normal(0, noise_sd, n_per_group)
    
    treatment = []
    for _ in range(n_per_group):
        if np.random.random() < responder_fraction:
            # Responder: large effect
            treatment.append(np.random.normal(true_effect * 2, noise_sd))
        else:
            # Non-responder: small effect
            treatment.append(np.random.normal(true_effect * 0.2, noise_sd))
    
    return placebo, np.array(treatment)
```

Now I have a bimodal response. Some patients are responders, others are not. The average effect might be the same, but the distribution looks different. Does my statistical test still work? I can find out by running simulations with this new DGP and checking whether my test maintains its false positive rate.

This is the power of thinking generatively. You can stress test your methods against any scenario you can imagine and code.

## The Sampling Distribution Demystified

The central mystery in introductory statistics is the sampling distribution. Students learn that if you take many samples and compute the mean of each, those means form a distribution that is approximately normal with standard deviation \\(sigma/\sqrt{n}\\)

This is true. But why?

The DGP approach lets you see it happen.

```python
def demonstrate_sampling_distribution(population, sample_size, n_samples):
    sample_means = []
    
    for _ in range(n_samples):
        sample = np.random.choice(population, size=sample_size, replace=True)
        sample_means.append(sample.mean())
    
    return np.array(sample_means)

# Create a weird, non-normal population
population = np.concatenate([
    np.random.exponential(2, 5000),
    np.random.normal(10, 1, 5000)
])
```

Look at what happens:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768864603757/9edd8660-1039-4053-a21a-e0772bb3cf43.png)

The top left panel shows the population. It is not normal at all. Two peaks, a long tail, nothing like a bell curve.

But watch what happens as we draw samples and compute means. At n=5, still pretty weird. At n=30, looking more normal. At n=100, almost perfectly bell-shaped.

The Central Limit Theorem is not a formula to memorize. It is something you can watch happen. The averaging process smooths out the weirdness. Larger samples smooth more. The standard deviation of the sampling distribution shrinks from 2.35 to 0.95 to 0.52, roughly following \\(1/\sqrt{n}\\)

## Bootstrap: When You Only Have One Sample

In real life, you run one trial. You collect one dataset. You cannot go back and sample the population again.

The bootstrap solves this by treating your sample as if it were the population.

```python
def bootstrap_confidence_interval(data, n_bootstrap, confidence=0.95):
    bootstrap_means = []
    n = len(data)
    
    for _ in range(n_bootstrap):
        # Resample with replacement from your actual data
        resample = np.random.choice(data, size=n, replace=True)
        bootstrap_means.append(resample.mean())
    
    # Find percentiles
    lower = np.percentile(bootstrap_means, (1 - confidence) / 2 * 100)
    upper = np.percentile(bootstrap_means, (1 + confidence) / 2 * 100)
    
    return lower, upper
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768865346070/a21070df-b2ef-4452-b335-245c7b05e991.png)

On the left is your one sample of 30 observations. This is all you have. On the right is what happens when you resample from it 10,000 times. The spread of those bootstrap means gives you the confidence interval directly. The middle 95% spans from 94.5 to 106.8.

No formulas involving t-distributions. No assumptions about normality. Just simulation.

## Permutation Tests: Simulating the Null World

Back to the drug trial. I want a p-value. How unlikely is my observed difference if the drug does nothing?

The permutation test answers this by explicitly constructing the null world.

```python
def permutation_test(group1, group2, n_permutations):
    observed_diff = group2.mean() - group1.mean()
    combined = np.concatenate([group1, group2])
    n1 = len(group1)
    
    null_diffs = []
    for _ in range(n_permutations):
        # Shuffle all observations
        np.random.shuffle(combined)
        # Split into fake groups
        fake_group1 = combined[:n1]
        fake_group2 = combined[n1:]
        null_diffs.append(fake_group2.mean() - fake_group1.mean())
    
    # P-value: fraction of null differences as extreme as observed
    null_diffs = np.array(null_diffs)
    p_value = np.mean(np.abs(null_diffs) >= np.abs(observed_diff))
    
    return p_value, null_diffs
```

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1768865387610/a9b53e5a-2f07-46b0-b553-e4be1dbfc989.png)

Panel 1 shows the original data. Control group in gray, treatment in blue. The observed difference is 3.8.

Panel 2 shows what happens when we shuffle the labels. If the drug truly does nothing, it should not matter which patients got which label. After shuffling, the difference is -2.3.

Panel 3 shows the null distribution from 10,000 shuffles. Most differences cluster around zero. My observed value of 3.8 is marked by the red line. The red bars show all permuted differences as extreme or more extreme than mine. That fraction is the p-value: 0.31.

In this case, a p-value of 0.31 means my result is not unusual under the null hypothesis. I cannot reject the possibility that the drug does nothing. The permutation test made that clear by showing me exactly what "nothing" looks like.

## From Consumer to Architect

The shift from traditional statistics to simulation based thinking is a shift in identity.

In the traditional approach, you are a consumer of methods. Someone else derived the test. You apply it to your data. The uncertainty is someone else's problem, already solved, packaged into a formula.

In the DGP approach, you are an architect of models. You decide what mechanism generates your data. You write it down. You simulate it. You test your methods against it. The uncertainty becomes visible, manipulable, yours to explore.

This takes more work. You have to write code. You have to think carefully about what assumptions you are making and whether they match reality.

But the payoff is understanding. Not just knowing that a p-value below 0.05 means something. Knowing what it means because you built the null world yourself and watched where your data landed in it.

Data does not analyze itself. Something creates it. Learn to think like the creator.