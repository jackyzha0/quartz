---
title: "SIFT-features"
tags: 
- 
---


# SIFT  Features
- Scale Invariant Feature Transform
- Translation invariance is easy
- Scale invariance come from using [[mosaicing#Blob Features]]
- Illumination Invariance comes from using image gradients
- Rotation invariance by estimating feature orientation

### Scale Invariance
- The same feature at different scales appears at a different $\sigma$ extrema

### Orientation Invariance
- Histogram of gradient directions
- Place a grid over the blob after removing scale
- For each pixel apply the gradient operator which gives you magnitude and orientation of the edge
- Consider only direction as magnitude is affected by illumination
- Compute a histogram: x = which direction, y = number of pixels "facing" that direction
- Peak of histogram is the principle orientation

### Descriptor
- The [[feature-matching#Feature Descriptor]] is  The region of the feature is divided into a $4\times 4$ grid of squares
- Each square has a histogram with 8 bins (for each of the 8 directions)
- The combination (concatenation) of these histograms is the signature
- This is a $(4\times 4 \times 8)$ dimensional feature vector
- scale invariant because we only consider the directions
- orientation invariant because have already accounted for the principle orientation
- illumination invariant becuase we only consider the direction not the magnitude of the gradient grid vectors

## Feature matching
- Sift uses basic [[feature-matching#Feature Matching]]