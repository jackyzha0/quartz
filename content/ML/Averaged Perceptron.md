---
title: "Averaged Perceptron"
tag: ml
date: 
alias:
---

- Regular [[Perceptron]] is sensitive to extreme examples
- Averaged perceptron produces a more stable output by outputting the average $\theta$ and $\theta_0$ across all iterations

```python
def averaged_perceptron(data, labels, params={}, hook=None):
    # if T not in params, default to 100
    T = params.get('T', 100)

    # Your implementation here
    d = data.shape[0]
    n = data.shape[1]

    th = np.zeros((d, 1))
    ths = np.zeros((d, 1))
    th0 = np.zeros(1)
    th0s = np.zeros(1)

    for t in range(T):
        for i in range(n):
            x_i = data[:,i]
            y_i = labels[0,i]
            #print(x_i, y_i)

            if y_i*(np.dot(x_i,th) + th0) <= 0:
                th[:,0] = th[:,0] + y_i*x_i
                th0 = th0 + y_i
            
            ths = ths + th
            th0s = th0s + th0

    return ths/(n*T), th0s/(n*T)
```

