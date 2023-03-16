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


not homographies
- If we have both: 
	- Non-planar scene, and 
	- Translating camera 
- There is no homography between the images 
	- Lines may not be preserved 
	- Cannot make a mosaic 
	- But we can do stereo

![|150](https://i.imgur.com/8P81y7T.png)

making mosiac
- To make a mosaic image: 
	- Need to warp images to align 
	- This warping is a homography 
- How to find the homography? 
	- If a feature at in one image matches to in the other, then

![|300](https://i.imgur.com/lryK0b8.png)

HOMOGRAPHY ESTIMATION IN OPENCV 
- https://docs.opencv.org/4.4.0/d9/d0c/group__calib3d.html#ga4abc2ece9fab9398f2e560d53c8c9780
- pts1 – Points in first image (std::vector) 
- pts2 – Points in second image (std::vector) 

- cv::RANSAC - method to use (we’ll just use RANSAC) 
- 3.0 – RANSAC threshold 

cv::Mat H = cv::findHomography(pts1, pts2, cv::RANSAC, 3.0);

