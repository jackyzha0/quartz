---
creation_date: 2023年10月20日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Graph Neural Networks

### 01 Background
**Resources**
- 🌐 https://distill.pub/2021/gnn-intro/ - Good introduction into graph neural networks
- 🌐 https://cs.mcgill.ca/~wlh/comp766/files/ - Great course notes about Graph Representational learning
- 📄 https://arxiv.org/abs/1901.00596 - A Comprehensive Survey on Graph Neural Networks
- 🧰 https://docs.dgl.ai/en/0.8.x/index.html - Puthon package built for easy implementation of graph neural network model family
- 📹 Stanford CS224W: Machine Learning with Graphs - https://www.youtube.com/playlist?list=PLoROMvodv4rPLKxIpqhjhPgdQy7imNkDn 


**Types of Graph Neural Networks**
- [[Graph Convolutional Networks]] 
- [[Hypergraph Neural Networks]]

**Datasets for Graph Neural Networks**
## 02 Core Concepts
### What are Graphs?
![[Pasted image 20231020224800.png]]
### Types of GNN Tasks
There are node level, edge level and graph level tasks.

### What is Message Passing?
The first section of https://cs.mcgill.ca/~wlh/comp766/files/chapter4_draft_mar29.pdf does a pretty good job at explaining message passing.
### Different Aggregation Functions


## 03 Architectures
**Simple Graph Neural Network**
Let's take the popular Zachary Karate Club Network situation as task:

> This task involves training a machine model on a node-level prediction problem exemplified by Zach's karate club. The dataset consists of a singular social network graph comprising individuals who, following a political dispute, have aligned themselves with one of two karate clubs. According to the narrative, a conflict between Mr. Hi (the Instructor) and John H (the Administrator) led to a division within the karate club. In this scenario, individual karate practitioners are represented as nodes, while the interactions between these members outside of the karate context are represented as edges. The objective of this prediction problem is to determine whether a given member will demonstrate loyalty to either Mr. Hi or John H subsequent to the feud. It should be noted that the proximity of a node to either the Instructor or Administrator is highly indicative of this classification.

![[Pasted image 20231020164808.png | center ]]

Here is how a simple GNN works.
![[Pasted image 20231020224838.png | center ]]
It is important to note that connectivity is not considered at all. That means a node does not consider information about neighboring nodes, edges, etc. Instead, each node, edge, global context is considered separately.


**Message Passing Neural Network** 
In order to account for connectivity, we should utilize information from neighboring nodes. The idea of messaging passing for GNN was introduced here [Gamer et. al. 2017, Neural Messaging Passing for Quantum Chemistry]. 

In the following example, we consider message passing for learning node representations.
![[Pasted image 20231020224915.png | center ]]


It is important to note that this example only aggregated information from neighboring nodes. However, it is also important to note that we can aggregate information from edges as well as the global context. However, this is not always easy to do so, because features from edges and nodes may not be similar (different shape, different distribution, etc). It is up to the design of the aggregation function. 

The order of messaging passing is important as well. For example, some message passing architecture include:
- Neighboring nodes aggregate information from their neighboring nodes ---> target node aggregates information from its neighbors.
- Edges aggregates information from itself and its connected nodes ---> target node aggregates the information from it's edges.

The design of a GNN is choosing how to aggregate information (how message passing should work).

This is essentially the basis of GCNs.


