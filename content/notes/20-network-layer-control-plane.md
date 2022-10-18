---
title: "20-network-layer-control-plane"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2022-10-21
sr-interval: 3
sr-ease: 250
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

## notations
![](https://i.imgur.com/NfrM72Y.png)

## link state routing
centralized: network topology, link costs are known to all nodes
- each node gathers informatin on each link to its neighbors
- build link state packets and flood to all other nodes

computes least costs paths from one node to all other nodes
- gives a fowarding table for that node 

iterative: after k interations, know least cost path to k destinations


### Dijkstra's algorithm
foward search algorithm

```
///initialization
N` = {u}
for all nodes v
	if v adjacent to u
		then D(v) = Cuv
	else D(v) = infinity
	
//loop
loop until all nodes in N`
	find W not in N` such that D(w) is a min
	add w to N`
	update D(v) for all v adjacent to w and not in N`:
		D(v) = min(D(v), D(w)+Cwv)
	//new least-path-cost to v is either old least-cost-path to v or known least-path-cost to w plus direct-cost from w to v

```

![example](https://i.imgur.com/zeR9DAI.png)

algorithm complexity:
- n nodes
- for each of n interation: need to check all nodes, w, not in N
- n(n+1)/2 comparisons: O(n²)
- more efficient implementations possible: O(nlogn)

message complexity
- each router must broadcast its link state information to other n routers
- efficient broadcast algorithms: O(n) link crossings to dissenimate a bradcast message from one source
- each router's message crosses O(n) links: overall message compexity O(n²)

## Distance vector routing
### bellman-ford equation
backward search algorithm
$D_{x}(y) = min_{v} \{c_{x, v} + D_{v}(y)\}$

### distance vector algorithm
each node:
- **wait** for change in local link cost or msg from neighbor
- **recompute** DV estimate using DV recieved from neighbor
- if DV to any destination had changed, **notify** neighbors

- iterative, asynchronous
- distributed, self-stopping
	- no notifications recieved, no action taken

"good news (decrease on link cost) travels quickly"

"bad news (increase on link cost) travels slowly" - count-to-infinity problem
- if a link is broken other routers become aware slowly
- routers unaware of broken link can "advertise" incorrect costs and create a routing loop
- loop is broken if a hop count threshold is passed 

## link state (LS) vs Distance vector (DV)
message complexity
- LS: n routers O(n²) messages sent
- DV: exhange between neighbors; convergence time varies

speed of convergence:
- LS: O(n²) algorithm, O(n²) messages
- DV: varies
	- may have routing loops
	- count-to-infinity problem

robustness
- LS:
	- router can advertise incorrect link cost
	- each router computes only its own table
- DV:
	- router can advertise incorrect path cost: black holing
	- each routers table is used by others: errors propagate through network


# Routing in internet
- autonomous system (AS): a group of networks and routers controled by a single administrative authority
- Intra-AS routing:
	- routing information protocol (RIP): distance vector routing
	- open shortest path first (OSPF): link state routing
- Inter-AS routing:
	- border gateway protocol (BGP)L path-vector routing

# ICMP
- used by hosts and routers to communicate netowrk level information
	- error reporting:
	- echo requeset/reply
- network layer "above" IP
	- ICMP message carried in IP datagrams
- ICMP message: type, code plus first 8 bytes of IP datagram causing error

![ICMP types and codes](https://i.imgur.com/cv0DRXL.png)

## traceroute
- sends a set of UDP segments to destination
- datagram in nth set arrives to nth router
	- router discards datagram and sends source ICMP message (type 11 code 0)
	- ICMP message possibly incldes name of router and IP
- when ICMP message arrives at source: record RTTs

stopping:
- when a packet arrives that the destination, it returns ICMP "port unreachable message" (type 3 code 3)
- source stops