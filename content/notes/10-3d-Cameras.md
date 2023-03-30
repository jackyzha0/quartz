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
> [!INFO] need a hole that is big enough to get enough light
> but small enough to create a sharp image
> light goes through the hole to the image plane
> pin hole is also the "lens"

THE PINHOLE CAMERA MODEL
![pin hole top view|300](https://i.imgur.com/bTSLvWR.png)
![pin hole diagam|300](https://i.imgur.com/TfclYHD.png)
> [!INFO] use negative of f as it is behind the pinhole
> find U using similar triangles rule

![|300](https://i.imgur.com/paeALF6.png)
> [!INFO] now we can project a point from 3d to 2d
> z is multiplies by 1 in the matrix so that the 3rd point of the homogenous coord becomes the z value

- We can put the image plane in front of the pinhole 
	- Removes the sign change 
	- Not practical for real cameras 
	- The maths works out just fine
![|200](https://i.imgur.com/hxPFHET.png)
![|100](https://i.imgur.com/KEiY1bf.png)

> [!INFO] cant really convert from 2d back to 3d without knowing focal length and z coord of every point

TRANSFORMING CAMERAS

INTRINSICS AND EXTRINSICS 
- Often break this down into 
![](https://i.imgur.com/3eENBA4.png)

- Most simple case: 𝐮 = K[I 𝟎]�
- K: camera calibration or intrinsics 
- [I | 0]: camera pose or extrinsics
![](https://i.imgur.com/9AwfvSk.png)

CAMERA CALIBRATION

- The model has image origin in the centre of the frame 
	- We usually put this at the top corner 
	- Can fix this with a translation 
- If the centre is at $(c_u, c_v)$ 
![](https://i.imgur.com/aIynYTx.png)
![](https://i.imgur.com/XfSdzye.png)


TRANSFORMING CAMERAS 
- We have assumed 
	- A camera at the origin 
	- Pointing along the +ve $Z$ axis 
- We will need the general case 
	- Move the camera to any location 
	- Point the camera in any direction
	![](https://i.imgur.com/oWYorU4.png)
> [!INFO] camera in games etc. always moves around with the player/operator,
> instead of transforming the camera we transform the world
> only need to apply inverse matrix to the 3d points of the world

TRANSFORM THE WORLD (!) 
- To transform a camera by 
- Apply inverse, , to points 
- To move the camera left 3 units, move the world right 3 units 
- To rotate the camera about , rotate the world about 
- The relative motion of the camera and the world is the same