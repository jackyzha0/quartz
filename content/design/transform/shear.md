---
title: Shear
tags:
  - basic
  - "#design"
date: 2024-03-22
---

# Detail

在二维图像处理中，shear操作是指将图像沿水平或垂直方向进行**错切**，从而改变图像的形状。shear操作可以用仿射变换矩阵来表示，如下所示为一个Horizontal Shear：

$$
\begin{bmatrix}
1 & \tan(\theta) \\
0 & 1
\end{bmatrix}
$$
$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix} = 
\begin{bmatrix}
x + my \\
y
\end{bmatrix} = 
\begin{bmatrix}
1 & m \\
0 & 1 \\
\end{bmatrix} 
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$

上述矩阵的效果如图：

![](design/transform/attachments/Pasted%20image%2020240322111022.png)

同时还有Vertical Shear


$$
\begin{bmatrix}
1 & 0 \\
\tan(\theta) & 1
\end{bmatrix}
$$
$$
\begin{bmatrix}
x' \\
y'
\end{bmatrix} = 
\begin{bmatrix}
x \\
mx + y
\end{bmatrix} = 
\begin{bmatrix}
1 & 0 \\
m & 1 \\
\end{bmatrix} 
\begin{bmatrix}
x \\
y
\end{bmatrix}
$$
![](design/transform/attachments/Pasted%20image%2020240322111458.png)


# Reference

* https://en.wikipedia.org/wiki/Shear_mapping