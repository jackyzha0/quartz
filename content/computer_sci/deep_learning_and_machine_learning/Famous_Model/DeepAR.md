---
title: DeepAR - Time Series Forcasting
tags:
- deep-learning
- model
- time-series-dealing
---

DeepAR, an autoregressive recurrent network developed by Amazon, is the first model that could natively work on multiple time-series. It's a milestone in time-series community.

# What is DeepAR

> [!quote] 
>  DeepAR is the first successful model to combine Deep Learning with traditional Probabilistic Forecasting.

* **Multiple time-series support**
* **Extra covariates**: *DeepAR* allows extra features, covariates. It is very important for me when I learn *DeepAR*, because in my task, I have corresponding feature for each time series.
* **Probabilistic output**:  Instead of making a single prediction, the model leverages [**quantile loss**](computer_sci/deep_learning_and_machine_learning/Trick/quantile_loss.md) to output prediction intervals.
* **“Cold” forecasting:** By learning from thousands of time-series that potentially share a few similarities, _DeepAR_ can provide forecasts for time-series that have little or no history at all.

# Block used in DeepAR

* [LSTM](computer_sci/deep_learning_and_machine_learning/deep_learning/LSTM.md)

# *DeepAR* Architecture

DeepAR模型并不直接使用LSTMs去计算prediction，而是去估计Gaussian likelihood function的参数，即$\theta=(\mu,\sigma)$，估计Gaussian likelihood function的mean和standard deviation。

## Training Step-by-Step

![](computer_sci/deep_learning_and_machine_learning/Famous_Model/attachments/Pasted%20image%2020230523134255.png)

假设目前我们在time-series $i$ 的 t 时刻，

1. LSTM cell会输入covariates $x_{i,t}$，即$x_i$在t时刻的值，还有上一时刻的target variable，$z_{i,t-1}$，LSTM还需要输入上一时刻的隐藏状态$h_{i,t-1}$
2. LSTM紧接着就会输出当前的hidden state $h_{i,t}$，会输入到下一步中
3. Gaussian likelihood function里的parameter，$\mu$和$\sigma$会从$h_{i,t}$中不直接计算出，计算细节在后面

> [!quote] 
> 换言之，这个模型是为了得到最好的$\mu$和$\sigma$去构建gaussian distribution，让预测更接近$z_{i,t}$；同时，因为*DeepAR*每次都是train and predicts a single data point，所以这个模型也被称为autoregressive模型


## Inference Step-by-Step


![](computer_sci/deep_learning_and_machine_learning/Famous_Model/attachments/Pasted%20image%2020230523141219.png)


在使用model进行预测的时候，某一改变的就是使用预测值$\hat{z}$ 代替真实值$z$，同时$\hat{z}_{i,t}$是在我们模型学习到的Gaussian distribution里sample得到的，而这个Gaussian distribution里的参数$\mu$和$\sigma$并不是model直接学习到的，*DeepAR*如何做到这一点的呢？

# Gaussian Likelihood

$$
\ell_G(z|\mu,\sigma) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp{(-\frac{(z-\mu)^2)}{2\sigma^2}}
$$

Estimate gaussian distribution的任务一般会被转化成maximize gaussian log-likelihood function的任务，即**MLEformulas**(maximum log-likelihood estimators)
**Gaussian log-likelihood function**:

$$
\mathcal{L} = \sum_{i=1}^{N}\sum_{t=t_o}^{T} \log{\ell(z_{i,t}|\theta(h_{i,t}))}
$$


# Parameter estimation in *DeepAR*


在统计学中，预估Gaussian Distribution一般使用MLEformulas，但是在*DeepAR*中，并不这么去做，而是使用两个dense layer去做预估，如下图：

![](computer_sci/deep_learning_and_machine_learning/Famous_Model/attachments/Pasted%20image%2020230523151201.png)

使用dense layer的方式去预估Gaussian distribution的原因在于，可以使用backpropagation


# Reference

* [https://towardsdatascience.com/deepar-mastering-time-series-forecasting-with-deep-learning-bc717771ce85](https://towardsdatascience.com/deepar-mastering-time-series-forecasting-with-deep-learning-bc717771ce85)