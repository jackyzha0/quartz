---
creation_date: 2023年09月20日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Backpropagation
## 01 Background
Here, we discuss the the math behind backpropagation, the driving force of [[Neural Networks]]. In essence, we use gradient descent to minimize the cost function. The chain rule is applied to update the weights and biases (learnable parameters) throughout the neural network after each forward pass of training examples (or batch of training examples).

Below, we answer the questions:
- What is gradient descent?
- What is its use in deep learning?
- How to calculate gradient descent?
## Computation Graph
Let's look review the fundamentals of a chain rule using a computation graph. Let's assume we have the following computation graph for a simple function $J=3(a+bc)$. We can define the computational graph is
![[Pasted image 20230920140851.png | center]]
Let's calculate $J$ with respect to $v$, which gives us the "first step" of backpropagation, "one step backward in the graph". $J$ is also known as "final output variable".
$$ 
\frac{\partial J}{\partial v}=3
$$
We then find $J$ with respect to the other variables.
$$ 
\frac{\partial J}{\partial a}=\frac{\partial J}{\partial v}\frac{\partial v}{\partial a} = 3 \times 1=3 
$$
$$ 
\frac{\partial J}{\partial u} = \frac{\partial J}{\partial v} \frac{\partial v}{\partial u} = 3 \times 1 = 3
$$
$$ 
\frac{\partial J}{\partial b} = \frac{\partial J}{\partial v} \frac{\partial v}{\partial u}\frac{\partial u}{\partial b}=3\times 1 \times 2=6
$$
$$ 
\frac{\partial J}{\partial c} = \frac{\partial J}{\partial v} \frac{\partial v}{\partial u}\frac{\partial u}{\partial c}\times b =3\times 1 \times 3=9
$$
Here, we have calculated all the gradients the function $J$ with respect to $v, a, u, b, c$ using the chain rule. In a machine learning model, $J$ could be a Cost Function that we are trying to minimize. In code, we often shorten $\frac{\partial J}{\partial v}$ as $dv$. 
## Linear Regression
[[Linear Regression]]


## Logistic Regression
[[Logistic Regression]]
Let's decipher back-propagation for a logistic regression task. Let's recap the related functions. These are the "forward" computations.
$$
z = w^{T} + b \tag{1} 
$$
$$ 
\hat{y} = a =\sigma(z)\tag{2}
$$
$$ 
L(a,y)=-\left[y\log{a}+ (1-y)\log{(1-a)}\right] \tag{3}
$$
This loss function $(3)$ is known as the **logistic loss** or log-loss function. Logistic Regression uses a sigmoid activation function, which can be defined as:
$$ 
\hat{y} = a =\sigma(z) = \frac{1}{1+e^{-z}}\tag{4} 
$$
**Example with only Two Features**
Let's look at a simple example with only $n=2$ features. Our computation graph is shown below. 
![[Pasted image 20230920144939.png | center | 400]]
In the backward computations, we want to compute the derivatives of Loss with respect to $a$.
$$
da = \frac{\partial L}{\partial a} = -\frac{y}{a}+\frac{1-y}{a}
$$
$$ 
dz = \frac{\partial L}{\partial z} = \frac{\partial L}{\partial a}\frac{\partial a}{\partial z} = -\left( \frac{y}{a}+\frac{1-y}{a}\right)\left(a(1-a)\right)= a - y
$$

#想法 如何得到$\frac{\partial a}{\partial z}$？

Then, use the chain rule to compute how much you need to change $w$ and $b$.
$$
dw_{1}= \frac{\partial L}{\partial w_{1}} = \frac{\partial L}{\partial a}\frac{\partial a}{\partial z}\frac{\partial z}{\partial w_{1}} = x_{1}dz
$$
Then, we would update $w_1$ as 
$$ 
w_{1}=w_{1}+\alpha dw_1
$$
The same goes for $w_2$ and $b$
$$ 
w_{2}=w_{2}+\alpha dw_{2}
$$
$$ 
db = \frac{\partial L}{\partial b} =  \frac{\partial L}{\partial a}\frac{\partial a}{\partial z}\frac{\partial z}{\partial b} = dz, \therefore b=b+\alpha dz
$$
We would initialize $J=0, dw_{1}=0, dw_{2}=0, db=0$, and use a for loop over the training set and compute the derivative of the loss function with respect to each weight, updating the weights after each training set example.

