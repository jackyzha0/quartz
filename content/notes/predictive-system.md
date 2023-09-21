---
title: "predictive-system"
aliases: 
tags: AI, CS
---

A system that takes some input and predicts some output variable.

The black box of the system learns with [[artificial-intelligence|AI]], it is not built by hand. This comes with the issue of [[ai-interpretability]].

The input data determines the outcome. 

The data can have unwanted patterns and the system can become **biased**
It's difficult to understand how the system makes decisions. **transparency**
If we start relying on a system that tends to make correct predictions, we can become careless and lose **control**
There can be an issue of **privacy** with the data.

don't:
- overhype benefits
- overlook potential harm
- outpace the law

do:
- be mindful of ethical issues
- ethics is everyone's problem

## Examples

### RoC * RoI
risk of conviction risk of incarceration

input: race, gender, criminal history
output: likelihood of reconviction

its difficult for jury to disregard something
ai can easily disregard information

massive racial bias

even if we remove race and gender from input, these can be determined from other variables (e.g., where you live).

### ACC POA model
predicts likelihood that an ACC claim will be accepted. If there it is high then the claim is automatically accepted.

A very simple model was used so it is interpretable.

### Student success
In a decision tree, ethnicity is the biggest predictor of student success.

### Social Media
The system predicts which articles are more likely to be read.

Creates extremist bubbles, not because we are extremists - its just human nature to prefer extreme content.




