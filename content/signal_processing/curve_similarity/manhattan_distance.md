---
title: Manhattan Distance
tags:
  - algorithm
  - distance
date: 2024-03-18
---
在曼哈顿的街道布局中，所有街道都是相互垂直的，因此从一个点到达另一个点，需要沿着水平方向和垂直方向分别移动一定的距离。曼哈顿距离就是这两个距离的总和。

$$
d(A, B) = |x_A - x_B| + |y_A - y_B|
$$

曼哈顿距离具有以下特点：

- 曼哈顿距离是非负的。
- 曼哈顿距离满足三角不等式。
- 曼哈顿距离是欧几里得距离的下界。


曼哈顿距离在许多领域都有应用，

- 图像处理：曼哈顿距离可以用于**计算图像的边缘强度**。
- 机器学习：曼哈顿距离可以用于计算两个数据点的距离，并用于分类和回归任务。
- 自然语言处理：曼哈顿距离可以用于**计算两个文本的相似度**。


# Demo

## Manhattan Distance for Image Edge Strength


```python
import numpy as np
import cv2

def manhattan_distance(image):
  """
  计算图像边缘强度

  Args:
    image: 形状为 (h, w, 3) 的数组，代表图像

  Returns:
    形状为 (h, w) 的数组，代表边缘强度
  """

  # 将图像转换为灰度图像，后面的系数是人眼对红绿蓝敏感度的权重
  gray_image = np.dot(image[...,:3], [0.2989, 0.5870, 0.1140])

  # 对图像进行高斯滤波
  filtered_image = cv2.GaussianBlur(gray_image, (5, 5), 0)

  # 计算每个像素点与其相邻像素点的曼哈顿距离
  edge_image = np.zeros_like(filtered_image)
  for i in range(1, filtered_image.shape[0] - 1):
    for j in range(1, filtered_image.shape[1] - 1):
      edge_image[i, j] = np.sum(np.abs(filtered_image[i-1:i+2, j-1:j+2] - filtered_image[i, j]))

  return edge_image

# 读取图像
image = cv2.imread('image.png')

# 计算图像边缘强度
edge_image = manhattan_distance(image)

# 显示边缘图像
cv2.imshow('Edge Image', edge_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
```
