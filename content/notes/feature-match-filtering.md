---
title: "feature-match-filtering"
tags: 
---

# Basic Approach
- Using a combination of Abiguity, Orientation and Scale, compare the features
- Ambiguity: 
	- Find the best two matches and only take matches with a large difference between them
	- Ambiguous matches with have only a small difference
- If we are using [[SIFT-features]] We already know the orientation and Scale from:
	- [[SIFT-features#Orientation Invariance]]
	- [[SIFT-features#Scale Invariance]]
- This still gives us only ~88% good matches

# RANSAC
- During [[homography-estimation]], we can use the [[RANSAC]] so that the homography is less senstive to incorrect matches.