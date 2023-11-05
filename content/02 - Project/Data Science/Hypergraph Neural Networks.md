---
creation_date: 2023年10月14日
banner: "![[daily-note-banner.gif]]"
banner_icon: "🌞"
tags: "#笔记"
banner_y: 0.4705
---

# Hypergraph Neural Networks

## 01 Background
Introduced in the paper [Yifan Feng et. al., 2018, Hypergraph Neural Networks](https://arxiv.org/abs/1809.09401).It's aim is to improve on traditional [[Graph Convolutional Networks]], specifically

>

Related Papers
- [Kipf, Thomas N, and Max Welling, ICLR 2017. Semi-supervised classification with graph convolutional networks]. 

***Questions to answer?***
- What is a hypergraph and its comparison to a simple traditional graph

***Sources?***
- [Learning to Explain Hypergraph Neural Network](https://openreview.net/pdf?id=B6YeDatcFw)
- 

## 02 Hypergraph Neural Network
Hypergraph Neural Network

Edge in simple graph, connect exactly in 2 vertices
Hyperedge in hypergraph, allows any numer of vertices to join in.

Hypergraph better expressive ability 
Examples, Group relationship in wechat
more than just pairwise relationhsip, but high order relationship.

**Paper**: [Kipf, Thomas N, and Max Welling, ICLR 2017. Semi-supervised classification with graph convolutional networks]


Background
- Graph based convolutional neural networks ave shown superiority to traditional neural networks
- Traditional graph convolutional neural network methods face 2 shortcomings:
	- Data structure could be more complex than pairwise
	- data representation tends to be multimodal
- Hypergraph learning is first introduced in 2007
- (Huang et al. 2010) Used the hypergraph structure to model image relationship
- (Gao et al introduced hypergraph structure to assign weights for different sub-hypergraphs which corresponds to different modalites.
- Traditional hypergraph learning methods suffer from high computation and storage class

Main idea:
- introduce the hypergraph structure to GCNs, and propose efficient hypergraph
Build a graph convolution network using hypergraph structure
- how to describe a hypergraph?
- what is teh convolution in hypergraph?
- how to do graph convolution learning in hypergraph?

Mathematical Description of Hypergraphs
	Description
	Incident Matrrx
	Vertex Degree
	Vertex degree 
	edge degree
	edge degree matrix
	graph signal
	laplacian matrix

What is convolution in hypergraph, convolution operation and fourier transform
- 卷积运算
- 傅立叶变换
- 卷积定理

How to 
