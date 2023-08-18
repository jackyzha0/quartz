---
title: "Feature Representation"
tag: ml
date:
alias:
---

> [!idea] Core idea:
> Use a feature function to transform original data from $\mathbb{R}^{d}$ to some other $\mathbb{R}^D$

Basic example of this is to transform a [[linear classifier]] through the origin to one not through the origin.
>[!example]- Perceptron through origin transformation
>![[perceptron_through_origin.pdf]]

We can even turn un-separable datasets into separable ones!
>[!example] XOR data set transformation example
>Original XOR dataset (1D version) does not have a linear separator:
>
> ![[Pasted image 20230709203605.png|300]]
> 
> Using the transformation $\phi(x) = [x, x^2]$:
> 
> ![[Pasted image 20230709203728.png|300]]
>
>A linear separator in the $\phi$ space is non-linear in the original space.
> 	- For example, $x^{2}-1 = 0$ can be a separator in the $\phi$ space, with the half-plane $x^{2}-1>0$ labeled as positive.
> 	- The corresponding separator in the original space can then be found by considering what points are on the boundary of $x^{2}-1 > 0$ – obviously, the answer is $+1$ and $-1$;
> 	  
>Visualizing the the original separator:
>
> ![[Pasted image 20230709204230.png|300]]

This is a very useful and generalizable strategy – it serves as the basis for [[Kernel Methods|kernel methods]].

One systematic strategy for constructing a new feature space is to use a [[Polynomial Basis|polynomial basis]].

Features can also be improved through [[Feature Engineering]].