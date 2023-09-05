---
title: "perceptron"
aliases: 
tags: AI
---

alternate method of classification to [[bayesian-reasoning]] that works better for image data.

It is based on a biological neuron, which are connected in networks and give humans the ability to think. The *synapses* control how well the signal travels to other neurons, and they are able to change. This is how we learn, and change how we respond to stimuli. We refer to these as weights as they change the strength of the connection.
![|400](https://i.imgur.com/8q94693.png)

At the beginning of AI this model was used and a base for a function. E.g., the McCulloch-Pitts unit. It is a simplified model of a neuron, but it captures the essence. 

Each unit has a bias and many inputs, and each input has an associated weight. The inputs are multiplied by the weights, and summed. The *activation function* defines a threshold for when the neuron should fire, based on the weighted sum of inputs. 
![|400](https://i.imgur.com/ZVqcxBm.png)

## Geometric interpretation
Geometrically speaking, a single-neuron perceptron splits an input space into two regions. In one region the perceptron outputs 1, for the other region the perceptron outputs 0. If bias is 0, the splits is always through the origin.

![|300](https://i.imgur.com/Or2zipS.png)![|300](https://i.imgur.com/Atap3J6.png)

## Learning Rule
given a set of training data pairs $(x,y)$, where $x \in R^d$ and $y in {0,1}$, and assuming a small value learning parameter $0\lt \alpha \lt 1$

create a perceptron with a weight vector $w$ and $b$ initialised to random values
do
	compute the perceptron output for given input x using the activation function
	evalutate the error in the output as $e = y - \hat{y}$
	update the weights and the bias
		$w_i := w_i + \alpha e x_i, \forall i = 1 ,...,d$
		$b := b + \alpha e$
while $e$ is not zero for all $(x,y)$


### Conditions
- Learning parameter must be small enough
- Data must be *linearly separable*

## Training regimes

the $\alpha$ parameter controls the *learning rate* . The larger the rate the faster, the learning, but potentally unstable.

A set of updates to after exposure to the dataset is referred to as the training *epoch*.

### Online learning
One update per training sample, $N$ updates per epoch

### Batch learning
Average updates from all training samples, One update per epoch

### Mini-batch
Divide data into fixed size batches, averaging updates over mini-batch and shuffling the data assignment to mini-batches between the epochs.

## Multi-class classification
For multi-class problems with $K$ classes we can use $K$ neurons and train each to separate one class from all others.

![|300](https://i.imgur.com/eB6G7hk.png)
![|300](https://i.imgur.com/7fqB8dH.png)
