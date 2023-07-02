---
title: "2d-geometry"
tags: 
- 
---
# Elements of 2D Geometry
## Point
- A point is a 2D location. $(u,v)$

## Line
- Two points define a line $(u_{0},v_{0}), (u_{1},v_{1})$
- A **polyline** with $k$ segments is a sequence of $k+1$ points $(u_{0},v_{0}), (u_{1},v	_{1}), ..., (u_{k},v_{k})

## Shapes
- A **polygon** is a a polyline where $(u_{0},v_{0}) = (u_{k},v_{k})$
- Often the duplicate points is omitted

![|200](https://i.imgur.com/s10sArP.png)

# Representing 2D Geometry
## Vectors
A point can be represented as a vector $\begin{pmatrix}u\cr v\cr \end{pmatrix} = [u\space v]^{T}$

## Coordinate Systems
- Mathmatical
	- U: Left to Right
	- V: Bottom to Top
- Image-based
	- U: Left to Right
	- V: Top to Bottom
- Matrix-based
	- R: Top to Bottom
	- C: Left to Right

![](https://i.imgur.com/RltHuKn.png)

# 2D Transformations
## Translation
![|200](https://i.imgur.com/rRGRJUS.png)
- Shifting a point (𝑢, 𝑣) by some offset (Δ𝑢, Δ𝑣) 
- (𝑢, 𝑣) → (𝑢 + Δ𝑢, 𝑣 + Δ𝑣)
- In vector form: $\begin{bmatrix}u'\\ v'\\ \end{bmatrix}=\begin{bmatrix}u\\ v\\ \end{bmatrix}+\begin{bmatrix}\Delta u\\ \Delta v\\ \end{bmatrix}$
- In homogenous form: 

$\begin{bmatrix} 1 & 0 & \Delta u \\ 0 & 1 & \Delta v \\ 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} u \\ v \\ 1 \\ \end{bmatrix} \equiv \begin{bmatrix} u + \Delta u \\ v + \Delta v \\ 1 \\ \end{bmatrix}$




## Scaling
![|200](https://i.imgur.com/ZwHo4AN.png)
- Scaling points by factor $s$
- $(u, v) → (su, sv)$
- In vector form: $\begin{bmatrix}u'\\ v'\\ \end{bmatrix}= s\begin{bmatrix}\Delta u\\ \Delta v\\ \end{bmatrix}$
- In homogenous form:

$\begin{bmatrix} s & 0 & 0 \\ 0 & s & 0 \\ 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} u \\ v \\ 1 \\ \end{bmatrix} \equiv \begin{bmatrix} su \\ sv \\ 1 \\ \end{bmatrix}$



## Rotation
![|200](https://i.imgur.com/bm2Q2hE.png)
- Rotation by some angle $\theta$ about the **origin**
- From the $U$ axis towards the $V$ axis
- In vector form: $\begin{bmatrix}u' \\ v'\end{bmatrix} = \begin{bmatrix}\cos(\theta) & -\sin(\theta) \\ \sin(\theta) & \cos(\theta)\end{bmatrix}\begin{bmatrix}u \\ v\end{bmatrix}$
- In homogenous form:

$\begin{bmatrix} \cos(\theta) & -\sin(\theta) & 0 \\ \sin(\theta) & \cos(\theta) & 0 \\ 0 & 0 & 1 \\ \end{bmatrix} \begin{bmatrix} u \\ v \\ 1 \\ \end{bmatrix} \equiv \begin{bmatrix} \cos(\theta)u - \sin(\theta)v \\ \sin(\theta)u + \cos(\theta)v \\ 1 \\ \end{bmatrix}$


## Inverse Transforms
- Transforms can be undone geometrically.
	- translate by $(-\Delta u, -\Delta v)$
	- scale by $-s$
	- rotate by $-\theta$
		- Inverse of rotation matrix is its transpose
		
## Combining Transforms
- Transformation can be applied in a sequence
- Using homogenous coords all (lienar) transformations can be represented as 3D matrices
- To define a sequence of transformation we multiply them all together
- This makes it easy to combine transforms once and apply them to a set of points	