Thus let's define our algorithm.
```pseudo
\begin{algorithm}
    \caption{Logistic Regression Foward and Backpropagation} 
    \begin{algorithmic}
      \Procedure{LogisticRegression}{$x, b, w$}
	    \For{$i=1$ to $m$} \Comment{For all test cases $m$}
	    \State $z^{(i)} \gets w^Tx^{(i)}+b$
	    \State $a^{(i)} \gets \sigma(z^{(i)})$
	    \State $J \gets J + -[y^{(i)}\log{a^{i}}+ (1-y^{(i)})\log{(1-a^{i})}] $
	    \State $dz^{(i)} \gets \frac{\partial L}{\partial z} = \frac{\partial L}{\partial a} \frac{\partial a}{\partial z} = a^{(i)}-y^{(i)}$
	    \State $dw_{1}\gets\frac{\partial L}{\partial w_{1}} = \frac{\partial L}{\partial w_{1}} + \frac{\partial L}{\partial a} \frac{\partial a}{\partial z}\frac{\partial z}{\partial w_{1}} = x^{(i)}_1dz^{(i)}$
	     \State $dw_{2} \gets \frac{\partial L}{\partial w_{2}}  = \frac{\partial L}{\partial w_{2}} + \frac{\partial L}{\partial a} \frac{\partial a}{\partial z}\frac{\partial z}{\partial w_{2}} = x^{(i)}_2dz^{(i)}$
	     \State $db \gets \frac{\partial L}{\partial b} = \frac{\partial L}{\partial b} + \frac{\partial L}{\partial a} \frac{\partial a}{\partial z}\frac{\partial z}{\partial b} = dz^{(i)}$
	    \EndFor 
	    
	    \Comment{Divide by $m$ to get average}
	    \State $\partial w_{1} \gets \frac{\partial w_1}{m}$ \Comment{Average for $w_1$}
	    \State $\partial w_{2} \gets \frac{\partial w_2}{m}$ \Comment{Average for $w_2$}
	    \State $\partial b \gets \frac{\partial b}{m}$
	    \State $\partial L \gets \frac{\partial L}{m}$ 
      \EndProcedure
      \end{algorithmic}
    \end{algorithm}
```
Errors 14?
We are using $dw_1$ as the derivate of overall cost function with respect to $w_1$ .
$$
dw_{1}= \frac{\partial J}{\partial w_{1}}
$$
So in order to implement one step of gradient descent.
$$
w_{1} := w_{1}=\alpha dw_1
$$
$$
w_{2}:= w_{2} =\alpha dw_{1}
$$
$$
b := b - \alpha db
$$
If we want to implement multple steps. Then we run this function multiple times

Okay, how would we improve this. Notice how their is essentially two for loops, which isn't very efficient. We can use **vectorization** to speed it up. First let's note the inner loop. In this graph, we only use two features, and thus two weights. What if there are $n$ weights. Then we would require a for loop to loop through all input features. We show generalization below.

![[Pasted image 20230920171041.png | center]]


