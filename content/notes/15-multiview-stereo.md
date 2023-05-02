---
title: "15-multiview-stereo"
tags: 
- lecture
- cosc342
---

> [!INFO] need to find absolute pose for each additional camera
> Perspective-n-point pose
> use sift features to detect pose of new camera. 
> we have 3d point in the world and 2d points in the camera

> [!INFO] perspective-3-point pose
> using the three 2D-3D matches. we find the location of the camera, using the angles between these vectors (direction, and distance).
> P is at the intersection of the sphere around A B and C

> [!INFO] bundle adjustment
> as we add more cameras the error increases over time. 
> at the end we run a final optimisationa algorithm to make sure the features match well. 

> [!INFO]
> when you have 1000 features and 100 cameras, there are a lot of features. we need to optimise reprojection error of all these points. 
> we can use a sparse matrix (the jacobian matrix is mostly zeros) 
> bundles of rays for each camera are adjusted using levenberg-marquadt get an optimal reconstruction