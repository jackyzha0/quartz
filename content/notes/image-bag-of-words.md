---
title: "image-bag-of-words"
tags: 
---

- used to find similarities in features between images
- how many likely matches are there?
- group features of each into "words"
	- k clusters of words using k-means
	- cluster centres are "words"
- create histogram by counting "words" in each image
- compare histograms of each image using distance