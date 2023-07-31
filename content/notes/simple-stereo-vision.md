---
title: "simple-stereo-vision"
tags: CV, image_processing
---
- two parallel cameras
- one ar origin, one shifted by t $(-b, 0, 0)^{T}$ and rotated by $I$ (not rotated)
- using the [[cameras#Pinhole Camera]] model we project a point in 3d onto each camera. the point in the second camera is shifted by the same as the camera is shifted