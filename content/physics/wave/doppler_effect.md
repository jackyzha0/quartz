---
title: Doppler Effect
tags:
- physics
- basic
- wave
---

多普勒效应（**Doppler effect**）是波源和观察者有相对运动时，观察者接受到波的频率与波源发出的频率并不相同的现象。

远方急驶过来的火车鸣笛声变得尖细（即频率变高，波长变短），而离我们而去的火车鸣笛声变得低沉（即频率变低，波长变长），就是多普勒效应的现象，同样现象也发生在汽车鸣响与火车的敲钟声。

# General

在classical physics中，source的speed和receiver的speed远小于wave在medium中的移动速度，observed frequency $f$和emitted frequency$f_0$关系：

$$
f = (\frac{c \pm v_r}{c \pm v_s})f_0
$$
* $c$是wave在介质中的速度
* $v_r$是receiver相对于介质的速度，如果receiver向source移动，则分子为加号，反之为减号
* $v_s$是source相对于介质的速度，如果source远离receiver，则分母为加号，反之为减号

> [!note] 
>  请注意，此关系预测如果源或接收器中的任何一个远离另一个，频率将会降低。

$$
\frac{f}{v_{wr}} = \frac{f_0}{v_{ws}} = \frac{1}{\lambda}
$$
* $v_{\omega r}$是wave speed相对于receiver
* $v_{\omega s}$是wave speed相对于source
* $\lambda$是波长

## Example

![](physics/wave/attachments/Dopplereffectsourcemovingrightatmach0.7.gif)

其中$v_s = 0.7c$，波前开始在源的右侧（前面）聚集，并在源的左侧（后面）进一步分开。

在前面的receiver会听到higher frequency，也就是$f = \frac{c}{c-0.7c}f_0 = 3.33f_0$；后面的receiver会听到lower frequency，也就是$f = \frac{c}{c + 0.7c}f_0 = 0.59f_0$




# Reference

*  [多普勒效应 - Wiki](https://zh.wikipedia.org/wiki/%E5%A4%9A%E6%99%AE%E5%8B%92%E6%95%88%E5%BA%94)