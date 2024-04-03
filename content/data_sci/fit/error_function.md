---
title: Error function we can choose in curve fitting
tags:
  - basic
  - data
  - math
date: 2024-04-01
---
在曲线拟合中，选择误差函数（error function）是为了衡量模型预测值与实际观测值之间的差异。误差函数通常用于优化过程中，指导算法调整模型参数以最小化误差。以下是一些常用的误差函数：

1. **均方误差（Mean Squared Error, MSE）**:
   - 误差的平方和的平均值，是最常用的误差函数之一。
   - 公式：$MSE = (1/n) * Σ(y_i - f(x_i))^2$，其中$y_i$是实际观测值，$f(x_i)$是模型预测值，$n$是数据点的数量。

2. **均方根误差（Root Mean Squared Error, RMSE）**:
   - MSE的平方根，与观测值具有相同的单位，因此更容易解释。
   - 公式：$RMSE = √(1/n) * Σ(y_i - f(x_i))^2$。

3. **平均绝对误差（Mean Absolute Error, MAE）**:
   - 误差的绝对值的平均值，对异常值不如MSE敏感。
   - 公式：$MAE = (1/n) * Σ|y_i - f(x_i)|$。

4. **平均绝对百分比误差（Mean Absolute Percentage Error, MAPE）**:
   - 误差与实际观测值的百分比的绝对值的平均值，常用于百分比或比率数据的拟合。
   - 公式：$MAPE = (1/n) * Σ|(y_i - f(x_i))/y_i| * 100%$。

5. **对数似然误差（Log-Likelihood Error）**:
   - 常用于概率模型，如最大似然估计。
   - 公式依赖于特定的概率分布。

6. **交叉熵误差（Cross-Entropy Error）**:
   - 也称为对数损失，常用于分类问题和神经网络的训练。
   - 公式：$Cross-Entropy = -Σy_i * log(f(x_i)) + (1 - y_i) * log(1 - f(x_i))$。

7. **Huber损失（Huber Loss）**:
   - 结合了MSE和MAE的特点，对异常值具有较强的鲁棒性。
   - 公式：$Huber(y_i, f(x_i), δ) = |y_i - f(x_i)| if |y_i - f(x_i)| ≤ δ, (1/2) * (|y_i - f(x_i)|^2 - δ^2) otherwise$。

8. **分位数损失（Quantile Loss）**:
   - 用于分位数回归，关注模型预测的分位数与实际观测值的分位数之间的误差。
   - 公式：$Quantile Loss = Σ(τ * (y_i - f(x_i)) if y_i > f(x_i), (1 - τ) * (f(x_i) - y_i) otherwise$，其中τ是分位数。


在选择误差函数时，应考虑数据的特性、模型的目的和误差分布。例如，对于包含许多异常值的数据，使用Huber损失或MAE可能更合适。对于概率预测问题，对数似然误差或交叉熵误差可能更适用。