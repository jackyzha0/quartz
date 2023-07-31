---
title: "cameras"
tags: 
- 
---

Cameras project 3d world into 2d plane

# Perspective Projection
This is the way we see the world: 
- Distant objects look smaller
- Parallel lines in 3d converge in 2d

## Pinhole Camera
![|400](https://i.imgur.com/KvqTvRF.png)
- Light travels from world, through a point onto the image plane


## Simplified Pinhole
![](https://i.imgur.com/rQ6g9N0.png)
- move image place in front of the camera

$\begin{bmatrix}u \\ v \\ 1\end{bmatrix} \equiv \begin{bmatrix}f & 0 & 0 & 0 \\ 0 & f & 0 & 0 \\ 0 & 0 & 1 & 0 \end{bmatrix}\begin{bmatrix} x \\ y \\ z \\ 1\end{bmatrix}$

## Intrinsics and Extrinsics
$\begin{bmatrix}u \\ v \\ 1\end{bmatrix} \equiv \begin{bmatrix}f & 0 & 0 \\ 0 & f & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix}1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0\\ 0 & 0 & 1 & 0 \end{bmatrix}\begin{bmatrix} x \\ y \\ z \\ 1\end{bmatrix}$

$u = K[I|0]x$

- U is the 2d homogenous coords
- K is the intrinsic camera parameters (focal length, principal point, and scaling factors)
- [I|0] is the extrinsic camera parameters. It is made up of:
	- The identity rotation matrix I concatenated with 
	- The 0 translation vector
- x is the homogenous coords in 3d space

# Transforming Cameras
- Transform camera instead of world
- Apply inverse, $T^{-1}$ to points
- Relative motion of world and camera is the same

- Shift by $-t$ and rotate by $R^{-1}=R^{T}$

$\begin{bmatrix}u \\ v \\ 1\end{bmatrix} \equiv \begin{bmatrix} f & 0 & c_u \\ 0 & f & c_v \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} r_{11} & r_{21} & r_{31} & 0 \\ r_{12} & r_{22} & r_{32} & 0 \\ r_{13} & r_{23} & r_{33} & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 & -t_x \\ 0 & 1 & 0 & -t_y \\ 0 & 0 & 1 & -t_z \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$

- More compactly:

$\mathbf{u} \equiv \mathbf{K}[\mathbf{I}\space \space \mathbf{0}] \begin{bmatrix} \mathbf{R}^T & \mathbf{0} \\ \mathbf{0}^T & 1 \\ \end{bmatrix} \begin{bmatrix} \mathbf{I} & -\mathbf{t} \\ \mathbf{0}^T & 1 \\ \end{bmatrix} \mathbf{x} = \mathbf{K}[\mathbf{R}^T -\mathbf{R}^T\mathbf{t}]\mathbf{x}$

# Camera Calibration

```

double cv::calibrateCamera( 
	// Input parameters 
	//std::vector> objectPoints, 
	//std::vector> imagePoints, 
	//cv::Size imageSize, 
	// Output parameters 
	//cv::Mat cameraMatrix, 
	//std::vector distCoeffs, 
	//std::vector rotationVectors, 
	//std::vector translationVectors);
```


## Calibration Targets
![](https://i.imgur.com/6YBvWpo.png)

- A set of known 3D coords which we can map to 2D coords
- Usually A Checkerboard
- $X-Y$ Plane is the target
- $Z$ axis goes into the target plane
- Finding corners:
	- Threshold to B&W
	- Look for Quads
	- Link quads to the checkerboard
	- Sub-pixel refinement
- Lens distortion is also an issue



