---
title: "342-assignment-01"
tags: 
- lecture
- cosc342
---

Choosing images
- scene type
- number of image pairs (more than 1)
- image size
- image format and compression
- image geometry

use a range of input images

# Experiment 1: Feature Matching
HYPOTHESIS: 
Level of detail in images will have more of an affect on accuracy of FLANN based matching that in Brute-Force mathing

EXPERIMENT DESIGN:
Collect a number of highly detailed images and a number of less detailed images. Highly detailed images with have a lot of information such as trees, text, buildings, landscapes etc. Less detailed images with be sparse, these could be bare buildings, walls, images with large blocks of color.

Detailed Images will result in a large number of features, and the opposite should be true for less detailed images. This could affect the accuracy of image mosaics.

To conduct the experiment I will measure the reprojection error of FLANN and Brute force matching on various

RESULTS

DISCUSSION


# Experiment 2: RANSAC for Homography Estimation
QUESTION: How does the choice of RANSAC threshold affect the speed of homography estimation in highly detailed images?

EXPERIMENT DESIGN:

RESULTS

DISCUSSION


# Todo
- specify number and type of images to collect
- choose question
- develop system for running tests and timing
- develop system for creating charts

# Log
31/03
- Collected images from around the lab and out the windows.
- I created mosaics from the image pairs to see if the images were ok
- A lot of the images had mismatches in similar areas at the bottom of the match
- I think this might be because I rotated from my body while taking the photos, rather than rotating just the phone.
- So I'll try to take some more pictures by rotating just the phone and see how they look
- I also need to develop a selection of images that I need to get
- There are also some issues with the display of the mosaic. doesn't always fit perfectly on screen and there were a few instances of line of randomly colours pixels on the screen
- ![](https://i.imgur.com/tAw2HJQ.png)
