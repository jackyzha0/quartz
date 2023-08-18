---
title: "Polynomial Basis"
tag: ml
date: 
alias:
---

Systematic strategy for constructing a feature space if features are are naturally numerical

>[!idea] General idea
>If you are using $k$th-order basis (where $k$ is a positive integer), you include a feature for every possible product of $k$ different dimensions in your original input.
>  
>![[Pasted image 20230710185636.png|400]]


Example: XOR problem using a polynomial basis as a feature transformation

>[!example] XOR with feature transformation 
>Let’s say $k=2$ for the XOR problem in 2 dimensions.
> 
>![[Pasted image 20230710190154.png|200]]
>
>The feature transform is:
>$$\phi((x_{1}, x_{2})) = (1, x_{1}, x_{2}, x_{1}^{2}, x_{1}x_{2}, x_{2}^2)$$
>
>After training a perceptron for 4 iterations, we have:
>$$\theta = (0,0,0,0,4,0)$$
>$$\theta_{0} = 0$$
>which corresponds to
>$$0 + 0x_{1} + 0x_{2} + 0x_{1}^{2} + 4x_{1}x_{2} + 0x_{2}^{2}+ 0 = 0$$
>
>Plotting this, we can see the gray shaded region classified as negative and the white region
>
>![[Pasted image 20230710191000.png|250]]
>
>For more complex dataset, the perceptron can still find appropriate classifiers using this trick:
>
>![[Pasted image 20230710191349.png|250]]
>![[Pasted image 20230710191419.png|250]]




