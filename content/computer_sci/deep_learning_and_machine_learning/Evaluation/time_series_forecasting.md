---
title: Model Evaluation in Time Series Forecasting
tags:
- deep-learning
- evaluation
- time-series-dealing
---

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230526162839.png)

# Some famous time series scoring technics

1.  **MAE, RMSE and AIC**
2.  **Mean Forecast Accuracy**
3.  **Warning: The time series model EVALUATION TRAP!**
4.  **RdR Score Benchmark**

## MAE, RMSE, AIC

MAE means **Mean Absolute Error (MAE)** and RMSE means **Root Mean Squared Error (RMSE)**.

这是两个衡量 continuous variables的accuracy的著名指标，MAE在以前的文章中被时常使用，16年的观察已经发现RMSE或者其他version的R-squared逐渐被使用起来

*我们需要了解何时使用哪种指标会更好*

### MAE

$$
\text{MAE} = \frac{1}{n}\sum_{j=1}^n |y_j - \hat{y}_j|
$$
MAE的特点在于所有individual difference有着equal weight

如果将绝对值去掉，MAE会变成**Mean Bias Error (MBE)**，使用MBE时，要注意正反bias相互抵消

### RMSE

$$
\text{RMSE} = \sqrt{\frac{1}{n} \sum_{j=1}^n (y_j - \hat{y}_j)^2}
$$

均方根误差（RMSE）是一种二次评分规则，它还测量误差的平均幅度。它是预测值和实际观测值之间差异的平方的平均值的平方根。

### AIC

$$
\text{AIC} = 2k - 2\ln{(\hat{L})}
$$
$k$是模型参数的估计，$\hat{L}$是模型似然函数(likelihood function)的最大化值

**Akaike information criterion**，赤池信息准则（AIC）是一个有助于比较模型的指标，因为它同时考虑了模型对数据的拟合程度和模型的复杂性。
  
AIC衡量信息的损失并**对模型的复杂性进行惩罚**。它是*参数数量惩罚后的负对数似然函数*。AIC的主要思想是模型参数越少越好。**AIC允许您测试模型在不过拟合数据集的情况下拟合数据的程度**

### Comparison

#### Similarities between MAE and RMSE

均方误差（MAE）和均方根误差（RMSE）都以感兴趣变量的单位来表示平均模型预测误差。这两个指标都可以在0到∞的范围内变化，并且对误差的方向不敏感。它们是负向评分指标，也就是说数值越低越好。

#### Differences between MAE and RMSE

*由于误差在求平均之前被平方，RMSE对大误差给予相对较高的权重*。这意味着在特别不希望出现大误差的情况下，RMSE应该更有用；而在MAE的平均值中，这些大误差将被稀释，

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230526161422.png)

AIC the lower is better，但没有perfect score，只能用来相同dataset下不同model的性能

## Mean Forecast Accuracy

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230526162035.png)

计算每个点的Forecast Accuracy，然后求平均，得到 Mean Forecast Accuracy

Mean Forecast Accuracy的重大缺陷在大的偏离值造成巨大的负面影响，比如$1 - \frac{|\hat{y}_j - y_j|}{y_j} = 1 - \frac{250-25}{25} = -800\%$

解决方案是将Forecast Accuracy的最小值限制为0%，同时可以使用Median代替Mean。

一般来说，**当你的误差分布偏斜时，你应该使用 Median 而不是 Mean**。 在某些情况下，Mean Forecast Accuray也可能毫无意义。 如果你还记得你的统计数据； 变异系数 (**coefficient of variation**, CV) 表示标准偏差与平均值的比率（$\text{CV} = (\text{Standard Deviation}/\text{Mean} * 100)$）。 大 CV 值意味着大变异性，这也意味着围绕均值的离差程度更大。 **例如，我们可以将 CV 高于 0.7 的任何事物视为高度可变且不可真正预测的。 另外，还可以说明你的预测模型预测能力很不稳定！** 

## RdR Score Benchmark (这是一个具有实验性的指标，blogger指出这个指标并没有在research paper出现过)

RdR metric stands for:
* *R*: **Naïve Random Walk**
* *d*: **Dynamic Time Warping**
* *R*: **Root Mean Squared Error**

### DTW to deal with shape similarity

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230526163614.png)

RMSE、MAE这些指标都没有考虑到一个重要的标准：**THE SHAPE SIMILARITY**

RdR Score Benchmark使用 [**Dynamic Time Warping(DTW，动态时间调整)** ](computer_sci/deep_learning_and_machine_learning/Trick/DTW.md)作为shape similarity的指标

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230526164106.png)
欧氏距离在时间序列之间可能是一个不好的选择，因为时间轴上存在扭曲的情况。

* DTW：通过“同步”/“对齐”时间轴上的不同信号，找到两个时间序列之间的最佳（最小距离）扭曲路径

### RdR score means

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230529130501.png)

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230529130509.png)

*RdR score*通过RMSE和DTW distance来计算，用于比较你的model和Radnom Walk(*Random Walk的RdR score = 0*)相比的优越性

### RdR calculation details

可以通过绘制 RMSE vs. DTW来计算RdR score，绘制的图如下所示：

![](computer_sci/deep_learning_and_machine_learning/Evaluation/attachments/Pasted%20image%2020230529130856.png)


计算矩阵面积来计算RdR score，（文章里并没有完整介绍计算，在[github code](https://github.com/CoteDave/blog/tree/master/RdR%20score)里有，并不确定）

# Reference

* M.Sc, Dave Cote. “RdR Score Metric for Evaluating Time Series Forecasting Models.” _Medium_, 8 Feb. 2022, https://medium.com/@dave.cote.msc/rdr-score-metric-for-evaluating-time-series-forecasting-models-1c23f92f80e7.
* JJ. “MAE and RMSE — Which Metric Is Better?” _Human in a Machine World_, 23 Mar. 2016, https://medium.com/human-in-a-machine-world/mae-and-rmse-which-metric-is-better-e60ac3bde13d.
* _Accelerating Dynamic Time Warping Subsequence Search with GPU_. https://www.slideshare.net/DavideNardone/accelerating-dynamic-time-warping-subsequence-search-with-gpu. Accessed 29 May 2023.