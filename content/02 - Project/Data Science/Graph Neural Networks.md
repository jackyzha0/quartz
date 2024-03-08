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

**Datasets**
- CORA
- ogbn-proteins 

**Types of Graph Neural Networks**
- [[Graph Convolutional Networks]] 
- [[Hypergraph Neural Networks]]
- 
#todo
	- What is node2vec?

**Datasets for Graph Neural Networks**
## 02 Core Concepts
### What are Graphs?
![[Pasted image 20231020224800.png]]
### Types of GNN Tasks
There are node level, edge level and graph level tasks.

> [!note] Node Level

Node level classification.


> [!note] Edge Level

Edge level classification

> [!note] Graph Level

Graph classification...



### What is Message Passing?
The first section of https://cs.mcgill.ca/~wlh/comp766/files/chapter4_draft_mar29.pdf does a pretty good job at explaining message passing.
### Different Aggregation Functions
1. Softmax
2. Max Pooling
3. PowerMean
4. Attention
5. LSTM
## Different Pooling Methods

## Masking
Unlike normal neural networks, where training, testing, and validation sets are split up before being passed to a network. The sizes of masks, let's say `train_mask`, `val_mask`, and `test_mask` are determined by how the dataset is split into training, validation, and testing sets. For example, In the context of the Planetoid datasets (like 'Cora'), these masks are predefined. The 'Cora' dataset, for example, contains 2708 nodes. The `train_mask` selects 140 nodes for training, the `val_mask` selects 500 nodes for validation, and the `test_mask` selects 1000 nodes for testing. These specific numbers are chosen by the creators of the dataset and are commonly used in the literature for benchmarking purposes.

When you call `data('train_mask', 'val_mask', 'test_mask')`, it returns an iterator over these masks. Each mask is a boolean tensor of length 2708 (the total number of nodes), where `True` values indicate the nodes that are part of the respective set (training, validation, or testing), and `False` values indicate the nodes that are not part of the set.

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



# 03 Famous Developments

## The Graph Neural Network Model (2008)
📃 Franco Scarselli et al., 2008, The Graph Neural Network Model
💡 Introduced the general framework for learning on graph structured data. The model iteratively updates the state of each node based on its own features and the states of its neighbors until convergence to a stable point.

## MPNN (2017)
📃 [Justin Gilmer et al, 2017, Neural Message Passing for Quantum Chemistry](https://arxiv.org/abs/1704.01212)
💡 Introduced the idea of message passing.

## GCN (2017)
📃 [Thomas N. Kipf and Max Welling et al, 2017, Semi-Supervised Classification with Graph Convolutional Networks](https://arxiv.org/abs/1609.02907)
💡 Introduced the concept of graph convolutional networks.
### Algorithms

### Architecture

## R-GCN (2017)


## GAT (2018)
📃 Petar Velickovic et al., 2018
💡 Introduction of graph attention network.

## EdgeConv
Dynamic Graph CNN for Learning Point Clouds

## DeepGCN (2019)
Deep graph convolutional neural networks
📃 [Guhao Li et al., 2019, DeepGCNs: Can GCNs Go as Deep as CNNs](https://arxiv.org/abs/1904.03751)
💡Introduced how to make GCNs deeper.

### Architecture
> [!note] GENeralized Graph Convolution (GENConv)

$$
\mathbf{x}_i^{\prime} = \mathrm{MLP} \left( \mathbf{x}_i +
\mathrm{AGG} \left( \left\{
\mathrm{ReLU} \left( \mathbf{x}_j + \mathbf{e_{ji}} \right) +\epsilon
: j \in \mathcal{N}(i) \right\} \right)
\right)
$$
## GIN (2019)
Graph Isomorphism Network

## ResGCN (2020)
📃 [Yolong Pei et al., 2020, Attention-based Deep Residual Modeling for Anomoly Detection on Attributed Networks](https://arxiv.org/abs/2009.14738