**Vectorize**
Note that $(4)$ can be used to substitute in $(3)$, to give the loss $L(\hat{y}^{(i)}, y^{(i)}) = \left( y^{i} \log(\hat{y}^{(i​)})+(1−y^{(i​)})\log(1−\hat{y}^{(i​)}\right)$ for the $i$th example. Let's vectorize this cost function over $m$ training examples and get the total cost.
$$ 
J(\vec{w},b) = \frac{1}{m}\sum_{i=1}^{m}L\left(\hat{y}^{(i)} , y^{(i)}\right) = −\frac{1}{m}​ \sum\limits_{i=1}^{m}
{\left( y^{(i)} \log(\hat{y}^{(i​)})+(1−y^{(i​)})\log(1−\hat{y}^{(i​)})\right)}
$$
where 
$$ \hat{y}^{(i)}=a^{(i)}=\sigma(z^{(i)})=\sigma\left(w^{T}x^{(i)}+b\right)
$$
Our goal is to find $\nabla J, \frac{\partial J}{\partial w_{j}}, \frac{\partial J}{\partial b}$

We know that $\frac{\partial J}{\partial a^{(i)}}=a^{(i)} - y^{(i)}$ as calculated above. Thus if we were to generalize and sum over $i$  is.
$$ 
\frac{\partial J}{\partial a} = \frac{1}{m}\sum\limits^{m}_{i=1}{(\hat{y}^{(i)} - y^{(i)})}
$$
Then it's easy to get 
$$
\frac{\partial J}{\partial w_j} = \frac{\partial J}{\partial a}\frac{\partial z}{\partial w_j}= \frac{1}{m}\sum\limits^{m}_{i=1}{(\hat{y}^{(i)} - y^{(i)})}x_{i,j}
$$
where $x_{i,j}$ is the j-th feature of the i-th example. Lets assume each example has $n$ features. So $\frac{\partial J}{\partial w_{j}}$ represents the partial derivative with respect to the j-th weight. The process is similar for $b$.
$$
\frac{\partial J}{\partial b} = \frac{\partial J}{\partial a}\frac{\partial z}{\partial b}= \frac{1}{m}\sum\limits^{m}_{i=1}{(\hat{y}^{(i)} - y^{(i)})}
$$
## Neural Network (Multi-Layer Perceptron)

### Math
Here we discuss the math behind backpropagation for a simple multi-layer perception network (2 layers). Notice, we used vectorized version, with $m$ training examples in one pass. A training example can have $d$ dimensionality, or features. Let's review the basic notation first.
![[Pasted image 20230924155847.png | center | 300]]
The output of the nodes in layer 1 can be reflected as a function $a^{(1)} = \sigma(z^{(1)})$ , where $z^{(1)}$ is
$$ 
z^{(1)} = W^{(1)}X^{(0)}+b
$$
and where the input (or outputs from previous layer) is denoted by $X$
$$ 
X_{n\times m} = \begin{bmatrix} \vdots & \vdots & \vdots & & \vdots \\ x_{1} & x_{2} & x_{3} & \cdots & x_{m} \\ \vdots & \vdots & \vdots & & \vdots\end{bmatrix}
$$
where $x_{m}$ is a single example or test case. Each $x_{i}, \space i=1,2,\dots,m$ has dimension $n \times 1$, where $n$ represents the number of nodes in the **previous** layer, or 3 in this case. In the case of the input layer only, $n$ also represents $d$. The inputs for test case example $i$ would be
$$
i=1,\dots m, \space x_{i}= \begin{bmatrix} x_{1,i}\\ x_{2,i} \\ x_{3,i}\end{bmatrix}_{3\times 1}
$$
If we look at a **single** test case, 
$$ 
\alpha^{(1)} = \sigma(z^{(1)}) = \begin{bmatrix} \sigma(z^{(1)}) \\ \sigma(z^{(2)}) \\ \sigma(z^{(3)}) \\ \sigma(z^{(4)}) \end{bmatrix}_{4\times 1} = w^{(1)T}x^{(1)}=\begin{bmatrix} w_{1,1}& w_{2,1} & w_{3, 1} & w_{4,1} \\ w_{1,2} &  w_{2,2}  & w_{3,2} &  w_{4,2}  \\w_{1,3} &  w_{2,3}  & w_{3,3} &  w_{4,3}\\ \end{bmatrix}_{3\times 4} ^{T}\begin{bmatrix} x_{1}\\ x_{2} \\ x_{3} \end{bmatrix}_{3\times 1}
$$
Notice in $W$, each column represents the weights connected to the same node in the **current** layer. In other terms, $w_{(\text{To}, \text{From})}$ . For example, the output for the first node of the hidden layer is
$$ a_{1}^{(1)} =\sigma(z_{1}^{(1)}),\space z_{1}^{(1)} =w_{1,1}^{(1)}x_{1}^{(0)} + w_{1,2}^{(1)}x_{2}^{(0)} + w_{1,3}^{(1)}x_{3}^{(0)} +b$$
Notice. we would then have to take the transpose for the math to work out correctly. Thus, the vectorized formula can be simplified into
$$ z^{(1)}_{k\times m} = W_{n\times k}^{(1) T} X^{(0)}_{n\times m} + b_{k\times 1}$$
where $k$ is the number of nodes in the new layer. 

**Forward Propagation**
For Layer 1 (Layer after input layer), where Layer 0 has $k$ is number of nodes in new layer and $n$ is number of node in the previous layer.
$$ 
\alpha_0^{(1)}=\sigma(w_{0,0}\alpha_0^{(0)} + w_{0,1}\alpha_1^{(0)} + 
w_{0,2}\alpha_2^{(0)} + 
\cdots +
w_{0,n}\alpha_n^{(0)})
$$
$$ 
\alpha_1^{(1)}=\sigma(w_{1,0}\alpha_0^{(0)} + w_{1,1}\alpha_1^{(0)} + 
w_{1,2}\alpha_2^{(0)} + 
\cdots +
w_{1,n}\alpha_n^{(0)})
$$
$$ 
\alpha_k^{(1)}=\sigma(w_{k,0}\alpha_0^{(0)} + w_{k,1}\alpha_1^{(0)} + 
w_{k,2}\alpha_2^{(0)} + 
\cdots +
w_{k,n}\alpha_n^{(0)})
$$

In terms of matrix
$$
\begin{bmatrix} w_{k,n} \end{bmatrix}_{k \times n}^{(0)} \begin{bmatrix} \alpha_n \end{bmatrix}_{n \times 1}^{(0)} + 
\begin{bmatrix} \beta_k \end{bmatrix}_{k \times 1}^{(0)}= \begin{bmatrix} \alpha_k \end{bmatrix}_{k \times 1}^{(1)} 
$$
**Cost Function**
Remember, the cost function or [[Neural Networks#What are Loss Functions?|loss function]] of deep a model is
- need to consider the average cost over all training examples
- the inputs of the cost function are all the weights + biases and spits out a number describing how bad the weights and biases are.
- the full cost function involves averaging a certain cost-per-example for all terms for all training examples, the way we adjust all the weights and biases for a single step also depends on every single example.

Below, we first explain how to calculate the gradient descent with respect to its input parameters of a simplified model.

**Gradient and Gradient Descent**
The gradient 
$$ \nabla C$$
tells us which direction we should take to increase the cost function most quickly. Thus, the negative of that should give us which direction we should step to *decrease* the function most quickly. The length of gradient vector tells us how steep that slope is.
$$-\nabla C$$
"Gradient descent" is the algorithm for minimizing this function. Take a step downhill and repeat.
$$ 
-\nabla C(\vec{W}) = []_N 
$$
Back propagation is an algorithm for calculating the negative gradient. 

The magnitude of each component of the gradient tells you how sensitive the cost function is to each corresponding weights and bias.

**Updating the Weights and Biases**

**Example**
Let's calculate the Gradient with Backpropagation on an extremely simple network. 
![[Pasted image 20230919175636.png | center ]]
Let's define the final node as $a^{(L)}$ and second to final as $a^{(L-1)}$. The cost function therefore will be defined as
$$ \color{red} C_o \color{black} = (a^{(L)} - \color{orange} y \color{black})^2 $$
Where $\color{orange} y$ is the desired output. Let's define some functions. We already know
$$ a^{(L)} = \sigma(\color{blue} w^{(L)} \color{black} a^{(L-1)}+ \color{pink} b^{(L)} \color{black}) $$
Let's set
$$ \color{green} z^{(L)} = \color{blue} w^{(L)} \color{black} a^{(L-1)}+ \color{pink} b^{(L)} \color{black} $$
Therefore
$$ a^{(L)} = \sigma(\color{green}z^{(L)}\color{black})$$

Let's define $\frac{\color{red} \partial C_o}{\color{blue} \partial w^{(L)}}$. The following formula tells us how a nudge to a *particular weight* in the last layer will effect the cost for that *one particular training example*. 
$$ \frac{\color{red} \partial C_o}{\color{blue} \partial w^{(L)}} = \frac{\color{green} \partial z^{(L)}}{\color{blue} \partial w^{(L)}} \frac{\partial a^{(L)}}{\color{green} \partial z^{(L)}}  \frac{\color{red} \partial C_o}{\partial a^{(L)}} $$
We can calculate 
$$ \frac{\color{red}\partial C}{\color{black} \partial a^{(L)}} = 2(a^{(L)}-y), \space \frac{\color{green} \partial z^{(L)}}{\color{blue} \partial w^{(L)}} = a^{(L-1)}, \space \frac{\partial a^{(L)}}{\color{green} \partial z^{(L)}} = \sigma'\left(z^{(L)}\right) $$

The gradient for the bias is
$$ \frac{\color{red} \partial C_o}{\color{pink} \partial b^{(L)}} = \frac{\color{green} \partial z^{(L)}}{\color{pink} \partial b^{(L)}} \frac{\partial a^{(L)}}{\color{green} \partial z^{(L)}}  \frac{\color{red} \partial C_o}{\partial a^{(L)}} $$
and if we simplify it, it equals 1.



The full cost function for the network is 
$$ \color{red} C \color{black} = \frac{1}{n} \sum_{k=0}^{n-1}{\color{red} C_k}$$
where $n$ is the number of training examples. Thus, with some matrix multiplication, the above equations work on updating all weights and biases in the last layer.

***But this is just the last layer***, how would we update the weights for the previous layers? Well, if you notice how $a$ is defined
$$ a = $$

Let's summarize this process.
![[Pasted image 20230921124604.png | center ]]
```pseudo
    \begin{algorithm}
    \caption{DeepLearning}
    \begin{algorithmic}
	\Input{$a^{[l-1]}$}
	\Output{$a^{[l]}, \text{cache}\left(z^{[l]}\right)$}
      \Procedure{Forward}{} \comment{for Layer l}
        \State $z^{[l]} \gets w^{[l]}a^{[l-1]} + b^{[l]}$
        \State $l \gets g^{[l]}\left(z^{[l]}\right)$
      \EndProcedure
      \Input{$da^{[l]}$}
      \Output{$da^{[l-1]}, dW^{[L]}, db^{[l]}$}
      \Procedure{Backword}{}
        \State $dz^{[l]} \gets da^{[l]}*g^{[L]'}\left(z^{[l]}\right)$ \comment{element wise product}
        \State $dw^{[l]} \gets dz^{[L]}\cdot a^{[l-1]T}$
        \State $db^{[l]} \gets dz^{[l]}$
        \State $da^{[l-1]} = w^{[l]T} \cdot dz^{[l]}$
      \EndProcedure
      \end{algorithmic}
    \end{algorithm}
```
If vectorized, we can use $A$ instead of $a$, $Z$ instead of $z$, $W$ instead of $w$.

### MLP From Scratch
Here we discuss how a MLP implemented in scratch, with simply `numpy`. First, let's visualize our simple neural network with one node in the hidden layer.
![[Pasted image 20231102103616.png | center ]]
Let's mathematically define our neural network.
- We define input $X=\begin{bmatrix} x_{1}, x_{2}, \dots, x_{m}\end{bmatrix}$
- We define weights $W=\begin{bmatrix}w_{1}, w_{2}, \dots, w_{m}\end{bmatrix}$
- We define the activation function $\sigma$ to be the ReLU function.
- We define the output of the hidden layer before the activation to be  $z = (W^{T}X + b)$ 
- We define the output of the hidden layer after the activation to be $h=ReLU(z)$
- We define the output be layer $\hat{y} = h$ 
- We define the loss function to be the mean squared error $L = \frac{1}{m} \sum\limits^{m}_{i=1}{\left(y^{(i)} - \hat{y}^{(i)} \right)^2}$ , where $i$ is the specific test case. 

Before building or model, let's calculate our gradients.
$$
\frac{\partial J}{\partial \hat{y}}=\frac{2}{m}\sum\limits^{m}_{i=1} \left(\hat{y}^{(i)} - y^{(i)}\right) \tag{1}
$$
$$  
\frac{\partial J}{\partial z}=\frac{\partial J}{\partial \hat{y}}\frac{\partial \hat{y}}{\partial h}\frac{\partial h}{\partial z}= \frac{\partial J}{\partial \hat{y}}(1)(\text{ReLU'(z)}) \tag{2} 
$$
$$ 
\frac{\partial J}{\partial W}=\frac{\partial J}{\partial \hat{y}}\frac{\partial \hat{y}}{\partial h}\frac{\partial h}{\partial z}\frac{\partial z}{\partial W} = \frac{\partial J}{\partial z}(X) \tag{3}
$$
$$ 
\frac{\partial J}{\partial W}=\frac{\partial J}{\partial \hat{y}}\frac{\partial \hat{y}}{\partial h}\frac{\partial h}{\partial z}\frac{\partial z}{\partial b} = \frac{\partial J}{\partial z} \tag{4}
$$
Where the gradient of $\text{ReLU}$ is $$\begin{cases} 1 & \text{if } x > 0 \\0  & \text{if } x \leq 0\end{cases}$$Let's now define our model.


And that's a MLP network!

**Remark:** Here, we try to generalize the math behind the `np.sum` in `db1, dW1` to a MLP network with multiple hidden neurons and multiple outputs, but still one layer. Notice that the gradient with respect to `db1` is a summation, so that's why we perform `np.sum`. What about the summation for `dW1`? Well, we know that
$$ \frac{\partial J}{\partial W} = \frac{2}{m}\sum\limits^{m}_{i=1} \left(\hat{y}^{(i)} - y^{(i)}\right)(1)(\text{ReLU(z))}(X)$$
Let's break down this formula. We first define $X$ and $W$ as
$$X_{(k,m)} = \begin{bmatrix} x_{1, 1}  & x_{1,2} & \cdots & x_{1, m} \\ x_{2, 1}  & x_{2,2} & \cdots & x_{3, m} \\ \vdots & \vdots  & \ddots & \vdots \\ x_{k, 1} & x_{k,2} & \cdots  & x_{k, m}\end{bmatrix}, W_{(n,k)} = 
\begin{bmatrix}
    w_{1,1} & w_{1,2} & \cdots & w_{1,k} \\
    w_{2,1} & w_{2,2} & \cdots & w_{2,k} \\
    \vdots & \vdots & \ddots & \vdots \\
    w_{n,1} & w_{n,2} & \cdots & w_{n,k}
\end{bmatrix}
$$
Where $k$ is the number of features for each test case and $n$ is the number of nodes in the hidden layer. Then we get $Z$ as $Z=WX+b$, this gives us a $(n,m)$ matrix. Note that $b$ is a $(n,1)$ matrix. This means that $H=\text{ReLU'}(Z)$ also a $(n,m)$ matrix. But, we can ignore this in calculations below because it has the same shape as our output. Essentially, equation $(2)$ shown above has a shape of $(n,m)$ as well.

$y$ or the ground truth is a matrix with $n\times m$ matrix, where $n$ is the number of outputs (output layer) . Thus, we can represent $\hat{y}-y$ as 
$$ (\hat{y}-y)_{(n, m)} = \begin{bmatrix} (\hat{y}^{1}_{1}-y^{1}_{1}) & (\hat{y}^{2}_{1}-y^{2}_{1}) & \cdots & (\hat{y}^{m}_{1}-y^{m}_{1}) \\ (\hat{y}^{1}_{2}-y^{1}_{2}) & (\hat{y}^{2}_{2}-y^{2}_{2}) & \cdots & (\hat{y}^{m}_{2}-y^{m}_{2}) \\ \vdots & \vdots & \ddots& \vdots \\ (\hat{y}^{1}_{n}-y^{1}_{n}) & (\hat{y}^{2}_{n}-y^{2}_{n}) & \cdots & (\hat{y}^{m}_{n}-y^{m}_{n})\end{bmatrix}$$
Note that $\hat{y}^{i}$ does not mean to the power of, but the test case. Note that the gradient with respect to $W$ has to result in the same shape of $W$, so we can update every weight in the first layer. We perform basic matrix multiplication, reflected by `np.dot`. 
$$
\frac{\partial J}{\partial W}_{(n, k)} = \frac{2}{m}\begin{bmatrix} \rowcolor{lightblue}(\hat{y}^{1}_{1}-y^{1}_{1}) & (\hat{y}^{2}_{1}-y^{2}_{1}) & \cdots & (\hat{y}^{m}_{1}-y^{m}_{1}) \\ (\hat{y}^{1}_{2}-y^{1}_{2}) & (\hat{y}^{2}_{2}-y^{2}_{2}) & \cdots & (\hat{y}^{m}_{2}-y^{m}_{2}) \\ \vdots & \vdots & \ddots& \vdots \\ (\hat{y}^{1}_{n}-y^{1}_{n}) & (\hat{y}^{2}_{n}-y^{2}_{n}) & \cdots & (\hat{y}^{m}_{n}-y^{m}_{n})\end{bmatrix}\begin{bmatrix}\columncolor{lightblue}
x_{1, 1} & \columncolor{lightgreen} x_{1, 2} & \cdots & x_{1, k} \\ 
x_{2, 1} & x_{2, 2} & \cdots & x_{2, k} \\
\vdots & \vdots & \ddots & \vdots \\
x_{m, 1} & x_{m, 2} & \cdots & x_{m, k}
\end{bmatrix}
$$
which gives us 
$$ \frac{\partial J}{\partial W}_{(n, k)} \frac{1}{m} \begin{bmatrix} \cellcolor{lightblue} x_{1,1}(\hat{y}^{1}_{1}-y^{1}_{1}) + x_{2,1}(\hat{y}^{2}_{1}-y^{2}_{1}) + \cdots + x_{m,1}  (\hat{y}^{m}_{1}-y^{m}_{1}) & \cellcolor{lightgreen}  \sum\limits^{m}_{i=1}{x_{i,2}\left(\hat{y}^{(i)}_{2} - y^{(i)}_{2}\right)} & \cdots \end{bmatrix}$$
Certainly, here is the transpose of the matrix without row coloring, with switched row and column indexes:
$$ \sum\limits^{m}_{i=1}{x_{i,1}\left(\hat{y}^{(i)}_{1} - y^{(i)}_{1}\right)}$$

