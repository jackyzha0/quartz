---
title: "16-computer-vision-3"
tags: 
- lecture
- info305
---


SLAM: Simultaneous Localisation and Mapping

> [!INFO] new and modern. last 10-15 years.
> we can do dept estimation with stereo camera
> we can also do depth estimatio by taking two photos with one camera
> by continuously taking images with a moving camera, we can calculate the offset from the inital photos, using sift, we can track features between images to build a model of the environment. while moving we recalcualte the position of the camera in space. the model getting better over time. 
> only gives relative location between the world and the camera. whereas marker based tracking we can get position of camera in the world
> we need to build in some mechanisms to compensate for error.

> [!INFO] hololens
> uses four camera for SLAM tracking to find location in space. 
> to track without features (e.g.,) on plain walls, we can track using the relative position and oreientation of the camera (using IMUs)

SLAM
- What if we don’t have an existing model/ marker/feature databased? 
- Origins in robotics 
- Nowadays widely used (ARKit/ARCore, Hololens, Cars, Robots, Vacuum cleaners, Drones, etc.) 
- SLAM: Simultaneous localisation and mapping 
	- Localisation: navigating this environment using the map while keeping track of the relative position and orientation 
	- Mapping: building a map of the environment 
- Can be use with different DoF (e.g. rotation only or full 6DoF)

![SLAM iamge|300](https://i.imgur.com/QkMNcWo.png)

6DoF SLAM
- General approach: 
	- Tracking of points in consecutive frames 
	- Use tracked points to compute points 3D position using triangulation 
	- Create a 3D map from computed 3D points 
	- Simultaneously use computed 3D points to compute camera pose 
- Here: Monocular SLAM approach - Visual SLAM 
- Starts from unknown environment with unknown objects

![Georg Klein and David Murray Parallel Tracking and Mapping for Small AR Workspaces In Proc. International Symposium on Mixed and Augmented Reality (ISMAR'07, Nara)|300](https://i.imgur.com/1cgtxQy.png)

Tracking SDK’s/APIs
- Marker Tracking & Natural Feature Tracking: 
	- Vuforia: https://www.vuforia.com 
	- ARToolKit: https://github.com/artoolkit 
	- OpenCV: https://opencv.org 
- SLAM: 
	- PTAM: https://github.com/Oxford-PTAM/PTAM-GPL 
	- ORBSLAM: http://webdiis.unizar.es/~raulmur/orbslam/ 
	- ARCore: https://developers.google.com/ar/discover/ 
	- ARKit: https://developer.apple.com/arkit/ 
	- OpenCV: https://opencv.org 
- Model-based Tracking: 
	- Vuforia: https://www.vuforia.com 
	- OpenCV: https://opencv.org