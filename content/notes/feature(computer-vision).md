---
title: "feature(computer-vision)"
aliases: feature, features
tags: CV
---

# Types of Features
- [[SIFT-features]]
- [[blob-features]]
- [[corner-features]]

# Features
- A feature is a 2D location in an image that can be found in different views
- There are two common types of features:
	- Blob Features
	- Corners
- And there are many variants of these
	- SIFT
	- SURF
	- etc
	
## "Interesting" Points
- Features are "Interesting Points"
	- Rich image content (brightness variation, color variation etc) within the local window
	- well defined representation (signature) for matching
	- well defined position in the image
	- should be invariant to rotation and scaling
	- should be insensitive to lighting
- Examples
	- Not edges: cannot localise edges
	- Not corners (for complex objects): dont sho up often, not very unique
	- Yes Blobs: local appeareance (brightness variation), fixed position, definite size

## Invariance
- Invariant features can be detected regardless of changes to certain factors such as
	- Scaling
	- Rotation
	- Translation
	- Illumination
	- Viewpoint
	
## Feature Descriptor
- Features are matched on the basis of some descriptor
- Descriptor describes the local appearance or characteristics of a feature point or region in an image
	- Often stored as a high dimensional vector
	- e.g., [[SIFT-features#Descriptor]] is 128 dimensional
- When feature matching, matching features should be close to each other, regardless of changes between images such as lighting, translation, rotation etc.
- Captures information such as:	
	- Intensity
	- Colour
	- Direction
	- etc

### Simple Descriptor
- Take an $n\times n$ window around the feature
- Compare each descriptor using euclidean or squared distance
- Easy to do and works well sometimes
