---
title: "3d-geometry"
tags: 
- 
---

# 3D Coordinate Systems

## Left vs Right handed coordinates
![](https://i.imgur.com/McKWNwC.png)

## 3D Homogenous Coordinates
- Represent (𝑥, 𝑦, 𝑧) as a set of 4-vectors

$\begin{bmatrix} x \\ y \\ z \\ \end{bmatrix} \rightarrow k \begin{bmatrix} x \\ y \\ z \\ 1 \\ \end{bmatrix}, \quad k \neq 0$
- The vector $[a, b, c, d]^T$ corresponds to the point $(\frac{a}{d}, \frac{b}{d}, \frac{c}{d})$
- Directions are in the form $[x, y, z, 0]^T$
- Basic transformations are now $4\times4$ matrices

# 3D Transformations
## Scaling & Translation
- Basically the same as in 2D just add an extra column and row

## Rotation
- Three degrees of Freedom
- Three ways to Represent Rotation
	- Yaw, Pitch, Roll
	- 'Euler Angles' - rotations about X, Y, Z

Rotation about Z (from X to Y)
$$R_{Z} = \begin{pmatrix}
\cos(\theta) & -\sin(\theta) & 0 & 0 \\
\sin(\theta) & \cos(\theta) & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
\end{pmatrix}$$

Rotation about Y (from Z to X)
$$R_{Y} = \begin{pmatrix}
\cos(\theta) & 0 & \sin(\theta) & 0  \\
0 & 1 & 0 & 0 \\
-\sin(\theta) & 0 & \cos(\theta) & 0  \\
0 & 0 & 0 & 1 \\
\end{pmatrix}$$

Rotation about X (from Y to Z)
$$R_{X} = \begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & \cos(\theta) & -\sin(\theta) & 0  \\
0 & \sin(\theta) & \cos(\theta) & 0  \\
0 & 0 & 0 & 1 \\
\end{pmatrix}$$

Example 90° about X
$$R_{X} = \begin{pmatrix}
1 & 0 & 0 & 0 \\
0 & 0 & -1 & 0  \\
0 &1 & 0 & 0  \\
0 & 0 & 0 & 1 \\
\end{pmatrix}$$

times (1, 2, 3, 1) gives (1, -3, 2, 1)

## Gimbal Lock
![video|200](https://www.youtube.com/watch?v=zc8b2Jo7mno)