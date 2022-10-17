---
title: "20-network-layer-control-plane"
aliases: 
tags: 
- cosc203
- lecture
---

# per-router control vs SDN
## per router
- each router runs a routing algorithm
- router communicate with each other
- and creates a forwarding table

![](https://i.imgur.com/c5nfT7X.png)

## SDN software defined networking
a remote controller computes, and install fowarding tables in routers
- much faster: less work for each router
- separate control and data plane
![](https://i.imgur.com/H73GPsc.png)

# routing algorithms
- goal is to determine "good" paths from sending to recieving host through network of routers
- path: sequence of routers
- "good": least "cost", "fastest", "least congested"

## graph abstraction
- nodes: set of routers
- edges: set of links

$c_{a,b}$ cost the link directly connecting a and b. if there is no link the cost is ♾

![slide](https://i.imgur.com/onryMTK.png)

## algorithm classification
global: all routers have complete toplogy, link cost into
- link state algotihms

decentralized: interative process of computation, exchange of into with neighbors
- routers only know link costs to attacked neighbors
- "distance vecotr algorithms

static: routes change very slowly over time

dynamic: routes change more quickly
- periodic updates or in response to link cost changes

## link state routing
centralized: network topology, link costs are known to all nodes
- each node gathers informatin on each link to its neighbors
- build link state packets and flood to all other nodes

computes least costs paths from one node to all other nodes
- gives a fowarding table for that node 

iterative: after k interations, know least cost path to k destinations

## notations
![](https://i.imgur.com/NfrM72Y.png)

## Dijkstra's algorithm

initialization
```
N` = {u}
for all nodes v
	if v adjacent to u
		then D(v) = Cuv
	else D(v) = infinity
	
loop until all nodes in N`
	find W not in N` such that D(w) is a min
	add w to N`
	update D(v) for all v adjacent to w and not in N`:
		D(v) = min(D(v), D(w)+Cwv)
	//new least-path-cost to v is either old least-cost-path to v or known least-path-cost to w plus direct-cost from w to v

```

# routing in the internet

# ICMP