---
title: "absolute-pose"
tags: 
---

- we have a set of images of a scene
- need to find position of an image within the scene
- the pose of an image is the translation and rotation of the camera
- we can use 3 known 2d-3d point matches in the image to trilaterate the P (origin of the camera)
- use [[reprojection-error]] to optimise 