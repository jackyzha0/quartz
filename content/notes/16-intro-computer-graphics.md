---
title: "16-intro-computer-graphics"
tags: 
- lecture
- cosc342
---

opposite of other topics -> 3d model to 2d image.


REAL-TIME GRAPHICS 

Based on rasterisation of graphic primitives: 
- Points 
- Lines 
- Triangles 
- Implemented in hardware (GPU)

![300](https://i.imgur.com/ckP7d4X.png)


- Rasterisation 
	- 	Computing for each triangle which pixel it covers 
	- 	Triangle centric approach 
	- 	Rasteriser only needs one triangle at a time
![Rasterisation diagram|300](https://i.imgur.com/ekamTVm.png)

> [!INFO] for each pixel it computes which triangle is there. (keep triangle closest to camera)(closest hit)
> 
