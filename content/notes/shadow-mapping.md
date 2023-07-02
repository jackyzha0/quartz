---
title: "shadow-mapping"
tags: 
---

- 2 pass render
- first from light source to find shadows
	- depth map of scene from light POV
	- change the [[view-matrix]]
	- vertex shader transforms geometry into light view space
- second from camera
	- to check if point is in shadow
		- at each point we want to render 
		- compare the value in the shadow map with the distance from the poin to the light source
		- if the distance is larger than the value the point is in shadow
		- if a point is behind another point (from the perspective of the light) it is in shadow. i.e., if the distance is larger then there is a something between the point we are rendering and the light source
		- check this in the fragment shader
