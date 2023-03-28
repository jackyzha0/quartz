---
title: "09-3d-geometry"
tags: 
- lecture
- cosc342
---

Assignment/Labs
> [!INFO] main thinking needs to go into finding a good experiment
> dont need to do labs before assignment
> need to work in own time outisde lab
> common question from sticking lab. once you do the warping iwth the homography, how do create a large image containing all the pixels from both images. project image in to reference space and look where corners are. get min and max of overall output image. warp image by offset transformation. lay on the second image, and you get larger output image with extra space around. image.copyTo > copies pixels from onee image to another. measure offset from feature point and re porjected feature point. you can use this for the second part of the assignment. to calculate accuracy of homography translation. average error of 
> read opencv documentation 

THREE DIMENSIONS 
- We move from 2D to 3D 
- Many ideas the same: 
	- Homogeneous co-ordinates 
	- Scaling and translation 
- Some things get tricky 
	- Choice of left- or right- handed coordinates 
	- Rotations get complicated 
- Projection from 3D to 2D

LEFT & RIGHT-HANDED CO-ORDINATES
![](https://i.imgur.com/0rkaqh5.png)

HOMOGENEOUS CO-ORDINATES IN 3D
![](https://i.imgur.com/vS0mkkK.png)
> [!INFO] the '1' (fourth coord) can be used for scaling

TRANSLATION AND SCALING IN 3D
![](https://i.imgur.com/CRfRm7D.png)

ROTATION IN 3D
- Rotation in 3D 
	- More complex than in 2D 
	- Three ‘degrees of freedom’ 
- There are many ways to represent 3D rotations 
	- ‘Euler angles’ – rotations around , , and axes 
	- Yaw, pitch, roll 
	- Some angle about an axis
![](https://i.imgur.com/4I3HrZO.png)

ROTATION ABOUT 𝑋, 𝑌, AND 𝑍 AXES 
- We know that a 2D rotation looks like ![](https://i.imgur.com/OEP8agu.png)
- This is a rotation from the U axis to the V axis 
- Replace ‘rotation about X’ with ‘rotation from Y the to Z axis’ 
- Replace ‘rotation about Y’ with ‘rotation from Z the to X axis’ 
- Replace ‘rotation about Z’ with ‘rotation from X the to Y axis'

ROTATION ABOUT THE 𝑍 AXIS
- From X to Y
- Top left corner is 2D rotation 
- Z co-ordinate is unchanged
![](https://i.imgur.com/2QJQfCS.png)
![](https://i.imgur.com/kJMzLWf.png)

ROTATION ABOUT THE 𝑌 AXIS
- From Z to X
- Y co-ordinate is unchanged
![](https://i.imgur.com/VlmkMi5.png)

ROTATION ABOUT THE 𝑋 AXIS
- From Y to Z 
- X co-ordinate is unchanged
![](https://i.imgur.com/wShX5uR.png)

EULER ANGLES AND GIMBAL LOCK 
- Any rotation can be made up of three of these basic rotations 
- These are called Euler angles 
- There is a choice of axes order 
	- 𝑋𝑌𝑍 𝑋𝑍𝑌 𝑌𝑋𝑍 𝑌𝑍𝑋 𝑍𝑋𝑌 𝑍𝑌𝑋 
	- 𝑋𝑌𝑋 𝑋𝑍𝑋 𝑌𝑋𝑌 𝑌𝑍𝑌 𝑍𝑋𝑍 𝑍𝑌𝑍
- All options lead to Gimbal lock 
	- Align two axes, losing a degree of freedom – cannot rotate freely