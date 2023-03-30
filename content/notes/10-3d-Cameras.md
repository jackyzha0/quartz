---
title: "10-3d-Cameras"
tags: 
- lecture
- cosc342	
---


CAMERAS AND PROJECTIONS 
- Cameras project the 3D world onto a 2D image 
	- Input is 3D points:  (𝑥, 𝑦, 𝑧)
	- Output is 2D points: (𝑢, 𝑣)
![matrix|100](https://i.imgur.com/bMo02GG.png)
	- What form should P have?
> [!INFO] need to apply a transformation to convert 3d coords to 2d coords
> P should be a 3 row and 4 column matrix

WHICH CUBE LOOKS RIGHT?
![](https://i.imgur.com/sYpeZvX.png)
> [!INFO] each cube is a projection of 3d points onto 2d space.
> middle cube is perspective transformation
> left is isometric
> right is orthographic

ORTHOGRAPHIC PROJECTION 
- Simple way to go from 3D to 2D 
- Delete one dimension! 
- Deleting X projects to the X -Y plane 
![matrix equation](https://i.imgur.com/J2fPAp5.png)
- This is not how our eyes work
> [!INFO] z coordinate is removed since the third column is zero

PERSPECTIVE PROJECTION 
- Our view of the world: 
	- Distant objects looks smaller 
	- Parallel lines in 3D converge in 2D 
- The pinhole camera 
	- A simple, but useful, model 
	- There is a central point of projection (the pinhole, often a lens in reality) 
	- Light travels from the world, through the pinhole, to the image plane