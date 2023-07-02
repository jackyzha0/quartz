---
title: "homography-estimation"
tags: 

---

- A homography can define a geometric relationship between two images
- Defined as a $3\times 3$ matrix

![](https://i.imgur.com/ZJglMG6.png)

- Homographies are valid when:
	- viewpoint of camera doesnt change
	- the viewpoint changes but the scene is planar
	- if these scene is far away ("A plane at infinity")

# DLT
The direct linear transform algorithm:
- we have a set of correspondenses and the unknown homorgaphy matrix. 
- we know that the correspondsnses $\times$ the homography equals zero.
- we look for an eigenvector with eigenvalue of zero
- algorithm
	- input at least four correspondences u - u'
	- output homography H such that u' = Hu
	- form the $2n\times 9$ matrix A from u and u'
	- find the eigen vector h corresponding to the smallest eigenvalue of A
	- reshape h to give H

you can also normalise points before by centring on origin with average length root 2 and denormalise after using the inverse. 

# RANSAC
- random sample and consensus
- for lines
	- choose two points
	- fit a line
	- count points close to the line
- for homography
	- select k point matches
	- fit a model → h*
	- count how many other points agree with the model
		- keep these points (based on threshold) (inliers)
		- use normalised dlt to estimate H