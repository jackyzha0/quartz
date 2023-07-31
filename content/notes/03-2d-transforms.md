---
title: "03-2d-transforms"
tags: 
- lecture
- cosc342
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---

look into how colours work together

Points lines
- point is 2d location $(u,v)$
- two points define a line
- a polyline with k segments is a sequence of k+1 points
- a polygon is a polyline where the beginning and ened are the same, we often omit the duplicate point
- points are vectors

> [!INFO] polygon and polylines will be specifies in the code

> [!INFO] $[u v]^T$ high T indicates vector 

coordingate systems
- mathematical
- image based
- matrix based
- ![|300](https://i.imgur.com/m6OAA5T.png)

> [!INFO] make sure to check you are using the right coordinate system

transformations
- translation
> [!INFO]  value of change (delta) for each coordinate. for a shape, apply the transformation to each point
- scaling
- rotation
	- rotate by an abgle about the origin
	- rotation from U towards V, not anti/clockwise
	- $[u',v'] = [cos(0) - sin(0), sin(0) cos(0)][u,v]$
- inverse
	- inverse of translate is translating by negative
	- inverse of scaling by $s$ is scaling by $\frac{1}{s}$
	- inverse of rotating by $\theta$ is rotating by $-\theta$
	- inverse of rotation matrix is its transpose
		- ![](https://i.imgur.com/HSiqyQb.png)

- combinations
	- e.g., rotate 45 about (2,1)
		-  shift by (-2,-1)
		-  rotate by 45
		-  shift by (2,1)
		-  ![](https://i.imgur.com/NI6luaG.png)

homogenous coordinates
- represent 2D points as 3 points
- all linear transformations become 3x3 matrices
- ![](https://i.imgur.com/aksrjQw.png)

>[!DANGER]  homogenous coordinates

homogenous transforms
- ![homogenous rotation and translation](https://i.imgur.com/qSIy9L1.png)
- ![homogenous scaling](https://i.imgur.com/1YHOsWH.png)
- ![non-uniform scaling](https://i.imgur.com/qkqFWa1.png)

> [!INFO] non uniform scaling is when you dont scale each dimension equally, i.e., stretch 

it is easy to apply a sequence of transformations by applying each one to the result of the previous one. the transformations can be combined into one translation which can be applied to any number of points