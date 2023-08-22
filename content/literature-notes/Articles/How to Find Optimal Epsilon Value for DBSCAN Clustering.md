---
author: [[Avi Chawla]]
title: "How to Find Optimal Epsilon Value for DBSCAN Clustering?"
tags: 
- articles
- literature-note
---
# How to Find Optimal Epsilon Value for DBSCAN Clustering?

![rw-book-cover](https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc294178a-edb6-4f0d-94fa-03cb2e70531d_5500x6304.jpeg)

## Metadata
- Author: [[Avi Chawla]]
- Full Title: How to Find Optimal Epsilon Value for DBSCAN Clustering?
- Category: #articles
- URL: https://www.blog.dailydoseofds.com/p/how-to-find-optimal-epsilon-value

## Highlights
- DBSCAN has three hyperparameters:
  1. Epsilon: two points are considered neighbors if they are closer than Epsilon.
  2. min_samples: Min neighbors for a point to be classified as a core point.
  3. The distance metric.
  We can use the Elbow Curve to find an optimal value of Epsilon:
  > Set k as the min_samples hyperparameter.
  For every data point, plot the distance to its kth nearest neighbor (in increasing order).
  The optimal value of Epsilon is found near the elbow point. ([View Highlight](https://read.readwise.io/read/01h6bptpcrax80n2xh48y2vx4f))
