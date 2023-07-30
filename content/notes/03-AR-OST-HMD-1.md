---
title: "03-AR-OST-HMD"
tags: AR, HCI, XR
---

## Indistinguishable augmented reality in OST HMDs

- sutherland: sword of damocles/ultimate display
- hololens/oculus etc

realism
- spatial
	- calibration
	- distortion correction
- temporal
	- latency
	- flickr
- visual
	- colour 
	- accommodation
	- dynamic range
	- occlusion
	- FOV
	- resolution


basic system:
![](https://i.imgur.com/H478mex.png)

### Spatial realism
![|300](https://i.imgur.com/Sabl52u.png)

people  have different eyes and head. 

not just because of differences in interpupilliary distance. also HMD moves around on the users head.

SPAAM
- use a calibrated camera
- line up items in view with points on the screen to calibrate

Interaction free display calibration
- use eye tracking camera
- compute model of eye and approximate display surface.
- compute continuous alignment

distortion correction
- imprecise optics
- "image plane" is a spherical surface Klemm et al.

### Temporal realism

effects of latency and flickr

- latency is main cause of simulator sickness
- should aim for less than 5ms
- for no flickr should be approx 90Hz
- Lincoln et al. from motion to photons in 80 microseconds

### Visual Realism
- transparency, fov, resolution, colour accuracy, etc

Color:
- Display: 
- itoh et al. semi-parametric color reproduction method for optical see through head mounted displays
![300](https://i.imgur.com/ot7WOTR.png)
![200](https://i.imgur.com/NJHtfk5.png)

Optics
- Abberations: Chomatic, Spherical: Blur
- distortions

Image Blending
- effects of background bleeding into view
- similar issue with movie projectors
- beam splitter to get users view
- itoh et al. light attenuation display: subtractive see through near eye display via spatial color filtering

![](https://i.imgur.com/onsHIr9.png)

### Accommodation Capability
![|300](https://i.imgur.com/cL0A9VK.png)
![](https://i.imgur.com/mxz91sI.png)

### Occlusion Capability
![](https://i.imgur.com/VV5rn6o.png)

