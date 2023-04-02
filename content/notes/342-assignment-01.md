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
Highly detailed images will have a lot of information such as trees, text, buildings, landscapes etc. Less detailed images with be sparse, these could be bare buildings, walls, images with large blocks of color, etc. Detailed Images will result in a large number of features which are tightly grouped. I predict this will reduce the accuracy of FLANN based matching.

HYPOTHESIS: 
FLANN based matching will decrease in accuracy as level of detail increases

EXPERIMENT DESIGN:

Variables
- Independent Variables: Level of detail (Number of SIFT features detected)
- Dependent Variable: Reprojection error of feature matches

Procedure
1. Select a set of image pairs with various levels of detail
2. For each image pair, detect SIFT features and perform both FLANN and Brute force matching
3. Calculate the reprojection error of features matched using both methods for each image pair
4. For each method, plot the accuracy as a function of the number of features/level of detail

_control for other factors: lighting, camera settings (exposure, iso, etc), resolution?__

RESULTS

DISCUSSION


# Experiment 2: RANSAC for Homography Estimation
QUESTION: How does the choice of RANSAC threshold affect the speed of homography estimation in highly detailed images?

HYPOTHESIS: In highly detailed images, homography estimation using higher RANSAC thresholds is faster/more efficient

EXPERIMENT DESIGN:

Variables
- Independent variable: The RANSAC threshold (in pixels).
- Dependent variable: The time taken to estimate the homography matrix (in seconds).

Procedure
1.  Select a set of image pairs with high levels of detail.
2.  For each image pair, estimate the homography matrix that relates one image to the other, using a fixed set of matching features.
3.  Vary the RANSAC threshold from small to large values, and for each value of the threshold, estimate the homography matrix for each image pair, using the same set of matching features.
4.  Measure the time taken to estimate the homography matrix for each value of the threshold and each image pair.
5.  Plot the time taken as a function of the RANSAC threshold.

RESULTS

DISCUSSION
    
**Speed of homography????** speed is not a science word unless you are driving a car my friend
and even then its velocity
also spin around your hypotheses to make homograhy estmation the subject of the sentance

part 3 needs to be worded better... think about it like you are writing a recipe... you dont say vary the number of choclate chips on a muffin, you say, for each muffin put on 1 chocolate chip for the first batch, then x for further batches...

4 is wordy


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

02/04
- refactored lab4 for work better for the assignment
	- created new classes Mosaic, and Utils.
	- created new file experiement1.cpp for experiment1
	- rename features.cpp to main.cpp
- collected more images using a mirrorless digital camera
- start python script to analyse results from experiement

03/04
- ran experiment against new images
- had some issues with filename "JPG" vs "jpg"
- used power renamer to rename images
- ran new data through analysis script
- looks like error has very little correlation with the number of features using a flann based matcher
- re ran experiement with bf matcher and redid analysis still very little correlation
- 