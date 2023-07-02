---
title: "shading-models"
tags: 
---
- flat shading
	- per polygon, high speed
	- not interpolated (not smooth)
- goraud shading
	- per vetex
	- interpolate colour of interior pixels from vertices
	- occurs in vertex shader
- phong shading
	- NOT PHONG ILLUMINATON
	- per fragment
	- interpolate normal value for each pixel and calculate per pixel
	- 