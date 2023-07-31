---
title: "texture-mapping"
tags: 
---
- the proces of warping a [[texture]] onto an object
- translate object surface coords onto texture
- multiple methods
	- manual: unwrap and paint
	- parameterisation (automatic)
		- planar mapping
		- spherical mapping
			- project a ray out from orign throught texture onto sphere (sorta like a skybox)
		- box mapping (multiple planes)
			- mainly for rooms and environments
			- also good for simulating mirror reflections of an object