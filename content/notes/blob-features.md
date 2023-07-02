---
title: "blob-features"
tags: 
- 
---

# Blob Features

Blob Features
- A dark region surrounded by a light region (or vice versa)
- Need to
	- locate it
	- determine its size
	- determine its location
	- describe it in a way that is indepented of scale, illumination etc
	
![|200](https://i.imgur.com/uc0rIJr.png)

### Blob Detection
- NLoG: Normalized Laplacian of Gaussian
- DoG: Difference of Gaussian
	- Fast approzimation of NLoG
	- If you have a stack of images smoothed with different sigmas
	- The difference of any two consecutive is an approximation of the the NLoG of the first of the two images
- Gaussian Scale Space is the stack of images at different $\sigma$ smoothness: $(x, y, \sigma)$
- By taking the DoG between each image we get a stack of images filtered by DoG
- In each 3x3x3 grid we look for an extremum. These extrema are the candidates for blobs
- We then remove the weak extrema to find the high interest points

![|200](https://i.imgur.com/IfIE6R4.png)