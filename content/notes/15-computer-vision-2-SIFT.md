---
title: "15-computer-vision-2-SIFT"
tags: 
- lecture
- info305
---

> [!DANGER] Watch lecture

Scale Invariant Features Transform (SIFT)

Natural Feature Based Tracking (NFT)
- Extend the idea of marker to generic objects and environments 
- Requires knowledge about the environmeht (e.g. image) 
- We cannot assume to have rectangles in the environment (as with markers) 
- Need some form of other visual features (here usually corners) 
	- SIFT: Scale Invariant Feature Transform

![Distinctive image features from scale-invariant keypoints. David G. Lowe, Int. Journal of Computer Vision, 60, 2 (2004), pp. 91-110 (roughly 50.000 citations)|300](https://i.imgur.com/u5KvNpD.png)

SIFT
- General aim: 
	- Being able to run PnP 
	- Being able to match points (features) from the real world within points (features) camera image 
	- Give comprehensive description of image
- SIFT: Scale Invariant Feature Transform 
	- Specific implementation of 
		- Feature detection (corners) 
		- Feature description 
		- Feature matching

![SIFT diagram|300](https://i.imgur.com/h4Xm7B5.png)

SIFT
- Robustness: Invariance to changes in illumination, scale, rotation, affine, perspective. 
- Locality: robustness to occlusion and clutter. 
- Distinctiveness: Easy to match to a large database of objects (e.g. different images). 
- Quantity: Many features (points) can be generated for even small objects. 
- Efficiency: Computationally “cheap”, real-time performance.

SIFT - Feature detection (corners)
- Find features (points, here corners) that give us information about the objects in the image 
- What charactserises edges and corners? 
- How to be invariant to scale? 
	- Use a scalespace for handling image structures at different scales 
	- Corners as representation of extrema points -> Difference of Gaussians (DoG)
![Gaussians (Images blurred with Gaussian blur)|200](https://i.imgur.com/VqUlBm3.png)

![Scalespace Creation|300](https://i.imgur.com/bhttRBD.png)
