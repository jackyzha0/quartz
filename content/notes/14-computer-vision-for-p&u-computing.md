---
title: "14-computer-vision-for-p&u-computing"
tags: 
- info305
- lecture
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---


Model-based Tracking 
- Requires CAD/3D model of the scene 
- Uses a prior estimate of camera position 
- 3D model is projected into the camera’s view for every frame, computing the visible parts of edges 
- Searches in the direction of the edge normal for the nearest edge in the video image


- Hybrid tracking combining inertial sensor with model-based tracking 
- Uses a textured 3D model of an urban environment 
- Instead of only using edges, includes appearance of edges


- Method: 
	- View rendered from previous pose 
	- Edges are extracted from this rendered view 
	- Search window slides along edge normal in camera image to search for corresponding edge 
	- Information is then used to update camera pose

