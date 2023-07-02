---
title: "block-matching"
tags: 
---

- search along epipolar line for a range of disparities
- find best match
	- using sum of squared diffs
		- intensities, in the window, distance across
		- ![](https://i.imgur.com/BLBLMS4.png)
	
problems:
- depth is estimated at each pixel independently
	- these is little consistency between pixels
	- fix using [[regularised-cost]]