---
title: "Eye-Perspective View Management for OSTHMDs"
tags: paper, XR, HCI
---
29/07 4:46pm - 5:21pm

## Notes
view management (placement of labels) requires knowledge of users true view

their approach based on eye-perspective rendering (EPR) https://doi.org/10.1109/VRW55335.2022.00171

EPR is inspired by user-perspective rendering (UPR) for handheld AR. where the AR view on a handheld device is distorted so that the device resembles a transparent lens from the user’s perspective

Avoid hardware mods such as those used in [[ChromaGlasses]]

### UPR
warps a view of a physical scene so it appears as seen by the user of a system. e.g., calculating desired viewport for users eye position when looking through handheld AR display
- track the position of the head relative to the display using

### EPR
three methods: IBR, Homography, Reprojection


## Questions
- [ ] why do more complex scenes need a 3d reconstruction. how does the reconstruction help?

## qualms
- figure 2 is not very clear
- 