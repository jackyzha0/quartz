# K-Means
**Sources**:
- 📹 [StatQuest: K-means clustering](https://www.youtube.com/watch?v=4b5d3muPQmA)

**Background**
- Different centroid initialization methods
	- K-means++: https://stackoverflow.com/questions/38497982/k-means-vs-random-for-initial-centers
	- Random

Partitioning clustering algorithm that divides data into non-overlapping subsets without any **cluster-internal** structure.

Relatively efficient for medium and large sized databases. 

K-means tries to minimize **intra-cluster** distances and maximize **inter-cluster** distances.

Different multi-dimensional similarity/distance measurements may be used
- euclidean distance
- cosine similarity
- average distance

Steps
1. Initialize $k$ centroids randomly.
2. Distance calculation of each point from each centroid. 
3. Assign each point to its closest centroid.
4. Compute the new centroids, which is the mean of the data points in its cluster.
5. Repeat until the centroids no longer move.

This results in clusters with minimum error or the most dense clusters.

It is a heuristic algorithm, no guarantee that it will converge to the global optimum, and the result may depend on the initial clusters. Thus, it is good to start process with multiple starting random centroids.

A frequent problem also choosing the best K for the data set.

SSE = the sum of the squared differences between each point and its centroid.

## Accuracy
- External Approach
- Internal Approach
	- Average the distance between data points within a cluster

