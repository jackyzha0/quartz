---
title: "25-advanced-topics"
aliases: 
tags: 
- cosc203
- lecture
sr-due: 2023-01-25
sr-interval: 56
sr-ease: 250
---

# Datacenter networks
- 10's to 100's of thousands of hosts, often closely coupled, in close proximity
	- e-business :(e.g., amazon)
	- content servers: youtube etc
	- search engines, data mining (e.g., google)
- challenges
	- multiple applications, each server many clients
	- reliability
	- managing/balancing load
	- procesing, networking, data bottlenecks


network elements
- server racks, 20-40 server blades: host
- Top of Rack (TOR) switch
- Tier 2 switches: connect to ~16 TORS below
- tier 1 switches connect to ~16 T-2s below
- border routers: connections outside
- ![](https://i.imgur.com/kFOrQ97.png)

- multipath communcation
	- rich interconnecitions so many routes
	- increased throughput
	- increased reliability through redundancy

application-layer routing
- load balancer: app-layer routing
- recieves external client requests
- directs workload within data center
- returns results to client (data center internals are hidden)
- ![](https://i.imgur.com/Z33ZvcS.png)

protocols
- similar to TCP/IP protocols
- link layer
	- RoCE: remote DMA (RDMA) over converged internet
		- direct memory access
		- communcation between memory of different computers
- transport layer
	- ECN (explicit congestion notification) used in transport layer congestion control
	- experimentation with hop-by-hop (backpressure) congestion
- routing management
	- SDN widely used
	- place related servers, as close as possible together 

# Software Defined networks
- separate control plane and data plane
	- monollithic router contains switching hardware, runs proprietary implementation of internet standard protocols in proprietary router
	- different "middleboxes" for different network layer functions:
		- firewalls, load balancers, NAT boxes

![mainframe to pc analogy](https://i.imgur.com/S8FAfkD.png)

logically centralized control plane
- easier network management: avoid router misconfigs, greater flexibility of traggic flows
- table based forwarding allows "programming" routers
	- compute tables centrally and distribute
- open implementation of control plane


   