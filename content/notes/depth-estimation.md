---
title: "Depth estimation"
aliases: depth estimation
tags: CV
---

- difference between views is the disparity (depth)
- [[stereo-rectification]]: warping a general stereo pair to this form
- given rectified images. find one point in the first image and match in second image along the same v using
	- [[block-matching]]
	- [[global-matching]]
	- [[semi-global-matching]]