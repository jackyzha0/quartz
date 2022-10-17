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
move packets from  a routers input link to appropriate output link
	

# Routing


# Routers

# IP addressing

# IPv6