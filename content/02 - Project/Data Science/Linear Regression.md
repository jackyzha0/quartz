---
creation_date: 2023年07月24日
banner: "https://images.unsplash.com/photo-1565292793248-f5c13612c48e"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.15902
---

# Linear Regression
**NOT TO BE CONFUSED WITH LOGISTIC REGRESSION**

***What is regression?*** It is the process of predicting a continuous value. 

## 01 Linear Regression 
The use of one independent variable $x$ to predict a dependent variable $y$. A **simple linear regression** can be represented with the following equation
$$ Y = \theta_0 + \theta_1x_1$$
A **multiple linear regression** can be represented by 
$$Y = \theta_{0}+ \theta_{1}x_1 + \theta_2x_2 + \dots + \theta_nx_n $$ 
A **multiple polynomial regression** can be represented with the following equation
$$ Y = \theta_0 +\theta_1x_1 +\theta_2x_2^2 + \theta_3x_3^3 + \dots + \theta_nx_n^n$$
## 02 Breaking Down Linear Regression 
Below, we take a look on how the linear regression machine learning algorithm works, how it updates the parameters with each training step.
$$ \cases{n = 1时,y=\theta_0+\theta_{1}x_1 & Simple Linear Regression \\n>1时,y=\theta_{0}+\theta_{1}x_{1} +\cdots+\theta_{n}& Multiple Linear Regression} $$
Loss function, vectorized over $m$ examples is $J(\theta) = \frac{1}{m}\sum\limits^{m}_{(i=1)}(y^{i}-\hat{y}^{(i)})^{2}$ , we define for the test case $i$, 
$$\hat{y}^{(i)} =  \theta_{0}+\theta_{1}x_{1}^{(i)} + \theta_{2}x^{(i)}_{2}+\cdots + \theta_{n}x_{n}^{i}$$
$X = \begin{bmatrix} 1 & x_{1}^{(1)} & x_{2}^{(1)} & \cdots & x_{n}^{(1)} \\  1 & x_{1}^{(2)} & x_{2}^{(2)} & \cdots & x_{n}^{(2)} \\ \cdots \\  1 & x_{1}^{(m)} & x_{2}^{(m)} & \cdots & x_{n}^{(m)}\end{bmatrix},  \theta = \begin{bmatrix} \theta_{0}\\ \theta_{1} \\ \theta_{2} \\ \cdots \\ \theta_{n} \end{bmatrix}$

Which gives us 
$$ J(\theta) = \frac{1}{m}\sum\limits^{m}_{i=1}\left(y^{(i)} - X_b^{(i)}\theta\right)^2$$
*Sometimes* $\frac{1}{2m}$ is used.
Then we take the derivative of $J(\theta)$, or $\nabla J(\theta)$
$$\nabla J(\theta) = \begin{bmatrix} \frac{\partial J}{\partial \theta_{0} } \\  \frac{\partial J}{\partial \theta_{1}} \\ \frac{\partial J}{\partial \theta_{2}}\\ \cdots \\ \frac{\partial J}{\partial \theta_{n} }\end{bmatrix} =  \frac{1}{m} \begin{bmatrix} \sum\limits^{m}_{i=1}2\left(y^{(i)} -X_b^{(i)}\right)(-1) \\ 
\sum\limits^{m}_{i=1}2\left(y^{(i)} - X_b^{(i)}\right)\left(-X_{1}^{(i)}\right) \\
\sum\limits^{m}_{i=1}2\left(y^{(i)} - X_b^{(i)}\right)\left(-X_{2}^{(i)}\right) \\
\vdots \\
\sum\limits^{m}_{i=1}2\left(y^{(i)} - X_b^{(i)}\right)\left(-X_{n}^{(i)}\right)
\end{bmatrix} = \frac{2}{m}\begin{bmatrix}
\sum\limits^{m}_{i=1}(y^{(i)} -X_b^{(i)})(-1) \\
\sum\limits^{m}_{i=1}(y^{(i)} - X_b^{(i)})(-X_{1}^{(i)}) \\
\sum\limits^{m}_{i=1}(y^{(i)} - X_b^{(i)})(-X_{2}^{(i)}) \\
\vdots \\
\sum\limits^{m}_{i=1}(y^{(i)} - X_b^{(i)})(-X_{n}^{(i)})
\end{bmatrix}$$

Then
$$\nabla J(\theta) = \frac{2}{m}\begin{bmatrix}
\rowcolor{lightgreen} \sum\limits^{m}_{i=1}(y^{(i)} -X_b^{(i)})(-1) \\
\rowcolor{lightblue} \sum\limits^{m}_{i=1}(y^{(i)} - X_b^{(i)})(-X_{1}^{(i)}) \\
\sum\limits^{m}_{i=1}(y^{(i)} - X_b^{(i)})(-X_{2}^{(i)}) \\
\vdots \\
\rowcolor{lightpink} \sum\limits^{m}_{i=1}(y^{(i)} - X_b^{(i)})(-X_{n}^{(i)})
\end{bmatrix} = \begin{bmatrix}
\rowcolor{lightgreen} X^{1}_{b}\theta - y^{1} \\
\rowcolor{lightblue} X^{2}_{b}\theta - y^{2} \\
X^{3}_{b}\theta - y^{3} \\
\vdots \\
\rowcolor{lightpink}X^{n}_{b}\theta - y^{n}
\end{bmatrix}\begin{bmatrix} \columncolor{lightgreen} 1 & \columncolor{lightblue}x_{1}^{(1)} & x_{2}^{(1)} & \cdots & \columncolor{lightpink} x_{n}^{(1)} \\  1 & x_{1}^{(2)} & x_{2}^{(2)} & \cdots & x_{n}^{(2)} \\ \cdots \\  1 & x_{1}^{(m)} & x_{2}^{(m)} & \cdots & x_{n}^{(m)}\end{bmatrix} $$
$$ = \frac{2}{m} \left(X_{b}\theta - y\right)^{T}X_b $$
Get the minimum with $$\nabla J(\theta) = 0$$$$ \frac{2}{m} \left(X_{b}\theta - y\right)^{T}X_{b}= 0 $$
Multiply by $m/2$ on both sides and expand.
$$X_b^T​X_b​θ=X_b^T​y $$
Multiply by inverse.
$$ θ=(X_b^T​X_b​)^{-1}X_b^T​y$$
Then which each step, we update $\theta$ with this function. 

**Remark:** It is important to note that linear regression uses a simple linear model, there is no activation function involved. Another way to represent this is $f_{\vec{w},b}(\vec{x} + b)=\vec{w}\cdot\vec{x}+b$.

***How to understand SLR in a statistical approach?***


## 02 Linear Basis Function Regression


## 03 Bayesian Linear Regression


## 04 Logistic Regression

