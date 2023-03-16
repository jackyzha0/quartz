---
title: "06-homographies"
tags: 
- lecture
- cosc342
---

Homographies and mosaics
- A homography* is: 
	- A linear map between two planes (or views of a plane) 
	- A 3 x 3 matrix, up to a scale 
- Two images of a scene are related by a homography 
	- If the scene is planar, or 
	- If the camera only rotates
- ![|300](https://i.imgur.com/Rfh38wF.png)

Homographies for planar scenes
- Take a line in one view 
- This projects to a plane 
- That intersects the scene (another plane) at a line 
- That projects to a line in the other image 
- So lines are preserved
- ![|300](https://i.imgur.com/YZPAFl6.png)

> [!INFO] can create a "straight" view of a picture! 

[|300](https://i.imgur.com/BEjOoFL.png)

> [!INFO] homography: maps points from one image to another

> [!INFO] rephotography, mathing old photographs onto the current view of the user



homography for rotating camera
![|300](https://i.imgur.com/L6MqmUD.png)


> [!INFO] K matric describe parameters of camera. R matric describes rotation of camera. T is zero because the camera is only rotating. H is the homograhy matrix