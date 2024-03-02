---
title: SHAP - a reliable way to analyze model interpretability
tags:
- deep-learning
- interpretability
- algorithm
date: 2024-02-28
---

SHAP is the most popular model-agnostic technique that is used to explain predictions. SHAP stands for **SH**apley **A**dditive ex**P**lanations

Shapely values are obtained by incorporating concepts from *Cooperative Game Theory*  and *local explanations*

# Mathematical and Algorithm Foundation

## Shapely Values

Shapely values were from game theory and invented by Lloyd Shapley. Shapely values were invented to be a way of providing a fair solution to the following question:

> [!question] 
>  If we have a coalition **C** that collaborates to produce a value **V**: How much did each individual member contribute to the final value

The method here we assess each individual member’s contribution is to removing each member to get a new coalition and then compare their production, like this graphs:

![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329165429.png)

And then, we get every member 1 included or not included coalitions like this:

![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329165523.png)

Using left value - right value, we can get difference like image left above; And then we calculate the mean of them:

$$
\varphi_i=\frac{1}{\text{Members}}\sum_{\forall \text{C s.t. i}\notin \text{C}} \frac{\text{Marginal Contribution of i to C}}{\text{Coalitions of size |C|}}
$$

## Shapely Additive Explanations

We need to know what’s **additive** mean here. Lundberg and Lee define an additive feature attribution as follows:

![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329165623.png)

![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329165818.png)

$x'$, the simplified local inputs usually means that we turn a feature vector into a discrete binary vector, where features are either included or excluded. Also, the $g(x')$ should take this form:

$$
g(x')=\varphi_0+\sum_{i=1}^N \varphi_i {x'}_i
$$

* $\varphi_0$ is the **null output** of this model, that is, the **average output** of this model
-  $\varphi_i$ is **feature affect**, is how much that feature changes the output of the model, introduced above. It’s called **attribution**

![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329165840.png)

Now Lundberg and Lee go on to describe a set of three desirable properties of such an additive feature method, **local accuracy**, **missingness**, and **consistency**.

### Local accuracy

$$
g(x')\approx f(x) \quad \text{if} \quad x'\approx x
$$

### Missingness

$$
{x_i}' = 0 \rightarrow \varphi_i = 0
$$

if a feature excluded from the model. it’s attribution must be zero; that is, the only thing that can affect the output of the explanation model is the inclusion of features, not the exclusion.

### Consistency

If feature contribution changes, the feature effect cannot change in the opposite direction

# Why SHAP

Lee and Lundberg in their paper argue that only SHAP satisfies all three properties if **the feature attributions in only additive explanatory model are specifically chosen to be the shapley values of those features**

# SHAP, step-by-step Process, same as shap.explainer

For example, we consider a ice cream shop in the airport, it has four features we can know to predict his business.

$$
\begin{bmatrix}
\text{temperature} & \text{day of weeks} & \text{num of flights} & \text{num of hours}
\end{bmatrix}
\\
\rightarrow \\
\begin{bmatrix}
T & D & F & H
\end{bmatrix}
$$

For, example, we want to know the temperature 80 in sample [80 1 100 4] shapley value, here’s the step

- Step 1. Get random permutation of features, and give a bracket to the feature we care and everything in its right. (manually)

$$
\begin{bmatrix}
F & D & \underbrace{T \quad H}
\end{bmatrix}
$$

- Step 2. Pick random sample from dataset
 
For example, [200 5 70 8], form: [F D T H]

- Step 3. Form vectors $x_1 \quad x_2$

$$
x_1=[100 \quad 1 \quad 80 \quad \color{#BF40BF} 8 \color{#FFFFFF}] 
$$

$x_1$ is partially from original sample and partially from the random chosen one, the feature in bracket will from random chosen one, exclude what we care

$$
x_2 = [100 \quad 1 \quad \color{#BF40BF} 70 \quad  8 \color{#FFFFFF}]
$$

$x_2$  just change the feature we care into the same as random chosen one’s feature value

Then, calculate the diff and record

$$
DIFF = c_1 - c_2
$$

- Step 4. Record the diff & return to step 1. and repeat many times

$$
\text{SHAP}(T=80 | [80 \quad 1 \quad 100 \quad 4]) = \text{average(DIFF)}
$$

# Shapley kernel

## Too many coalitions need to be sampled

Like we introduce shapley values above, for each $\varphi_i$ we need to sample a lot of coalitions to compute the difference. 

For 4 features, we need 64 total coalitions to sample; For 32 features, we need 17.1 billion coalitions to sample.

It’s entirely untenable.

So, to get over this difficulty, we need devise a **shapley kernel**, and that’s how the Lee and Lundberg do

![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329181956.png)

## Detail
![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329182011.png)

Though most of ML models won’t just let you omit a feature, what we do is define a **background dataset** B, one that contains a set of representative data points that model was trained over. We then filled in out omitted feature of features with values from background dataset, while holding the features are included in the permutation fixed to their original values. We then take the average of the model output over all of these new synthetic data point as our model output for that feature permutation which we call $\bar{y}$.

$$
E[y_{\text{12i4}}\ \  \forall \ \text{i}\in B] = \bar{y}_{\text{124}}
$$ 
![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329205039.png)

Them we have a number of samples computed in this way,like image in left.

We can formulate this as a weighted linear regression, with each feature assigned a coefficient.

And we can prove that, in the special choice, the coefficient can be the shaplely values. **This weighting scheme is the basis of the Shapley Kernal.** In this situation, the weighted linear regression process as a whole is Kernal SHAP.

### Different types of SHAP

- **Kernal SHAP**
- Low-order SHAP
- Linear SHAP
- Max SHAP
- Deep SHAP
- Tree SHAP

![](computer_sci/deep_learning_and_machine_learning/Model_interpretability/attachments/Pasted%20image%2020230329205130.png)

### You need to notice
We can see that, we calculate shapley values using linear regression lastly. So there must be the error here, but some python packages can not give us the error bound, so it’s confusion to konw if this error come from linear regression or the data, or the model.


# Reference

[Shapley Additive Explanations (SHAP)](https://www.youtube.com/watch?v=VB9uV-x0gtg)

[SHAP: A reliable way to analyze your model interpretability](https://towardsdatascience.com/shap-a-reliable-way-to-analyze-your-model-interpretability-874294d30af6)

[【Python可解释机器学习库SHAP】：Python的可解释机器学习库SHAP](https://zhuanlan.zhihu.com/p/483622352)

[Shapley Values : Data Science Concepts](https://www.youtube.com/watch?v=NBg7YirBTN8)

# Appendix

Other methods to interprete model:

[Papers with Code - SHAP Explained](https://paperswithcode.com/method/shap)