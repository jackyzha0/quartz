---
title: "22-LAN-physical-layer"
aliases: 
tags: 
- cosc203
- lecture
---

# LAN vs WAN
Local area network
- a network connecting computers within a limited geographic area
- e.g., building, school, home etc
- wired or wireless

Wide Area network
- a network that extends over a large area such as town, country, region or the world
- used to connec LANs and other types of networks together
- often established with leased telecommunication circuits (e.g., chorus)

## ethernet
dominant wired tech
- first used LAN tech
- simple cheap
- IEEE 802.3 standard
- kept up with speed race: 10 Mbps - 400 Gbps
- physical topology
	- bus: all nodes in the same collision domain can collide (old)
	- switched: active link-layer switch in center (new)

frame structure
- encapsulates IP datagram (or other network layer protocol packet) in ethernet frame
- ![ethernet frame diagram](https://i.imgur.com/ElTUCEi.png)
- preamble: used to sync reciever and sender clock rates
	- 7 bytes of 10101010 followed by one byte of 10101011
- addresses: 6 bytes source, destination MAC addr
	- if adapter recieves frame with matching MAC destination address, it passes data in frame to network layer protocol, otherwise adapter discards frame
- type
	- most IP but other possible: e.g., Novell IPX, Appletalk
	- used to demultiplex up at reciever  
- CRC: cyclic redundancy check at reciever
	- error detected: frame is dropped
	- it can correct but doesn't because just dropping and resending is faster

# ARP 
Address resolution protocol

arp table: each IP node on lan has table
- IP/MAC mappings for some LAN nodes
- mapping is forgotten after TTL is exceeded (usually 20min)

![arp example](https://i.imgur.com/dnj9Fvi.png)

# Switch vs Router
switch:
- link layer deivce
- takes an active role
- store and foward ethernet frames
- examine incoming frame's MAC addr, selectively forward frame to one-or-more outgoing links when frame is to be fowarded on segment, uses CSMA/CD
- transparent
	- hosts unaware of presence of switches
- plug and play, self-learning
	- switches do not need to be configured

multiple simultaneous transmissions
- hosts have direct connection to sw

# All layers together