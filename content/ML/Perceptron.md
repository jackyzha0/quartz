---
title: "Perceptron"
tag: ml
date: 
alias:
---

One of the most basic of ML algorithms - but it has a cool name!

Method for learning a linear classifier: $h(x; \theta, \theta_{0})= \text{sign}(\theta^T + \theta_0)$
- Can also be used to learn non-linear classifiers through methods like [[Polynomial Basis]]

The basic idea is:
- If a prediction is correct (sign is positive), make no changes
- If a prediction is incorrect (negative), edit $\theta$ and $\theta_0$

![[perceptron.pdf]]

Python implementation:
```python
def perceptron(data, labels, params={}, hook=None):
    # if T not in params, default to 100
    T = params.get('T', 100)

    # Your implementation here
    d, n = data.shape
    th = np.zeros((d, 1))
    th0 = np.zeros((1,1))

    for t in range(T):
        for i in range(n):
            x_i = data[:,i]
            y_i = labels[0,i]

            a = np.dot(x_i,th) + th0
            positive = np.sign(y_i*a)

            if positive <= 0:
                th[:,0] = th[:,0] + y_i*x_i
                th0 = th0 + y_i
                
    return th, th0
```

Variation: [[Averaged Perceptron]]

In a more general form, we can also 