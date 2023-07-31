---
title: "05-feature-description-and-matching"
tags: 
- lecture
- cosc342
sr-due: 2023-08-03
sr-interval: 3
sr-ease: 250
---

last lecure: taking photographs and sticthcing them together. uses feature detection. identity interest points in image sequences. into homography matrix, map from one image into another

![](https://i.imgur.com/I3WL53L.png)

Blob Features
- corner point dont keep scale
- an alternative to corner features
	- have scale as well as location
- can be created using the "difference of gaussian method"
	- Two Gaussians of different width 
	- Subtract wide from narrow 
	- Bright blobs – high positive response 
	- Dark blobs – high negative response
- ![blob detection example corners>blobs](https://i.imgur.com/yOPrJtO.png)
- ![](https://i.imgur.com/UMcQbrw.png)

FEATURE DESCRIPTION
- Features are matched on the basis of some descriptor
- This is usually a list of numbers, represented as a vector
- Often a high dimensional vector
- SIFT descriptors, for example, are 128-dimensional 
- Matching descriptors should be close to each other
- This distance should be low even if the image changes
- Translation and rotation in the image plane
- Changes in viewing angle and distance (and therefore scale)
- Changes in illumination, brightness, and contrast

>[!INFO] we will use sift descriptors alot. 

A SIMPLE FEATURE DESCRIPTOR
- Could use pixels near the feature
- This is easy to do
- Works well in some cases
- Example is greyscale, but generalises easily to colour images
- Take an window ( odd)
- -dimensional feature vector
- Compare with Euclidean distance
- Often easier to use squared distance

Feature invariance
![](https://i.imgur.com/DTsADVj.png)
> [!INFO] does not handle rotation, changing scale or brightness
![](https://i.imgur.com/mNxr2XK.png)

SIFT: SCALE-INVARIANT FEATURE TRANSFORM
- Translation invariance is easy 
- Scale invariance comes from using Blob features 
- Descriptor is computed from a window around the feature 
- The size of the blob determines the size of the window 
- Brightness invariance comes from using image gradients 
- Relative brightness of pixels is fairly constant 
- Rotation invariance by estimating feature orientation 
- Window is oriented to the dominant image gradient

> [!INFO] not just direct comparision, compared on multiple, permutations

> [!QUESTION] how is this different from doing different perumtations of grayscale vlues

> [!INFO] 

SIFT FEATURE DETECTION/DESCRIPTION
- Detect blob features and determine their scale 
- Compute a Histogram of Gradients around the blob 
- Peak(s) in the Histogram determine the orientation 
- A square region is used to compute the descriptor 
- Square’s size from the blob size; orientation from HoG peaks

