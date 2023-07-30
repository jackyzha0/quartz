---
title: "Eye-Perspective View Management for OSTHMDs"
tags: paper, XR, HCI
---
29/07 4:46pm - 5:21pm
30/07 12pm - 12:33pm

## Notes
view management (placement of labels) requires knowledge of users true view

their approach based on eye-perspective rendering (EPR) https://doi.org/10.1109/VRW55335.2022.00171

EPR is inspired by user-perspective rendering (UPR) for handheld AR. where the AR view on a handheld device is distorted so that the device resembles a transparent lens from the user’s perspective

Avoid hardware mods such as those used in [[ChromaGlasses]]

### UPR
warps a view of a physical scene so it appears as seen by the user of a system. e.g., calculating desired viewport for users eye position when looking through handheld AR display
- track the position of the head relative to the display using

### EPR
three methods: 
- Homography
	- slam tracking greate 3d geometry
	- create homography using 3d points of largest plane (of 3d or of image)
	- temporal coherence (same between frames?)
	- does not require depth camera
- Reprojection
	- using depth camera
	- project rgb onto 3d to create textured geometry
	- textured geometry transformed by $T_E$ to get users view
- IBR
	- same as reprojection but 
	- use depth inpainting to fill holes in geometry before reprojection, and after to fill holes from disocclusion)
	- use IBR to fill holes in image 

### Implementation
"Label placement candidates are initially computed in the EPR view of the dominant eye. However, to avoid stereo vision conficts between the label content and the background, the Stereo Vision Uniformity criterion utilizes EPR views of both eyes. For this purpose, we project each candidate position of the dominant eye into the non-dominant eye"




## Questions
- [ ] why do more complex scenes need a 3d reconstruction. how does the reconstruction help?
- [ ] what are disocclusions
- [ ] why not just have a dark rectangle around the labels?
- [ ] what is loop closure

## qualms
- figure 2 is not very clear
- 