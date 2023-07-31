---
title: "feature-detection-and-matching"
tags: 
- 
---

Esssentially copmaring two arrays of data. 

[[feature-match-filtering]]

# Brute force methods:
- L2 Distance: ![|100](https://i.imgur.com/tVCfuZt.png)
- Normalized correlation: ![|200](https://i.imgur.com/LVnJIXo.png)
- Intersection: ![|100](https://i.imgur.com/fK8QN6y.png)

# Approximate Nearest Neighbors
- Split feature space into regions
- Only look for matches within the same region
- (Might not find closest match if feature is close to a border)

# Quad/Oct Trees
- Recursively split space in half along each dimension until 
	- max depth or 
	- few items in cell
- Still too large
	
# K-D Trees
- constructing the tree
	- choose dimenstion to split
		- choose next or random or highest variance or etc.
	- split along the median (or middle, or even split) of that dimension
	- do the same for each half
## K-D matching
- put features descriptors from one image in a k-d tree
- for each feature in the other image
	- find the which in the k-d tree has that features descriptor
	- compute distance to all features in that cell
	- nearest one is probably the best match