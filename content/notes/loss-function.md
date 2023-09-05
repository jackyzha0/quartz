---
title: "loss-function"
aliases: 
tags: AI
---

Used to measure performance/accuracy of [[machine-learning]] models.

For [[classification]], models like a [[decision-tree]] and a [[perceptron]], measure of performance is the **classification error** expressed as a percentage i.e., the number of outputs that are mislabelled $(0...1)$

we can also use a [[confusion-matrix]] to measure the distribution of errors

## accuracy
is the inverse of classification error i.e., $accuracy = 1 - classification\ error$

## mean squared error (MSE)
measures the *distance* of models output from target value i.e., how wrong is the model $(y-\hat{y}^2)$. The squared disatance of predictions form the target values. Sometimes *root MSE* is more useful.

$$
J_{MSE} = \frac{1}{N} \sum_{i=1}^{N} (y-\hat{y})^2
$$

One limitation is the MSE is quite affected by large [[outlier]]s

## least squares
refers to the analytical solution for $w's$ that gives smallest $J_{MSE}$ Given $\bar{x}$ and $y$, find the values of $w$ that give the smallest $J_{MSE}$:

$$
\bar{X}=\left[\begin{array}{ccccc}
x_{11} & x_{12} & \ldots & x_{1 d} & 1 \\
x_{21} & x_{22} & \ldots & x_{2 d} & 1 \\
\vdots & \vdots & \ddots & \vdots & 1 \\
x_{N 1} & x_{N 2} & \ldots & x_{N d} & 1
\end{array}\right] \mathbf{w}=\left[\begin{array}{c}
w_1 \\ w_2 \\ \vdots \\ w_d \\ w_0
\end{array}\right] \mathbf{y}=\left[\begin{array}{c}
y_1 \\ y_2 \\ \vdots \\ y_N
\end{array}\right] \quad J_{\mathrm{MSE}}=\frac{1}{N}\left(\mathbf{y}^T-\mathbf{w}^T \bar{X}^T\right)(\mathbf{y}-\bar{X} \mathbf{w})
$$

$\mathbf{w}^*=\left(\bar{X}^T \cdot \bar{X}\right)^{-1} \cdot \bar{X}^T \cdot \mathbf{y}$, where $\cdot$ is the dot product.

The use of matrices makes it very easy to compute fast using a GPU. 

In Python: `w=np.dot(np.dot(np.linalg.inv(np.dot(X.T,X)),X.T),y))`

