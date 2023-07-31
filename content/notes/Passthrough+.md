---
title: "Passthrough+"
aliases: 
tags: paper, XR, 
---

Real-time Stereoscopic View Synthesis for Mobile Mixed Reality

GAURAV CHAURASIA, Facebook, Switzerland 
ARTHUR NIEUWOUDT, Facebook, United States 
ALEXANDRU-EUGEN ICHIM, Facebook, Switzerland 
RICHARD SZELISKI, Facebook, United States 
ALEXANDER SORKINE-HORNUNG, Facebook, Switzerland

"use images from device cameras to compute a 3D reconstruction and warp the images using the 3D data to the viewpoint of user’s eyes at display rate."

"Our algorithmic contributions for enabling this performance include the computation of a coarse 3D scene proxy on the embedded video encoding hardware, followed by a depth densification and filtering step, and finally stereoscopic texturing and spatio-temporal up-sampling."

"We leverage images from stereo pairs of cameras typically mounted on VR devices to enable positional tracking of the device pose using SLAM"

**our solution aims to provide the following**
(1) Plausible parallax without inducing motion sickness or visual discomfort. 
(2) Low latency reconstruction and rendering without lag and stutter, while supporting dynamic scenes with significant motion. 
(3) Haptic trust: users should experience natural [[proprioception]], i.e., be able to reach out and grab an object or touch a surface.

**Our main technical and system contributions include: **
- an extremely low power stereo algorithm using consumer hardware (Sec. 3.1) and depth map computation (Sec. 3.2) to render a wide field of view in stereo (Sec. 3.4), 
- novel algorithms for reinforcing temporal stability in rendered views (Sec. 3.3), 
- a multi-threaded system design that can render novel views at display rate, irrespective of the underlying capture hardware (Sec. 4), and 
- an analysis of end-to-end latency (Sec. 5) and reconstruction quality (Sec. 6) necessary for a comfortable stereoscopic experience.

## Previous work
Real-time stereo recontruction
- Stereo Machine of Kanade et al. [1996] real time on custom hardware
- fast algorithms
	- semi global matching
	- hashMatch
	- PatchMatch
	- bilateral solver
	- laplace solver

Novel view synthesis ([[view-interpolation]])
- local homographies?
- 3D particle model?
- billboards and view-dependent textures?
- depth discontinuities?
- super-pixel segmentation?
- hole filling?
- disocclusions?
- COLMAP system
- sparse reconstruction?
- extra near-envelope?
- multi-layer panorama?
- DSO SLAM for sparse points?
- edge-aware densification?
- ESPReSSo system?
- spacetime-stereo?
- IR illuminators?
- local descriptors?

## Approach
![](https://i.imgur.com/gZRuDvN.png)
