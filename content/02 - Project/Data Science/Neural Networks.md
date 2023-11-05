---
creation_date: 2023年08月12日
banner: "https://images.unsplash.com/photo-1545987796-200677ee1011"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Neural Networks
## 01 Background
**Sources**
1. [Neural Network Playground](https://playground.tensorflow.org/#activation=tanh&batchSize=10&dataset=circle&regDataset=reg-plane&learningRate=0.03&regularizationRate=0&noise=0&networkShape=4,2&seed=0.54266&showTestData=false&discretize=false&percTrainData=50&x=true&y=true&xTimesY=false&xSquared=false&ySquared=false&cosX=false&sinX=false&cosY=false&sinY=false&collectStats=false&problem=classification&initZero=false&hideText=false)
2. [Mathematics of Back-propagation](https://www.3blue1brown.com/lessons/neural-networks) by 3blue1brown. The youtube version can be found [here](https://www.youtube.com/watch?v=tIeHLnjs5U8). It is the recommended go-to video by [PyTorch](https://pytorch.org/tutorials/beginner/basics/optimization_tutorial.html) documentation! Notes about it can be found here at [[Backpropagation]]
3. [Tools to Design or Visualize Architecture of Neural Network](https://github.com/ashishpatel26/Tools-to-Design-or-Visualize-Architecture-of-Neural-Network)

#TODO
- 🖊 Summarize: How to deal with overfitting? How to deal with under-fitting?
- ❓What is transfer learning?
- ❓What is dropout?
- ❓What is FLOPS?
- ❓Initialization Methods?
## 02 神经网络类型 Neural Network Types
### Mind Map of Neural Networks
![[Pasted image 20231012212658.png | center ]]
### Indexing Neural Network Notes
- [[Convolutional Neural Network]]
- [[Recurrent Neural Network]]
- [[Transformers]]
## 03 核心技术 Core Concepts Neural Network
### What is a Neural Network?
Here we introduce the most basic neural network, a simple feed forward neural network. 
**Remark:** Review [[Backpropagation|backpropagation]]. 
### What are hyper-parameters? 
They are values that we (as machine learning engineers and data scientists) can tune to improve the performance of the neural network. This is different from parameters of a model learned by gradient descent. Hyper-parameters include:
- Structure: # of hidden layers, hidden layer size, 
- learning rate - adaptive learning rate
- Iterations (Epochs)
- Activation Functions: (1) Softmax (2) Relu (3) Sigmoid (4) Tanh
- Momentum Term
- Batch / Mini-Batch Size
- Regularization 
- Standardization / Normalization
- Optimizers (speed up training)
	- Gradient Descent
		- Batch Gradient Descent 
		- Stochastic Gradient Descent (SGD)
		- Gradient Descent with Momentum
		- Iterative Gradient Descent
		- Online Gradient Descent
	- Exponentially Weighted Averages (Computationally cheaper than Gradient Descent, More memory efficient), with Bias Correction
	- Root Mean Square Prop (RMSprop)
	- Adam Optimization = Momentum + RMSprop
### What are Loss Functions?
[[Loss Functions]]
### What are Activation Functions?
[[Activation Functions]]
##### What is Standardization (normalization)? 
A normalization method that helps gradient descent learning to converge more quickly (optimizes the cost function), however, it does not make the original dataset normally distributed. Standardization shifts the mean of each feature so that it is centered at zero and each feature has a standard deviation of 1.
- *Why does it help?* This helps when features are on totally different scales. 
##### What are vanishing/exploding gradients?
When training a deep neural network, gradients can become very big or very small.
- A partial solution is to consider weight initializing. This may help (1) speed up the convergence of gradient descent (2) increase the odds of gradient descent converging to a lower training (and generalization) error.


##### What is Regularization in Neural Networks?
- Aims to solve overfitting, high variance problem. 
- 
- Regularization Methods
	- L1 Regularization
	- L2 Regularization or "Weight Decay", more used than 
	- Dropout Regularization
		- Inverted Dropout
	- Weight Initialization Methods
		- Xavier Initialization
		- He Initialization

Regularization parameter: $\lambda$

*How does it prevent overfitting?* Penalizes high weights by reducing a lot of hidden units. 
- Has the effect of simplifying a network, smaller network, which is less prone to overfitting.

*What is L2 Regularization?*
#TODO
##### What is Dropout? 
***Why does dropout work?***
- Can't rely on any one feature, becomes less sensitive to the activation of *one* other specific neuron, because that other neuron might shut down at any time.
- Harder to define cost function
- First introduced in CNN, not necessary good for all applications
- Dropout should only be used during training. Don't use dropout during test time.
- It should be applied to both forward and backward propagation.
##### What is Mini-batch Gradient Descent?
Batch gradient descent: Processing all training examples at the same time. Let's say we have a training set 
$$ x_{(n,m)} = \begin{bmatrix} x^{(1)} & x^{(2)} & \cdots & x^{(m)}\end{bmatrix}$$
Where $m$ is 5,000,000. In gradient descent, we would run through all 5,000,000 for each step of a gradient descent. This is computational expensive and slow. Instead, can split up into "mini-batches", perhaps, batches of size 1,000.

$$ x_{(n,m)} = \underbrace{\begin{bmatrix} x^{(1)} & x^{(2)} & \cdots & x^{(1000)}\end{bmatrix}}_{x^{\{1\}}_{(n, 1000)}} | \underbrace{\begin{bmatrix} x^{(1001)} & x^{(1002)} & \cdots & x^{(2000)}\end{bmatrix}}_{x^{\{2\}}}| \cdots \underbrace{\begin{bmatrix}\cdots & x^{(m)}\end{bmatrix}}_{x^{\{m\}}}  $$

$$ y_{(1,m)} = \underbrace{\begin{bmatrix} y^{(1)} & y^{(2)} & \cdots & y^{(1000)}\end{bmatrix}}_{y^{\{1\}}} | \underbrace{\begin{bmatrix} y^{(1001)} & y^{(1002)} & \cdots & y^{(2000)}\end{bmatrix}}_{y^{\{2\}}}| \cdots \underbrace{\begin{bmatrix}\cdots & y^{(m)}\end{bmatrix}}_{y^{\{m\}}}  $$
We use the superscript {} to denote mini batch numbers. Now we can take 1 step of gradient descent using $x^{\{t\}}, y^{\{t\}}$. Basically, we preform forward propagation $\text{for} \space t=1,\cdots, 5000$ or each mini batch. Is also known as one **epoch** or a single pass through the training set. 
- In Batch gradient descent, one epoch could only take one gradient descent step, in mini batch, now can take multiple.
- Mini-batch gradient descent is more noisy (cost does not decrease every mini-batch), while Batch always decreases every iteration.

How to select mini-batch size?
- If mini-batch size is $m$, **batch gradient descent** -> takes too long per iteration
- If mini-batch size is 1, **stochastic gradient descent** -> lose all speed-up from vectorization, processing only a single example at a time.
- In practice, somewhere in between 1 and $m$, size typically in powers of 2

##### What is Exponentially Weighted Averages?
#TODO Review the math behind exponential weighted average and how it works.
##### What is Gradient Descent with Momentum?
A step to improve gradient descent algorithm. Let's take the example below.
![[Pasted image 20231009230838.png | center | 500 ]]
The $\color{blue} \text{blue line}$ gradient descent is taking too many steps, oscillating slowly toward the minimum. The $\color{purple} \text{purple line}$ is using a large learning rate, but may overshoot. Through GD with momentum, we can take large steps in the correct direction, as shown by the $\color{red} \text{red line}$. 

> Because mini-batch gradient descent makes a parameter update after seeing just a subset of examples, the direction of the update has some variance, and so the path taken by mini-batch gradient descent will "oscillate" toward convergence. Using momentum can reduce these oscillations.
> Momentum takes into account the past gradients to smooth out the update. The 'direction' of the previous gradients is stored in the variable 𝑣. Formally, this will be the **exponentially weighted average** of the gradient on previous steps. You can also think of 𝑣. as the "velocity" of a ball rolling downhill, building up speed (and momentum) according to the direction of the gradient/slope of the hill.


![[Pasted image 20231010131820.png | center | 300 ]]

Aim's to help smooth out gradient descent through moving average. 
> Allows the search to build inertia in a direction in the search space and overcome the oscillations of noisy gradients and coast across flat spots of a search space.

##### What is RMSprop?
Damp out the directions in which there are oscillations.

On iteration t:
	Compute $dW, \space db$ on current mini-batch
	$S_{dw}=\beta S_{dW}+(1-\beta)\color{purple}dW^2$ 
	$S_{db}=\beta S_{dW} + (1-\beta)db^2$ 
	$W \gets W-\alpha \frac{dW}{\sqrt{S_{dw}}}$
	$b \gets b - \alpha \frac{db}{\sqrt{S_{db}}}$   

The $\color{purple} dW^{2}$ is element-wise squaring operation. Keeping an exponential weighted average of the squares of the derivatives. The same for $S_{db}$. 

##### What is Adam Optimization Algorithm? 
Stands for Adaptive moment estimation. It is a combination of **Momentum** and **RMSprop** techniques that works for various architectures.
![[Pasted image 20231010131231.png | center | 500]]
dw -> moment, dw^2 -> second moment
![[Pasted image 20231010131314.png | center | 300]]

***Tips***
- Relatively low memory requirements (though higher than GD and GD with M)
- Usually works well even with the little tuning of hyper parameters

##### What is Learning Rate Decay?
Slowly reduce learning rate over number epochs. Intuition is to take large steps in the beginning and small steps when approaching convergence. Helps speed up training!

The formula for learning rate decay $\alpha$ is 
$$ \alpha = \frac{1}{1 + \text{decayRate} \times \text{epochNumber}}\alpha_0$$
Other formulas include
- Exponential Decay:  $\alpha = 0.95^{\text{epochNumber}} \alpha_0$
- Fixed Interval Scheduling
- Manual Decay

Usually not the first thing to tune. Declaring a good $\alpha$ is usually enough.

##### What is Batch Normalization?
This was introduced in [Sergey loffe et al. 2015, Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/abs/1502.03167)

Previously in **normalization**, we see how normalizing input features can help learning. Batch normalization applies the same process to values even deep in the hidden layers. 

Normalizing Activations

![[Pasted image 20231010194723.png | center  ]]

Normalizing $z^{[2]}$ is much more common in practice (rather than $a^{[2]}$)

***How does it work?***
Adding batch norm to a network
![[Pasted image 20231010195848.png | center ]]
Batch norm is usually applied with mini-batches of the training set.

#TODO Discuss the two learnable parameters $\lambda$ and $\beta$. Quick remark (1) Scaling parameter (γ): A learnable scaling factor that allows the network to scale the normalized values. (2) Shifting parameter (β): A learnable bias term that allows the network to shift the normalized values. These two parameters, γ and β, are used to adjust the mean and variance of the normalized values, effectively allowing the network to learn the optimal scaling and shifting for each feature.

#TODO Review the math

- $l$ is for a specific layer
- $m$ is the number of training examples of a specific mini-batch
$$ \mu = \frac{1}{m} \sum\limits z^{[l](i)} \tag{1}$$
$$ \sigma^{2}= \frac{1}{m} (z^{[l](i)}- \mu)^{2}\tag{2}$$
$$z^{[l](i)}_{\text{norm}} = \frac{z^{[l](i)}-\mu}{\sqrt{\sigma^{2}+ \epsilon}} \tag{3}$$
$$ \tilde{z}^{[l](i) = \gamma z^{[l](i)}_{\text{norm}} + \beta} \tag{4}$$
***Why does it work?***
Reviewing **covariant shift**: when the changing of data distribution forces you to retrain your learning algorithm even if the ground true function remains the same. 
- For example, in a broad sense, in a cats vs not cats classifier, a model that was previously only trained on images with black cats, it would fail when applying to images of cats with different colors. Although the ground truth function (cats vs not cats classifier) remains the same, the distribution of data changes.

Take the following NN.
![[Pasted image 20231010204122.png | center |300 ]]
Let's look at it with the perspective of the third hidden layer. If we "cover up" the layers/nodes on the left. It gets some values 
![[Pasted image 20231010204831.png |center | 400 ]]
However, to the third hidden layer. These might as well just be features. Thus, batch normalization reduces the amount that the distribution that these values from the previous hidden layers changes.  

It limits the amount to which updating the parameters in the earlier layers can affect the distribution of values that the third layer now sees.

And so, batch norm reduces the problem of the input values changing, it really causes these values to become more stable, so that the later layers of the neural network has more firm ground to stand on. And even though the input distribution changes a bit, it changes less, and what this does is, even as the earlier layers keep learning, the amounts that this forces the later layers to adapt to as early as layer changes is reduced or if you will, it weakens the coupling between what the early layers parameters has to do and what the later layers parameters have to do. And so it allows each layer of the network to learn by itself, a little bit more independently of other layers, and this has the effect of speeding up of learning in the whole network.

It also has a (unintended) **regularization** effect.
- Batch normalization is applied to each mini-batch. So each mini-batch is scaled by the mean/variance computed on just mini-batch (which is noisy). This scaling process (from $z^{[l]}  \rightarrow \tilde{z}^{[l]}$) also adds some noise to the values $z^{[l]}$ within that mini-batch. Similar to **dropout** (which uses multiplicative noise), it adds some noise (additive and subtractive noise) to each hidden layer's activations.
- This forces downstream units not to rely on any one units.
- However, it is quite small if used alone. It's not intended to be used as regularization.

***How to use it at Test Time?***
The problem is that $\mu$ and $\sigma^2$ is based on mini-batch (refer to $m$ in equation 1, 2). In testing, we don't have the concept of mini-batches. So we need a new way of keeping track of $\mu$ and $\sigma^2$ .

We can use exponentially weighted averages for those parameters, or keep track of moving average across mini-batches. And use that on the one test example.

***Tips***
- In programming frameworks, this is often implemented for you. 
- It makes weights in deeper in the NN more robust to changes to weights in earlier layers of the NN.
- Helps speeding up learning. 
##### What are auto-encoders? 








### How to Iteratively Tune your Model?
There are so many hyper-parameters! How do we choose to solve either the **under-fitting** or **overfitting problems**?
***Tuning Process?***
- ❗Learning rate $\alpha$ is the most important.
- Then momentum, batch size, hidden units.
- Then number of layers, learning rate decay.
- Lastly, Adam algorithm tuning $\beta_{1}, \beta_{2}\beta_{3}$ is rarely ever tuned
***Scales for hyperparameters***
- It is bad to strictly sample on a **linear scale**
***In Practice***
- Babysitting one model (when you have limited computational resources)
- Training many models in parallel 

❗ Grid-search over the hyper-parameters

**Remark:** It is just as important to see how others have improved their models!
- https://pytorch.org/blog/how-to-train-state-of-the-art-models-using-torchvision-latest-primitives/

#### How to solve Under-fitting Problem?
Here, we summarize the general ways to improve neural networks. It is important to note that these may not always work. It is important to study recent advances in [[Convolutional Neural Network]], [[Recurrent Neural Network]], [[Transformers]], etc to learn about more application specific solutions. Some of these are generalizable to [[Machine Learning]] algorithms (excluding NN's). 

| Improvement Technique | What does it do? | Downsides |
| --------------------- | ---------------- | --------- |
| Add more layers       |                  |           |
| Add more hidden units |                  |           |
| More Epochs           |                  |           |
| Reduce Regularization |                  |           |
|                       |                  |           |

#### How to solve Over-fitting Problem?
| Improvement Technique | What does it do? | Downsides |
| --------------------- | ---------------- | --------- |
|                       |                  |           |