---
title: "19-network-layer-data-plane"
aliases: 
tags: 
- cosc203
- lecture
---

- transport layer messages are divided into segments
- passed to network layer
	- sender: encapsulates segments into IP packets, passes to link layer
	- reciever: deliver segments to tranport layer protocol
	- sender and reciever are connected by multple routers
- routers
	- examine header fields in all IP packets passing through it
	- moves IP packers from input ports to output ports to transfer packets along end-end path
- network layer protocols
	- IP
	- internet control message protocol (ICMP)
		- use for troubleshooting type things

![packet diagram](https://i.imgur.com/Y9ue6gE.png)

# Forwarding
forwarding
- move packets from a routers input link to appropriate output link
- local, per-router function
- function in data plane

routing
- determine route taken by packets from source to destination
	- network-wide logic
	- function in control plane
	- chooses shortest path through routers

# network layer service model
best effort
- try its best to deliver packet
- does not guarantee successful delivery
- transport layer provides reliability
- no big deal if packet is lost
- does not guarantee timing or order of delivery
	- each packet sent individually, possibly through different paths
- does not guarantee bandwidth available
	- network layer uses packet switching which unlike socket switching does not reserve resources

# Routers
![architecture overview](https://i.imgur.com/fNTeZnZ.png)

destination-based forwarding: foward based only on destination IP address

input port queueing: if datagrams arrive faster than fowarding rate into switch fabric

# IP addressing
- unreliable host-to-host communication protocol
	- datagram formatting, IP addressing, packet switching

![IP packet headers](https://i.imgur.com/2ehI0Kq.png)
- ver: IP protocol versin number
- head len: header length in bytes
- type of service: diffserv(0:5) or ECN (6:7)
- length: total datagram length (bytes)
- time to live: remaining max hops (decremented at each router)
- upper layer: which protocol use at transport layer
- 16-bit id, flgs, fragment offset: fragmentation/reassembly
- header checksum
- source IP
- destination IP
- options: e.g., timestamp, record route taken

overhead:
- 20 bytes TCP
- 20 bytes IP
- = 40 bytes 

# IPv6