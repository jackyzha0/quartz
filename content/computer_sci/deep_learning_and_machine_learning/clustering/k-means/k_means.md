---
title: K-means Clustering Algorithm
tags:
- machine-learning
- clustering
- algorithm
---

# Step by Step

Our algorithm works as follows, assuming we have inputs $x_1, x_2, \cdots, x_n$ and value of $K$

- **Step 1** - Pick $K$ random points as cluster centers called centroids.
- **Step 2** - Assign each $x_i$ to nearest cluster by calculating its distance to each centroid.
- **Step 3** - Find new cluster center by taking the average of the assigned points.
- **Step 4** - Repeat Step 2 and 3 until none of the cluster assignments change.

![](computer_sci/deep_learning_and_machine_learning/clustering/k-means/attachments/k4XcapI.gif)

# Implementation

## Core code

### Distance calculation:

```python
# Euclidean Distance Caculator
def dist(a, b, ax=1):
    return np.linalg.norm(a - b, axis=ax)
```


### Generate Random Clustering center at first

```python
# Number of clusters
k = 3
# X coordinates of random centroids
C_x = np.random.randint(0, np.max(X)-20, size=k)
# Y coordinates of random centroids
C_y = np.random.randint(0, np.max(X)-20, size=k)
C = np.array(list(zip(C_x, C_y)), dtype=np.float32)
print(C)
```

### Calculate dis and tag point, then update every tag's new center

```python
# To store the value of centroids when it updates
C_old = np.zeros(C.shape)
# Cluster Lables(0, 1, 2)
clusters = np.zeros(len(X))
# Error func. - Distance between new centroids and old centroids
error = dist(C, C_old, None)
# Loop will run till the error becomes zero
while error != 0:
    # Assigning each value to its closest cluster
    for i in range(len(X)):
        distances = dist(X[i], C)
        cluster = np.argmin(distances)
        clusters[i] = cluster
    # Storing the old centroid values
    C_old = deepcopy(C)
    # Finding the new centroids by taking the average value
    for i in range(k):
        points = [X[j] for j in range(len(X)) if clusters[j] == i]
        C[i] = np.mean(points, axis=0)
    error = dist(C, C_old, None)
```

## Simple approach by scikit-learn

```python
from sklearn.cluster import KMeans

# Number of clusters
kmeans = KMeans(n_clusters=3)
# Fitting the input data
kmeans = kmeans.fit(X)
# Getting the cluster labels
labels = kmeans.predict(X)
# Centroid values
centroids = kmeans.cluster_centers_

# Comparing with scikit-learn centroids
print(C) # From Scratch
print(centroids) # From sci-kit learn
```

# Application 

## 8bit style

Read image and use k-means to do clustering for pixel value. Make pic to 8bit color style.

![](computer_sci/deep_learning_and_machine_learning/clustering/k-means/attachments/3ed5fee41bd566be093bebd62a33d12.jpg)

[color8bit_style.py](https://github.com/PinkR1ver/Jude.W-s-Knowledge-Brain/blob/master/Deep_Learning_And_Machine_Learning/clustering/k-means/application/color8bit_style.py)

# Reference

* [K-Means Clustering in Python, https://mubaris.com/posts/kmeans-clustering/. Accessed 3 July 2023.](https://mubaris.com/posts/kmeans-clustering/)