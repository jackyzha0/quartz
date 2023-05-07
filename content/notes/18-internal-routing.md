---
title: "18-internal-routing"
tags: 
- lecture
- cosc301
---

> [!INFO] different topologies
> mesh, tree. within data centres they have a tree structure with tiers. leafs are local area networks. trees are easier to structure and manage and routing tables are more clean. 

Autonomous System 
- The Internet does not consist of independent networks 
	- Networks and routers are owned by organizations or individuals 
	- Networks and routers owned by a given entity fall under a single administrative authority, which guarantees that internal routes remain consistent and viable. 
- Autonomous System: a group of networks and routers controlled by a single administrative authority 
	- Routers are free to choose their own mechanisms for discovering, validating, and checking consistency of routes 
	- The Internet is divided into autonomous systems with each owned by a single administrative authority. 
	- In the current Internet, each large ISP is an autonomous system.

> [!INFO] we cant impose one standard on organisations. they have their own interests. 
> some autonomous systems may charge more money to route through them. routing decisions can be political. (e.g., dont want to route through russia, they might view your data). some autonomous systems are more technical and efficient than others. 


Internet Routing
- Interior routing 
	- Used within an autonomous system 
	- Used within an area of administrative control 
	- RIP, OSPF 
- Exterior routing 
	- Used between autonomous systems 
	- Used to peer with networks without administrative control 
	- BGP
