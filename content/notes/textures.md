---
title: "textures"
aliases: texture
tags: CV, graphics 
---

- 1 2 or 3 D array of texels
- used as input for texture sampling
- simulates detail
	- colour
	- reflection
	- gloss
	- transparency
	- bumpiness
- fragment shading use the local colour of the texture image
- can hold arbitrary information

[[texture-mapping]]
[[texture-addressing]]
[[alpha-mapping]]
[[bump-mapping]]
[[environment-mapping]]

**issues**
- undersampling
	- one fragment maps to many texels
- oversampling
	- many fragments map to one texel

**solutions**
- texture filtering
- interpolate texel values
	- linearly interpolate (slower but better)
	- nearest neighbor (faster, but worse)

**mipmaps**
- solution to undersampling
- many texels mapping to one pixel
- creates noise
- during rendering use downsampled textures for objects far from the camera
- 