![](https://i.imgur.com/ayIXFNg.png)

> [!INFO] otago uni can be considered an ISP. they are an autonomous system. if you provide a home network - you are considered and autonomous system. 

Static vs. Dynamic
- Static routing 
	- Advantage: Simplicity, less software that might fail 
	- Disadvantage: Limits on scalability, less resilience and loadbalancing, slow response to handle problems 
- Dynamic routing 
	- Advantage: Scalable, optimal routes, automatic fail-over and fail-back, load balancing 
	- Disadvantage: route update consumes bandwidth, additional load on router CPU

> [!INFO] routing types
> static routing:  just deliver a packet to the right MAC address. e.g., static address in server 1
> dynamic routing: e.g., `default` in server1. sends all other address to `gateway`. this is a form of dynamic routing.  every computer has its own routing table which you can modify. dynamic routers can `learn` which routes to prioritise

Routing Information Protocol (RIP) 
- Early, easy, and common 
	- Still used today in SOHO gear 
	- Set and forget; few knobs 
- Straightforward implementation of Distance Vector algorithm 
	- routing by rumour 
	- Alternative routes are not kept 
	- Metric is hop-count, and metric of 16 indicates unreachbility
![](https://i.imgur.com/aah2vDU.png)

> [!INFO] one you know a path. tell you neighbor about the path. send information only to neighbors. 

**only for interior routing**

RIP Metric
Network with Fast Ethernet links between A-B and B-C, and a 802.11g backup link A-C What is RIP’s next hop for A to C?
![](https://i.imgur.com/gjfIIca.png)
> [!INFO] would always choose A-C directly which is not ideal. this is becuase the only metric is hop count. not the cost of the hop

RIP Limitations (1)
- No Variable Length Subnet Masks support 
	- e.g. /28, but is supported in RIPv2 
- Slow convergence 
	- Full advertisements broadcast every 30s 
	- Count-to-Infinity 
		- RtrA loses connection to NetA 
		- Before RtrA sends update (of break), RtrB sends full update, advertising NetA at a cost of 1 
		- RtrA now thinks it can get to NetA via RtrB at a cost of 1+1=2 hops 
		- RtrA advertises this to RtrB, which sees an increased cost. RtrB advertises 2+1 = 3, continues to 16 (infinity/unreachability)
![](https://i.imgur.com/aVQqRtb.png)

RIP Limitations (2)
- Limited diameter of network (15 hops) 
- Only metric is hop-count 
	- poor support for heterogeneous networks 
- Advertisements not authenticated (v1) 
	- attacking the network made very easy RIP is okay when … 
- moderate network or minimal IT support 
- Homogeneous network 
	- With respect to link speed 
- Convergence time is acceptable

RIP Versions 
- RIP V1 
	- No support for variable length subnet masks (VLSM) 
	- No support for router authentication 
- RIP V2 
	- Support Classless Inter-Domain Routing (CIDR) 
	- Support authentication (MD5) 
- RIPng 
	- RIP next generation: an extension of RIPv2 to support IPv6 
	- No router authentication. IP routers were supposed to use IPsec for authentication

RIP Optimizations 
- Split Horizon 
	- prevent a router from advertising a route back onto the interface from which it was learned. 
- Hold Down Timer 
	- upon failure of a route, hold the route as down for 60s until the network has converged, to expire old information 
- Poison Reverse 
	- A router actively advertises routes as unreachable over the interface over which they were learned. This can quickly invalidate the old routes from neighbors. It is combined with Triggered Update. 
- Triggered Update 
	- send updates as soon as something changes (bad news happens) about a route’s metric or state

> [!INFO] split horizon. image information sent from right to left. only send to right always. always forward to the right. this helps to avoid count to infinity problemm. if there is a circle this doesn't work
> hold down timer: when a route breaks. dont update table for 60s. this can avoid cti as rtrA wont update with information fron rtrB
> poison reverse: bad news first. rtrA immediately say that it is unreachable. 
> triggered update: immediately send information when there is a change.
> still not suitable for a large network

Link State vs. Distance Vector 
- Distance Vector 
	- routing by rumour 
	- unaware of topology 
	- distributed Bellman-Ford algorithm 
- Link State 
	- multicast local link states to all routers 
	- each router then assembles topology 
	- Dijkstra’s algorithm 
	- higher memory and processor requirements
	
> [!INFO] find the shortest path. 

OSPF 
- Open Shortest Path First 
	- Link State protocol 
- Break AS into smaller areas 
	- simplifying calculation requirements 
	- routes summarised crossing areas 
- Areas attached to backbone 
	- area 0 is backbone area

> [!INFO] uses link state with some optimisations. tyring to avoid huge amounts of traffic. dijkstra's algorithm is costly for large numbers. 

![](https://i.imgur.com/myezCFe.png)

Route Summarisation 
- Reduce size of routing tables 
	- supernetting (route aggregation) 
- Reflects hierarchical nature of a network 192.168.1.32/28 + 0010 0000 192.168.1.48/28 = 0011 0000 192.168.1.32/27 .001 we own everything in 192.168.1.32/27

Route Summarisation 
- Advantages 
	- Shrink the routing table 
	- Improve router operation 
	- Reduce route updates 
- Disadvantage 
	- If a subnet of the summarized network is down, the other routers keep sending data to the router that advertises the summarized network.

Virtual LANs 
- A local area network configured by software, not by physical wiring 
	- Virtually connecting devices in different physical LANs 
- IEEE802.1Q 
	- The protocol most commonly used today to configure VLANs

Broadcast Domains
![](https://i.imgur.com/XWxL9gt.png)

VLAN MotivationsD
![](https://i.imgur.com/wxAuuKv.png)

Virtual LAN Types
- Layer 1 VLAN: Membership by Port 
	- Does not allow for user mobility 
- Layer 2 VLAN: Membership by MAC Address 
	- Support user mobility 
	- VLAN membership must be assigned initially. 
- Layer 3 VLAN: Membership by IP Subnet Address 
	- Support user mobility 
	- takes longer to forward packets using Layer 3 information than using MAC addresses.

Port Assignments
![](https://i.imgur.com/nNg1tyl.png)

Summary 
- Autonomous System 
- Routing Information Protocol (RIP) 
- Open Shortest Path First (OSPF) 
- Route summarisation 
- Virtual LANs